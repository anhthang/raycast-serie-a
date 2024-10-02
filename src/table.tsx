import { Color, List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { useState } from "react";
import { getStandings } from "./api";
import SeasonDropdown, { seasons } from "./components/season_dropdown";

export default function GetTables() {
  const [season, setSeason] = useState<string>(seasons[0]);

  const { data: standing, isLoading } = usePromise(getStandings, [season]);

  return (
    <List
      throttle
      isLoading={isLoading}
      searchBarAccessory={
        <SeasonDropdown selected={season} onSelect={setSeason} />
      }
      isShowingDetail={true}
    >
      {standing?.map((team) => {
        const accessories: List.Item.Accessory[] = [
          {
            text: {
              color: Color.PrimaryText,
              value: team.PuntiCls.toString(),
            },
            tooltip: "Points",
          },
        ];

        return (
          <List.Item
            key={team.Nome}
            icon={{
              source: {
                light: team.team_image,
                dark: team.team_image_secondary,
              },
            }}
            title={team.PosCls.toString()}
            subtitle={team.Nome}
            keywords={[team.Nome, team.NomeCompleto, team.NomeSintetico]}
            accessories={accessories}
            detail={
              <List.Item.Detail
                metadata={
                  <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label
                      title="Played"
                      text={team.Giocate.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Won"
                      text={team.Vinte.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Drawn"
                      text={team.Pareggiate.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Lost"
                      text={team.Perse.toString()}
                    />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label
                      title="Goals For"
                      text={team.RETIFATTE.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Goals Against"
                      text={team.RETISUBITE.toString()}
                    />
                    <List.Item.Detail.Metadata.Label
                      title="Goal Difference"
                      text={(team.RETIFATTE - team.RETISUBITE).toString()}
                    />
                  </List.Item.Detail.Metadata>
                }
              />
            }
          />
        );
      })}
    </List>
  );
}
