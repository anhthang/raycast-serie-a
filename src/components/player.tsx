import { Action, ActionPanel, Detail, getPreferenceValues } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import json2md from "json2md";
import { getPlayer } from "../api";
import { Squad } from "../types";

const { language } = getPreferenceValues();

const getFlagEmoji = (isoCode?: string) => {
  if (!isoCode) return "🏴";

  if (isoCode === "GB-ENG") {
    return "🏴󠁧󠁢󠁥󠁮󠁧󠁿";
  }
  if (isoCode === "GB-WLS") {
    return "🏴󠁧󠁢󠁷󠁬󠁳󠁿";
  }
  if (isoCode === "GB-SCT") {
    return "🏴󠁧󠁢󠁳󠁣󠁴󠁿";
  }
  if (isoCode === "GB-NIR") {
    // The only official flag in Northern Ireland is the Union Flag of the United Kingdom.
    return "🇬🇧";
  }

  return isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

export default function Player(props: Squad) {
  const { data: player, isLoading } = usePromise(getPlayer, [props.netco_id]);

  return player ? (
    <Detail
      navigationTitle={`${player.CognomeNomeXL} | Profile & Stats`}
      isLoading={isLoading}
      markdown={json2md([
        { h1: player.CognomeNomeXL },
        {
          img: {
            source: player.player_medium_shot,
          },
        },
      ])}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label
            title="Nationality"
            icon={getFlagEmoji(player.Nazionalita)}
            text={player.Nazionalita}
          />
          <Detail.Metadata.Label
            title="Date of Birth"
            text={player.DataNascita}
          />
          {/* <Detail.Metadata.Label
            title="Place of Birth"
            text={player.person.place_of_birth}
          />
          <Detail.Metadata.Label
            title="Height (cm)"
            text={player.person.height.toString()}
          />
          <Detail.Metadata.Label
            title="Weight (kg)"
            text={player.person.weight.toString()}
          /> */}
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label title="Position" text={player.Ruolo} />
          <Detail.Metadata.Label
            title="Shirt Number"
            text={player.NUMEROMAGLIA.toString()}
          />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            url={`https://www.legaseriea.it/${language}/$${player.player_slug}`}
          />
        </ActionPanel>
      }
    />
  ) : (
    <Detail navigationTitle={`${props.short_name} | Profile & Stats`} />
  );
}
