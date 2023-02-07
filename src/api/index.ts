import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import {
  Match,
  Matchday,
  SquadGroup,
  SerieAFixtureAndResult,
  SerieAMatchday,
  SerieASquad,
  SerieATable,
  SerieATeams,
  Standing,
  Team,
  Player,
  SerieAPlayer,
} from "../types";

const { language } = getPreferenceValues();

function showFailureToast() {
  showToast(
    Toast.Style.Failure,
    "Something went wrong",
    "Please try again later"
  );
}

const endpoint = "https://www.legaseriea.it/api";

export const getCurrentGameWeek = async (
  seasonId: string
): Promise<Matchday[]> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/season/${seasonId}/championship/A/matchday?lang=${language}`,
  };

  try {
    const { data }: AxiosResponse<SerieAMatchday> = await axios(config);

    return data.data;
  } catch (e) {
    showFailureToast();

    return [];
  }
};

export const getTeams = async (season: string): Promise<Team[]> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/widget/all-teams`,
    params: {
      lang: "en",
      id_category: "150060",
    },
  };

  try {
    const { data }: AxiosResponse<SerieATeams> = await axios(config);

    return data.data.body;
  } catch (e) {
    showFailureToast();

    return [];
  }
};

// export const getTeam = async (team: string) => {
//   const config: AxiosRequestConfig = {
//     method: "GET",
//     url: `${endpoint}/teams/${team}`,
//     headers: {
//       "Ocp-Apim-Subscription-Key": "c13c3a8e2f6b46da9c5c425cf61fab3e",
//     },
//   };

//   try {
//     const { data }: AxiosResponse<LaLigaClub> = await axios(config);

//     return data.team;
//   } catch (e) {
//     showFailureToast();

//     return undefined;
//   }
// };

export const getStandings = async (season: string): Promise<Standing[]> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/stats/live/Classificacompleta?CAMPIONATO=A&STAGIONE=${season}&TURNO=UNICO&GIRONE=UNI`,
  };

  try {
    const { data }: AxiosResponse<SerieATable> = await axios(config);

    return data.data;
  } catch (e) {
    showFailureToast();

    return [];
  }
};

export const getMatches = async (
  season: string,
  matchday: number
): Promise<Match[]> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/stats/live/match?extra_link=&order=oldest&lang=en&season_id=${season}&match_day_id=${matchday}`,
  };

  try {
    const { data }: AxiosResponse<SerieAFixtureAndResult> = await axios(config);

    return data.data;
  } catch (e) {
    showFailureToast();

    return [];
  }
};

export const getSquad = async (
  team: string
): Promise<SquadGroup | undefined> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/team/${team}/players`,
  };

  try {
    const { data }: AxiosResponse<SerieASquad> = await axios(config);

    return data.data;
  } catch (e) {
    showFailureToast();

    return undefined;
  }
};

export const getPlayer = async (
  player_id: string
): Promise<Player | undefined> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/stats/Rosasquadra?CAMPIONATO=*&STAGIONE=*&CODGIOCATORE=${player_id}`,
  };

  try {
    const { data }: AxiosResponse<SerieAPlayer> = await axios(config);

    return data.data.reverse()[0];
  } catch (e) {
    showFailureToast();

    return undefined;
  }
};
