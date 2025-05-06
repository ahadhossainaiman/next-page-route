import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IInvestmentsFilter } from './interfaces';
import { InvestmentsServices } from './services';

export const InvestmentsHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof InvestmentsServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [InvestmentsServices.NAME, id],
      queryFn: () => InvestmentsServices.findById(id),
    });
  },

  useFind: ({
    options,
    config,
  }: {
    options: IInvestmentsFilter;
    config?: QueryConfig<typeof InvestmentsServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [InvestmentsServices.NAME, options],
      queryFn: () => InvestmentsServices.find(options),
    });
  },

  useFindMy: ({
    options,
    config,
  }: {
    options: IInvestmentsFilter;
    config?: QueryConfig<typeof InvestmentsServices.findMy>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [InvestmentsServices.NAME, options],
      queryFn: () => InvestmentsServices.findMy(options),
    });
  },

  useFindPayments: ({
    id,
    options,
    config,
  }: {
    id: TId;
    options: IInvestmentsFilter;
    config?: QueryConfig<typeof InvestmentsServices.findPayments>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [InvestmentsServices.NAME, id, options],
      queryFn: () => InvestmentsServices.findPayments(id, options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof InvestmentsServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: InvestmentsServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [InvestmentsServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof InvestmentsServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: InvestmentsServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [InvestmentsServices.NAME] });
      },
    });
  },

  useCreatePayment: ({ config }: { config?: MutationConfig<typeof InvestmentsServices.createPayment> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: InvestmentsServices.createPayment,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [InvestmentsServices.NAME] });
      },
    });
  },

  useSettlePayment: ({ config }: { config?: MutationConfig<typeof InvestmentsServices.settlePayment> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: InvestmentsServices.settlePayment,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [InvestmentsServices.NAME] });
      },
    });
  },
};
