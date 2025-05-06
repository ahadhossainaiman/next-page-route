import CustomSwitch from '@base/components/CustomSwitch';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { getAccess } from '@modules/auth/lib/utils';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Drawer, Form, Space, Table, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { CountriesHooks } from '../lib/hooks';
import { ICountry } from '../lib/interfaces';
import CountriesFilter from './CountriesFilter';
import CountriesForm from './CountriesForm';

interface IProps {
  isLoading: boolean;
  data: ICountry[];
  pagination: PaginationProps;
}

const CountriesList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [updateItem, setUpdateItem] = useState<ICountry>(null);

  const countryUpdateFn = CountriesHooks.useUpdate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setUpdateItem(null);
        messageApi.success(res.message);
      },
    },
  });

  const dataSource = data?.map((elem) => ({
    key: elem?.id,
    id: elem?.id,
    name: elem?.title,
    isActive: elem?.isActive,
    createdAt: elem?.createdAt,
    createdBy: elem?.createdBy?.name,
    updatedAt: elem?.updatedAt,
    updatedBy: elem?.updatedBy?.name,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'isActive',
      dataIndex: 'isActive',
      title: 'Active',
      render: (isActive, record) => {
        return (
          <CustomSwitch
            checked={isActive}
            onChange={(checked) => {
              getAccess(['countries:update'], () => {
                countryUpdateFn.mutate({
                  id: record?.id,
                  data: {
                    isActive: checked,
                  },
                });
              });
            }}
          />
        );
      },
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Action',
      align: 'center',
      render: (id) => (
        <Space>
          <Button
            onClick={() => {
              getAccess(['countries:update'], () => {
                const item = data?.find((item) => item.id === id);
                setUpdateItem(item);
              });
            }}
          >
            <AiFillEdit />
          </Button>
          <Link href={Paths.admin.countries.editPaymentGateways(id)}>
            <Button className="flex items-center justify-center gap-1" icon={<FaEdit size={16} />}>
              Edit Payment Gateway
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <CountriesFilter
        initialValues={Toolbox.toCleanObject(router.query)}
        onChange={(values) => {
          router.push({
            query: Toolbox.toCleanObject({ ...router.query, ...values }),
          });
        }}
      />
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        scroll={{ x: true }}
      />
      <Drawer
        width={640}
        title={`Update ${updateItem?.title}`}
        open={!!updateItem?.id}
        onClose={() => setUpdateItem(null)}
      >
        <CountriesForm
          formType="update"
          form={formInstance}
          initialValues={updateItem}
          isLoading={countryUpdateFn.isPending}
          onFinish={(values) =>
            countryUpdateFn.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default CountriesList;
