import React, { cloneElement } from 'react'
import styled, { css } from 'styled-components'

export const CTABlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px;
`

export const CTA = styled.div`
  margin-top: 20px;
`

export const H1 = styled.h1`
  font-family: var(--font-headings);
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: 0.004px;

  margin: 0 0 30px 0;
`

export const Text = styled.p`
  max-width: unset;

  font-family: var(--font-sans);
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 29px;
  letter-spacing: 0.004px;

  margin: 0;
  padding: 0;

  color: #000000;
`

export const Card = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 15px;
`

export const Padding = styled.div`
  padding: ${({ v }) => v + 'px'};
`

export const SUploader = styled.div`
  min-height: 48px;
  padding: 30px 0 35px;

  & .uploadcare--widget__button {
    height: 48px;

    background-color: #0e54ff;

    font-family: var(--font-sans);
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
  }

  & .uploadcare--widget__dragndrop-area {
    font-size: 16px;
    line-height: 34px;
  }
`

export const BlackNumber = styled.span`
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 0.004px;
  color: #ffffff;
  display: inline-block;
  width: 28px;
  margin-right: 15px;
  text-align: center;
  position: relative;

  &::before {
    content: ' ';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: -1;
    background-color: #000000;
    border-radius: 25px;

    width: 28px;
    height: 28px;
  }
`

export const H2 = styled.h2`
  font-family: var(--font-headings);
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: 0.004px;

  margin: 0 0 25px;
  padding: 0;

  display: flex;
  align-items: center;

  color: #000000;
`

export const DemoBlock = styled.div`
  background-color: #f6f6f6;
  border-top: 1px solid #eaeaea;

  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`

export const SmallImage = styled.img`
  display: block;

  width: 160px;
  height: 160px;

  border-radius: 10px;
`

export const Row = styled.div`
  display: flex;
`

export const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const InfoHeader = styled.h3`
  font-family: var(--font-mono);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.004px;
  margin: 0 0 5px;

  color: #b5b5b5;
`

export const InfoList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;

  font-family: var(--font-mono);
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 36px;

  color: #444444;

  letter-spacing: 0.004px;
`

export const ItemLabel = styled.span`
  color: #bbbbbb;
`

export const BigImage = styled.img`
  display: block;
  max-width: 100%;
  transform: scale(1);
  opacity: 1;

  transition: opacity 0.1s ease-in-out, transform 0.3s ease-in-out;

  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0.1;
      transform: scale(0.95);
    `}
`

export const Center = styled.div`
  margin: 30px 0 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Url = styled.div`
  font-family: var(--font-mono);
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 29px;
  letter-spacing: 0.004px;

  margin: 0 0 25px;

  display: flex;
  flex-flow: row wrap;
  align-items: center;

  color: #444444;
`

export const UrlPart = styled.span`
  color: #ffffff;
  box-sizing: border-box;
  border-radius: 5px;

  padding: 5px 12px;
  margin: 2px 0px;
  line-height: 24px;
  display: inline-block;

  cursor: default;

  background-color: ${({ active }) => (active ? '#000000' : '#222222')};
`

export const ButtonAsLink = styled.button`
  font-family: var(--font-mono);
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.004px;

  color: #0e54ff;
  background-color: #ecf2ff;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  padding: 16px 24px;
  margin: 0;

  &:focus,
  &:active,
  &:hover {
    color: #0e54ff;
    background-color: transparent;
    box-shadow: none;
    outline: initial;
  }
`

export const Link = styled.a`
  font-family: var(--font-mono);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.004px;
  text-decoration: none;
  word-break: break-all;

  color: #444444;

  &:hover {
    color: #b5b5b5;
  }

  ${({ isAnyActive }) =>
    isAnyActive &&
    css`
      color: #b5b5b5;
    `}
`

export const LinkHighlighter = styled.span`
  padding: 4px 2px;
  background-color: ${({ active }) => (active ? '#FEF5DA' : 'transparent')};
  color: ${({ active }) => (active ? '#222222' : 'inherit')};
`

export const Circle = styled.span`
  background-color: ${({ color }) => color};

  display: inline-block;

  width: 16px;
  height: 16px;

  margin: 0 10px 0 0;
  border-radius: 8px;
`

const Popover = styled.div`
  position: absolute;
  bottom: 46px;

  width: 250px;

  background-color: #eeeeee;
  border-radius: 10px;

  font-family: var(--font-sans);
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.004px;

  color: #444444;

  padding: 15px;
  box-sizing: border-box;
`

const Hover = styled.span`
  position: relative;
  margin: 0 8px;

  &:first-child {
    margin-left: 0px;
  }
`

export const Poper = ({ body, hover, active, onClick }) => (
  <Hover onClick={onClick}>
    {active && <Popover>{body}</Popover>}

    {cloneElement(hover, { active })}
  </Hover>
)

export const Below = styled.div`
  display: flex;
  margin: 20px 0 0;
`

export const ButtonWithImage = styled.button`
  &,
  &:active,
  &:hover {
    all: initial;

    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0 20px 0 0;
    cursor: pointer;
  }
`

export const SupaSmallImg = styled.img`
  display: block;
  width: 72px;
  height: 72px;

  border-radius: 5px;
`

export const ButtonForChangeImage = styled.button`
  &,
  &:active,
  &:hover {
    all: initial;

    background-color: transparent;
    border: none;
    padding: 0;

    float: right;

    cursor: pointer;
  }
`

export const Cross = props => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 12 12'
    width='12'
    height='12'
    {...props}
  >
    <path
      fill='#808080'
      d='M6.43 6L12 11.57l-.43.43L6 6.43.43 12 0 11.57 5.57 6 0 .43.43 0 6 5.57 11.57 0l.43.43L6.43 6z'
    />
  </svg>
)

export const ShareIcon = props => (
  <svg
    width='12'
    height='12'
    viewBox='0 0 12 12'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11 1.707L5.354 7.353C5.15781 7.54248 4.84594 7.53978 4.65308 7.34691C4.46021 7.15404 4.45752 6.84219 4.647 6.646L10.293 1H6.5C6.22386 1 6 0.776142 6 0.5C6 0.223858 6.22386 0 6.5 0H11.5C11.7761 0 12 0.223858 12 0.5V5.5C12 5.77614 11.7761 6 11.5 6C11.2239 6 11 5.77614 11 5.5V1.707ZM2 2H1.49899C0.670993 2 0 2.669 0 3.496V10.505C0 11.33 0.679014 12.001 1.50201 12.001H8.49701C8.89553 12.0015 9.27787 11.8435 9.55966 11.5617C9.84146 11.2799 9.99953 10.8975 9.99899 10.499V10.001C9.99899 9.72486 9.77514 9.50101 9.49899 9.50101C9.22285 9.50101 8.99899 9.72486 8.99899 10.001V10.499C8.99953 10.6323 8.94683 10.7603 8.85257 10.8546C8.75831 10.9488 8.63031 11.0015 8.49701 11.001H1.50201C1.22754 11 1.00435 10.7795 1 10.505V3.496C1 3.222 1.22299 3 1.49899 3H2C2.27614 3 2.5 2.77614 2.5 2.5C2.5 2.22386 2.27614 2 2 2Z'
      fill='#B5B5B5'
    />
  </svg>
)

export const ShareIconWrapper = styled.div`
  margin-left: 6px;
  display: inline;
`

export const RecognizedObject = styled.span`
  padding: 3px 13px 6px;
  background-color: #f7f7f7;
  border-radius: 15px;
`
