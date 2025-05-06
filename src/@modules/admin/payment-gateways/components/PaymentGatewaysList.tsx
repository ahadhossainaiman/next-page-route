import CustomSwitch from '@base/components/CustomSwitch';
import { Toolbox } from '@lib/utils';
import { getAccess } from '@modules/auth/lib/utils';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Drawer, Form, Space, Table, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { PaymentGatewaysHooks } from '../lib/hooks';
import { IPaymentGateway } from '../lib/interfaces';
import PaymentGatewaysFilter from './PaymentGatewaysFilter';
import PaymentGatewaysForm from './PaymentGatewaysForm';

interface IProps {
  isLoading: boolean;
  data: IPaymentGateway[];
  pagination: PaginationProps;
}

const PaymentGatewaysList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [updateItem, setUpdateItem] = useState<IPaymentGateway>(null);

  const paymentGatewayUpdateFn = PaymentGatewaysHooks.useUpdate({
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
              getAccess(['payment-gateways:update'], () => {
                paymentGatewayUpdateFn.mutate({
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
              getAccess(['payment-gateways:update'], () => {
                const item = data?.find((item) => item.id === id);
                setUpdateItem(item);
              });
            }}
          >
            <AiFillEdit />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <PaymentGatewaysFilter
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
        <PaymentGatewaysForm
          formType="update"
          form={formInstance}
          initialValues={updateItem}
          isLoading={paymentGatewayUpdateFn.isPending}
          onFinish={(values) =>
            paymentGatewayUpdateFn.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default PaymentGatewaysList;
