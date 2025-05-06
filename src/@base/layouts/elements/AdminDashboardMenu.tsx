import CustomLink from '@base/components/CustomLink';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { getContentAccess } from '@modules/auth/lib/utils';
import { Menu } from 'antd';
import {
  FaChartLine,
  FaCreditCard,
  FaDollarSign,
  FaGlobe,
  FaKey,
  FaListUl,
  FaMoneyBill,
  FaProjectDiagram,
  FaQuestionCircle,
  FaUsers,
  FaUserShield,
} from 'react-icons/fa';
import { HiIdentification, HiUsers } from 'react-icons/hi2';
import { IoWallet } from 'react-icons/io5';
import { MdAdminPanelSettings, MdCategory, MdDashboard, MdFolderOpen } from 'react-icons/md';
import { PiUsersThreeFill } from 'react-icons/pi';

interface IProps {
  selectedKeys: string[];
  openKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
}

const AdminDashboardMenu: React.FC<IProps> = ({ selectedKeys, openKeys, onOpenChange }) => {
  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={[
        {
          key: Paths.admin.adminRoot,
          icon: <MdDashboard />,
          label: <CustomLink href={Paths.admin.adminRoot}>Dashboard</CustomLink>,
        },
        getContentAccess({
          content: {
            key: Paths.admin.users.root,
            icon: <FaUsers />,
            label: 'Users',
            children: [
              getContentAccess({
                content: {
                  key: Paths.admin.users.list,
                  icon: <HiUsers />,
                  label: <CustomLink href={Toolbox.appendPagination(Paths.admin.users.list)}>Internals</CustomLink>,
                },
                allowedAccess: ['users:read'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.customers.list,
                  icon: <PiUsersThreeFill />,
                  label: <CustomLink href={Toolbox.appendPagination(Paths.admin.customers.list)}>Customers</CustomLink>,
                },
                allowedAccess: ['customers:read'],
              }),
            ],
          },
          allowedAccess: ['users:read', 'customers:read'],
        }),
        getContentAccess({
          content: {
            key: 'acl',
            icon: <MdAdminPanelSettings />,
            label: 'ACL',
            children: [
              getContentAccess({
                content: {
                  key: Paths.admin.permissionTypes.list,
                  icon: <FaListUl />,
                  label: (
                    <CustomLink href={Toolbox.appendPagination(Paths.admin.permissionTypes.list)}>
                      Permission Types
                    </CustomLink>
                  ),
                },
                allowedAccess: ['role-manager-permission-types:read'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.permissions.list,
                  icon: <FaKey />,
                  label: (
                    <CustomLink href={Toolbox.appendPagination(Paths.admin.permissions.list)}>Permissions</CustomLink>
                  ),
                },
                allowedAccess: ['role-manager-permissions:read'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.roles.list,
                  icon: <FaUserShield />,
                  label: <CustomLink href={Toolbox.appendPagination(Paths.admin.roles.list)}>Roles</CustomLink>,
                },
                allowedAccess: ['role-manager-roles:read'],
              }),
            ],
          },
          allowedAccess: [
            'role-manager-permission-types:read',
            'role-manager-permissions:read',
            'role-manager-roles:read',
          ],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.paymentGateways.list,
            icon: <FaCreditCard />,
            label: (
              <CustomLink href={Toolbox.appendPagination(Paths.admin.paymentGateways.list)}>
                Payment Gateways
              </CustomLink>
            ),
          },
          allowedAccess: ['payment-gateways:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.projects.list,
            icon: <FaProjectDiagram />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.projects.list)}>Projects</CustomLink>,
          },
          allowedAccess: ['projects:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.investments.list,
            icon: <FaChartLine />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.investments.list)}>Investments</CustomLink>,
          },
          allowedAccess: ['projects:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.countries.list,
            icon: <FaGlobe />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.countries.list)}>Countries</CustomLink>,
          },
          allowedAccess: ['countries:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.currencies.list,
            icon: <FaMoneyBill />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.currencies.list)}>Currencies</CustomLink>,
          },
          allowedAccess: ['currencies:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.userVerificationRequests.list,
            icon: <HiIdentification />,
            label: (
              <CustomLink href={Toolbox.appendPagination(Paths.admin.userVerificationRequests.list)}>
                User Verification Requests
              </CustomLink>
            ),
          },
          allowedAccess: ['user-verification-requests:read'],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.userTransactions.list,
            icon: <FaDollarSign />,
            label: (
              <CustomLink href={Toolbox.appendPagination(Paths.admin.userTransactions.list)}>
                User Transactions
              </CustomLink>
            ),
          },
          allowedAccess: [],
        }),
        getContentAccess({
          content: {
            key: Paths.admin.withdraws.list,
            icon: <IoWallet />,
            label: <CustomLink href={Toolbox.appendPagination(Paths.admin.withdraws.list)}>Withdraws</CustomLink>,
          },
          allowedAccess: [],
        }),
        getContentAccess({
          content: {
            key: 'cms',
            icon: <MdFolderOpen />,
            label: 'CMS',
            children: [
              getContentAccess({
                content: {
                  key: Paths.admin.faqCategories.list,
                  icon: <MdCategory />,
                  label: (
                    <CustomLink href={Toolbox.appendPagination(Paths.admin.faqCategories.list)}>
                      Faq Categories
                    </CustomLink>
                  ),
                },
                allowedAccess: ['faq-categories:read'],
              }),
              getContentAccess({
                content: {
                  key: Paths.admin.faqs.list,
                  icon: <FaQuestionCircle />,
                  label: <CustomLink href={Toolbox.appendPagination(Paths.admin.faqs.list)}>Faqs</CustomLink>,
                },
                allowedAccess: ['faqs:read'],
              }),
            ],
          },
          allowedAccess: ['faq-categories:read', 'faqs:read'],
        }),
      ]}
    />
  );
};

export default AdminDashboardMenu;
