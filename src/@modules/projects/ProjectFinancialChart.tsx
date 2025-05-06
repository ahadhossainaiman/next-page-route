import { Col, Descriptions, Row, Spin } from 'antd';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  isLoading: boolean;
  data: { BTC: number; BNB: number; USDT: number };
}

const ProjectFinancialChart: React.FC<IProps> = ({ isLoading, data }) => {
  const pieChartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['BTC', 'BNB', 'USDT'],
    colors: ['#F7931A', '#F0B90B', '#26A17B'],
    legend: {
      position: 'bottom',
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => val.toLocaleString(),
      },
    },
  };

  const pieChartSeries = [data.BTC, data.BNB, data.USDT];

  return isLoading ? (
    <Spin />
  ) : (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={10}>
        <ReactApexChart options={pieChartOptions} series={pieChartSeries} type="donut" height={350} />
      </Col>
      <Col xs={24} xl={14}>
        <p className="text-2xl mb-2">
          <span className="font-medium">Asset:</span> $546574 USD
        </p>
        <Descriptions
          size="small"
          column={{ xs: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
          bordered
          labelStyle={{ fontWeight: 600 }}
        >
          <Descriptions.Item label="BTC">38.385</Descriptions.Item>
          <Descriptions.Item label="BNB">38.385</Descriptions.Item>
          <Descriptions.Item label="USDT">38.385</Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  );
};

export default ProjectFinancialChart;
