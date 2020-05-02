import React from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar';
import { device } from '../../globals';
import MobileNav from '../MobileNav';
import Head from 'next/head';

const LayoutGrid = styled.div`
	display: grid;
    grid-template-columns: 200px auto;
    grid-gap: 2rem;

	@media ${device.mobile} {
		display: block;
	}
`;

const StyledMain = styled.main`
	padding: 0 2rem;
	min-width: 0;
	@media ${device.mobile} {
		padding: 0 0.6rem 4.8rem 0.6rem;
	}
`;

const Layout = ({title, children}) => {
	return (
		<>
			<Head>
				<title>{!title ? 'Bloggger' : `Bloggger | ${title}`}</title>
			</Head>
			<LayoutGrid>
				<div>
					<Sidebar />
				</div>
				<StyledMain>
					{children}
				</StyledMain>
				<MobileNav />
			</LayoutGrid>
		</>
	);
}

export default Layout;