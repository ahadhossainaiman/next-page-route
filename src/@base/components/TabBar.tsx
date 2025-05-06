import CustomLink from '@base/components/CustomLink';
import { Paths } from '@lib/constant';
import { cn, Toolbox } from '@lib/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaAddressBook, FaDollarSign, FaHome, FaProjectDiagram } from 'react-icons/fa';

const menuItems = [
  { key: Paths.root, title: 'Home', icon: <FaHome size={16} />, hashUrl: '#', url: Paths.root },
  {
    key: Paths.projects.root,
    title: 'Projects',
    icon: <FaProjectDiagram size={16} />,
    hashUrl: '#projects',
    url: Paths.projects.root,
  },
  {
    key: Paths.users.addressBook,
    icon: <FaAddressBook size={16} />,
    title: 'Wallets',
    hashUrl: '#wallets',
    url: Paths.users.addressBook,
  },
  {
    key: Paths.users.transactions,
    icon: <FaDollarSign size={16} />,
    title: 'Transactions',
    hashUrl: '#transactions',
    url: Toolbox.appendPagination(Paths.users.transactions),
  },
];

const TabBar = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((elem) => !/^\s*$/.test(elem));
  const selectItem = pathSegments[pathSegments.length - 1];
  const [activeLink, setActiveLink] = useState(`#${selectItem || ''}`);

  const handleClick = (e, hash, url) => {
    e.preventDefault();
    setActiveLink(hash);
    router.push(url);
  };

  return (
    <div className="tabbar">
      <ul className="tabbar_item_wrapper">
        {menuItems.map((elem) => (
          <li key={elem.title} className="tabbar_item">
            <CustomLink
              className={cn('tabbar_link', {
                active: activeLink === elem.hashUrl,
              })}
              href={elem.url}
              onClick={(e) => handleClick(e, elem.hashUrl, elem.url)}
            >
              <span className="tabbar_icon">{elem.icon}</span>
              <span className="tabbar_text">{elem.title}</span>
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBar;
