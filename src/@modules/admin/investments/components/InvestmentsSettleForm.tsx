import { Button, Col, Form, FormInstance, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { paymentStatuses } from '../lib/enums';
import { IInvestment, IInvestmentPaymentSettle } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IInvestment>;
  onFinish: (values: IInvestmentPaymentSettle) => void;
}

const InvestmentsSettleForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="status"
            rules={[
              {
                required: true,
                message: 'Status is required!',
              },
            ]}
            className="!mb-0"
          >
            <Select
              showSearch
              allowClear
              virtual={false}
              placeholder="Status"
              filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
            >
              {paymentStatuses.map((elem, idx) => (
                <Select.Option key={idx} value={elem}>
                  {elem}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="note" className="!mb-0">
            <Input.TextArea placeholder="Note" />
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

export default InvestmentsSettleForm;
