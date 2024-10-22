import Image from "next/image";
import Link from "next/link";
import { ScrollText, LogIn, Unplug, Power, LightbulbOff } from "lucide-react";
// import BallGreen from "../../public/ballgreen.json"
// import { Player } from '@lottiefiles/react-lottie-player';
import Footer from "../../components/DarkFooter";

const About = () => {
  return (
    <>
      <div data-theme="cupcake" className="navbar bg-base-100 fixed z-10">
        <div className="flex-1">
          <Link href={"/"} className="btn btn-ghost text-xl">
            <Image src="/logo.png" alt="" className="w-6 h-6 object-cover" width={50} height={50} />
            <p className="font-light text-2xl ">Fouriex</p>
          </Link>
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F3F7]">
        <div className="container p-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg pt-16">
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

      <div className="min-h-screen flex flex-col py-8 items-center justify-center bg-gradient-to-t from-[#1d1d1d] to-[#F4F3F7]">
        <div className="container bg-[#F3F3F7] md:flex xl:grid xl:grid-cols-2 w-auto xl:w-4/5 lg:w-96 rounded-3xl shadow-2xl">
          <div className="w-full p-14 lg:p-20 flex text-center">
            <div className="space-y-3">
              <h1 className="text-4xl font-light ">About Fouriex</h1>
              <div className="p-1 rounded-full bg-[#6E8672] w-32 h-2">
              </div>
            </div>
          </div>
          {/* <div className="p-14 text-gray-600">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo veniam doloremque praesentium voluptatum nesciunt adipisci neque culpa. Ex asperiores aliquam sapiente ipsum? Eligendi non adipisci eveniet error nam, fuga expedita.</p>
          </div> */}
          <div className="p-14 lg:gap-8 lg:flex">
            <div className="lg:w-24">
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
              <div className="space-y-4">
                <p className="text-2xl">Our Concern</p>
                <p className="text-md lg:w-80 text-gray-500">
                  In today's fast-paced business environment, maintaining seamless operations and optimal performance can be challenging. Businesses often struggle with ensuring that every process is monitored comprehensively, leading to potential inefficiencies and disruptions. The need for detailed oversight is critical to keep business processes intact and productive. {" "}
                </p>
              </div>
            </div>
          </div>
          <div className="p-14 lg:flex lg:gap-8">
            <div className="lg:w-24">
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
              <div className="space-y-4">
                <p className="text-2xl">Our Goals</p>
                <p className="text-md lg:w-80 text-gray-500">
                  Our primary goal is to capture detailed information about each step and action taken during the execution of a process. This is achieved through meticulous logging, transaction records, and system events. By mapping out every activity, decision point, and flow within your business processes, we help you identify redundancies and predict changes before implementing them, fostering a proactive approach to process management.
                </p>
              </div>
            </div>
          </div>
          <div className="p-14 lg:flex lg:gap-8">
            <div className="w-24">
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
              <div className="space-y-4">
                <p className="text-2xl">How we work</p>
                <p className="text-md lg:w-80 text-gray-500">
                  We focus on providing visualization tools that help quickly identify trends, patterns, and anomalies within your processes. This visualization makes it easier for you to make informed decisions, ensuring that your business operations are always optimized and efficient. Our method involves a thorough and detailed approach, ensuring that every aspect of your business processes is monitored and analyzed for continuous improvement.
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
