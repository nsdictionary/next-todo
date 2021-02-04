import React from "react";
import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { TodoType } from "../types/todo";

const todos: TodoType[] = [
  { id: 5, text: "요리 연습하기", color: "blue", checked: false },
  { id: 6, text: "분리수거 하기", color: "navy", checked: false },
  { id: 7, text: "마트가서 장보기", color: "red", checked: true },
  { id: 8, text: "마트가서 장보기", color: "red", checked: true },
  { id: 9, text: "마트가서 장보기", color: "blue", checked: false },
];

const index: NextPage = () => {
  return <TodoList todos={todos} />;
};

export default index;
