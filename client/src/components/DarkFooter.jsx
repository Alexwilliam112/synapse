"use client";

import { Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#1d1d1d]">
        <div className="container p-6 mx-auto">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <div className="flex items-center space-x-2">
                  <img className="w-auto h-7 lg:h-12" src="/logobw.png" alt="" />
                  <p className="font-extralight text-4xl text-white">Fouriex</p>
                </div>

                <p className="max-w-sm mt-2 text-gray-400">
                  Collaboration by FSJS-BSD15
                </p>

                <div className="flex mt-6 -mx-2">
                  <a
                    href="#"
                    className="mx-2 transition-colors duration-300 text-gray-300 hover:text-[#6E8672] "
                    aria-label="Reddit"
                  >
                    <Github />
                  </a>

                  <a
                    href="#"
                    className="mx-2 transition-colors duration-300 text-gray-300 hover:text-[#6E8672] "
                    aria-label="Facebook"
                  >
                    <Linkedin />
                  </a>

                  <a
                    href="#"
                    className="mx-2 transition-colors duration-300 text-gray-300 hover:text-[#6E8672]"
                    aria-label="Github"
                  >
                    <Instagram />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div>
                  <h3 className=" uppercase text-white">
                    About
                  </h3>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    Company
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    community
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    Careers
                  </a>
                </div>

                <div>
                  <h3 className="uppercase text-white">
                    Blog
                  </h3>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    Tec
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    Music
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    Videos
                  </a>
                </div>

                <div>
                  <h3 className="uppercase text-white">
                    Products
                  </h3>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    Refining Data
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    Modelling
                  </a>
                  <a
                    href="#"
                    className="block mt-2 text-sm text-gray-400 hover:underline"
                  >
                    Visualize
                  </a>
                </div>

                <div>
                  <h3 className="uppercase text-white">
                    Contact
                  </h3>
                  <span className="block mt-2 text-sm text-gray-400 hover:underline">
                    +1 526 654 8965
                  </span>
                  <span className="block mt-2 text-sm text-gray-400 hover:underline">
                    example@email.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

          <div>
            <p className="text-center text-gray-400">
              © Fouriex 2024 - All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
