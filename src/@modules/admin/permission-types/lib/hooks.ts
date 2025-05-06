import { IBaseFilter } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PermissionTypesService } from './service';

//---------------- usePermissionTypes hook ------------------------------------
type IUsePermissionTypes = {
  options: IBaseFilter;
  config?: QueryConfig<typeof PermissionTypesService.find>;
};
export const usePermissionTypes = ({ options, config }: IUsePermissionTypes) => {
  return useQuery({
    ...config,
    queryKey: [PermissionTypesService.NAME, options],
    queryFn: () => PermissionTypesService.find(options),
  });
};

//----------------------- usePermissionType hook --------------------------------------
type IUsePermissionType = {
  id: string;
  config?: QueryConfig<typeof PermissionTypesService.findById>;
};

export const usePermissionType = ({ id, config }: IUsePermissionType) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => PermissionTypesService.findById(id),
  });
};

//------------------ useCreatePermissionType hook ---------------------------------
type IUseCreatePermissionType = {
  config?: MutationConfig<typeof PermissionTypesService.create>;
};

export const useCreatePermissionType = ({ config }: IUseCreatePermissionType = {}) => {
  return useMutation({
    ...config,
    mutationFn: PermissionTypesService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [PermissionTypesService.NAME] });
    },
  });
};

//------------------ useUpdatePermissionType hook ----------------------------------
type IUseUpdatePermissionType = {
  config?: MutationConfig<typeof PermissionTypesService.update>;
};

export const useUpdatePermissionType = ({ config }: IUseUpdatePermissionType = {}) => {
  return useMutation({
    ...config,
    mutationFn: PermissionTypesService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [PermissionTypesService.NAME] });
    },
  });
};

//------------------ useDeletePermissionType hook ----------------------------------
type IUseDeletePermissionType = {
  config?: MutationConfig<typeof PermissionTypesService.delete>;
};

export const useDeletePermissionType = ({ config }: IUseDeletePermissionType = {}) => {
  return useMutation({
    ...config,
    mutationFn: PermissionTypesService.delete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [PermissionTypesService.NAME] });
    },
  });
};
