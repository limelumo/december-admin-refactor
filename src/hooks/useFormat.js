import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accountsState, usersDataState, userSettingDataState } from 'store/userList';
import { formatUsersData } from 'utils/formatUsersData';

const useFormat = (res) => {
  const userSettingData = useRecoilValue(userSettingDataState);
  const accountsData = useRecoilValue(accountsState);

  const setUsersData = useSetRecoilState(usersDataState);

  const getFormatData = () => {
    const accountsUserId = accountsData.map((el) => el.user_id);
    const accountsMatched = accountsUserId.reduce((accu, curr) => {
      accu[curr] = (accu[curr] || 0) + 1;
      return accu;
    }, {});

    setUsersData(
      res.data?.map((user) => {
        return {
          is_active: userSettingData?.find((el) => el.uuid === user.uuid)?.is_active,
          is_staff: userSettingData?.find((el) => el.uuid === user.uuid)?.is_staff,
          allow_marketing_push: userSettingData?.find((el) => el.uuid === user.uuid)?.allow_marketing_push,
          account_count: accountsMatched[user.id],
          ...formatUsersData(user),
        };
      })
    );
  };

  return { getFormatData };
};
export default useFormat;
