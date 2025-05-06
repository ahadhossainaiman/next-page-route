import { ArrowUpOutlined } from '@ant-design/icons';
import { Paths } from '@lib/constant';
import { ENUM_USERS_TYPES } from '@modules/admin/users/lib/enums';
import { UsersHooks } from '@modules/admin/users/lib/hooks';
import { useAuthSession } from '@modules/auth/lib/utils';
import { Card, Popover, Space, Tag } from 'antd';
import { useRouter } from 'next/router';
import { FaWallet } from 'react-icons/fa';
import UserWelcomeMenu from './UserWelcomeMenu';

const WelcomeMenu = () => {
  const { user } = useAuthSession();
  const profileQuery = UsersHooks.useMyProfile();
  const router = useRouter();

  const wallet = (
    <Card style={{ width: 280, textAlign: 'center', borderRadius: 10 }}>
      <div
        style={{ color: '#888', fontSize: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}
      >
        Total asset value
      </div>
      <div style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>{profileQuery.data?.data?.balance}</div>
      {/* <div style={{ fontSize: 12, color: '#888' }}>≈ 0.00 USD</div> */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        {/* <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 50,
              height: 50,
              lineHeight: '50px',
              borderRadius: '50%',
              background: '#f5f5f5',
              margin: 'auto',
            }}
          >
            <ArrowDownOutlined style={{ fontSize: 18, color: 'var(--color-secondary-bg)' }} />
          </div>
          <div style={{ fontSize: 12, marginTop: 5 }}>Deposit</div>
        </div> */}
        <div
          style={{ textAlign: 'center' }}
          onClick={() => router.push(Paths.users.withdraws)}
          className="cursor-pointer group"
        >
          <div
            className="bg-[#f5f5f5] group-hover:bg-[var(--color-primary)] duration-500 transition-colors"
            style={{
              width: 50,
              height: 50,
              lineHeight: '50px',
              borderRadius: '50%',
              margin: 'auto',
            }}
          >
            <ArrowUpOutlined
              style={{ fontSize: 18 }}
              className="dark:!text-[var(--color-secondary-bg)] group-hover:!text-white"
            />
          </div>
          <div style={{ fontSize: 12, marginTop: 5 }}>Withdraw</div>
        </div>
        {/* <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 50,
              height: 50,
              lineHeight: '50px',
              borderRadius: '50%',
              background: '#f5f5f5',
              margin: 'auto',
            }}
          >
            <SwapOutlined style={{ fontSize: 18, color: 'var(--color-secondary-bg)' }} />
          </div>
          <div style={{ fontSize: 12, marginTop: 5 }}>Transfer</div>
        </div> */}
      </div>
    </Card>
  );

  return (
    <Space.Compact>
      {user?.type === ENUM_USERS_TYPES.Internal || (
        <Popover content={wallet}>
          <Tag className="items-center !flex justify-center cursor-pointer">
            <FaWallet />
          </Tag>
        </Popover>
      )}
      <UserWelcomeMenu />
    </Space.Compact>
  );
};

export default WelcomeMenu;
