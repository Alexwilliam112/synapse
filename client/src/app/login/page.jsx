"use client";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { UserLogin } from "../../queries/index";
import TypewriterEffect from "../../components/Typewriter";
import Cookies from "js-cookie";

// import TypeIt from 'typeit';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const [login, { loading, error }] = useMutation(UserLogin);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const access_token = data.Login.access_token;
      Cookies.set("token", access_token);

      router.push("/dashboard");
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="bg-[#323232]">
          {/* <p className="font-mono text-lg text-white">Synapse</p> */}
        </div>
        <div
          className="hidden lg:p-8 lg:flex lg:h-auto lg:space-x-12 lg:justify-center lg:items-center lg:w-2/3 bg-[#323232] "
          // style={{
          //   backgroundImage: 'url("/image.png")',
          // }}
        >
          {/* <p>Synapse</p> */}
          <div className="w-2/3 h-auto ">
            <video
              className="video"
              src="/globe-white.webm"
              autoPlay
              loop
              muted
              playsInline
            ></video>
            {/* <p id="typewriter" className="text-xl font-semibold text-blue-500"></p> */}
          </div>
          <div className="min-w-96 border-2 border-white p-5">
            <img
              src="logobw.png"
              alt=""
              className="w-auto h-16 mb-4 object-cover"
            />
            <TypewriterEffect />
          </div>
          {/* <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Synapse</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores,
                repellendus perferendis libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div> */}
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 ">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img className="w-2/12" src="/logo.png" alt="Logo" />
              </div>
              <h2 className="text-2xl mt-4 font-light text-gray-500 dark:text-gray-300 sm:text-3xl">
                Synapse
              </h2>
            </div>

            <div className="mt-8">
              <form onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="example@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                    {/* <a
                      href="#"
                      className="text-sm text-gray-400 focus:text-emerald-500 hover:text-[#6E8672] hover:underline"
                    >
                      Forgot password?
                    </a> */}
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-400 focus:ring-gray-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-[#6E8672] rounded-lg hover:bg-[#8DB093] focus:outline-none focus:bg-[#C2E4C8] focus:ring focus:ring-[#C2E4C8] focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="mt-6 text-sm text-center text-gray-400">
                Sign in to access your account
              </p>

              {/* <p className="mt-6 text-sm text-center text-gray-400">
                Don't have an account yet?{" "}
                <Link
                  href={"/register"}
                  className="text-[#6E8672] dark:text-[#6E8672] focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </Link>
                .
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
