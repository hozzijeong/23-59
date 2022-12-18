import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

const tagData: string[] = ['#슬픔', '#기쁨', '#행복', '#죽음', '#공부', '#연애', '#사랑', '#고민', '#걱정'];

interface IData {
  [key: string]: boolean;
}

const newData: IData = {};
const setData = (): void => {
  tagData.forEach((item) => {
    newData[item] = true;
  });
};
setData();
console.log('newData', newData);
// 생각해볼 키워드!
// 그냥 Object면... 내가 누른거의 key값을 받아오면 그걸로 파악할수있지 않나?
// 객체가 아니라 배열로 관리 하면 괜찮?

function CollectQuestion() {
  const [isSelect, setIsSelect] = useState(newData);

  const handleTagName = (item: string): void => {
    const newSelect = { ...isSelect };
    newSelect[item] = !newSelect[item];
    setIsSelect(newSelect);
    console.log('newSelect', newSelect);
  };

  const selectedTag = (ele: string): string => {
    if (isSelect[ele]) {
      return selectBtnClass;
    }
    return nonSelectBtnClass;
  };

  return (
    <div>
      <div>오늘의 질문 모아보기</div>
      <div>
        {tagData.map((item) => {
          return (
            <TagButtons className={selectedTag(item)} key={item} type="button" onClick={() => handleTagName(item)}>
              {item}
            </TagButtons>
          );
        })}
      </div>
      <div>질문 보여주는 영역</div>
    </div>
  );
}

export default CollectQuestion;

const TagButtons = tw.button`
  mr-3
`;

const selectBtnClass = `
  inline-block px-2.5 py-1 bg-blue-600 text-white font-medium text-xs leading-tight rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg 
  mr-3
`;

const nonSelectBtnClass = `
  inline-block px-2.5 py-1 text-blue font-medium text-xs leading-tight rounded-xl shadow-md hover:shadow-lg hover:bg-neutral-300
  mr-3
`;
// 참고 사항
// focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg
// active:bg-blue-800 active:shadow-lg
