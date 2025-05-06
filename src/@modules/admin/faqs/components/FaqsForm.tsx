import InfiniteScrollSelect from '@base/components/InfiniteScrollSelect';
import { FaqCategoriesHooks } from '@modules/admin/faq-categories/lib/hooks';
import { IFaqCategoriesFilter } from '@modules/admin/faq-categories/lib/interfaces';
import { Button, Col, Form, FormInstance, Input, InputNumber, Radio, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { IFaqCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IFaqCreate>;
  onFinish: (values: IFaqCreate) => void;
}

const FaqsForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const [faqCategoriesOption, setFaqCategoriesOption] = useState<IFaqCategoriesFilter>({
    page: 1,
    limit: 20,
    searchTerm: null,
  });

  const faqCategoriesQuery = FaqCategoriesHooks.useFind({
    options: {
      ...faqCategoriesOption,
    },
  });

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="statement"
            rules={[
              {
                required: true,
                message: 'Statement is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input.TextArea placeholder="Statement" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="answer"
            rules={[
              {
                required: true,
                message: 'Answer is required!',
              },
            ]}
            className="!mb-0"
          >
            <Input.TextArea placeholder="Answer" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="!mb-0" name="category">
            <InfiniteScrollSelect
              allowClear
              showSearch
              virtual={false}
              placeholder="Category"
              loading={faqCategoriesQuery.isLoading}
              meta={faqCategoriesQuery.data?.meta}
              filters={faqCategoriesOption}
              onObserver={(v) => setFaqCategoriesOption(v)}
              onStateChange={(v) => setFaqCategoriesOption(v)}
              options={faqCategoriesQuery.data?.data.map((category) => ({
                key: category?.id,
                label: category?.title,
                value: category?.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="orderPriority"
            rules={[
              {
                required: true,
                message: 'Order priority is required!',
              },
            ]}
            className="!mb-0"
          >
            <InputNumber placeholder="Order priority" className="w-full" />
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

export default FaqsForm;
