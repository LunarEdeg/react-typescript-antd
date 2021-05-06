interface actionProps {
  type: string;
}

export default function todos(state = {}, action: actionProps) {
  switch (action.type) {
    case 'ADD_TODO':
      return state;
    default:
      return state;
  }
}
