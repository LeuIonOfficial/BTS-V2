type Airport = {
  id: number;
  airport_name: string;
  iata_code: string;
  city_name: string;
  state_name: string | null;
  country_name: string;
  region_id: string;
  is_favorite: number;
};

type FlightDetail = {
  child: number;
  price: number;
  adults: number;
  iata_to: string;
  infants: number;
  direction: string;
  iata_from: string;
  flight_class: string;
  departure_date: string;
  from: Airport;
  to: Airport;
};

type Client = {
  id: number;
  first_name: string;
  last_name: string;
  is_return: boolean;
  emails: string[];
  phones: string[];
};

type User = {
  id: number;
  name: string;
  role: string;
  email: string;
  is_deactivated: number;
  phone: string;
};

export type TicketCategory = {
  id: number;
  user_id: number;
  client_id: number;
  assigned_time: string | null;
  is_conversion: number;
  comment: string;
  marketing_source: string;
  ip_address: string;
  details: FlightDetail[];
  created_at: string;
  client: Client;
  user: User;
};

export type FlightResponse = {
  data: TicketCategory[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: [];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
};
