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
    setCurTodo((cur) => ({ ...cur, todos: [...cur.todos, { isChecked: false, todoContent: todoInput }] }));
    setTodoInput('');
  };

  const changeTodoInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTodoInput(value);
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
          {curTodo.todos.map(({ isChecked, todoContent }) => {
            return (
              <li>
                <input id={todoContent} type="checkbox" checked={isChecked} />
                <label htmlFor={todoContent}>{todoContent}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
