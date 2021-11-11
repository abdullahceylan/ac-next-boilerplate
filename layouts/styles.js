import styled, { css, createGlobalStyle } from 'styled-components';
import tw from 'tailwind-styled-components';

import { ifProp, prop } from 'styled-tools';
import { normalize } from 'polished';
import theme from '@theme';

export { styled, ifProp, prop, css, tw };

export const media = {
  xs: (...args) => css`
    @media (max-width: ${theme.grid.breakpoints.sm}px) {
      ${css(...args)};
    }
  `,
  sm: (...args) => css`
    @media (min-width: ${theme.grid.breakpoints.sm}px) {
      ${css(...args)};
    }
  `,
  md: (...args) => css`
    @media (min-width: ${theme.grid.breakpoints.md}px) {
      ${css(...args)};
    }
  `,
  lg: (...args) => css`
    @media (min-width: ${theme.grid.breakpoints.lg}px) {
      ${css(...args)};
    }
  `,
  mdOnly: (...args) => css`
    @media (min-width: ${theme.grid.breakpoints.md}px) and (max-width: ${theme.grid.breakpoints.lg -
      1}px) {
      ${css(...args)};
    }
  `,
  smOnly: (...args) => css`
    @media (min-width: ${theme.grid.breakpoints.sm}px) and (max-width: ${theme.grid.breakpoints.md -
      1}px) {
      ${css(...args)};
    }
  `,
  smLess: (...args) => css`
    @media (max-width: ${theme.grid.breakpoints.sm}px) {
      ${css(...args)};
    }
  `,
  mdLess: (...args) => css`
    @media (max-width: ${theme.grid.breakpoints.md}px) {
      ${css(...args)};
    }
  `,
  lgLess: (...args) => css`
    @media (max-width: ${theme.grid.breakpoints.lg}px) {
      ${css(...args)};
    }
  `,
};

export const CustomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${prop('width', 300)}px;
  margin-bottom: 20px;
`;

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export const Grid = styled.div`
  width: ${prop('width', '100%')};
  margin-left: -5px;
  margin-right: -5px;
  ${ifProp(
    'width',
    css`
      margin: 0 auto;
    `,
  )}
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0 5px 0px;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  width: auto;
  ${ifProp('extend', 'width: 100%;')}
  ${ifProp(
    'xs',
    media.xs`
      width: calc(${({ gridSize, xs }) => (100 / (gridSize || theme.grid.size)) * xs}% - ${
      theme.grid.gutter
    }px);
    `,
  )}
  ${ifProp(
    'sm',
    media.sm`
      width: calc(${({ gridSize, sm }) => (100 / (gridSize || theme.grid.size)) * sm}% - ${
      theme.grid.gutter
    }px);
    `,
  )}
  ${ifProp(
    'md',
    media.md`
      width: calc(${({ gridSize, md }) => (100 / (gridSize || theme.grid.size)) * md}% - ${
      theme.grid.gutter
    }px);
    `,
  )}
  ${ifProp(
    'lg',
    media.lg`
    width: calc(${({ gridSize, lg }) => (100 / (gridSize || theme.grid.size)) * lg}% - ${
      theme.grid.gutter
    }px);
  `,
  )}
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  vertical-align: top;
`;
