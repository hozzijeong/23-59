import React from 'react';
import tw from 'tailwind-styled-components';

interface TooltipProps {
  text?: string;
}

function Tooltip({ text }: TooltipProps) {
  return (
    <div>
      <TooltipButton type="button">
        <span>?</span>
        <TooltipContent>{text}</TooltipContent>
      </TooltipButton>
    </div>
  );
}

export default Tooltip;

Tooltip.defaultProps = {
  text: 'tooltip 내용을 넣어주세요',
};

const TooltipButton = tw.button`
group
relative 
inline-block 
px-2
h-full
w-full
bg-primaryDark 
rounded-full 
text-white 
shadow
hover:shadow-lg
ease-linear 
transition-all 
duration-300
`;

const TooltipContent = tw.div`
absolute 
hidden 
group-hover:flex
inset-x-0
-top-2
-translate-y-full 
w-52
px-2
py-2
bg-gray-500
rounded-lg 
text-center 
text-white 
text-sm 
whitespace-pre-wrap
after:content-[''] 
after:absolute 
after:left-3.5
after:top-[99%] 
after:-translate-x-1/2 
after:border-8 
after:border-x-transparent 
after:border-b-transparent 
after:border-t-gray-500
`;
