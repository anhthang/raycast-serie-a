import {
  Action,
  ActionPanel,
  Color,
  getPreferenceValues,
  Icon,
  Image,
  List,
  showToast,
  Toast,
} from "@raycast/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { seasons } from "./components/season_dropdown";
import { Broadcaster, Match } from "./types";
import { getCoppaRounds, getMatches } from "./api";
import groupBy from "lodash.groupby";
import { Round } from "./types/coppa";

const { language } = getPreferenceValues();

export default function Fixture() {
  const [matches, setMatches] = useState<Match[]>();

  const [rounds, setRounds] = useState<Round[]>([]);
  const [roundId, setRoundId] = useState<string>();

  useEffect(() => {
    getCoppaRounds(seasons[0]).then((data) => {
      const reversed = data.reverse();
      setRounds(reversed);
      setRoundId(reversed[0].id_category.toString());
    });
  }, []);

  useEffect(() => {
    if (roundId) {
      showToast({
        title: "Loading...",
        style: Toast.Style.Animated,
      });
      getMatches(seasons[0], { round_id: roundId }).then((data) => {
        setMatches(data);
        showToast({
          title: "Completed",
          style: Toast.Style.Success,
        });
      });
    }
  }, [roundId]);

  const categories = groupBy(matches, (m) =>
    format(new Date(m.date_time), "eeee, dd MMM yyyy")
  );

  const round = rounds.find((r) => r.id_category.toString() === roundId);

  return (
    <List
      throttle
      isLoading={!matches}
      navigationTitle={
        round ? `${round.title} | Fixtures & Results` : "Fixtures & Results"
      }
      searchBarAccessory={
        <List.Dropdown
          tooltip="Filter by Round"
          value={rounds[0]?.id_category.toString()}
          onChange={setRoundId}
        >
          {rounds.map((round) => {
            return (
              <List.Dropdown.Item
                key={round.id_category}
                value={round.id_category.toString()}
                title={round.title}
              />
            );
          })}
        </List.Dropdown>
      }
    >
      {Object.entries(categories).map(([date, fixtures]) => {
        return (
          <List.Section
            key={date}
            title={date.endsWith("2099") ? "To be defined" : date}
          >
            {fixtures.map((match) => {
              const accessories: List.Item.Accessory[] = [
                { text: match.venue_name },
              ];

              let broadcasters: Broadcaster[];
              try {
                broadcasters = JSON.parse(match.broadcasters);
                if (match.match_status === 0) {
                  broadcasters.forEach((broadcaster) => {
                    accessories.push({
                      icon: {
                        source: encodeURI(broadcaster.image),
                      },
                      tooltip: broadcaster.name,
                    });
                  });
                }
              } catch (error) {
                // do nothing
              }

              let weather;
              try {
                weather = JSON.parse(match.weather);
                accessories.push({
                  icon: {
                    source: {
                      light: weather.icon_day.image_day,
                      dark: weather.icon_day.image_night,
                    },
                  },
                  tooltip: weather.icon_description,
                });
              } catch (e) {
                // ignore
              }

              let icon: Image.ImageLike;
              if (match.match_status === 1) {
                icon = { source: Icon.Livestream, tintColor: Color.Red };

                accessories.unshift({
                  tag: {
                    value: match.live_timing,
                    color: Color.Red,
                  },
                });
              } else if (match.match_status === 2) {
                icon = { source: Icon.CheckCircle, tintColor: Color.Green };
              } else {
                icon = Icon.Clock;
              }

              return (
                <List.Item
                  key={match.match_id}
                  title={format(new Date(match.date_time), "HH:mm")}
                  subtitle={
                    match.match_status === 2
                      ? `${match.home_team_name} ${match.home_goal} - ${match.away_goal} ${match.away_team_name}`
                      : match.match_name
                  }
                  icon={icon}
                  accessories={accessories}
                  actions={
                    <ActionPanel>
                      {match.highlight && (
                        <Action.OpenInBrowser
                          title="Highlights"
                          icon={Icon.Highlight}
                          url={`https://www.legaseriea.it/${language}${match.highlight}`}
                        />
                      )}
                      {match.match_status === 0 && (
                        <Action.OpenInBrowser
                          title="Buy Ticket"
                          icon={Icon.Wallet}
                          url={match.ticket_url}
                        />
                      )}
                      <Action.OpenInBrowser
                        url={`https://www.legaseriea.it/${language}${match.slug}`}
                      />
                    </ActionPanel>
                  }
                />
              );
            })}
          </List.Section>
        );
      })}
    </List>
  );
}
