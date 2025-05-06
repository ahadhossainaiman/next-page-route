import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ITransactionsFilter } from './interfaces';
import { TransactionsServices } from './services';

export const TransactionsHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof TransactionsServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [TransactionsServices.NAME, id],
      queryFn: () => TransactionsServices.findById(id),
    });
  },

  useFind: ({
    options,
    config,
  }: {
    options: ITransactionsFilter;
    config?: QueryConfig<typeof TransactionsServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [TransactionsServices.NAME, options],
      queryFn: () => TransactionsServices.find(options),
    });
  },

  useFindByUser: ({
    id,
    options,
    config,
  }: {
    id: TId;
    options: ITransactionsFilter;
    config?: QueryConfig<typeof TransactionsServices.findByUser>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [TransactionsServices.NAME, id, options],
      queryFn: () => TransactionsServices.findByUser(id, options),
    });
  },

  useFindMy: ({
    options,
    config,
  }: {
    options: ITransactionsFilter;
    config?: QueryConfig<typeof TransactionsServices.findMy>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [TransactionsServices.NAME, options],
      queryFn: () => TransactionsServices.findMy(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof TransactionsServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: TransactionsServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [TransactionsServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof TransactionsServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: TransactionsServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [TransactionsServices.NAME] });
      },
    });
  },
};
