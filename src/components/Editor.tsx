import React, { useState, useEffect } from "react"; // <-- Import useEffect
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
import { resetInputs } from "../features/resetInputs";
// Import Templates
import { templateList } from "../templateList";

// --- CHANGE 1: Define the default template ---
const defaultTemplate = templateList[0] || null;

function Editor() {
  // --- CHANGE 2: Update state initializations ---
  // State for selected template from dropdown menu
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    defaultTemplate
  );

  // States that make up the OrderInfo Object
  const [infoObject, setInfoObject] = useState<InfoObject>({
    tech: loadInputState("tech", "Your Technician"),
    user: loadInputState("user", "User"),
    item: loadInputState("item", "requested item(s)"),
    orderClosed: loadInputState("orderClosed", "This request is now being closed and the technician will no longer be able to see further responses, please visit go/stuff to request additional equipment, or visit go/fst-request for additional support."),
    location: loadInputState("location", "your desk"),
    timeFrame: loadInputState("timeFrame", "8 business hours"),
    tracking: loadInputState("tracking", "FedEx-XXXXXXXXXX"),
    today: getCurrentLocalDateMMDDYYYY(),
    extraNote: loadInputState("extraNote", ""),
  });

  // State for text area that holds final template text
  const [text, setText] = useState(defaultTemplate?.body || "");
  // --- End of CHANGE 2 ---

  // --- CHANGE 3: Add useEffect to save to localStorage on load ---
  useEffect(() => {
    if (defaultTemplate) {
      localStorage.setItem("editorContent", defaultTemplate.body);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Define input fields
  const inputFields: InputField[] = [
    { key: "tech", label: "Technician" },
    { key: "user", label: "User" },
    { key: "item", label: "Item" },
    { key: "location", label: "Location" },
    { key: "timeFrame", label: "Timeframe" },
    { key: "tracking", label: "Tracking" },
    { key: "extraNote", label: "Extra Note" },
  ];

  // Return JSX ------------------------------------------------------------------------------------------------
  return (
    <div className="flex flex-col">
      {/* Load Template Selector */}
      <div className="mb-6">
        {/* --- CHANGE 4: Update <select> to be a controlled component --- */}
        <select
          className="bg-gray-700 h-8 w-lg text-lg font-semibold py-1 px-2 text-white rounded-md"
          value={selectedTemplate?.name || ""} // Use value prop bound to state
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
          {/* The disabled "Load Template" option is no longer needed */}
          {templateList.map((template) => (
            <option key={template.name} value={template.name}>
              {template.name}
            </option>
          ))}
        </select>
        {/* --- End of CHANGE 4 --- */}
      </div>

      {/* Information Entry Section ------------------------------------------------------------------------------------------ */}
      <form className="flex flex-col gap-2 mb-4">
        {inputFields.map(
          (field) =>
            isVariablePresent(text, field.key) && (
              <div key={field.key} className="w-lg h-8 flex flex-row">
                <div className="bg-gray-700 h-8 w-42 text-lg px-2 text-white font-semibold rounded-l-md outline-none">
                  {field.label}
                </div>
                <input
                  // This is the change from the previous request (controlled component)
                  value={infoObject[field.key as keyof InfoObject] || ""}
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
      <button className="mb-4 bg-red-900 h-10 w-full text-lg py-1 px-2 text-white font-semibold rounded-md hover:bg-red-800 active:bg-red-900" onClick={() => resetInputs(infoObject, setInfoObject)}>Reset Fields</button>

      {/* Rendered Text ------------------------------------------------------------------------------------------------------- */}
      <div className="bg-gray-700 w-lg h-10 text-white text-lg font-semibold py-1 px-2 rounded-t-md">
        {selectedTemplate ? selectedTemplate.name : "Editor"}
      </div>
      <textarea
        readOnly
        className="mb-4 bg-gray-800 text-white p-4 rounded-b-md w-lg h-72 caret-transparent outline-none"
        value={processText(text, infoObject)}
        placeholder="Enter text here..."
      ></textarea>

      {/* Copy Button - Copy contents to clipboard */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(processText(text, infoObject));
        }}
        className="bg-green-900 h-10 w-full text-lg py-1 px-2 text-white font-semibold rounded-md hover:bg-green-800 active:bg-green-900"
      >
        Copy
      </button>
    </div>
  );
}

export default Editor;