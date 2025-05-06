import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { IUserAncestors } from '@modules/admin/users/lib/interfaces';
import { Empty, Spin, Tree } from 'antd';
import React from 'react';

interface IProps {
  isLoading: boolean;
  ancestors: IUserAncestors;
}

const ReferralsAncestors: React.FC<IProps> = ({ isLoading, ancestors }) => {
  if (isLoading) return <Spin />;
  if (!ancestors?.ancestors?.length) return <Empty description="No ancestors found" />;

  const tree = [
    {
      key: `user-${ancestors?.user?.id}`,
      title: (
        <>
          <UserOutlined style={{ marginRight: 8 }} />
          {ancestors?.user?.name} ({ancestors?.user?.username})
        </>
      ),
      children: ancestors?.ancestors
        ?.map((ancestor) =>
          ancestor?.id && ancestor?.username
            ? {
                key: `ancestor-${ancestor.id}`,
                title: (
                  <>
                    <TeamOutlined style={{ marginRight: 8 }} />
                    {ancestor.username} (ID: {ancestor.id})
                  </>
                ),
              }
            : null,
        )
        .filter(Boolean),
    },
  ];

  return (
    <Tree
      treeData={tree}
      defaultExpandAll
      showLine={{ showLeafIcon: false }}
      rootStyle={{ backgroundColor: 'transparent' }}
    />
  );
};

export default ReferralsAncestors;
