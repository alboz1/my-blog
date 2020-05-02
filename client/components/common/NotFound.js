import React from "react";
import styled from 'styled-components';
import Layout from "./Layout";
import { StyledLink } from "../ui/Link";
import { device } from '../../globals';

const Container = styled.div`
	padding: 4rem 0;
	text-align: center;
	h1 {
		font-size: 10em;
		color: ${({ theme }) => theme.primaryText};

		@media ${device.mobile} {
			font-size: 5.3em;
		}
	}
	p {
		color: ${({ theme }) => theme.secondaryText};
	}
`;

const ImageWrapper = styled.div`
	max-width: 500px;
	margin: 0 auto;
	img {
		width: 100%;
	}
`;

const NotFound = () => {
	return (
				<Container>
					<ImageWrapper>
						<img src="/404.svg" alt="not found" />
					</ImageWrapper>
						<p>We can't find the page you are looking</p>
						<StyledLink blue href="/">Go back to home page</StyledLink>
				</Container>
				// <Layout
				// 	<Container>
				// 		<ImageWrapper>
				// 			<img src="/404.svg" alt="not found" />
				// 		</ImageWrapper>
				// 		<p>We can't find the page you are looking</p>
				// 		<StyledLink blue href="/">Go back to home page</StyledLink>
				// 	</Container>
				// </Layout>
	);
}

export default NotFound;