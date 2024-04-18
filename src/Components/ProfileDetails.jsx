import React, { useState, useEffect } from "react";
import myImage from "../assets/Profile.jpg";

function ProfileDetails() {
  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/users/1`);
      const data = await response.json();
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="flex justify-center h-auto">
      <div className="flex flex-col h-auto items-center border-2 border-gray-200 rounded-xl w-1/2 shadow-2xl m-4 bg-white lg:w-96">
        <h1 className=" text-3xl mt-2">Profile Details</h1>
        <div className=" h-40 w-40 border-2 border-black my-10 rounded-md">
          <img src={myImage} alt="Profile photo" />
        </div>
        <div className="relative flex flex-col h-auto w-80  border-gray-400 border-2 rounded-lg px-3 mb-6 ">
          <div className="pb-3 ">
            <h1 className=" flex text-gray-500 py-2">Name</h1>
            <p className=" flex">Sabin Lamichhane</p>
          </div>

          <div className="pb-3 ">
            <h1 className=" flex text-gray-500 py-2">Email</h1>
            <p className=" flex">sabinlc47@gmail.com</p>
          </div>

          <div className="pb-3 ">
            <h1 className=" flex text-gray-500 py-2">Phone</h1>
            <p className=" flex">9804748794</p>
          </div>

          <div className="pb-3 ">
            <h1 className=" flex text-gray-500 py-2">Address</h1>
            <p className=" flex">Pokhara-26, Arghaun Chowk</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
