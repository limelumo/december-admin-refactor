import 'antd/dist/antd.css';

import { Popconfirm, Table } from 'antd';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { EditableCell, EditableRow } from '../../../components/EditTable';
import { dataTotalCountState, usersDataState } from '../../../utils/userListStore';
import UserAdd from './UserAdd';

const UserList = () => {
  const [dataSource, setDataSource] = useRecoilState(usersDataState);
  const setDataTotalCount = useSetRecoilState(dataTotalCountState);

  const queryClient = useQueryClient();

  const removeSelectedUser = async (id) => await axios.delete(`/users/${id}`);

  const userRemoveMutation = useMutation(removeSelectedUser, {
    onSuccess: () => queryClient.invalidateQueries('usersData'),
    enabled: false,
  });

  const handleDelete = (id) => userRemoveMutation.mutate(id);

  const defaultColumns = [
    {
      title: '고객명',
      dataIndex: 'name',
      width: '10%',
      editable: true,
    },
    {
      title: '보유 계좌수',
      dataIndex: 'account_count',
      editable: true,
    },
    {
      title: '성별코드',
      dataIndex: 'gender_origin',
      editable: true,
    },
    {
      title: '생년월일',
      dataIndex: 'birth_date',
      editable: true,
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'phone_number',
      editable: true,
    },
    {
      title: '최근 로그인',
      dataIndex: 'last_login',
      editable: true,
    },
    {
      title: '혜택 수신 동의',
      dataIndex: 'allow_marketing_push',
      editable: true,
    },
    {
      title: '활성화',
      dataIndex: 'is_active',
      editable: true,
    },
    {
      title: '가입일',
      dataIndex: 'created_at',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="삭제하시겠습니까?" onConfirm={() => handleDelete(record.id)}>
            <button>삭제</button>
          </Popconfirm>
        ) : null,
    },
  ];

  // check request
  const updateUserData = async (editData) => await axios.put('/users', editData);

  const userUpdateMutation = useMutation(updateUserData, {
    onSuccess: () => queryClient.invalidateQueries('usersData'),
    enabled: false,
  });

  const handleSave = (row) => {
    const editData = [...dataSource];
    const index = editData.findIndex((item) => row.id === item.id);
    const item = editData[index];

    editData.splice(index, 1, { ...item, ...row });
    userUpdateMutation.mutate(editData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
        handleSave,
      }),
    };
  });

  return (
    <section>
      <UserAdd />

      <Table
        components={components}
        // rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={{ hideOnSinglePage: true }}
      />
    </section>
  );
};

// .editable-cell {
//   position: relative;
// }

// .editable-row:hover .editable-cell-value-wrap {
//   padding: 4px 11px;
//   border: 1px solid #d9d9d9;
//   border-radius: 2px;
// }

// [data-theme='dark'] .editable-row:hover .editable-cell-value-wrap {
//   border: 1px solid #434343;
// }

export default UserList;
