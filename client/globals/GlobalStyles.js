import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	body {
		background: ${({ theme }) => theme.bg};
		font-family: 'Open Sans', sans-serif;
	}
    h1,h2,h3,h4,h5,h6 {
        color: ${({ theme }) => theme.primaryText};
		margin: 1.5rem 0;
    }
	a {
		text-decoration: none;
	}

	#nprogress .bar {
		background: ${({ theme }) => theme.primary.default};
	}
`;

export default GlobalStyles;