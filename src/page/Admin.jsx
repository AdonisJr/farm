import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AdminHeader from "../components/admin/AdminHeader";
import { useNavigate } from "react-router-dom";
import PersonOfConcern from "../components/admin/wanted/PersonOfConcern";
import Sidebar from "../components/admin/Sidebar";
import Upload from "../components/admin/upload/Upload";
import io from "socket.io-client";
import Enu from "../components/enumerator/Enu";
import Sta from "../components/staff/Sta";
import Dashboard from "../components/admin/Dashboard";
import Mem from "../components/member/Mem";
import FarmLand from "../components/member/FarmLand";
import RequestedFarm from "../components/admin/RequestedFarm";
import AdmCash from "../components/admin/AdmCash";
import AdmRice from "../components/admin/AdmRice";
import AdmRodenticide from "../components/admin/AdmRodenticide";
import AdmLiquid from "../components/admin/AdmLiquid";
import AdmFungicide from "../components/admin/AdmFungicide";
import AdmBion from "../components/admin/AdmBion";
import AdminAccounts from "../components/superadmin/AdminAccounts";
const socket = io.connect("http://localhost:3001");

export default function Admin() {
  const cookies = new Cookies({ path: "/" });
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState({});
  const [activePage, setActivePage] = useState("Dashboard");
  const date = new Date();
  const currentDate = date.toISOString().slice(0, 10);
  const [validated, setValidated] = useState(0);
  const [q, setQ] = useState("");
  const [currentLocation, setCurrentLocation] = useState();

  const handleValidated = (value) => {
    setValidated(value)
  }


  // handle FUNCTIONS

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  // SET USER / LOGGED IN

  useEffect(() => {
    // return console.log(decoded.data.id)
    const getUser = async () => {
      if (cookies.get("user")) {
        const token = cookies.get("user");
        const decoded = jwt_decode(token.data);
        setAccessToken(token.data);
        await axios
          .get(`/user/${decoded.id}`, {
            headers: {
              Authorization: `Bearer ${token.data}`,
            },
          })
          .then((res) => {
            if (res.data.data.role === "member") return navigate("/");
            setUser(res.data.data);
          });
      } else {
        navigate("/")
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    if ("geolocation" in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position.coords)
        },
        (err) => {
          console.log(err)
        }
      );
    } else {
      alert("Geolocation is not available in your browser.")
    }
  }, [])

  return (
    <main className="flex min-h-screen max-w-screen gap-5 bg-slate-200 overflow-hidden font-mono">

      <div className="flex ps-5 flex-col gap-5 w-full">
        <AdminHeader user={user}
          setUser={setUser}
          activePage={activePage}
          handleActivePage={handleActivePage}
          setAccessToken={setAccessToken} />
        <div className="min-h-screen px-4">
          {
            !accessToken ? "" :
              activePage === 'User' ? <Mem accessToken={accessToken} user={user} /> :
                activePage === 'Farm Land' ? <FarmLand accessToken={accessToken} currentLocation={currentLocation} /> :
                  activePage === 'CASH' ? <AdmCash accessToken={accessToken} user={user} /> :
                    activePage === 'REQUESTED FARM' ? <RequestedFarm accessToken={accessToken} user={user} /> :
                      activePage === 'RICE SEED' ? <AdmRice accessToken={accessToken} user={user} /> :
                        activePage === 'RODENTICIDE' ? <AdmRodenticide accessToken={accessToken} user={user} /> :
                          activePage === 'LIQUID ZINC' ? <AdmLiquid accessToken={accessToken} user={user} /> :
                            activePage === 'FUNGICIDE' ? <AdmFungicide accessToken={accessToken} user={user} /> :
                              activePage === 'BIO-N' ? <AdmBion accessToken={accessToken} user={user} /> :
                                activePage === 'admin' ? <AdminAccounts accessToken={accessToken} user={user} />
                                  :
                                  <Dashboard accessToken={accessToken} user={user} />
          }
        </div>
      </div>
      <div className="w-64">
        <Sidebar user={user} handleActivePage={handleActivePage} activePage={activePage} setUser={setUser} setAccessToken={setAccessToken} />
      </div>

    </main>
  );

}
