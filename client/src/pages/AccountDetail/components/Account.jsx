import { Card } from "antd";
import React from "react";
import styled from "styled-components";

import brokers from "../../../data/brokers.json";
import { boolRate, getDateFormat, getMaskingNumber, getOperatingStatus, getRate } from "../../../utils/account.util";

export const Account = (props) => {
  const { account } = props;

  return (
    <CardWrap title="계좌 상세정보" bordered={true} bodyStyle={{width: '500px'}}>
      <div>
        <div>증권사</div>
        <span>{brokers[account.broker_id]}</span>
      </div>
      <div>
        <div>계좌번호</div>
        {getMaskingNumber(account.number)}
      </div>
      <div>
        <div>계좌명</div>
        <span>{account.name}</span>
      </div>
      <div>
        <div>운용상태</div>
        <span>{getOperatingStatus(account.status)}</span>
      </div>
      <div>
        <div>평가금액</div>
        <span>{Number(account.assets).toLocaleString()}</span>
      </div>
      <div>
        <div>입금금액</div>
        <span>{Number(account.payments).toLocaleString()}</span>
      </div>
      <div>
        <div>수익률</div>
        <RateWrap isRate={boolRate(account.assets, account.payments)}>
          {getRate(account.assets, account.payments)}
        </RateWrap>
      </div>
      <div>
        <div>계좌활성화</div>
        <AccountActivationDivWrap isActive={account.is_active}>{account.is_active ? '활성화' : '비활성화'}</AccountActivationDivWrap>
      </div>
      <div>
        <div>계좌개설일</div>
        <span>{getDateFormat(account.created_at)}</span>
      </div>
    </CardWrap>
  );
};

const CardWrap = styled(Card)`
  height: 100%;

  .ant-card-extra {
    padding: 0;
  }
`;
const AccountActivationDivWrap = styled.div`
  color: ${(props) => props.isActive ? 'red' : 'blue'}
`;

const RateWrap = styled.div`
  color: ${(props) => props.isRate === null ? 'black' : props.isRate ? 'red' : 'blue'}
`;