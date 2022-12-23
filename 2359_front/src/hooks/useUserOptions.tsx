import { useState } from 'react';
import { baseAxios } from 'api';
import { useNavigate } from 'react-router';
import useSWR from 'swr';
import { OptionEnums } from 'types/enums';
import { ContentOptionProps, OptionCheckedProps } from 'types/interfaces';

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
        console.log(createOption);
        const options = Object.keys(data.createOption).map((key) => ({ title: key as OptionEnums }));
        const mixedData = options.map((data) => ({ ...data, isChecked: createOption[data.title] }));
        setContentOptions(mixedData);
      },
      onError: () => {
        navigation('/login');
      },
      // revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  );

  return { contentOptions, setContentOptions, firstLogin: data?.firstLogin, isLoading };
}

export { useUserOptions };
