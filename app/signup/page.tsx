"use client";
import { useState } from "react";
import SignupForm from "@/components/forms/signupForm/signupForm";
import Signup from "@/services/signup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import MainContainer from "@/components/layout/mainContainer/MainContainer";

const SignUp = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoader(true);
    e.preventDefault();
    Signup.postSignup(fullName, email, password)
      .then((data) => {
        if (data?.status === 200) {
          toast.success(data?.message);
          setTimeout(() => {
            router.push("/login");
            setLoader(false);
          }, 1500);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <MainContainer>
      <SignupForm
        loader={loader}
        fullName={fullName}
        email={email}
        password={password}
        setFullName={setFullName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSignUp={handleSignUp}
      />
    </MainContainer>
  );
};

export default SignUp;
