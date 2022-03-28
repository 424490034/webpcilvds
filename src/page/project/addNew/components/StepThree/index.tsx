/**
 * @file 第三步 项目指定指令执行时添加额外逻辑
 */
import { Button, Space } from 'antd';
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
} from 'react';
import BodyBgc from '../bodyBgc';
import styles from '../index.module.scss';
import CustomDrawer from './customDrawer';
import { Table, TableUtils } from 'xl-study-com';
import { addProject, genID } from 'utils';
const { getColumns } = TableUtils;
function index(props: any, ref: any) {
  const {
    oneData,
    twoData,
    scriptEnum,
    setCurrent,
    models: { tableList },
  } = props;
  const customRef: any = useRef();
  const [cusList, setCusList] = useState<any>([]);
  const [cusCriptEnum, setCusCriptEnum] = useState([]);
  useImperativeHandle(ref, () => ({}));
  function toLeft() {
    setCurrent(1);
  }
  function showDrawe() {
    getNewEnum();
    customRef.current.showDrawer();
  }
  function getNewEnum() {
    if (Array.isArray(cusList) && cusList.length > 0) {
      let keys = cusList.map((item: any) => item.seleteOrder);
      let datas = scriptEnum.filter(
        (res: any) => keys.indexOf(res.label) === -1
      );
      setCusCriptEnum(datas);
    } else {
      setCusCriptEnum(scriptEnum);
    }
  }
  function addData(data: any) {
    setCusList([...cusList, data]);
  }
  function removeData(id: string) {
    let data = cusList.filter((item: any) => item != id);
    setCusList(data);
  }
  const extraColumns: any = [
    {
      key: 'operate',
      name: '操作',
      width: 180,
      fixed: 'right',
      render: (text: any, { id }: any) => {
        return (
          <Space>
            <Button
              type="link"
              style={{
                padding: 0,
              }}
              danger
              onClick={() => {
                removeData(id);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const tableProps = {
    scroll: { y: 200 },
    rowKey: 'id',
    columns: getColumns(tableList).extend(extraColumns).values(),
    dataSource: cusList,
    style: {
      marginTop: 20,
    },
    pagination: false,
  };
  /**
   * @function 保存数据-并前往完成页
   */
  function saveData() {
    let customOrder: any = {};
    cusList.map((item: any) => {
      // 数据存在且不是数组
      if (
        customOrder[item.seleteOrder] &&
        !Array.isArray(customOrder[item.seleteOrder])
      ) {
        customOrder[item.seleteOrder] = [customOrder[item.seleteOrder], item];
      } else if (
        customOrder[item.seleteOrder] &&
        Array.isArray(customOrder[item.seleteOrder])
      ) {
        // 数据存在且是数组
        customOrder[item.seleteOrder] = [
          ...customOrder[item.seleteOrder],
          item,
        ];
      }
      {
        // 数据不存在
        customOrder[item.seleteOrder] = item;
      }
    });
    let saveData = {
      id: genID(10) + '',
      pathData: oneData,
      projectData: twoData,
      customData: customOrder,
    };
    setCurrent(3);
    addProject(saveData);
  }
  /**
   * @function 保存之前数据-并前往完成页
   */
  function toOk() {
    let saveData = {
      id: genID(10) + '',
      pathData: oneData,
      projectData: twoData,
    };
    setCurrent(3);
    addProject(saveData);
  }
  return (
    <BodyBgc width={'80%'}>
      <div className={styles.step_three_div}>
        <div className={styles.body_div}>
          <div className={styles.title_div}>项目指定指令定制化</div>
          <div className={styles.from_div}>
            <div className={styles.table_btn_div}>
              <Button type="primary" onClick={showDrawe}>
                新增定制化
              </Button>
            </div>
            <Table {...tableProps} />
          </div>
          <div className={styles.btn_div}>
            <Button type="primary" onClick={toLeft}>
              上一步
            </Button>
            <Button
              type="primary"
              style={{
                marginLeft: 12,
              }}
              onClick={saveData}
              disabled={cusList.length === 0}
            >
              确定
            </Button>
            <Button
              danger
              style={{
                marginLeft: 12,
              }}
              type="primary"
              onClick={toOk}
            >
              无需定制
            </Button>
          </div>
        </div>
        <CustomDrawer
          scriptEnum={cusCriptEnum}
          models={props.models}
          ref={customRef}
          twoData={twoData}
          addData={addData}
        />
      </div>
    </BodyBgc>
  );
}
export default forwardRef(index);
