import { IBaseFilter, TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICountriesFilter } from './interfaces';
import { CountriesServices } from './services';

export const CountriesHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof CountriesServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [CountriesServices.NAME, id],
      queryFn: () => CountriesServices.findById(id),
    });
  },

  useFind: ({
    options,
    config,
  }: {
    options: ICountriesFilter;
    config?: QueryConfig<typeof CountriesServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [CountriesServices.NAME, options],
      queryFn: () => CountriesServices.find(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof CountriesServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: CountriesServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [CountriesServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof CountriesServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: CountriesServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [CountriesServices.NAME] });
      },
    });
  },

  useFindPaymentGateways: ({
    id,
    options,
    config,
  }: {
    id: TId;
    options: IBaseFilter;
    config?: QueryConfig<typeof CountriesServices.availablePaymentGateways>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [CountriesServices.NAME, id, options],
      queryFn: () => CountriesServices.availablePaymentGateways(id, options),
    });
  },

  useAddPaymentGateways: ({
    config,
  }: { config?: MutationConfig<typeof CountriesServices.addPaymentGateways> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: CountriesServices.addPaymentGateways,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [CountriesServices.NAME] });
      },
    });
  },

  useRemovePaymentGateways: ({
    config,
  }: { config?: MutationConfig<typeof CountriesServices.removePaymentGateways> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: CountriesServices.removePaymentGateways,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [CountriesServices.NAME] });
      },
    });
  },
};
