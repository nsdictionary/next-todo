import React from "react";
import { useSelector } from "../../store";
import Todo from "./Sections/Todo";
import TodoSummary from "./Sections/TodoSummary";
import { ColorDiv } from "../../styles/GlobalStyle";

const TodoList: React.FC = () => {
  const todos = useSelector((state) => state.todo.todos);

  return (
    <ColorDiv className="w-full">
      <TodoSummary />
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </ColorDiv>
  );
};

export default TodoList;
