import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChartVisual({ data }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart width="100%" height={300} className='w-full h-full' data={data}>
                <XAxis dataKey="year" />
                <YAxis dataKey={"total_cash_amount"} domain={[0, 100000]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_cash_amount" stroke="#87E0B5" strokeWidth={4} />
            </LineChart>
        </ResponsiveContainer>

    )
}
