"use client";
import { getAllProcess, getModelById } from "@/queries";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { PackageSearch } from "lucide-react";

const ApiManager = () => {
  const { loading, error, data } = useQuery(getAllProcess);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex gap-2 items-center">
          <span className="loading loading-ball loading-lg"></span>
          <p className="font-mono">Fetching List..</p>
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
          <p className="font-mono">Error fetching process: {error.message}</p>
        </div>
      </div>
    );

  const processes = data?.GetAllProcess?.data || [];
  return (
    <div className="w-full">
      <div className="w-full px-10 py-4">
        <h1 className="text-4xl flex gap-2">
          <PackageSearch className="w-10 h-10 object-cover" /> Process List
        </h1>
        <p className="font-light text-lg py-2">
          View your processes as a diagram
        </p>
      </div>
      <div className="overflow-x-auto px-8 border-t">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Process Name</th>
              <th>Last Update</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {processes.length > 0 ? (
              processes.map((process, index) => (
                <tr key={process.id}>
                  <th>{process.id}</th>
                  <td>{process.processName}</td>
                  <td>{new Date(process.lastUpdate).toLocaleDateString()}</td>
                  <td>{process.description}</td>
                  <td>
                    <Link href={`/diagram/${process.id}`} passHref>
                      <button
                        className="bg-white border border-[#6E8672] transition-all duration-300 hover:bg-[#6E8672] hover:text-white h-8 px-4 py-1 rounded-md text-[#6E8672] font-bold"
                        style={{ height: "2rem" }}>
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiManager;
