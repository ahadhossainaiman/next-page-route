import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IProjectsFilter } from './interfaces';
import { ProjectsServices } from './services';

export const ProjectsHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof ProjectsServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [ProjectsServices.NAME, id],
      queryFn: () => ProjectsServices.findById(id),
    });
  },

  useFind: ({ options, config }: { options: IProjectsFilter; config?: QueryConfig<typeof ProjectsServices.find> }) => {
    return useQuery({
      ...config,
      queryKey: [ProjectsServices.NAME, options],
      queryFn: () => ProjectsServices.find(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof ProjectsServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: ProjectsServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [ProjectsServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof ProjectsServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: ProjectsServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [ProjectsServices.NAME] });
      },
    });
  },

  useFindInvestorsById: ({
    id,
    config,
  }: {
    id: TId;
    config?: QueryConfig<typeof ProjectsServices.findInvestorsById>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [ProjectsServices.NAME, id],
      queryFn: () => ProjectsServices.findInvestorsById(id),
    });
  },

  useCreateShareProfit: ({ config }: { config?: MutationConfig<typeof ProjectsServices.createShareProfit> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: ProjectsServices.createShareProfit,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [ProjectsServices.NAME] });
      },
    });
  },

  useFindProfitSharesById: ({
    id,
    config,
  }: {
    id: TId;
    config?: QueryConfig<typeof ProjectsServices.findProfitSharesById>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [ProjectsServices.NAME, id],
      queryFn: () => ProjectsServices.findProfitSharesById(id),
    });
  },
};
