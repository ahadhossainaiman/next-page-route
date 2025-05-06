import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import TransactionsList from '@modules/users/transactions/components/TransactionsList';
import { TransactionsHooks } from '@modules/users/transactions/lib/hooks';
import { ITransactionsFilter } from '@modules/users/transactions/lib/interfaces';
import { Tag } from 'antd';
import { useRouter } from 'next/router';

const TransactionsPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<ITransactionsFilter>(router.asPath);

  const transactionsQuery = TransactionsHooks.useFindByUser({
    id: userId as string,
    options: {
      ...rest,
      page,
      limit,
    },
    config: {
      queryKey: [],
      enabled: !!userId,
    },
  });

  return (
    <PageWrapper>
      <PageHeader
        title="User Transactions"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {transactionsQuery.data?.meta?.total || 0}</Tag>]}
        onBack={router.back}
        // extra={
        //   <Authorization allowedAccess={[]}>
        //     <Button type="primary" onClick={() => setDrawerOpen(true)}>
        //       Create
        //     </Button>
        //   </Authorization>
        // }
      />
      <TransactionsList
        isLoading={transactionsQuery.isLoading}
        data={transactionsQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: transactionsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
    </PageWrapper>
  );
};

export default TransactionsPage;
