import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnuTable from './EnuTable';
import EnuForm from './EnuForm';

export default function Enu({ accessToken, user }) {
    const [enumerator, setEnumerator] = useState([]);
    const [isModalOpen, setModal] = useState(false);
    const [selected, setSelected] = useState({});

    // GET FUNCTION
    const getEnumerator = async () => {
        await axios
            .get(`/user?role=enumerator`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setEnumerator(res.data.data)
            });

    };
    useEffect(() => {
        getEnumerator();
    }, [selected])
    return (
        <div className='flex flex-col gap-5 w-full bg-white p-2'>
            <div>
                {
                    !isModalOpen ? <></> :
                        <EnuForm setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken} />
                }
            </div>
            <button className='w-40 p-2 bg-emerald-400 text-white hover:bg-emerald-500 hover:font-bold duration-200'
                onClick={(e) => setModal(true)}>ADD NEW</button>
            <div className='w-full p-2 bg-'>
                <EnuTable enumerator={enumerator} setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken} />
            </div>
        </div>
    )
}
