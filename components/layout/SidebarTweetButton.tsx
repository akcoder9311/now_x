import React, { useCallback } from "react";
import { FaFeatherAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import useLoginModel from "@/hooks/useLoginModel";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModel = useLoginModel();

  const onClick = useCallback(() => {
    loginModel.onOpen();
  }, [loginModel]);

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-300 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeatherAlt size={25} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition">
        <p className=" hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
