import type { InfoObject } from "../types/InfoObject";

// Handle changes to the infoObject inputs
 export const handleChange = (
    infoObject: InfoObject,
    setInfoObject: React.Dispatch<React.SetStateAction<InfoObject>>,
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