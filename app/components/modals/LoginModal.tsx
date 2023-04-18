"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { useState, useCallback } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        toast.success("Logged in successfully!");
        loginModal.onClose();
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
        setIsLoading(false);
      });

    // try {
    //   const res = await axios.post("/api/", data);
    //   console.log(res);
    //   setIsLoading(false);
    //   registerModal.onClose();
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something went wrong!");
    //   setIsLoading(false);
    // }
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        type="email"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        disabled={isLoading}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        disabled={isLoading}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Firt time using Airbnb? </div>
          <div
            onClick={toggle}
            className="text-neutral-900 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
