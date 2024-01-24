import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChartVisual from './BarChartVisual';
import LineChartVisual from './LineChatVisual';
import AreaChartVisual from './AreaChartVisual';

export default function Dashboard({ user, accessToken }) {
  const [overall, setOverall] = useState([]);
  const [totalCash, setTotalCash] = useState([]);
  const [totalBags, setTotalBags] = useState([]);

  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  });

  const getOverall = async () => {
    await axios
      .get(`/subsidy/overalltotal`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setOverall(res.data.data)
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
        console.log(res.data.data)
        setTotalBags(res.data.data)
      });

  };
  useEffect(() => {
    getOverall();
    getTotalCash();
    getTotalBags();
  }, [])

  return (
    <div className='p-5 w-full flex flex-col gap-5 bg-slate-200 rounded-lg'>
      <div className='flex gap-2'>
        <div className='w-2/6 p-2 rounded-lg flex flex-col bg-white shadow-lg'>
          <p className='text-start border-b border-slate-200 p-2'>Overall Total of Distributed Subsidies.</p>
          <div className='flex flex-col items-center'>
            {
              !overall ? "" :
                overall.map(data => (
                  <p key={data.id}>{data.type} : <span className='font-bold text-xl'>{data.type_count}</span></p>
                ))
            }
          </div>

        </div>
        <div className='w-2/6 p-5 rounded-lg flex flex-col bg-white shadow-lg'>
          <p className='text-start border-b border-slate-200 p-2'>Total Cash Distributed per Year.</p>
          <div className='flex flex-col h-full items-center justify-center'>
            {
              !totalCash ? "" :
                totalCash.map(data => (
                  <p key={data.id}>{data.year} : <span className='font-bold text-xl'>{formatter.format(data.total_cash_amount)}</span></p>
                ))
            }
          </div>

        </div>
        <div className='w-2/6 p-2 rounded-lg flex flex-col bg-white shadow-lg'>
          <p className='text-start border-b border-slate-200 p-2'>Total Bags of Seeds Distributed per Year.</p>
          <div className='flex flex-col h-full items-center justify-center'>
            {
              !totalBags ? "" :
                totalBags.map(data => (
                  <p key={data.id}>{data.year} : <span className='font-bold text-xl'>{data.total_bags}</span></p>
                ))
            }
          </div>

        </div>


      </div>
      <div className='flex flex-col items-center w-full p-2 bg-white rounded-lg shadow-lg'> 
      <p className='font-bold'>OVERALL DATA PER YEAR </p>
        <BarChartVisual data={overall} />
      </div>
      <div className='flex flex-col items-center w-full p-2 bg-white rounded-lg shadow-lg'> 
      <p className='font-bold'>TOTAL CASH DISTRIBUTED PER YEAR </p>
        <LineChartVisual data={totalCash} />
      </div>
      <div className='flex flex-col items-center w-full p-2 bg-white rounded-lg shadow-lg'> 
      <p className='font-bold'>TOTAL BAGS OF SEED DISTRIBUTED PER YEAR </p>
        <AreaChartVisual data={totalBags} />
      </div>
    </div>
  )
}
