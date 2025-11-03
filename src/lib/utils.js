import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const lIVE_CLIENT_WEB_URL = "https://sharespace.com.ng";
export const LOCAL_CLIENT_WEB_URL = "http://localhost:3000";

export const FEEDBACK_URL = "https://forms.gle/2QnuRvNrDYG6aogm7";
export const SUPPORT_EMAIL = "mailto:contactdanielamos@gmail.com";
export const SUPPORT_PHONE = "https://wa.me/09037984710";

export const COMMUNITY_LINK =
  "https://chat.whatsapp.com/BmtdTEbDmknBZYfketc4Ek";

export const FIREBASE_APIKEY = "AIzaSyDsU2heMX_fy89fl1WjvjHel6O1lFyeuAk";
export const FIREBASE_AUTH_DOMAIN = "www.sharespace.com.ng";
export const FIREBASE_PROJECT_ID = "sharespaceng";
export const FIREBASE_STORAGE_BUCKET = "sharespaceng.appspot.com";
export const FIREBASE_MESSAGING_SENDER_ID = "579110495977";
export const FIREBASE_APP_ID = "1:579110495977:web:f4f9f2734bb60c00bdb278";
