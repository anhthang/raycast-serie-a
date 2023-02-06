import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { showToast, Toast } from "@raycast/api";
import {
  Match,
  Matchday,
  SerieAFixtureAndResult,
  SerieAMatchday,
  SerieATable,
  SerieATeams,
  Standing,
  Team,
} from "../types";

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
    url: `${endpoint}/season/${seasonId}/championship/A/matchday?lang=en`,
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

export const getTeam = async (team: string) => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/teams/${team}`,
    headers: {
      "Ocp-Apim-Subscription-Key": "c13c3a8e2f6b46da9c5c425cf61fab3e",
    },
  };

  try {
    const { data }: AxiosResponse<LaLigaClub> = await axios(config);

    return data.team;
  } catch (e) {
    showFailureToast();

    return undefined;
  }
};

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

export const getSquad = async (team: string): Promise<Squad[]> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${endpoint}/teams/${team}/squad-manager`,
    params: {
      limit: 50,
      offset: 0,
      orderField: "id",
      orderType: "DESC",
      seasonYear: "2021",
    },
    headers: {
      "Ocp-Apim-Subscription-Key": "c13c3a8e2f6b46da9c5c425cf61fab3e",
      "Content-Language": "en",
    },
  };

  try {
    const { data }: AxiosResponse<LaLigaClubSquad> = await axios(config);

    return data.squads;
  } catch (e) {
    showFailureToast();

    return [];
  }
};
