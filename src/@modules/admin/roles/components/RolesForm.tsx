import { Button, Col, Form, FormInstance, Input, Radio, Row } from 'antd';
import { useEffect } from 'react';
import { IRoleCreate } from '../lib/interfaces';

interface IProps {
  form: FormInstance;
  loading?: boolean;
  initialValues?: Partial<IRoleCreate>;
  onFinish: (values: IRoleCreate) => void;
}

const RolesForm: React.FC<IProps> = ({ form, loading, initialValues, onFinish }) => {
  useEffect(() => {
    form?.resetFields();
  }, [form, initialValues]);

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter a title!',
              },
            ]}
          >
            <Input placeholder="Enter a title" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Active" name="isActive">
            <Radio.Group buttonStyle="solid" className="w-full">
              <Radio.Button className="w-1/2 text-center" value={true}>
                Yes
              </Radio.Button>
              <Radio.Button className="w-1/2 text-center" value={false}>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item className="text-right">
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RolesForm;
