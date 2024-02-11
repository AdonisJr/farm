import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import headDesign from "../../assets/headDesign.jpg"
import Settings from "./Settings";
import OtherInfo from "./OtherInfo";
import ChangePassword from "./ChangePassword";
import CustomConfirmModal from "../CustomConfirmModal";


export default function MemberHeader({
  user,
  setUser,
  activePage,
  handleActivePage,
  setAccessToken,
  settingsOpen,
  handleSettings,
  accessToken
}) {
  const cookies = new Cookies({ path: "/" });
  const [showInformation, setInformation] = useState(false)
  const [showConfirm, setConfirm] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);

  const handleConfirm = async () => {
    // Perform delete operation or call the delete function
    setConfirm(false)
    if (settingsOpen) {
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

  useEffect(() => { console.log(settingsOpen) }, [settingsOpen])
  return (
    <header className="w-full">
      {/* <div className="w-full relative">
        <img src={headDesign} alt="Design" className="w-full" />
        <div className="w-full absolute bottom-0 bg-neutral-700 h-10 opacity-30">

        </div>
      </div> */}
      {/* <OtherInfo accessToken={accessToken} setInformation={setInformation} isAdmin={true} user={memberSelected} setMemberSelected={setMemberSelected} /> */}
      {
        showInformation ? <OtherInfo user={user} setInformation={setInformation} isAdmin={true} accessToken={accessToken} /> : ""
      }
      {
        !showChangePass ? "" :
          <ChangePassword user={user} accessToken={accessToken} setShowChangePass={setShowChangePass} />
      }
      {showConfirm ?
        <CustomConfirmModal
          message={`Are you sure you wan't to logout?`}
          // selected={deleteSelected}
          logout={true}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
        : ""}

      <nav className="flex justify-between items-center p-2 sm:p-5 gap-2 bg-teal-600 m-4 rounded-xl">
        {
          settingsOpen ? <Settings user={user} setConfirm={setConfirm} setInformation={setInformation} accessToken={accessToken} setShowChangePass={setShowChangePass} /> : ""
        }
        {
          !showChangePass ? "" :
            <ChangePassword user={user} accessToken={accessToken} setShowChangePass={setShowChangePass} />
        }
        <div>
          {/* <p className="text-black font-bold">{activePage}</p> */}
        </div>

        {user.id ?
          <div className="flex gap-1" onClick={handleSettings}>
            <div className="cursor-pointer text-white">
              <p className="">
                {user.last_name + ", " + user.first_name}

              </p>
              <span className="text-sm text-slate-300 font-bold">{user.role}</span>
            </div>
            <div className="flex pt-1 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-down ${settingsOpen ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
              </svg>
            </div>

          </div>
          :
          <div className="flex gap-2 items-center text-xs font-semibold">
            <Link
              to="/signIn"
              className="text-xs font-semibold py-3 px-5 bg-white hover:bg-slate-100 hover:shadow-lg rounded-md text-black duration-200"
            >
              SIGN IN
            </Link>
            <Link
              to="/signUp"
              className="text-xs font-semibold py-3 px-5 bg-white hover:bg-slate-50 hover:shadow-lg rounded-md text-black duration-200"
            >
              SIGN UP
            </Link>
          </div>
        }
      </nav>
    </header>
  );
}
