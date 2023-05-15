import React from "react";
import styled from "styled-components";

function Button({ title, showIcon, icon, customStyles }) {
  return (
    <Wrapper style={{ ...customStyles }}>
      <div>{title}</div>
      {showIcon && <div>{icon}</div>}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  padding: 7px 15px;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  text-transform: capitalize;
  gap: 10px;
  cursor: pointer;
  border: none;
  border: 1px solid grey;
  background-color: var(--clr-primary-light);
  color: var(--clr-white);

  &:hover {
    border: 1px solid grey;
  }
`;

export default Button;
