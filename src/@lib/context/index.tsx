import Preloader from '@base/components/Preloader';
import { DayjsConfig, queryClient } from '@lib/config';
import useTheme from '@lib/hooks/useTheme';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ThemeConfig } from 'antd';
import { ConfigProvider, theme as themeConfig } from 'antd';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { useEffect, useRef, useState, type PropsWithChildren } from 'react';

type TProps = {
  nextFont: (NextFontWithVariable & { originalVariableName: string })[];
} & PropsWithChildren;

export const Providers = ({ nextFont, children }: TProps) => {
  const preloaderRef = useRef(null);
  const [isLoadingStart, setLoadingStart] = useState(true);
  const { isLight } = useTheme();

  DayjsConfig();

  const theme: ThemeConfig = {
    algorithm: isLight ? themeConfig.defaultAlgorithm : themeConfig.darkAlgorithm,
    token: {
      fontFamily: nextFont.map((font) => `var(${font.originalVariableName})`).join(', '),
      fontSize: 16,
      colorPrimary: '#ed1c24',
      colorPrimaryActive: '#b31a1d',
      colorPrimaryBorder: '#ed1c24',
      colorPrimaryHover: '#b31a1d',
      colorLinkActive: '#b31a1d',
      colorLinkHover: '#b31a1d',
      screenXSMax: 639,
      screenSMMin: 640,
      screenSM: 640,
      screenMDMax: 1023,
      screenLGMin: 1024,
      screenLG: 1024,
      screenLGMax: 1279,
      screenXLMin: 1280,
      screenXL: 1280,
      screenXLMax: 1535,
      screenXXLMin: 1536,
      screenXXL: 1536,
    },
  };

  useEffect(() => {
    const preloader = preloaderRef.current;

    if (preloader) {
      setTimeout(() => {
        preloader.classList.remove('active');
        setLoadingStart(false);
      }, 2000);
    }
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {isLoadingStart && <Preloader ref={preloaderRef} />}
        <main role="main" id="__main" className={[nextFont.map((font) => font.variable), 'font-dm-sans'].join(' ')}>
          {children}
        </main>
      </QueryClientProvider>
    </ConfigProvider>
  );
};
