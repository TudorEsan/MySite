import styled from 'styled-components'

export const NormalTextField = styled.textarea`
	display: block;
	resize: none;
	height: 200px;
	width: 250px;
	position: relative;
	width: 1fr;
	box-sizing: border-box;
	font-size: 18px;
	padding: 10px;
	background: #dadfe9;
	border: 1px solid #a5a5a5;
	border-radius: 15px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
	:placeholder {
		color: #a3a7ae;
	}
	:focus {
		outline: none;
	}
	border: ${(props) => (!!props.error ? "1px solid red" : "")};
	@media (max-width: 800px) {
		margin-bottom: 10px;
	}
`;

export const NormalInput = styled.input`
	display: block;
	height: 45px;
	width: 250px;
	position: relative;
	width: 1fr;
	box-sizing: border-box;
	font-size: 18px;
	padding: 10px;
	background: #dadfe9;
	border: 1px solid #a5a5a5;
	border-radius: 15px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
	overflow: visible;
	:placeholder {
		color: #a3a7ae;
	}
	border: ${(props) => (!!props.error ? "1px solid red" : "")};
	:focus {
		outline: none;
	}
	@media (max-width: 800px) {
		margin-bottom: 10px;
	}
`;

export const InputContainer = styled.div`
	margin-bottom: 15px;
	position: relative;
	overflow: visible;
	:before {
		position: absolute;
		content: ${(props) =>
			props.error ? `"${props.error.message}"` : "none"};
		height: 10px;
		width: 100%;
		color: red;
		bottom: -5px;
		left: 0px;
	}
`;