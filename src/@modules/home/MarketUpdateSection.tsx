import SectionIntro from '@base/components/SectionIntro';
import { cn } from '@lib/utils';
import { CurrenciesHooks } from '@modules/admin/currencies/lib/hooks';
import { Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaChartLine, FaCoins, FaOilCan } from 'react-icons/fa';
import { SiBinance, SiBitcoin, SiEthereum } from 'react-icons/si';

interface DataType {
  key: string;
  name: string;
  price: number;
}

interface IProps {
  className?: string;
}

const currencyIcons: { [key: string]: React.ReactNode } = {
  BTC: <SiBitcoin className="text-yellow-500" size={20} />,
  ETH: <SiEthereum className="text-blue-500" size={20} />,
  BNB: <SiBinance className="text-yellow-400" size={20} />,
  WTI: <FaOilCan className="text-black" size={20} />,
  XAU: <FaCoins className="text-yellow-600" size={20} />,
  US30: <FaChartLine className="text-green-500" size={20} />,
};

const STORAGE_KEY = 'market_data';
const EXPIRATION_TIME = 3 * 60 * 60 * 1000;

const MarketUpdateSection: React.FC<IProps> = ({ className }) => {
  const [marketData, setMarketData] = useState<DataType[]>([]);
  const marketDataQueryFn = CurrenciesHooks.useFindMarketData();

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (storedData && JSON.parse(storedData)?.data?.length) {
      const { data, timestamp } = JSON.parse(storedData);
      if (now - timestamp < EXPIRATION_TIME) {
        setMarketData(data);
        return;
      }
    }

    if (marketDataQueryFn.data?.data) {
      const newData: DataType[] = Object.entries(marketDataQueryFn.data.data).map(([pair, info], index) => {
        const [name] = pair.split('/');
        return {
          key: String(index + 1),
          name,
          price: parseFloat(info.price),
        };
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: newData, timestamp: now }));
      setMarketData(newData);
    }
  }, [marketDataQueryFn.data?.data]);

  const columns: TableProps<DataType>['columns'] = [
    {
      key: 'icon',
      title: '#',
      align: 'center',
      render: (_, record) => (
        <div className="flex justify-center">
          {currencyIcons[record.name] || <FaChartLine className="text-gray-500" size={20} />}
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      align: 'center',
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Price',
      render: (price) => `$${price.toLocaleString()}`,
      align: 'center',
    },
  ];

  return (
    <section className={cn('market_update_section', className)}>
      <div className="container">
        <SectionIntro className="text-center mb-16" titlePrefix="Market" title="Update" isTitleShape />
        <Table columns={columns} dataSource={marketData} pagination={false} scroll={{ x: 'auto' }} />
      </div>
    </section>
  );
};

export default MarketUpdateSection;
