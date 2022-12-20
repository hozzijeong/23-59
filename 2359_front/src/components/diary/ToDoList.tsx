import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todayTodo } from 'recoil/diaryAtom';
import { getCurrentDate } from 'utilities/getCurrentDate';
import tw from 'tailwind-styled-components';
import uuid from 'react-uuid';
import styled from 'styled-components';

function TodoList() {
  const [todoInput, setTodoInput] = useState<string>('');
  const [curTodo, setCurTodo] = useRecoilState(todayTodo);

  const addTodoHandler = () => {
    if (!todoInput.length) {
      alert('한 글자 이상 입력해주세요!');
      return;
    }
    setCurTodo((cur) => [...cur, { id: getCurrentDate(), done: false, item: todoInput }]);
    setTodoInput('');
  };

  const changeTodoInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoInput(value);
  };

  const changeTodoCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    console.log(id, curTodo, 123);
    const updateTodos = curTodo.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : { ...todo }));

    setCurTodo(updateTodos);
  };

  const todoDeleteHandler = (_event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setCurTodo((cur) => cur.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <ToDoHeader>
        <ToDoInput placeholder="할 일을 추가해주세요!" onChange={changeTodoInputHandler} value={todoInput} />
        <Button type="button" onClick={addTodoHandler}>
          추가하기
        </Button>
      </ToDoHeader>
      <div>
        <ul>
          {curTodo.map(({ id, done, item }) => {
            return (
              <LiContainer key={uuid()}>
                <TodoLabel htmlFor={id}>
                  <input id={id} type="checkbox" checked={done} onChange={changeTodoCheckHandler} />
                  <ToDoSpan isChecked={done}>{item}</ToDoSpan>
                </TodoLabel>
                <Button onClick={(event) => todoDeleteHandler(event, id)} type="button" marginRight="mr-2.5">
                  삭제하기
                </Button>
              </LiContainer>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { TodoList };

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

const Button = tw.button<{ marginRight?: 'mr-2.5' }>`
 flex-no-shrink 
 p-2 
 border-2 
 rounded 
 bg-primaryDark
 text-white 
 ${(props) => props.marginRight ?? ''}
 hover:bg-primaryDeepDark
`;

const LiContainer = tw.li`
  flex 
  mb-1
  items-center
  justify-between
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
`;

const Span = styled.span<{ isChecked: boolean }>`
  text-decoration: ${(props) => (props.isChecked ? 'line-through' : '')};
`;

const ToDoSpan = tw(Span)`
  w-full
  text-grey-darkest  
`;
