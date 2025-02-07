"use client";
import React from "react";
import {
  LayoutDashboard,
  FilePieChart,
  LogOut,
  CircleArrowOutUpRight,
  UserPen,
  Cog,
  FolderKey,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import makeClient from "@/config/ApolloClient";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    Cookies.remove("token");
    makeClient().clearStore();
    router.push("/");
  }

  return (
    <div className="navbar px-9 bg-base-100 border-b">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className={pathname === "/dashboard" || pathname === "/dashboard2" ? "bg-[#323232] text-white" : ""}>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className={pathname === "/diagram" ? "bg-[#323232] text-white" : ""}>
              <Link href="/diagram">Diagram</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="" className="w-10 h-auto object-cover" />
          <p className="text-2xl font-light">Fouriex</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li
            className={`rounded-xl ${pathname === "/dashboard" ? "bg-[#323232] text-white" : ""} ${pathname === "/dashboard2" ? "bg-[#323232] text-white" : ""}`}
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
          </li>
          <li className={`rounded-xl ${/^\/diagram/.test(pathname) ? "bg-[#323232] text-white" : ""}`}>
            <Link href="/diagram">
              <FilePieChart className="h-4 w-4" /> Diagram
            </Link>
          </li>
          <li className={`rounded-xl ${pathname === "/apimanager" ? "bg-[#323232] text-white" : ""}`}>
            <Link href="/apimanager">
              <FolderKey className="h-4 w-4" /> API Manager
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="rounded-full m-1">
            <img
              src="https://images.unsplash.com/photo-1718506921663-ee4571a3f92e?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="h-10 w-10 object-cover rounded-full"
            />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-md z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>
                <UserPen className="h-4 w-4" /> Profile
              </a>
            </li>
            <li>
              <a>
                <Cog className="h-4 w-4" /> Settings
              </a>
            </li>
            <li className="rounded-md hover:bg-red-700 hover:text-white focus:bg-red-500">
              <div onClick={handleLogout}>
                <CircleArrowOutUpRight className="h-4 w-4" /> Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
