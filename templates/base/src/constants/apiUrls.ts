const generateApiUrl = (endpoint: string) => `/api/v1/${endpoint}`;

export const AUTH_URLS = {
  LOGIN: generateApiUrl("auth/login"),
  SIGNUP: generateApiUrl("auth/signup"),
  LOGOUT: generateApiUrl("auth/logout"),
  REFRESH_TOKEN: generateApiUrl("auth/refresh"),
  SEND_EMAIL_CODE: generateApiUrl("auth/email/send-code"),
  VERIFY_EMAIL_CODE: generateApiUrl("auth/email/verify-code"),
  CHANGE_PASSWORD: generateApiUrl("users/password"),
};

export const USER_URLS = {
  ME: generateApiUrl("users/me"),
  UPDATE: generateApiUrl("users/me"),
  DELETE: generateApiUrl("users/me"),
};

export const FILE_URLS = {
  UPLOAD_SINGLE: generateApiUrl("files/upload"),
  UPLOAD_MULTIPLE: generateApiUrl("files/uploads"),
};
