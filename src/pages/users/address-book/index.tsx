import { HomeOutlined } from '@ant-design/icons';
import BaseExpandableTable from '@base/components/BaseExpandableTable';
import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import { useAuthSession } from '@modules/auth/lib/utils';
import AddressBooksForm from '@modules/users/address-books/components/AddressBooksForm';
import { AddressBooksHooks } from '@modules/users/address-books/lib/hooks';
import { Breadcrumb, Button, Form, message, TableColumnsType } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const AddressBookPage = () => {
  const { user } = useAuthSession();
  const [formInstance] = Form.useForm();
  const [messageApi, messageHolder] = message.useMessage();
  const [isModalOpen, setModalOpen] = useState(false);

  const addressBookCreateFn = AddressBooksHooks.useCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setModalOpen(false);
        formInstance.resetFields();
        messageApi.success(res.message);
      },
    },
  });

  const addressBookDeleteFn = AddressBooksHooks.useDelete({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        messageApi.success(res.message);
      },
    },
  });

  const addressBooksQuery = AddressBooksHooks.useFind({
    id: user?.id,
    options: { page: 1, limit: 10 },
    config: {
      queryKey: [],
      enabled: !!user?.id,
    },
  });

  const dataSource = addressBooksQuery.data?.data?.map((elem) => ({
    key: elem?.id,
    id: elem?.id,
    title: elem?.title,
    coin: elem?.coin,
    currencyUnit: elem?.currencyUnit,
    address: elem?.address,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: 'Currency Unit',
      dataIndex: 'currencyUnit',
      key: 'currencyUnit',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => addressBookDeleteFn.mutate({ id: user?.id, walletId: record?.id })}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <PageWrapper title="Address Book">
      {messageHolder}
      <Breadcrumb
        items={[
          {
            title: (
              <Link href={Paths.root}>
                <HomeOutlined />
              </Link>
            ),
          },
          {
            title: <Link href={Paths.users.usersRoot}>Account</Link>,
          },
          {
            title: 'Address Book',
          },
        ]}
      />
      <div className="space-y-2 mt-4">
        <h3 className="text-2xl font-bold dark:text-gray-100">Address Book</h3>
        <p className="text-gray-400">
          This address book is taken from the Manage Addresses section of the Withdraw page, where it can be configured.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 mt-8">
        {/* <Select
          showSearch
          virtual={false}
          options={['All', 'Regular'].map((elem) => ({ key: elem, label: elem, value: elem }))}
          filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
          style={{ width: 240 }}
          className="[&_.ant-select-selector]:!rounded-3xl"
          size="large"
          placeholder="Type"
        />
        <Select
          showSearch
          virtual={false}
          options={['All', 'Regular'].map((elem) => ({ key: elem, label: elem, value: elem }))}
          filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
          style={{ width: 240 }}
          className="[&_.ant-select-selector]:!rounded-3xl"
          size="large"
          placeholder="Type"
        />
        <Input
          addonBefore={<FaSearch />}
          placeholder="Enter address"
          size="large"
          style={{ width: 240 }}
          className="[&_.ant-input-group-addon]:rounded-3xl [&_.ant-input]:rounded-3xl"
        /> */}
        <Button shape="round" type="primary" className="2xl:ml-auto" onClick={() => setModalOpen(true)}>
          Add Withdrawal Address
        </Button>
      </div>
      <BaseExpandableTable
        columns={columns as any}
        dataSource={dataSource}
        className="transparent_table mt-8"
        scroll={{ x: 'auto' }}
      />
      <BaseModalWithoutClicker
        destroyOnClose
        title="Create a withdrawal address"
        width={450}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <AddressBooksForm
          form={formInstance}
          isLoading={addressBookCreateFn.isPending}
          onFinish={(values) => addressBookCreateFn.mutate({ id: user?.id, data: values })}
        />
      </BaseModalWithoutClicker>
    </PageWrapper>
  );
};

export default AddressBookPage;
