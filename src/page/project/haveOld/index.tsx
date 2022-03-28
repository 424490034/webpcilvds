/**
 * @file 已有项目添加
 */
import React, { useMemo, useRef, useState } from 'react';
import pageConfig from './config/pageConfig';
import { connect } from 'dva';
import { FloatCard, HeaderCard } from 'components';
import styles from './index.module.scss';
import StepsCom from './components/Steps';
import StepOne from './components/StepOne';
import StepThree from '../addNew/components/StepThree';
import StepFour from '../addNew/components/StepFour';
import BasicsCard from './components/BasicsCard';
import { getPackage } from 'utils/GitUtils';
import { ItemUtils } from 'xl-study-com';
import { Form, message } from 'antd';
import { cloneDeep } from 'lodash';
import StepTwo from './components/StepTwo';
import CustomCard from './components/CustomCard';
const { namespace, pageName } = pageConfig;

function index(props: any) {
  const {
    actions,
    [namespace]: { formNames, formConditions, isProject },
  } = props;
  const stepsOne: any = useRef();
  const stepsTwo: any = useRef();
  const stepsThree: any = useRef();
  const [current, setCurrent] = useState(0);
  const [oneData, setOneData] = useState();
  const [twoData, setTwoData] = useState();
  // 表单的动态数据
  const [formFields, setFormFields] = useState<any[]>(formConditions);
  // 表单的默认数据
  const [formInit, setFormInit] = useState<any>({});
  // 当前项目的script枚举
  const [scriptEnum, setScriptEnum] = useState<any>([]);
  const [formTwo] = Form.useForm();
  let floatProps = useMemo(() => {
    return {
      isVisualShow: false,
      aniOutCss: 'animate__fadeInUpBig',
      style: {
        width: '100%',
        height: '100%',
        margin: 0,
      },
    };
  }, []);
  function setProjectData(status: number) {
    actions.setProject({
      isProject: status,
    });
  }
  /**
   * @function 本地仓库完成操作调用
   */
  function oneDataChange() {
    const data = stepsOne?.current?.getData();
    setOneData(data);
    getGitData(data);
    setCurrent(1);
  }
  /**
   * @function 第二步完成配置时调用
   * @param values 配置数据
   */
  function twoDataChange(values: any) {
    setTwoData(values);
    setCurrent(2);
  }
  /**
   * @function 获取git名称并获取对应package数据已经全部分支数据
   * @param gitName 仓库名称
   * @param oneNowData 最新
   */
  async function getGitData(oneNowData: any) {
    // 拿取最新数据
    const { pathValue } = oneNowData;
    // 组装仓库本地地址
    const projectPath = pathValue;
    // 进行package.json数据获取
    const packageData = await getPackage(projectPath);
    // 在进行循环时判断是否可以存在默认值
    let startKey: any, buildKey: any;
    // 进行指令转换为枚举数组
    const scriptEnum = Object.keys(packageData).map((item: any) => {
      // 如果存在start  则视为默认启动指令
      if (item === 'start') {
        startKey = item;
      }
      // 如果存在build  则视为默认打包指令
      if (item === 'build') {
        buildKey = item;
      }
      return {
        label: item,
        value: item,
      };
    });
    // 进行form表单配置
    const queryCondition: any = ItemUtils.getItemType(cloneDeep(formConditions))
      .extend([
        {
          title: formNames.startCode,
          selectCondition: scriptEnum,
        },
        {
          title: formNames.buildCode,
          selectCondition: scriptEnum,
        },
      ])
      .values();
    setFormFields(queryCondition);
    setScriptEnum(scriptEnum);
    // 设置分支选择的默认值
    formTwo.setFieldsValue({
      [formNames.path]: projectPath,
      [formNames.startCode]: startKey,
      [formNames.buildCode]: buildKey,
    });
    setFormInit({
      ...formInit,
      [formNames.path]: projectPath,
      [formNames.startCode]: startKey,
      [formNames.buildCode]: buildKey,
    });
  }
  function toTop() {
    setCurrent(0);
    actions.setProject({
      isProject: undefined,
    });
  }
  return (
    <div className={styles.old_new_div}>
      <FloatCard {...floatProps}>
        <HeaderCard title="添加已有项目">
          <div className={styles.body_div}>
            {!isProject && <BasicsCard setProjectData={setProjectData} />}
            {isProject === 1 && (
              <>
                <StepsCom
                  isProject={isProject}
                  models={props[namespace]}
                  current={current}
                />
                {current == 0 && (
                  <CustomCard
                    setCurrent={setCurrent}
                    toTop={toTop}
                    models={props[namespace]}
                  />
                )}
                {current === 1 && (
                  <StepFour
                    twoData={{
                      type: '5',
                    }}
                  />
                )}
              </>
            )}
            {isProject === 2 && (
              <>
                <StepsCom
                  isProject={isProject}
                  models={props[namespace]}
                  current={current}
                />
                {current == 0 && (
                  <StepOne
                    oneData={oneData}
                    setCurrent={oneDataChange}
                    ref={stepsOne}
                    toTop={toTop}
                  />
                )}
                {current == 1 && (
                  <StepTwo
                    models={props[namespace]}
                    ref={stepsTwo}
                    oneData={oneData}
                    form={formTwo}
                    formFields={formFields}
                    formInit={formInit}
                    twoDataChange={twoDataChange}
                    setCurrent={setCurrent}
                  />
                )}
                {current == 2 && (
                  <StepThree
                    scriptEnum={scriptEnum}
                    oneData={oneData}
                    twoData={twoData}
                    models={props[namespace]}
                    ref={stepsThree}
                    setCurrent={setCurrent}
                  />
                )}
                {current === 3 && <StepFour twoData={twoData} />}
              </>
            )}
          </div>
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
      setProject(payload: any) {
        dispatch({
          type: `${namespace}/setProject`,
          payload,
        });
      },
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
