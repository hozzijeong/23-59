import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const DiarySection = tw.section`
  w-full
`;

const HeadContent = tw.div`
  max-w-screen-md
  my-0
  mx-auto
  pt-[8rem]
`;
const Content = tw.div`
  max-w-screen-md
  my-0
  mx-auto
  text-[1.8rem]
`;

const Title = tw.p`
  text-[4.8rem]
  font-extrabold
  break-keep	
`;

const RelativeDiv = tw.div`
  relative
`;

interface AbsoluteProps {
  isLeft: boolean;
}

const AbsoluteDiv = tw.div<AbsoluteProps>`
  absolute
  ${(props) => (props.isLeft ? 'left-[-12rem]' : 'right-0')}
`;

const Ullists = styled.ul`
  li {
    display: flex;
    align-content: center;
    font-size: 1.4rem;
  }
`;

const FixedUl = tw(Ullists)`
  fixed
`;

interface ContentOption {
  id: string;
  content: string;
  isChecked: boolean;
}

const TEMP_DATA: ContentOption[] = [
  { id: '1', content: 'To-Do-List', isChecked: false },
  { id: '2', content: '오늘의 질문', isChecked: false },
  { id: '3', content: '감정 일기', isChecked: false },
  { id: '4', content: '가계부', isChecked: false },
];

function Diary() {
  const [contentOptions, setContentOptions] = useState<ContentOption[]>(TEMP_DATA);
  const optionHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id } = event.target;
      setContentOptions((currentOptions) =>
        currentOptions.map((options) => (options.id === id ? { ...options, isChecked: !options.isChecked } : options))
      );
    },
    [contentOptions]
  );

  const contentCheckBox = useMemo(() => {
    return contentOptions.map(({ id, content }) => (
      <li key={id}>
        <input className="text-2rem" id={id} type="checkbox" value={content} onChange={optionHandler} />
        <label htmlFor={id}>{content}</label>
      </li>
    ));
  }, [contentOptions]);

  const tableContents = useMemo(() => {
    const filterdContents = contentOptions.filter(({ isChecked }) => isChecked);
    return filterdContents.map(({ content }) => (
      <li>
        <a href={`#${content}`}>{content}</a>
      </li>
    ));
  }, [contentOptions]);

  return (
    <DiarySection>
      <HeadContent>
        <Title>title</Title>
        <RelativeDiv>
          <AbsoluteDiv isLeft>
            <FixedUl>{contentCheckBox}</FixedUl>
          </AbsoluteDiv>
          <AbsoluteDiv isLeft={false}>
            <FixedUl>{tableContents}</FixedUl>
          </AbsoluteDiv>
        </RelativeDiv>
      </HeadContent>
      <Content>
        {contentOptions.every((options) => options.isChecked === false) ? '좌측 옵션을 선택해주세요' : 'MyDiary'}
      </Content>
    </DiarySection>
  );
}

export default Diary;
