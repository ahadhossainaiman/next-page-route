import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { IBaseFilter } from '@base/interfaces';
import { Roles } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import RolesForm from '@modules/admin/roles/components/RolesForm';
import RolesList from '@modules/admin/roles/components/RolesList';
import { useCreateRole, useRoles } from '@modules/admin/roles/lib/hooks';
import { Button, Drawer, Form, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const RolesPage = () => {
  const router = useRouter();
  const [createFormInstance] = Form.useForm();
  const [messageApi, messageCtx] = message.useMessage();

  const { page = 1, limit = 10, searchTerm } = Toolbox.parseQueryParams<IBaseFilter>(router.asPath);

  // Roles query functionalities
  const { isLoading, data } = useRoles({
    options: {
      page: Number(page),
      limit: Number(limit),
      searchTerm: searchTerm,
    },
  });
  const filteredRoles = data?.data?.filter((item) => item?.title !== Roles.SUPER_ADMIN);

  // Role create functionalities
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const createRole = useCreateRole({
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
        title="Role list"
        tags={[<Tag key="1">Total items: {data?.meta?.total}</Tag>]}
        extra={[
          <Button key="1" type="primary" onClick={() => setDrawerOpen(true)}>
            Create
          </Button>,
        ]}
      />
      <RolesList
        loading={isLoading}
        data={filteredRoles}
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

      <Drawer title="Create a new role" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <RolesForm
          form={createFormInstance}
          initialValues={{ isActive: true }}
          loading={createRole.isPending}
          onFinish={(values) => createRole.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default RolesPage;
