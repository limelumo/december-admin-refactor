import 'antd/dist/antd.css';

import { CheckOutlined, CloseOutlined, DeleteFilled } from '@ant-design/icons';
import { Form, Input, Popconfirm, Table } from 'antd';
import usersApi from 'api/usersApi';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { usersDataState } from 'store/userList';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.error('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const UserList = () => {
  const dataSource = useRecoilValue(usersDataState);

  const queryClient = useQueryClient();

  const { mutate: removeMutate } = useMutation((targetId) => usersApi.removeUser(targetId), {
    onSuccess: () => queryClient.invalidateQueries('users'),
    enabled: false,
  });

  const handleDelete = (targetId) => removeMutate(targetId);

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    // setDataSource(newData);
  };

  const DEFAULT_COLUMNS = [
    {
      title: '고객명',
      dataIndex: 'name',
      editable: true,
      align: 'center',
    },
    {
      title: '보유 계좌',
      dataIndex: 'account_count',
      editable: true,
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
      editable: true,
      align: 'center',
    },
    {
      title: '성별코드',
      dataIndex: 'gender_origin',
      editable: true,
      align: 'center',
    },
    {
      title: '생년월일',
      dataIndex: 'birth_date',
      editable: true,
      align: 'center',
    },
    {
      title: '휴대폰 번호',
      dataIndex: 'phone_number',
      editable: true,
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
      editable: true,
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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = DEFAULT_COLUMNS.map((col) => {
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
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      rowKey={(render) => render.id}
      bordered
      dataSource={dataSource}
      columns={columns}
      style={{ margin: 24, textAlign: 'center' }}
    />
  );
};

export default UserList;
