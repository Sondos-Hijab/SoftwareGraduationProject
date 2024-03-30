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
    route: "/dashboard",
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
    route: "/chatting",
    label: "Messages",
  },
  {
    icon: faBell,
    route: "/notifications",
    label: "Notifications",
  },
];
