"use client";
import LoginForm from "@/components/forms/loginForm/loginForm";
import MainContainer from "@/components/layout/mainContainer/MainContainer";

export default function Login() {
  return (
    <MainContainer>
      <div className="min-h-screen w-full transition-all duration-300 bg-[#0d0d10]">
        <LoginForm />
      </div>
    </MainContainer>
  );
}
