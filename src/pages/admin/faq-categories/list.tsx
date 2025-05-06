import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import FaqCategoriesForm from '@modules/admin/faq-categories/components/FaqCategoriesForm';
import FaqCategoriesList from '@modules/admin/faq-categories/components/FaqCategoriesList';
import { FaqCategoriesHooks } from '@modules/admin/faq-categories/lib/hooks';
import { IFaqCategoriesFilter } from '@modules/admin/faq-categories/lib/interfaces';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const FaqCategoriesPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IFaqCategoriesFilter>(router.asPath);

  const faqCategoriesQuery = FaqCategoriesHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const faqCategoryCreateFn = FaqCategoriesHooks.useCreate({
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
        title="FaqCategories"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {faqCategoriesQuery.data?.meta?.total || 0}</Tag>]}
        extra={
          <Authorization allowedAccess={['faq-categories:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>
        }
      />
      <FaqCategoriesList
        isLoading={faqCategoriesQuery.isLoading}
        data={faqCategoriesQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: faqCategoriesQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer width={640} title="Create a new faq category" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <FaqCategoriesForm
          form={formInstance}
          initialValues={{ isActive: true }}
          isLoading={faqCategoryCreateFn.isPending}
          onFinish={(values) => faqCategoryCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(FaqCategoriesPage, { allowedAccess: ['faq-categories:read'] });
