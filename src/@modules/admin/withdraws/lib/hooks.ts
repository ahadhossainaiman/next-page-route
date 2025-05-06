import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IWithdrawsFilter } from './interfaces';
import { WithdrawsServices } from './services';

export const WithdrawsHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof WithdrawsServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [WithdrawsServices.NAME, id],
      queryFn: () => WithdrawsServices.findById(id),
    });
  },

  useFind: ({
    options,
    config,
  }: {
    options: IWithdrawsFilter;
    config?: QueryConfig<typeof WithdrawsServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [WithdrawsServices.NAME, options],
      queryFn: () => WithdrawsServices.find(options),
    });
  },

  useFindMy: ({
    options,
    config,
  }: {
    options: IWithdrawsFilter;
    config?: QueryConfig<typeof WithdrawsServices.findMy>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [WithdrawsServices.NAME, options],
      queryFn: () => WithdrawsServices.findMy(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof WithdrawsServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: WithdrawsServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [WithdrawsServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof WithdrawsServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: WithdrawsServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [WithdrawsServices.NAME] });
      },
    });
  },
};
