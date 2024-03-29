import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { Signin, ErrorModal } from "@/types/auth";
import EmailInput from "@/components/common/AuthInput/EmailInput";
import PasswordInput from "@/components/common/AuthInput/PasswordInput";
import AlertModal from "@/components/common/Modal/AlertModal";
import Button from "@/components/common/Button/Button";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<{ email: string; password: string }>({ mode: "onChange" });
    const [modalSize, setModalSize] = useState<"md" | "sm" | "decide">("sm");
    const [resMessage, setResMessage] = useState<string>("");
    const dialogRef = useRef<any>();

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setModalSize("sm");
        } else {
          setModalSize("md");
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
  const { mutate } = useAuth.login(setResMessage, dialogRef);

  const submit = {
    onSubmit: async (value: Signin) => {
      mutate(value);
    },
    onError: async (error: any) => {
      undefined;
    }
  };

  return (
    <div className="relative h-full min-w-[375px]">
      <dialog ref={dialogRef} className="rounded-lg">
        <AlertModal
          type="alert"
          size={modalSize}
          text={resMessage}
          handlerAlertModal={() => {
            dialogRef.current.close();
          }}
        />
      </dialog>
      <div className="flex-col gap-5 mx-auto w-full pt-[80px] pb-[50px] px-[15px] md:w-[632px] md:pt-[150px] lg:w-[640px]">
        <div>
          <Image
            src="/images/logo.png"
            alt="logo"
            width={300}
            height={100}
            onClick={() => {
              router.push("/");
            }}
            className="m-auto hover:cursor-pointer"
          />
        </div>
        <form
          onSubmit={handleSubmit(submit.onSubmit, submit.onError)}
          className="flex flex-col gap-3 mt-10"
        >
          <div>
            <EmailInput
              whatFor="login"
              errors={errors}
              watch={watch}
              register={register}
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <PasswordInput
              whatFor="login"
              errors={errors}
              watch={watch}
              register={register}
            />
          </div>
          <div className="mt-7">
            <Button text="로그인 하기" size="full" type="submit" />
          </div>
        </form>
        <div className="flex justify-center gap-3 text-sm mx-auto mt-8">
          <p>회원이 아니신가요?</p>
          <Link href="signup" className="underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;