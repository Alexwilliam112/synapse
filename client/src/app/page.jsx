import Image from "next/image";
import Link from "next/link";
import { ScrollText, LogIn } from 'lucide-react'
// import BallGreen from "../../public/ballgreen.json"
// import { Player } from '@lottiefiles/react-lottie-player';
import Footer from '../components/Footer'


const Landing = () => {
  return (
    <>
      <div data-theme="dark" className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <img src="/logo.png" alt="" srcset="" className="w-6 h-6 object-cover" />
            <p className="font-light text-2xl">Synapse</p>

          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><Link href={"/about"}><ScrollText className="w-4 h-4 object-cover" /> About</Link></li>
            <li><Link href={"/login"}><LogIn className="w-4 h-4 object-cover" /> Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#161616]">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-6xl font-light text-white lg:text-7xl">Monitor Your<br /> Company <span className="text-[#6E8672]">Differently</span></h1>
                <p className="mt-6 text-xl text-gray-400 dark:text-gray-400">No strings are left loose. Synapse guarantees comprehensive monitoring of every process within your company, ensuring seamless operations and optimal performance</p>
                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform border-2 border-[#6E8672] rounded-lg lg:w-1/3 hover:bg-[#8DB093] hover:border-[#8DB093] focus:outline-none focus:bg-[#C2E4C8]">Start Now</button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <video
                className="video"
                src="/globe-black.mp4"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>
          </div>
        </div>

      </div>
      <div className="min-h-screen flex flex-col py-8 pb-0 items-center justify-center bg-[#F4F3F7]">
        <div className="container px-6 py-8 pb-0 mx-auto">
          <div className="items-center lg:flex">
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <div className="rounded-full bg-[#6E8672] border-8 border-[#6E8672] shadow-2xl shadow-[#47594A]">
                <img src="/hero.png" alt="" className="w-96 h-96 object-cover" />
              </div>
            </div>
            <div className="w-full mt-4 lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-6xl font-light lg:text-7xl">Not Like Other Service</h1>
                <p className="mt-6 text-xl text-gray-600 dark:text-gray-400">We believe productivity must be monitored to keep business processes intact. We believe you as a business owner has rights to keep control of every movement of you company</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-col py-8 pb-0 mb-0 items-center justify-center bg-[#F4F3F7]">
        <div className="container mb-0 pb-0 bg-[#FFFFFF] md:flex xl:flex w-auto xl:w-4/5 lg:w-96 rounded-t-lg">
          <div className="px-8 py-8 mt-4 lg:mt-0 lg:py-32">
            <h1 className="text-4xl font-light lg:text-5xl mb-16">Get Through Our <span className="text-[#6E8672]">Processess</span></h1>
          </div>
          <div className="border-l-8 lg:border-l-2 border-emerald-700 p-14 lg:w-1/3">
            <div>
              <video
                className="video"
                src="/tracing.mp4"
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
                <p className="text-md text-gray-500">Focuses on capturing detailed information about each step and action taken during the execution of a process through logs, transaction records, and system events. </p>
              </div>
            </div>
          </div>
          <div className="border-l-8 lg:border-l-2 border-emerald-700 p-14 lg:w-1/3">
            <div>
              <video
                className="video"
                src="/modelling.mp4"
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
                <p className="text-md text-gray-500">Involves mapping out each activity, decision point, and flow within the process. Businesses can identify redundancies and predict the changes before implementing them. </p>
              </div>
            </div>
          </div>
          <div className="border-l-8 lg:border-l-2 border-emerald-700 p-14 lg:w-1/3">
            <div>
              <video
                className="video"
                src="/visual.mp4"
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
                <p className="text-md text-gray-500">Visualization helps in quickly identifying trends, patterns, and anomalies, making it easier to make informed decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Landing