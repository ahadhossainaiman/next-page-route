import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import CurrenciesForm from '@modules/admin/currencies/components/CurrenciesForm';
import CurrenciesList from '@modules/admin/currencies/components/CurrenciesList';
import { CurrenciesHooks } from '@modules/admin/currencies/lib/hooks';
import { ICurrenciesFilter } from '@modules/admin/currencies/lib/interfaces';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CurrenciesPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<ICurrenciesFilter>(router.asPath);

  const currenciesQuery = CurrenciesHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const currencyCreateFn = CurrenciesHooks.useCreate({
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
        title="Currencies"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {currenciesQuery.data?.meta?.total || 0}</Tag>]}
        extra={
          <Authorization allowedAccess={['currencies:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>
        }
      />
      <CurrenciesList
        isLoading={currenciesQuery.isLoading}
        data={currenciesQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: currenciesQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer width={640} title="Create a new currency" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <CurrenciesForm
          form={formInstance}
          initialValues={{ isActive: true }}
          isLoading={currencyCreateFn.isPending}
          onFinish={(values) => currencyCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(CurrenciesPage, { allowedAccess: ['currencies:read'] });
