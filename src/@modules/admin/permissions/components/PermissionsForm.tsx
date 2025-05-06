import { Permissions } from '@lib/constant';
import { usePermissionTypes } from '@modules/admin/permission-types/lib/hooks';
import { Button, Col, Form, FormInstance, Radio, Row, Select } from 'antd';
import { useEffect } from 'react';
import { IPermissionCreate } from '../lib/interfaces';

interface IProps {
  form?: FormInstance;
  loading?: boolean;
  initialValues?: Partial<IPermissionCreate>;
  onFinish?: (values: IPermissionCreate) => void;
}

const PermissionsForm: React.FC<IProps> = ({ form, loading, initialValues, onFinish }) => {
  const permissionsQuery = usePermissionTypes({
    options: {
      page: 1,
      limit: 300,
    },
  });

  useEffect(() => {
    form?.resetFields();
  }, [form, initialValues]);

  const onFinishForm = (values: IPermissionCreate) => {
    onFinish(values);
  };

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={onFinishForm}>
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
            <Select
              showSearch
              allowClear
              virtual={false}
              placeholder="Select a permission type"
              filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
            >
              {Object.values(Permissions).map((permission) => (
                <Select.Option key={permission} value={permission} title={permission}>
                  {permission}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Permission Type"
            name="permissionType"
            rules={[
              {
                required: true,
                message: 'Please select a permission type!',
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              virtual={false}
              placeholder="Select a permission type"
              loading={permissionsQuery.isLoading}
              filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
            >
              {permissionsQuery?.data?.data?.map((item) => (
                <Select.Option key={item.id} value={item.id} title={item.title}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
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

export default PermissionsForm;
