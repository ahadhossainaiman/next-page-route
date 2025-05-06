import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import PaymentGatewaysForm from '@modules/admin/payment-gateways/components/PaymentGatewaysForm';
import PaymentGatewaysList from '@modules/admin/payment-gateways/components/PaymentGatewaysList';
import { PaymentGatewaysHooks } from '@modules/admin/payment-gateways/lib/hooks';
import { IPaymentGatewaysFilter } from '@modules/admin/payment-gateways/lib/interfaces';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PaymentGatewaysPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IPaymentGatewaysFilter>(router.asPath);

  const paymentGatewaysQuery = PaymentGatewaysHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const paymentGatewayCreateFn = PaymentGatewaysHooks.useCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setDrawerOpen(false);
        formInstance.resetFields();
        messageApi.success(res.message);
      },
    },
  });

  return (
    <PageWrapper>
      {messageHolder}
      <PageHeader
        title="PaymentGateways"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {paymentGatewaysQuery.data?.meta?.total || 0}</Tag>]}
        extra={
          <Authorization allowedAccess={['payment-gateways:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>
        }
      />
      <PaymentGatewaysList
        isLoading={paymentGatewaysQuery.isLoading}
        data={paymentGatewaysQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: paymentGatewaysQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer width={640} title="Create a new payment gateway" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <PaymentGatewaysForm
          form={formInstance}
          initialValues={{ isActive: true }}
          isLoading={paymentGatewayCreateFn.isPending}
          onFinish={(values) => paymentGatewayCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(PaymentGatewaysPage, { allowedAccess: ['payment-gateways:read'] });
