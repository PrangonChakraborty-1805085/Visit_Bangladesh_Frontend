import React from "react";
import { MdDriveEta } from "react-icons/md";
import { TbMathGreater } from "react-icons/tb";

export default function Transport() {
  return (
    <div className="container  flex felx-row items-center justify-start mb-5 p-2  cursor-pointer">
      <MdDriveEta className="text-lg text-black mr-5" />
      <h2 className="text-xs mr-2">Drive</h2>
      <TbMathGreater className="text-gray-500 text-xs" />
    </div>
  );
}
