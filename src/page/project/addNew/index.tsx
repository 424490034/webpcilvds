/**
 * @file 新增项目
 */
import React, { useMemo, useState, useRef, useEffect } from 'react';
import pageConfig from './config/pageConfig';
import { connect } from 'dva';
import styles from './index.module.scss';
import { FloatCard, HeaderCard } from 'components';
import StepsCom from './components/Steps';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import OrderDrawer from './components/OrderDrawer';
import {
  getNowGitBranch,
  getGitBranch,
  getGitName,
  getPackage,
} from 'utils/GitUtils';
import { Form, message } from 'antd';
import { ItemUtils } from 'xl-study-com';
import { cloneDeep } from 'lodash';
const { namespace, pageName } = pageConfig;
function index(props: any) {
  const {
    [namespace]: { formNames, formConditions, initShowConfig, allShowConfig },
  } = props;
  const stepsOne: any = useRef();
  const stepsTwo: any = useRef();
  const drawerRef: any = useRef();
  const stepsThree: any = useRef();
  const [current, setCurrent] = useState(0);
  const [oneData, setOneData] = useState();
  const [twoData, setTwoData] = useState();
  // 表单的动态数据
  const [formFields, setFormFields] = useState<any[]>(formConditions);
  // 表单的默认数据
  const [formInit, setFormInit] = useState<any>({});
  // 表单展示控制
  const [formPick, setFormPick] = useState<string[]>(initShowConfig);
  // 当前项目的script枚举
  const [scriptEnum, setScriptEnum] = useState<any>([]);
  const [formTwo] = Form.useForm();
  useEffect(() => {
    resetAll();
  }, []);
  function resetAll() {
    stepsOne?.current?.register();
    stepsTwo?.current?.register();
  }
  /**
   * @function 远程仓库完成操作调用
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
    drawerRef?.current?.showDrawer(values);
  }
  /**
   * @function 执行执行完成后调用 前往下一步
   */
  function drawerOk() {
    setCurrent(2);
  }
  /**
   * @function 获取git名称并获取对应package数据已经全部分支数据
   * @param gitName 仓库名称
   * @param oneNowData 最新
   */
  async function getGitData(oneNowData: any) {
    // 拿取最新数据
    const { pathValue, gitValue } = oneNowData;
    // 获取git仓库名
    const gitName = getGitName(gitValue);
    // 组装仓库本地地址
    const projectPath = `${pathValue}\\${gitName}`;
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

    // 进行git分支数据获取
    getGitBranch(projectPath, (code: any) => {
      let gitsEnum: any = [];
      if (Array.isArray(code) && code.length > 0) {
        gitsEnum = code.map((item: any) => {
          const nameIndex = item.indexOf('remotes');
          let name, depotName;
          if (nameIndex !== -1) {
            let names = item
              .slice(nameIndex + 'remotes'.length)
              .slice(1)
              .split('/');
            if (names.length == 2) {
              name = names[1];
              depotName = names[0];
            } else {
              name = item.slice(nameIndex + 'remotes'.length);
              message.error('分支节点解析异常');
            }
          }
          return {
            label:
              nameIndex !== -1
                ? `远程分支-仓库名:${depotName}-分支名:${name}`
                : item,
            value: item,
          };
        });
      }
      // 进行form表单配置
      const queryCondition: any = ItemUtils.getItemType(
        cloneDeep(formConditions)
      )
        .extend([
          {
            title: formNames.seleteGit,
            selectCondition: gitsEnum,
          },
          {
            title: formNames.startCode,
            selectCondition: scriptEnum,
          },
          {
            title: formNames.buildCode,
            selectCondition: scriptEnum,
          },
          {
            title: formNames.package,
            componentsConfig: {
              onChange: (e: any) => {
                const value = e.target.value;
                if (value === '3') {
                  setFormPick(allShowConfig);
                } else {
                  setFormPick(initShowConfig);
                }
              },
            },
          },
          {
            title: formNames.installOrder,
            selectCondition: scriptEnum,
          },
        ])
        .values();
      setFormFields(queryCondition);
      setScriptEnum(scriptEnum);
    });
    // 获取当前项目的当前分支-新拉取的一般为master但不排除主分支非master
    getNowGitBranch(projectPath, (code: any) => {
      // 设置分支选择的默认值
      formTwo.setFieldsValue({
        [formNames.seleteGit]: code,
        [formNames.gitName]: gitName,
        [formNames.path]: projectPath,
        [formNames.startCode]: startKey,
        [formNames.buildCode]: buildKey,
      });
      setFormInit({
        ...formInit,
        [formNames.seleteGit]: code,
        [formNames.gitName]: gitName,
        [formNames.path]: projectPath,
        [formNames.startCode]: startKey,
        [formNames.buildCode]: buildKey,
      });
    });
  }
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
  return (
    <div className={styles.add_new_div}>
      <FloatCard {...floatProps}>
        <HeaderCard title="新增项目">
          <div className={styles.body_div}>
            <StepsCom
              models={props[namespace]}
              current={current}
              setCurrent={setCurrent}
            />
            {current == 0 && (
              <StepOne
                oneData={oneData}
                setCurrent={oneDataChange}
                ref={stepsOne}
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
                formPick={formPick}
                setFormPick={setFormPick}
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
          </div>
        </HeaderCard>
      </FloatCard>
      <OrderDrawer drawerOk={drawerOk} ref={drawerRef} />
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
      // fetchSystem(payload: any) {
      //   dispatch({
      //     type: `${namespace}/reloadSystem`,
      //     payload,
      //   });
      // },
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
