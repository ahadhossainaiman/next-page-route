import PageHeader from '@base/components/PageHeader';
import { IBaseFilter } from '@base/interfaces';
import { Toolbox } from '@lib/utils';
import EditPaymentGateways from '@modules/admin/countries/components/EditPaymentGateways';
import { CountriesHooks } from '@modules/admin/countries/lib/hooks';
import { useRouter } from 'next/router';
import React from 'react';

const PaymentGatewayPage = () => {
  const router = useRouter();
  const { pgId } = router.query;
  const { searchTerm } = Toolbox.parseQueryParams<IBaseFilter>(router.asPath);

  const paymentGatewaysQuery = CountriesHooks.useFindPaymentGateways({
    id: pgId as string,
    config: {
      queryKey: [],
      enabled: !!pgId,
    },
    options: {
      page: 1,
      limit: 300,
      searchTerm,
    },
  });

  const countryQuery = CountriesHooks.useFindById({
    id: pgId as string,
    config: {
      queryKey: [],
      enabled: !!pgId,
    },
  });

  return (
    <React.Fragment>
      <PageHeader
        title={
          countryQuery.data?.success && (
            <p>
              Manage Payment Gateways for <span className="text-yellow-600">{countryQuery.data?.data?.title}</span>
            </p>
          )
        }
        onBack={router.back}
      />
      <EditPaymentGateways data={paymentGatewaysQuery.data?.data} pgId={pgId?.toString()} />
    </React.Fragment>
  );
};

export default PaymentGatewayPage;
