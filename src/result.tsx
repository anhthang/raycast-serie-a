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
import groupBy from "lodash.groupby";

const { language } = getPreferenceValues();

export default function Fixture() {
  const [matches, setMatches] = useState<Match[]>();
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
        setMatches(data);
        showToast({
          title: "Completed",
          style: Toast.Style.Success,
        });
      });
    }
  }, [matchday]);

  const categories = groupBy(matches, (m) =>
    format(new Date(m.date_time), "dd MMM yyyy")
  );

  return (
    <List
      throttle
      isLoading={!matches}
      navigationTitle={
        matchday
          ? `${matchday.title} | Fixtures & Results`
          : "Fixtures & Results"
      }
      searchBarAccessory={
        <SeasonDropdown selected={season} onSelect={setSeason} />
      }
    >
      {Object.entries(categories).map(([date, fixtures]) => {
        return (
          <List.Section key={date} title={date}>
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
                      : `${match.home_team_name} - ${match.away_team_name}`
                  }
                  icon={icon}
                  accessories={accessories}
                  actions={
                    <ActionPanel>
                      <ActionPanel.Section title="Match">
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
                      </ActionPanel.Section>
                      <ActionPanel.Section title="Matchday">
                        {matchday && Number(matchday.description) > 1 && (
                          <Action
                            title={
                              matchdays[Number(matchday.description) - 2].title
                            }
                            icon={Icon.ArrowLeftCircle}
                            onAction={() => {
                              setMatchday(
                                matchdays[Number(matchday.description) - 2]
                              );
                            }}
                          />
                        )}
                        {matchday && Number(matchday.description) < 38 && (
                          <Action
                            title={
                              matchdays[Number(matchday.description)].title
                            }
                            icon={Icon.ArrowRightCircle}
                            onAction={() => {
                              setMatchday(
                                matchdays[Number(matchday.description)]
                              );
                            }}
                          />
                        )}
                      </ActionPanel.Section>
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
