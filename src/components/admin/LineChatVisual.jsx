import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function LineChartVisual({ data }) {
    return (
        <LineChart width={750} height={300} className='w-full h-full' data={data}>
            <XAxis dataKey="year" />
            <YAxis dataKey={"total_cash_amount"} domain={[0, 100000]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_cash_amount" stroke="#87E0B5" strokeWidth={4} />
        </LineChart>
    )
}
