import { ChangeEvent, FormEvent, useState } from "react";
import LabeldInput from "../common/LabeldInput";
import HeightBox from "../common/HeightBox";
import RightMarginBox from "../common/RightMarginBox";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

type TodoType = {
    id: string;
    title: string;
    contents: string;
    isDone: boolean;
}

function Input() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation((newTodo: TodoType) =>
    axios.post('http://localhost:4000/todos', newTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const handleSubmitButtonClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !contents) {
        alert("제목과 내용을 모두 입력해주세요");
        return;
    }
    const newTodo: TodoType = {
        id: uuidv4(),
        title,
        contents,
        isDone: false,
    };
    mutation.mutate(newTodo);
    setTitle("");
    setContents("");
  };
  return (
    <StyledDiv>
      <form onSubmit={handleSubmitButtonClick}>
        <StyledFlexDiv>
          <RightMarginBox margin={10}>
            <LabeldInput
              id="title"
              label="제목"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={handleTitleChange}
            />
            <HeightBox height={10} />
            <LabeldInput
              id="contents"
              label="내용"
              placeholder="내용을 입력해주세요."
              value={contents}
              onChange={handleContentsChange}
            />
          </RightMarginBox>
          <StyledButton type="submit">제출</StyledButton>
        </StyledFlexDiv>
      </form>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding: 20px;
  background-color: #ebeffc;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  background-color: #7b8cb1;
  border: 0;
  border-radius: 10px;
  width: 100px;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const StyledFlexDiv = styled.div`
  display: flex;
`;

export default Input;