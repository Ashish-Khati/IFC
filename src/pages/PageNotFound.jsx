import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-col items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mt-5 pb-16 sm:mb-20">
          Fuelcab India
        </h1>
        <div className="flex flex-col items-center gap-2 sm:flex-row lg:gap-6">
          <div className="flex flex-col gap-4 text-2xl flex-shrink-0">
            <p className="text-black font-bold text-4xl">
              Oops....
              <br />
              <span className="font-semibold text-3xl mt-4">
                Page Not Found
              </span>
            </p>
            <div className="mt-4 text-base">
              <p className="text-gray-600">
                This Page doesn't exist or was removed!
              </p>
              <p className="text-gray-600">We suggest you back to home.</p>
            </div>

            <Link to={"/"}>
              <button
                className="flex items-center bg-[#7AC93B] rounded-md text-white text-sm p-2 font-normal border-gray-700 shadow-md shadow-gray-300 transition-all ease-out delay-[30ms] mt-4"
                style={{ paddingLeft: "35px", paddingRight: "35px", backgroundColor: "#7AC93B" }}
              >
                <img
                  src="/Images/Icon.png"
                  alt="Back to Home"
                  className="mr-2 w-4 h-4"
                />
                <span>Back To Home</span>
              </button>
            </Link>
          </div>

          <img
            src="/Images/ilustration.png"
            alt="Page Not Found"
            className="w-full max-w-md flex-shrink-0 ml-3 sm:ml-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
