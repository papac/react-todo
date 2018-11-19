import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  MARK_ALL,
  UPDATE_FIELD_EDITOR,
  FILTER_BY_PROGRESS,
  FILTER_BY_COMPLETED
} from "../constances/actionTypes"

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case DELETE_TODO:
      return state.filter((todo, index) => index !== action.index);
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        return {
          ...todo, 
          completed: index === action.index ? !todo.completed  : todo.completed 
        };
      });
    case UPDATE_FIELD_EDITOR:
    const { text } = action;
      return Object.assign({}, state, { text });
    case MARK_ALL:
      return state.map(todo => {
        const completed = !todo.completed;
        return {...todo, completed}
      });
    case FILTER_BY_COMPLETED:
      return state.filter(todo => todo.completed);
    case FILTER_BY_PROGRESS:
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}