import type { Template } from "./types/Template";

export const templateList: Template[] = [
  {
    name: "Bronco - First Response",
    body: "Hello #user,\n\nYour order for the #item has been received and is being processed. You will receive an update from the assigned technician providing the status of your order within #timeFrame.\n\n#extraNote\n\nBest regards,\n#tech",
  },
  {
    name: "Bronco - Desk Delivery",
    body: "Hello #user,\n\nThe #item that you ordered has been delivered to #location on #today.\n\n#extraNote\n\nThis request is now being closed and the technician will no longer be able to see further responses, please visit go/stuff to request additional equipment, or visit go/fst-request for additional support.\n\nBest regards,\n#tech",
  },
  {
    name: "Bronco - Remote Delivery",
    body: "Hello #user,\n\nThe #item you ordered is ready!\n\nThis order is being shipped to you via FedEx. Please see the tracking number for the shipment below.\n\nFedEx Tracking ID: #tracking\n\n#extraNote\n\nI will follow up with this request in 5 business days to confirm that the shipment was delivered.\n\nBest regards,\n#tech",
  },
  {
    name: "Bronco - Shipment Confirmed",
    body: "Hello #user,\n\nFedEx tracking is showing that your order was delivered on #today.\n\n#extraNote\n\nThis request is now being closed and the technician will no longer be able to see further responses, please visit go/stuff to request additional equipment, or visit go/fst-request for additional support.\n\nBest regards,\n#tech",
  },
];
