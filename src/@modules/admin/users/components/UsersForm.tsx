import InfiniteScrollSelect from '@base/components/InfiniteScrollSelect';
import PhoneCodeSelect from '@base/components/PhoneCodeSelect';
import { IBaseFilter, TId } from '@base/interfaces';
import { useRoles } from '@modules/admin/roles/lib/hooks';
import Authorization from '@modules/auth/components/Authorization';
import { hasAccessPermission } from '@modules/auth/lib/utils';
import { Button, Col, Form, FormInstance, Input, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { IUserCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IUserCreate>;
  onFinish: (values: IUserCreate) => void;
}

const UsersForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const [initialRoles, setInitialRoles] = useState([]);
  const [phoneCode, setPhoneCode] = useState(null);

  const [rolesOption, setRolesOption] = useState<IBaseFilter>({
    page: 1,
    limit: 20,
    searchTerm: null,
  });

  const rolesQuery = useRoles({
    config: {
      queryKey: [],
      enabled: hasAccessPermission(['role-manager-roles:read']),
    },
    options: {
      ...rolesOption,
    },
  });

  const handleFinishFn = (values) => {
    // values.phoneCode = phoneCode;
    const purifiedRoles = values?.roles?.map((role: TId) => ({ role })) || [];

    const deletedRoles = initialRoles
      ?.filter((initialRole) => !values?.roles?.some((role: TId) => role === initialRole))
      ?.map((role) => ({ role, isDeleted: true }));

    onFinish({ ...values, roles: [...purifiedRoles, ...deletedRoles] });
  };

  useEffect(() => {
    form.resetFields();

    if (formType === 'update') {
      setInitialRoles(initialValues?.roles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={handleFinishFn}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Name is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Name" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="password"
            rules={[
              {
                required: formType === 'create',
                message: 'Password is required!',
              },
              {
                min: 6,
                message: 'Password must be at least 6 characters long!',
              },
            ]}
            className="!mb-0"
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: 'Phone number is required!',
              },
              {
                min: 4,
                message: 'Please, write correct phone number!',
              },
            ]}
            className="!mb-0"
          >
            <Input
              placeholder="XXXXXXXXXX"
              addonBefore={
                <PhoneCodeSelect
                  showSearch
                  code={phoneCode}
                  onSelectCode={(code) => setPhoneCode(code)}
                  style={{ width: 120 }}
                />
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Email is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Authorization allowedAccess={['role-manager-roles:read']}>
          <Col xs={24} md={24}>
            <Form.Item className="!mb-0" name="roles">
              <InfiniteScrollSelect
                allowClear
                showSearch
                mode="multiple"
                virtual={false}
                placeholder="Roles"
                loading={rolesQuery.isLoading}
                meta={rolesQuery.data?.meta}
                filters={rolesOption}
                onObserver={(v) => setRolesOption(v)}
                onStateChange={(v) => setRolesOption(v)}
                options={rolesQuery.data?.data.map((role) => ({
                  key: role?.id,
                  label: role?.title,
                  value: role?.id,
                }))}
              />
            </Form.Item>
          </Col>
        </Authorization>
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

export default UsersForm;
