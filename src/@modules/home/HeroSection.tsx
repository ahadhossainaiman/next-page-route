import { Paths } from '@lib/constant';
import { cn } from '@lib/utils';
import { Button, Col, Grid, Row } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
}

const HeroSection: React.FC<IProps> = ({ className, style }) => {
  const screens = Grid.useBreakpoint();
  const router = useRouter();

  return (
    <section className={cn('hero_section', className)} style={style}>
      <div className="container">
        <div className="relative">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} lg={14} xl={12} order={screens.lg ? 1 : 2}>
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight">
                  Buy and sell digital assets on Billion Markets and earn unlimited income
                </h1>
                <p className="text-xl dark:text-[var(--color-gray-300)]">
                  Billion Market is the fastest, safest, and easiest platform for investing, fund management, and buying
                  and selling crypto assets.
                </p>
                <Button
                  size="large"
                  type="primary"
                  className="font-bold rounded-3xl"
                  onClick={() => router.push(Paths.auth.signUp)}
                >
                  Get started now
                </Button>
              </div>
            </Col>
            <Col xs={24} lg={10} xl={12} order={screens.lg ? 2 : 1}>
              <Image
                priority
                src="/images/temp/hero_thumb.png"
                alt=""
                width={500}
                height={500}
                className="w-full h-auto max-h-96 aspect-square object-contain"
              />
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
