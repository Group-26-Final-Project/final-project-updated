import React, { useCallback, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import CustomAxios from '../Api/CustomAxios';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;


const CustomChart = (props)=> {
  console.log(props.reports, "props");
  const reports = props.reports;
  const data = [
    { name: 'Voters', value: reports.totalVoters/reports.totalUsers },
    { name: 'Candidates', value: reports.totalCandidates/reports.totalUsers },
    { name: 'Blacklisted Candidates', value: reports.totalBlacklistedCandidates/reports.totalUsers },

  ];

  const RenderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  
    return (
      <div className="w-full flex items-center justify-between">
        <div className="h-full" style={{width: "60%"}} >
        <ResponsiveContainer height="100%" className="w-full " style={{border: "1px solid red",  height: "500px"}}>
        <PieChart width={500} height={400} className="">
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={<RenderCustomizedLabel/>}
            outerRadius={140}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </div>

      <div className="w-1/2 flex flex-col">
        {
          data.map((entry, index) => (
            <div key={`pie-${index}`} className="gap-x-3 my-3 flex items-center w-full border-8" >
              <div style={{width: "20px ", height: "20px",  margin: "10px 10px 10px 0px", marginRight: "10px ", backgroundColor: COLORS[index % COLORS.length] }}>
              </div>
              <h4 className="font-bold">
                {entry.name}
                </h4>  
            </div>
          ))
        }
      </div>
      </div>

    );
}

export default CustomChart;
