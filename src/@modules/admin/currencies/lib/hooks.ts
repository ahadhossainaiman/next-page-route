import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICurrenciesFilter } from './interfaces';
import { CurrenciesServices } from './services';

export const CurrenciesHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof CurrenciesServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [CurrenciesServices.NAME, id],
      queryFn: () => CurrenciesServices.findById(id),
    });
  },

  useFind: ({
    options,
    config,
  }: {
    options: ICurrenciesFilter;
    config?: QueryConfig<typeof CurrenciesServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [CurrenciesServices.NAME, options],
      queryFn: () => CurrenciesServices.find(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof CurrenciesServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: CurrenciesServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [CurrenciesServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof CurrenciesServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: CurrenciesServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [CurrenciesServices.NAME] });
      },
    });
  },

  useFindMarketData: ({ config }: { config?: QueryConfig<typeof CurrenciesServices.findMarketData> } = {}) => {
    return useQuery({
      ...config,
      queryKey: [CurrenciesServices.NAME],
      queryFn: CurrenciesServices.findMarketData,
    });
  },
};
