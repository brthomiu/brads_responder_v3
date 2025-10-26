import type { Template } from "../types/Template";
import { templateList } from "../templateList";
import type { InfoObject } from "../types/InfoObject";
import { getCurrentLocalDateMMDDYYYY } from "../features/getCurrentLocalDate";
import React, { useState } from "react";
import { processVariables } from "../features/matchVariable";

interface InputField {
  key: string;
  label: string;
}

function Editor() {
  // State for selected template from dropdown menu
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // States that make up the OrderInfo Object
  const [infoObject, setInfoObject] = useState<InfoObject>({
    tech: "",
    user: "",
    item: "",
    orderClosed: "",
    location: "",
    timeFrame: "",
    tracking: "",
    today: getCurrentLocalDateMMDDYYYY(),
    extraNote: "",
  });

  // State for text area that holds final template text
  const [text, setText] = useState("");

  // Handle text area change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    localStorage.setItem("editorContent", event.target.value);
  };

  // Handle changes to the infoObject inputs
  const handleInfoObjectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field:
      | "tech"
      | "user"
      | "item"
      | "orderClosed"
      | "location"
      | "timeFrame"
      | "tracking"
      | "extraNote"
  ) => {
    const newInfoObject: InfoObject = { ...infoObject };

    newInfoObject[field] = event.target.value;
    setInfoObject(newInfoObject);

    localStorage.setItem("infoObject", JSON.stringify(newInfoObject));
  };

  // Define input fields
  const inputFields: InputField[] = [
    { key: "#tech", label: "Technician" },
    { key: "#user", label: "User" },
    { key: "#item", label: "Item" },
    { key: "#closed", label: "Closed" },
    { key: "#location", label: "Location" },
    { key: "#time", label: "Timeline" },
    { key: "#tracking", label: "Tracking" },
    { key: "#extraNote", label: "Extra Note" },
  ];

  // Function to check if a variable is present in the text
  const isVariablePresent = (variable: string): boolean => {
    return text.includes(variable);
  };

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
        {inputFields.map((field) => (
          isVariablePresent(field.key) && (
            <div key={field.key} className="w-lg h-8 flex flex-row">
              <div
                className="bg-gray-700 h-8 w-42 text-lg px-2 text-white font-semibold rounded-l-md outline-none"
              >
                {field.label}
              </div>
              <input
                key={field.key}
                className="bg-gray-800 h-8 w-full px-2 text-white rounded-r-md outline-none"
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInfoObjectChange(event, field.key as "tech" | "user" | "item" | "orderClosed" | "location" | "timeFrame" | "tracking" | "extraNote")
                }
              ></input>
            </div>
          )
        ))}
      </form>

      {/* Rendered Text ------------------------------------------------------------------------------------------------------- */}
      <div className="bg-gray-700 w-lg h-10 text-white text-lg font-semibold py-1 px-2 rounded-t-md">
        {selectedTemplate ? selectedTemplate.name : "Editor"}
      </div>
      <textarea
        readOnly
        className="mb-2 bg-gray-800 text-white p-4 rounded-b-md w-lg h-48 caret-transparent outline-none"
        value={processVariables(text, infoObject)}
        onChange={handleChange}
        placeholder="Enter text here..."
      ></textarea>

      {/* Copy Button - Copy contents to clipboard */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(processVariables(text, infoObject));
        }}
        className="bg-gray-700 h-10 w-full text-lg py-1 px-2 text-white font-semibold rounded-md hover:bg-gray-600 active:bg-gray-700"
      >
        Copy
      </button>
    </div>
  );
}

export default Editor;
