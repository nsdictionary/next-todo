import React, { useState } from "react";
import { useRouter } from "next/router";
import BrushIcon from "../public/static/svg/brush.svg";
import { TodoType } from "../types/todo";
import { addTodoAPI } from "../lib/api/todo";
import { ColorDiv } from "../styles/GlobalStyle";

const AddTodo: React.FC = () => {
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState<TodoType["color"]>();
  const router = useRouter();

  //*투두 추가하기
  const addTodo = async () => {
    try {
      if (!text || !selectedColor) {
        alert("색상과 할일을 입력해주세요.");
        return;
      }
      await addTodoAPI({ text, color: selectedColor });
      await router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ColorDiv className="p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Add Todo</h1>
        <button
          type="button"
          className="py-0.5 px-1 border border-solid border-black rounded-lg bg-white outline-none text-base"
          onClick={addTodo}
        >
          추가하기
        </button>
      </div>
      <div className="w-full mt-3 flex justify-between">
        <div className="flex">
          {["red", "orange", "yellow", "green", "blue", "navy"].map(
            (color, index) => (
              <button
                type="button"
                className={`bg-${color} w-6 h-6 rounded-full mr-3 border-0 outline-none focus:outline-none ${
                  color === selectedColor
                    ? "border-2 border-solid border-black"
                    : ""
                }`}
                key={index}
                onClick={() => setSelectedColor(color as TodoType["color"])}
              />
            )
          )}
        </div>
        <BrushIcon />
      </div>
      <textarea
        value={text}
        className="text-lg w-full h-72 border border-gray-200 rounded-lg mt-3 resize-none outline-none p-3"
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="할 일을 입력해 주세요."
      />
    </ColorDiv>
  );
};

export default AddTodo;
