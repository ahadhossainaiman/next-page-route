import { Env } from '.environments';
import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import BrandLogo from '@base/components/BrandLogo';
import CustomLink from '@base/components/CustomLink';
import OtpVerificationForm from '@base/components/OtpVerificationForm';
import { Messages, Paths, States } from '@lib/constant';
import useSessionState from '@lib/hooks/useSessionState';
import { Storage, Toolbox } from '@lib/utils';
import { UsersServices } from '@modules/admin/users/lib/services';
import { Button, Form, Input, message, Spin, Tooltip } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaHandshake, FaInfoCircle, FaUser, FaUserCircle } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import { hashKey, identifierKey } from '../lib/constant';
import { AuthHooks } from '../lib/hooks';
import { setAuthSession } from '../lib/utils';
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <Spin />,
});

const SignUpSection = () => {
  const router = useRouter();
  const { refer } = router.query;
  const [formInstance] = Form.useForm();
  const [messageApi, messageHolder] = message.useMessage();
  const [headerHeight] = useSessionState(States.headerHeight);
  const [anmSignUp, setAnmSignUp] = useState(null);
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);

  const debouncedCheckUsername = Toolbox.debounce(async (value, resolve, reject) => {
    const { data } = await UsersServices.findUsernameExist(value);

    if (data?.isUsernameExist) {
      reject(new Error('Username does not exist!'));
    } else {
      resolve();
    }
  }, 1000);

  const signUpFn = AuthHooks.useSignUp({
    config: {
      onSuccess(data) {
        if (!data.success) {
          messageApi.error(data.message);
          return;
        }

        Storage.setData(hashKey, data?.data?.hash);
        Storage.setData(identifierKey, data?.data?.identifier);
        formInstance.resetFields();
        setVerifyModalOpen(true);
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
        setVerifyModalOpen(false);
        setAuthSession(data?.data);

        messageApi.loading(Messages.signUp, 1).then(() => {
          window.location.replace(Paths.root);
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
    if (refer) formInstance.setFieldValue('referredBy', refer);
  }, [refer, formInstance]);

  useEffect(() => {
    import('@lib/assets/anm_signup.json').then((response) => setAnmSignUp(response.default));
  }, []);

  return (
    <section>
      {messageHolder}
      <div className="container">
        <div className="flex justify-center items-center py-8" style={{ minHeight: `calc(100vh - ${headerHeight}px` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center w-full max-w-[850px] bg-[var(--color-secondary-bg)] p-4 rounded-2xl md:p-8">
            <div className="hidden md:block text-center">
              {anmSignUp && <Lottie className="w-full max-w-96" animationData={anmSignUp} loop={true} />}
            </div>
            <div>
              <div className="flex flex-col items-center md:items-start gap-2 mb-4">
                <CustomLink href={Paths.root}>
                  <BrandLogo />
                </CustomLink>
                <h3 className="text-xl font-medium md:text-2xl">{Env.webDescription}</h3>
              </div>
              <Form size="large" onFinish={signUpFn.mutate} form={formInstance}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Username is required!',
                    },
                    {
                      validator(_, value) {
                        const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;

                        if (!value) {
                          return Promise.resolve();
                        }

                        if (value.length < 5) {
                          return Promise.reject(new Error('Username must be at least 5 characters long!'));
                        }

                        if (!regex.test(value)) {
                          return Promise.reject(new Error('Username is not valid.'));
                        }

                        return new Promise((resolve, reject) => {
                          debouncedCheckUsername(value, resolve, reject);
                        });
                      },
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    prefix={<FaUserCircle size={22} />}
                    placeholder="Username"
                    suffix={
                      <Tooltip title="Username must start with a letter, contain only letters & numbers.">
                        <FaInfoCircle style={{ color: '#1890ff', cursor: 'pointer' }} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                  ]}
                >
                  <Input prefix={<FaUser size={22} />} placeholder="Name" />
                </Form.Item>
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
                  <Input.Password prefix={<MdLock size={22} />} placeholder="Password" />
                </Form.Item>
                <Form.Item name="referredBy">
                  <Input prefix={<FaHandshake size={22} />} placeholder="Referred Username (Optional)" />
                </Form.Item>
                <Form.Item className="!mb-0">
                  <Button type="primary" htmlType="submit" loading={signUpFn.isPending} className="w-full">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <BaseModalWithoutClicker
        destroyOnClose
        width={540}
        open={isVerifyModalOpen}
        onCancel={() => {
          Storage.removeData(hashKey);
          Storage.removeData(identifierKey);
          setVerifyModalOpen(false);
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

export default SignUpSection;
