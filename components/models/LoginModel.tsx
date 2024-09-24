import Input from "../Input";
import Modal from "@/components/Modal";
import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

const LoginModel = () => {
  const loginModel = useLoginModel();
  const registerModel = useRegisterModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // For storing error messages

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModel.onClose();
    registerModel.onOpen();
  }, [isLoading, registerModel, loginModel]);

  const onSubmit = useCallback(async () => {
    // if (!email || !password) {
    //   setError("Please fill in both email and password.");
    //   return;
    // }

    try {
      setIsLoading(true);
      // setError(""); // Clear previous errors

      await signIn("credentials", {
        email,
        password,
      });

      loginModel.onClose();
    } catch (error) {
      console.error("Login error:", error);
      // setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [email, password, loginModel]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Input
        placeholder="Email"
        type="email"
        value={email}
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
        // aria-label="Email"
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
        // aria-label="Password"
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using Twitter?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModel.isOpen}
      actionLabel="Sign In"
      onClose={loginModel.onClose}
      onSubmit={onSubmit}
      title="Login"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModel;
