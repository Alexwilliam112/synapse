"use client"
// import React from "react";
// import Navbar from "../components/Navbar"
// import Graph from "../components/Graph"
// import RadialGraph from "../components/RadialGraph"
import LineGraph from "../../components/temppresent/LineGraph"
import AreaChart from "../../components/temppresent/AreaChart"
import DonutGraph from "../../components/temppresent/DonutGraph"

import { Clock2, TriangleAlert, LayoutList } from 'lucide-react'
import { useQuery } from "@apollo/client"
import { getFilter } from "@/queries"

const Dashboard = () => {

  const {
    loading,
    error,
    data,
  } = useQuery(getFilter);

  console.log(data);


  return (
    <>
      {/* Navbar */}
      {/* <Navbar /> */}
      <div className="flex min-h-screen w-full flex-col bg-[#F7F7F7]">
        <div className="flex flex-col sm:gap-4 sm:py-4">

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Form</h2>

                <div className="mb-4">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="" disabled selected>
                      Select option
                    </option>
                    {/* Add options here */}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="person" className="block text-sm font-medium text-gray-700">
                    Person
                  </label>
                  <select
                    id="person"
                    name="person"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="" disabled selected>
                      Select option
                    </option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="process" className="block text-sm font-medium text-gray-700">
                    Process
                  </label>
                  <select
                    id="process"
                    name="process"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="" disabled selected>
                      Select option
                    </option>
                    {/* Add options here */}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>



                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="sm:col-span-2 p-6 bg-[#F1F2F2] border-2 border-[#6E8672] rounded-lg shadow">
                  <div className="pb-6 flex justify-between">
                    <div>
                      <h2 className="font-">Nganu Technology & Consultant</h2>
                      <p className="text-sm font-light">
                        Good Morning, Rayhan Wijaya.
                      </p>
                      <p className="text-sm font-light">
                        Lets take a look at you company performance!
                      </p>
                    </div>
                    <div>
                      <button className="btn bg-[#6E8672] text-white hover:text-[#6E8672]">Diagram</button>
                    </div>
                  </div>
                  <div className="w-auto flex items-center h-auto space-x-8">
                    <div className="w-48 sm:w-32 h-auto">
                      <DonutGraph />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-light text-sm flex items-center"><Clock2 className="w-4 h-4 text-[#6E8672] font-light mr-1" /> Ontime Process</p>
                        <p className="text-5xl">72%</p>
                      </div>
                      <div>
                        <p className="font-light text-sm flex items-center"><TriangleAlert className="w-4 h-4 text-[#8DB093] font-light mr-1" />Non-Conformance</p>
                        <p className="text-5xl">28%</p>
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <button className="bg-[#6E8672] text-white px-4 py-2 rounded-lg">Create New Order</button>
                  </div> */}
                </div>
                <div className="p-6 bg-white rounded-lg shadow sm:col-span-2">
                  <div className="pb-2">
                    <p className="text-sm text-gray-600">Average Conformance Rate</p>
                    {/* <h2 className="text-4xl">$1,329</h2> */}
                  </div>
                  <AreaChart />
                </div>
              </div>
              <div>
                {/* <div className="flex items-center">
                  <div className="ml-auto flex items-center gap-2">
                    <button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </button>
                    <button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                      <span className="sr-only sm:not-sr-only">Export</span>
                    </button>
                  </div>
                </div> */}
                <div className="p-6 bg-white rounded-lg shadow">
                  <div className="px-7">
                    <h2 className="font-semibold">Average Conformance per Process</h2>
                    <p className="text-sm text-gray-600">Recapitulate every process on this graph.</p>
                  </div>
                  <div className="w-full flex h-72">
                    <div className="h-auto w-full">
                      <LineGraph />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-hidden p-6 bg-white rounded-lg shadow">
                {/*<div className="flex flex-row items-start p-4">
                   <div className="grid gap-0.5">
                    <div className="group flex items-center gap-2 text-lg font-light">
                      Average Conformance Rate
                    </div>
                    <div className="text-sm text-gray-600">Timespan: YTD</div>
                  </div> 
                   <div className="ml-auto flex items-center gap-1">
                    <button size="sm" variant="outline" className="h-8 gap-1">
                      <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Track Order</span>
                    </button>
                    <button size="icon" variant="outline" className="h-8 w-8">
                      <span className="sr-only">More</span>
                    </button>
                  </div> 
                </div>*/}
                {/* <div className="p-6 text-sm">
                  {/* <AreaChart /> 
                </div> */}
                {/* <div className="flex flex-row items-center border-t bg-[#6E8672] text-white rounded-md px-6 py-3">
                  <div className="text-xs ">
                    Updated <time dateTime="2023-11-23">November 23, 2023</time>
                  </div>
                </div> */}
                <div className="">
                  <h1 className="flex items-center"><LayoutList className="w-4 h-4 font-light mr-2" /> Top 10 Non Conform</h1>
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr className="">
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Avg. Overdue</th>
                          <th>Conformance Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        <tr className="hover">
                          <th>1</th>
                          <td>Cy Ganderton</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        {/* row 2 */}
                        <tr className="hover">
                          <th>2</th>
                          <td>Hart Hagerty</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        {/* row 3 */}
                        <tr className="hover">
                          <th>3</th>
                          <td>Brice Swyre</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        <tr className="hover">
                          <th>4</th>
                          <td>Cy Ganderton</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        {/* row 2 */}
                        <tr className="hover">
                          <th>5</th>
                          <td>Hart Hagerty</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        {/* row 3 */}
                        <tr className="hover">
                          <th>6</th>
                          <td>Brice Swyre</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        <tr className="hover">
                          <th>7</th>
                          <td>Brice Swyre</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        <tr className="hover">
                          <th>8</th>
                          <td>Brice Swyre</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        <tr className="hover">
                          <th>9</th>
                          <td>Brice Swyre</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                        <tr className="hover">
                          <th>10</th>
                          <td>Brice Swyre</td>
                          <td>6</td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>

  );
}


export default Dashboard