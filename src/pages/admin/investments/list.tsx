import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import InvestmentsForm from '@modules/admin/investments/components/InvestmentsForm';
import InvestmentsList from '@modules/admin/investments/components/InvestmentsList';
import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { IInvestmentsFilter } from '@modules/admin/investments/lib/interfaces';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const InvestmentsPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IInvestmentsFilter>(router.asPath);

  const investmentsQuery = InvestmentsHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const investmentCreateFn = InvestmentsHooks.useCreate({
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
        title="Investments"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {investmentsQuery.data?.meta?.total || 0}</Tag>]}
        // extra={
        //   <Authorization allowedAccess={['investments:write']}>
        //     <Button type="primary" onClick={() => setDrawerOpen(true)}>
        //       Create
        //     </Button>
        //   </Authorization>
        // }
      />
      <InvestmentsList
        isLoading={investmentsQuery.isLoading}
        data={investmentsQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: investmentsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer width={640} title="Create a new investment" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <InvestmentsForm
          form={formInstance}
          isLoading={investmentCreateFn.isPending}
          onFinish={(values) => investmentCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(InvestmentsPage, { allowedAccess: ['investments:read'] });
