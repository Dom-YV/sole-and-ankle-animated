import React from 'react';
import styled from 'styled-components/macro';

import { WEIGHTS } from '../../constants';

const NavLink = ({ href, children, ...delegated }) => {

  return (
    <Wrapper href={href}>
      <TextWrapper>
        <Text>{children}</Text>
        <FocusedText>{children}</FocusedText>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.a`
  --color: var(--color-gray-900);
  &:first-of-type {
    --color: var(--color-secondary);
  }
  position: relative;
  text-decoration: none;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-10px);
    width: 100%;
    height: 1px;
    background-color: var(--color);
    content: '';
    opacity: 0;
    transition: transform 400ms, opacity 400ms;
  }

  &::after {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(10px);
    width: 100%;
    height: 1px;
    background-color: var(--color);
    content: '';
    opacity: 0;
    transition: transform 400ms, opacity 400ms;
  }

  &:hover,
  &:focus {
    &::before,
    &::after {
      @media (prefers-reduced-motion: no-preference) {
        transform: translateY(0px);
        opacity: 1;
      }
    }
  }
`

const TextWrapper = styled.div`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color);
  height: 27px;
  overflow: hidden;
`;

const Text = styled.h2`
  font-weight: ${WEIGHTS.medium};
  transition: transform 400ms;

  ${Wrapper}:hover &,
  ${Wrapper}:focus & {
    @media (prefers-reduced-motion: no-preference) {
      transform: translateY(-27px);
      transition: transform 250ms;
    }
  }
`

const FocusedText = styled.h2`
  font-weight: ${WEIGHTS.bold};
  transition: transform 400ms;

  ${Wrapper}:hover &,
  ${Wrapper}:focus & {
    @media (prefers-reduced-motion: no-preference) {
      transform: translateY(-27px);
      transition: transform 250ms;
    }
  }
`

export default NavLink;
