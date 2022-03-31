import React from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components/macro';

import { WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  
  const rotation = Math.random() * 16 - 8

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <ZoomWrapper>
            <Image alt="" src={imageSrc} />
          </ZoomWrapper>
          {variant === 'on-sale' && <SaleFlag style={{'--rotation': rotation + 'deg'}}>Sale</SaleFlag>}
          {variant === 'new-release' && (
            <NewFlag style={{'--rotation': rotation + 'deg'}}>Just released!</NewFlag>
          )}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color':
                variant === 'on-sale'
                  ? 'var(--color-gray-700)'
                  : undefined,
              '--text-decoration':
                variant === 'on-sale' ? 'line-through' : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const ZoomWrapper = styled.div`
  overflow: hidden;
  border-radius: 16px 16px 4px 4px;
  line-height: 0;
  background-color: #F5F5F5;
`;

const Image = styled.img`
  width: 100%;
  transition: 800ms;
  will-change: transform;

  @media (prefers-reduced-motion: no-preference) {
    transition: 400ms;
  }

  ${Link}:hover &,
  ${Link}:focus & {
    transform: scale(1.05) translateY(-4px);
    @media (prefers-reduced-motion: no-preference) {
      transform: scale(1.2) translateY(-20px) translateX(5px) rotate(15deg);
      transition: 150ms;
    }
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-10px) rotate(var(--rotation));
  }
  20% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(0);
  }
`

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;

  ${Link}:hover &,
  ${Link}:focus & {
    @media (prefers-reduced-motion: no-preference) {
      animation: ${bounce} 2000ms ease-out;
    }
  }
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

export default ShoeCard;
