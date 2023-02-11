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
import SeasonDropdown, { seasons } from "./components/season_dropdown";
import { Broadcaster, Match, Matchday } from "./types";
import { getMatchday, getMatches } from "./api";

const { language } = getPreferenceValues();

interface FixturesAndResults {
  [key: string]: Match[];
}

export default function Fixture() {
  const [matches, setMatches] = useState<FixturesAndResults>();
  const [season, setSeason] = useState<string>(seasons[0]);
  const [matchdays, setMatchdays] = useState<Matchday[]>([]);
  const [matchday, setMatchday] = useState<Matchday>();

  useEffect(() => {
    if (season) {
      setMatchdays([]);
      setMatchday(undefined);
      setMatches(undefined);

      getMatchday(season).then((data) => {
        setMatchdays(data);
        const currentDay = data.find(
          (d) =>
            d.category_status === "LIVE" || d.category_status === "TO BE PLAYED"
        );
        if (currentDay) {
          setMatchday(currentDay);
        } else {
          setMatchday(data[data.length - 1]);
        }
      });
    }
  }, [season]);

  useEffect(() => {
    if (matchday) {
      showToast({
        title: `Getting ${matchday.title}`,
        style: Toast.Style.Animated,
      });
      getMatches(season, matchday.id_category).then((data) => {
        setMatches({
          ...matches,
          [`${matchday.title}`]: data,
        });
        showToast({
          title: `${matchday.title} Added`,
          style: Toast.Style.Success,
        });
      });
    }
  }, [matchday]);

  return (
    <List
      throttle
      isLoading={!matches}
      searchBarAccessory={
        <SeasonDropdown selected={season} onSelect={setSeason} />
      }
    >
      {Object.entries(matches || {}).map(([label, results]) => {
        return (
          <List.Section key={label} title={label}>
            {results.map((match) => {
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
              } else if (match.match_status === 2) {
                icon = { source: Icon.CheckCircle, tintColor: Color.Green };
              } else {
                icon = Icon.Clock;
              }

              return (
                <List.Item
                  key={match.match_id}
                  title={format(
                    new Date(match.date_time),
                    "dd MMM yyyy - HH:mm"
                  )}
                  subtitle={
                    match.match_status === 2
                      ? `${match.home_team_name} ${match.home_goal} - ${match.away_goal} ${match.away_team_name}`
                      : `${match.home_team_name} - ${match.away_team_name}`
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
                      {matchday && Number(matchday.description) > 1 && (
                        <Action
                          title="Load Previous Matchday"
                          icon={Icon.MagnifyingGlass}
                          onAction={() => {
                            setMatchday(
                              matchdays[Number(matchday.description) - 2]
                            );
                          }}
                        />
                      )}
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
