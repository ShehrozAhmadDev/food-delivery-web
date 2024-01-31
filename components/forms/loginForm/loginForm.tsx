"use client";
import Login from "@/services/login";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import Cookie from "js-cookie";
import { setUser } from "@/redux/features/user-slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login.postLogin(email, password)
      .then((data) => {
        console.log(data);

        Cookie.set("token", data?.token);
        Cookie.set("role", data?.user?.role);
        dispatch(
          setUser({
            _id: data?.user?._id,
            fullName: data?.user?.fullName,
            email: data?.user?.email,
          })
        );
        toast.success("Logged In...");
        router.push("/");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <div className="w-full flex justify-center items-center h-[calc(100vh-160px)] text-black ">
      <div className="w-full max-w-md m-4 p-8 bg-primary rounded-lg shadow-2xl text-white">
        <h2 className="text-3xl font-semibold mb-6 text-center gradient-text">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md focus:outline-none bg-[#2f2f2f]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-300 py-3 rounded-md hover:opacity-80 transition-all duration-300"
          >
            Login
          </button>
        </form>
        <span className="w-full flex justify-end items-center mt-5 space-x-2">
          <p className="text-sm text-white/[.60]">You don't have an account?</p>
          <Link
            className="underline w-fit font-bold cursor-pointer text-orange-500  hover:opacity-85 "
            href="/signup"
          >
            SignUp
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
