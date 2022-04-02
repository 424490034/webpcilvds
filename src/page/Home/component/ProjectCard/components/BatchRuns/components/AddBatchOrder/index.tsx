/**
 * @file 新增快捷指令组件
 */
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Empty, Input } from 'antd';
import SeleteProject from './components/SeleteProject';
import AllProject from './components/AllProject';
import { EmptyCard } from 'components';
import { SearchOutlined } from '@ant-design/icons';
interface IProps {
  models: any;
  actions: any;
  selectList: any;
  setSelectList: any;
}
export default function index(props: IProps) {
  const {
    actions,
    models: { projectData },
    selectList,
    setSelectList,
  } = props;
  if (projectData.length === 0) {
    return <EmptyCard title="请先新增项目" />;
  }
  useEffect(() => {
    setSearchValue(undefined);
    setSearchList(projectData);
  }, [projectData]);
  const [searchValue, setSearchValue] = useState<string>();
  const [searchList, setSearchList] = useState<any[]>(projectData);

  function setData(id: string, data: any) {
    if (selectList.length !== 0) {
      // 首先判断是否存在
      let isHave =
        selectList.filter((item: any) => item.id === id).length !== 0;
      if (isHave) {
        if (data.terminalKey === undefined && data.initOrderKey == undefined) {
          let newList = selectList.filter((item: any) => item.id !== data.id);
          setSelectList(newList);
        } else {
          let newList = selectList.map((item: any) => {
            if (item.id === id) {
              return data;
            } else {
              return item;
            }
          });
          setSelectList(newList);
        }
      } else {
        setSelectList([...selectList, data]);
      }
    } else {
      setSelectList([data]);
    }
  }
  function onInputChange(e: any) {
    const text = e.target.value;
    setSearchValue(text);
    if (text) {
      let ary = projectData.filter((item: any) => {
        if (item?.projectData?.name) {
          return item.projectData.name.indexOf(text) !== -1;
        } else {
          return item.name.indexOf(text) !== -1;
        }
      });
      setSearchList(ary);
    } else {
      setSearchList(projectData);
    }
  }
  return (
    <div className={styles.history_order_div}>
      <div className={styles.history_sub_title_div}>
        已选择项目执行指令(执行顺序自上而下-按下可拖动)
      </div>
      <SeleteProject list={selectList} setSelectList={setSelectList} />
      <div className={styles.history_sub_title_div}>项目指令选择</div>
      <div className={styles.search_input_div}>
        <Input
          onChange={onInputChange}
          prefix={<SearchOutlined />}
          className={styles.search_input}
          placeholder="搜索"
          value={searchValue}
        />
      </div>
      <AllProject
        selectList={selectList}
        setData={setData}
        projectData={searchList}
      />
    </div>
  );
}
