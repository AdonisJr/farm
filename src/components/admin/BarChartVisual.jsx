import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import "./style.css";


export default function BarChartVisual({ data }) {

    return (
        <>
            <BarChart width={900} height={350} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" tick={{ fontSize: 14 }} label={{ value: '', position: 'insideBottom', fontSize: 16 }} angle={-10} textAnchor="end" interval={0} />
                <YAxis dataKey="type_count" domain={[0, dataMax => dataMax + 5]} />
                <Tooltip/>
                <Legend />
                <Bar dataKey="type_count" fill="#15E781" />
            </BarChart>
        </>

    )
}