import 'antd/dist/antd.css';

import { CheckOutlined, CloseOutlined, DeleteFilled } from '@ant-design/icons';
import { Popconfirm, Table } from 'antd';
import usersApi from 'api/usersApi';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { usersDataState } from 'store/userList';

import { EditableCell, EditableRow } from './UserEdit';

const UserList = () => {
  const dataSource = useRecoilValue(usersDataState);
  const queryClient = useQueryClient();

  const { mutate: removeMutate } = useMutation((targetId) => usersApi.removeUser(targetId), {
    onSuccess: () => queryClient.invalidateQueries('users'),
    enabled: false,
  });

  const handleDelete = (targetId) => removeMutate(targetId);

  const defaultColumns = [
    {
      title: '고객명',
      dataIndex: 'name',
      align: 'left',
      editable: true,
    },
    {
      title: '보유 계좌',
      dataIndex: 'account_count',
      align: 'center',
    },
    {
      title: '임직원 계좌',
      dataIndex: 'is_staff',
      align: 'center',
      render: (_, record) =>
        record.is_staff === 'true' ? (
          <CheckOutlined style={{ color: 'green' }} />
        ) : (
          <CloseOutlined style={{ color: 'salmon' }} />
        ),
      filters: [
        {
          text: '임직원 계좌 보유',
          value: 'true',
        },
        {
          text: '임직원 계좌 미보유',
          value: 'false',
        },
      ],
      onFilter: (value, record) => record.is_staff === value,
    },
    {
      title: '이메일',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '성별코드',
      dataIndex: 'gender_origin',
      align: 'center',
    },
    {
      title: '생년월일',
      dataIndex: 'birth_date',
      align: 'center',
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'phone_number',
      align: 'center',
    },
    {
      title: '최근 로그인',
      dataIndex: 'last_login',
      align: 'center',
    },
    {
      title: '혜택 수신 동의',
      dataIndex: 'allow_marketing_push',
      align: 'center',
      render: (_, record) =>
        record.allow_marketing_push === 'true' ? (
          <CheckOutlined style={{ color: 'green' }} />
        ) : (
          <CloseOutlined style={{ color: 'salmon' }} />
        ),
    },
    {
      title: '활성화',
      dataIndex: 'is_active',
      align: 'center',
      render: (_, record) =>
        record.is_active === 'true' ? (
          <CheckOutlined style={{ color: 'green' }} />
        ) : (
          <CloseOutlined style={{ color: 'salmon' }} />
        ),
      filters: [
        {
          text: '활성화 고객',
          value: 'true',
        },
        {
          text: '비활성화 고객',
          value: 'false',
        },
      ],
      onFilter: (value, record) => record.is_active === value,
    },
    {
      title: '가입일',
      dataIndex: 'created_at',
      align: 'center',
    },
    {
      title: '삭제',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="삭제하시겠습니까?" onConfirm={() => handleDelete(record.id)}>
            <DeleteFilled style={{ fontSize: '16px' }} />
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const components = {
    body: {
      cell: EditableCell,
      row: EditableRow,
    },
  };

  return (
    <Table
      components={components}
      dataSource={dataSource}
      columns={columns}
      rowKey={(render) => render.id}
      style={{ margin: 24, textAlign: 'center' }}
      bordered
    />
  );
};

export default UserList;
