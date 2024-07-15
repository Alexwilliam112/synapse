// import React from "react";
// import Navbar from "../components/Navbar"
// import Graph from "../components/Graph"
// import RadialGraph from "../components/RadialGraph"
import LineGraph from "../../components/temppresent/LineGraph"
import AreaChart from "../../components/temppresent/AreaChart"
import DonutGraph from "../../components/temppresent/DonutGraph"

import { Clock2, TriangleAlert, LayoutList, Table2 } from 'lucide-react'
import BarChart from "@/components/BarChart"
import RadarChart from "@/components/RadarChart"
import PolarChart from "@/components/PolarChart"

const Dashboard = () => {
  return (
    <>
      {/* Navbar */}
      {/* <Navbar /> */}
      <div className="flex min-h-screen w-full flex-col bg-[#F7F7F7]">
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 mt-8 md:gap-8 lg:col-span-2">
                <h1 className="flex items-center text-4xl font-extralight"><Table2 className="w-8 h-8 font-light mr-2" /> Performance Table Data</h1>
                <div className="overflow-hidden p-6 bg-white rounded-lg shadow">
                    <div className="flex items-center gap-5"> 

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Person</span>
                        </div>
                        <select className="select select-bordered">
                            <option disabled selected>Pick one</option>
                            <option>Star Wars</option>
                            <option>Harry Potter</option>
                            <option>Lord of the Rings</option>
                            <option>Planet of the Apes</option>
                            <option>Star Trek</option>
                        </select>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Process</span>
                        </div>
                        <select className="select select-bordered">
                            <option disabled selected>Pick one</option>
                            <option>Star Wars</option>
                            <option>Harry Potter</option>
                            <option>Lord of the Rings</option>
                            <option>Planet of the Apes</option>
                            <option>Star Trek</option>
                        </select>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Departement</span>
                        </div>
                        <select className="select select-bordered">
                            <option disabled selected>Pick one</option>
                            <option>Star Wars</option>
                            <option>Harry Potter</option>
                            <option>Lord of the Rings</option>
                            <option>Planet of the Apes</option>
                            <option>Star Trek</option>
                        </select>
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Start Date</span>
                        </div>
                        <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">End Date</span>
                        </div>
                        <input type="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                    </div>
                    <div className="flex w-full justify-end mt-4">
                        <p className="text-xs font-light text-gray-500">Filter this data on what you desire</p>
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
                <div className="border-2 border-[#6e8672] rounded-xl p-8">
                  <div className="overflow-x-auto h-96">
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
                    <BarChart />
                </div>
                <div className="">
                    <RadarChart />
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