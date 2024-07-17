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
import {
  Pencil,
  Rocket,
  SquarePlus,
  Trash2,
  Copy,
  Check,
  EyeOff,
  Eye,
  FolderKey,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  // this is state for table interaction (copy, reveal)
  const [copiedUrls, setCopiedUrls] = useState({});
  const [revealedApiKeys, setRevealedApiKeys] = useState({});
  const [loadingStartProcess, setLoadingStartProcess] = useState(false);

  const toggleReveal = (id) => {
    setRevealedApiKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (id) => {
    setCopiedUrls((prev) => ({
      ...prev,
      [id]: true,
    }));

    // Reset the copied status after a short delay
    setTimeout(() => {
      setCopiedUrls((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 2000); // Adjust the delay as needed
  };

  // console.log(editId);

  //FETCH ENDPOINT
  const {
    loading: queryLoading,
    error: queryError,
    data: queryData,
    refetch,
  } = useQuery(FetchApi, {
    fetchPolicy: "no-cache",
  });

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
    setLoadingStartProcess(true);
    try {
      console.log(
        startDate,
        endDate,
        typeof endpointUrl,
        endpointUrl.length,
        typeof apiKey,
        apiKey.length
      );
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
    } finally {
      setLoadingStartProcess(false);
    }
  };

  if (queryLoading || mutationLoading || mutationLoadingUpdate) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        {" "}
        <div className="flex gap-2 items-center">
          {" "}
          <span className="loading loading-ball loading-lg"></span>{" "}
          <p className="font-mono">Fetching APIs..</p>
        </div>{" "}
      </div>
    );
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
      <div className="w-full flex justify-between px-12 mb-4 py-4">
        <h1 className="text-4xl flex gap-2">
          <FolderKey className="w-10 h-10 object-cover font-light" /> API
          Manager
        </h1>
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className="btn bg-white border-2 border-[#47594A] text-[#47594A] px-10 hover:bg-[#47594A] hover:text-white">
          <SquarePlus /> Add API
        </button>
      </div>
      <div className="overflow-x-auto h-screen px-8">
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
                  className="btn bg-[#6E8672] px-10 text-white hover:bg-[#47594A]">
                  Save API
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("my_modal_2").close()}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
        <table className="table h-1/3">
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
                    <CopyToClipboard
                      text={data.endpointUrl}
                      onCopy={() => handleCopy(data.id)}>
                      <button className="absolute top-0 right-0 m-2 btn btn-sm">
                        {copiedUrls[data.id] ? (
                          <Check className="w-4 h-4 object-cover" />
                        ) : (
                          <Copy className="w-4 h-4 object-cover" />
                        )}
                      </button>
                    </CopyToClipboard>
                  </div>
                </td>
                <td>{data.description}</td>
                <td>
                  <div className="flex items-center">
                    <p>
                      {revealedApiKeys[data.id] ? data.apiKey : "************"}
                    </p>
                    <button
                      onClick={() => toggleReveal(data.id)}
                      className="top-0 right-0 m-2 btn bg-slate-50 text-[#6E8672]">
                      {revealedApiKeys[data.id] ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </td>
                <td>{data.status}</td>
                <td className="flex items-center">
                  <div className="pt-4 flex space-x-2">
                    <button
                      onClick={() =>
                      // setSelectedEndpoint(data);
                      {
                        document.getElementById("my_modal_4").showModal();
                        setEndpointUrl(data.endpointUrl);
                        setApiKey(data.apiKey);
                      }
                      }
                      className="flex items-center text-sm gap-2 border-2 border-[#2D80FF] text-[#2D80FF] hover:bg-[#2d80ff] hover:text-white rounded-lg px-4 py-2"
                      disabled={loadingStartProcess} // Disable button when loading
                    >
                      {loadingStartProcess ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4 object-cover" />
                          Start
                        </>
                      )}
                    </button>

                    {/* modal start */}
                    <dialog id="my_modal_4" className="modal">
                      <div className="modal-box">
                        <h3 className="font-light text-2xl">Select Date!</h3>
                        <p className="py-4">
                          Press ESC key or click the button below to close
                        </p>
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
                          <input
                            onSubmit={(e) => setEndpointUrl(data.endpointUrl)}
                            className=" hidden"
                            type="text"
                            value={data.editEndpoint}
                          />
                          <input
                            onSubmit={(e) => setApiKey(data.apiKey)}
                            className=" hidden"
                            type="text"
                            value={data.apiKey}
                          />
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
                          <div className="modal-action">
                            <button
                              type="submit"
                              className="btn bg-[#6E8672] px-10 text-white hover:bg-[#47594A]">
                              {loadingStartProcess ? (
                                <span className="loading loading-spinner loading-sm"></span>
                              ) : (
                                <>Confirm</>
                              )}
                            </button>
                            <button
                              type="button"
                              className={`btn ${loadingStartProcess ? "disabled:opacity-75" : ""
                                }`}
                              onClick={() =>
                                document.getElementById("my_modal_4").close()
                              }
                            // {loadingStartProcess ? disabled : ''}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </dialog>
                    <button
                      className="flex items-center text-sm gap-2 border-2 border-[#FFA82A] text-[#FFA82A] hover:bg-[#FFA82A] hover:text-white rounded-lg px-4 py-2"
                      onClick={() => handleEditClick(data)}>
                      <Pencil className="w-4 h-4 object-cover" />
                      Edit
                    </button>

                    {/* modal edit */}
                    <dialog id="my_modal_1" className="modal">
                      <div className="modal-box">
                        <h3 className="font-light text-2xl">Edit your api!</h3>
                        <p className="py-4">
                          Press ESC key or click the button below to close
                        </p>

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
                          <div className="modal-action">
                            <button
                              type="submit"
                              className="btn bg-[#6E8672] px-10 text-white hover:bg-[#47594A]">
                              Save API
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() =>
                                document.getElementById("my_modal_1").close()
                              }>
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </dialog>
                    {/* end modal edit */}

                    <button
                      type="button"
                      onClick={() => handleDeleteClick(data)}
                      className="flex items-center text-sm gap-2 border-2 border-[#FF6764] text-[#FF6764] hover:bg-[#FF6764] hover:text-white rounded-lg px-4 py-2">
                      <Trash2 className="w-4 h-4 object-cover" />
                      Delete
                    </button>
                  </div>
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
