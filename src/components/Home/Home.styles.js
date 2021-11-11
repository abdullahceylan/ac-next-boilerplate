import { tw } from '@styles';

export const HomeWrapper = tw.div`
    flex
    flex-col
    items-center
    justify-center
    min-h-screen
    py-2
`;

export const Content = tw.main`
  flex
  flex-col
  items-center
  justify-center
  w-full
  flex-1
  px-20
  text-center
`;

export const PageTitle = tw.h1`
  text-6xl
  font-bold
`;

export const Footer = tw.footer`
  flex
  items-center
  justify-center
  w-full
  h-24
  border-t
`;
