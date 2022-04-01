/**
 * @file 基础组成卡片
 */
import React from 'react';
import styles from './index.module.scss';
import { Svg } from 'xl-study-com';
import { Tooltip } from 'antd';
import classNames from 'classnames';
interface listConfig {
  svgName: string;
  title: string;
  isSelected: boolean;
  onClick(value: any): void;
}
interface propsConfig {
  item: listConfig;
}
export default function basicsCard(props: propsConfig) {
  const { item } = props;

  return (
    <Tooltip title={item.title}>
      <div
        onClick={() => {
          item.onClick(!item.isSelected);
        }}
        className={classNames(
          styles.basics_card_div,
          item.isSelected && styles.selected_card_div
        )}
      >
        <Svg name={item.svgName} width={16} height={16} />
      </div>
    </Tooltip>
  );
}
