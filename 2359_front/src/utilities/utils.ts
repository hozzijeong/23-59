import React from 'react';
import { option } from 'types/enums';
import { OptionCheckedProps } from 'types/interfaces';

const converUserOptionToContent = (options: OptionCheckedProps) => {
  const optionKeys = Object.keys(options).map((key) => ({ title: key as option }));
  return optionKeys.map((data) => ({ ...data, isChecked: options[data.title] }));
};

const checkArrayAllFalse = (array: boolean[]) => array.every((data) => !data);

const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, callback: () => void) => {
  if (e.key === 'Enter') {
    callback(); // Enter 입력이 되면 클릭 이벤트 실행
  }
};

const convertDiaryTitleToKor = (YYYYMMDD: string) => {
  return `${YYYYMMDD?.slice(0, 4)}년 ${YYYYMMDD?.slice(4, 6)}월 ${YYYYMMDD?.slice(6, 8)}일 결산`;
};

export { converUserOptionToContent, checkArrayAllFalse, handleOnKeyDown, convertDiaryTitleToKor };
