import Input from "../components/Input/Input";
import TodoList from "../components/TodoList/TodoList";

function Main() {
  return (
    <>
      <Input />
      <TodoList isActive={true} />
      <TodoList isActive={false} />
    </>
  );
}

export default Main;
