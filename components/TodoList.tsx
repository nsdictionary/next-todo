import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { TodoType } from "../types/todo";
import palette from "../styles/palette";

const Container = styled.div`
  width: 100%;

  .todo-num {
    margin-left: 12px;
  }

  .todo-list-header {
    padding: 12px;
    position: relative;
    border-bottom: 1px solid ${palette.gray};

    .todo-list-last-todo {
      font-size: 14px;
      margin: 0 0 8px;

      span {
        margin-left: 12px;
      }
    }

    .todo-list-header-colors {
      display: flex;

      .todo-list-header-color-num {
        display: flex;
        margin-right: 8px;

        p {
          font-size: 14px;
          line-height: 16px;
          margin: 0 0 0 6px;
        }

        .todo-list-header-round-color {
          width: 16px;
          height: 16px;
          border-radius: 50%;
        }
      }
    }
  }

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

  .todo-list {
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 52px;
      border-bottom: 1px solid ${palette.gray};

      .todo-left-side {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .todo-color-block {
          width: 12px;
          height: 100%;
        }
        .checked-todo-text {
          color: ${palette.gray};
          text-decoration: line-through;
        }
        .todo-text {
          margin-left: 12px;
          font-size: 16px;
        }
      }
    }
  }
`;

interface IProps {
  todos: TodoType[];
}

type ObjectIndexType = {
  [key: string]: number | undefined;
};

const TodoList: React.FC<IProps> = ({ todos }) => {
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
    todos.forEach((todo) => {
      const value = colors[todo.color];
      if (!value) {
        colors[`${todo.color}`] = 1;
      } else {
        colors[`${todo.color}`] = value + 1;
      }
    });
    return colors;
  }, [todos]);

  return (
    <Container>
      <div className="todo-list-header">
        <p className="todo-list-last-todo">
          남은 TODO<span>{todos.length}개</span>
        </p>
        <div className="todo-list-header-colors">
          {Object.keys(todoColorNums).map((color, index) => (
            <div className="todo-list-header-color-num" key={index}>
              <div className={`todo-list-header-round-color bg-${color}`} />
              <p>{todoColorNums[color]}개</p>
            </div>
          ))}
        </div>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <div className="todo-left-side">
              <div className={`todo-color-block bg-${todo.color}`} />
              <p
                className={`todo-text ${
                  todo.checked ? "checked-todo-text" : ""
                }`}
              >
                {todo.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default TodoList;
