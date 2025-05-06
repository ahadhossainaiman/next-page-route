import { IPermission } from '@modules/admin/permissions/lib/interfaces';
import { Col, Row, Tooltip, message } from 'antd';
import { Checkbox } from 'antd/lib';
import React from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { useRoleAddPermissions, useRoleRemovePermissions } from '../lib/hooks';
import { IRolePermission } from '../lib/interfaces';

interface IProps {
  permissions: IRolePermission[];
  roleId: string;
}

const EditPermissions: React.FC<IProps> = ({ permissions, roleId }) => {
  const [groupTitle, setGroupTitle] = React.useState<string>('');

  const groupByPermissionTitle = (permissions) => {
    return Object?.values(
      permissions.reduce(
        (acc, permission) => {
          const { title } = permission?.permissionType;
          if (!acc[title]) {
            acc[title] = { title, permissions: [] };
          }
          acc[title].permissions.push(permission);
          return acc;
        },
        {} as Record<string, { title: string; permissions: IPermission[] }>,
      ),
    );
  };

  const groupByPermissionType: any = permissions ? groupByPermissionTitle(permissions) : [];

  const addPermissions = useRoleAddPermissions({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        message.success('Added Successfully');
      },
    },
  });

  const removePermissions = useRoleRemovePermissions({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        message.warning('Removed Successfully');
      },
    },
  });

  return (
    <React.Fragment>
      {groupByPermissionType.map((group) => (
        <div key={group?.title} className="mb-[50px]">
          <div className="my-[20px] flex items-center justify-between border-b border-gray-300 text-[20px] font-bold">
            {group?.title}
            <Checkbox
              checked={group?.permissions?.every((item) => item?.isAlreadyAdded)}
              onChange={() => {
                setGroupTitle(group?.title);
                const checkedAll = group?.permissions?.every((item) => item?.isAlreadyAdded || !item?.isActive);

                if (checkedAll) {
                  removePermissions.mutateAsync({
                    id: roleId as string,
                    permissionIds: group?.permissions?.filter((item) => item?.isAlreadyAdded).map((item) => item?.id),
                  });
                  return;
                }
                addPermissions?.mutateAsync({
                  id: roleId as string,
                  permissionIds: group?.permissions
                    ?.filter((item) => !item?.isAlreadyAdded && item?.isActive)
                    .map((item) => item?.id),
                });
              }}
            >
              Select All
            </Checkbox>
          </div>
          <Row gutter={[20, 20]} className="relative">
            {(addPermissions?.isPending || removePermissions?.isPending) && groupTitle === group?.title ? (
              <div className="absolute z-50 flex h-full w-full items-center justify-center bg-gray-100 opacity-50">
                <ImSpinner8 className="animate-spin" size={25} />
              </div>
            ) : null}
            {group?.permissions?.map((item) => (
              <Col lg={8} key={group?.id}>
                <Tooltip title={!item?.isActive ? "This role isn't active now" : null} destroyTooltipOnHide>
                  <Checkbox
                    disabled={!item?.isActive}
                    checked={item?.isAlreadyAdded}
                    onChange={() => {
                      setGroupTitle(group?.title);
                      if (item?.isAlreadyAdded) {
                        removePermissions.mutateAsync({
                          id: roleId as string,
                          permissionIds: [item?.id],
                        });
                        return;
                      }
                      addPermissions?.mutateAsync({ id: roleId as string, permissionIds: [item?.id] });
                    }}
                  >
                    <span className="text-[16px]">{item?.title}</span>
                  </Checkbox>
                </Tooltip>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </React.Fragment>
  );
};

export default EditPermissions;
