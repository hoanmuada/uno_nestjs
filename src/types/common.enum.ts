export const ColumnPagination = ['page', 'limit'];

export enum Status {
  INACTIVE = 1,
  ACTIVE = 2,
}

export enum StatusAll {
  DELETE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
}

export enum StatusName {
  INACTIVE = 'Không kích hoạt',
  ACTIVE = 'Kích hoạt',
}

export enum ItemStatus {
  INACTIVE = 1, // chua la partner, dung vs interested, ket hop vs isInterested
  ACTIVE = 2,
  WAIT = 3,
  CANCEL = 4, // tu choi partner
}

export enum ItemStatusAll {
  DELETE = 0,
  INACTIVE = 1,
  ACTIVE = 2,
  WAIT = 3,
  CANCEL = 4,
}

export enum ItemStatusName {
  INACTIVE = 'Không kích hoạt',
  ACTIVE = 'Kích hoạt',
  WAIT = 'Chờ duyệt',
  CANCEL = 'Hủy',
}

export enum TrueFalse {
  ALL = 0,
  FALSE = 1,
  TRUE = 2,
}

export enum HierarchyReturnType {
  LIST = 1,
  PARENT = 2,
}

export enum FileType {
  IMAGE = 1,
  PDF = 2,
  WORD = 3,
  EXCEL = 4,
}

export enum Language {
  VI = 1,
  EN = 2,
}

export enum ItemType {
  CAREER = 1,
  ARTICLE = 2,
  JOB = 3,
  PARTNER = 4,
}

export enum Currency {
  VND = 1,
  USD = 2,
  AUD = 3,
  CAD = 4,
  JPY = 5,
  EUR = 6,
  GBP = 7,
  RUB = 8,
  CNH = 9,
}

export enum UserType {
  NONE = 0,
  FREE = 1,
  PROFESSIONAL = 2,
  MOVING = 3,
}

export enum UserTypeMonth {
  NO_MONTH = 0,
  ONE_MONTH = 1,
  SIX_MONTH = 6,
  TWELVE_MONTH = 12,
}

export enum StorageType {
  NONE = 0,
  FIVE_GB = 1,
  TEN_GB = 2,
  FIFTY_GB = 10,
}

export enum ExternalSystemType {
  CHAT = 1,
  INVOICE = 2,
  LOGGER = 3,
  FCM = 4,
  SMS = 5,
}
