export interface SerieAFixtureAndResult {
  success: boolean;
  message: string;
  errors: any[];
  data: Match[];
  code: number;
}

export interface SerieATable {
  success: boolean;
  message: string;
  errors: any[];
  data: Standing[];
  code: number;
}

export interface SerieAMatchday {
  success: boolean;
  message: string;
  errors: any[];
  data: Matchday[];
  code: number;
}

export interface Matchday {
  id_category: number;
  title: string;
  description: string;
  slug: string;
  url: string;
  category_status: CategoryStatus;
}

export enum CategoryStatus {
  Live = "LIVE",
  Played = "PLAYED",
  ToBePlayed = "TO BE PLAYED",
}

export interface Standing {
  CAMPIONATO: string;
  CODSQUADRA: string;
  GIRONE: string;
  Giocate: number;
  GiocateCasa: number;
  GiocateFuori: number;
  Nome: string;
  NomeCompleto: string;
  NomeSintetico: string;
  Pareggiate: number;
  PareggiateCasa: number;
  PareggiateFuori: number;
  Perse: number;
  PerseCasa: number;
  PerseFuori: number;
  PosCls: number;
  PuntiCls: number;
  PuntiClsCasa: number;
  PuntiClsFuori: number;
  PuntiPen: number;
  RETIFATTE: number;
  RETISUBITE: number;
  RetiFatteCasa: number;
  RetiFatteFuori: number;
  RetiSubiteCasa: number;
  RetiSubiteFuori: number;
  STAGIONE: string;
  TURNO: string;
  Vinte: number;
  VinteCasa: number;
  VinteFuori: number;
  do_deleted: number;
  do_inserted: number;
  do_loaded: number;
  do_updated: number;
  team_active: string;
  team_image: string;
  team_image_secondary: string;
  team_slug: string;
  Note?: string;
  NoteENG?: string;
}

export interface Match {
  away_coach_id: number;
  away_coach_image: string;
  away_coach_name: string;
  away_coach_surname: string;
  away_goal: number;
  away_netco_id: string;
  away_penalty_goal: number;
  away_schema: string;
  away_secondary_team_logo: string;
  away_team_active: number;
  away_team_logo: string;
  away_team_name: string;
  away_team_short_name: string;
  away_team_url: string;
  broadcasters: string;
  category_status: string;
  championship_background_image: string;
  championship_category_id: number;
  championship_category_status: string;
  championship_image: string;
  championship_metadata: string;
  championship_title: string;
  date_time: Date;
  georule_id: number;
  highlight: string;
  home_coach_id: number;
  home_coach_image: string;
  home_coach_name: string;
  home_coach_surname: string;
  home_goal: number;
  home_netco_id: string;
  home_penalty_goal: number;
  home_schema: string;
  home_secondary_team_logo: string;
  home_team_active: number;
  home_team_logo: string;
  home_team_name: string;
  home_team_short_name: string;
  home_team_ticket_url: string;
  home_team_url: string;
  id_category: number;
  live_timing: string;
  match_day_category_status: CategoryStatus;
  match_day_id_category: number;
  match_day_title: string;
  match_hm: string;
  match_id: number;
  match_lineup_pdf: string;
  match_name: string;
  match_program_pdf: string;
  match_report: number;
  match_report_pdf: string;
  match_status: number;
  minutes_played: string;
  netco_id: string;
  play_phase: string;
  referee: string;
  round_category_status: null;
  round_id_category: number;
  round_title: string;
  season_title: string;
  slug: string;
  ticket_url: string;
  unknown_datetime: number;
  venue_background_image: string;
  venue_id: number;
  venue_image: string;
  venue_name: string;
  venue_plan_image: string;
  weather: string;
}

export interface SerieATeams {
  success: boolean;
  message: string;
  errors: any[];
  data: Teams;
  code: number;
}

export interface Teams {
  name: string;
  type: string;
  uicode: string;
  body: Team[];
  data: Pagination;
}

export interface Team {
  id: string;
  team_logo: string;
  team_name: string;
  url: string;
}

export interface Pagination {
  _limit: string;
  _total: number;
  subtitle: string;
  title: string;
}
