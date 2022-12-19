import tw from 'tailwind-styled-components';

const Container = tw.div`
flex
justify-center
items-center
w-auto
border
border-[red]
`;

const Form = tw.form`
mx-auto
flex
flex-col
items-start
p-12
border
border-[#3F51A2]
`;

const FormTitle = tw.div`
  text-4xl
  mx-auto
  mt-auto
  flex
  justify-center
  items-center
  mb-4
  `;

const FormLabel = tw.div`
  text-xl
  `;

const FormInput = tw.input`
  mx-auto
  mt-auto
  rounded-xl
  w-[220px]
  p-1.5
  mb-2
  `;

const SubmitButton = tw.button`
mx-auto
mt-5
bg-[#A69B97]  rounded-[10px]
text-2xl
w-40

`;

const ErrorMesg = tw.span`
text-[red]
`;

export { ErrorMesg, SubmitButton, FormInput, FormLabel, FormTitle, Form, Container };
