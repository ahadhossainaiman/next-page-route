import { TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IUserVerificationRequestsFilter } from './interfaces';
import { UserVerificationRequestsServices } from './services';

export const UserVerificationRequestsHooks = {
  useFindById: ({
    id,
    config,
  }: {
    id: TId;
    config?: QueryConfig<typeof UserVerificationRequestsServices.findById>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [UserVerificationRequestsServices.NAME, id],
      queryFn: () => UserVerificationRequestsServices.findById(id),
    });
  },

  useFind: ({
    options,
    config,
  }: {
    options: IUserVerificationRequestsFilter;
    config?: QueryConfig<typeof UserVerificationRequestsServices.find>;
  }) => {
    return useQuery({
      ...config,
      queryKey: [UserVerificationRequestsServices.NAME, options],
      queryFn: () => UserVerificationRequestsServices.find(options),
    });
  },

  useCreate: ({ config }: { config?: MutationConfig<typeof UserVerificationRequestsServices.create> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: UserVerificationRequestsServices.create,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [UserVerificationRequestsServices.NAME] });
      },
    });
  },

  useUpdate: ({ config }: { config?: MutationConfig<typeof UserVerificationRequestsServices.update> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: UserVerificationRequestsServices.update,
      onSettled: (data) => {
        if (!data?.success) return;

        queryClient.invalidateQueries({ queryKey: [UserVerificationRequestsServices.NAME] });
      },
    });
  },
};
