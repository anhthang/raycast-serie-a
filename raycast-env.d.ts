/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Language - Your preferred language. */
  "language": "en" | "it",
  /** API Key - API key for accessing statistics data. */
  "apikey": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `table` command */
  export type Table = ExtensionPreferences & {}
  /** Preferences accessible in the `result` command */
  export type Result = ExtensionPreferences & {}
  /** Preferences accessible in the `club` command */
  export type Club = ExtensionPreferences & {}
  /** Preferences accessible in the `coppa` command */
  export type Coppa = ExtensionPreferences & {}
  /** Preferences accessible in the `international` command */
  export type International = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `table` command */
  export type Table = {}
  /** Arguments passed to the `result` command */
  export type Result = {}
  /** Arguments passed to the `club` command */
  export type Club = {}
  /** Arguments passed to the `coppa` command */
  export type Coppa = {}
  /** Arguments passed to the `international` command */
  export type International = {}
}



