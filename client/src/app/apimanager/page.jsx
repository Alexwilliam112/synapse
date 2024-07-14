"use client";

import { FetchApi } from "@/queries";
import { useQuery } from "@apollo/client";

const ApiManager = () => {
  const { loading, error, data } = useQuery(FetchApi);
  // console.log(data?.GetEndpoints?.data);

  if (loading) {
    return <div>Loading...</div>;
  }
  const fixData = data?.GetEndpoints?.data;
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Url</th>
              <th>Description</th>
              <th>API Key</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {fixData?.map((data, idx) => {
              return (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="mockup-code">
                      <pre data-prefix="$">
                        <code>{data.endpointUrl}</code>
                      </pre>
                    </div>
                  </td>
                  <td>{data.description}</td>
                  <td>{data.apiKey}</td>
                  <td>{data.status}</td>
                  <td className="space-x-2">
                    <button className="bg-white border border-[#6E8672] transition-all duration-300 hover:bg-[#6E8672] hover:text-white h-8 px-4 py-1 rounded-md text-[#6E8672] font-bold">
                      Start
                    </button>
                    <button
                      className="bg-white border border-[#FFBB59] transition-all duration-300 hover:bg-[#FFBB59] hover:text-white h-8 px-4 py-1 rounded-md text-[#FFBB59] font-bold"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Edit
                    </button>
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">
                          Press ESC key or click the button below to close
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <button className="bg-white border border-[#FF918F] transition-all duration-300 hover:bg-[#5FF918F] hover:text-white h-8 px-4 py-1 rounded-md text-[#FF918F] font-bold">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {/*  */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApiManager;
