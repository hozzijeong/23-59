import { useState } from 'react';
import { baseAxios } from 'api';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
import { OptionEnums } from 'types/enums';
import { ContentOptionProps, OptionCheckedProps } from 'types/interfaces';
import { converUserOptionToContent } from 'utilities/utils';

interface UserOptionsProps {
  createOption: OptionCheckedProps;
  firstLogin: boolean;
}

function useUserOptions() {
  const accessToken = localStorage.getItem('token') || '';
  const navigation = useNavigate();
  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>([]);

  // onSuccess 사용해서 성공시 데이터 맞추기.
  const { data, isLoading } = useSWR<UserOptionsProps>(
    '/api/user/option',
    () =>
      baseAxios
        .get('/api/user/option', {
          headers: {
            authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        const { createOption } = data;
        const mixedData = converUserOptionToContent(createOption);
        setContentOptions(mixedData);
      },
      errorRetryInterval: 1000,
      errorRetryCount: 5,
      onError: (error) => {
        alert(`${error}가 발생했습니다.`);
        // navigation('/login');
      },
      // revalidateOnMount: false,
      // revalidateOnFocus: false,
      // 데이터의 불변성을 보장하는 값들.
      // revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { contentOptions, setContentOptions, firstLogin: data?.firstLogin, isLoading };
}

export { useUserOptions };
