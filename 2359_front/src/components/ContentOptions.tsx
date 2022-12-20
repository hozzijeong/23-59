import React from 'react';
import uuid from 'react-uuid';
import tw from 'tailwind-styled-components';
import { CONTENT_OPTION } from 'types/enumConverter';
import { ContentOptionProps } from 'types/interfaces';

interface UserOptionsProps {
  state: ContentOptionProps;
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LabelProps {
  textSize?: 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl';
  marginY?: 'my-0' | 'my-1' | 'my-2' | 'my-3' | 'my-4' | 'my-5' | 'my-6';
}

function UserOptions({ state, handler }: UserOptionsProps) {
  const { id, title, isChecked } = state;

  return (
    <OptionLabel key={uuid()} htmlFor={id} textSize="text-sm" marginY="my-1">
      <input className="text-lg" id={id} type="checkbox" onChange={handler} checked={isChecked} />
      <span className="ml-2">{CONTENT_OPTION[title]}</span>
    </OptionLabel>
  );
}

export { UserOptions };

export const OptionLabel = tw.label<LabelProps>`
  text-gray-500 
  leading-relaxed
  flex
  items-center
  ${(props) => props.textSize ?? 'text-lg'}
  ${(props) => props.marginY ?? 'my-0'}
`;
