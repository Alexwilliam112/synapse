import Link from "next/link";

const ApiManager = () => {
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
            <tr>
              <th>1</th>
              <td>Process A</td>
              <td>2023-07-11</td>
              <td>Initial data processing</td>
              <td>
                <Link href="/detail">
                  <button
                    className="bg-white border border-[#6E8672] transition-all duration-300 hover:bg-[#6E8672] hover:text-white h-8 px-4 py-1 rounded-md text-[#6E8672] font-bold"
                    style={{ height: "2rem" }}
                  >
                    View
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApiManager;
