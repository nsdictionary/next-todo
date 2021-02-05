import { TodoType } from "../types/todo";

//* Action Type
export const INIT_TODO_LIST = "todo/INIT_TODO_LIST";

//* Action Creator
export const setTodo = (payload: TodoType[]) => {
  return {
    type: INIT_TODO_LIST,
    payload,
  };
};

export const todoActions = { setTodo };

export interface TodoReduxState {
  todos: TodoType[];
}

//* 초기 상태
const initialState: TodoReduxState = {
  todos: [],
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case INIT_TODO_LIST:
      const newState = { ...state, todos: action.payload };
      return newState;
    default:
      return state;
  }
}
