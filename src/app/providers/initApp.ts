import {AuthenticationService} from "../services/authentication.service";

export function initApp(auth: AuthenticationService) {
  // let storage = localStorage.getItem('credentials') || '';

  return () => auth.login();
}

function isJsonString(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return '';
  }
}
