import PageHeader from '@base/components/PageHeader';
import { IBaseFilter } from '@base/interfaces';
import { Toolbox } from '@lib/utils';
import EditPermissions from '@modules/admin/roles/components/EditPermissions';
import { useRole, useRolePermissions } from '@modules/admin/roles/lib/hooks';
import { useRouter } from 'next/router';

const RolePage = () => {
  const router = useRouter();
  const { roleId } = router.query;
  const { searchTerm } = Toolbox.parseQueryParams<IBaseFilter>(router.asPath);

  const permissions = useRolePermissions({
    id: roleId as string,
    config: {
      queryKey: [],
      enabled: !!roleId,
    },
    options: {
      page: 1,
      limit: 300,
      searchTerm,
    },
  });

  const roleQuery = useRole({
    id: roleId as string,
    config: {
      queryKey: [],
      enabled: !!roleId,
    },
  });

  return (
    <div>
      <PageHeader
        title={
          roleQuery?.data?.success && (
            <p>
              Manage Permissions for <span className="text-yellow-600">{roleQuery?.data?.data?.title}</span>
            </p>
          )
        }
        onBack={router.back}
      />

      <EditPermissions permissions={permissions?.data?.data} roleId={roleId?.toString()} />
    </div>
  );
};

export default RolePage;
