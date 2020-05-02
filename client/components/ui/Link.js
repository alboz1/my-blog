import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ALink = styled.a.attrs(({ theme, blue, mt, block }) => ({
    blue: blue ? theme.primary.default : theme.links,
    mt: mt && '0.5rem',
    block: block && 'block'
}))`
    color: ${({ blue }) => blue};
    display: ${({ block }) => block};
    text-decoration: none;
    margin-top: ${({ mt }) => mt};
    font-size: ${({ small }) => small ? '0.97em' : '1rem'};
    font-weight: ${({ bold }) => bold ? '600' : '400'};
    transition: all 0.2s ease-in-out;
    &:hover {
        color: ${({ theme }) => theme.linksHover};
    }
`;

const Tag = styled(ALink)`
    background: ${({ theme }) => theme.inputBg};
    border-radius: 3px;
    padding: 0.6rem 0.8rem;
    margin: 0.3rem;
    display: inline-block;
    transition: none;
    &:hover {
        color: ${({ theme }) => theme.links};
        background: ${({ theme }) => theme.tagHover};
    }
`;

export const StyledLink = ({ href, children, className, as, ...rest }) => {
    const router = useRouter();

    return (
        <Link href={href} as={as} passHref>
            <ALink className={className} aria-current={href === router.asPath && "page"} {...rest}>{children}</ALink>
        </Link>
    );
}

export const TagLink = ({ href, children, className, as, ...rest }) => {
    return (
        <Link href={href} as={as} passHref>
            <Tag className={className} {...rest}>{children}</Tag>
        </Link>
    );
}