import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import UsersForm from '@modules/admin/users/components/UsersForm';
import UsersList from '@modules/admin/users/components/UsersList';
import { UsersHooks } from '@modules/admin/users/lib/hooks';
import { IUsersFilter } from '@modules/admin/users/lib/interfaces';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UsersPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IUsersFilter>(router.asPath);

  const usersQuery = UsersHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
      type: 'Internal',
    },
  });

  const userCreateFn = UsersHooks.useCreate({
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
        title="Users"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {usersQuery.data?.meta?.total || 0}</Tag>]}
        extra={
          <Authorization allowedAccess={['users:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>
        }
      />
      <UsersList
        isLoading={usersQuery.isLoading}
        data={usersQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: usersQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer width={640} title="Create a new user" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <UsersForm
          form={formInstance}
          initialValues={{ isActive: true }}
          isLoading={userCreateFn.isPending}
          onFinish={(values) => userCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(UsersPage, { allowedAccess: ['users:read'] });
