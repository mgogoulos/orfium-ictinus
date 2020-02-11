/** @jsx jsx */
import * as React from 'react';
import { jsx } from '@emotion/core';

type Props = {
  /** String indicating the color of the button */
  bg: string;
};

const Button: React.FC<Props> = ({ bg, children, ...rest }) => (
  <button
    css={theme => ({
      color: theme.colors.primary,
      width: 131,
      height: 56,
      borderRadius: 4,
      backgroundColor: bg,
    })}
    {...rest}
  >
    {children}
  </button>
);

export default Button;