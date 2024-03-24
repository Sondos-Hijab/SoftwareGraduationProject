import React from "react";
import { Link } from "react-router-dom";

const NotificationCard = () => {
  return (
    <div>
      <Link className="border p-4 flex justify-between bg-slate-50">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            className="size-16 rounded-full object-cover"
          />

          <div>
            <strong className="font-medium text-customBlue">Username</strong>

            <p className="mt-1 text-sm">
              Added a feedback about your your business.
            </p>
          </div>
        </div>

        <img
          alt=""
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="size-16 object-cover"
        />
      </Link>
    </div>
  );
};

export default NotificationCard;
