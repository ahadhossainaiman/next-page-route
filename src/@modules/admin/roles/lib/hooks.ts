import { IBaseFilter, TId } from '@base/interfaces';
import { MutationConfig, queryClient, QueryConfig } from '@lib/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IAvailablePermissionFilter } from './interfaces';
import { RoleService } from './service';

//---------------- useRoles hook ------------------------------------
type IUseRoles = {
  options: IBaseFilter;
  config?: QueryConfig<typeof RoleService.find>;
};
export const useRoles = ({ options, config }: IUseRoles) => {
  return useQuery({
    ...config,
    queryKey: [RoleService.NAME, options],
    queryFn: () => RoleService.find(options),
  });
};

//----------------------- useRole hook --------------------------------------
type IUseRole = {
  id: string;
  config?: QueryConfig<typeof RoleService.findById>;
};

export const useRole = ({ id, config }: IUseRole) => {
  return useQuery({
    ...config,
    queryKey: [id],
    queryFn: () => RoleService.findById(id),
  });
};

//------------------ useCreateRole hook ---------------------------------
type IUseCreateRole = {
  config?: MutationConfig<typeof RoleService.create>;
};

export const useCreateRole = ({ config }: IUseCreateRole = {}) => {
  return useMutation({
    ...config,
    mutationFn: RoleService.create,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [RoleService.NAME] });
    },
  });
};

//------------------ useUpdateRole hook ----------------------------------
type IUseUpdateRole = {
  config?: MutationConfig<typeof RoleService.update>;
};

export const useUpdateRole = ({ config }: IUseUpdateRole = {}) => {
  return useMutation({
    ...config,
    mutationFn: RoleService.update,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [RoleService.NAME] });
    },
  });
};

//------------------ useDeleteRole hook ----------------------------------
type IUseDeleteRole = {
  config?: MutationConfig<typeof RoleService.delete>;
};

export const useDeleteRole = ({ config }: IUseDeleteRole = {}) => {
  return useMutation({
    ...config,
    mutationFn: RoleService.delete,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({ queryKey: [RoleService.NAME] });
    },
  });
};

//---------------- useRolePermissions hook ------------------------------------
type IUseRolePermissions = {
  id: TId;
  options: IAvailablePermissionFilter;
  config?: QueryConfig<typeof RoleService.availablePermissions>;
};
export const useRolePermissions = ({ id, options, config }: IUseRolePermissions) => {
  return useQuery({
    ...config,
    queryKey: [RoleService.availablePermissions.name, id, options],
    queryFn: () => RoleService.availablePermissions(id, options),
  });
};

//------------------ useRoleAddPermissions hook ---------------------------------
type IUseRoleAddPermissions = {
  config?: MutationConfig<typeof RoleService.addPermissions>;
};

export const useRoleAddPermissions = ({ config }: IUseRoleAddPermissions = {}) => {
  return useMutation({
    ...config,
    mutationFn: RoleService.addPermissions,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({
        queryKey: [RoleService.availablePermissions?.name],
      });
    },
  });
};

//------------------ useRoleRemovePermissions hook ----------------------------------
type IUseRoleRemovePermissions = {
  config?: MutationConfig<typeof RoleService.removePermissions>;
};

export const useRoleRemovePermissions = ({ config }: IUseRoleRemovePermissions = {}) => {
  return useMutation({
    ...config,
    mutationFn: RoleService.removePermissions,
    onSettled: (res) => {
      if (!res?.success) return;
      queryClient.invalidateQueries({
        queryKey: [RoleService.availablePermissions?.name],
      });
    },
  });
};
