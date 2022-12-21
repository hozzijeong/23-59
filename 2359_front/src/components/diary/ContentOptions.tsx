import { UserOptions } from 'components/ContentOptions';
import React, { useMemo, useCallback } from 'react';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import { CONTENT_OPTION } from 'types/enumConverter';
import { ContentOptionsProps } from 'types/interfaces';
import { DiaryCheckOptionLayout } from './Layout/DiaryCheckOptionLayout';

function ContentOptions({ state, setState }: ContentOptionsProps) {
  // option Handler 추가로 구현하기.
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
    return state.map((option) => <UserOptions state={option} handler={optionHandler} />);
  }, [state, optionHandler]);

  const tableContents = useMemo(() => {
    const filterdContents = state.filter(({ isChecked }) => isChecked);
    const titles = filterdContents.map(({ title }) => CONTENT_OPTION[title]);
    return titles.map((title) => (
      <TableContentSpan key={uuid()} className="">
        <a href={`#${title.replaceAll(' ', '-')}`}>{title}</a>
      </TableContentSpan>
    ));
  }, [state]);

  return (
    <RelativeDiv>
      <DiaryCheckOptionLayout isleft component={contentCheckBox} />
      <DiaryCheckOptionLayout isleft={false} component={tableContents} />
    </RelativeDiv>
  );
}

export { ContentOptions };

const RelativeDiv = tw.div`
  relative
`;

const TableContentSpan = tw.span`
  text-sm 
  my-1
  hover:font-semibold
  hover:underline
`;
