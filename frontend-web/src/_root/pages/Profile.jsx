import React from "react";
import placeHolderLogo from "../../assets/images/profile_picture.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import LocationView from "@/_auth/forms/LocationInfoForm/LocationView";
const Profile = () => {
  return (
    <div className="mt-8 h-full w-full flex flex-col justify-center items-center">
      <div className="relative">
        <img
          className="inline-block h-52 w-52 rounded-full ring-2 ring-white mx-auto"
          src={placeHolderLogo}
          alt="business logo"
        />
        <Button className="absolute bottom-2 right-6 bg-[#13b6f5] w-10 h-10 rounded-full flex justify-center items-center hover:bg-[#fac100]">
          <FontAwesomeIcon className="text-white" icon={faPen} />
        </Button>
      </div>

      {/* info */}
      <div className="mt-12 w-3/5">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-[#2f47c6] ">
            Business Information
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Business Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                RateRelay Business
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Business Phone Number
              </dt>
              <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                059 859 9627
                <FontAwesomeIcon className=" text-[#fac100]" icon={faPen} />
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Business Category
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Devices
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Business Description
              </dt>
              <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                dignissimos eaque error sapiente! Unde ad quas nobis. Obcaecati
                id corporis eius culpa, pariatur nostrum accusamus perspiciatis.
                Soluta porro quia impedit!
                <FontAwesomeIcon className=" text-[#fac100]" icon={faPen} />
              </dd>
            </div>
          </dl>
        </div>

        <div className="px-4 sm:px-0 flex justify-between">
          <h3 className="text-base font-semibold leading-7 text-[#2f47c6]  ">
            Business Location
          </h3>
          <FontAwesomeIcon className=" text-[#fac100]" icon={faPen} />
        </div>

        <div className="px-4 py-4 sm:px-0">
          <LocationView />
        </div>
      </div>
    </div>
  );
};

export default Profile;

export async function profileLoader() {
  // const response = await fetch("url");
  // if (!response.ok) {
  //   // handle error
  // } else {
  //   const resData = await response.json();
  //   //return data
  //   return resData;
  // }
}
