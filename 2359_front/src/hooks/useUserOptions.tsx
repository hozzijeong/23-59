import { useEffect, useState } from 'react';
import { baseAxios } from 'api';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
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

  const fetcher = async (url: string) => {
    const res = await baseAxios.get(url, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  };

  // onSuccess 사용해서 성공시 데이터 맞추기.
  // 조건부 가져오기 이용했습니다! => 공식문서 참고
  const { data, isLoading } = useSWR<UserOptionsProps>(accessToken ? '/api/user/option' : null, fetcher, {
    errorRetryInterval: 1000,
    errorRetryCount: 5,
    onError: (error) => {
      console.log(`${error}가 발생했습니다.`);
      // navigation('/login');
    },
    revalidateOnMount: false,
    revalidateOnFocus: false,
    // 데이터의 불변성을 보장하는 값들.
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (data) {
      const { createOption } = data;
      const mixedData = converUserOptionToContent(createOption);
      setContentOptions(mixedData);
    }
  }, [data]);
  return { contentOptions, setContentOptions, firstLogin: data?.firstLogin, isLoading };
}

export { useUserOptions };
