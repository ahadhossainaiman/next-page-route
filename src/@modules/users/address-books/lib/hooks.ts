import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IAddressBooksFilter } from './interfaces';
import { AddressBooksServices } from './services';

export const AddressBooksHooks = {
  useFind: ({
    id,
    options,
    config,
  }: {
    id: TId;
    options: IAddressBooksFilter;
    config?: QueryConfig<typeof AddressBooksServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [AddressBooksServices.NAME, id, options],
      queryFn: () => AddressBooksServices.find(id, options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof AddressBooksServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AddressBooksServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [AddressBooksServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof AddressBooksServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AddressBooksServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [AddressBooksServices.NAME] });
      },
    });
  },

  useDelete: ({ config }: { config?: MutationConfig<typeof AddressBooksServices.delete> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AddressBooksServices.delete,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [AddressBooksServices.NAME] });
      },
    });
  },
};
