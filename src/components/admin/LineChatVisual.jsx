import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineChartVisual({ data, filter, year, month, week }) {
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

            const totalCashAmount = yearlyData.reduce((acc, jsonData) => {
                return acc + jsonData.amount;
            }, 0);

            return {
                year: year,
                total_cash_amount: totalCashAmount
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

            const totalCashAmount = monthlyData.reduce((acc, jsonData) => {
                return acc + parseFloat(jsonData.amount || 0); // Ensure amount is a number and default to 0 if undefined
            }, 0);

            const monthName = new Date(Date.UTC(2000, index, 1)).toLocaleString('default', { month: 'long' });

            return {
                year: year,
                month: monthName,
                total_cash_amount: totalCashAmount
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
                dailyCashAmounts[updatedDay] += parseFloat(jsonData.amount || 0);
            }
        });

        // Convert the accumulated amounts into an array of objects
        const dailyCashSubsidy = Object.keys(dailyCashAmounts).map(day => ({
            day: parseInt(day),
            total_cash_amount: dailyCashAmounts[day]
        }));

        return {
            year: year,
            month: month,
            dailyCashAmounts: dailyCashSubsidy
        };
    }
    // function calculateWeeklyCashSubsidy(jsonDataArray, year, month) {
    //     // Initialize an object to store the total cash amount for each week in the specified month
    //     const weeklyCashAmounts = {};

    //     // Get the first and last day of the specified month
    //     const firstDayOfMonth = new Date(Date.UTC(year, month - 1, 1));
    //     const lastDayOfMonth = new Date(Date.UTC(year, month, 0));

    //     // Loop through the dates in the specified month
    //     for (let currentDate = firstDayOfMonth; currentDate <= lastDayOfMonth; currentDate.setDate(currentDate.getDate() + 1)) {
    //         // Calculate the week number for the current date
    //         const weekNumber = getISOWeek(currentDate);

    //         // Initialize weeklyCashAmounts for the week if it doesn't exist
    //         if (!weeklyCashAmounts[weekNumber]) {
    //             weeklyCashAmounts[weekNumber] = 0;
    //         }

    //         // Loop through the JSON data and accumulate the cash amount for the current date
    //         jsonDataArray.forEach(jsonData => {
    //             const updatedDate = new Date(jsonData.updated_at);
    //             if (updatedDate.getFullYear() === year && updatedDate.getMonth() === month - 1 && updatedDate.getDate() === currentDate.getDate()) {
    //                 weeklyCashAmounts[weekNumber] += parseFloat(jsonData.amount || 0);
    //             }
    //         });
    //     }

    //     return weeklyCashAmounts;
    // }
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
            <LineChart width="100%" height={300} className='w-full h-full' data={filter === 'weekly' ? newData.dailyCashAmounts : newData}>
                <XAxis dataKey={filter === 'yearly' ? "year" : filter === 'monthly' ? "month" : 'day'} />
                <YAxis dataKey={"total_cash_amount"} domain={[0, 100000]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total_cash_amount" stroke="#87E0B5" strokeWidth={4} />
            </LineChart>
        </ResponsiveContainer>

    )
}
