import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemForm from './MemForm';
import MemTable from './MemTable';

export default function Mem({ accessToken, user }) {
    const [member, setMember] = useState([]);
    const [isModalOpen, setModal] = useState(false);
    const [selected, setSelected] = useState({});

    // GET FUNCTION
    const getMember = async () => {
        await axios
            .get(`/user?id=${user.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setMember(res.data.data)
            });

    };
    useEffect(() => {
        getMember();
    }, [selected])
    return (
        <div className='flex flex-col gap-5 w-full bg-white p-2'>
            <div>
                {
                    !isModalOpen ? <></> :
                        <MemForm setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken}/>
                }
            </div>
            <button className='w-40 p-2 bg-emerald-400 text-white hover:bg-emerald-500 hover:font-bold duration-200'
                onClick={(e) => setModal(true)}>ADD NEW</button>
            <div className='w-full p-2 bg-'>
                <MemTable member={member} setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken}/>
            </div>
        </div>
    )
}
