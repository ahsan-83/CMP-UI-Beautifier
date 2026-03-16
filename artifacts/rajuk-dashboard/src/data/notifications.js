export const NOTIFICATIONS = [
  {
    id: 1,
    title: "New Waiting for Delivery Customer Resource Order arrived",
    description: "You have a Waiting for Delivery Customer Resource Order ID: 20260315-NDC-00075-516.",
    hoursAgo: 18,
    read: false,
  },
  {
    id: 2,
    title: "Resource Order",
    description: "New Resource Order arrived from customer Rajdhani Unnayan Kartipakkha (RAJUK) (with attachment)",
    hoursAgo: 18,
    read: false,
  },
  {
    id: 3,
    title: "Resource Order",
    description: "New Resource Order arrived from customer Rajdhani Unnayan Kartipakkha (RAJUK) (with attachment)",
    hoursAgo: 20,
    read: false,
  },
  {
    id: 4,
    title: "Resource Order",
    description: "New Resource Order arrived from customer Rajdhani Unnayan Kartipakkha (RAJUK) (with attachment)",
    hoursAgo: 20,
    read: false,
  },
  {
    id: 5,
    title: "Resource Order",
    description: "New Resource Order arrived from customer Rajdhani Unnayan Kartipakkha (RAJUK) (with attachment)",
    hoursAgo: 20,
    read: false,
  },
  {
    id: 6,
    title: "Resource Order",
    description: "New Resource Order arrived from customer Rajdhani Unnayan Kartipakkha (RAJUK) (with attachment)",
    hoursAgo: 20,
    read: false,
  },
  {
    id: 7,
    title: "Resource Order",
    description: "New Resource Order arrived from customer Rajdhani Unnayan Kartipakkha (RAJUK) (with attachment)",
    hoursAgo: 21,
    read: false,
  },
  {
    id: 8,
    title: "New Waiting for Delivery Customer Resource Order arrived",
    description: "You have a Waiting for Delivery Customer Resource Order ID: 20260311-NDC-00075-492.",
    hoursAgo: 21,
    read: false,
  },
  {
    id: 9,
    title: "Resource Order",
    description: "New Resource Order arrived from customer Rajdhani Unnayan Kartipakkha (RAJUK)",
    hoursAgo: 22,
    read: true,
  },
  {
    id: 10,
    title: "Resource Order",
    description: "New Resource Order arrived from customer Rajdhani Unnayan Kartipakkha (RAJUK) (with attachment)",
    hoursAgo: 23,
    read: true,
  },
  {
    id: 11,
    title: "Order Status Updated",
    description: "Your order 20260310-NDC-00075-488 has been approved and is being processed.",
    hoursAgo: 25,
    read: true,
  },
  {
    id: 12,
    title: "Contract Renewal Reminder",
    description: "Your contract NDC-00075 is due for renewal in 30 days. Please review and take action.",
    hoursAgo: 30,
    read: true,
  },
];

export const TOTAL_NOTIFICATIONS = 865;
export const UNREAD_COUNT = NOTIFICATIONS.filter((n) => !n.read).length;
