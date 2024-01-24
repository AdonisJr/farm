import React from "react";
import Cookies from "universal-cookie";

export default function EnumeratorSidebar({ activePage, handleActivePage, user, setUser, setAccessToken }) {

  const cookies = new Cookies({ path: "/" });
  return (
    <div className="flex flex-col fixed justify-between w-56 p-2 min-h-screen text-start gap-5 pt-10 bg-white text-slate-600 font-semibold">

      <div>
        Header
      </div>

      {/* middle */}
      <div className="flex flex-col gap-5">
        <button
          className={`hover:bg-indigo-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "Dashboard" ? "text-white bg-indigo-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("Dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`hover:bg-indigo-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "Member" ? "text-white bg-indigo-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("Member")}
        >
          Member
        </button>
        <button
          className={`hover:bg-indigo-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "Enumerator" ? "text-white bg-indigo-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("Enumerator")}
        >
          Enumerator
        </button>
      </div>
      <footer>
        <button className="w-full p-2 bg-white border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white duration-200"
          onClick={() => {
            cookies.remove("user");
            setUser({});
            setAccessToken('');
          }}>
          Sign Out
        </button>
      </footer>
    </div>
  );
}
