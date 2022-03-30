/**
 * @file web-pc页面
 */
import React, { useMemo, useState } from 'react';
import { connect } from 'dva';
import pageConfig from './config/pageConfig';
import {
  FloatCard,
  HeaderCard,
  BodyBgc,
  ProjectCard,
  OrderCard,
} from 'components';
import styles from './index.module.scss';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
const { namespace, pageName } = pageConfig;
function index(props: any) {
  const {
    [namespace]: { projetData },
    actions,
  } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [optionsData, setOptionsData] = useState({});
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
  return (
    <div className={styles.show_card}>
      <FloatCard {...floatProps}>
        <HeaderCard title={pageName}>
          <div
            className={styles.body_div}
            style={{
              height: showOptions ? 400 : '100%',
            }}
          >
            {Array.isArray(projetData) &&
              projetData.map((item: any, index: number) => {
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
              })}
          </div>
          {showOptions && (
            <BodyBgc width={'90%'}>
              <OrderCard data={optionsData} />
            </BodyBgc>
          )}
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
