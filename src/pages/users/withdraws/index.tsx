import { HomeOutlined } from '@ant-design/icons';
import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import WithdrawsForm from '@modules/admin/withdraws/components/WithdrawsForm';
import { WithdrawsHooks } from '@modules/admin/withdraws/lib/hooks';
import { IWithdrawsFilter } from '@modules/admin/withdraws/lib/interfaces';
import WithdrawsList from '@modules/users/withdraws/components/WithdrawsList';
import { Breadcrumb, Button, Form, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const WithdrawsPage = () => {
  const router = useRouter();
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IWithdrawsFilter>(router.asPath);
  const [formInstance] = Form.useForm();
  const [messageApi, messageHolder] = message.useMessage();
  const [isModalOpen, setModalOpen] = useState(false);

  const withdrawCreateFn = WithdrawsHooks.useCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setModalOpen(false);
        formInstance.resetFields();
        messageApi.success(res.message);
      },
    },
  });

  const withdrawsQuery = WithdrawsHooks.useFindMy({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  return (
    <PageWrapper>
      {messageHolder}
      <Breadcrumb
        items={[
          {
            title: (
              <Link href={Paths.root}>
                <HomeOutlined />
              </Link>
            ),
          },
          {
            title: <Link href={Paths.users.usersRoot}>Account</Link>,
          },
          {
            title: 'Withdraws',
          },
        ]}
      />
      <h3 className="text-2xl font-bold dark:text-gray-100 mt-4 mb-8">Withdraws</h3>
      <div className="flex flex-wrap gap-4 my-8">
        <Button shape="round" type="primary" className="2xl:ml-auto" onClick={() => setModalOpen(true)}>
          Create Withdraw Request
        </Button>
      </div>
      <WithdrawsList
        isLoading={withdrawsQuery.isLoading}
        data={withdrawsQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: withdrawsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <BaseModalWithoutClicker
        destroyOnClose
        title="Create a withdraw request"
        width={450}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <WithdrawsForm
          form={formInstance}
          isLoading={withdrawCreateFn.isPending}
          onFinish={(values) => withdrawCreateFn.mutate(values)}
        />
      </BaseModalWithoutClicker>
    </PageWrapper>
  );
};

export default WithdrawsPage;
