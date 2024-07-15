import Image from "next/image";
import Link from "next/link";
import { ScrollText, LogIn, Unplug, Power, LightbulbOff } from "lucide-react";
// import BallGreen from "../../public/ballgreen.json"
// import { Player } from '@lottiefiles/react-lottie-player';
import Footer from "../../components/Footer";

const About = () => {
  return (
    <>
      <div data-theme="cupcake" className="navbar bg-base-100 fixed z-10">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <img src="/logo.png" alt="" className="w-6 h-6 object-cover" />
            <p className="font-light text-2xl">Synapse</p>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/about"}>
                <ScrollText className="w-4 h-4 object-cover" /> About
              </Link>
            </li>
            <li>
              <Link href={"/login"}>
                <LogIn className="w-4 h-4 object-cover" /> Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="min-h-screen flex pt-16 flex-col items-center justify-center bg-[#F4F3F7]">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-6xl font-light text-[#1d1d1d] lg:text-7xl">
                  Efficiency as the Foundation
                </h1>
                <p className="mt-6 text-xl text-gray-600">
                  We're the team of engineer, researcher and designer. with experience spanning a variety of disciplines, all working together to build a trustworthy data processor as a solution to business needs
                </p>

                <div className="mt-6  w-full">
                  {/* <Link href={"/login"}>
                    <button className=" items-center text-center w-full px-5 py-2 text-lg tracking-wider text-white transition-colors duration-300 transform border-2 border-[#6E8672] rounded-lg lg:w-1/3 hover:bg-[#8DB093] hover:border-[#8DB093] focus:outline-none focus:bg-[#C2E4C8] space-x-1">
                      <p>Start Now</p>
                    </button>
                  </Link> */}
                  {/* <div className="w-auto text-center">
                    <Link href={"/about"}><button className="text-white underline px-5 py-2 text-center text-lg hover:text-[#8DB093]">About Us</button></Link>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-2/3">
              <video
                className="video"
                src="/globe-white.webm"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen flex flex-col py-8 items-center justify-center bg-[#F4F3F7]">
        <div className="container bg-[#F3F3F7] md:flex xl:grid xl:grid-cols-2 w-auto xl:w-4/5 lg:w-96 rounded-lg shadow-2xl">
          <div className="p-14">
            <h1 className="text-6xl font-light ">About Synapse</h1>
          </div>
          <div className="p-14 text-gray-600">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo veniam doloremque praesentium voluptatum nesciunt adipisci neque culpa. Ex asperiores aliquam sapiente ipsum? Eligendi non adipisci eveniet error nam, fuga expedita.</p>
          </div>
          <div className="p-14">
            <div>
              <video
                className="video"
                src="/ball1.mp4"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>
            <div className="lg:pb-40 space-y-6">
              <p className="text-[#6E8672] font-light text-4xl">.01</p>
              <div>
                <p className="text-2xl">Tracing</p>
                <p className="text-md text-gray-500">
                  Focuses on capturing detailed information about each step and
                  action taken during the execution of a process through logs,
                  transaction records, and system events.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className=" p-14">
            <div>
              <video
                className="video"
                src="/ball2.mp4"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>
            <div className="lg:pb-40 space-y-6">
              <p className="text-[#6E8672] font-light text-4xl">.02</p>
              <div>
                <p className="text-2xl">Modelling</p>
                <p className="text-md text-gray-500">
                  Involves mapping out each activity, decision point, and flow
                  within the process. Businesses can identify redundancies and
                  predict the changes before implementing them.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className=" p-14">
            <div>
              <video
                className="video"
                src="/ball3.mp4"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>
            <div className="lg:pb-40 space-y-6">
              <p className="text-[#6E8672] font-light text-4xl">.03</p>
              <div>
                <p className="text-2xl">Visualize</p>
                <p className="text-md text-gray-500">
                  Visualization helps in quickly identifying trends, patterns,
                  and anomalies, making it easier to make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
