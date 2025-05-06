import { HomeOutlined } from '@ant-design/icons';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import TransactionsList from '@modules/users/transactions/components/TransactionsList';
import { TransactionsHooks } from '@modules/users/transactions/lib/hooks';
import { ITransactionsFilter } from '@modules/users/transactions/lib/interfaces';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TransactionsPage = () => {
  const router = useRouter();
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<ITransactionsFilter>(router.asPath);

  const transactionsQuery = TransactionsHooks.useFindMy({
    options: {
      ...rest,
      page,
      limit,
    },
  });

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
            title: 'Transactions',
          },
        ]}
      />
      <h3 className="text-2xl font-bold dark:text-gray-100 mt-4 mb-8">Transactions</h3>
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
