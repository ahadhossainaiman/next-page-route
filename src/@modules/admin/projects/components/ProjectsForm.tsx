import CustomUploader from '@base/components/CustomUploader';
import RichTextEditor from '@base/components/RichTextEditor';
import { Toolbox } from '@lib/utils';
import { Button, Col, Form, FormInstance, Input, InputNumber, Radio, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { projectsStatusTypes } from '../lib/enums';
import { IProjectCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IProjectCreate>;
  onFinish: (values: IProjectCreate) => void;
}

const ProjectsForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const [banner, setBanner] = useState<string>(null);

  useEffect(() => {
    form.resetFields();
    setBanner(initialValues?.banner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form
      size="large"
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={(values) => onFinish({ ...values, banner: banner ?? initialValues?.banner })}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Banner"
            rules={[
              {
                required: true,
                message: 'Banner is required!',
              },
            ]}
          >
            <CustomUploader
              sizeLimit={10}
              initialValue={banner}
              acceptedType={['jpeg', 'jpg', 'png']}
              onChange={(url) => setBanner(url)}
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
          <Form.Item
            name="about"
            rules={[
              {
                required: true,
                message: 'About is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input.TextArea style={{ resize: 'none' }} placeholder="About" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: 'Description is required!',
              },
            ]}
            className="!mb-0"
          >
            <RichTextEditor placeholder="Description" />
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
          <Form.List name="returnRates" initialValue={[{}]}>
            {(fields, { add, remove }) => {
              return (
                <div className="space-y-4">
                  {fields.map(({ key, name, ...rest }) => (
                    <div
                      key={key}
                      className="relative p-4 border border-dashed border-[var(--color-primary)] rounded-md"
                    >
                      <Row gutter={[16, 16]}>
                        <p className="absolute top-0 left-4 -translate-y-1/2 bg-[var(--color-primary)] px-1.5 py-0.5 text-xs text-white rounded-md">
                          Variation {fields.length > 1 ? name + 1 : ''}
                        </p>
                        <Col xs={24} md={12}>
                          <Form.Item
                            {...rest}
                            label="Period"
                            name={[name, 'period']}
                            rules={[
                              {
                                required: true,
                                message: 'Period is required!',
                              },
                            ]}
                            className="!mb-0"
                          >
                            <Select
                              showSearch
                              allowClear
                              virtual={false}
                              placeholder="Period"
                              filterOption={(input, option: any) =>
                                option?.title.toLowerCase().includes(input.toLowerCase())
                              }
                            >
                              <Select.Option value={3}>3 Months</Select.Option>
                              <Select.Option value={6}>6 Months</Select.Option>
                              <Select.Option value={12}>12 Months</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            {...rest}
                            label="Min Return"
                            name={[name, 'returnMin']}
                            rules={[
                              {
                                required: true,
                                message: 'Min return is required!',
                              },
                            ]}
                            className="!mb-0"
                          >
                            <InputNumber placeholder="Min Return" className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            {...rest}
                            label="Max Return"
                            name={[name, 'returnMax']}
                            rules={[
                              {
                                required: true,
                                message: 'Max return is required!',
                              },
                            ]}
                            className="!mb-0"
                          >
                            <InputNumber placeholder="Max Return" className="w-full" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <div className="flex justify-center gap-4 mt-8">
                        <Button
                          size="small"
                          type="primary"
                          ghost
                          onClick={() => add()}
                          disabled={name + 1 !== fields.length}
                        >
                          Add More
                        </Button>
                        <Button size="small" type="dashed" onClick={() => remove(name)} disabled={fields.length < 2}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }}
          </Form.List>
        </Col>
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
              options={projectsStatusTypes.map((statusType) => ({
                key: statusType,
                label: Toolbox.toCapitalizeText(statusType),
                value: statusType,
              }))}
            />
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

export default ProjectsForm;
