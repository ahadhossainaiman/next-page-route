import { MutationConfig } from '@lib/config';
import { useMutation } from '@tanstack/react-query';
import { AuthServices } from './services';
import { clearAuthSession } from './utils';

export const AuthHooks = {
  useSignIn: ({ config }: { config?: MutationConfig<typeof AuthServices.signIn> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.signIn,
    });
  },

  useSignUp: ({ config }: { config?: MutationConfig<typeof AuthServices.signUp> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.signUp,
    });
  },

  usePasswordUpdate: ({ config }: { config?: MutationConfig<typeof AuthServices.passwordUpdate> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.passwordUpdate,
      onSettled: (data) => {
        if (!data?.success) return;
      },
    });
  },

  useSignOut: () => {
    clearAuthSession();
    window.location.reload();
  },

  useResetPassword: ({ config }: { config?: MutationConfig<typeof AuthServices.resetPassword> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.resetPassword,
    });
  },

  useResetPasswordVerify: ({ config }: { config?: MutationConfig<typeof AuthServices.resetPasswordVerify> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.resetPasswordVerify,
    });
  },

  useSendOtp: ({ config }: { config?: MutationConfig<typeof AuthServices.sendOtp> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.sendOtp,
    });
  },

  useVerifyOtp: ({ config }: { config?: MutationConfig<typeof AuthServices.verifyOtp> } = {}) => {
    return useMutation({
      ...config,
      mutationFn: AuthServices.verifyOtp,
    });
  },
};
