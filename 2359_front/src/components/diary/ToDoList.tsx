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
    const updateTodos = curTodo.map((todo) => (todo.id === id ? { ...todo, isChecked: !todo.done } : { ...todo }));

    setCurTodo(updateTodos);
  };

  const todoDeleteHandler = (_event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setCurTodo((cur) => cur.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div>
        <input placeholder="할 일을 추가해주세요!" onChange={changeTodoInputHandler} value={todoInput} />
        <button type="button" onClick={addTodoHandler}>
          추가하기
        </button>
      </div>
      <div>
        <ul>
          {curTodo.map(({ id, done, item }) => {
            return (
              <li key={uuid()}>
                <label htmlFor={id}>
                  <input id={id} type="checkbox" defaultChecked={done} onChange={changeTodoCheckHandler} />
                  <Span isChecked={done}>{item}</Span>
                </label>
                <button onClick={(event) => todoDeleteHandler(event, id)} type="button">
                  삭제하기
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { TodoList };

const Span = styled.label<{ isChecked: boolean }>`
  text-decoration: ${(props) => (props.isChecked ? 'line-through' : '')};
`;
