import React, { useState } from "react";
import Cookies from "universal-cookie";
import CustomConfirmModal from "../CustomConfirmModal";
import { Link } from "react-router-dom";
import Settings from "./Settings";
import ChangePassword from "./ChangePassword";

export default function MemberSidebar({ activePage, handleActivePage, user, setUser, setAccessToken, accessToken, settingsOpen, handleSettings }) {
  const [showConfirm, setConfirm] = useState(false);
  const cookies = new Cookies({ path: "/" });
  const [showInformation, setInformation] = useState(false)

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
  return (

    <div className="flex flex-col fixed justify-between w-60 p-2 min-h-screen text-start gap-5 pt-10 bg-white text-slate-600 font-semibold">
      {/* {
        settingsOpen ? <Settings user={user} setInformation={setInformation} accessToken={accessToken} setShowChangePass={setShowChangePass} /> : ""
      } */}
      {/* s */}
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
      <div className="flex justify-center items-center">
        <img src="http://localhost:3000/logo.png" className="w-20" />
        <p className="font-serif text-3xl">CCSMS</p>
      </div>
      {/* middle */}
      <div className="flex flex-col gap-2 text-start">

        <p className="ms-2 text-sm">FARM</p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "MY FARM" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("MY FARM")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z" />
          </svg>
          MY FARM
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "REQUESTED" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("REQUESTED")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-spellcheck" viewBox="0 0 16 16">
            <path d="M8.217 11.068c1.216 0 1.948-.869 1.948-2.31v-.702c0-1.44-.727-2.305-1.929-2.305-.742 0-1.328.347-1.499.889h-.063V3.983h-1.29V11h1.27v-.791h.064c.21.532.776.86 1.499.86zm-.43-1.025c-.66 0-1.113-.518-1.113-1.28V8.12c0-.825.42-1.343 1.098-1.343.684 0 1.075.518 1.075 1.416v.45c0 .888-.386 1.401-1.06 1.401zm-5.583 1.035c.767 0 1.201-.356 1.406-.737h.059V11h1.216V7.519c0-1.314-.947-1.783-2.11-1.783C1.355 5.736.75 6.42.69 7.27h1.216c.064-.323.313-.552.84-.552s.864.249.864.771v.464H2.346C1.145 7.953.5 8.568.5 9.496c0 .977.693 1.582 1.704 1.582m.42-.947c-.44 0-.845-.235-.845-.718 0-.395.269-.684.84-.684h.991v.538c0 .503-.444.864-.986.864m8.897.567c-.577-.4-.9-1.088-.9-1.983v-.65c0-1.42.894-2.338 2.305-2.338 1.352 0 2.119.82 2.139 1.806h-1.187c-.04-.351-.283-.776-.918-.776-.674 0-1.045.517-1.045 1.328v.625c0 .468.121.834.343 1.067z" />
            <path d="M14.469 9.414a.75.75 0 0 1 .117 1.055l-4 5a.75.75 0 0 1-1.116.061l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.908 1.907 3.476-4.346a.75.75 0 0 1 1.055-.117" />
          </svg>
          REQUESTED
        </p>
        <p className="ms-2 text-sm">SUBSIDIES</p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "VALIDATION" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("VALIDATION")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bezier2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01q.269.27.484.605C8.246 5.097 8.5 6.459 8.5 8c0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a3 3 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
          </svg>
          VALIDATION
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "CASH" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("CASH")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
          </svg>
          CASH
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "RICE SEED" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("RICE SEED")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-basket3-fill" viewBox="0 0 16 16">
            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
          </svg>
          RICE SEED
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "CORN" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("CORN")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-basket2-fill" viewBox="0 0 16 16">
            <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1" />
          </svg>
          CORN SEED
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "RODENTICIDE" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("RODENTICIDE")}
        >
          <img src="http://localhost:3000/pest1.png" className="w-6" />
          RODENTICIDE
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "LIQUID ZINC" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("LIQUID ZINC")}
        >
          <img src="http://localhost:3000/pest2.png" className="w-6" />
          LIQUID ZINC
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "FUNGICIDE" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("FUNGICIDE")}
        >
          <img src="http://localhost:3000/pest3.png" className="w-6" />
          FUNGICIDE
        </p>
        <p
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 cursor-pointer rounded-t-sm ${activePage === "BIO-N" ? "text-white bg-teal-500" : "text-black"
            } duration-200`}
          onClick={() => handleActivePage("BIO-N")}
        >
          <img src="http://localhost:3000/pest4.png" className="w-6" />
          BIO-N
        </p>

      </div>
      <footer>
        {/* <button className={`w-full p-2 bg-white border-2 border-teal-500 hover:bg-teal-500 hover:text-white duration-200 ${user.id ? '' : 'hidden'}`}
          onClick={() => {
            setConfirm(true)
          }}>
          Sign Out
        </button> */}
      </footer>
    </div>
  );
}
