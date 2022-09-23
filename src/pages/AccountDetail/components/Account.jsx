import { Card } from "antd";
import styled from "styled-components";

import brokers from "../../../data/brokers.json";
import { boolRate, getDateFormat, getMaskingNumber, getOperatingStatus, getRate } from "../../../utils/account.util";
import { CardWrap, DivWrap, TitleWrap } from "./style";

export const Account = (props) => {
  const {accounts} = props;

  return (
    <CardWrap title="계좌 상세정보" bordered={true} bodyStyle={{width: '850px'}}>
      {accounts.map((account) => {
        return (
          <Card.Grid key={account.uuid}>
            <DivWrap>
              <TitleWrap>증권사</TitleWrap>
              <span>{brokers[account.broker_id]}</span>
            </DivWrap>
            <DivWrap>
              <TitleWrap>계좌번호</TitleWrap>
              {getMaskingNumber(account.number)}
            </DivWrap>
            <DivWrap>
              <TitleWrap>계좌명</TitleWrap>
              <span>{account.name}</span>
            </DivWrap>
            <DivWrap>
              <TitleWrap>운용상태</TitleWrap>
              <span>{getOperatingStatus(account.status)}</span>
            </DivWrap>
            <DivWrap>
              <TitleWrap>평가금액</TitleWrap>
              <span>{Number(account.assets).toLocaleString()}</span>
            </DivWrap>
            <DivWrap>
              <TitleWrap>입금금액</TitleWrap>
              <span>{Number(account.payments).toLocaleString()}</span>
            </DivWrap>
            <DivWrap>
              <TitleWrap>수익률</TitleWrap>
              <RateWrap isRate={boolRate(account.assets, account.payments)}>
                {getRate(account.assets, account.payments)}
              </RateWrap>
            </DivWrap>
            <DivWrap>
              <TitleWrap>계좌활성화</TitleWrap>
              <AccountActivationDivWrap isActive={account.is_active}>{account.is_active ? '활성화' : '비활성화'}</AccountActivationDivWrap>
            </DivWrap>
            <DivWrap>
              <TitleWrap>계좌개설일</TitleWrap>
              <span>{getDateFormat(account.created_at)}</span>
            </DivWrap>
          </Card.Grid>
        );
      })}
    </CardWrap>
  );
};

const AccountActivationDivWrap = styled.div`
  color: ${(props) => props.isActive ? 'red' : 'blue'}
`;

const RateWrap = styled.div`
  color: ${(props) => props.isRate === null ? 'black' : props.isRate ? 'red' : 'blue'}
`;