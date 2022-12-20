import React from 'react';
import tw from 'tailwind-styled-components';

interface BtnProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  btntype?: 'basic' | 'save' | 'cancel';
  btnsize?: 'sm' | 'base' | 'lg';
  disabled?: boolean;
}

function Button({ children, onClick, btntype, btnsize, disabled }: BtnProps) {
  return (
    <MyButton onClick={onClick} disabled={disabled} btntype={btntype} btnsize={btnsize}>
      {children}
    </MyButton>
  );
}

export default Button;

Button.defaultProps = {
  children: '',
  onClick: null,
  btntype: 'basic',
  btnsize: 'base',
  disabled: false,
};

const MyButton = tw.button<BtnProps>`
border-none
rounded-lg 
hover:shadow-lg
ease-linear 
transition-all 
duration-150
${(props) => props.btntype === 'basic' && `bg-primary`}
${(props) => props.btntype === 'save' && `bg-primaryDark`}
${(props) => props.btntype === 'cancel' && `bg-primaryLight`}

${(props) => props.btnsize === 'sm' && `px-3 py-1 text-sm`}
${(props) => props.btnsize === 'base' && `px-3 py-1 text-base`}
${(props) => props.btnsize === 'lg' && `px-4 py-2 text-lg`}
`;
