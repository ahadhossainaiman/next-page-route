import PageHeader from '@base/components/PageHeader';
import { Toolbox } from '@lib/utils';
import InvestmentsSettleForm from '@modules/admin/investments/components/InvestmentsSettleForm';
import { ENUM_PAYMENT_STATUSES } from '@modules/admin/investments/lib/enums';
import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { IInvestmentPayment } from '@modules/admin/investments/lib/interfaces';
import { getAccess } from '@modules/auth/lib/utils';
import { Button, Drawer, Form, Image, message, Table, TableColumnsType, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const InvestmentPaymentsPage = () => {
  const router = useRouter();
  const { investmentId, page = 1, limit = 10 } = router.query;
  const [messageApi, messageHolder] = message.useMessage();
  const [settleFormInstance] = Form.useForm();
  const [settleItem, setSettleItem] = useState<IInvestmentPayment>(null);

  const statusColors = {
    [ENUM_PAYMENT_STATUSES.Pending]: 'orange',
    [ENUM_PAYMENT_STATUSES.Approved]: 'green',
    [ENUM_PAYMENT_STATUSES.Declined]: 'red',
  };

  const paymentsQuery = InvestmentsHooks.useFindPayments({
    id: +investmentId,
    options: {
      page: +page,
      limit: +limit,
    },
  });

  const investmentSettleFn = InvestmentsHooks.useSettlePayment({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setSettleItem(null);
        messageApi.success(res.message);
      },
    },
  });

  const dataSource = paymentsQuery.data?.data?.map((elem) => ({
    ...elem,
    key: elem?.id,
    id: elem?.id,
    depositAddress: elem?.depositAddress,
    status: elem?.status,
    user: elem?.user,
    isActive: elem?.isActive,
    createdAt: elem?.createdAt,
    createdBy: elem?.createdBy?.name,
    updatedAt: elem?.updatedAt,
    updatedBy: elem?.updatedBy?.name,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      key: 'transferProof',
      dataIndex: 'transferProof',
      title: 'Transfer Proof',
      render: (content) => <Image src={content} alt="" className="!h-16 !w-16" />,
    },
    {
      key: 'name',
      dataIndex: ['user', 'username'],
      title: 'Username',
    },
    {
      key: 'depositAddress',
      dataIndex: 'depositAddress',
      title: 'Wallet',
      render: (wallet, record) => (
        <div className="flex flex-col gap-0.5">
          <p>{record?.userWallet?.address}</p> {`->`} <p>{wallet}</p>
        </div>
      ),
    },
    {
      key: 'investmentAmount',
      dataIndex: 'investmentAmount',
      title: 'Investment',
    },
    {
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: 'Currency Unit',
      dataIndex: 'currencyUnit',
      key: 'currencyUnit',
    },
    {
      key: 'payment Status',
      dataIndex: 'status',
      title: 'status',
      render: (status) => (
        <Tag className="me-0" color={statusColors[status] || 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Action',
      align: 'center',
      render: (id, record) => {
        return (
          <Button
            disabled={[ENUM_PAYMENT_STATUSES.Approved, ENUM_PAYMENT_STATUSES.Declined].includes(record?.status as any)}
            onClick={() => {
              getAccess(['investments:update'], () => {
                const item = paymentsQuery.data?.data?.find((item) => item.id === id);
                setSettleItem(item);
              });
            }}
          >
            Settle
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {messageHolder}
      <PageHeader onBack={router.back} title="Payments" />
      <Table
        loading={paymentsQuery.isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: +page,
          pageSize: +limit,
          total: paymentsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
        scroll={{ x: true }}
      />
      <Drawer
        width={640}
        title={`Update ${settleItem?.user?.name} Payment`}
        open={!!settleItem?.id}
        onClose={() => setSettleItem(null)}
      >
        <InvestmentsSettleForm
          formType="update"
          form={settleFormInstance}
          initialValues={settleItem as any}
          isLoading={investmentSettleFn.isPending}
          onFinish={(values) => investmentSettleFn.mutate({ ...values, payment: settleItem?.id })}
        />
      </Drawer>
    </>
  );
};

export default InvestmentPaymentsPage;
