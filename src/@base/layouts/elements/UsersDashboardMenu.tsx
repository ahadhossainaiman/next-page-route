import CustomLink from '@base/components/CustomLink';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { Menu } from 'antd';
import { FaAddressBook, FaChartLine, FaDollarSign, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { HiIdentification } from 'react-icons/hi2';
import { MdDashboard } from 'react-icons/md';

interface IProps {
  selectedKeys: string[];
  openKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
}

const UsersDashboardMenu: React.FC<IProps> = ({ selectedKeys, openKeys, onOpenChange }) => {
  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={[
        {
          key: Paths.users.usersRoot,
          icon: <MdDashboard />,
          label: <CustomLink href={Paths.users.usersRoot}>Dashboard</CustomLink>,
        },
        {
          key: Paths.users.identityVerification,
          icon: <HiIdentification />,
          label: <CustomLink href={Paths.users.identityVerification}>Identity Verification</CustomLink>,
        },
        {
          key: Paths.users.addressBook,
          icon: <FaAddressBook />,
          label: <CustomLink href={Paths.users.addressBook}>Address Book</CustomLink>,
        },
        {
          key: Paths.users.investments,
          icon: <FaChartLine />,
          label: <CustomLink href={Paths.users.investments}>Investments</CustomLink>,
        },
        {
          key: Paths.users.referrals,
          icon: <FaUsers />,
          label: <CustomLink href={Paths.users.referrals}>Referrals</CustomLink>,
        },
        {
          key: Paths.users.transactions,
          icon: <FaDollarSign />,
          label: <CustomLink href={Toolbox.appendPagination(Paths.users.transactions)}>Transactions</CustomLink>,
        },
        {
          key: Paths.users.withdraws,
          icon: <FaMoneyBillWave />,
          label: <CustomLink href={Toolbox.appendPagination(Paths.users.withdraws)}>Withdraws</CustomLink>,
        },
      ]}
    />
  );
};

export default UsersDashboardMenu;
