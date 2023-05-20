import React, { useState } from "react";
import styled from "styled-components";

const ProjectGallary = ({ allImages = [] }) => {
  const [currentValue, setCurrentValue] = useState(0);

  return (
    <Wrapper className="project-gallary">
      <div className="img-container">
        <img src={allImages[currentValue]} alt="project data list" />
      </div>
      <div className="button-container">
        {allImages.map((eachImage, index) => {
          return (
            <button
              key={index}
              className={`${currentValue === index ? "active" : ""}`}
              onClick={() => setCurrentValue(index)}
            >
              <img src={eachImage} alt="eachImage showing" />
            </button>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  margin-bottom: 2rem;

  .img-container {
    border-radius: var(--radius);
    width: 100%;
    height: 300px;
    overflow: hidden;
    box-shadow: var(--light-shadow);
    border: 1px solid var(--clr-primary);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: var(--radius);
      display: block;
    }
  }
  .button-container {
    display: grid;
    margin-top: 1rem;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    button {
      border: none;
      background: none;
      cursor: pointer;
      display: block;
      height: 40px;
      border-radius: var(--radius);
      box-shadow: var(--light-shadow);

      &.active {
        border: 3px solid var(--clr-primary);
        border-radius: var(--radius);
        background: var(--clr-primary);
        box-shadow: var(--dark-shadow);
      }
      img {
        width: 100%;
        object-fit: cover;
        height: 100%;
        display: block;
        border-radius: var(--radius);
      }
    }
  }

  @media (min-width: 768px) {
    .img-container {
      height: 400px;
    }
    .button-container {
      button {
        height: 70px;
      }
    }
  }
`;

export default ProjectGallary;
