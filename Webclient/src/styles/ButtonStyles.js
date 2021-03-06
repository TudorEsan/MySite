import styled from 'styled-components'

export const SimpleButton = styled.button`
	padding: 0;
	font: inherit;
	border: none;
	cursor: pointer;
	border-radius: 50px;
	padding: 5px 15px;
	transition: 0.3s ease-out;
	overflow: visible;

	:hover {
		transform: scale(1.04);
	}
	:active {
		transform: translateY(-1px);
		box-shadow: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.25));
		transform: scale(1.02);
		border: none;
		outline: none;
	}
	:focus {
		border: none;
		outline: none;
	}
	:disabled {
		cursor: no-drop;
		:active {
			transform: none;
			box-shadow: none;
			transform: none;
			border: none;
			outline: none;
		}
		:hover {
			transform: none;
		}
	}
`;

export const NormalButton = styled.button`
	padding: 0;
	font: inherit;
	border: none;
	cursor: pointer;
	filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
	background: #229ad2;
	border-radius: 50px;
	padding: 5px 15px;
	transition: 0.3s ease-out;
	overflow: visible;

	:hover {
		transform: scale(1.04);
	}
	:active {
		transform: translateY(-1px);
		box-shadow: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.25));
		transform: scale(1.02);
		border: none;
		outline: none;
	}
	:focus {
		border: none;
		outline: none;
	}
	:disabled {
		background: #a9d7ec;
		cursor: no-drop;
		:active {
			transform: none;
			box-shadow: none;
			transform: none;
			border: none;
			outline: none;
		}
		:hover {
			transform: none;
		}
	}
	@media (prefers-color-scheme: dark) {
		background: ${(props) => props.theme.dark.gradient1};
	}
`;