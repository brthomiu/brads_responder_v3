import type { InfoObject } from "../types/InfoObject";
import { getCurrentLocalDateMMDDYYYY } from "./getCurrentLocalDate";

export function resetInputs(
  infoObject: InfoObject,
  setInfoObject: React.Dispatch<React.SetStateAction<InfoObject>>
) {
  const newInfoObject: InfoObject = {
    tech: infoObject.tech,
    user: "User",
    item: "requested item(s)",
    orderClosed:
      "This request is now being closed and the technician will no longer be able to see further responses, please visit go/stuff to request additional equipment, or visit go/fst-request for additional support.",
    location: "your desk",
    timeFrame: "8 business hours",
    tracking: "FedEx-XXXXXXXXXX",
    today: getCurrentLocalDateMMDDYYYY(),
    extraNote: "",
  };

  setInfoObject(newInfoObject);

  localStorage.setItem("infoObject", JSON.stringify(newInfoObject));
}