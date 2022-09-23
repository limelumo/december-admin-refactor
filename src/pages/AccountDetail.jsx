import { useQuery } from 'react-query';
import { useParams } from 'react-router';

// const accountStatus = { '관리자확인필요': 9999, 입금대기: 1, 운용중: 2, 투자중지: 3, 해지: 4 };
const ACCOUNT_STATUS = {
  9999: '관리자확인필요',
  1: '입금대기',
  2: '운용중',
  3: '투자중지',
  4: '해지',
  default: '알수없음',
};

const BROKERS = {
  209: '유안타증권',
  218: '현대증권',
  230: '미래에셋증권',
  238: '대우증권',
  240: '삼성증권',
  243: '한국투자증권',
  247: '우리투자증권',
  261: '교보증권',
  262: '하이투자증권',
  263: 'HMC투자증권',
  264: '키움증권',
  265: '이베스트투자증권',
  266: 'SK증권',
  267: '대신증권',
  268: '아이엠투자증권',
  269: '한화투자증권',
  270: '하나대투자증권',
  279: '동부증권',
  280: '유진투자증권',
  288: '카카오페이증권',
  287: '메리츠종합금융증권',
  290: '부국증권',
  291: '신영증권',
  292: 'LIG투자증권',
  271: '토스증권',
  default: '알수없는 증권사',
};

const BROKER_FORMAT = {
  209: '00-00000000-00',
  218: '00-0000000-000',
  230: '00-000000-0000',
  238: '00-000-0000-000',
  240: '00-0000-000000',
  243: '00-000000000-0',
  247: '00-0000-000000',
  261: '00-00-00000000',
  262: '00-0000000-000',
  263: '00-0000-000000',
  264: '00-0000-00-0000',
  265: '00-000-000-0000',
  266: '00-00000-00000',
  267: '00-000-0000000',
  268: '00-000000-00-00',
  269: '00-00000-00000',
  270: '00-000-0000000',
  279: '00-00000-00000',
  280: '00-0000-000000',
  288: '00-00000000-00',
  287: '00-0000-00000-0',
  290: '00-000000-0000',
  291: '00-0000-000000',
  292: '00-00000-00000',
  271: '00-000-0000000',
};

const AccountDetail = () => {
  const { account_id } = useParams();
  const { data } = useQuery(
    ['accounts', account_id],
    async () => {
      const res = await fetch(`http://localhost:4000/accounts/${account_id}`, {
        credentials: 'include',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvY2t5YjVAbmF2ZXIuY29tIiwiaWF0IjoxNjYzOTMwOTk3LCJleHAiOjE2NjM5MzQ1OTcsInN1YiI6IjEwNiJ9.QX-kLnx_fNDYyp1O9520czaIIHOrtOrbLu0G3jAb8YY`,
        },
      });
      const json = await res.json();
      return new Account(json);
    },
    {
      enabled: Boolean(account_id),
    }
  );

  console.log(data?.getFormattedNumber());

  return (
    <div>
      <h1>계좌 정보</h1>

      <div>
        <span>계좌 이름</span>
        <span>{data?.name}</span>
      </div>

      <div>
        <span>증권사</span>
        <span>{data?.getBroker()}</span>
      </div>

      <div>
        <span>계좌번호</span>
        <span>{data?.getMaskedNumber()}</span>
      </div>

      <div>
        <span>계좌상태</span>
        <span>{data?.getAccountStatus()}</span>
      </div>

      <div>
        <span>평가금액</span>
        <span>{data?.getAssets()}</span>
      </div>

      <div>
        <span>입금금액</span>
        <span>{data?.getPayments()}</span>
      </div>

      <div>
        <span>계좌 활성화 여부</span>
        <span>{data?.getActiveStatus()}</span>
      </div>

      <div>
        <span>계좌 개설일</span>
        <span>{data?.getCreatedTime()}</span>
      </div>
    </div>
  );
};

export default AccountDetail;

class Account {
  constructor(json) {
    console.log(json);
    const { broker_id, name, status, updated_at, payments, created_at, is_active, number, assets } = json || {};
    this.broker_id = broker_id;
    this.name = name;
    this.status = status;
    this.updated_at = updated_at;
    this.payments = payments;
    this.created_at = new Date(created_at);
    this.is_active = is_active;
    this.number = number;
    this.assets = assets;
  }

  getCreatedTime() {
    return this.created_at.toLocaleString();
  }

  getPayments() {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KWR' }).format(this.payments);
  }

  getAssets() {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KWR' }).format(this.assets);
  }

  getAccountStatus() {
    return ACCOUNT_STATUS?.[this.status] ?? ACCOUNT_STATUS.default;
  }

  getBroker() {
    return BROKERS?.[this.broker_id] ?? BROKERS.default;
  }

  getActiveStatus() {
    return this.is_active ? '활성화' : '비활성화';
  }

  getMaskedNumber() {
    const stringifiedNumber = String(this.number);
    const length = stringifiedNumber.length;

    const prefix = stringifiedNumber.substring(0, 2);
    const body = '*'.repeat(length - 4);
    const postfix = stringifiedNumber.substring(length - 2, length);

    return prefix + body + postfix;
  }

  getFormattedNumber() {
    const brokerFormat = BROKER_FORMAT?.[this.broker_id];
    const piece = brokerFormat.split('-');
    const a = `/^(\d{${piece[0].length}})(\d{${piece[1].length}})(\d{${piece[2].length}})$/`;

    const expression = new RegExp(a);
    console.log(expression);
    let match = this.number.match(expression);

    console.log(match);
    return;
  }
}
