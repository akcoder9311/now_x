import Input from "@/components/Input";
import Modal from "@/components/Modal";

import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";

import axios from "axios";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import LoginModel from "./LoginModel";

const RegisterModel = () => {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const onTogal = useCallback(() => {
    if (isloading) {
      return;
    }
    registerModel.onClose();
    loginModel.onOpen();
  }, [isloading, registerModel, loginModel]);

  const onsubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // todo app register and login

      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("Account created. ");

      signIn("credentials", {
        email,
        password,
      });

      registerModel.onClose();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [registerModel, email, password, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isloading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isloading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isloading}
      />
      <Input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isloading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onTogal}
          className="text-white
                   cursor-pointer
                   hover:underline
                   "
        >
          sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isloading}
      isOpen={registerModel.isOpen}
      actionLabel="Register"
      onClose={registerModel.onClose}
      onSubmit={onsubmit}
      title="Create an account"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModel;
