export default function changeLayout(state = 'main', action) {
  switch(action.type) {
    case "CHANGE_LAYOUT":
      return action.layout
    default:
      return state;
  }
};
