import {AuthenticationService} from "./authentication.service";

export function initApp(auth: AuthenticationService) {
  let storage = localStorage.getItem('credentials') || '';

  return () => auth.login(isJsonString(storage));
}

function isJsonString(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return '';
  }
}
