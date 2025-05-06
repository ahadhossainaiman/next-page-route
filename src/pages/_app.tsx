import { Env } from '.environments';
import WithLayout from '@base/layouts/WithLayout';
import { Providers } from '@lib/context';
import '@styles/index.scss';
import type { AppProps } from 'next/app';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { DM_Sans } from 'next/font/google';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';

const dmSans = DM_Sans({
  weight: ['100', '300', '400', '500', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const App = ({ router, Component, pageProps }: AppProps) => {
  const fontWithMorePropsCreateFn = (fontDefinition: NextFontWithVariable, originalVariableName: string) => {
    return { ...fontDefinition, originalVariableName };
  };

  const dmSansFont = fontWithMorePropsCreateFn(dmSans, '--font-dm-sans');

  return (
    <Providers nextFont={[dmSansFont]}>
      <NextNProgress color="var(--color-primary)" height={3} options={{ showSpinner: false }} />
      <Head>
        <title>{Env.webTitle}</title>
        <meta name="description" content={Env.webDescription} />
      </Head>
      <WithLayout pathname={router.pathname}>
        <Component {...pageProps} />
      </WithLayout>
    </Providers>
  );
};

export default App;
