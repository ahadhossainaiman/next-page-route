import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICategorysFilter } from './interfaces';
import { CategorysServices } from './services';

export const CategorysHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof CategorysServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [CategorysServices.NAME, id],
      queryFn: () => CategorysServices.findById(id),
    });
  },

  useFind: ({ options, config }: { options: ICategorysFilter; config?: QueryConfig<typeof CategorysServices.find> }) => {
    return useQuery({
      ...config,
      queryKey: [CategorysServices.NAME, options],
      queryFn: () => CategorysServices.find(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof CategorysServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: CategorysServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [CategorysServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof CategorysServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: CategorysServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [CategorysServices.NAME] });
      },
    });
  },
};
