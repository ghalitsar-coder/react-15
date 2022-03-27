import React from "react";

const Alert = ({ msg, type }) => {
  if (type === "red") {
    return (
      <div
        className={`bg-red-200 block border-red-600 text-red-600 border-l-4 p-4 rounded-lg mx-auto  w-1/2 my-10`}
        role="alert"
      >
        <p className="font-bold">Success</p>
        <p>{msg}</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-green-200 block border-green-600 text-green-600 border-l-4 p-4 rounded-lg mx-auto  w-1/2 my-10`}
      role="alert"
    >
      <p className="font-bold">Success</p>
      <p>{msg}</p>
    </div>
  );
};

export default Alert;
