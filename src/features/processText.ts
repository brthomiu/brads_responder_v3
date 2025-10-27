import type { InfoObject } from "../types/InfoObject";
import { getCurrentLocalDateMMDDYYYY } from "./getCurrentLocalDate";

const matchVariable = (variable: string, infoObject: InfoObject): string => {
  switch (variable) {
    case "#tech":
      return infoObject.tech;
    case "#user":
      return infoObject.user;
    case "#item":
      return infoObject.item;
    case "#location":
      return infoObject.location;
    case "#time":
      return infoObject.timeFrame;
    case "#tracking":
      return infoObject.tracking;
    case "#today":
      return getCurrentLocalDateMMDDYYYY();
    case "#extraNote":
      return infoObject.extraNote;
    default:
      return "#VARIABLE_ERROR";
  }
};

export const processText = (
  text: string,
  infoObject: InfoObject
): string => {
  let processedText = text;

  const regex =
    /#(tech|user|item|location|time|tracking|today|extraNote)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const variable = `#${match[1]}`;
    const replacement = matchVariable(variable, infoObject);
    processedText = processedText.replace(variable, replacement);
  }

  // Replace three or more consecutive line breaks with exactly two line breaks
  processedText = processedText.replace(/\n{3,}/g, "\n\n");

  return processedText;
};
