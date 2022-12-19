import { ContentOptionProps, CONTENT_OPTION } from 'pages/Diary';
import React, { useMemo, useCallback } from 'react';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import DiaryCheckOptionLayout from './Layout/DiaryCheckOptionLayout';

interface ContentOptionsProps {
  state: ContentOptionProps[];
  setState: React.Dispatch<React.SetStateAction<ContentOptionProps[]>>;
}

function ContentOptions({ state, setState }: ContentOptionsProps) {
  const optionHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id } = event.target;
      setState((currentOptions) =>
        currentOptions.map((options) => (options.id === id ? { ...options, isChecked: !options.isChecked } : options))
      );
    },
    [setState]
  );

  const contentCheckBox = useMemo(() => {
    return state.map(({ id, title, isChecked }) => (
      <li key={uuid()}>
        <input className="text-lg" id={id} type="checkbox" onChange={optionHandler} checked={isChecked} />
        <label htmlFor={id}>{CONTENT_OPTION[title]}</label>
      </li>
    ));
  }, [state, optionHandler]);

  const tableContents = useMemo(() => {
    const filterdContents = state.filter(({ isChecked }) => isChecked);
    const titles = filterdContents.map(({ title }) => CONTENT_OPTION[title]);
    return titles.map((title) => (
      <li key={uuid()}>
        <a href={`#${title.replaceAll(' ', '-')}`}>{title}</a>
      </li>
    ));
  }, [state]);

  return (
    <RelativeDiv>
      <DiaryCheckOptionLayout isleft component={contentCheckBox} />
      <DiaryCheckOptionLayout isleft={false} component={tableContents} />
    </RelativeDiv>
  );
}

export default ContentOptions;

const RelativeDiv = tw.div`
  relative
`;
