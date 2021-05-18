import '@emotion/react';
import theme from '@/styles/theme';

export type MyTheme = typeof theme;

declare module '@emotion/react' {
  export type Theme = MyTheme;
}
