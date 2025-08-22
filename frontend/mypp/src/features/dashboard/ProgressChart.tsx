import React from 'react';
import Chart from 'react-apexcharts';
import { ProgressData } from './types';

interface ProgressChartProps {
  data: ProgressData[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'radar' as const,
      toolbar: {
        show: false,
      },
    },
    colors: ['#3B82F6', '#10B981'],
    labels: data.map((item) => item.skill),
    markers: {
      size: 5,
    },
    xaxis: {
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 5,
      tickAmount: 5,
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.2,
    },
    legend: {
      position: 'bottom' as const,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom' as const,
          },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: 'Current Level',
      data: data.map((item) => item.current_level),
    },
    {
      name: 'Target Level',
      data: data.map((item) => item.target_level),
    },
  ];

  return (
    <div className="bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10 p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold mb-4">Skill Progress</h3>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="radar"
        height={350}
      />
    </div>
  );
};

export default ProgressChart;