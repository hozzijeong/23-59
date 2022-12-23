import tw from 'tailwind-styled-components';

interface BtnProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  delete?: true;
}

const Container = tw.div`
w-full
flex
flex-col
justify-center
items-center
`;

const Form = tw.form`
mx-auto
flex
flex-col
items-start
p-12
border
rounded-2xl 
shadow-xl
`;

const FormTitle = tw.div`
  mb-3 text-2xl font-bold
  mx-auto
  mt-auto
  mb-4
  `;

const FormLabel = tw.div`
  text-lg
  `;

const FormInput = tw.input`
  outline-none focus:outline-none
  mx-auto
  mt-auto
  rounded-xl
  w-[220px]
  p-1.5
  mb-1
  `;

const SubmitButton = tw.button<BtnProps>`
w-full 
font-bold
hover:bg-primaryLight
active:translate-y-[0.125rem]
mt-[10px]
rounded-lg 
hover:shadow-lg
ease-linear 
transition-all 
duration-150
bg-primaryDark
px-3 py-1 text-base


${(props) => props.delete && `bg-[primary]`}
`;

const DeleteTag = tw.p`
mx-auto
mt-[5px]
cursor-pointer
hover:text-primaryDark
ease-linear 
transition-all 
duration-150
`;

const SignUpLink = tw.p`
  mx-auto
  mt-3 
  hover:text-primaryDark
  ease-linear
  transition-all 
  duration-150
`;

const ErrorMesg = tw.span`
text-[red]
`;

export { ErrorMesg, SubmitButton, FormInput, FormLabel, FormTitle, Form, Container, SignUpLink, DeleteTag };
