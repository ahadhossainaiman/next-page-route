import CustomUploader from '@base/components/CustomUploader';
import { Toolbox } from '@lib/utils';
import { Button, Col, Form, FormInstance, Input, InputNumber, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { ICountryCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<ICountryCreate>;
  onFinish: (values: ICountryCreate) => void;
}

const CountriesForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const formValues = Form.useWatch([], form);
  const [flag, setFlag] = useState<string>(null);

  const handleSlugFn = () => {
    const holdSlug = Toolbox.generateSlug(formValues?.title ?? '');
    form.setFieldValue('slug', holdSlug);
  };

  useEffect(() => {
    form.resetFields();
    setFlag(initialValues?.flag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form
      size="large"
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={(values) => onFinish({ ...values, flag: flag ?? initialValues?.flag })}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Flag"
            rules={[
              {
                required: true,
                message: 'Flag is required!',
              },
            ]}
          >
            <CustomUploader
              sizeLimit={10}
              initialValue={flag}
              acceptedType={['jpeg', 'jpg', 'png']}
              onChange={(url) => setFlag(url)}
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
            <Input placeholder="Title" onKeyUp={handleSlugFn} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="slug"
            rules={[
              {
                required: true,
                message: 'Slug is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input placeholder="Slug" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="orderPriority"
            rules={[
              {
                required: true,
                message: 'Priority is required!',
              },
            ]}
            className="!mb-0"
          >
            <InputNumber placeholder="Priority" className="w-full" />
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

export default CountriesForm;
