import react from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function AreaChartVisual({ data, year, month, filter, week }) {
    function getISOWeek(date) {
        const dayOfWeek = date.getUTCDay() || 7;
        date.setUTCDate(date.getUTCDate() + 4 - dayOfWeek);
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    }
    function calculateYearlyCashSubsidy(jsonDataArray) {
        // Determine the range of years present in the data
        const yearSet = new Set();
        jsonDataArray.forEach(jsonData => {
            const createdYear = new Date(jsonData.updated_at).getFullYear();
            yearSet.add(createdYear);
        });
        const years = Array.from(yearSet);

        // Modify the JSON data to represent the total cash subsidy given for each year
        const modifiedData = years.map(year => {
            const yearlyData = jsonDataArray.filter(jsonData => {
                const createdYear = new Date(jsonData.updated_at).getFullYear();
                return createdYear === year;
            });

            const totalBags = yearlyData.reduce((acc, jsonData) => {
                return acc + jsonData.number_bags;
            }, 0);

            return {
                year: year,
                total_bags: totalBags
            };
        });

        return modifiedData;
    }
    function calculateMonthlyCashSubsidy(jsonDataArray, year) {
        // Modify the JSON data to represent the total cash subsidy given for each month in the specified year
        const modifiedData = Array.from({ length: 12 }, (_, index) => {
            const month = index + 1;
            const monthlyData = jsonDataArray.filter(jsonData => {
                const updatedYear = new Date(jsonData.updated_at).getFullYear();
                const updatedMonth = new Date(jsonData.updated_at).getMonth() + 1;
                return updatedYear === year && updatedMonth === month;
            });

            const totalBags = monthlyData.reduce((acc, jsonData) => {
                return acc + parseFloat(jsonData.number_bags || 0); // Ensure amount is a number and default to 0 if undefined
            }, 0);

            const monthName = new Date(Date.UTC(2000, index, 1)).toLocaleString('default', { month: 'long' });

            return {
                year: year,
                month: monthName,
                total_bags: totalBags
            };
        });

        return modifiedData;
    }
    function calculateWeeklyCashSubsidy(jsonDataArray, year, month) {
        // Initialize an object to store the total cash amount for each day in the specified month
        const dailyCashAmounts = {};

        // Loop through the JSON data and accumulate the cash amount for each day in the specified month
        jsonDataArray.forEach(jsonData => {
            const updatedYear = new Date(jsonData.updated_at).getFullYear();
            const updatedMonth = new Date(jsonData.updated_at).getMonth() + 1;
            const updatedDay = new Date(jsonData.updated_at).getDate();

            // Check if the data entry matches the specified year and month
            if (updatedYear === year && updatedMonth === month) {
                // Initialize dailyCashAmounts for the day if it doesn't exist
                if (!dailyCashAmounts[updatedDay]) {
                    dailyCashAmounts[updatedDay] = 0;
                }
                // Accumulate the cash amount for the corresponding day
                dailyCashAmounts[updatedDay] += parseFloat(jsonData.number_bags || 0);
            }
        });

        // Convert the accumulated amounts into an array of objects
        const dailyCashSubsidy = Object.keys(dailyCashAmounts).map(day => ({
            day: parseInt(day),
            total_bags: dailyCashAmounts[day]
        }));

        return {
            year: year,
            month: month,
            dailyBags: dailyCashSubsidy
        };
    }
    let newData = ""
    if (filter === "yearly") {
        newData = calculateYearlyCashSubsidy(data)
    } else if (filter === 'monthly') {
        newData = calculateMonthlyCashSubsidy(data, parseInt(year))
    } else {
        newData = calculateWeeklyCashSubsidy(data, parseInt(year), parseInt(month))
    }
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart  data={filter === 'weekly' ? newData.dailyBags : newData}>
                <XAxis  dataKey={filter === 'yearly' ? "year" : filter === 'monthly' ? "month" : 'day'} />
                <YAxis/>
                <Tooltip />
                <Area type="monotone" dataKey="total_bags" stroke="#2F5744" fill="#87E0B5" />
            </AreaChart>
        </ResponsiveContainer>
    )
}