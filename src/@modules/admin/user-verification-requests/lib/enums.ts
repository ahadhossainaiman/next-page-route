export enum ENUM_USER_VERIFICATION_REQUESTS_TITLES_TYPES {
  NID = 'NID',
  Passport = 'Passport',
  'Driving License' = 'Driving License',
}

export type TUserVerificationRequestsTitlesType = keyof typeof ENUM_USER_VERIFICATION_REQUESTS_TITLES_TYPES;
export const userVerificationRequestsTitlesTypes = Object.values(ENUM_USER_VERIFICATION_REQUESTS_TITLES_TYPES);

export enum ENUM_USER_VERIFICATION_REQUESTS_CONTENT_TYPES {
  image = 'image',
  text = 'text',
  pdf = 'pdf',
  video = 'video',
}

export type TUserVerificationRequestsContentType = keyof typeof ENUM_USER_VERIFICATION_REQUESTS_CONTENT_TYPES;
export const userVerificationRequestsContentTypes = Object.values(ENUM_USER_VERIFICATION_REQUESTS_CONTENT_TYPES);
