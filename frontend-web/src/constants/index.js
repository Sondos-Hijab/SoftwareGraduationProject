import {
  faBell,
  faComments,
  faHouse,
  faImage,
  faUsers,
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
    route: "/posts",
    label: "My Posts",
  },
  {
    icon: faUpload,
    route: "/create-post",
    label: "Create post",
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
];
