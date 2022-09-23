import 'antd/dist/antd.css';

import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from 'utils/userListStore';

const UserAddInput = ({ type, label, name, required, inputData }) => {
  const [newUserInfo, setNewUserInfo] = useRecoilState(userInfoState);

  const handleInputData = ({ target }) => {
    const { name, value } = target;
    setNewUserInfo({ ...newUserInfo, [name]: value });
  };

  const inputType = type ? type : 'text';

  return (
    <AddInput>
      <p>{required ? `* ${label}` : label}</p>
      <input type={inputType} name={name} value={inputData} onChange={handleInputData} />
    </AddInput>
  );
};

const AddInput = styled.label`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  height: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  padding: 0 20px;
  justify-content: space-between;
  margin-bottom: 8px;

  p {
    width: 55%;
    margin: 0;
    line-height: 36px;
  }

  input {
    display: inline-block;
    width: 100%;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 1.5715;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all 0.3s;
  }
`;

export default UserAddInput;
