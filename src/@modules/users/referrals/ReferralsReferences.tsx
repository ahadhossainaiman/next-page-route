import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Toolbox } from '@lib/utils';
import { Empty, Spin, Tree } from 'antd';
import React from 'react';

interface IUserReference {
  id: number;
  username: string;
}

interface IUserReferences {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
  [key: string]: IUserReference[] | any;
}

interface IProps {
  isLoading: boolean;
  references: IUserReferences;
}

const ReferencesTree: React.FC<IProps> = ({ isLoading, references }) => {
  if (isLoading) return <Spin />;
  if (
    !references ||
    Object.keys(references).length === 0 ||
    (!references.user && Object.keys(references).length <= 1)
  ) {
    return <Empty description="No references found" />;
  }

  const formatGeneration = (generationKey: string, users?: IUserReference[]) =>
    users?.length
      ? {
          key: generationKey,
          title: <strong>{Toolbox.toCapitalizeText(generationKey.replace('_', ' '))}</strong>,
          children: users.map((user) => ({
            key: `user-${user.id}`,
            title: (
              <>
                <TeamOutlined style={{ marginRight: 8 }} />
                {user.username} (ID: {user.id})
              </>
            ),
          })),
        }
      : null;

  const tree = [
    {
      key: `user-${references.user.id}`,
      title: (
        <>
          <UserOutlined style={{ marginRight: 8 }} />
          {references.user.name} ({references.user.username})
        </>
      ),
      children: Object.keys(references)
        .filter((key) => key.startsWith('gen_'))
        .map((genKey) => formatGeneration(genKey, references[genKey]))
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

export default ReferencesTree;
