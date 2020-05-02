import React from 'react';
import styled from 'styled-components';
import { defaultBoxShadow } from '../../globals/theme';

const QuoteWrapper = styled.div`
    background:  ${({ theme }) => theme.lightGrey};
    border-radius: 5px;
    box-shadow: ${defaultBoxShadow};
    padding: 1.6rem;
    text-align: ${({ alignment }) => alignment};
    & cite {
        color: ${({ theme }) => theme.secondaryText};
        display: block;
        margin: 0.8rem;
    }
`;

const StyledBlockquote = styled.blockquote`
    line-height: 1.6em;
    padding: 1.3rem;
    position: relative;
    &::after {
        background: ${({ theme }) => theme.danger.rgba};
        content: '';
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const ListWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.lightGrey};
    border-radius: 5px;
    box-shadow: ${defaultBoxShadow};
    padding: 1rem;
    & ol, ul {
        padding: 0;
        list-style-position: inside;
    }
    & li {
        background: ${({ theme }) => theme.inputBg};
        padding: 0.7rem;
        margin: 0.5rem 0;
    }
`;

const FigureCaption = styled.figcaption`
    color: ${({ theme }) => theme.secondaryText};
    margin: 0.8rem;
    text-align: center;
`;

const Delimeter = styled.div`
    margin: 2rem 0;
`;

const RenderHTML = ({ blocks }) => {
    return (
        <div>
            {
                blocks && blocks.map((block, index) => {
                    switch(block.type) {
                        case 'header':
                            const headerEl = React.createElement(`h${block.data.level}`, {className: 'ce-header'}, block.data.text);
                            return (
                                <div key={index} className="ce-block">
                                    <div>
                                        {headerEl}
                                    </div>
                                </div>                                
                            )
                        case 'paragraph':
                            return (
                                <div key={index} className="ce-block">
                                    <div>
                                        <p
                                            className="ce-paragraph cdx-block"
                                            dangerouslySetInnerHTML={{__html: block.data.text}}
                                        />
                                    </div>
                                </div>
                            )
                        case 'list':
                            const items = block.data.items.map((item, index) => <li key={index} className="cdx-list__item">{item}</li>);
                            return (
                                <div key={index} className="ce-block">
                                    <ListWrapper>
                                        {
                                            block.data.style === 'ordered' ?
                                                <ol className="cdx-block cdx-list cdx-list--ordered">
                                                    {items}
                                                </ol> :
                                            block.data.style === 'unordered' ?
                                                <ul className="cdx-block cdx-list cdx-list--unordered">
                                                    {items}
                                                </ul> :
                                                null
                                        }
                                    </ListWrapper>
                                </div>
                            )
                        case 'quote':
                            return (
                                <div key={index} className="ce-block">
                                    <QuoteWrapper alignment={block.data.alignment}>
                                        <StyledBlockquote className="cdx-block cdx-quote">
                                            {block.data.text}
                                        </StyledBlockquote>
                                        <cite className="cdx-quote__caption">{block.data.caption}</cite>
                                    </QuoteWrapper>
                                </div>
                            )
                        case 'code':
                            return (
                                <div key={index} className="ce-block">
                                    <div>
                                        <div className="cdx-block ce-code">
                                            <pre>{block.data.code}</pre>
                                        </div>
                                    </div>
                                </div>
                            )
                        case 'image':
                            return (
                                <div key={index} className="ce-block">
                                    <div>
                                        <div className="cdx-block cdx-simple-image">
                                            <div 
                                                className={
                                                    `cdx-simple-image__picture
                                                    ${block.data.withBorder ? 'cdx-simple-image__picture--with-border' : null}
                                                    ${block.data.stretched ? 'cdx-simple-image__picture--stretched' : null}
                                                    ${block.data.withBackground ? 'cdx-simple-image__picture--with-background' : null}
                                                    `
                                                }
                                            >   
                                                <figure>
                                                    <img src={block.data.url} alt={block.data.caption} />
                                                    <FigureCaption className="cdx-simple-image__caption">{block.data.caption}</FigureCaption>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        case 'embed':
                            return (
                                <div key={index} className="ce-block">
                                    <div>
                                        <div className="cdx-block embed-tool">
                                            <iframe
                                                title="embed-tool"
                                                height={block.data.height}
                                                width={block.data.width}
                                                scrolling="no"
                                                frameBorder="no"
                                                allowFullScreen={true}
                                                style={{width: '100%'}}
                                                src={block.data.embed}
                                            >
                                            </iframe>
                                            <label className="embed-tool__caption">{block.data.caption}</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        case 'delimeter':
                            return (
                                <div key={index} className="ce-block">
                                    <div>
                                        <Delimeter className="ce-delimiter cdx-block"></Delimeter>
                                    </div>
                                </div>
                            )
                        default:
                            return (
                                <p>Unsupported tag</p>
                            );
                    }
                })
            }
        </div>
    );
}

export default RenderHTML;