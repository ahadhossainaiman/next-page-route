import { HomeOutlined } from '@ant-design/icons';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { IInvestmentsFilter } from '@modules/admin/investments/lib/interfaces';
import InvestmentsList from '@modules/users/investments/components/InvestmentsList';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const InvestmentsPage = () => {
  const router = useRouter();
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IInvestmentsFilter>(router.asPath);

  const investmentsQuery = InvestmentsHooks.useFindMy({
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
            title: 'Investments',
          },
        ]}
      />
      <h3 className="text-2xl font-bold dark:text-gray-100 mt-4 mb-8">Investments</h3>
      <InvestmentsList
        isLoading={investmentsQuery.isLoading}
        data={investmentsQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: investmentsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
    </PageWrapper>
  );
};

export default InvestmentsPage;
