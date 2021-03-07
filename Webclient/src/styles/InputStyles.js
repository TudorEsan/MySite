import styled from 'styled-components'

export const NormalInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px;
  margin: 10px 0px 10px 10px;
  background: #DADFE9;
  border: none;
  border-radius: 3px;
  margin: 5px;
  :placeholder {
    color: #A3A7AE;
  }
  @media(max-width: 800px) {
      margin-bottom: 10px;
  }
`;