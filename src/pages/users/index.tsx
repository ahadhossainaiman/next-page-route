import { Env } from '.environments';
import { CopyFilled, StarOutlined } from '@ant-design/icons';
import CustomLink from '@base/components/CustomLink';
import PageWrapper from '@base/container/PageWrapper';
import { ImagePaths, Paths } from '@lib/constant';
import useCopyClipboard from '@lib/hooks/useCopyClipboard';
import { Toolbox } from '@lib/utils';
import { ProjectsHooks } from '@modules/admin/projects/lib/hooks';
import { UsersHooks } from '@modules/admin/users/lib/hooks';
import DashboardIPCard from '@modules/users/DashboardIPCard';
import DashboardProjects from '@modules/users/DashboardProjects';
import { Button, Popover, Tag, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { FaArrowRight, FaChartLine, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import { HiIdentification } from 'react-icons/hi2';

const menuItems = [
  // {
  //   key: Paths.users.usersRoot,
  //   icon: <MdDashboard />,
  //   label: 'Dashboard',
  //   link: Paths.users.usersRoot,
  // },
  {
    key: Paths.users.identityVerification,
    icon: <HiIdentification />,
    label: 'Verification',
    link: Paths.users.identityVerification,
  },
  // {
  //   key: Paths.users.addressBook,
  //   icon: <FaAddressBook />,
  //   label: 'Address Book',
  //   link: Paths.users.addressBook,
  // },
  {
    key: Paths.users.investments,
    icon: <FaChartLine />,
    label: 'Investments',
    link: Paths.users.investments,
  },
  {
    key: Paths.users.referrals,
    icon: <FaUsers />,
    label: 'Referrals',
    link: Paths.users.referrals,
  },
  // {
  //   key: Paths.users.transactions,
  //   icon: <FaDollarSign />,
  //   label: 'Transactions',
  //   link: Toolbox.appendPagination(Paths.users.transactions),
  // },
  {
    key: Paths.users.withdraws,
    icon: <FaMoneyBillWave />,
    label: 'Withdraws',
    link: Toolbox.appendPagination(Paths.users.withdraws),
  },
];

const DashboardPage = () => {
  const router = useRouter();
  const profileQuery = UsersHooks.useMyProfile();
  const projectsQuery = ProjectsHooks.useFind({ options: { page: 1, limit: 3 } });
  const { isCopied, copyToClipboard } = useCopyClipboard();

  // const isVerified = profileQuery.data?.data?.verifications?.every((item) => Object.values(item).includes(true));

  return (
    <PageWrapper title="Dashboard">
      <div className="welcome">
        <h3 className="text-2xl font-bold dark:text-gray-100">Hello, {profileQuery.data?.data?.name}</h3>
        <p className="text-500/10">
          You have to fight to reach your dream. You have to sacrifice and work hard for it. — Lionel Messi.
        </p>
      </div>
      <div className="user_info bg-gray-100 dark:bg-[var(--color-bg)] px-4 py-6 rounded-lg flex flex-col lg:flex-row gap-6 lg:gap-2 justify-between mt-8">
        <div className="left_side flex gap-4 items-center">
          <div className="image_container w-16 h-16 bg-gray-300 rounded-full shrink-0">
            <img src={profileQuery.data?.data?.avatar || ImagePaths.avatar} alt="" />
          </div>
          <div className="content_wrapper space-y-1.5">
            <h3 className="text-2xl font-bold dark:text-gray-100">Hello, {profileQuery.data?.data?.name}</h3>
            <div className="flex flex-wrap items-center">
              {/* <small className="px-2 py-1 bg-[var(--color-secondary-bg)] rounded-lg">UID: 5465465</small> */}
              <Popover content="Identity Verification">
                <Tag
                  className="cursor-pointer"
                  icon={<StarOutlined />}
                  color={profileQuery.data?.data?.isKYCVerified ? 'green' : 'yellow'}
                >
                  {profileQuery.data?.data?.isKYCVerified ? 'Verified' : 'Unverified'}
                </Tag>
              </Popover>
              <Tooltip title={isCopied ? 'Copied!' : 'Copy'}>
                <Tag
                  onClick={() =>
                    copyToClipboard(`${Env.webHostUrl}${Paths.auth.signUp}?refer=${profileQuery.data?.data?.username}`)
                  }
                  className="cursor-pointer"
                  icon={<CopyFilled />}
                  color="blue"
                >
                  {profileQuery.data?.data?.username}
                </Tag>
              </Tooltip>
            </div>
          </div>
        </div>
        {/* <div className="right_side space-x-2 place-self-end order-first lg:place-self-auto lg:order-none">
          <Button icon={<EyeOutlined />} shape="circle" />
          <Button shape="round" type="primary" ghost>
            My Profile
          </Button>
        </div> */}
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <DashboardCard />
        <DashboardCard />
      </div> */}
      <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
        <DashboardIPCard title="Earning" value={profileQuery.data?.data?.totalEarned} />
        <DashboardIPCard title="Withdraw" value={profileQuery.data?.data?.totalWithdrawed} />
        <DashboardIPCard title="Investment" value={profileQuery.data?.data?.totalInvested} />
      </div>
      <div className="flex gap-4 justify-center flex-wrap py-8 md:hidden">
        {menuItems.map((menuItem) => (
          <div key={menuItem.key} className="flex flex-col items-center relative">
            <CustomLink type="hoverable" href={menuItem.link} title={menuItem.label} />
            <div className="text-xl">{menuItem.icon}</div>
            <span className="text-sm mt-1">{menuItem.label}</span>
          </div>
        ))}
      </div>
      <div className="md:mt-8">
        <DashboardProjects
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          projects={projectsQuery.data?.data}
        />
        {projectsQuery.data?.meta?.total > projectsQuery.data?.meta?.limit && (
          <div className="text-end mt-4">
            <Button size="large" type="dashed" onClick={() => router.push(Paths.projects.root)}>
              More <FaArrowRight />
            </Button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
