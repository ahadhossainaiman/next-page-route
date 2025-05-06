import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUsersFilter } from './interfaces';
import { UsersServices } from './services';

export const UsersHooks = {
  useFindById: ({ id, config }: { id: TId; config?: QueryConfig<typeof UsersServices.findById> }) => {
    return useQuery({
      ...config,
      queryKey: [UsersServices.NAME, id, 'id'],
      queryFn: () => UsersServices.findById(id),
    });
  },

  useFind: ({ options, config }: { options: IUsersFilter; config?: QueryConfig<typeof UsersServices.find> }) => {
    return useQuery({
      ...config,
      queryKey: [UsersServices.NAME, options],
      queryFn: () => UsersServices.find(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof UsersServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: UsersServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [UsersServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof UsersServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: UsersServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [UsersServices.NAME] });
      },
    });
  },

  useReferences: ({ id, config }: { id: TId; config?: QueryConfig<typeof UsersServices.references> }) => {
    return useQuery({
      ...config,
      queryKey: [UsersServices.NAME, id, 'references'],
      queryFn: () => UsersServices.references(id),
    });
  },

  useAncestors: ({ id, config }: { id: TId; config?: QueryConfig<typeof UsersServices.ancestors> }) => {
    return useQuery({
      ...config,
      queryKey: [UsersServices.NAME, id, 'ancestors'],
      queryFn: () => UsersServices.ancestors(id),
    });
  },

  useMyProfile: ({ config }: { config?: QueryConfig<typeof UsersServices.myProfile> } = {}) => {
    return useQuery({
      ...config,
      queryKey: [UsersServices.NAME, 'profile'],
      queryFn: UsersServices.myProfile,
    });
  },

  useMyReferences: ({ config }: { config?: QueryConfig<typeof UsersServices.myReferences> } = {}) => {
    return useQuery({
      ...config,
      queryKey: [UsersServices.NAME, 'my-references'],
      queryFn: UsersServices.myReferences,
    });
  },

  useMyAncestors: ({ config }: { config?: QueryConfig<typeof UsersServices.myAncestors> } = {}) => {
    return useQuery({
      ...config,
      queryKey: [UsersServices.NAME, 'my-ancestors'],
      queryFn: UsersServices.myAncestors,
    });
  },
};
