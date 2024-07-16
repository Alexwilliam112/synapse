"use client"
import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css';
import Navbar from '../../components/Navbar'
import { SquarePlus, Trash2, Pencil, Rocket, Copy, Check, Eye, EyeOff } from 'lucide-react'
import { CopyToClipboard } from 'react-copy-to-clipboard';



const apiData = [
  {
    name: "Finance",
    description: "This is an example of an api",
    endpoint: "http://localhost:3000/api/finance",
    apiKey: "M3N4O5P6Q7R8",
    status: "Serving",
  },
  {
    name: "Marketing",
    description: "This is an example of an api",
    endpoint: "http://localhost:3000/api/marketing",
    apiKey: "S9T0U1V2W3X4",
    status: "Serving",
  },
  {
    name: "Staff",
    description: "This is an example of an api",
    endpoint: "http://localhost:3000/api/staff",
    apiKey: "A1B2C3D4E5F6",
    status: "Serving",
  },
];

const dataDumb = {
  name: "Finance",
  description: "This is an example of an api",
  endpoint: "http://localhost:3000/api/finance",
  apiKey: "8765432",
  status: "Serving",
}

const App = () => {
  const [selectedApi, setSelectedApi] = useState(apiData[0]);
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-1/4 bg-[#6E8672] text-white p-4 rounded-r-lg">
          <h2 className="text-3xl font-light mb-4">Endpoint List</h2>
          <ul>
            {apiData.map((api, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer ${selectedApi.name === api.name ? 'bg-[#47594A] rounded-lg text-lg font-light' : 'text-lg font-light'}`}
                onClick={() => setSelectedApi(api)}
              >
                {api.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4">
          <div className='w-full flex justify-between'>
            <h2 className="text-4xl font-light mb-4">{selectedApi.name}</h2>
            <button className='btn bg-[#6E8672] px-10 text-white hover:bg-[#47594A]'><SquarePlus /> Add API</button>
          </div>
          <div className="mt-4">
            <div>
              <p className='font-light text-2xl'>Endpoint:</p>
              <div className="mockup-code w-1/3">
                <pre data-prefix="$">
                  <code>
                    {selectedApi.endpoint}
                  </code>
                </pre>
                <CopyToClipboard text={selectedApi.endpoint} onCopy={() => setCopied(true)}>
                  <button className="absolute top-0 right-0 m-2 btn btn-sm">
                    {copied ? <Check /> : <Copy />}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
            <div>
              <p className='font-light text-2xl'>API Key</p>
              <div className='flex items-center'>
                <p>{isRevealed ? selectedApi.apiKey : '••••••••••••••••••••'}</p>
                <button onClick={toggleReveal} className="top-0 right-0 m-2 btn bg-[#6E8672] text-white">
                  {isRevealed ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div>
              <p>Status:</p>
              <p> {selectedApi.status}</p>
            </div>
            {/* <p><strong>Usage:</strong> {selectedApi.usage}</p> */}
          </div>
          <div className="mt-4 flex items-center">
            <button className="flex items-center text-sm gap-2 border-2 border-[#2D80FF] text-[#2D80FF] hover:bg-[#2d80ff] hover:text-white rounded-lg px-4 py-2 mr-2"><Rocket className='w-4 h-4 object-cover' /> Start API</button>
            <button className="flex items-center text-sm gap-2 border-2 border-[#FFA82A] text-[#FFA82A] hover:bg-[#FFA82A] hover:text-white rounded-lg px-4 py-2 mr-2"><Pencil className='w-4 h-4 object-cover' /> Modify API</button>
            <button className="flex items-center text-sm gap-2 border-2 border-[#FF6764] text-[#FF6764] hover:bg-[#FF6764] hover:text-white rounded-lg px-4 py-2 mr-2"><Trash2 className='w-4 h-4 object-cover' /> Delete API</button>
          </div>
          <div className='mt-4 w-1/2'>
            <div className="mockup-code rounded-none">
              <pre data-prefix="$">
                <code>
                  {JSON.stringify(dataDumb)}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
