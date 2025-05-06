import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { FaFileContract, FaHome, FaInfoCircle, FaProjectDiagram, FaUserShield } from 'react-icons/fa';

export const menuItems = [
  {
    name: 'Home',
    path: Paths.root,
    icon: <FaHome size={16} />,
  },
  {
    name: 'Projects',
    path: Paths.projects.root,
    icon: <FaProjectDiagram size={16} />,
  },
  {
    name: 'Privacy Policy',
    path: Paths.privacyPolicy,
    icon: <FaUserShield size={16} />,
  },
  {
    name: 'Terms and Conditions',
    path: Paths.termsAndConditions,
    icon: <FaFileContract size={16} />,
  },
  {
    name: 'About Us',
    path: Paths.aboutUs,
    icon: <FaInfoCircle size={16} />,
  },
];

export const generateTabbarElems = () => {
  return menuItems.reduce((acc, item) => {
    if ([Paths.privacyPolicy, Paths.termsAndConditions].includes(item.path)) return acc;

    acc.push({
      key: item.path,
      icon: item.icon,
      title: item.name,
      hashUrl: `#${Toolbox.slugify(item.name)}`,
      url: item.path,
    });

    return acc;
  }, []);
};
