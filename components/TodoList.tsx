import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { TodoType } from "../types/todo";
import palette from "../styles/palette";
import TrashCanIcon from "../public/static/svg/trash_can.svg";
import CheckMarkIcon from "../public/static/svg/check_mark.svg";
import { checkTodoAPI, deleteTodoAPI } from "../lib/api/todo";

const Container = styled.div`
  .bg-blue {
    background-color: ${palette.blue};
  }
  .bg-green {
    background-color: ${palette.green};
  }
  .bg-navy {
    background-color: ${palette.navy};
  }
  .bg-orange {
    background-color: ${palette.orange};
  }
  .bg-red {
    background-color: ${palette.red};
  }
  .bg-yellow {
    background-color: ${palette.yellow};
  }
`;

interface IProps {
  todos: TodoType[];
}

type ObjectIndexType = {
  [key: string]: number | undefined;
};

const TodoList: React.FC<IProps> = ({ todos }) => {
  const router = useRouter();
  const [localTodos, setLocalTodos] = useState<TodoType[]>(todos);

  //* 색깔 객체 구하기 1
  const getTodoColorNums = useCallback(() => {
    const colorNums = {
      red: 0,
      orange: 0,
      yellow: 0,
      green: 0,
      blue: 0,
      navy: 0,
    };

    todos.forEach((todo) => {
      colorNums[todo.color] += 1;
    });

    return colorNums;
  }, [todos]);

  //* 색깔 객체 구하기 2 : 정해진 색상 이외의 색상도 허용
  const todoColorNums = useMemo(() => {
    const colors: ObjectIndexType = {};
    localTodos.forEach((todo) => {
      const value = colors[todo.color];
      if (!value) {
        colors[`${todo.color}`] = 1;
      } else {
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  //* 투두 체크하기
  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      console.log("check complete");

      //* 1. 리프레시: 가장 비효율적
      // await router.reload();

      //* 2. 클라사이드 네비게이션: SSR로 데이터 갱신
      // await router.push("/");

      //* 3. useState 사용
      const newTodos = localTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
      setLocalTodos(newTodos);
    } catch (e) {
      console.log(e);
    }
  };

  //*투두 삭제하기
  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setLocalTodos(newTodos);
      console.log("삭제했습니다.");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="w-full">
      <div className="p-3 relative border-b border-solid border-gray-200">
        <p className="text-base mx-0 mb-2">
          남은 TODO<span className="ml-2">{localTodos.length}개</span>
        </p>
        <div className="flex">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="flex mr-2" key={index}>
              <div className={`w-4 h-4 rounded-full bg-${color}`} />
              <p className="text-base leading-4 m-0 ml-1">
                {todoColorNums[color]}개
              </p>
            </div>
          ))}
        </div>
      </div>
      <ul>
        {localTodos.map((todo) => (
          <li
            className="flex justify-between items-center w-full h-12 border-b border-solid border-gray-200"
            key={todo.id}
          >
            <div className="w-full h-full flex items-center">
              <div className={`w-4 h-full bg-${todo.color}`} />
              <p
                className={`ml-3 text-base ${
                  todo.checked ? "text-gray-200 line-through" : ""
                }`}
              >
                {todo.text}
              </p>
            </div>
            <div className="flex items-center mr-4">
              {todo.checked && (
                <>
                  <TrashCanIcon
                    className="mr-4 w-4 h-4"
                    onClick={() => deleteTodo(todo.id)}
                  />
                  <CheckMarkIcon
                    className="w-6 h-6"
                    onClick={() => checkTodo(todo.id)}
                  />
                </>
              )}
              {!todo.checked && (
                <button
                  type="button"
                  className="w-6 h-6 border-2 border-solid border-gray-200 rounded-full bg-transparent outline-none"
                  onClick={() => checkTodo(todo.id)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
