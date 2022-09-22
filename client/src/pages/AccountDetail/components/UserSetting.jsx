import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";

import { getDateFormat } from "../../../utils/account.util";
import { CardWrap, DivWrap, TitleWrap } from "./style";

export const UserSetting = (props) => {
  const {userSetting} = props;

  return (
    <CardWrap title="회원정보" bordered={true}>
      <DivWrap>
        <TitleWrap>투자 관련 푸시메세지 동의</TitleWrap>
        <Switch
          defaultChecked={userSetting.allow_invest_push}
          checkedChildren={<CheckOutlined/>}
          unCheckedChildren={<CloseOutlined/>}
          disabled={true}
        />
      </DivWrap>
      <DivWrap>
        <TitleWrap>마케팅 푸시메세지 동의</TitleWrap>
        <Switch
          defaultChecked={userSetting.allow_marketing_push}
          checkedChildren={<CheckOutlined/>}
          unCheckedChildren={<CloseOutlined/>}
          disabled={true}
        />
      </DivWrap>
      <DivWrap>
        <TitleWrap>계정 활성화</TitleWrap>
        <Switch
          defaultChecked={userSetting.is_active}
          checkedChildren={<CheckOutlined/>}
          unCheckedChildren={<CloseOutlined/>}
          disabled={true}
        />
      </DivWrap>
      <DivWrap>
        <TitleWrap>관리자 여부</TitleWrap>
        <Switch
          defaultChecked={userSetting.is_staff}
          checkedChildren={<CheckOutlined/>}
          unCheckedChildren={<CloseOutlined/>}
          disabled={true}
        />
      </DivWrap>
      <DivWrap>
        <TitleWrap>아이디 생성일</TitleWrap>
        <span>{getDateFormat(userSetting.created_at)}</span>
      </DivWrap>
      <DivWrap>
        <TitleWrap>아이디 생성일</TitleWrap>
        <span>{getDateFormat(userSetting.created_at)}</span>
      </DivWrap>
      <DivWrap>
        <TitleWrap>마지막 수정일</TitleWrap>
        <span>{getDateFormat(userSetting.updated_at)}</span>
      </DivWrap>
    </CardWrap>
  );
};
