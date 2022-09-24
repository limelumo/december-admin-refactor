import 'antd/dist/antd.css';

import { Input, Switch } from 'antd';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'store/userList';
import styled from 'styled-components';

const UserAddInput = ({ type, label, name, required, inputData }) => {
  const [newUserInfo, setNewUserInfo] = useRecoilState(userInfoState);

  const handleInputData = ({ target }) => {
    const { name, value } = target;
    setNewUserInfo({ ...newUserInfo, [name]: value });
  };

  const handleToggle = (checked, { target }) => {
    let { name } = target;

    if (name === undefined) {
      name = target.parentNode.name;
    }
    setNewUserInfo({ ...newUserInfo, [name]: checked });
  };

  const inputType = type ? type : 'text';

  const requiredOpt = (
    <label>
      {label}
      <span>*</span>
    </label>
  );

  const toggleType = (
    <AddInput>
      {required ? requiredOpt : <label>{label}</label>}
      <ToggleWrapper>
        <Switch onChange={handleToggle} name={name} defaultChecked />
      </ToggleWrapper>
    </AddInput>
  );

  const defaultType = (
    <AddInput>
      {required ? requiredOpt : <label>{label}</label>}
      <Value type={inputType} name={name} value={inputData} onChange={handleInputData} />
    </AddInput>
  );

  return (
    <>
      {type === 'toggle' && toggleType}
      {type !== 'toggle' && defaultType}
    </>
  );
};

const AddInput = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  height: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  padding: 0 20px;
  margin-bottom: 8px;

  label {
    display: block;
    width: 40%;
    line-height: 36px;

    span {
      padding-left: 4px;
      color: salmon;
      font-weight: bold;
    }
  }
`;

const ToggleWrapper = styled.div`
  width: 60%;
`;

const Value = styled(Input)`
  width: 60%;
`;

export default UserAddInput;
