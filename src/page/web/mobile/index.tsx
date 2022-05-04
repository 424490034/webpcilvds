/**
 * @file web-pc页面
 */
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'dva';
import pageConfig from './config/pageConfig';
import {
  FloatCard,
  HeaderCard,
  BodyBgc,
  ProjectCard,
  OrderCard,
  EmptyCard,
} from 'components';
import styles from './index.module.scss';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { Input } from 'antd';
const { namespace, pageName } = pageConfig;
function index(props: any) {
  const {
    [namespace]: { projetData },
    actions,
  } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [optionsData, setOptionsData] = useState({});
  const [searchValue, setSearchValue] = useState();
  const [searchList, setSearchList] = useState(projetData);
  useEffect(() => {
    setSearchValue(undefined);
    setSearchList(projetData);
  }, [projetData]);
  function asyncData(data: any) {
    if (!isEmpty(data)) {
      setOptionsData(data);
      setShowOptions(true);
    } else {
      setOptionsData({});
      setShowOptions(false);
    }
  }
  let floatProps = useMemo(() => {
    return {
      isVisualShow: false,
      aniOutCss: 'animate__backInDown',
      style: {
        width: '100%',
        height: '100%',
        margin: 0,
      },
    };
  }, []);
  function searchChange(e: any) {
    const value = e.target.value;
    if (!value) {
      setSearchValue(value);
      setSearchList(projetData);
    }
    let list = projetData.filter(
      (item: any) => item?.projectData?.name?.indexOf(value) !== -1
    );
    setSearchValue(value);
    setSearchList(list);
  }
  const customCom = (
    <Input
      // 参数
      onChange={searchChange}
      value={searchValue}
      placeholder="输入进行筛选"
    />
  );
  return (
    <div className={styles.show_card}>
      <FloatCard {...floatProps}>
        <HeaderCard title={pageName} customCom={customCom}>
          <>
            <div
              className={styles.body_div}
              style={{
                height: showOptions ? 400 : '100%',
              }}
            >
              {Array.isArray(searchList) && searchList.length > 0 ? (
                searchList.map((item: any, index: number) => {
                  return (
                    <ProjectCard
                      key={index}
                      item={item}
                      type="1"
                      asyncData={asyncData}
                      showOptions={showOptions}
                      optionsData={optionsData}
                      setOptionsData={asyncData}
                      actions={actions}
                    />
                  );
                })
              ) : (
                <EmptyCard title="请先添加项目" />
              )}
            </div>
            {showOptions && (
              <BodyBgc width={'90%'}>
                <OrderCard data={optionsData} />
              </BodyBgc>
            )}
          </>
        </HeaderCard>
      </FloatCard>
    </div>
  );
}
const mapStateToProps = (props: any) => {
  return {
    [namespace]: props[namespace],
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: {
      fetchProjectDetail(payload: any) {
        dispatch({
          type: `${namespace}/fetchProjectDetail`,
          payload,
        });
      },
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
