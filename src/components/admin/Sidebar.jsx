import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ activePage, handleActivePage, user, setUser, setAccessToken }) {

  const navigate = useNavigate();
  const cookies = new Cookies({ path: "/" });
  return (
    <div className="flex flex-col fixed justify-between w-56 p-2 min-h-screen text-start gap-1 bg-white text-slate-600 font-semibold">

      <div className="flex justify-center items-center border-b-2 border-slate-200">
        <img src="http://localhost:3000/logo.png" className="w-20" />
        <p className="font-serif text-3xl">CCSMS</p>
      </div>

      {/* middle */}
      <div className="flex p-2 flex-col gap-2">
        <button
          className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "Dashboard" ? "text-white bg-teal-500" : "text-black"
            } duration-200 text-left`}
          onClick={() => handleActivePage("Dashboard")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-grid-1x2-fill" viewBox="0 0 16 16">
            <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z" />
          </svg>
          DASHBOARD
        </button>
        <div className="flex flex-col gap-1 border-b-2 border-slate-200">
          <button
            className={`flex gap-1 hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "User" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("User")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
            </svg>
            USER
          </button>

          <p className="text-sm text-slate-300">FARM</p>
          <button
            className={`flex gap-1 hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "Farm Land" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("Farm Land")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
              <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z" />
            </svg>
            FARM VISUAL
          </button>
          <button
            className={`flex gap-1 hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "REQUESTED FARM" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("REQUESTED FARM")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-spellcheck" viewBox="0 0 16 16">
              <path d="M8.217 11.068c1.216 0 1.948-.869 1.948-2.31v-.702c0-1.44-.727-2.305-1.929-2.305-.742 0-1.328.347-1.499.889h-.063V3.983h-1.29V11h1.27v-.791h.064c.21.532.776.86 1.499.86zm-.43-1.025c-.66 0-1.113-.518-1.113-1.28V8.12c0-.825.42-1.343 1.098-1.343.684 0 1.075.518 1.075 1.416v.45c0 .888-.386 1.401-1.06 1.401zm-5.583 1.035c.767 0 1.201-.356 1.406-.737h.059V11h1.216V7.519c0-1.314-.947-1.783-2.11-1.783C1.355 5.736.75 6.42.69 7.27h1.216c.064-.323.313-.552.84-.552s.864.249.864.771v.464H2.346C1.145 7.953.5 8.568.5 9.496c0 .977.693 1.582 1.704 1.582m.42-.947c-.44 0-.845-.235-.845-.718 0-.395.269-.684.84-.684h.991v.538c0 .503-.444.864-.986.864m8.897.567c-.577-.4-.9-1.088-.9-1.983v-.65c0-1.42.894-2.338 2.305-2.338 1.352 0 2.119.82 2.139 1.806h-1.187c-.04-.351-.283-.776-.918-.776-.674 0-1.045.517-1.045 1.328v.625c0 .468.121.834.343 1.067z" />
              <path d="M14.469 9.414a.75.75 0 0 1 .117 1.055l-4 5a.75.75 0 0 1-1.116.061l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.908 1.907 3.476-4.346a.75.75 0 0 1 1.055-.117" />
            </svg>
            REQUESTED FARM
          </button>


          <p className="text-sm text-slate-300">SUBSIDIES</p>
          <button
            className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "CASH" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("CASH")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
              <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
            </svg>
            CASH
          </button>
          <button
            className={` flex items-center gap-1 hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "RICE SEED" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("RICE SEED")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket3-fill" viewBox="0 0 16 16">
              <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
            </svg>
            RICE SEED
          </button>
          <button
            className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "RODENTICIDE" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("RODENTICIDE")}
          >
            <img src="http://localhost:3000/pest1.png" className="w-5" />
            RODENTICIDE
          </button>
          <button
            className={`flex items-center gap-1 hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "LIQUID ZINC" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("LIQUID ZINC")}
          >
            <img src="http://localhost:3000/pest2.png" className="w-5" />
            LIQUID ZINC
          </button>
          <button
            className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "FUNGICIDE" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("FUNGICIDE")}
          >
            <img src="http://localhost:3000/pest3.png" className="w-5" />
            FUNGICIDE
          </button>
          <button
            className={`flex gap-1 items-center hover:bg-teal-500 text-black hover:text-white duration-200 p-2 rounded-t-sm ${activePage === "BIO-N" ? "text-white bg-teal-500" : "text-black"
              } duration-200 text-left`}
            onClick={() => handleActivePage("BIO-N")}
          >
            <img src="http://localhost:3000/pest4.png" className="w-5" />
            BIO-N
          </button>
        </div>

      </div>
      <footer className="p-2">
        <button className="flex gap-1 items-center justify-center w-full p-2 bg-white border-2 border-teal-500 hover:bg-teal-500 hover:text-white duration-200"
          onClick={() => {
            cookies.remove("user");
            setUser({});
            setAccessToken('');
            navigate('/')
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-door-closed-fill" viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
          Sign Out
        </button>
      </footer>
    </div>
  );
}
