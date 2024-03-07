import styled from "styled-components";
import axios from 'axios';
import { useQuery } from 'react-query';
import Todo from "../Todo/Todo";

type TodoType = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
}

interface TodoListProps {
  isActive: boolean;
}

function TodoList({ isActive }: TodoListProps) {
  const { data: todos, isLoading, isError } = useQuery('todos', () =>
    axios.get('http://localhost:4000/todos').then(res => res.data)
  );

  return (
    <StyledDiv>
      <StyledTodoListHeader>
        <h2>{isActive ? "🔥Working...🔥" : "✅Done✅"}</h2>
      </StyledTodoListHeader>
      <StyledTodoListBox>
        {isLoading ? (
        "Loading..."
      ) : isError ? (
        "An error has occurred"
      ) : (
        todos?.filter((item: TodoType) => item.isDone === !isActive).map((item: TodoType) => (
          <Todo key={item.id} todo={item} isActive={isActive} />
        ))
      )}
      </StyledTodoListBox>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 20px;
`;

const StyledTodoListHeader = styled.h3`
  font-size: 15px;
  font-weight: 500;
`;

const StyledTodoListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default TodoList;
