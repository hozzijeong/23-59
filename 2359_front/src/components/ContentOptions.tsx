import React from 'react';
import uuid from 'react-uuid';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { CONTENT_OPTION } from 'types/enumConverter';
import { ContentOptionProps } from 'types/interfaces';

interface UserOptionsProps {
  state: ContentOptionProps;
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LabelProps {
  textsize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  marginy?: 'my-0' | 'my-1' | 'my-2' | 'my-3' | 'my-4' | 'my-5' | 'my-6';
}

function UserOptions({ state, handler }: UserOptionsProps) {
  const { title, isChecked } = state;

  return (
    <OptionLabel key={uuid()} htmlFor={title} textsize="text-sm" marginy="my-1">
      <CustomCheckInput id={title} type="checkbox" onChange={handler} checked={isChecked} />
      <CustomCheckBox>{CONTENT_OPTION[title]}</CustomCheckBox>
    </OptionLabel>
  );
}

export { UserOptions, CustomCheckInput };

const OptionLabel = tw.label<LabelProps>`
  text-gray-500 
  leading-relaxed
  flex
  items-center
  ${(props) => props.textsize ?? 'text-lg'}
  ${(props) => props.marginy ?? 'my-0'}
`;

const CustomCheckInput = styled.input`
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 1px solid #bdb9b9;
  border-radius: 0.25rem;
  background-image: url("data:image/svg+xml,%3csvg viewBox='3.5 4 9 9' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  background-color: #bdb9b9;

  &:checked {
    border-color: transparent;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #706e6e;
    border: 1px solid #706e6e;

    &:hover {
      background-color: #575555;
    }
  }

  &:hover {
    background-color: #706e6e;
  }
`;

const CustomCheckBox = tw.span`
  ml-[0.5rem]
  hover:font-semibold	  
`;
