import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaForm from './StaForm';
import StaTable from './StaTable';

export default function Sta({ accessToken, user }) {
    const [staff, setStaff] = useState([]);
    const [isModalOpen, setModal] = useState(false);
    const [selected, setSelected] = useState({});

    // GET FUNCTION
    const getStaff = async () => {
        await axios
            .get(`/user?role=staff`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setStaff(res.data.data)
            });

    };
    useEffect(() => {
        getStaff();
    }, [selected])
    return (
        <div className='flex flex-col gap-5 w-full bg-white p-2'>
            <div>
                {
                    !isModalOpen ? <></> :
                        <StaForm setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken}/>
                }
            </div>
            <button className='w-40 p-2 bg-emerald-400 text-white hover:bg-emerald-500 hover:font-bold duration-200'
                onClick={(e) => setModal(true)}>ADD NEW</button>
            <div className='w-full p-2 bg-'>
                <StaTable staff={staff} setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken}/>
            </div>
        </div>
    )
}
