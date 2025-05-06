import { Button, Col, Form, FormInstance, Input, InputNumber, Radio, Row } from 'antd';
import React, { useEffect } from 'react';
import { ICurrencyCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<ICurrencyCreate>;
  onFinish: (values: ICurrencyCreate) => void;
}

const CurrenciesForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
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
            name="currencyCode"
            rules={[
              {
                required: true,
                message: 'Currency code is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Currency code" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="currencySymbol"
            rules={[
              {
                required: true,
                message: 'Currency symbol is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Currency symbol" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="value"
            rules={[
              {
                required: true,
                message: 'Value is required!',
              },
            ]}
            className="!mb-0"
          >
            <InputNumber placeholder="Value" className="w-full" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="isActive" className="!mb-0">
            <Radio.Group buttonStyle="solid" className="w-full text-center">
              <Radio.Button className="w-1/2" value={true}>
                Active
              </Radio.Button>
              <Radio.Button className="w-1/2" value={false}>
                Inactive
              </Radio.Button>
            </Radio.Group>
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

export default CurrenciesForm;
