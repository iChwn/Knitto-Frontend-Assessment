type Todo = {
  count: number;
}

type State = {
  todo: Todo;
}

export const sampleSelector = (state:State) => state.todo.count;
