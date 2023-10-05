import { useEffect, useState } from "react";
import { Team } from "./types";
import { getTeams } from "./api";
import { seasons } from "./components/season_dropdown";
import { Action, ActionPanel, Grid, Icon } from "@raycast/api";
import ClubDetails from "./components/club";

export default function Club() {
  const [clubs, setClubs] = useState<Team[]>();

  useEffect(() => {
    getTeams().then((data) => {
      setClubs(data);
    });
  }, []);

  return (
    <Grid throttle isLoading={!clubs} inset={Grid.Inset.Small}>
      {clubs?.map((club) => {
        return (
          <Grid.Item
            key={club.id}
            title={club.team_name}
            content={club.team_logo}
            actions={
              <ActionPanel>
                <Action.Push
                  title="Club Details"
                  icon={Icon.Sidebar}
                  target={<ClubDetails {...club} season={seasons[0]} />}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </Grid>
  );
}
