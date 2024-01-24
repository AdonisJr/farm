import React, { useState } from "react";
import Cookies from "universal-cookie";
import CustomConfirmModal from "../CustomConfirmModal";

export default function MemberSidebar({ activePage, handleActivePage, user, setUser, setAccessToken, settingsOpen, handleSettings }) {
  const [showConfirm, setConfirm] = useState(false);
  const cookies = new Cookies({ path: "/" });


  const handleConfirm = async () => {
    // Perform delete operation or call the delete function
    setConfirm(false)
    if(settingsOpen){
      handleSettings();
    }
    cookies.remove("user");
    setUser({});
    setAccessToken('');
  };

  const handleCancel = () => {
    // User clicked "No" or closed the dialog
    setConfirm(false);
  };
  return (
    
    <div className="flex flex-col fixed justify-between w-60 p-2 min-h-screen text-start gap-5 pt-10 bg-white text-slate-600 font-semibold">
      {showConfirm ?
        <CustomConfirmModal
          message={`Are you sure you wan't to logout?`}
          // selected={deleteSelected}
          logout={true}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        : ""
      }
      <div className="flex justify-center">
        <img src="http://localhost:3000/logo.png" className="w-48"/>
      </div>
      {/* middle */}
      <div className="flex flex-col gap-5 text-start">
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "Dashboard" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("Dashboard")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z" />
          </svg>
          Dashboard
        </p>
      </div>
      <footer>
        <button className={`w-full p-2 bg-white border-2 border-teal-500 hover:bg-teal-500 hover:text-white duration-200 ${user.id ? '' : 'hidden'}`}
          onClick={() => {
            setConfirm(true)
          }}>
          Sign Out
        </button>
      </footer>
    </div>
  );
}
