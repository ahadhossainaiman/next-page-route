import { HomeOutlined } from '@ant-design/icons';
import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import UserVerificationRequestsForm from '@modules/admin/user-verification-requests/components/UserVerificationRequestsForm';
import { UserVerificationRequestsHooks } from '@modules/admin/user-verification-requests/lib/hooks';
import { useAuthSession } from '@modules/auth/lib/utils';
import IdentityVerificationCard from '@modules/identity-verification/IdentityVerificationCard';
import { Breadcrumb, Col, Collapse, CollapseProps, Form, message, Row, theme } from 'antd';
import Link from 'next/link';
import { CSSProperties, useState } from 'react';

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: 'Why do I need to undergo identity verification?',
    children: (
      <p>
        Identity verification is a process used by financial institutions and other regulated organizations to confirm
        your identity. Bitget will verify your identity and conduct risk assessment to mitigate risks.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: '2',
    label: "Why can't I select my country/region?",
    children: (
      <p>
        Bitget does not provide services to users in the following countries/regions: Canada (Alberta), Crimea, Cuba,
        Hong Kong, Iran, North Korea, Singapore, Sudan, Syria, the United States, Iraq, Libya, Yemen, Afghanistan,
        Central African Republic, Democratic Republic of the Congo, Guinea-Bissau, Haiti, Lebanon, Somalia, South Sudan,
        and the Netherlands.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: '3',
    label: 'What documents can I submit for identity verification?',
    children: (
      <div>
        <p>
          <strong>Level 1:</strong> ID card, passport, driver's license, and proof of residence.
        </p>
        <p>
          <strong>Level 2:</strong> Bank statements, utility bills (within the last three months), internet/cable/home
          phone bills, tax returns, council tax bills, and government-issued proof of residence.
        </p>
      </div>
    ),
    style: panelStyle,
  },
  {
    key: '4',
    label: 'What are the requirements for identity verification?',
    children: (
      <div>
        <p>1. You must be at least 18 years old.</p>
        <p>2. You can only complete the identity verification on one account.</p>
      </div>
    ),
    style: panelStyle,
  },
];

const IdentityVerificationPage = () => {
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const { token } = theme.useToken();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const { user } = useAuthSession();

  const panelStyle: React.CSSProperties = {
    marginBottom: 16,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const userVerificationRequestCreateFn = UserVerificationRequestsHooks.useCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setVerificationModalOpen(false);
        formInstance.resetFields();
        messageApi.success(res.message);
      },
    },
  });

  return (
    <PageWrapper title="Identity Verification">
      {messageHolder}
      <Breadcrumb
        items={[
          {
            title: (
              <Link href={Paths.root}>
                <HomeOutlined />
              </Link>
            ),
          },
          {
            title: <Link href={Paths.users.usersRoot}>Account</Link>,
          },
          {
            title: 'Identity Verification',
          },
        ]}
      />
      <h3 className="text-2xl font-bold dark:text-gray-100 mt-4">Identity Verification</h3>
      <Row gutter={[16, 16]} className="mt-8">
        <Col xs={24} lg={12}>
          <IdentityVerificationCard onFinish={() => setVerificationModalOpen(true)} />
        </Col>
        <Col xs={24} lg={12}>
          <div className={'border dark:border-white/15 rounded-lg p-4'}>
            <p className="font-semibold text-3xl">FAQ</p>
            <Collapse
              size="large"
              bordered={false}
              defaultActiveKey={['1']}
              style={{ background: 'transparent', marginTop: 16 }}
              items={getItems(panelStyle)}
            />
          </div>
        </Col>
      </Row>
      <BaseModalWithoutClicker
        title="Verify your Identity"
        destroyOnClose
        width={540}
        open={isVerificationModalOpen}
        onCancel={() => {
          setVerificationModalOpen(false);
        }}
        footer={null}
      >
        <UserVerificationRequestsForm
          type="Customer"
          form={formInstance}
          isLoading={userVerificationRequestCreateFn.isPending}
          onFinish={(values) => userVerificationRequestCreateFn.mutate({ ...values, user: user?.id })}
        />
      </BaseModalWithoutClicker>
    </PageWrapper>
  );
};

export default IdentityVerificationPage;
