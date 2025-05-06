import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { IBaseFilter } from '@base/interfaces';
import { Toolbox } from '@lib/utils';
import PermissionTypesForm from '@modules/admin/permission-types/components/PermissionTypesForm';
import PermissionTypesList from '@modules/admin/permission-types/components/PermissionTypesList';
import { useCreatePermissionType, usePermissionTypes } from '@modules/admin/permission-types/lib/hooks';
import Authorization from '@modules/auth/components/Authorization';
import { Button, Drawer, Form, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PermissionTypesPage = () => {
  const router = useRouter();
  const [createFormInstance] = Form.useForm();
  const [messageApi, messageCtx] = message.useMessage();

  const { page = 1, limit = 10, searchTerm } = Toolbox.parseQueryParams<IBaseFilter>(router.asPath);

  // PermissionTypes query functionalities
  const { isLoading, data } = usePermissionTypes({
    options: {
      page: Number(page),
      limit: Number(limit),
      searchTerm,
    },
  });

  // PermissionType create functionalities
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const createPermissionType = useCreatePermissionType({
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
        title="Permission type list"
        tags={[<Tag key="1">Total items: {data?.meta?.total}</Tag>]}
        extra={[
          <Authorization key="1" allowedAccess={['role-manager-permission-types:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>,
        ]}
      />
      <PermissionTypesList
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
      <Drawer title="Create a new permission type" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <PermissionTypesForm
          form={createFormInstance}
          initialValues={{ isActive: true }}
          loading={createPermissionType.isPending}
          onFinish={(values) => createPermissionType.mutateAsync(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default PermissionTypesPage;
