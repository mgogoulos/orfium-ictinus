/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useCallback } from 'react';
import { breadcrumbStyles, breadcrumbLinkStyles } from './Breadcrumb.style';
import useTheme from 'hooks/useTheme';
import BreadcrumbItem from './BreadcrumbItem/BreadcrumbItem';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import { Link } from 'react-router-dom';
import BreadcrumbCollapsed from './BreadcrumbCollapsed/BreadcrumbCollapsed';

export type Props = {
  separatorContent?: '*' | '>' | '/';
  data: [];
  breadcrumbItemClickHandler: () => void;
};

export type BreadcrumbItemData = {
  to: string;
  label: string;
};

type BreadcrumbItem = React.ReactNode | BreadcrumbItemData;

const Breadcrumb: React.FC<Props> = props => {
  const { children, data = [], separatorContent = '>', breadcrumbItemClickHandler } = props;
  const theme = useTheme();
  const passDataToRouterLink = ({ to, label }: BreadcrumbItemData) => (
    <Link css={breadcrumbLinkStyles()(theme)} key={to} to={to}>
      {label}
    </Link>
  );

  const childrenCollection = React.Children.toArray(children);
  const dataItems = isEmpty(data) ? childrenCollection : data.map(passDataToRouterLink);

  const isLastItem = (itemIndex: number) => itemIndex === dataItems.length - 1;
  const shouldCollapse = (item: BreadcrumbItem, itemIndex: number) =>
    item && dataItems.length > 4 && itemIndex > 0 && itemIndex < dataItems.length - 2;

  const collapsedItems = useCallback(() => dataItems.filter(shouldCollapse), [dataItems]);

  const getBreadcrumbItem = (child: BreadcrumbItem, index: number) => {
    const itemKey = uniqueId('data_item_');

    if (shouldCollapse(child, index)) {
      return index === 1 ? (
        <BreadcrumbCollapsed
          collapsedItems={collapsedItems()}
          key={itemKey}
          separatorContent={separatorContent}
        />
      ) : null;
    }

    return (
      <BreadcrumbItem
        key={itemKey}
        clickHandler={breadcrumbItemClickHandler}
        childComponent={child}
        isLastItem={isLastItem(index)}
        separatorContent={separatorContent}
      />
    );
  };

  return (
    <ol aria-label="Breadcrumb" css={breadcrumbStyles()(theme)}>
      {dataItems.map(getBreadcrumbItem)}
    </ol>
  );
};

export default Breadcrumb;
