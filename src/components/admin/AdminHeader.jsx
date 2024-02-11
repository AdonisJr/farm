import React, {useEffect} from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import headDesign from "../../assets/headDesign.jpg"

export default function AdminHeader({
  user,
  setUser,
  activePage,
  handleActivePage,
  setAccessToken
}) {
  const cookies = new Cookies({ path: "/" });
  return (
    <header className="w-full m-2">
      <nav className="flex justify-between items-center text-black p-2 sm:p-5 gap-2 bg-teal-600 rounded-s-lg">
        <div>
          <p className="text-white font-bold">ADMIN DASHBOARD</p>
        </div>

        {user.id ? 
          <div className="flex flex-col">
            <p className="text-white">
              {user.last_name + ", " + user.first_name}
              
            </p>
            
            <span className="text-sm text-slate-300 font-semibold">{user.role}</span>
          </div>
         : 
          <div className="flex gap-2 items-center text-xs font-semibold">
            <Link
              to="/signIn"
              className="text-xs font-semibold py-3 px-5 bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg rounded-md text-white duration-200"
            >
              SIGN IN
            </Link>
            <Link
              to="/signUp"
              className="text-xs font-semibold py-3 px-5 bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg rounded-md text-white duration-200"
            >
              SIGN UP
            </Link>
          </div>
        }
      </nav>
      {/* <div className="flex justify-center gap-5 pt-2 bg-neutral-800 text-yellow-500 text-md font-bold">
        <button
          className={`hover:text-yellow-600 duration-200 p-2 rounded-t-sm ${
            activePage === "report tracker" ? "text-yellow-600 bg-slate-200" : ""
          }`}
          onClick={() => handleActivePage("report tracker")}
        >
          REPORT TRACKER
        </button>
        <button
          className={`hover:text-yellow-600 duration-200 p-2 rounded-t-sm ${
            activePage === "person of concern" ? "text-yellow-600 bg-slate-200" : ""
          }`}
          onClick={() => handleActivePage("person of concern")}
        >
          PERSON OF CONCERN
        </button>
        <button
          className={`hover:text-yellow-600 duration-200 p-2 rounded-t-sm ${
            activePage === "officer" ? "text-yellow-600 bg-slate-200" : ""
          }`}
          onClick={() => handleActivePage("officer")}
        >
          OFFICER
        </button>
      </div> */}
    </header>
  );
}
