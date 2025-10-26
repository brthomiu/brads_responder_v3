import type { InfoObject } from "../types/InfoObject";

export function loadInputState(field: string, defaultValue: string): string {
  const savedInfoObject = localStorage.getItem("infoObject");
  if (savedInfoObject) {
    const parsedInfoObject: InfoObject = JSON.parse(savedInfoObject);
    return parsedInfoObject[field as keyof InfoObject] || defaultValue;
  } else return defaultValue;
}
