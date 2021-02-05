import React, { useMemo } from "react";
import { useSelector } from "../../../store";

type ObjectIndexType = {
  [key: string]: number | undefined;
};

const TodoSummary = () => {
  const todos = useSelector((state) => state.todo.todos);

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
    <div className="p-3 relative border-b border-solid border-gray-200">
      <p className="text-base mx-0 mb-2">
        남은 TODO<span className="ml-2">{todos.length}개</span>
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
  );
};

export default TodoSummary;
