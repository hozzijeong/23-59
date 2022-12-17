import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { diaryAtom } from 'recoil/diaryAtom';
import tw from 'tailwind-styled-components';

function TodoList() {
  const [todoInput, setTodoInput] = useState<string>('');
  const [curTodo, setCurTodo] = useRecoilState(diaryAtom);

  const addTodoHandler = () => {
    if (!todoInput.length) {
      alert('한 글자 이상 입력해주세요!');
      return;
    }
    const date = Date.now();
    setCurTodo((cur) => ({
      ...cur,
      todos: [...cur.todos, { id: date.toString(10), isChecked: false, todoContent: todoInput }],
    }));
    setTodoInput('');
  };

  const changeTodoInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoInput(value);
  };

  const changeTodoCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    const { todos } = curTodo;
    const updateTodos = todos.map((todo) => (todo.id === id ? { ...todo, isChecked: !todo.isChecked } : { ...todo }));

    setCurTodo((cur) => ({ ...cur, todos: updateTodos }));
  };

  const todoDeleteHandler = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setCurTodo((cur) => ({ ...cur, todos: cur.todos.filter((todo) => todo.id !== id) }));
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
          {curTodo.todos.map(({ id, isChecked, todoContent }) => {
            return (
              <li key={id}>
                <input id={id} type="checkbox" defaultChecked={isChecked} onChange={changeTodoCheckHandler} />
                <label htmlFor={id}>{todoContent}</label>
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

export default TodoList;
