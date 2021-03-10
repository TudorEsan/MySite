import styled from 'styled-components'

export const NormalInput = styled.input`
  position: relative;
  width: 1fr;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px;
  background: #DADFE9;
  border: none;
  border-radius: 3px;
  :placeholder {
    color: #A3A7AE;
  }
  border: ${ props => !!props.error? '1px solid red' : ''};
  @media(max-width: 800px) {
      margin-bottom: 10px;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
  position: relative;
    :before {
        position: absolute;
        content: ${(props) =>  props.error? `"${props.error.message}"`: 'none'};
        height: 10px;
        width: 100%;
        color: red;
        bottom: -5px;
        left: 0px;
    }
`