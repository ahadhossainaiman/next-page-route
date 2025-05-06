import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { UsersHooks } from '@modules/admin/users/lib/hooks';
import ReferralsAncestors from '@modules/users/referrals/ReferralsAncestors';
import ReferralsReferences from '@modules/users/referrals/ReferralsReferences';
import { Tabs, TabsProps } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ReferralsPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();
  const { userId } = router.query;

  const referencesQuery = UsersHooks.useReferences({
    id: +userId,
    config: { queryKey: [], enabled: activeTab === 1 && !!userId },
  });

  const ancestorsQuery = UsersHooks.useAncestors({
    id: +userId,
    config: { queryKey: [], enabled: activeTab === 2 && !!userId },
  });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'References',
      children: (
        <ReferralsReferences isLoading={referencesQuery.isLoading} references={referencesQuery.data?.data as any} />
      ),
    },
    {
      key: '2',
      label: 'Ancestors',
      children: <ReferralsAncestors isLoading={referencesQuery.isLoading} ancestors={ancestorsQuery.data?.data} />,
    },
  ];

  const userQuery = UsersHooks.useFindById({
    id: userId as string,
    config: {
      queryKey: [],
      enabled: !!userId,
    },
  });

  return (
    <PageWrapper>
      <PageHeader
        title={
          userQuery.data?.success && (
            <p>
              Manage Referrals for <span className="text-yellow-600">{userQuery.data?.data?.name}</span>
            </p>
          )
        }
        onBack={router.back}
      />

      <Tabs defaultActiveKey="1" items={items} onChange={(activeKey) => setActiveTab(+activeKey)} />
    </PageWrapper>
  );
};

export default ReferralsPage;
