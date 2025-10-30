export function autoSuggestVariables(
  text: string,
  variables: string[]
): string[] {
  const suggestions: string[] = [];
  const lowerCaseText = text.toLowerCase();
    for (const variable of variables) {
    if (variable.toLowerCase().includes(lowerCaseText)) {
        suggestions.push(variable);
    }
  }
  return suggestions;

}

// features/loadInputState.ts
import type { InfoObject } from "../types/InfoObject";
// Load the input state from local storage or use a default value
export function loadInputState(field: string, defaultValue: string): string {
  const savedInfoObject = localStorage.getItem("infoObject");
    if (savedInfoObject) {
    const parsedInfoObject: InfoObject = JSON.parse(savedInfoObject);
    return parsedInfoObject[field as keyof InfoObject] || defaultValue;
  } else return defaultValue;

}

// Function to check if a variable is present in the text
export const isVariablePresent = (text: string, variable: string): boolean => {
  return text.includes(variable);
};

