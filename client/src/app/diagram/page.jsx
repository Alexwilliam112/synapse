"use client";
import { getAllProcess, getModelById } from "@/queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";

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
  console.log(processes);
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
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
                        style={{ height: "2rem" }}
                      >
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
    </>
  );
};

export default ApiManager;
