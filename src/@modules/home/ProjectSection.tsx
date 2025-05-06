import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import { cn } from '@lib/utils';
import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { IProject } from '@modules/admin/projects/lib/interfaces';
import { Button, Empty, Form, Input, InputNumber, message, Select } from 'antd';
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProjectCard from './ProjectCard';

interface IProps {
  className?: string;
  sectionIntro: React.ReactElement;
  projects: IProject[];
}

const ProjectSection: React.FC<IProps> = ({ className, sectionIntro, projects }) => {
  const [formInstance] = Form.useForm();
  const [messageApi, messageHolder] = message.useMessage();
  const [investProject, setInvestProject] = useState<IProject>(null);

  const investmentCreateFn = InvestmentsHooks.useCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setInvestProject(null);
        formInstance.resetFields();
        messageApi.success(res.message);
      },
    },
  });

  return (
    <section className={cn('project_section', className)}>
      {messageHolder}
      <div className="container">
        <div className="mb-16 flex flex-col lg:flex-row gap-4 justify-between items-center">
          {sectionIntro}
          <div className="slider_controller ">
            <div className="ps_btn ps_prev_btn">
              <MdOutlineKeyboardArrowLeft size={24} />
            </div>
            <div className="ps_pagination"></div>
            <div className="ps_btn ps_next_btn">
              <MdOutlineKeyboardArrowRight size={24} />
            </div>
          </div>
        </div>
        <div className="slider_content">
          {projects?.length ? (
            <Swiper
              spaceBetween={25}
              modules={[Pagination, Navigation]}
              pagination={{ el: '.ps_pagination', clickable: true }}
              navigation={{
                enabled: true,
                prevEl: '.ps_prev_btn',
                nextEl: '.ps_next_btn',
                disabledClass: 'ps_disabled_btn',
              }}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {projects?.map((project, idx) => (
                <SwiperSlide key={idx} className="!h-auto">
                  <ProjectCard
                    className="h-full"
                    project={project}
                    // onFinish={(project) => setInvestProject(project)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Empty description="No projects available" />
          )}
        </div>
      </div>
      <BaseModalWithoutClicker
        destroyOnClose
        title={`Invest in ${investProject?.title}`}
        width={450}
        open={!!investProject}
        onCancel={() => setInvestProject(null)}
        footer={null}
      >
        <Form
          size="large"
          onFinish={(values) => {
            investmentCreateFn.mutate({
              ...values,
              project: investProject?.id,
            });
          }}
        >
          <Form.Item
            name="investmentAmount"
            rules={[
              {
                required: true,
                message: 'Amount is required!',
              },
            ]}
          >
            <InputNumber placeholder="Amount" className="w-full" />
          </Form.Item>
          <Form.Item
            name="lockedPeriod"
            rules={[
              {
                required: true,
                message: 'Locked period is required!',
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              virtual={false}
              placeholder="Locked Period"
              filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
            >
              <Select.Option value={3}>3 Months</Select.Option>
              <Select.Option value={6}>6 Months</Select.Option>
              <Select.Option value={12}>12 Months</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="referredBy"
            rules={[
              {
                required: true,
                message: 'Referred username is required!',
              },
            ]}
          >
            <Input placeholder="Referred Username" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={investmentCreateFn.isPending} className="w-full">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </BaseModalWithoutClicker>
    </section>
  );
};

export default ProjectSection;
