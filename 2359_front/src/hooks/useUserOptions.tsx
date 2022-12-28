import { useEffect, useState } from 'react';
import { baseAxios } from 'api';
import useSWR from 'swr';
import { ContentOptionProps, OptionCheckedProps } from 'types/interfaces';
import { converUserOptionToContent } from 'utilities/utils';

interface UserOptionsProps {
  createOption: OptionCheckedProps;
  firstLogin: boolean;
}

function useUserOptions() {
  const accessToken = localStorage.getItem('token') || '';
  const tempId = localStorage.getItem('tempId') || '';
  const [contentOptions, setContentOptions] = useState<ContentOptionProps[]>([]);

  const fetcher = async (url: string) => {
    const exceptTemp = url.split('/').slice(0, 4).join('/');
    const res = await baseAxios.get(exceptTemp, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  };
  // 조건부 가져오기 이용했습니다! => 공식문서 참고
  const { data, isLoading, mutate } = useSWR<UserOptionsProps>(
    accessToken ? `/api/user/option/${tempId}` : null,
    fetcher,
    {
      errorRetryInterval: 1000,
      errorRetryCount: 5,
      revalidateOnFocus: false,
      dedupingInterval: 6000000000,
      suspense: true,
    }
  );

  useEffect(() => {
    if (data) {
      const { createOption } = data;
      const mixedData = converUserOptionToContent(createOption);
      setContentOptions(mixedData);
    }
  }, [data]);

  return {
    contentOptions,
    setContentOptions,
    firstLogin: data && data.firstLogin,
    isLoading,
    mutate,
    initData: data && data.createOption,
  };
}

export { useUserOptions };
