/**
 * @file 内部核心展示区域
 */
import { Drawer, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import bodyStyles from './components/TerminalCard/index.module.scss';
import TerminalCard from './components/TerminalCard';
import RGL, {
  WidthProvider,
  Responsive as ResponsiveGridLayout,
} from 'react-grid-layout';
const ReactGridLayout = WidthProvider(RGL);
interface IProps {
  actions: any;
  models: any;
  childOptions: {
    closeManyChildWin: Function; // 关闭子窗口函数
    registerChildWin: Function; // 子窗口注册函数
  };
}
const drawerInitStyle = {
  backgroundColor: '#22272b',
  color: '#fff',
};
const drawInitHeaderStyle = {
  backgroundColor: '#22272b',
  color: '#fff',
  border: 0,
};
// 一行显示个数
const ColConfig = {
  xs: 12, // <576
  sm: 12, // >= 576
  md: 12, // >= 768
  lg: 8, // >= 992
  xl: 8, // >= 1200
  xxl: 8, // >= 1600
};
const AllColConfig = {
  span: 24,
};
const twoColConfig = {
  span: 12,
};
export default function index(props: IProps) {
  const {
    actions,
    models: { isSysBtn, terminalList },
    childOptions,
  } = props;
  const [menus, setMenus] = useState([]);
  const [dataObj, setDataObj] = useState({});
  useEffect(() => {
    createMenus(terminalList);
  }, [terminalList]);
  function createMenus(dataList: any[] = []) {
    if (dataList.length > 0) {
      let obj: any = {}; // 解析数据
      let xNum = -4;
      let yNum = -4;
      let ary: any = dataList.map((item: any, index: number) => {
        obj[item.id] = item;
        if (dataList.length === 1) {
          // 只有一个数据 默认占满
          return {
            y: 0,
            x: 0,
            w: 12,
            h: 7,
            i: item.id,
            isResizable: true,
            isDraggable: true,
            isBounded: true,
          };
        } else if (dataList.length === 2) {
          // 只有2个默认占满高度
          return {
            y: 0,
            x: index === 1 ? 6 : 0,
            w: 6,
            h: 7,
            i: item.id,
            isResizable: true,
            isDraggable: true,
            isBounded: true,
          };
        } else {
          if (xNum >= 8) {
            xNum = 0;
          } else {
            xNum += 4;
          }
          if (index % 3 === 0) {
            yNum += 1;
          }
          // 进行是否存在历史数据判断
          return {
            y: yNum,
            x: xNum,
            w: 4,
            h: 4,
            i: item.id,
            isResizable: true,
            isDraggable: true,
            isBounded: true,
          };
        }
      });
      setMenus(ary);
      setDataObj(obj);
    } else {
      setMenus([]);
      setDataObj({});
    }
  }

  let onLayoutChange = (layout: any) => {
    setMenus(layout);
  };
  function closeBtnFunc() {
    actions.updateSysBtnFunc({
      isSysBtn: false, // 组件栏是否展示
    });
  }

  const terminalCardProps = {
    models: props.models,
    actions,
    ColConfig:
      terminalList.length === 1
        ? AllColConfig
        : terminalList.length === 2
        ? twoColConfig
        : ColConfig,
    height: terminalList.length === 1 ? '100%' : '400px',
  };
  return (
    <div className={styles.body_div}>
      <ReactGridLayout
        layout={menus}
        autoSize
        onLayoutChange={onLayoutChange}
        rowHeight={100}
        cols={12}
        // compactType={'horizontal'}
        className={'layout'}
        useCSSTransforms={true}
        // isResizable={true}
        // isDraggable={true}
      >
        {Array.isArray(menus) &&
          menus.length > 0 &&
          menus.map((item: any, index: number) => {
            let data: any = dataObj[item.i] || {};
            return (
              <div key={item.i} className={bodyStyles.col_div}>
                <TerminalCard
                  index={index}
                  {...terminalCardProps}
                  terData={data}
                  childOptions={childOptions}
                />
              </div>
            );
          })}
      </ReactGridLayout>
      {/* <Row gutter={[16, 0]} className={styles.row_div}>
        {Array.isArray(terminalList) &&
          terminalList.length > 0 &&
          terminalList.map((item: any, index: number) => {
            return (
              <TerminalCard
                key={item.id}
                index={index}
                {...terminalCardProps}
                terData={item}
                childOptions={childOptions}
              />
            );
          })}
      </Row> */}
      <Drawer
        title={<span style={{ color: '#fff' }}>全局配置区</span>}
        onClose={closeBtnFunc}
        destroyOnClose={true}
        style={{
          marginTop: 40,
        }}
        drawerStyle={drawerInitStyle}
        headerStyle={drawInitHeaderStyle}
        // maskClosable={false}
        placement="left"
        closable={false}
        visible={isSysBtn}
      >
        <div className={styles.sys_body_div}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </div>
      </Drawer>
    </div>
  );
}
