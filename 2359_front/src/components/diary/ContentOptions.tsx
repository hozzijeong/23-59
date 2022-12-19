import { ContentOptionProps } from 'pages/Diary';
import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
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
    return state.map(({ id, title }) => (
      <li key={id}>
        <input className="text-lg" id={id} type="checkbox" value={title} onChange={optionHandler} />
        <label htmlFor={id}>{title}</label>
      </li>
    ));
  }, [state, optionHandler]);

  const tableContents = useMemo(() => {
    const filterdContents = state.filter(({ isChecked }) => isChecked);
    return filterdContents.map(({ title }) => (
      <li key={title}>
        <a href={`#${title.replaceAll(' ', '-')}`}>{title}</a>
      </li>
    ));
  }, [state]);

  return (
    <RelativeDiv>
      <DiaryCheckOptionLayout isLeft component={contentCheckBox} />
      <DiaryCheckOptionLayout isLeft={false} component={tableContents} />
    </RelativeDiv>
  );
}

export default ContentOptions;

const RelativeDiv = tw.div`
  relative
`;
