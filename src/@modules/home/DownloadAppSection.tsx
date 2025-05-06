import SectionIntro from '@base/components/SectionIntro';
import { cn } from '@lib/utils';
import { QRCode } from 'antd';
import React from 'react';

interface IProps {
  className?: string;
}

const DownloadAppSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('download_app_section', className)}>
      <div className="container">
        <SectionIntro className="text-center mb-16" title="Trade anytime, anywhere!" />
        <div className="wrapper">
          <video
            loop
            muted
            autoPlay
            src="https://img.bgstatic.com/video/msg/Tablet-EN-1740478637.mp4"
            className="md:max-h-[420px] mx-auto [clip-path:inset(8px_round_8px)]"
          />
          <div className="flex gap-4 items-center justify-center mt-4">
            <QRCode value="BILLION" />
            <div className="space-y-4">
              <p className="font-medium">Scan to download the app</p>
              <div className="space-x-2">
                <div className="border border-gray-500 p-2 rounded-lg inline-block">
                  <img src="/images/temp/ios.svg" alt="" width={24} height={24} />
                </div>
                <div className="border border-gray-500 p-2 rounded-lg inline-block">
                  <img src="/images/temp/android.svg" alt="" width={24} height={24} />
                </div>
                <div className="border border-gray-500 p-2 rounded-lg inline-block">
                  <img src="/images/temp/google_play.svg" alt="" width={24} height={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
