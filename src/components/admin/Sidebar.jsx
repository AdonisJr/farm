import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ activePage, handleActivePage, user, setUser, setAccessToken }) {

  const navigate = useNavigate();
  const cookies = new Cookies({ path: "/" });
  return (
    <div className="flex flex-col fixed justify-between w-56 p-2 min-h-screen text-start gap-5 pt-10 bg-white text-slate-600 font-semibold">

      <div className="flex justify-center">
        <img src="http://localhost:3000/logo.png" className="w-48" />
      </div>

      {/* middle */}
      <div className="flex flex-col gap-5">
        <button
          className={`hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "Dashboard" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("Dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "User" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("User")}
        >
          User
        </button>
        <button
          className={`hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "Farm Land" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("Farm Land")}
        >
          Farm Land
        </button>
        <button
          className={`hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "Subsidy" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("Subsidy")}
        >
          Subsidy
        </button>
      </div>
      <footer>
        <button className="w-full p-2 bg-white border-2 border-teal-500 hover:bg-teal-500 hover:text-white duration-200"
          onClick={() => {
            cookies.remove("user");
            setUser({});
            setAccessToken('');
            navigate('/')
          }}>
          Sign Out
        </button>
      </footer>
    </div>
  );
}
