import { EditFilled } from '@ant-design/icons';
import { Form, Input } from 'antd';
import usersApi from 'api/usersApi';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

const EditableContext = React.createContext(null);

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  const queryClient = useQueryClient();

  const { mutate: editMutate } = useMutation((config) => usersApi.updateUserData(config), {
    onSuccess: () => queryClient.invalidateQueries('users'),
    enabled: false,
  });

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
      const value = await form.validateFields();

      toggleEdit();
      editMutate({ targetId: record.id, value });
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
            message: `${title}을 적어주세요.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <>
        <EditFilled style={{ marginRight: '12px' }} onClick={toggleEdit} />
        <Link to={`/users/${record.id}`}>{children}</Link>
      </>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
