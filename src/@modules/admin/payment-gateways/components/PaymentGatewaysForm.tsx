import CustomUploader from '@base/components/CustomUploader';
import { Button, Col, Form, FormInstance, Input, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { IPaymentGatewayCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IPaymentGatewayCreate>;
  onFinish: (values: IPaymentGatewayCreate) => void;
}

const PaymentGatewaysForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const [logo, setLogo] = useState<string>(null);

  useEffect(() => {
    form.resetFields();
    setLogo(initialValues?.logo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form
      size="large"
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={(values) => onFinish({ ...values, logo: logo ?? initialValues?.logo })}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Logo"
            rules={[
              {
                required: true,
                message: 'Logo is required!',
              },
            ]}
          >
            <CustomUploader
              sizeLimit={10}
              initialValue={logo}
              acceptedType={['jpeg', 'jpg', 'png']}
              onChange={(url) => setLogo(url)}
            />
          </Form.Item>
        </Col>
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

export default PaymentGatewaysForm;
