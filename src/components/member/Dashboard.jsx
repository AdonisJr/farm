import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gmap from './Gmap';

export default function Dashboard({ accessToken, user, }) {
    const [farms, setFarms] = useState([]);
    const [subsidies, setSubsidies] = useState([]);
    const [subsidies1, setSubsidies1] = useState([]);
    const [subsidies2, setSubsidies2] = useState([]);
    const [subsidies3, setSubsidies3] = useState([]);
    const [subsidies4, setSubsidies4] = useState([]);
    const [subsidies5, setSubsidies5] = useState([]);
    const [subsidies6, setSubsidies6] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [location, setLocation] = useState({})
    const getFarm = async () => {
        await axios
            .get(`/farm/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                console.log(res.data.data)
                setFarms(res.data.data);
            });
    }
    const getRice = async () => {
        await axios
            .get(`/subsidy/${user.id}?type=RCEF RICE SEED DISTIBUTION`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSubsidies1(res.data.data)
            });

    };
    const getCash = async () => {
        await axios
            .get(`/subsidy/${user.id}?type=CASH`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSubsidies2(res.data.data)
            });

    };
    const getRodenticide = async () => {
        await axios
            .get(`/subsidy/${user.id}?type=RODENTICIDE`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSubsidies3(res.data.data)
            });

    };
    const getZinc = async () => {
        await axios
            .get(`/subsidy/${user.id}?type=LIQUID ZINC`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSubsidies4(res.data.data)
            });

    };
    const getFungicide = async () => {
        await axios
            .get(`/subsidy/${user.id}?type=FUNGICIDE`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSubsidies5(res.data.data)
            });

    };
    const getBion = async () => {
        await axios
            .get(`/subsidy/${user.id}?type=BIO-N`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSubsidies6(res.data.data)
            });

    };
    useEffect(() => {
        getFarm();
        getRice();
        getBion();
        getCash();
        getRodenticide();
        getZinc();
        getFungicide();
    }, [])
    useEffect(() => {
    }, [subsidies])
    return (
        <div className='bg-white p-5 rounded-lg shadow-lg flex flex-col gap-2'>
            {
                !showMap ? "" :
                    <Gmap farm={location} user={user} setLocation={setLocation} setShowMap={setShowMap} />
            }
            <p className='text-xl font-bold p-4'>Farm Details</p>
            {
                !farms ? "" :
                    farms.map(farm => (
                        <div className='bg-slate-50 p-4'>
                            <p className='flex gap-2 items-center'>
                                Farm ID: <span className='font-semibold underline text-lg'> {farm.id} </span>
                                Latitude: <span className='font-semibold underline text-lg'> {farm.lat} </span>
                                Longitude: <span className='font-semibold underline text-lg'> {farm.lng} </span>
                                Farm Size: <span className='font-semibold underline text-lg'> {farm.lot_size} </span>
                                <button className='w-1/6 bg-emerald-500 p-2 hover:bg-emerald-600 text-white font-bold rounded-lg duration-200'
                                    onClick={(e) => [setLocation({ lat: farm.lat, lng: farm.lng }), setShowMap(true)]}
                                >View Visual
                                </button>
                            </p>
                        </div>
                    ))
            }

            <p className='text-xl font-bold p-4'>Subsidies</p>
            <div className='border-2 border-slate-200'>
                <p className='text-lg font-semibold p-4'>RCEF RICE SEED DISTIBUTION</p>
                {/* RICE */}
                <table className='w-full'>
                    <thead className='bg-blue-50'>
                        <tr>
                            <th className='p-5'>Farm ID</th>
                            <th>Area to be Planted (ha)</th>
                            <th>No. Bags</th>
                            <th>Variety Received</th>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !subsidies1 ? "" :
                                subsidies1.map(subsidy => (
                                    <tr className='text-center'>
                                        <td className='p-4'>{subsidy.farm_id}</td>
                                        <td>{subsidy.area_planted}</td>
                                        <td>{subsidy.number_bags}</td>
                                        <td>{subsidy.variety_received}</td>
                                        <td>{subsidy.month + ", " + subsidy.year}</td>
                                        <td>{subsidy.remarks}</td>
                                        <td className='p-4'>{subsidy.status}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='border-2 border-slate-200'>
                <p className='text-lg font-semibold p-4'>CASH</p>
                {/* CASH */}
                <table className='w-full'>
                    <thead className='bg-blue-50'>
                        <tr>
                            <th className='p-5'>Farm ID</th>
                            <th>Area to be Planted (ha)</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !subsidies2 ? "" :
                                subsidies2.map(subsidy => (
                                    <tr className='text-center'>
                                        <td className='p-4'>{subsidy.farm_id}</td>
                                        <td>{subsidy.area_planted}</td>
                                        <td>{subsidy.amount}</td>
                                        <td>{subsidy.month + ", " + subsidy.year}</td>
                                        <td>{subsidy.remarks}</td>
                                        <td className='p-4'>{subsidy.status}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='border-2 border-slate-200'>
                <p className='text-lg font-semibold p-4'>RODENTICIDE</p>
                {/* RODENTICIDE */}
                <table className='w-full'>
                    <thead className='bg-blue-50'>
                        <tr>
                            <th className='p-5'>Farm ID</th>
                            <th>Area to be Planted (ha)</th>
                            <th>Quantity Received (g)</th>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !subsidies3 ? "" :
                                subsidies3.map(subsidy => (
                                    <tr className='text-center'>
                                        <td className='p-4'>{subsidy.farm_id}</td>
                                        <td>{subsidy.area_planted}</td>
                                        <td>{subsidy.quantity_received}</td>
                                        <td>{subsidy.month + ", " + subsidy.year}</td>
                                        <td>{subsidy.remarks}</td>
                                        <td className='p-4'>{subsidy.status}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='border-2 border-slate-200'>
                <p className='text-lg font-semibold p-4'>LIQUID ZINC</p>
                {/* ZINC */}
                <table className='w-full'>
                    <thead className='bg-blue-50'>
                        <tr>
                            <th className='p-5'>Farm ID</th>
                            <th>Area to be Planted (ha)</th>
                            <th>Quantity Received (g)</th>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !subsidies4 ? "" :
                                subsidies4.map(subsidy => (
                                    <tr className='text-center'>
                                        <td className='p-4'>{subsidy.farm_id}</td>
                                        <td>{subsidy.area_planted}</td>
                                        <td>{subsidy.quantity_received}</td>
                                        <td>{subsidy.month + ", " + subsidy.year}</td>
                                        <td>{subsidy.remarks}</td>
                                        <td className='p-4'>{subsidy.status}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='border-2 border-slate-200'>
                <p className='text-lg font-semibold p-4'>FUNGICIDE</p>
                {/* FUNGICIDE */}
                <table className='w-full'>
                    <thead className='bg-blue-50'>
                        <tr>
                            <th className='p-5'>Farm ID</th>
                            <th>Area to be Planted (ha)</th>
                            <th>Quantity Received (g)</th>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !subsidies5 ? "" :
                                subsidies5.map(subsidy => (
                                    <tr className='text-center'>
                                        <td className='p-4'>{subsidy.farm_id}</td>
                                        <td>{subsidy.area_planted}</td>
                                        <td>{subsidy.quantity_received}</td>
                                        <td>{subsidy.month + ", " + subsidy.year}</td>
                                        <td>{subsidy.remarks}</td>
                                        <td className='p-4'>{subsidy.status}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
            <div className='border-2 border-slate-200'>
                <p className='text-lg font-semibold p-4'>BIO-N</p>
                {/* BIO-N */}
                <table className='w-full'>
                    <thead className='bg-blue-50'>
                        <tr>
                            <th className='p-5'>Farm ID</th>
                            <th>Area to be Planted (ha)</th>
                            <th>Quantity Received (g)</th>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !subsidies6 ? "" :
                                subsidies6.map(subsidy => (
                                    <tr className='text-center'>
                                        <td className='p-4'>{subsidy.farm_id}</td>
                                        <td>{subsidy.area_planted}</td>
                                        <td>{subsidy.quantity_received}</td>
                                        <td>{subsidy.month + ", " + subsidy.year}</td>
                                        <td>{subsidy.remarks}</td>
                                        <td className='p-4'>{subsidy.status}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
