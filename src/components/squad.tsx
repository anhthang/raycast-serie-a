import { Action, ActionPanel, Grid, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { getSquad } from "../api";
import { SquadGroup, Squad, Team } from "../types";
import Player from "./player";

export default function ClubSquad(props: Team) {
  const [playerGroups, setPlayerGroups] = useState<SquadGroup | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setPlayerGroups(undefined);

    getSquad("JUVE").then((data) => {
      setPlayerGroups(data);
      setLoading(false);
    });
  }, []);

  return (
    <Grid
      throttle
      navigationTitle={`Squad | ${props.team_name} | Club`}
      isLoading={loading}
    >
      {playerGroups &&
        Object.entries(playerGroups).map(([code, members]) => {
          return (
            <Grid.Section title={members[0].role} key={code}>
              {members.map((member: Squad) => {
                return (
                  <Grid.Item
                    key={member.player_id}
                    title={member.name}
                    subtitle={member.role}
                    content={{
                      source: member.medium_shot,
                      fallback: "player_placeholder.png",
                    }}
                    actions={
                      <ActionPanel>
                        <Action.Push
                          title="Player Profile"
                          icon={Icon.Sidebar}
                          target={<Player {...member} />}
                        />
                      </ActionPanel>
                    }
                  />
                );
              })}
            </Grid.Section>
          );
        })}
    </Grid>
  );
}
