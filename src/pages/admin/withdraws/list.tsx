import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import WithdrawsList from '@modules/admin/withdraws/components/WithdrawsList';
import { WithdrawsHooks } from '@modules/admin/withdraws/lib/hooks';
import { IWithdrawsFilter } from '@modules/admin/withdraws/lib/interfaces';
import { Tag } from 'antd';
import { useRouter } from 'next/router';

const WithdrawsPage = () => {
  const router = useRouter();
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IWithdrawsFilter>(router.asPath);

  const withdrawsQuery = WithdrawsHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  return (
    <PageWrapper>
      <PageHeader
        title="User Withdraws"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {withdrawsQuery.data?.meta?.total || 0}</Tag>]}
        // extra={
        //   <Authorization allowedAccess={[]}>
        //     <Button type="primary" onClick={() => setDrawerOpen(true)}>
        //       Create
        //     </Button>
        //   </Authorization>
        // }
      />
      <WithdrawsList
        isLoading={withdrawsQuery.isLoading}
        data={withdrawsQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: withdrawsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
    </PageWrapper>
  );
};

export default WithdrawsPage;
