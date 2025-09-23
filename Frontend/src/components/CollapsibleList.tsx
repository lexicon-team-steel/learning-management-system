import { Fragment, ReactElement, ReactNode } from 'react';
import { Button, Divider, List, SxProps } from '@mui/material';
import { useCollapse } from '../utilities/hooks/useCollapsible';

interface ICollapsibleListProps<T> {
  items: T[];
  renderItem: (i: T) => ReactNode;
  keyField: keyof T;
  itemsDefault?: number;
  isCollapsed?: boolean;
  hasDivider?: boolean;
  showMoreLabel?: string;
  showLessLabel?: string;
  sx?: SxProps;
}

const CollapsibleList = <T,>({
  items,
  renderItem,
  keyField,
  itemsDefault = 5,
  isCollapsed = true,
  hasDivider = true,
  showMoreLabel = 'Visa fler',
  showLessLabel = 'Visa färre',
  sx,
}: ICollapsibleListProps<T>): ReactElement => {
  const { collapsed, toggleCollapse } = useCollapse(isCollapsed);
  const visibleItems = collapsed ? items.slice(0, itemsDefault) : items;
  const buttonTitle = collapsed ? showMoreLabel : showLessLabel;
  const showDivider = (idx: number) => hasDivider && idx < visibleItems.length - 1 && <Divider />;

  return (
    <>
      <List sx={sx}>
        {visibleItems.map((item, idx) => (
          <Fragment key={item[keyField] as string}>
            {renderItem(item)}
            {showDivider(idx)}
          </Fragment>
        ))}
      </List>
      {items.length > itemsDefault && <Button onClick={toggleCollapse}>{buttonTitle}</Button>}
    </>
  );
};

export default CollapsibleList;
