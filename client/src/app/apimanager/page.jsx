"use client";

import { CreateAPI, FetchApi } from "@/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Pencil, Rocket, SquarePlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ApiManager = () => {
  const router = useRouter();
  const [endpointUrl, setEndpointUrl] = useState("");
  const [description, setDescription] = useState("");
  const [apiKey, setApiKey] = useState("");

  //FETCH DENDPOINT
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
    refetch,
  } = useQuery(FetchApi);
  // console.log(queryData);
  const endpointsData = queryData?.GetEndpoints?.data;

  //ADD ENDPOINT
  const [
    createEndpoint,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CreateAPI);

  const handleCreateAPI = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createEndpoint({
        variables: {
          endpointUrl,
          description,
          apiKey,
        },
      });
      // console.log(data, "<<<<<<");

      if (data.CreateEndpoint.statusCode === 200) {
        router.push("/apimanager");
        refetch();
      } else {
        console.error("Error creating endpoint");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  //EDIT ENDPOINT

  if (queryLoading || mutationLoading) {
    return <div>Loading...</div>;
  }

  if (queryError || mutationError) {
    return <div>Error: {queryError?.message || mutationError?.message}</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <div className="w-full flex justify-end px-4 mb-4">
          <button
            onClick={() => document.getElementById("my_modal_2").showModal()}
            className="btn bg-white border border-[#47594A] text-[#47594A] px-10 hover:bg-[#47594A] hover:text-white"
          >
            <SquarePlus /> Add API
          </button>
        </div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box space-y-4">
            <div className="block w-full">
              <h3 className="text-4xl font-light">Add API</h3>
              <p className="font-light text-lg">Input your new API Here</p>
            </div>

            <form onSubmit={handleCreateAPI}>
              <label className="input input-bordered flex items-center gap-2">
                Endpoint:
                <input
                  type="text"
                  name="endpointUrl"
                  className="grow"
                  placeholder="e.g. https://www.yourapi.com/api/me"
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  value={endpointUrl}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Description:
                <input
                  type="text"
                  name="description"
                  className="grow"
                  placeholder="What this api does?"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                Secret Key:
                <input
                  type="password"
                  name="apiKey"
                  className="grow"
                  placeholder="Your API Key"
                  onChange={(e) => setApiKey(e.target.value)}
                  value={apiKey}
                  required
                />
              </label>
              <div className="modal-action">
                <button
                  type="submit"
                  className="btn bg-[#6E8672] px-10 text-white hover:bg-[#47594A]"
                >
                  Save API
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("my_modal_2").close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <table className="table">
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
            {endpointsData?.map((data, idx) => (
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
                <td className="space-x-2 flex items-center">
                  <button className="flex items-center text-sm gap-2 border-2 border-[#2D80FF] text-[#2D80FF] hover:bg-[#2d80ff] hover:text-white rounded-lg px-4 py-2 mr-2">
                    <Rocket className="w-4 h-4 object-cover" />
                    Start
                  </button>
                  <button
                    className="flex items-center text-sm gap-2 border-2 border-[#FFA82A] text-[#FFA82A] hover:bg-[#FFA82A] hover:text-white rounded-lg px-4 py-2 mr-2"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    <Pencil className="w-4 h-4 object-cover" />
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
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <button className="flex items-center text-sm gap-2 border-2 border-[#FF6764] text-[#FF6764] hover:bg-[#FF6764] hover:text-white rounded-lg px-4 py-2 mr-2">
                    <Trash2 className="w-4 h-4 object-cover" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApiManager;
