import { Env } from '.environments';
import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import BrandLogo from '@base/components/BrandLogo';
import CustomLink from '@base/components/CustomLink';
import OtpVerificationForm from '@base/components/OtpVerificationForm';
import { Messages, Paths, States } from '@lib/constant';
import useSessionState from '@lib/hooks/useSessionState';
import { Cookies, Storage } from '@lib/utils';
import { ENUM_USERS_TYPES } from '@modules/admin/users/lib/enums';
import { Button, Flex, Form, Input, message, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { REDIRECT_PREFIX } from 'src/middleware';
import { hashKey, identifierKey, passKey } from '../lib/constant';
import { AuthHooks } from '../lib/hooks';
import { setAuthSession } from '../lib/utils';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <Spin />,
});

const SignInSection = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [headerHeight] = useSessionState(States.headerHeight);
  const redirectUrl = router.query?.[REDIRECT_PREFIX]?.toString();
  const [anmSignIn, setAnmSignIn] = useState(null);
  const [isFPModalOpen, setFPModalOpen] = useState(false);
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);
  const [isOtpVerifyModalOpen, setOtpVerifyModalOpen] = useState(false);

  const signInFn = AuthHooks.useSignIn({
    config: {
      onSuccess(data) {
        if (!data.success) {
          messageApi.error(data.message);
          return;
        }

        const verifiedData = data?.data as any;

        console.log('====>', verifiedData);

        // if (!verifiedData?.user?.isEmailVerified) {
        //   Storage.setData(hashKey, verifiedData?.hash);
        //   Storage.setData(identifierKey, verifiedData?.identifier);
        //   setOtpVerifyModalOpen(true);
        //   return;
        // }
        Cookies.setData('accessToken', verifiedData?.accessToken);
        Cookies.setData('refreshToken', verifiedData?.refreshToken);
        Cookies.setData('permissionToken', verifiedData?.permissionToken);

        // setAuthSession(data.data);
        messageApi.loading(Messages.signIn('success'), 1).then(() => {
          console.log(Paths.admin.adminRoot);

          // const url =
          //   data?.data?.user?.type === ENUM_USERS_TYPES.Internal ? Paths.admin.adminRoot : Paths.users.usersRoot;
            const url = Paths.admin.adminRoot;
          console.log(url);
          console.log('ahad', redirectUrl);

          window.location.replace(redirectUrl || url);
        });
      },
    },
  });

  const resetPasswordFn = AuthHooks.useResetPassword({
    config: {
      onSuccess(data) {
        if (!data.success) {
          messageApi.error(data.message);
          return;
        }

        Storage.setData(hashKey, data?.data?.hash);
        Storage.setData(identifierKey, data?.data?.email);
        setFPModalOpen(false);
        messageApi.loading(data?.message, 1).then(() => setVerifyModalOpen(true));
      },
    },
  });

  const verifyResetPasswordFn = AuthHooks.useResetPasswordVerify({
    config: {
      onSuccess(data) {
        if (!data.success) {
          messageApi.error(data.message);
          return;
        }

        Storage.removeData(hashKey);
        Storage.removeData(identifierKey);
        Storage.removeData(passKey);
        messageApi.loading(data?.message, 1).then(() => setVerifyModalOpen(false));
      },
    },
  });

  const otpVerifyFn = AuthHooks.useVerifyOtp({
    config: {
      onSuccess(data) {
        if (!data.success) {
          messageApi.error(data.message);
          return;
        }

        Storage.removeData(hashKey);
        Storage.removeData(identifierKey);
        setOtpVerifyModalOpen(false);
        setAuthSession(data?.data);

        messageApi.loading(Messages.signIn(Env.webTitle), 1).then(() => {
          const url =
            data?.data?.user?.type === ENUM_USERS_TYPES.Internal ? Paths.admin.adminRoot : Paths.users.usersRoot;
          window.location.replace(redirectUrl || url);
        });
      },
    },
  });

  const otpResendFn = AuthHooks.useSendOtp({
    config: {
      onSuccess(data) {
        if (!data.success) {
          messageApi.error(data.message);
          return;
        }

        Storage.setData(hashKey, data?.data?.hash);
        messageApi.success(data?.message);
      },
    },
  });

  useEffect(() => {
    import('@lib/assets/anm_signin.json').then((response) => setAnmSignIn(response.default));
  }, []);

  return (
    <section>
      {messageHolder}
      <div className="container">
        <div className="flex justify-center items-center py-8" style={{ minHeight: `calc(100vh - ${headerHeight}px` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full max-w-[850px] bg-[var(--color-secondary-bg)] p-4 rounded-2xl md:p-8">
            <div className="hidden md:block text-center">
              {anmSignIn && <Lottie className="w-full max-w-96" animationData={anmSignIn} loop={true} />}
            </div>
            <div>
              <div className="flex flex-col items-center md:items-start gap-2 mb-4">
                <CustomLink href={Paths.root}>
                  <BrandLogo />
                </CustomLink>
                <h3 className="text-xl font-medium md:text-2xl">Sign in to your account</h3>
              </div>
              <Form size="large" onFinish={signInFn.mutate}>
                <Form.Item
                  name="identifier"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your email!',
                    },
                  ]}
                >
                  <Input prefix={<FaEnvelope size={22} />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      min: 6,
                      message: 'Password must be at least 6 characters long!',
                    },
                  ]}
                >
                  <Input.Password prefix={<MdLock size={22} />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={signInFn.isPending} className="w-full">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
              <Flex justify="center" gap={4}>
                <p className="text-[var(--color-gray-300)]">Don't have a account?</p>
                <CustomLink className="font-bold text-[var(--color-primary)]" href={Paths.auth.signUp}>
                  Sign Up
                </CustomLink>
              </Flex>
              <Flex justify="center">
                <CustomLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setFPModalOpen(true);
                  }}
                >
                  Forgot password?
                </CustomLink>
              </Flex>
            </div>
          </div>
        </div>
      </div>
      <BaseModalWithoutClicker
        destroyOnClose
        title="Recover Password"
        width={450}
        open={isFPModalOpen}
        onCancel={() => setFPModalOpen(false)}
        footer={null}
      >
        <Form
          size="large"
          onFinish={(values) => {
            Storage.setData(passKey, values.password);
            resetPasswordFn.mutate({ email: values.email });
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input prefix={<FaEnvelope size={22} />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
          >
            <Input.Password prefix={<MdLock size={22} />} placeholder="New Password" />
          </Form.Item>
          <Form.Item className="!mb-0">
            <Button type="primary" htmlType="submit" loading={resetPasswordFn.isPending} className="w-full">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </BaseModalWithoutClicker>
      <BaseModalWithoutClicker
        destroyOnClose
        width={540}
        open={isVerifyModalOpen}
        onCancel={() => {
          Storage.removeData(hashKey);
          Storage.removeData(identifierKey);
          Storage.removeData(passKey);
          setVerifyModalOpen(false);
        }}
        footer={null}
      >
        <OtpVerificationForm
          staticTimer={{ minute: 3, second: 0 }}
          onRetry={() => resetPasswordFn.mutate({ email: Storage.getData(identifierKey) })}
          onFinish={(otp) =>
            verifyResetPasswordFn.mutate({
              hash: Storage.getData(hashKey),
              email: Storage.getData(identifierKey),
              otp: +otp,
              newPassword: Storage.getData(passKey),
            })
          }
        />
      </BaseModalWithoutClicker>
      <BaseModalWithoutClicker
        destroyOnClose
        width={540}
        open={isOtpVerifyModalOpen}
        onCancel={() => {
          Storage.removeData(hashKey);
          Storage.removeData(identifierKey);
          setOtpVerifyModalOpen(false);
        }}
        footer={null}
      >
        <OtpVerificationForm
          staticTimer={{ minute: 3, second: 0 }}
          onRetry={() => otpResendFn.mutate({ identifier: Storage.getData(identifierKey) })}
          onFinish={(otp) =>
            otpVerifyFn.mutate({
              hash: Storage.getData(hashKey),
              identifier: Storage.getData(identifierKey),
              otp: +otp,
            })
          }
        />
      </BaseModalWithoutClicker>
    </section>
  );
};

export default SignInSection;
