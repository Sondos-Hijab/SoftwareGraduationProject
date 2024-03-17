import {
  faBell,
  faComments,
  faHouse,
  faImage,
  faRightFromBracket,
  faTableColumns,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

export const leftSidebarLinks = [
  {
    icon: faHouse,
    route: "/",
    label: "Home",
  },
  {
    icon: faTableColumns,
    route: "/",
    label: "Dashboard",
  },
  {
    icon: faImage,
    route: "/",
    label: "My Posts",
  },
  {
    icon: faUpload,
    route: "/",
    label: "Add a post",
  },
  {
    icon: faComments,
    route: "/",
    label: "Messages",
  },
  {
    icon: faBell,
    route: "/",
    label: "Notifications",
  },
  {
    icon: faRightFromBracket,
    route: "/",
    label: "Logout",
  },
];
