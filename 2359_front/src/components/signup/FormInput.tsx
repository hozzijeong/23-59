// import React, { FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';
// import * as SC from './FormStyled';
// /* eslint-disable react/jsx-props-no-spreading */

// interface InputProps {
//   label: string;
//   id: string;
//   inputProps?: any;
// }

// function FormInput({ label, id, ...inputProps }: InputProps): any {
//   <>
//     <SC.FormLabel>{label}</SC.FormLabel>
//     <SC.FormInput id={id} {...inputProps} />
//   </>;
// }

// export default FormInput;

{
  /* <FormInput
label="email"
id="email"
{...register('email', {
  required: '필수 응답 항목입니다.',
  pattern: { value: emailCheck, message: '이메일 형식이 아닙니다.' },
})}
/> */
}

// import React, { FC, forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

// export type InputType = 'text' | 'email';

// export type InputProps = {
//   id: string;
//   name: string;
//   label: string;
//   type?: string;
// } & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

// export function Input({ id, name, label, type, placeholder, ...props}, ref){
//     return <input id={id} ref={ref} name={name} type={type} placeholder={placeholder} {...props} />;
//   };

export {}; //아직 구현 생각 중.
