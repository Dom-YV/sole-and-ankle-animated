import React from 'react';
import styled from 'styled-components/macro';

import { WEIGHTS } from '../../constants';

const NavLink = ({ href, children, ...delegated }) => {

  return (
    <Wrapper href={href}>
      <Text>{children}</Text>
      <FocusedText>{children}</FocusedText>
    </Wrapper>
  );
};

const Wrapper = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  height: 27px;
  overflow: hidden;

  &:first-of-type {
    color: var(--color-secondary);
  }
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
