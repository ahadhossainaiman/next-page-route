import { Env } from '.environments';
import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import { Paths, States } from '@lib/constant';
import useSessionState from '@lib/hooks/useSessionState';
import { cn, Toolbox } from '@lib/utils';
import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { IInvestment } from '@modules/admin/investments/lib/interfaces';
import { ENUM_PROJECTS_STATUS_TYPES } from '@modules/admin/projects/lib/enums';
import { IProject } from '@modules/admin/projects/lib/interfaces';
import { UsersHooks } from '@modules/admin/users/lib/hooks';
import { UsersServices } from '@modules/admin/users/lib/services';
import { useAuthSession } from '@modules/auth/lib/utils';
import { Button, Form, Input, InputNumber, message, Radio } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { REDIRECT_PREFIX } from 'src/middleware';
import Swal from 'sweetalert2';
import InvestPaymentForm from './InvestPaymentForm';

interface IProps {
  project: IProject;
}

const ProjectSidebarInvestCard: React.FC<IProps> = ({ project }) => {
  const router = useRouter();
  const { projectId } = router.query;
  const { isAuthenticate } = useAuthSession();
  const [formInstance] = Form.useForm();
  const [paymentFormInstance] = Form.useForm();
  const [messageApi, messageHolder] = message.useMessage();
  const [isCollapsed] = useState(false);
  const formValues = Form.useWatch([], formInstance);
  const [investment, setInvestment] = useState<IInvestment>(null);
  const [persistInvestment, setPersistInvestment] = useSessionState(States.investment);

  const getReturnByPeriod = (period) => {
    const result = project?.returnRates?.find((item) => item?.period === period);
    return result ? `${result.returnMin}% - ${result.returnMax}%` : null;
  };

  const calculateInterestForRange = (principal, returnRate, time): any => {
    if (!principal || !returnRate || !time) return null;

    const [minRate, maxRate] = returnRate
      ?.split(' - ')
      ?.map((rate) => parseFloat(rate?.replace('%', '')?.trim()) / 100);

    // time = time / 12;

    const calculateForRate = (rate) => {
      const simpleInterest = principal * rate * time;
      // const amount = principal * Math.pow(1 + rate, time);
      const amount = principal + simpleInterest;
      const compoundInterest = amount - principal;

      return {
        simpleInterest: simpleInterest.toFixed(2),
        compoundInterest: compoundInterest.toFixed(2),
        totalAmount: amount.toFixed(2),
      };
    };

    return {
      minRateInterest: calculateForRate(minRate),
      maxRateInterest: calculateForRate(maxRate),
    };
  };

  const debouncedCheckUsername = Toolbox.debounce(async (value, resolve, reject) => {
    const { data } = await UsersServices.findUsernameExist(value);

    if (!data?.isUsernameExist) {
      reject(new Error('Username does not exist!'));
    } else {
      resolve();
    }
  }, 1000);

  const handleFinish = (values) => {
    delete values.returnRate;

    isAuthenticate
      ? investmentCreateFn.mutate({
          ...values,
          project: +projectId,
        })
      : router.push({
          pathname: Paths.auth.signIn,
          query: { [REDIRECT_PREFIX]: `${Env.webHostUrl}/${router.asPath}` },
        });
  };

  const profileFn = UsersHooks.useMyProfile({
    config: {
      queryKey: [],
      enabled: isAuthenticate,
    },
  });

  const investmentCreateFn = InvestmentsHooks.useCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        formInstance.resetFields();
        setPersistInvestment({
          lockedPeriod: null,
          investmentAmount: 0,
          referredBy: null,
        });
        messageApi.success(res.message);
        setInvestment(res?.data);
      },
    },
  });

  const investmentPaymentCreateFn = InvestmentsHooks.useCreatePayment({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setInvestment(null);
        paymentFormInstance.resetFields();
        // messageApi.success(res.message);
        Swal.fire({
          title: 'Your payment is successful. Wait for confirmation!',
          icon: 'success',
        }).then(() => {
          router.push(Paths.users.usersRoot);
        });
      },
    },
  });

  useEffect(() => {
    formInstance.resetFields();

    if (persistInvestment?.projectId === projectId) {
      formInstance.setFieldsValue({
        lockedPeriod: persistInvestment?.lockedPeriod || project?.returnRates?.[0]?.period,
        returnRate: getReturnByPeriod(formValues?.lockedPeriod || project?.returnRates?.[0]?.period),
        investmentAmount: persistInvestment?.investmentAmount || 100,
        referredBy: persistInvestment?.referredBy || profileFn.data?.data?.referredBy?.username,
      });
    } else {
      formInstance.setFieldsValue({
        lockedPeriod: project?.returnRates?.[0]?.period,
        returnRate: getReturnByPeriod(formValues?.lockedPeriod || project?.returnRates?.[0]?.period),
        investmentAmount: 100,
        referredBy: profileFn.data?.data?.referredBy?.username,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistInvestment?.projectId, profileFn.data?.data]);

  return (
    <div className="bg-[var(--color-secondary-bg)] rounded-lg overflow-hidden">
      {messageHolder}
      <div className="bg-[var(--color-gray-200)] dark:bg-[var(--color-black)] p-4 text-center relative">
        <p className="flex gap-0.5 items-center justify-center">{project?.title}</p>
        <p className="font-semibold text-2xl mt-2">{project?.status}</p>
        {/* <Divider /> */}
        {/* <p className="font-semibold text-2xl mb-4">
          Available for funding: <span className="text-[var(--color-primary)]">€134 514</span>
        </p> */}
        {/* <Progress
          percent={project?.totalValue / project?.slotValue}
          showInfo={false}
          strokeColor="var(--color-primary)"
        /> */}
        {/* <div className="flex  gap-1 justify-between">
          <p>159 Investors | $1,94,196</p>
          <p>$3,00,000 Goal</p>
        </div> */}
        {/* <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer hover:text-[var(--color-primary)]"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <FaArrowAltCircleDown size={20} className={isCollapsed ? 'rotate-0' : 'rotate-180'} />
        </div> */}
      </div>
      <div
        className={cn('max-h-[1024px] opacity-100 transition-[max-height_opacity] duration-500', {
          'max-h-0 opacity-0': isCollapsed,
        })}
      >
        <div className="p-4">
          <Form
            disabled={project?.status === ENUM_PROJECTS_STATUS_TYPES.CLOSE}
            layout="vertical"
            form={formInstance}
            onFinish={handleFinish}
            initialValues={persistInvestment}
          >
            <p className="font-semibold text-2xl">Period</p>
            <Form.Item name="lockedPeriod" className="!mb-4">
              <Radio.Group
                onChange={(e) => {
                  formInstance.setFieldValue('returnRate', getReturnByPeriod(e?.target?.value));
                  setPersistInvestment((prev) => ({ ...prev, projectId, lockedPeriod: e?.target?.value }));
                }}
                options={project?.returnRates?.map((elem) => ({
                  label: elem?.period + ' Months',
                  value: elem?.period,
                }))}
              />
            </Form.Item>
            <Form.Item label="Month Return Rate" name="returnRate" className="!mb-4">
              <Input placeholder="7.00% - 9.00%" disabled />
            </Form.Item>
            <Form.Item
              label="Invest"
              name="investmentAmount"
              className="!mb-4"
              rules={[
                {
                  required: true,
                  message: 'Amount is required!',
                },
              ]}
            >
              <InputNumber
                min={100}
                className="!w-full"
                placeholder="100$"
                onChange={(value) => setPersistInvestment((prev) => ({ ...prev, projectId, investmentAmount: value }))}
              />
            </Form.Item>
            <Form.Item label="Earn" className="!mb-4">
              <Input
                disabled
                value={
                  formValues?.investmentAmount
                    ? `${+calculateInterestForRange(
                        formValues?.investmentAmount,
                        formValues?.returnRate,
                        formValues?.lockedPeriod,
                      )?.minRateInterest?.totalAmount} - ${+calculateInterestForRange(
                        formValues?.investmentAmount,
                        formValues?.returnRate,
                        formValues?.lockedPeriod,
                      )?.maxRateInterest?.totalAmount}`
                    : 0
                }
              />
            </Form.Item>
            <Form.Item
              label="Referral"
              name="referredBy"
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
                placeholder="Referred Username"
                onChange={(e) => setPersistInvestment((prev) => ({ ...prev, projectId, referredBy: e.target.value }))}
              />
            </Form.Item>
            <Form.Item className="!mb-0">
              <Button type="primary" className="w-full" htmlType="submit">
                Invest Now
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <BaseModalWithoutClicker
        destroyOnClose
        title="Make Payment"
        width={520}
        open={!!investment}
        onCancel={() => {
          setInvestment(null);
          router.push(Paths.users.investments);
        }}
        footer={null}
      >
        <InvestPaymentForm
          form={paymentFormInstance}
          isLoading={investmentPaymentCreateFn.isPending}
          initialValues={{ investmentAmount: investment?.investmentAmount }}
          onFinish={(values) => investmentPaymentCreateFn.mutate({ id: investment?.id, data: values })}
        />
      </BaseModalWithoutClicker>
    </div>
  );
};

export default ProjectSidebarInvestCard;
