import { HomeOutlined } from '@ant-design/icons';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import { UsersHooks } from '@modules/admin/users/lib/hooks';
import ReferralsAncestors from '@modules/users/referrals/ReferralsAncestors';
import ReferralsReferences from '@modules/users/referrals/ReferralsReferences';
import { Breadcrumb, Tabs, TabsProps } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const ReferralsPage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const referencesQuery = UsersHooks.useMyReferences({ config: { queryKey: [], enabled: activeTab === 2 } });

  const ancestorsQuery = UsersHooks.useMyAncestors({ config: { queryKey: [], enabled: activeTab === 1 } });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Ancestors',
      children: <ReferralsAncestors isLoading={ancestorsQuery.isLoading} ancestors={ancestorsQuery.data?.data} />,
    },
    {
      key: '2',
      label: 'References',
      children: (
        <ReferralsReferences isLoading={referencesQuery.isLoading} references={referencesQuery.data?.data as any} />
      ),
    },
  ];

  return (
    <PageWrapper>
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
            title: 'Referrals',
          },
        ]}
      />
      <h3 className="text-2xl font-bold dark:text-gray-100 mt-4 mb-8">Referrals</h3>
      <Tabs defaultActiveKey="1" items={items} onChange={(activeKey) => setActiveTab(+activeKey)} />
    </PageWrapper>
  );
};

export default ReferralsPage;
