"use client";

import { Table2 } from "lucide-react";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { getChartsData, getFilter } from "@/queries";
import {
  setStartDate,
  setProcess,
  setEndDate,
  setDepartment,
  setPerson,
  selectStartDate,
  selectProcess,
  selectEndDate,
  selectDepartment,
  selectPerson,
} from "@/Redux/filterSlice";
import { useState, useEffect } from "react";

const formatNumberToTwoDecimals = (num) => {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { startDate, process, endDate, department, person } = useSelector(
    (state) => state.filters
  );

  const [formState, setFormState] = useState({
    startDate,
    process,
    endDate,
    department,
    person,
  });

  const { loading, error, data } = useQuery(getFilter);

  const [fetchVariables, setFetchVariables] = useState({
    startDate,
    process,
    endDate,
    department,
    person,
  });

  const { loading: loadingCharts, error: errorCharts, data: dataCharts } = useQuery(getChartsData, {
    variables: {
      input: fetchVariables,
    },
    fetchPolicy: "no-cache",
  });

  const resultPerson = data?.GetFilters?.data?.persons || [];
  const resultProcesses = data?.GetFilters?.data?.processes || [];
  const resultDepartments = data?.GetFilters?.data?.departments || [];

  const chartsData = dataCharts?.GetDashboardCharts?.data || {};
  const dashboardTable = chartsData?.dashboardTable || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setStartDate(formState.startDate));
    dispatch(setProcess(formState.process));
    dispatch(setEndDate(formState.endDate));
    dispatch(setDepartment(formState.department));
    dispatch(setPerson(formState.person));
    setFetchVariables(formState);
  };

  if (loading || loadingCharts)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex gap-2 items-center">
          <span className="loading loading-ball loading-lg"></span>
          <p className="font-mono">Building Data..</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>
          <img
            src="/catconfuse.gif"
            alt="errorcatnyan"
            className="h-24 object-cover"
          />
          <p className="font-mono">Error fetching filters: {error.message}</p>
        </div>
      </div>
    );

  if (errorCharts)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>
          <img
            src="/catconfuse.gif"
            alt="errorcatnyan"
            className="h-24 object-cover"
          />
          <p className="font-mono">
            Error fetching charts: {errorCharts.message}
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F7F7F7]">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 mt-8 md:gap-8 lg:col-span-2">
            <h1 className="flex items-center text-4xl ">
              <Table2 className="w-8 h-8 font-light mr-2" /> Performance Table Data
            </h1>
            <div className="border-2 border-[#6e8672] rounded-xl p-8">
              <div className="overflow-x-auto h-96">
                <table className="table w-full">
                  <thead className="sticky top-0 bg-[#6e8672] text-white">
                    <tr>
                      <th>Event Name</th>
                      <th>Benchmark Time</th>
                      <th>Average Actual</th>
                      <th>Process ID</th>
                      <th>Conformance Rate</th>
                      <th>Total Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardTable.length > 0 ? (
                      dashboardTable.map((row, index) => (
                        <tr key={index} className="hover">
                          <td>{row.eventName}</td>
                          <td>{row.benchmarkTime}</td>
                          <td>{formatNumberToTwoDecimals(row.average_actual)}</td>
                          <td>{row.ProcessId}</td>
                          <td>{formatNumberToTwoDecimals(row.conformance_rate)}%</td>
                          <td>{row.total_case}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-hidden p-6 bg-white rounded-lg shadow">
              <form onSubmit={handleSubmit}>
                <div className="items-center gap-5">
                  <div>
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Person</span>
                      </div>
                      <select
                        id="person"
                        name="person"
                        value={formState.person}
                        onChange={handleChange}
                        className="select select-bordered"
                      >
                        <option value="">Select All</option>
                        {resultPerson.map((el, idx) => (
                          <option key={idx} value={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div>
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">Process</span>
                      </div>
                      <select
                        id="process"
                        name="process"
                        value={formState.process}
                        onChange={handleChange}
                        className="select select-bordered"
                      >
                        <option value="">Select All</option>
                        {resultProcesses.map((el, idx) => (
                          <option key={idx} value={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div>
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">Department</span>
                      </div>
                      <select
                        id="department"
                        name="department"
                        value={formState.department}
                        onChange={handleChange}
                        className="select select-bordered"
                      >
                        <option value="">Select All</option>
                        {resultDepartments.map((el, idx) => (
                          <option key={idx} value={el}>
                            {el}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div>
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">Start Date</span>
                      </div>
                      <input
                        type="date"
                        name="startDate"
                        className="input input-bordered w-full "
                        value={formState.startDate}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="form-control w-full ">
                      <div className="label">
                        <span className="label-text">End Date</span>
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="endDate"
                        className="input input-bordered w-full "
                        value={formState.endDate}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full flex justify-end pt-4">
                  <button type="submit" className="btn w-full bg-[#6E8672] text-white hover:bg-[#47594A] px-20">
                    Apply
                  </button>
                </div>
                <div className="flex w-full justify-center text-center mt-4">
                  <p className="text-xs font-light  text-gray-500">
                    Filter on what you desire
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
