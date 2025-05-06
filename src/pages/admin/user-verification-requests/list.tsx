import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import UserVerificationRequestsForm from '@modules/admin/user-verification-requests/components/UserVerificationRequestsForm';
import UserVerificationRequestsList from '@modules/admin/user-verification-requests/components/UserVerificationRequestsList';
import { UserVerificationRequestsHooks } from '@modules/admin/user-verification-requests/lib/hooks';
import { IUserVerificationRequestsFilter } from '@modules/admin/user-verification-requests/lib/interfaces';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UserVerificationRequestsPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IUserVerificationRequestsFilter>(router.asPath);

  const userVerificationRequestsQuery = UserVerificationRequestsHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const userVerificationRequestCreateFn = UserVerificationRequestsHooks.useCreate({
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
        title="User Verification Requests"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {userVerificationRequestsQuery.data?.meta?.total || 0}</Tag>]}
        // extra={
        //   <Authorization allowedAccess={['user-verification-requests:write']}>
        //     <Button type="primary" onClick={() => setDrawerOpen(true)}>
        //       Create
        //     </Button>
        //   </Authorization>
        // }
      />
      <UserVerificationRequestsList
        isLoading={userVerificationRequestsQuery.isLoading}
        data={userVerificationRequestsQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: userVerificationRequestsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer
        width={640}
        title="Create a new user verification request"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <UserVerificationRequestsForm
          form={formInstance}
          initialValues={{ isActive: true }}
          isLoading={userVerificationRequestCreateFn.isPending}
          onFinish={(values) => userVerificationRequestCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(UserVerificationRequestsPage, { allowedAccess: ['user-verification-requests:read'] });
