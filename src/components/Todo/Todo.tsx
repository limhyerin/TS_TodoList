import HeightBox from "../common/HeightBox";
import styled from "styled-components";
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type TodoType = {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
};

interface TodoProps {
  todo: TodoType;
  isActive: boolean;
}

function Todo({ todo, isActive }: TodoProps) {
  const queryClient = useQueryClient();
  const updateMutation = useMutation((updatedTodo: TodoType) =>
    axios.put(`http://localhost:4000/todos/${updatedTodo.id}`, updatedTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );
  const deleteMutation = useMutation((id: string) =>
    axios.delete(`http://localhost:4000/todos/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const handleSwitchButton = () => {
    updateMutation.mutate({ ...todo, isDone: !todo.isDone });
  };

  const handleRemoveButton = () => {
    deleteMutation.mutate(todo.id);
  };

  return (
    <StyledDiv>
      <StyledFlexTitleBox>
        <StyledTitle>{todo.title}</StyledTitle>
      </StyledFlexTitleBox>
      <HeightBox height={10} />
      <StyledContents>{todo.contents}</StyledContents>
      <HeightBox height={20} />
      <StyledFlexButtonBox>
        <StyledTodoButton onClick={handleSwitchButton}>
          {isActive ? "완료" : "취소"}
        </StyledTodoButton>
        <StyledTodoButton onClick={handleRemoveButton}>삭제</StyledTodoButton>
      </StyledFlexButtonBox>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 30px 20px 30px 20px;
  width: 200px;
  margin: 10px;
  background-color: #cdc1dd;
  border-radius: 20px;
`;

const StyledTitle = styled.p`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
`;

const StyledContents = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
`;

const StyledTodoButton = styled.button`
  background-color: #7684b8;
  width: 49%;
  height: 15px;
  color: white;
  font-weight: 500;
  height: 30px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledFlexButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledFlexTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Todo;
