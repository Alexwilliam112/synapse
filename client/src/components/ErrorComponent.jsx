"use client";

import { useSearchParams } from "next/navigation";
import { TriangleAlert } from "lucide-react"

const ErrComp = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <div role="alert" className="alert alert-error font-light text-sm text-red-700 bg-white border-2 border-red-400">
          <TriangleAlert />
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
};

export default ErrComp;
