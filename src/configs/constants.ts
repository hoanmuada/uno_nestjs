export const CONSTANTS = () => {
  return {
    DEFAULT_LIMIT: parseInt(process.env.DEFAULT_LIMIT) || 10,
    ADMIN_URL: process.env.ADMIN_URL || '',
    SHARE_URL: process.env.SHARE_URL || '',
    ADMIN_DEFAULT_IMAGE:
      process.env.ADMIN_DEFAULT_IMAGE ||
      '/assets/images/avatars/unknown_avatar.jpg',
    API_URL: process.env.API_URL || '',
  };
};

export const APP_CONSTANTS = {
  LANG_CODE: 'lang-code',
  LANG_DEFAULT: 'VI',
  TIME_ZONE: 'utc',
  TIME_ZONE_DEFAULT: 0,
  ROOM_SOCKET: 'room_',
  KB_TO_B: 1024,
  DISTANCE_PARAM: 6371,
};
