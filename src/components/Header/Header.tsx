import styled from "styled-components";

function Header() {
  return (
    <StyledHeader>
      <StyledP>Todo List</StyledP>
      <StyledP>TypeScript</StyledP>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  padding: 20px;
  font-size: larger;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
`;

const StyledP = styled.p`
  margin: 0;
`;

export default Header;
