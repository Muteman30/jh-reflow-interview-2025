import { Vehicle } from './Vehicle.type';
import {
  ISO8601DateTimeString, YesNo, UrlString, HexColor
} from './utilTypes.type';

import { sections } from '../utils/dictionary';

type Sections = typeof sections[number];
type LastKnownLocation = {
  lat: string;
  lng: string;
  userId: number;
  datetime: ISO8601DateTimeString; // ISO 8601 or timestamp format
}

type ImageData = {
  id: number;
  uri: UrlString;
  uuid: string | null;
  cache: boolean;
  title: string;
  width: number;
  height: number;
  enabled: boolean;
  post_at: ISO8601DateTimeString;
  dateCreated: ISO8601DateTimeString;
  dateUpdated: ISO8601DateTimeString;
  dateModified: ISO8601DateTimeString;
  documentGroupId: number | null;
};

type VehicleSafetyCheck = {
  id: number;
  uuid: string | null;
  title: string;
  enabled: boolean;
  post_at: ISO8601DateTimeString;
  section: string;
  authorId: number | null;
  subsection: string;
  dateCreated: ISO8601DateTimeString;
  dateUpdated: ISO8601DateTimeString;
  subsectionTitle: string;
  safetyCheckTypeId: number;
};

type NoteData = {
  note: string; // HTML string representing the note content
  added: number;
  enabled: boolean;
  post_at: ISO8601DateTimeString; 
  personId: number | null; // Nullable numeric person identifier
  dateUpdated: ISO8601DateTimeString; 
};
type PlantGroupData = {
  id: number;
  uuid: string | null;
  title: string;
  enabled: boolean;
  post_at: ISO8601DateTimeString; 
  section: string;
  authorId: number;
  subsection: string;
  dateCreated: ISO8601DateTimeString;
  dateUpdated: ISO8601DateTimeString;
  subsectionTitle: string;
}
type DocumentData = {
  id: number;
  uri: UrlString;
  uuid: string | null; // Nullable UUID
  cache: boolean; // Indicates whether caching is enabled
  title: string;
  enabled: boolean; // Specifies if the document is active
  post_at: ISO8601DateTimeString;
  dateCreated: ISO8601DateTimeString;
  dateUpdated: ISO8601DateTimeString;
  dateModified: ISO8601DateTimeString;
  documentGroupId: number; // Numeric identifier for the document group
};

export type Vehicle = {
  id: number,
  key: string,
  cost: number,
  make: string,
  uuid: null,
  class: string,
  color: HexColor,
  model: string,
  title: string,
  depotId: number|null,
  enabled: boolean,
  imageId: number,
  post_at: string,
  section: Sections,
  authorId: number,
  tyreSize: string,
  ownership: 'Owned' | string,
  salePrice: number,
  tyreBrand: string,
  subsection: Sections,
  supplierId: null,
  dateCreated: string,
  dateUpdated: string,
  description: string,
  fuel_Source: string,
  lastMotDate: string,
  plantGroupId: number,
  statusDefect: number,
  allocatedToId: number|null,
  complianceDate: ISO8601DateTimeString, 
  lastServiceDate: ISO8601DateTimeString;
  subsectionTitle: string;
  tyrePressureMax: number;
  tyrePressureMin: number;
  lastKnownMileage: number;
  lastKnownLocation: LastKnownLocation;
  thirdPartyBarcode: string;
  lastServiceMileage: number;
  vehicleTaxDuration: string; // TODO String since it looks like a duration in months
  waterPoweredEngine: string; // TODO Assuming it's a string placeholder
  serviceIntervalDays: number;
  vehicleTaxValidFrom: ISO8601DateTimeString; // ISO 8601 timestamp string
  ejectorSeatInstalled: YesNo; 
  serviceIntervalMiles: number;
  solarPoweredTyrePumper: boolean;
  complianceIntervalMonths: number;
  turboBoostButtonInstalled: YesNo;
  unresolvedVehicleIssueIds: string; 
  image: ImageData[],
  vehicle_safety_checks: VehicleSafetyCheck[],
  adminNotes: NoteData[],
  plantGroup: PlantGroupData[],
  assetDocuments: DocumentData[],
  supplier: [],
  depot: [],
  allocatedTo: [],
  equipment: [],
  allocatedPlantToVehicle: [],
  sDExample: []
}