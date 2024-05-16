import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubModal from './SubModal';
import Select from 'react-select'
// import Request from './Request';

export default function AdmFungicide({ user, accessToken, farms }) {
    const [subsidies, setSubsidies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState("");
    const [selected, setSelected] = useState("");
    const [q, setQ] = useState("");
    const [barangay, setBarangay] = useState("");
    const [filter, setFilter] = useState("monthly");
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")

    const monthOpt = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];

    const yearOpt = Array.from({ length: new Date().getFullYear() - 2009 }, (_, i) => ({ value: new Date().getFullYear() - i, label: (new Date().getFullYear() - i).toString() }));


    const preparePrintData = () => {
        let printData = '<style>';
        printData += 'table {border-collapse: collapse; width: 100%; padding: 10px;}';
        printData += 'th, td {padding: 8px; text-align: left; border-bottom: 1px solid #ddd;}';
        printData += '.title {text-align: center; padding: 5px}';
        printData += '</style>';
        printData += `<h1 class="title">FUNGICIDE Subsidy Report</h1>`;
        printData += '<table>';
        printData += '<thead>';
        printData += '<tr>';
        printData += '<th>Farm ID</th>'
        printData += '<th>Farmer</th>'
        printData += '<th>Area to be Planted</th>'
        printData += '<th>Crops</th>'
        printData += '<th>Barangay</th>'
        printData += '<th>No. of Bags</th>'
        printData += '<th>Requested Date</th>'
        printData += '<th>Received Date</th>'
        printData += '<th>Status</th>'
        printData += '</tr>';
        printData += '</thead>';
        printData += '<tbody>';
        subsidies.map(data => {
            printData += '<tr>';
            printData += `<td>${data.farm_id}</td>`
            printData += `<td>${data.first_name + " " + data.middle_name + " " + data.last_name} </td>`
            printData += `<td>${data.area_planted}</td>`
            printData += `<td>${data.crops}</td>`
            printData += `<td>${data.barangay}</td>`
            printData += `<td>${data.number_bags}</td>`
            printData += `<td>${getDate(data.created_at)}</td>`
            printData += `<td>${getDate(data.received_date)}</td>`
            printData += `<td>${data.status}</td>`
            printData += '</tr>'
        })
        printData += '</tbody>';
        printData += '</table>';
        return printData;
    };

    const handlePrint = () => {
        const printData = preparePrintData();
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write('<pre>');
        printWindow.document.write(printData);
        printWindow.document.write('</pre>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    const getDate = (dateTime) => {
        const dateObj = new Date(dateTime);
        // Formatting date in words format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateInWords = dateObj.toLocaleDateString('en-US', options);
        return dateInWords;
    };

    const getSubsidies = async () => {
        await axios
            .get(`/subsidy?type=FUNGICIDE&q=${q}&barangay=${barangay}&month=${month}&year=${year}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    limit: 5,
                    isCompleted: isCompleted
                }
            })
            .then((res) => {
                setSubsidies(res.data.data)
                setTotalPages(Math.ceil(res.data.totalCount / 5))
            });

    };

    useEffect(() => {
        getSubsidies();
    }, [currentPage, isCompleted, q, barangay, month, year])
    return (
        <div className='p-4 bg-white rounded-lg shadow-sm text-sm'>
            {
                !isModalOpen ? "" :
                    <SubModal type={type} user={user} accessToken={accessToken} setModalOpen={setModalOpen} selected={selected} getSubsidies={getSubsidies} />
            }
            <div className='flex justify-between pe-10'>

                <p className='font-bold text-lg text-slate-600 py-3'>FUNGICIDE SUBSIDY</p>
                <button
                    className='flex gap-2 items-center hover:text-slate-600 duration-200'
                    onClick={handlePrint}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill" viewBox="0 0 16 16">
                        <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1" />
                        <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
                    </svg>
                    Print
                </button>
            </div>
            <div className='flex items-center px-5 pb-2'>
                <div className='flex gap-2 py-2 cursor-pointer'>
                    <p>Filter: </p>
                    <input type='checkbox' className='cursor-pointer' onChange={(e) => setIsCompleted(e.target.checked)} />COMPLETED <span className='text-slate-300'>|</span>
                </div>
                <div className="flex items-center gap-2 w-4/6">
                    <label className="ps-2">Search</label>
                    <input
                        type="text"
                        placeholder="Name"
                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-5/6"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Barangay"
                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-5/6"
                        value={barangay}
                        onChange={(e) => setBarangay(e.target.value)}
                    />
                    <div className='flex flex-col gap-2 ps-10'>
                        <div className='flex gap-2'>
                            <input type='radio' name='choices' value={'monthly'} checked={filter === 'monthly'} onChange={(e) => [setFilter(e.target.value), setYear('')]} /> Monthly
                            <input type='radio' name='choices' value={'yearly'} checked={filter === 'yearly'} onChange={(e) => [setFilter(e.target.value), setMonth('')]} /> Yearly
                        </div>
                        <div>
                            {
                                filter === 'monthly' ?
                                    <Select options={monthOpt} defaultValue={{ label: month, value: month }} onChange={(e) => setMonth(e.value)} /> :
                                    <Select options={yearOpt} defaultValue={{ label: year, value: year }} onChange={(e) => setYear(e.value)} />

                            }

                        </div>
                    </div>
                </div>
            </div>
            <table className='table-auto w-full text-xs'>
                <thead>
                    <tr className='bg-blue-100'>
                        <th className='p-2'>Farm ID</th>
                        <th>Owner</th>
                        <th>Area to be Planted (ha)</th>
                        <th>Barangay</th>
                        <th>Quantity Received (g)</th>
                        <th>Requested Date</th>
                        <th>Received Date</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !subsidies ? "" :
                            subsidies.map(subsidy => (
                                <tr className='text-center border-b-2 border-slate-200 hover:bg-slate-100 duration-200'>
                                    <td className='p-4'>{subsidy.farm_id}</td>
                                    <td>{`${subsidy.first_name}${subsidy.middle_name ? ` ${subsidy.middle_name}` : ''}${subsidy.last_name ? ` ${subsidy.last_name}` : ''}${subsidy.suffix ? ` ${subsidy.suffix}` : ''}`}</td>
                                    <td>{subsidy.area_planted}</td>
                                    <td>{subsidy.barangay}</td>
                                    <td>{subsidy.quantity_received}</td>
                                    <td>{getDate(subsidy.created_at)}</td>
                                    <td>{getDate(subsidy.received_date)}</td>
                                    <td>{subsidy.remarks}</td>
                                    <td className='p-4'><p className={`${subsidy.status === 'COMPLETED' ? 'bg-emerald-300' : subsidy.status === 'CANCELED' ? 'bg-red-400' : 'bg-amber-300'}`}>{subsidy.status}</p></td>
                                    <td>
                                        <div className='flex gap-1 items-center cursor-pointer hover:underline'
                                            onClick={(e) => [setModalOpen(true), setSelected(subsidy)]}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-pencil-fill text-emerald-500 cursor-pointer"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg>
                                            Edit
                                        </div>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <div className='flex gap-2 justify-center py-5'>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button key={pageNumber} className={`rounded-full text-sm p-1 w-10 ${currentPage === pageNumber ? 'bg-slate-200 font-bold' : ''} hover:underline hover:font-bold`} onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    )
}
