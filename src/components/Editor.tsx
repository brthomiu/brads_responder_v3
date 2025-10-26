import React, { useState } from "react";
// Import Types
import type { Template } from "../types/Template";
import type { InputField } from "../types/InputField";
import type { InfoObject } from "../types/InfoObject";
// Import Features
import { getCurrentLocalDateMMDDYYYY } from "../features/getCurrentLocalDate";
import { processText } from "../features/processText";
import { loadInputState } from "../features/loadInputState";
import { handleChange } from "../features/handleChange";
import { isVariablePresent } from "../features/isVariablePresent";
// Import Templates
import { templateList } from "../templateList";

function Editor() {
  // State for selected template from dropdown menu
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  // States that make up the OrderInfo Object
  const [infoObject, setInfoObject] = useState<InfoObject>({
    tech: loadInputState("tech", ""),
    user: loadInputState("user", ""),
    item: loadInputState("item", ""),
    orderClosed: loadInputState("orderClosed", ""),
    location: loadInputState("location", ""),
    timeFrame: loadInputState("timeFrame", ""),
    tracking: loadInputState("tracking", ""),
    today: getCurrentLocalDateMMDDYYYY(),
    extraNote: loadInputState("extraNote", ""),
  });

  // State for text area that holds final template text
  const [text, setText] = useState("");

  // Define input fields
  const inputFields: InputField[] = [
    { key: "tech", label: "Technician" },
    { key: "user", label: "User" },
    { key: "item", label: "Item" },
    { key: "closed", label: "Closed" },
    { key: "location", label: "Location" },
    { key: "time", label: "Timeline" },
    { key: "tracking", label: "Tracking" },
    { key: "extraNote", label: "Extra Note" },
  ];

  // Return JSX ------------------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col">
      {/* Load Template Selector */}
      <div className="mb-6">
        <select
          className="bg-gray-700 h-8 w-lg text-lg font-semibold py-1 px-2 text-white rounded-md"
          defaultValue=""
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedName = e.target.value;
            const template =
              templateList.find((t) => t.name === selectedName) ?? null;
            setSelectedTemplate(template);
            if (template) {
              setText(template.body);
              localStorage.setItem("editorContent", template.body);
            }
          }}
        >
          <option value="" disabled>
            {"Load Template"}
          </option>
          {templateList.map((template) => (
            <option key={template.name} value={template.name}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Information Entry Section ------------------------------------------------------------------------------------------ */}
      <form className="flex flex-col gap-2 mb-6">
        {inputFields.map(
          (field) =>
            isVariablePresent(text, field.key) && (
              <div key={field.key} className="w-lg h-8 flex flex-row">
                <div className="bg-gray-700 h-8 w-42 text-lg px-2 text-white font-semibold rounded-l-md outline-none">
                  {field.label}
                </div>
                <input
                  key={field.key}
                  defaultValue={loadInputState(field.key, "")}
                  className="bg-gray-800 h-8 w-full px-2 text-white rounded-r-md outline-none"
                  type="text"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(
                      infoObject,
                      setInfoObject,
                      event,
                      field.key as
                        | "tech"
                        | "user"
                        | "item"
                        | "orderClosed"
                        | "location"
                        | "timeFrame"
                        | "tracking"
                        | "extraNote"
                    )
                  }
                ></input>
              </div>
            )
        )}
      </form>

      {/* Rendered Text ------------------------------------------------------------------------------------------------------- */}
      <div className="bg-gray-700 w-lg h-10 text-white text-lg font-semibold py-1 px-2 rounded-t-md">
        {selectedTemplate ? selectedTemplate.name : "Editor"}
      </div>
      <textarea
        readOnly
        className="mb-2 bg-gray-800 text-white p-4 rounded-b-md w-lg h-48 caret-transparent outline-none"
        value={processText(text, infoObject)}
        placeholder="Enter text here..."
      ></textarea>

      {/* Copy Button - Copy contents to clipboard */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(processText(text, infoObject));
        }}
        className="bg-gray-700 h-10 w-full text-lg py-1 px-2 text-white font-semibold rounded-md hover:bg-gray-600 active:bg-gray-700"
      >
        Copy
      </button>
    </div>
  );
}

export default Editor;
