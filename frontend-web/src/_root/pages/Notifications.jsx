import React from "react";

const Notifications = () => {
  return <div>Notifications</div>;
};

export default Notifications;

export async function notificationsLoader() {
  const response = await fetch("url");
  if (!response.ok) {
    // handle error
  } else {
    const resData = await response.json();
    //return data
    return resData;
  }
}
