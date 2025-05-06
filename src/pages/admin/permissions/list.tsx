import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import PermissionsForm from '@modules/admin/permissions/components/PermissionsForm';
import PermissionsList from '@modules/admin/permissions/components/PermissionsList';
import { useCreatePermission, usePermissions } from '@modules/admin/permissions/lib/hooks';
import { IPermissionFilter } from '@modules/admin/permissions/lib/interfaces';
import Authorization from '@modules/auth/components/Authorization';
import { Button, Drawer, Form, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PermissionsPage = () => {
  const [messageApi, messageCtx] = message.useMessage();
  const router = useRouter();
  const [createFormInstance] = Form.useForm();

  const { page = 1, limit = 10, searchTerm } = Toolbox.parseQueryParams<IPermissionFilter>(router.asPath);

  // Permissions query functionalities
  const { isLoading, data } = usePermissions({
    options: {
      page: Number(page),
      limit: Number(limit),
      searchTerm: searchTerm,
    },
  });

  // Permission create functionalities
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const createPermission = useCreatePermission({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        createFormInstance.resetFields();
        messageApi.success(res?.message);
      },
    },
  });

  return (
    <PageWrapper>
      {messageCtx}
      <PageHeader
        title="Permission list"
        tags={[<Tag key="1">Total items: {data?.meta?.total}</Tag>]}
        extra={[
          <Authorization key="1" allowedAccess={['role-manager-permissions:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>,
        ]}
      />
      <PermissionsList
        loading={isLoading}
        data={data?.data}
        pagination={{
          total: data?.meta?.total,
          current: Number(page),
          pageSize: Number(limit),
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer title="Create a new permission" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <PermissionsForm
          form={createFormInstance}
          initialValues={{ isActive: true }}
          loading={createPermission.isPending}
          onFinish={(values) => createPermission.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default PermissionsPage;
