import SectionIntro from '@base/components/SectionIntro';
import { cn } from '@lib/utils';
import { IFaq } from '@modules/admin/faqs/lib/interfaces';
import { Collapse, theme } from 'antd';
import React from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

interface IProps {
  className?: string;
  faqs: IFaq[];
}

const FaqSection: React.FC<IProps> = ({ className, faqs }) => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 16,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <section className={cn('faq_section', className)}>
      <div className="container">
        <SectionIntro className="text-center mb-16" titlePrefix="F" title="AQ" isTitleShape />
        <div className="wrapper">
          <Collapse
            size="large"
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => (
              <IoMdArrowDropright size={18} className={isActive ? 'rotate-90' : 'rotate-0'} />
            )}
            style={{ background: 'transparent' }}
            items={faqs?.map((faq) => ({
              key: faq?.id,
              label: faq?.statement,
              children: faq?.answer,
              style: panelStyle,
            }))}
          />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
