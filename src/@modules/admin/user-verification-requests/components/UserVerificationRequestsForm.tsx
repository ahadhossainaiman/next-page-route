import CustomUploader from '@base/components/CustomUploader';
import { Toolbox } from '@lib/utils';
import { ENUM_USERS_TYPES, TUsersType } from '@modules/admin/users/lib/enums';
import { Button, Col, Form, FormInstance, Input, Radio, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { userVerificationRequestsContentTypes, userVerificationRequestsTitlesTypes } from '../lib/enums';
import { IUserVerificationRequestCreate } from '../lib/interfaces';

interface IProps {
  type?: TUsersType;
  isLoading: boolean;
  form: FormInstance;
  formType?: 'view' | 'create' | 'update';
  initialValues?: Partial<IUserVerificationRequestCreate>;
  onFinish: (values: IUserVerificationRequestCreate) => void;
}

const UserVerificationRequestsForm: React.FC<IProps> = ({
  type = ENUM_USERS_TYPES.Internal,
  isLoading,
  form,
  formType = 'create',
  initialValues,
  onFinish,
}) => {
  const [content, setContent] = useState<string>(null);

  useEffect(() => {
    form.resetFields();
    setContent(initialValues?.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form
      size="large"
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={(values) => onFinish({ ...values, content: content ?? initialValues?.content })}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: 'Content is required!',
              },
            ]}
          >
            <CustomUploader
              sizeLimit={10}
              isRemoveIcon={formType !== 'view'}
              initialValue={content}
              acceptedType={['jpeg', 'jpg', 'png']}
              onChange={(url) => setContent(url)}
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
            <Select
              disabled={formType === 'view'}
              showSearch
              virtual={false}
              placeholder="Title"
              filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
              options={userVerificationRequestsTitlesTypes.map((titleType) => ({
                key: titleType,
                label: Toolbox.toCapitalizeText(titleType),
                value: titleType,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="contentType"
            rules={[
              {
                required: true,
                message: 'Content type is required!',
              },
            ]}
            className="!mb-0"
          >
            <Select
              disabled={formType === 'view'}
              showSearch
              virtual={false}
              placeholder="Content type"
              filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
              options={userVerificationRequestsContentTypes.map((contentType) => ({
                key: contentType,
                label: Toolbox.toCapitalizeText(contentType),
                value: contentType,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="identificationNumber"
            rules={[
              {
                required: true,
                message: 'Identification number is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Identification Number" />
          </Form.Item>
        </Col>
        {type === ENUM_USERS_TYPES.Internal && (
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
                virtual={false}
                placeholder="Status"
                filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
                options={[
                  { key: 'approved', label: 'Approved', value: 'Approved' },
                  { key: 'declined', label: 'Declined', value: 'Declined' },
                ]}
              />
            </Form.Item>
          </Col>
        )}
        {type === ENUM_USERS_TYPES.Internal && formType !== 'view' && (
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

export default UserVerificationRequestsForm;
