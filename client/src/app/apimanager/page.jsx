"use client";

import makeClient from "@/config/ApolloClient";
import {
  CreateAPI,
  DeleteApi,
  FetchApi,
  StartMining,
  UpdateAPI,
} from "@/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Pencil, Rocket, SquarePlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ApiManager = () => {
  const router = useRouter();
  const [endpointUrl, setEndpointUrl] = useState("");
  const [description, setDescription] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [selectedEndpoint, setSelectedEndpoint] = useState(null); // State to hold selected endpoint
  const [editId, setEditId] = useState();
  const [editEndpoint, setEditEndpoint] = useState("");
  const [editdescription, setEditDescription] = useState("");
  const [editApiKey, setEditApiKey] = useState("");
  const [deleteId, setDeleteId] = useState();
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  // console.log(editId);

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
          input: {
            endpointUrl,
            description,
            apiKey,
          },
        },
      });

      // console.log(data, "<<<<<<");

      if (data.CreateEndpoint.statusCode === 200) {
        // Refetch the endpoints data to get the latest data
        refetch();

        // Close the modal after successful submission
        document.getElementById("my_modal_2").close();

        router.push("/apimanager");
      } else {
        console.error("Error creating endpoint");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  // Handle edit button click
  const handleEditClick = (endpoint) => {
    setEditEndpoint(endpoint.endpointUrl);
    setEditDescription(endpoint.description);
    setEditApiKey(endpoint.apiKey);
    setSelectedEndpoint(endpoint);
    document.getElementById("my_modal_1").showModal();
    setEditId(endpoint.id);
  };

  //EDIT ENDPOINT
  const [
    updateEndpoint,
    {
      dataEdit: mutationDataUpdate,
      loading: mutationLoadingUpdate,
      error: mutationErrorUpdate,
    },
  ] = useMutation(UpdateAPI);

  const handleUpdateAPI = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateEndpoint({
        variables: {
          input: {
            id: Number(editId),
            endpointUrl: editEndpoint,
            description: editdescription,
            apiKey: editApiKey,
          },
        },
      });

      // console.log(data, '<<<<<<<<<<<<<<<');

      if (data.UpdateEndpoint.statusCode === 200) {
        refetch();
        document.getElementById("my_modal_1").close();
        router.push("/apimanager");
      } else {
        console.error("Error updating endpoint");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  // Delete endpoint
  const [
    deleteEndpoint,
    {
      data: mutationDataDelete,
      loading: mutationLoadingDelete,
      error: mutationErrorDelete,
    },
  ] = useMutation(DeleteApi);

  const handleDelete = async (e) => {
    try {
      const { data } = await deleteEndpoint({
        variables: {
          input: {
            id: Number(selectedEndpoint.id),
          },
        },
      });
      if (data.DeleteEndpoint.statusCode === 200) {
        refetch();
        router.push("/apimanager");
      } else {
        console.error("Error deleting endpoint");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const handleDeleteClick = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setDeleteId(endpoint.id);
    handleDelete(deleteId);
  };

  //HANDLE START
  const [
    startMining,
    {
      data: mutationDataStart,
      loading: mutationLoadingStart,
      error: mutationErrorStart,
    },
  ] = useMutation(StartMining);

  const handleStart = async (e) => {
    e.preventDefault();
    try {
      const { data } = await startMining({
        variables: {
          input: {
            startDate,
            endpointUrl,
            endDate,
            apiKey,
          },
        },
      });
      console.log(data);

      // if (data.startMining.statusCode === 200) {
      // Refetch the endpoints data to get the latest data
      refetch();

      // Close the modal after successful submission
      document.getElementById("my_modal_4").close();

      router.push("/apimanager");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  if (queryLoading || mutationLoading || mutationLoadingUpdate) {
    return <div>Loading...</div>;
  }

  if (queryError || mutationError || mutationErrorUpdate) {
    return (
      <div>
        Error:{" "}
        {queryError?.message ||
          mutationError?.message ||
          mutationErrorUpdate?.message}
      </div>
    );
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
              <label className="input input-bordered flex items-center gap-2 my-1">
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
              <label className="input input-bordered flex items-center gap-2 my-1">
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
              <label className="input input-bordered flex items-center gap-2 my-1">
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
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                    className="flex items-center text-sm gap-2 border-2 border-[#2D80FF] text-[#2D80FF] hover:bg-[#2d80ff] hover:text-white rounded-lg px-4 py-2 mr-2"
                  >
                    <Rocket className="w-4 h-4 object-cover" />
                    Start
                  </button>

                  {/* modal start */}
                  <dialog id="my_modal_4" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Select date</h3>

                      <div className="modal-action">
                        <form onSubmit={handleStart}>
                          <label className="input input-bordered flex items-center gap-2 my-1">
                            Start Date:
                            <input
                              type="date"
                              name="startDate"
                              className="grow"
                              onChange={(e) => setStartDate(e.target.value)}
                              value={startDate}
                              required
                            />
                          </label>
                          <label className="input input-bordered flex items-center gap-2 my-1">
                            End Date:
                            <input
                              type="date"
                              name="endDate"
                              className="grow"
                              onChange={(e) => setEndDate(e.target.value)}
                              value={endDate}
                              required
                            />
                          </label>
                          <button
                            type="submit"
                            className="btn bg-[#6E8672] px-10 text-white hover:bg-[#47594A]"
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={() =>
                              document.getElementById("my_modal_4").close()
                            }
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <button
                    className="flex items-center text-sm gap-2 border-2 border-[#FFA82A] text-[#FFA82A] hover:bg-[#FFA82A] hover:text-white rounded-lg px-4 py-2 mr-2"
                    onClick={() => handleEditClick(data)}
                  >
                    <Pencil className="w-4 h-4 object-cover" />
                    Edit
                  </button>

                  {/* modal edit */}
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Edit your api!</h3>
                      <p className="py-4">
                        Press ESC key or click the button below to close
                      </p>

                      <div className="modal-action">
                        <form onSubmit={handleUpdateAPI}>
                          {/* <label className="input input-bordered items-center gap-2 my-1"> 
                            Id: 
                            <input
                              type="number"
                              name="id"
                              className="grow"
                              placeholder={selectedEndpoint?.id}
                              onChange={(e) => setEditId(selectedEndpoint.id)}
                              value={editId}
                              required
                            />
                          </label> */}
                          <label className="input input-bordered flex items-center gap-2 my-1">
                            Endpoint:
                            <input
                              type="text"
                              name="endpointUrl"
                              className="grow"
                              placeholder={selectedEndpoint?.endpointUrl}
                              onChange={(e) => setEditEndpoint(e.target.value)}
                              value={editEndpoint}
                              required
                            />
                          </label>
                          <label className="input input-bordered flex items-center gap-2 my-1">
                            Description:
                            <input
                              type="text"
                              name="description"
                              className="grow"
                              placeholder={selectedEndpoint?.description}
                              onChange={(e) =>
                                setEditDescription(e.target.value)
                              }
                              value={editdescription}
                              required
                            />
                          </label>
                          <label className="input input-bordered flex items-center gap-2 my-1">
                            Secret Key:
                            <input
                              type="password"
                              name="apiKey"
                              className="grow"
                              placeholder={selectedEndpoint?.apiKey}
                              onChange={(e) => setEditApiKey(e.target.value)}
                              value={editApiKey}
                              required
                            />
                          </label>
                          <button
                            type="submit"
                            className="btn bg-[#6E8672] px-10 text-white hover:bg-[#47594A]"
                          >
                            Save API
                          </button>
                          <button
                            type="button"
                            className="btn"
                            onClick={() =>
                              document.getElementById("my_modal_1").close()
                            }
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  {/* end modal edit */}

                  <button
                    type="button"
                    onClick={() => handleDeleteClick(data)}
                    className="flex items-center text-sm gap-2 border-2 border-[#FF6764] text-[#FF6764] hover:bg-[#FF6764] hover:text-white rounded-lg px-4 py-2 mr-2"
                  >
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
