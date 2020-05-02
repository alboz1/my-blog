import React, { useEffect } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import { MainProvider } from '../contexts/MainContext';
import { ToggleThemeProvider } from '../contexts/ThemeContext';
import { AlertProvider } from '../contexts/AlertContext';
import Alert from '../components/common/Alert';
import GlobalStyles from '../globals/GlobalStyles';
import 'normalize.css';
import 'nprogress/nprogress.css';

const App = ({ Component, pageProps }) => {
    useEffect(() => {
        NProgress.configure({
            showSpinner: false
        });
        Router.events.on('routeChangeStart', () => NProgress.start());
        Router.events.on('routeChangeComplete', () => NProgress.done());
        Router.events.on('routeChangeError', () => NProgress.done());

        return () => {
            Router.events.off('routeChangeStart', () => NProgress.start());
            Router.events.off('routeChangeComplete', () => NProgress.done());
            Router.events.off('routeChangeError', () => NProgress.done());
        }
    }, [])

    return (
        <ToggleThemeProvider>
            <MainProvider>
                <AlertProvider>
                    <Head>
                        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet"></link>
                    </Head>
                    <GlobalStyles />
			        <Alert />
                    <Component {...pageProps} />
                </AlertProvider>
            </MainProvider>
        </ToggleThemeProvider>
    );
}

export default App;