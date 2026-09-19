import { PropertyFormPayload } from "@/schemas/schema";
import { TableRootProps } from "@chakra-ui/react";
import { countries } from "country-data-list";

export type Role = "Admin" | "Agent" | "User";

// Define the type for category values
export type PropertyCategory = "Rent" | "Sale" | "Joint Venture";

export type ApiErrorResponse =
  | string
  | {
      [key: string]: string[];
    };

export interface OptionType {
  id: string;
  name: string;
}

export interface InspectionOptionType {
  id: string;
  name: string;
  idprop: string;
}

export const countriesData = countries.all
  .filter((c) => c.name && c.alpha2)
  .map((c) => ({
    name: c.name,
    id: c.alpha2,
  }));

export interface Auth {
  access: string | null;
  refresh: string | null;
  user: {
    email: string;
    account_type: Role;
    first_name: string;
    last_name: string;
    country_code: string;
    phone_number: string | null;
    member_id: string;
  } | null;
  access_expiration: string | null;
  refresh_expiration: string | null;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export interface Blog {
  id: number;
  title: string;
  body: string;
  image: string;
  date_created: string;
}

export interface Property {
  id: number;
  agent: string;
  name: string;
  picture1: string;
  picture2: string;
  picture3: string;
  picture4: string;
  picture5: string;
  picture6: string;
  picture7: string;
  picture8: string;
  picture9: string;
  picture10: string;
  featured: boolean;
  beds: number;
  bathrooms: number;
  toilets: number;
  property_id: string;
  description: string;
  proposal: string;
  premium: string;
  sharing_ratio: string;
  facilitator_fee: string;
  more_details: string;
  location: string;
  sub_location: string;
  district: string;
  address: string;
  category: string;
  prop_type: string;
  price: number;
  price_options: string;
  furnished: boolean;
  newly_built: boolean;
  car_park: boolean;
  shared: boolean;
  swimming_pool: boolean;
  gym: boolean;
  electricity: boolean;
  created_at: string;
  updated_at: string;
  under_contract: boolean;
  off_plan: boolean;
  serviced: boolean;
  inside_an_estate: boolean;
  payment_options: string;
  initial_deposit: number;
  video_available_on_request: boolean;
  other_amenities: string;
  approved: boolean;
  disapproved: boolean;
}

export interface SortableProperty {
  created_at?: string;
  date_created?: string;
  date_joined?: string;
  prop?: Property;
  price?: number | string;
  agent?: string;
}

export type SortDirection =
  | "oldest"
  | "latest"
  | "admin"
  | "price_low"
  | "price_high";

export interface PartnerProps {
  setIsAgent?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDev?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLord?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPartner?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  date_created: string;
  read: boolean;
}

export interface Message {
  id: string;
  sender: string;
  subject: string;
  date_created: string;
  read: boolean;
}

export interface AdminMessageDetail {
  data: {
    id: string;
    prop: Property;
    sender: string;
    receiver: string;
    property_id: string;
    subject: string;
    body: string;
    read: boolean;
    date_created: string;
  }
  sender_id: string;
}

export interface MessageDetail {
  id: string;
  sender: string;
  receiver: string;
  subject: string;
  body: string;
  read: boolean;
  date_created: string;
}

export interface SavedProperty {
  id: string | number;
  prop: Property;
}

export interface Inspection {
  id: string;
  inspection_id: string;
  prop_1: {
    id: string;
    prop: Property;
  };
  prop_2: {
    id: string;
    prop: Property;
  };
  prop_3: {
    id: string;
    prop: Property;
  };
  date_created: string;
  district: string;
  date: string;
  timeslot: string;
}

export interface Agent {
  id: string;
  user: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  contact_number2: string;
  profile_picture: string;
  rating: string;
  email_address: string;
  member_id: string;
  agency: string;
  bank_name: string;
  name_on_account: string;
  account_number: string;
  verified: boolean;
  address: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  profile_picture: string;
  email_address: string;
  member_id: string;
  verified: boolean;
  address: string;
  created_at: string;
}

export interface Member {
  id: string;
  email: string;
  account_type: "Agent" | "User";
  date_joined: string;
  first_name: string;
  last_name: string;
  member_id: string;
  phone_number: string;
}

export interface UserDetail {
  data: Member | null;
  address: string;
  rating: string | number;
}

export interface AgentDetail {
  id: string;
  user: string;
  first_name: string;
  last_name: string;
  contact_number: string;
  contact_number2: string;
  profile_picture: string;
  rating: string;
  email_address: string;
  member_id: string;
  agency: string;
  verified: boolean;
  address: string;
  created_at: string;
}

export type Column<T> = {
  label: string;
  key: keyof T;
  render?: (row: T, index: number) => React.ReactNode;
  align?: "center" | "left" | "right";
};

export type ReusableTableProps<T> = TableRootProps & {
  data: T[];
  columns: Column<T>[];
  showSerialNumber?: boolean;
};

export const mapPropertyToFormPayload = (
  property: Property | null
): PropertyFormPayload => {
  if (!property) {
    // Provide blank form defaults
    return {
      name: "",
      description: "",
      more_details: "",
      category: "",
      prop_type: [],
      beds: "",
      bathrooms: "",
      toilets: "",
      initial_deposit: "",
      payment_options: [],
      sub_location: [],
      district: [],
      address: "",
      price: "",
      price_options: "",
      picture1: undefined as unknown as File,
      picture2: undefined as unknown as File,
      picture3: undefined as unknown as File,
      picture4: undefined as unknown as File,
      picture5: undefined as unknown as File,
      picture6: undefined as unknown as File,
      picture7: undefined as unknown as File,
      picture8: undefined as unknown as File,
      picture9: undefined as unknown as File,
      picture10: undefined as unknown as File,
      furnished: false,
      newly_built: false,
      car_park: false,
      shared: false,
      swimming_pool: false,
      gym: false,
      electricity: false,
      under_contract: false,
      off_plan: false,
      serviced: false,
      inside_an_estate: false,
      video_available_on_request: false,
      other_amenities: null,
    };
  }

  return {
    name: property?.name,
    description: property?.description,
    more_details: property?.more_details,
    category: property?.category,
    prop_type: property?.prop_type.split(",").map((s) => s.trim()) ?? [],
    beds: property.beds.toString(),
    bathrooms: property.bathrooms.toString(),
    toilets: property.toilets.toString(),
    initial_deposit: property?.initial_deposit.toString(),
    payment_options:
      property?.payment_options.split(",").map((s) => s.trim()) ?? [],
    sub_location: property?.sub_location.split(",").map((s) => s.trim()) ?? [],
    district: property?.district.split(",").map((s) => s.trim()) ?? [],
    address: property?.address,
    price: property.price?.toLocaleString(),
    price_options: property?.price_options,
    picture1: property?.picture1 as unknown as File,
    picture2: property?.picture2 as unknown as File,
    picture3: property?.picture3 as unknown as File,
    picture4: property?.picture4 as unknown as File,
    picture5: property?.picture5 as unknown as File,
    picture6: property?.picture6 as unknown as File,
    picture7: property?.picture7 as unknown as File,
    picture8: property?.picture8 as unknown as File,
    picture9: property?.picture9 as unknown as File,
    picture10: property?.picture10 as unknown as File,
    furnished: property?.furnished,
    newly_built: property?.newly_built,
    car_park: property?.car_park,
    shared: property?.shared,
    swimming_pool: property?.swimming_pool,
    gym: property?.gym,
    electricity: property?.electricity,
    under_contract: property?.under_contract,
    off_plan: property?.off_plan,
    serviced: property?.serviced,
    inside_an_estate: property?.inside_an_estate,
    video_available_on_request: property?.video_available_on_request,
    other_amenities: property?.other_amenities,
  };
};

export interface RatingHistory extends SortableProperty {
  id: string | number;
  rating: string;
  date: string;
  user: string | number;
  reason: string;
}

export interface Document {
  id: string | number;
  user: string | number;
  identity_card: string;
  CAC: string;
}