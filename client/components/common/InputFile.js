import React from 'react';
import styled from 'styled-components';
import { FileInput, FileInputLabel } from '../ui/Input';
import { DeleteButton } from '../ui/Button';
import { defaultBoxShadow } from '../../globals/theme';
import { device } from '../../globals';

const FileInputContainer = styled.div`
  box-shadow: ${defaultBoxShadow};
  border-radius: 5px;
  cursor: pointer;
  padding: 2rem 0.7rem;
  position: relative;
  transition: 0.3s ease;
  label > span, label > svg {
	color: ${({ theme }) => theme.links};
	stroke: ${({ theme }) => theme.links};
	transition: all 0.2s ease;
  }
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  &:hover label > span {
	  color: ${({ theme }) => theme.linksHover};
  }
  &:hover label > svg {
    transform: translateY(-2px);
    stroke: ${({ theme }) => theme.linksHover};
  }
`;

const ImagePreview = styled.div`
  margin: 0 auto;
  height: 250px;
  text-align: center;
  img {
    max-width: 100%;
    height: 100%;
	@media ${device.mobile} {
		height: auto;
	}
  }

  @media ${device.mobile} {
	height: auto;
  }
`;

const InputFile = ({ htmlFor, handleOnChange, handleRemoveImage, image }) => {
    return (
		<div>
			<FileInputContainer>
				<FileInput
					type="file"
					id={htmlFor}
					name={htmlFor}
					accept="image/png, image/jpeg"
					onChange={ e => handleOnChange(e) }
				/>
				<FileInputLabel htmlFor={htmlFor}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-upload">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
						<polyline points="17 8 12 3 7 8"></polyline>
						<line x1="12" y1="3" x2="12" y2="15"></line>
					</svg>
					<span>Select an image {htmlFor}</span>
				</FileInputLabel>

			</FileInputContainer>
			{
				image && (
				<ImagePreview>
					<DeleteButton onClick={ handleRemoveImage } wide mb>Delete image</DeleteButton>
					<img src={ image } alt="preview" />
				</ImagePreview>
				)
			}
		</div>
    );
}

export default InputFile;