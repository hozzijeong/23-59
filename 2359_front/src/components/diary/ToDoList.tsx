import React, { useState } from 'react';
import { getCurrentDate } from 'utilities/getCurrentDate';
import tw from 'tailwind-styled-components';
import uuid from 'react-uuid';
import styled from 'styled-components';
import { CustomCheckInput } from 'components/ContentOptions';
import { DiaryComponentPrpos } from 'types/interfaces';
import { DiaryMode } from 'types/enums';
import { useRecoilState } from 'recoil';
import { todayTodo } from 'recoil/diaryAtom';

function TodoList({ todayDiary }: DiaryComponentPrpos) {
  const [todoInput, setTodoInput] = useState<string>('');
  const { diaryMode } = todayDiary;
  const [todo, setTodo] = useRecoilState(todayTodo);

  const addTodoHandler = () => {
    if (!todoInput.length) {
      alert('한 글자 이상 입력해주세요!');
      return;
    }

    setTodo((prev) => [...prev, { id: getCurrentDate(), done: false, item: todoInput }]);
    setTodoInput('');
  };

  const changeTodoInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoInput(value);
  };

  const changeTodoCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    const updateTodos = todo.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : { ...todo }));

    setTodo(updateTodos);
  };

  const todoDeleteHandler = (_event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setTodo([...todo.filter((todo) => todo.id !== id)]);
  };
  return (
    <div>
      {diaryMode === DiaryMode.READ ? (
        <ul>
          {todo.map(({ done, item }) => {
            return (
              <LiContainer key={uuid()}>
                <ToDoSpan isChecked={done}>{item}</ToDoSpan>
              </LiContainer>
            );
          })}
        </ul>
      ) : (
        <>
          <ToDoHeader>
            <ToDoInput placeholder="할 일을 추가해주세요!" onChange={changeTodoInputHandler} value={todoInput} />
            <Button type="button" onClick={addTodoHandler}>
              추가하기
            </Button>
          </ToDoHeader>
          <div>
            <ul>
              {todo.map(({ id, done, item }) => {
                return (
                  <LiContainer key={uuid()}>
                    <TodoLabel htmlFor={id}>
                      <CheckBox id={id} type="checkbox" checked={done} onChange={changeTodoCheckHandler} />
                      <ToDoSpan isChecked={done}>{item}</ToDoSpan>
                    </TodoLabel>
                    <Button onClick={(event) => todoDeleteHandler(event, id)} type="button">
                      삭제하기
                    </Button>
                  </LiContainer>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export { TodoList, Button };

const ToDoHeader = tw.div`
  mb-3  
`;

const ToDoInput = tw.input`
  shadow 
  appearance-none 
  border 
  rounded 
  w-10/12 
  py-2 
  px-3 
  mr-4 
  text-grey-darker
`;

const Button = tw.button`
 flex-no-shrink 
 p-1 
 border-2 
 rounded 
 bg-primaryDark
 text-white 
 hover:bg-primaryDeepDark
`;

const LiContainer = tw.li`
  flex 
  mb-1
  items-center
`;

const Label = styled.label`
  input {
    margin-right: 8px;
  }
`;

const TodoLabel = tw(Label)`
  py-2 
  px-3 
  mr-4
  w-10/12
  text-lg
`;

const CheckBox = tw(CustomCheckInput)`
  w-4
  h-4  
`;

const Span = styled.span<{ isChecked: boolean }>`
  text-decoration: ${(props) => (props.isChecked ? 'line-through' : '')};
`;

const ToDoSpan = tw(Span)`
  w-full
  text-grey-darkest
  ml-[0.5rem]
  hover:font-semibold	 
`;
