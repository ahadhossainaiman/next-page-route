import { Button, Col, Form, FormInstance, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { addressBookCoinTypes, addressBookCurrencyUnitTypes } from '../lib/enums';
import { IAddressBookCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IAddressBookCreate>;
  onFinish: (values: IAddressBookCreate) => void;
}

const AddressBooksForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Title is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Title" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: 'Address is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
        <Col xs={24}>
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
        <Col xs={24}>
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

export default AddressBooksForm;
