"use client";
import React from "react";

const LogoutBtn = () => {
  return (
    <button
      onClick={() => console.log("hello")}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Log Out
    </button>
  );
};

export default LogoutBtn;
