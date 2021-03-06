/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';
import useTheme from 'hooks/useTheme';
import { AcceptedColorComponentTypes } from 'utils/themeFunctions';
import iconSelector from './assets/iconSelector';
import { AcceptedIconNames } from './types';
import { iconStyle, iconContainerStyle } from './Icon.style';

export type Props = {
  /** This property defines witch icon to use */
  name: AcceptedIconNames;
  /** Property indicating the color of the icon. Defaults to primary */
  color?: AcceptedColorComponentTypes;
  /** Property indicating the size of the icon. Defaults to 16 */
  size?: number;
};

const Icon: React.FC<Props> = ({ name, color = 'primary', size = 16 }) => {
  const theme = useTheme();

  const Icon = iconSelector[name];

  return (
    <span css={iconContainerStyle()}>
      <Icon css={iconStyle({ color, size })(theme)} />
    </span>
  );
};

export default Icon;
