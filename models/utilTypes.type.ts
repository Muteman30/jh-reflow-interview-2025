import { booleanChoices } from './../utils/dictionary';

export type ISO8601DateTimeString = `${number}-${number}-${number} ${number}:${number}:${number}`;
export type UrlString = `http${string|''}://${string}`;
export type YesNo = keyof typeof booleanChoices;
export type HexColor = `#${string}`