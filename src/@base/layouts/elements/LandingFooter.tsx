import BrandLogo from '@base/components/BrandLogo';
import CertifiedLogo from '@base/components/CertifiedLogo';
import { Paths } from '@lib/constant';
import Link from 'next/link';
import React, { useRef } from 'react';
import { FaEnvelope, FaLocationDot } from 'react-icons/fa6';

const LandingFooter = () => {
  const footerRef = useRef(null);
  // const [footerHeight, setFooterHeight] = useState(0);
  // const screens = Grid.useBreakpoint();

  // useEffect(() => {
  //   setFooterHeight(footerRef.current?.offsetHeight);
  // }, [footerRef.current?.offsetHeight]);

  return (
    <React.Fragment>
      {/* <div className="footer_height_emulator" style={{ height: footerHeight + 'px' }}></div> */}
      <footer ref={footerRef}>
        <div className="container">
          <div className="top">
            <div className="logo_container">
              <BrandLogo className="mb-4 md:mb-0" />
              {/* {screens.md || <ThemeToggler />} */}
            </div>
            <div className="logo_container">
              <CertifiedLogo />
            </div>
            {/* <ul className="social_links_wrapper">
              <li className="social_link">
                <Button type="text" target="_blank" href={Paths.social.facebookPage} disabled>
                  <FaFacebook />
                </Button>
              </li>
              <li className="social_link">
                <Button type="text" target="_blank" href={Paths.social.facebookMessenger} disabled>
                  <FaFacebookMessenger />
                </Button>
              </li>
            </ul> */}
          </div>
          <div className="middle">
            <div className="item">
              <h6 className="title">About us</h6>
              <p className="description">
                Billion Market is the fastest, safest, and easiest platform for investing, fund management, and buying
                and selling crypto assets.
              </p>
            </div>
            <div className="item">
              <h6 className="title">Useful Link</h6>
              <ul className="links_wrapper">
                <li className="link">
                  <Link href={Paths.aboutUs}>About us</Link>
                </li>
                <li className="link">
                  <Link href={Paths.privacyPolicy}>Privacy Policy</Link>
                </li>
                <li className="link">
                  <Link href={Paths.termsAndConditions}>Terms and Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="item">
              <h6 className="title">Get in touch</h6>
              <ul className="links_wrapper">
                <li className="link">
                  <span className="icon_container">
                    <FaLocationDot size={12} />
                  </span>
                  <p>{Paths.social.address}</p>
                </li>
                <li className="link">
                  <span className="icon_container">
                    <FaEnvelope size={12} />
                  </span>
                  <a href={`mailto:${Paths.social.email}`}>{Paths.social.email}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="bottom">
            <p className="copyright">Copyright &copy; {new Date().getFullYear()} BM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default LandingFooter;
