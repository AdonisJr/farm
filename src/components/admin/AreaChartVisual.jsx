import react from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function AreaChartVisual({ data }) {

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <XAxis dataKey="year" />
                <YAxis/>
                <Tooltip />
                <Area type="monotone" dataKey="total_bags" stroke="#2F5744" fill="#87E0B5" />
            </AreaChart>
        </ResponsiveContainer>
    )
}