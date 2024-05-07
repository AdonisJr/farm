import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChartVisual from './BarChartVisual';
import LineChartVisual from './LineChatVisual';
import AreaChartVisual from './AreaChartVisual';
import Select from "react-select";

export default function Dashboard({ user, accessToken }) {
  const [overall, setOverall] = useState([]);
  const [totalCash, setTotalCash] = useState([]);
  const [totalBags, setTotalBags] = useState([]);
  const [member, setMember] = useState([]);
  const [filter, setFilter] = useState('yearly');
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState(1)
  const currentYear = new Date().getFullYear();
  const [cash, setCash] = useState([]);
  const [rice, setRice] = useState([]);

  const yearsOpt = Array.from({ length: currentYear - 2009 }, (_, index) => ({
    value: (currentYear - index).toString(),
    label: (currentYear - index).toString(),
  }));

  const monthsOpt = Array.from({ length: 12 }, (_, index) => {
    const monthIndex = new Date().getMonth();
    const month = (monthIndex + index) % 12;
    const monthDate = new Date(0, month);
    const monthString = monthDate.toLocaleString('default', { month: 'long' });
    const monthValue = (month + 1).toString().padStart(2, '0');
    return { value: monthValue, label: monthString };
  });

  const formatter = (amount) => {
    // Using Intl.NumberFormat to format the amount as PHP currency
    const formatter = new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    });
    // Formatting the amount
    const amountInPHP = formatter.format(amount);
    return amountInPHP;
  };

  const getOverall = async () => {
    await axios
      .get(`/subsidy/overalltotal`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setOverall(res.data.data)
        console.log(res.data.data)
      });

  };
  const getTotalCash = async () => {
    await axios
      .get(`/subsidy/totalcash`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data)
        setTotalCash(res.data.data)
      });

  };
  const getTotalBags = async () => {
    await axios
      .get(`/subsidy/totalbags`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setTotalBags(res.data.data)
      });

  };
  const getMember = async () => {
    await axios
      .get(`/user/all?role=member`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        console.log(res.data.data)
        setMember(res.data.data)
      });

  };

  const getCashSubsidy = async () => {
    await axios
      .get(`/subsidy/cash`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        console.log(res.data.data)
        setCash(res.data.data)
      });

  };
  const getRiceSubsidy = async () => {
    await axios
      .get(`/subsidy/rice`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        console.log(res.data.data)
        setRice(res.data.data)
      });

  };
  useEffect(() => {
    getOverall();
    getMember();
    getCashSubsidy()
    getRiceSubsidy()
  }, [])


  const totalRice = overall.filter(data => data.type === 'RCEF RICE SEED DISTIBUTION')
  const totalAmount = overall.filter(data => data.type === 'CASH')
  const totalRoden = overall.filter(data => data.type === 'RODENTICIDE')
  const totalLiquid = overall.filter(data => data.type === 'LIQUID ZINC')
  const totalFungicide = overall.filter(data => data.type === 'FUNGICIDE')
  const totalBion = overall.filter(data => data.type === 'BIO-N')

  return (
    <div className='p-5 w-full flex flex-col gap-5 bg-slate-200 rounded-lg'>
      <div className='ps-2 text-2xl font-bold'>
        Hi, Welcome back!
      </div>

      <div className='flex gap-1'>
        <div className='gap-2 w-2/6 p-2 rounded-lg flex flex-col'>

          <div className='flex relative bg-orange-400 text-white flex-col px-3 py-6 h-auto'>
            <div className='flex items-center justify-center absolute top-12 right-6 bg-orange-800 p-2 rounded-full'>
              <img src='http://localhost:3000/seed.png' className='w-8 h-8'></img>
            </div>
            <p className='font-semibold'>RCEF RICE SEED DISTIBUTION SUBSIDY</p>
            <p className='text-sm font-semibold'>OVER ALL TOTAL OF BAGS</p>
            <p className='font-sans font-bold text-2xl'>{totalRice[0] ? totalRice[0].total_bags : ''}</p>
          </div>
          <div className='flex relative bg-pink-500 text-white flex-col px-3 py-6 h-auto'>
            <div className='flex items-center justify-center absolute top-10 right-6 bg-pink-800 p-3 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cash-stack" viewBox="0 0 16 16">
                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
              </svg>
            </div>
            <p className='font-semibold'>CASH SUBSIDY</p>
            <p className='text-sm font-semibold'>OVER ALL TOTAL AMOUNT OF CASH</p>
            <p className='font-sans font-bold text-2xl'>{totalAmount[0] ? formatter(totalAmount[0].total_cash) : ""}</p>
          </div>
          <div className='flex relative bg-blue-700 text-white flex-col px-3 py-8 h-auto'>
            <div className='flex items-center justify-center absolute top-10 right-6 bg-blue-900 p-3 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-check-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </div>
            <p className='font-semibold'>REGISTERED FARMER</p>
            <p className='text-sm font-semibold'>TOTAL</p>
            <p className='font-sans font-bold text-2xl'>{member[0] ? member.length : ""}</p>
          </div>

        </div>
        <div className='flex flex-col w-4/6 p-4 gap-2 bg-white'>
          <div className='flex gap-2 py-2'>
            <div className='flex relative bg-white border-2 border-slate-200 flex-col p-3 h-auto'>
              <p className='font-semibold'>RODENTICIDE</p>
              <p className='text-sm font-semibold'>TOTAL DISTRIBUTED (kg)</p>
              <p className='font-sans font-bold text-2xl'>{totalRoden[0] ? totalRoden[0].total_kilos : ""}</p>
            </div>
            <div className='flex relative bg-white border-2 border-slate-200 flex-col p-3 h-auto'>
              <p className='font-semibold'>LIQUID ZINC</p>
              <p className='text-sm font-semibold'>TOTAL DISTRIBUTED (kg)</p>
              <p className='font-sans font-bold text-2xl'>{totalLiquid[0] ? totalLiquid[0].total_kilos : ""}</p>
            </div>
            <div className='flex relative bg-white border-2 border-slate-200 flex-col p-3 h-auto'>
              <p className='font-semibold'>FUNGICIDE</p>
              <p className='text-sm font-semibold'>TOTAL DISTRIBUTED (kg)</p>
              <p className='font-sans font-bold text-2xl'>{totalFungicide[0] ? totalFungicide[0].total_kilos : ""}</p>
            </div>
            <div className='flex relative bg-white border-2 border-slate-200 flex-col p-3 h-auto'>
              <p className='font-semibold'>BIO-N</p>
              <p className='text-sm font-semibold'>TOTAL DISTRIBUTED (kg)</p>
              <p className='font-sans font-bold text-2xl'>{totalBion[0] ? totalBion[0].total_kilos : ""}</p>
            </div>
          </div>
          <p className='font-bold text-slate-600 pt-5'> This data shows the total count of subsidies distributed per farmer. </p>
          <BarChartVisual data={overall} />
        </div>
      </div>
      <div className='flex flex-col gap-2 bg-slate-100 p-5'>
        <div className='flex justify-between gap-5'>
          <div className='flex gap-5'>
            <div>
              <input type="radio" name="filter" checked={filter === 'yearly'} value="yearly" onChange={(e) => setFilter(e.target.value)} /> Yearly
            </div>
            <div>
              <input type="radio" name="filter" checked={filter === 'monthly'} value="monthly" onChange={(e) => setFilter(e.target.value)} /> Monthly
            </div>
            <div>
              <input type="radio" name="filter" checked={filter === 'weekly'} value="weekly" onChange={(e) => setFilter(e.target.value)} /> Daily
            </div>
          </div>
          <div>
            {
              filter === 'monthly' ?
                <Select options={yearsOpt} onChange={(e) => setYear(e.value)} />
                :
                filter === 'weekly' ?
                <div className='flex gap-2'>
                  <div>
                    Year
                    <Select options={yearsOpt} onChange={(e) => setYear(e.value)} />
                  </div>
                  <div>
                    Month
                    <Select options={monthsOpt} onChange={(e) => setMonth(e.value)} />
                  </div>
                  {/* <div>
                    Week
                    <Select options={[
                      { label: 1, value: 1 },
                      { label: 2, value: 2 },
                      { label: 3, value: 3 },
                      { label: 4, value: 4 },
                    ]} onChange={(e) => setWeek(e.value)} />
                  </div> */}
                </div> : ""
            }
          </div>

        </div>

        <div className='flex flex-col p-5 bg-white text-white'>
          <p className='font-bold text-slate-600 py-5'> This data shows the total amount of cash distributed to farmers. </p>
          <LineChartVisual data={cash} filter={filter} month={month} year={year} week={week} />
        </div>
        <div className='flex flex-col w-full p-5 bg-white'>
          <p className='font-bold text-slate-600 py-5'> This data shows the total amount of cash distributed to farmers. </p>
          <AreaChartVisual data={rice} filter={filter} month={month} year={year} week={week} />
        </div>
      </div>

    </div>
  )
}
