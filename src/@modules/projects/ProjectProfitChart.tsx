import { Spin } from 'antd';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  isLoading: boolean;
}

const ProjectProfitChart: React.FC<IProps> = ({ isLoading }) => {
  const data = [
    { month: 'January', profitPercentage: 20 },
    { month: 'February', profitPercentage: 50 },
    { month: 'March', profitPercentage: 20 },
    { month: 'April', profitPercentage: 5 },
    { month: 'May', profitPercentage: 9 },
    { month: 'June', profitPercentage: 20 },
    { month: 'July', profitPercentage: 10 },
    { month: 'August', profitPercentage: 25 },
    { month: 'September', profitPercentage: 30 },
    { month: 'October', profitPercentage: 20 },
    { month: 'November', profitPercentage: 30 },
    { month: 'December', profitPercentage: 50 },
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    xaxis: {
      categories: data?.map((data) => data?.month),
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [
      '#008FFB',
      '#00E396',
      '#FEB019',
      '#FF4560',
      '#775DD0',
      '#D7263D',
      '#F46036',
      '#2E294E',
      '#1B998B',
      '#E84855',
      '#F9C80E',
      '#662E9B',
    ],
    tooltip: {
      enabled: true,
      theme: 'dark',
      y: {
        formatter: (val: number) => val.toLocaleString(),
      },
    },
    grid: {
      show: true,
      borderColor: '#E0E6ED',
      strokeDashArray: 2,
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { height: 300 },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: { height: 250 },
        },
      },
    ],
  };

  const chartSeries = [
    {
      name: 'Profit',
      data: data?.map((elem) => elem?.profitPercentage),
    },
  ];

  return isLoading ? (
    <Spin />
  ) : (
    <div className="bg-[var(--color-secondary-bg)] rounded-md p-4">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
    </div>
  );
};

export default ProjectProfitChart;
