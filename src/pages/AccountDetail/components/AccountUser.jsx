import { Avatar } from "antd";
import styled from "styled-components";

import { getDateFormat, getMaskingPhoneNumber } from "../../../utils/account.util";
import { CardWrap, DivWrap, TitleWrap } from "./style";

export const AccountUser = (props) => {
  const {userAccount} = props;

  return (
    <CardWrap title={userAccount.name} bordered={true} extra={
      <AvatarWrap src={userAccount.photo} size={36}/>} bodyStyle={{width: '400px'}}>
      <DivWrap>
        <TitleWrap>주소</TitleWrap>
        <span>{`${userAccount.address} ${userAccount.detail_address}`}</span>
      </DivWrap>
      <DivWrap>
        <TitleWrap>생일</TitleWrap>
        <span>{getDateFormat(userAccount.birth_date)}</span>
      </DivWrap>
      <DivWrap>
        <TitleWrap>아이디 생성일</TitleWrap>
        <span>{getDateFormat(userAccount.created_at)}</span>
      </DivWrap>
      <DivWrap>
        <TitleWrap>이메일</TitleWrap>
        <span>{userAccount.email}</span>
      </DivWrap>
      <DivWrap>
        <TitleWrap>마지막 접속일</TitleWrap>
        <span>{getDateFormat(userAccount.last_login)}</span>
      </DivWrap>
      <DivWrap>
        <TitleWrap>핸드폰 번호</TitleWrap>
        <span>{getMaskingPhoneNumber(userAccount.phone_number)}</span>
      </DivWrap>
      <DivWrap>
        <TitleWrap>마지막 수정일</TitleWrap>
        <span>{getDateFormat(userAccount.updated_at)}</span>
      </DivWrap>
    </CardWrap>
  );
};

export const AvatarWrap = styled(Avatar)`
  margin-left: 10px;
  padding: 0;
`;