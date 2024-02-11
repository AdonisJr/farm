import React, { useEffect, useState } from "react";
import Select from "react-select";
import LoadingButton from "../components/LoadingButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadID from "../components/client/UploadID";
import {
  regions,
  provinces,
  cities,
  barangays,
  regionByCode,
  provincesByCode,
  provinceByName,
} from "select-philippines-address";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ role: 'user' });
  const [showPassword, setShowPassword] = useState(true);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const genderOpt = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]
  const barangayOpt = [
    { label: 'Basa', value: 'Basa' },
    { label: 'Cuevas', value: 'Cuevas' },
    { label: 'KapatunganKapatungan', value: 'KapatunganKapatungan' },
    { label: 'Langkila-an', value: 'Langkila-an' },
    { label: 'New Visayas', value: 'New Visayas' },
    { label: 'Poblacion', value: 'Poblacion' },
    { label: 'Pulang-lupa', value: 'Pulang-lupa' },
    { label: 'Salvacion', value: 'Salvacion' },
    { label: 'San Ignacio', value: 'San Ignacio' },
    { label: 'San Isidro', value: 'San Isidro' },
    { label: 'San Roque', value: 'San Roque' },
    { label: 'Santa Maria', value: 'Santa Maria' },
    { label: 'Tudela', value: 'Tudela' },
    { label: 'Cebolin', value: 'Cebolin' },
    { label: 'Manat', value: 'Manat' },
    { label: 'Pangyan', value: 'Pangyan' }
  ]
  // TOGGLE SHOW PASSWORD

  const handleToggle = (e) => {
    if (e.target.checked === true) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }

  // TOAST FUNCTION
  const showErrorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2000,
    });
  };
  const showSuccessMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2000,
    });
  };

  // RANK OPTION FOR SELECT

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    // VALIDATIONS
    if (!credentials.first_name) return showErrorMessage("First Name is required");
    if (!credentials.last_name) return showErrorMessage("Last Name is required");
    if (!credentials.email) return showErrorMessage("Email is required");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.email))
      return showErrorMessage("Invalid email format.");
    // if(!passwordRegex.test(credentials.password)) return showErrorMessage("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    if (credentials.password !== credentials.confirm_password) return showErrorMessage("Password do not match.");
    // INSERT
    await axios
      .post("/user", credentials)
      .then((res) => {
        console.log(res);
        setLoading(false);
        showSuccessMessage(res.data.message);
        setTimeout(() => { navigate('/signIn') }, 2000)
      })
      .catch((error) => {
        console.log(error);
        showErrorMessage(
          error.response.data.error + ". " + error.response.data.message
        );
        setLoading(false);
        // navigate("/");
      });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // GET FUNCTIONS

  const getRegion = async () => {
    const regionResult = await regions().then((region) => region);
    console.log(regionResult)
    // regionResult.map((region) =>
    //   regionOpt.push({ label: region.region_name, value: region.region_code })
    // );
  };

  const getProvince = async (code) => {
    // setDetails({...details, region: code.label})
    const provinceResult = await provinces('16').then((province) => province);
    console.log(provinceResult)
    // while (provinceOpt.length > 0) {
    //   provinceOpt.pop();
    // }
    // provinceResult.map((province) => {
    //   provinceOpt.push({
    //     label: province.province_name,
    //     value: province.province_code,
    //   });
    // });
  };

  const getCities = async (code) => {
    const citiesResult = await cities('1603').then((city) => city);
    console.log(citiesResult)
    // while (cityOpt.length > 0) {
    //   cityOpt.pop();
    // }
    // citiesResult.map((city) => {
    //   cityOpt.push({ label: city.city_name, value: city.city_code });
    // });
  };

  const getBarangay = async (code) => {
    const barangayResult = await barangays('160312').then((barangays) => barangays);
    console.log(barangayResult)
    // while (barangayOpt.length > 0) {
    //   barangayOpt.pop();
    // }
    // barangayResult.map((barangay) => {
    //   barangayOpt.push({
    //     label: barangay.brgy_name,
    //     value: barangay.brgy_name,
    //   });
    // });
  };

  useEffect(() => { getBarangay() }, [])
  return (
    <main className="flex flex-col min-h-screen items-centesr justify-center items-center bg-neutral-200 md:flex-row p-2 text-sm">
      <ToastContainer />
      <div className="w-2/6 flex flex-col px-6 gap-2 bg-white">
        <div className="flex gap-1 items-center justify-center">

          <img src="http://localhost:3000/logo.png" className="w-20" />
          <p className="text-lg font-bold">CCSMS</p>
        </div>
        <p className="text-lg font-bold">Sign In</p>
        {/* FIRST NAME */}
        <div className="flex gap-10 w-full">
          <div className="flex flex-col justify-center w-3/6">
            <input
              type="text"
              className="border-b-2 border-neutral-400 w-full py-2 outline-none"
              placeholder="First name"
              onChange={(e) =>
                setCredentials({ ...credentials, first_name: e.target.value })
              }
              value={credentials.first_name}
            />
          </div>
          <div className="flex flex-col justify-center w-3/6">
            <input
              type="text"
              className="border-b-2 border-neutral-400 w-full py-2 outline-none"
              placeholder="Middle name"
              onChange={(e) =>
                setCredentials({ ...credentials, middle_name: e.target.value })
              }
              value={credentials.middle_name}
            />
          </div>
        </div>
        <div className="flex gap-10 w-full">
          <div className="flex flex-col justify-center w-3/6">
            <input
              type="text"
              className="border-b-2 border-neutral-400 w-full py-2 outline-none"
              placeholder="Last name"
              onChange={(e) =>
                setCredentials({ ...credentials, last_name: e.target.value })
              }
              value={credentials.last_name}
            />
          </div>
          <div className="flex flex-col justify-center w-3/6">
            <input
              type="text"
              className="border-b-2 border-neutral-400 w-full py-2 outline-none"
              placeholder="Suffix"
              onChange={(e) =>
                setCredentials({ ...credentials, suffix: e.target.value })
              }
              value={credentials.suffix}
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="flex justify-center items-center rounded-md">
          <input
            type="email"
            placeholder="Email"
            className="border-b-2 border-neutral-400 w-full py-2 outline-none"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            value={credentials.email}
          />
        </div>
        {/* gender */}
        <div className="flex flex-col justify-center rounded-md">
          <label htmlFor="" className="">
            Gender:
          </label>
          <Select
            options={genderOpt}
            onChange={(e) => setCredentials({ ...credentials, gender: e.value })}
            value={{ label: credentials.gender, value: credentials.gender }}
            className="w-full outline-none"
            placeholder="Gender"
          />
        </div>
        {/* Date of birth */}
        <div className="flex flex-col justify-center rounded-md">
          <label htmlFor="" className="">
            Date of Birth:
          </label>
          <input
            type="date"
            placeholder="Date of Birth"
            className="border-2 border-neutral-400 w-full p-2 rounded-sm"
            onChange={(e) =>
              setCredentials({ ...credentials, birth_date: e.target.value })
            }
            value={credentials.birth_date}
          />
        </div>
        <div className="flex flex-col justify-center rounded-md">
          <label className="">Barangay</label>
          <Select
            options={barangayOpt}
            value={{ label: credentials.barangay, value: credentials.barangay }}
            onChange={(e) =>
              setCredentials({ ...credentials, barangay: e.value })
            }
            className="w-full"
          />
        </div>
        {/* PASSWORD */}
        <div className="flex relative gap-10 justify-center items-center rounded-md">

          <input
            type={showPassword === true ? 'password' : 'text'}
            className="border-b-2 border-neutral-400 w-3/6 py-2 outline-none"
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            value={credentials.password}
          />
          <input
            type={showPassword ? 'password' : 'text'}
            className="border-b-2 border-neutral-400 w-3/6 py-2 outline-none"
            placeholder="Confirm Password"
            onChange={(e) =>
              setCredentials({
                ...credentials,
                confirm_password: e.target.value,
              })
            }
            value={credentials.confirm_password}
          />
          <input type="checkbox" className="absolute top-4 right-0 cursor-pointer" onChange={handleToggle} />

        </div>
        {/* PASSWORD */}

        <div className="flex gap-1 justify-center items-center rounded-md">

        {showPassword}wewe
          <input
            type="text"
            placeholder="Phone number"
            className="border-b-2 border-neutral-400 py-2 w-full outline-none"
            onChange={(e) =>
              setCredentials({ ...credentials, phone_number: e.target.value })
            }
          />
        </div>
        <div className="flex justify-center">
          <LoadingButton
            isLoading={loading}
            text="Register"
            size="w-5/6 mt-2"
            onClick={handleSubmit}
          />
        </div>
        <div className="py-2 text-center">
          <p className="mb-0 text-sm">
            Already have an account?
            <a
              href="/signIn"
              className="text-danger ps-2 font-semibold transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
