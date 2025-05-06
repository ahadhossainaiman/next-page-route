import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IPaymentGatewaysFilter } from './interfaces';
import { PaymentGatewaysServices } from './services';

export const PaymentGatewaysHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof PaymentGatewaysServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [PaymentGatewaysServices.NAME, id],
      queryFn: () => PaymentGatewaysServices.findById(id),
    });
  },

  useFind: ({
    options,
    config,
  }: {
    options: IPaymentGatewaysFilter;
    config?: QueryConfig<typeof PaymentGatewaysServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [PaymentGatewaysServices.NAME, options],
      queryFn: () => PaymentGatewaysServices.find(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof PaymentGatewaysServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: PaymentGatewaysServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [PaymentGatewaysServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof PaymentGatewaysServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: PaymentGatewaysServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [PaymentGatewaysServices.NAME] });
      },
    });
  },
};
