export enum Page {
  HOME,
  MODE_SELECTION,
  SEARCH,
  DETAILS,
  FULL_ROUTE,
  MAP,
}

export enum TransportMode {
  BUS = 'BUS',
  TRAIN = 'TRAIN',
}

export enum SearchMode {
  NUMBER = 'NUMBER',
  DESTINATION = 'DESTINATION',
}

export enum MapMode {
  CURRENT_LOCATION = 'CURRENT_LOCATION',
  PLACE_TO_PLACE = 'PLACE_TO_PLACE',
}

export interface Stop {
  name: string;
  arrivalTime: string;
  departureTime: string;
  priceFromPrevious: number;
}

export interface Route {
  id: string;
  mode: TransportMode;
  number: string;
  startTime: string;
  endTime: string;
  startLocation: string;
  destination: string;
  via: string[];
  totalPrice: number;
  stops: Stop[];
  type: 'AC' | 'Non-AC' | 'Express' | 'Superfast' | 'Local';
  session: 'Weekday' | 'Weekend';
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
}

export interface Filters {
  type: string[];
  time: string[];
  session: string[];
}
