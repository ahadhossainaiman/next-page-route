import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IPermissionFilter } from './interfaces';
import { PermissionsService } from './service';

//---------------- usePermissions hook ------------------------------------
type IUsePermissions = {
  options: IPermissionFilter;
  config?: QueryConfig<typeof PermissionsService.find>;
};
export const usePermissions = ({ options, config }: IUsePermissions) => {
  return useQuery({
    ...config,
    queryKey: [PermissionsService.NAME, options],
    queryFn: () => PermissionsService.find(options),
  });
};

//----------------------- usePermission hook --------------------------------------
type IUsePermission = {
  id: string;
  config?: QueryConfig<typeof PermissionsService.findById>;
};

export const usePermission = ({ id, config }: IUsePermission) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => PermissionsService.findById(id),
  });
};

//------------------ useCreatePermission hook ---------------------------------
type IUseCreatePermission = {
  config?: MutationConfig<typeof PermissionsService.create>;
};

export const useCreatePermission = ({ config }: IUseCreatePermission = {}) => {
  return useMutation({
    ...config,
    mutationFn: PermissionsService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [PermissionsService.NAME] });
    },
  });
};

//------------------ useUpdatePermission hook ----------------------------------
type IUseUpdatePermission = {
  config?: MutationConfig<typeof PermissionsService.update>;
};

export const useUpdatePermission = ({ config }: IUseUpdatePermission = {}) => {
  return useMutation({
    ...config,
    mutationFn: PermissionsService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [PermissionsService.NAME] });
    },
  });
};

//------------------ useDeletePermission hook ----------------------------------
type IUseDeletePermission = {
  config?: MutationConfig<typeof PermissionsService.delete>;
};

export const useDeletePermission = ({ config }: IUseDeletePermission = {}) => {
  return useMutation({
    ...config,
    mutationFn: PermissionsService.delete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [PermissionsService.NAME] });
    },
  });
};
