import { ImagePaths } from '@lib/constant';
import { AuthHooks } from '@modules/auth/lib/hooks';
import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { MdLock } from 'react-icons/md';
import { RiArrowGoBackFill } from 'react-icons/ri';

interface IProps {
  user: any;
}

const signOutFn = AuthHooks.useSignOut;

const ProfileCard: React.FC<IProps> = ({ user }) => {
  const [messageApi, messageHolder] = message.useMessage();
  const [isChangePassword, setChangePassword] = useState(false);

  const passwordUpdateFn = AuthHooks.usePasswordUpdate({
    config: {
      onSuccess(data) {
        if (!data.success) {
          messageApi.error(data.message);
          return;
        }

        messageApi.loading(data.message, 1).then(() => signOutFn());
      },
    },
  });

  return (
    <div className="bg-[var(--color-secondary-bg)] rounded-lg overflow-hidden">
      {messageHolder}
      {isChangePassword ? (
        <div className="p-8">
          <div className="text-end mb-8">
            <Button type="primary" icon={<RiArrowGoBackFill />} onClick={() => setChangePassword(false)} ghost>
              Back
            </Button>
          </div>
          <Form size="large" onFinish={(values) => passwordUpdateFn.mutate(values)}>
            <Form.Item
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your current password!',
                },
              ]}
            >
              <Input.Password prefix={<MdLock size={22} />} placeholder="Current Password" />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
                {
                  min: 6,
                  message: 'New password must be at least 6 characters long!',
                },
              ]}
            >
              <Input.Password prefix={<MdLock size={22} />} placeholder="New Password" />
            </Form.Item>
            <Form.Item className="!mb-0">
              <Button type="primary" htmlType="submit" loading={passwordUpdateFn.isPending} className="w-full">
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <React.Fragment>
          <div className="h-32 overflow-hidden">
            <img className="object-cover object-top w-full" src="/images/profile_cover.jpg" alt="" />
          </div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-gray-700 rounded-full overflow-hidden">
            <img className="object-cover object-center" src={ImagePaths.avatar} alt="" />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{user?.name}</h2>
            {user?.email && <p>{user?.email}</p>}
          </div>
          <div className="p-4 border-t border-[var(--color-bg)] mx-8 mt-2 text-center">
            <Button type="primary" onClick={() => setChangePassword(true)}>
              Change Password
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ProfileCard;
