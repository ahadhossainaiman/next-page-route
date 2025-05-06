import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import FaqsForm from '@modules/admin/faqs/components/FaqsForm';
import FaqsList from '@modules/admin/faqs/components/FaqsList';
import { FaqsHooks } from '@modules/admin/faqs/lib/hooks';
import { IFaqsFilter } from '@modules/admin/faqs/lib/interfaces';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const FaqsPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IFaqsFilter>(router.asPath);

  const faqsQuery = FaqsHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const faqCategoryCreateFn = FaqsHooks.useCreate({
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
        title="Faqs"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {faqsQuery.data?.meta?.total || 0}</Tag>]}
        extra={
          <Authorization allowedAccess={['faqs:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>
        }
      />
      <FaqsList
        isLoading={faqsQuery.isLoading}
        data={faqsQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: faqsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer width={640} title="Create a new faq" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <FaqsForm
          form={formInstance}
          initialValues={{ orderPriority: 0, isActive: true }}
          isLoading={faqCategoryCreateFn.isPending}
          onFinish={(values) => faqCategoryCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(FaqsPage, { allowedAccess: ['faqs:read'] });
