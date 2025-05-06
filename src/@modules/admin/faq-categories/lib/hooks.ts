import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IFaqCategoriesFilter } from './interfaces';
import { FaqCategoriesServices } from './services';

export const FaqCategoriesHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof FaqCategoriesServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [FaqCategoriesServices.NAME, id],
      queryFn: () => FaqCategoriesServices.findById(id),
    });
  },

  useFind: ({
    options,
    config,
  }: {
    options: IFaqCategoriesFilter;
    config?: QueryConfig<typeof FaqCategoriesServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [FaqCategoriesServices.NAME, options],
      queryFn: () => FaqCategoriesServices.find(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof FaqCategoriesServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: FaqCategoriesServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [FaqCategoriesServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof FaqCategoriesServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: FaqCategoriesServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [FaqCategoriesServices.NAME] });
      },
    });
  },
};
