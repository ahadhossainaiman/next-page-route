import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import CountriesForm from '@modules/admin/countries/components/CountriesForm';
import CountriesList from '@modules/admin/countries/components/CountriesList';
import { CountriesHooks } from '@modules/admin/countries/lib/hooks';
import { ICountriesFilter } from '@modules/admin/countries/lib/interfaces';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const CountriesPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<ICountriesFilter>(router.asPath);

  const countriesQuery = CountriesHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const countryCreateFn = CountriesHooks.useCreate({
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
        title="Countries"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {countriesQuery.data?.meta?.total || 0}</Tag>]}
        extra={
          <Authorization allowedAccess={['countries:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>
        }
      />
      <CountriesList
        isLoading={countriesQuery.isLoading}
        data={countriesQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: countriesQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer width={640} title="Create a new country" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <CountriesForm
          form={formInstance}
          initialValues={{ orderPriority: 0, isActive: true }}
          isLoading={countryCreateFn.isPending}
          onFinish={(values) => countryCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(CountriesPage, { allowedAccess: ['countries:read'] });
