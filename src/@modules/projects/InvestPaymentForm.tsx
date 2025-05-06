import CustomUploader from '@base/components/CustomUploader';
import useCopyClipboard from '@lib/hooks/useCopyClipboard';
import { IInvestment, IInvestmentPaymentCreate } from '@modules/admin/investments/lib/interfaces';
import { useAuthSession } from '@modules/auth/lib/utils';
import { addressBookCoinTypes, addressBookCurrencyUnitTypes } from '@modules/users/address-books/lib/enums';
import { AddressBooksHooks } from '@modules/users/address-books/lib/hooks';
import { Button, Col, Form, FormInstance, Input, InputNumber, Row, Select, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IInvestment>;
  onFinish: (values: IInvestmentPaymentCreate) => void;
}

const InvestPaymentForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const { user } = useAuthSession();
  const [transferProof, setTransferProof] = useState<string>(null);
  const { isCopied, copyToClipboard } = useCopyClipboard();

  const addressBooksQuery = AddressBooksHooks.useFind({
    id: user?.id,
    options: { page: 1, limit: 99 },
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
            name="userWallet"
            label="Deposit From"
            rules={[
              {
                required: true,
                message: 'Deposit from is required!',
              },
            ]}
            className="!mb-0"
          >
            <Select
              showSearch
              virtual={false}
              placeholder="Deposit From"
              filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
              options={addressBooksQuery.data?.data.map((addressBook) => ({
                key: addressBook?.id,
                label: addressBook?.title,
                value: addressBook?.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="depositAddress"
            label="Deposit Address"
            className="!mb-0"
            initialValue="0xC3858b3B291b3a5cfEedAb4124F0BF7252f05004"
          >
            <Input
              disabled
              addonAfter={
                <Tooltip title={isCopied ? 'Copied!' : 'Copy'}>
                  <Button
                    size="small"
                    type="text"
                    icon={<FaCopy />}
                    onClick={() => copyToClipboard('0xC3858b3B291b3a5cfEedAb4124F0BF7252f05004')}
                  />
                </Tooltip>
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="investmentAmount"
            rules={[
              {
                required: true,
                message: 'Investment amount is required!',
              },
            ]}
            className="!mb-0"
          >
            <InputNumber className="!w-full" placeholder="Investment amount" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="coin"
            rules={[
              {
                required: true,
                message: 'Coin is required!',
              },
            ]}
            className="!mb-0"
          >
            <Select
              showSearch
              virtual={false}
              placeholder="Coin"
              filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
              options={addressBookCoinTypes.map((coinType) => ({
                key: coinType,
                label: coinType,
                value: coinType,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="currencyUnit"
            rules={[
              {
                required: true,
                message: 'Currency unit is required!',
              },
            ]}
            className="!mb-0"
          >
            <Select
              showSearch
              virtual={false}
              placeholder="Currency unit"
              filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
              options={addressBookCurrencyUnitTypes.map((currencyUnit) => ({
                key: currencyUnit,
                label: currencyUnit,
                value: currencyUnit,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="transactionId"
            label="Trx ID"
            rules={[
              {
                required: true,
                message: 'Trx ID is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Trx ID" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="note" label="Note" className="!mb-0">
            <Input.TextArea placeholder="Note" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Transfer Proof"
            name="transferProof"
            rules={[
              {
                required: true,
                message: 'Transfer proof is required!',
              },
            ]}
          >
            <CustomUploader
              sizeLimit={10}
              initialValue={transferProof}
              acceptedType={['jpeg', 'jpg', 'png']}
              onChange={(url) => setTransferProof(url)}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="text-right !mb-0">
            <Button loading={isLoading} type="primary" htmlType="submit">
              {formType === 'create' ? 'Confirm' : 'Update'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default InvestPaymentForm;
