import {
  ISO8601DateTimeString, UrlString, HexColor 
} from './utilTypes.type';


type Defect = {
  'id': number,
  'url': UrlString,
  'date': ISO8601DateTimeString,
  'path': string,
  'title': string,
  'width': number,
  'height': number,
  'uploaded': boolean
}

type Check = {
  id: number;
  defects: Defect[]; // TODO find a defect so we can define the type
  safety_check: string;
  safety_notes: string;
  set_required: string;
  safety_check_title: string;
}


type Signature = {
  id: number;
  url: UrlString;
  date: ISO8601DateTimeString;
  path: string;
  title: string;
  width: number;
  height: number;
  uploaded: boolean;
}

type CheckedBy = {
  'id': number,
  'files': string,
  'userId': string, //this is a number saved as a string
  'tokenId': string, //this is a number saved as a string
  'statement': string,
  'signatures': Signature[]
}

type StartChecks = {
  'id': number,
  'userId': string, //this is a number saved as a string
  'tokenId': string, //this is a number saved as a string
  'datetime': ISO8601DateTimeString,
  'latitude': string, //this is a number saved as a string
  'targetId': number,
  'longitude': string //this is a number saved as a string
}

export type VehicleSafetyCheck = {
  id: number,
  date: ISO8601DateTimeString, //ISO 8601 datetime string
  'checks': Check[],
  'userId': string, //this is a number saved as a string
  'entryId': number,
  'isDraft': boolean,
  'tokenId': string, //this is a number saved as a string
  'formName': `${ISO8601DateTimeString} - ${string}`,
  'odometer': number,
  'completed': boolean,
  'pdfViewed': string, //TODO find type, only had blank string to go on
  'vehicleId': string, //this is a number saved as a string
  'checked_by': CheckedBy,
  'formStatus': number,
  'dateCreated': ISO8601DateTimeString,
  'dateUpdated': ISO8601DateTimeString,
  'instructions': string,
  'registration': string,
  'start_checks': StartChecks,
  'userStatusId': string, //this is a number saved as a string
  'vehicle_make': string,
  'vehicle_type': string,
  'status_colour': HexColor,
  'transactionId': `${number}-${number}-${number}_${number}-${number}-${number}-${string}`,
  'userViewPdfId': string, //TODO find out if this is populated with anything specific
  'vehicle_class': string, //TODO find out if this is populated with anything specific
  'vehicle_model': string,
  'odometer_next_service': string //TODO find out if this is populated with anything specific
};