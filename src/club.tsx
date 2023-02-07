import { useEffect, useState } from "react";
import { Team } from "./types";
import { getTeams } from "./api";
import SeasonDropdown, { seasons } from "./components/season_dropdown";
import { Action, ActionPanel, Grid, Icon } from "@raycast/api";
import ClubDetails from "./components/club";
import ClubSquad from "./components/squad";

export default function Club() {
  const [clubs, setClubs] = useState<Team[]>();
  const [season, setSeason] = useState<string>(Object.values(seasons)[0]);

  useEffect(() => {
    if (season) {
      setClubs(undefined);
      getTeams(season).then((data) => {
        setClubs(data);
      });
    }
  }, [season]);

  return (
    <Grid
      throttle
      isLoading={!clubs}
      searchBarAccessory={
        <SeasonDropdown type="grid" selected={season} onSelect={setSeason} />
      }
    >
      {clubs?.map((club) => {
        return (
          <Grid.Item
            key={club.id}
            title={club.team_name}
            // subtitle={club.venue.name}
            content={club.team_logo}
            actions={
              <ActionPanel>
                <Action.Push
                  title="Club Squads"
                  icon={Icon.Sidebar}
                  target={<ClubSquad {...club} />}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </Grid>
  );
}