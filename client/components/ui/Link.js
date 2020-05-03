import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { device } from '../../globals';

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

const StyledPopoverLink = styled(ALink)`
    padding: 0.7rem 1.7rem;
    &:first-child {
        margin-top: 0;
    }
    @media ${device.mobile} {
        padding: 0.7rem 0;
        font-size: 1.08em;
    }
`;

const PostFooterLink = styled(ALink)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    font-size: 0.85em;
    & svg {
        vertical-align: middle;
        transition: transform 0.2s ease-out;
        z-index: -1;
    }
    &:hover svg {
        transform: translateX(2px);
    }
`;

export const FooterLink = ({ href, children, className, as, prefetch, ...rest }) => {
    return (
        <Link href={href} as={as} prefetch={prefetch} passHref>
            <PostFooterLink className={className} {...rest}>{children}</PostFooterLink>
        </Link>
    );
}

export const PopoverLink = ({ href, children, className, as, prefetch, ...rest }) => {
    return (
        <Link href={href} as={as} prefetch={prefetch} passHref>
            <StyledPopoverLink className={className} {...rest}>{children}</StyledPopoverLink>
        </Link>
    );
}

export const StyledLink = ({ href, children, className, as, prefetch, ...rest }) => {
    const router = useRouter();

    return (
        <Link href={href} as={as} prefetch={prefetch} passHref>
            <ALink className={className} aria-current={href === router.asPath && "page"} {...rest}>{children}</ALink>
        </Link>
    );
}

export const TagLink = ({ href, children, className, as, ...rest }) => {
    return (
        <Link href={href} as={as} prefetch={false} passHref>
            <Tag className={className} {...rest}>{children}</Tag>
        </Link>
    );
}