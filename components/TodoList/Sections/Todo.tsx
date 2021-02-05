import React from "react";
import { useDispatch } from "react-redux";
import TrashCanIcon from "../../../public/static/svg/trash_can.svg";
import CheckMarkIcon from "../../../public/static/svg/check_mark.svg";
import { checkTodoAPI, deleteTodoAPI } from "../../../lib/api/todo";
import { todoActions } from "../../../store/todo";
import { TodoType } from "../../../types/todo";
import { useSelector } from "../../../store";

interface IProps {
  todo: TodoType;
}

const Todo: React.FC<IProps> = ({ todo }) => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const checkTodo = async (id: number) => {
    try {
      await checkTodoAPI(id);
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });

      dispatch(todoActions.setTodo(newTodos));
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoAPI(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      dispatch(todoActions.setTodo(newTodos));
      console.log("삭제했습니다.");
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
  );
};

export default Todo;
