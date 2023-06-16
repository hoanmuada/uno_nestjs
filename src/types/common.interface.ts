export interface ObjectResponse {
  success: boolean;
  status: number;
  messages: string[];
  data: {};
}

export interface Pagination {
  countItem: number;
  totalPage: number;
  currentPage: number;
  limit: number;
}

export interface DataListResponse {
  items: Array<Object>;
  pagination: Pagination;
  itemsIds?: number[];
}

export interface JwtPayload {
  id: number;
  name: string;
  phoneNumber: string;
  isAdmin: boolean;
  isCustomer: boolean;
  isCompany: boolean;
  avatar: string;
  countryId: number;
  languageId: number;
}

export interface JwtPayloadRefresh extends JwtPayload {
  refreshToken: string;
}

export interface ItemParam {
  id: number;
  name: string;
}

export interface LatLng {
  lat: string;
  lng: string;
  latReal?: string;
  lngReal?: string;
  languageId?: number;
}
