import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { useAuthSession } from '@modules/auth/lib/utils';
import { AddressBooksHooks } from '@modules/users/address-books/lib/hooks';
import { Button, Col, Form, FormInstance, InputNumber, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { ENUM_WITHDRAWS_TYPES, withdrawsTypes } from '../lib/enums';
import { IWithdrawCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IWithdrawCreate>;
  onFinish: (values: IWithdrawCreate) => void;
}

const WithdrawsForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const { user } = useAuthSession();
  const formValues = Form.useWatch([], form);

  const addressBooksQuery = AddressBooksHooks.useFind({
    id: user?.id,
    options: { page: 1, limit: 99 },
    config: {
      queryKey: [],
      enabled: !!user?.id,
    },
  });

  const investmentsQuery = InvestmentsHooks.useFind({
    options: { page: 1, limit: 99, user: user?.id },
    config: {
      queryKey: [],
      enabled: !!user?.id,
    },
  });

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            label="Withdraw Fund"
            name="withdrawFund"
            rules={[
              {
                required: true,
                message: 'Withdraw fund is required!',
              },
            ]}
            className="!mb-0"
          >
            <Select
              showSearch
              allowClear
              virtual={false}
              placeholder="Withdraw Fund"
              filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
            >
              {withdrawsTypes.map((elem, idx) => (
                <Select.Option key={idx} value={elem}>
                  {elem}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Amount is required!',
              },
            ]}
            className="!mb-0"
          >
            <InputNumber placeholder="Amount" className="w-full" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="wallet"
            label="Wallet"
            rules={[
              {
                required: true,
                message: 'Wallet is required!',
              },
            ]}
            className="!mb-0"
          >
            <Select
              showSearch
              virtual={false}
              placeholder="Wallet"
              filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
              options={addressBooksQuery.data?.data.map((addressBook) => ({
                key: addressBook?.id,
                label: addressBook?.title,
                value: addressBook?.id,
              }))}
            />
          </Form.Item>
        </Col>
        {formValues?.withdrawFund === ENUM_WITHDRAWS_TYPES.INVESTMENT && (
          <Col xs={24}>
            <Form.Item
              name="investment"
              label="Investment"
              rules={[
                {
                  required: true,
                  message: 'Investment is required!',
                },
              ]}
              className="!mb-0"
            >
              <Select
                showSearch
                virtual={false}
                placeholder="Investment"
                filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
                options={investmentsQuery.data?.data.map((investment) => ({
                  key: investment?.id,
                  label: investment?.project?.title,
                  value: investment?.id,
                }))}
              />
            </Form.Item>
          </Col>
        )}
        <Col xs={24}>
          <Form.Item className="text-right !mb-0">
            <Button loading={isLoading} type="primary" htmlType="submit">
              {formType === 'create' ? 'Submit' : 'Update'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default WithdrawsForm;
