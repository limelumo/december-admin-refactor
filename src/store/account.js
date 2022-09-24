import { ACCOUNT_STATUS, BROKER_FORMAT, BROKERS } from '../utils/constants';

export default class Account {
  constructor(json) {
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
    //TODO foamatted number
    // const brokerFormat = BROKER_FORMAT?.[this.broker_id];
    // const piece = brokerFormat.split('-');
    // const a = `/^(\d{${piece[0].length}})(\d{${piece[1].length}})(\d{${piece[2].length}})$/`;

    // const expression = new RegExp(a);
    // let match = this.number.match(expression);

    return this.number;
  }
}
