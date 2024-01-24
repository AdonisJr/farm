import React, { useState, useEffect } from 'react';
import GoogleMap from './GoogleMap';
import axios from 'axios';
import Select from 'react-select';
import SubsidyModal from './SubsidyModal';

export default function Subsidy({ currentLocation, accessToken }) {
  const googleApi = process.env.REACT_APP_GOOGLE_API_KEY;
  const [farms, setFarms] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

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

  const getFarms = async () => {
    await axios
      .get(`/farm/get?search=${search}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setFarms(res.data.data)
      });

  };

  useEffect(() => {
    getFarms();
  }, [update, search])
  return (
    <div className='w-full bg-white p-2 me-5 gap-2'>

      <p className='text-2xl w-2/12 font-bold p-2'>Benificiaries</p>
      <div className='flex w-full justify-end border-b-2 border-slate-200 gap-2'>
        <div className='flex w-5/12 justify-end items-center p-2 gap-2'>

          <div className='flex flex-col w-full'>
            <label className='ps-4'>Search</label>
            <input
              type="search"
              placeholder="Name, barangay"
              className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
              value={search}
              onChange={(e) => setSearch(e.target.value )}
            />
          </div>

        </div>
        {/* <div className='flex w-5/12 justify-end items-center gap-2'>
          <div className='w-full'>
            <label className='ps-4'>Filter</label>
            <Select
              options={barangayOpt}
              className='w-5/6'
            onChange={(e) => setCredentials({ ...credentials, barangay: e.value })}
            defaultValue={{ label: credentials.barangay, value: credentials.barangay }}
            />
          </div>
        </div> */}



      </div>
      <div className='p-2'>
        {
          isModalOpen ?
            <SubsidyModal selected={selected} accessToken={accessToken} setModal={setModal} /> : ""
        }
        <table className='w-full'>
          <thead>
            <tr className='bg-emerald-100'>
              <th className='p-4'>Farm I.D</th>
              <th>Owner</th>
              <th>Barangay</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Farm Size(ha)</th>
              <th>Date Establish</th>
              <th className='p-4'>Subsidy</th>
            </tr>
          </thead>
          <tbody>
            {
              !farms ? "" :
                farms.map(farm => (
                  <tr className='text-center cursor-pointer hover:bg-emerald-50'>
                    <td className='p-2'>{farm.id}</td>
                    <td>{`${farm.first_name}${farm.middle_name ? ` ${farm.middle_name}` : ''}${farm.last_name ? ` ${farm.last_name}` : ''}${farm.suffix ? ` ${farm.suffix}` : ''}`}</td>
                    <td>{farm.barangay}</td>
                    <td>{farm.lat}</td>
                    <td>{farm.lng}</td>
                    <td>{farm.lot_size}</td>
                    <td>{farm.establish_date}</td>
                    <td className='cursor-pointer hover:underline' onClick={(e) => [setModal(true), setSelected(farm)]}>View</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
