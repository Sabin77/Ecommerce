import React from "react";
import { SocialIcon } from "react-social-icons";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Footer() {
  return (
    <div className=" h-40 border my-2 border-t-slate-200 bg-[#4A3BB5] text-white">
      <SocialIcon className=" mx-2 my-2 " url="https://twitter.com" />
      <SocialIcon className=" mx-2" url="https://facebook.com" />
      <SocialIcon className=" mx-2" url="https://instagram.com" />
      <p> Arghaun Chowk, Pokhara, Nepal | HamroStore Pvt Co. </p>
      <div className=" flex justify-center py-2">
        {" "}
        <FaPhoneAlt className=" my-1 mx-3" />
        061-564777
        <IoMdMail className="my-1 ml-6 mr-2 " />
        info@hamrostore.com.np
      </div>
    </div>
  );
}

export default Footer;
