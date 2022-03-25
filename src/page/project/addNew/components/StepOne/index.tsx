/**
 * @file 仓库地址获取和拉取
 */
import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from 'react';
import BodyBgc from '../bodyBgc';
import styles from '../index.module.scss';
import { Button, Input, message } from 'antd';
import classNames from 'classnames';
import { SeletePath } from 'components';
import { executeOrder } from 'utils/xlOrder';
import OutPutOrder from 'utils/orderOutPut';
let outputOrder: any = undefined;
function index(props: any, ref: any) {
  const { setCurrent, oneData } = props;
  useEffect(() => {
    outputOrder = new OutPutOrder({
      selete: '#gitResult',
      callback: orderCallback,
    });
    return () => {
      outputOrder = undefined;
    };
  }, []);
  useImperativeHandle(ref, () => ({
    register,
    getData,
  }));
  // 拉取前 init 拉取中 load 拉取后 成功 success 失败 error
  const [status, setStatus] = useState('init');
  const [gitValue, setGitValue] = useState(oneData.gitValue || undefined);
  const [pathValue, setPathValue] = useState(oneData.pathValue || undefined);
  function orderCallback(isError: boolean) {
    if (!isError) {
      setCurrent();
    }
  }
  function getData() {
    return {
      gitValue,
      pathValue,
    };
  }
  function cloneGit() {
    if (gitValue && pathValue) {
      setStatus('load');
      runOrder();
    } else {
      message.error('请正确填写');
    }
  }
  function register() {
    setStatus('init');
    setPathValue(undefined);
    setGitValue(undefined);
    outputOrder?.clearOut();
  }
  function inputChange(e: any) {
    setGitValue(e.target.value);
  }
  function pathChange(value: any) {
    setPathValue(value);
  }
  // 以下为输出相关
  /**
   * @function 运行配置指令
   */
  function runOrder() {
    executeOrder(
      '仓库拉取',
      `git clone ${gitValue}`,
      outputOrder.outputStr,
      pathValue
    );
  }

  return (
    <BodyBgc width={'80%'}>
      <div className={styles.steps_one_div}>
        <div
          className={
            status === 'init' ? styles.address_div : styles.address_load_div
          }
        >
          <div className={styles.title_div}>
            请输入远程仓库地址(git仓库地址)
          </div>
          <div className={styles.input_div}>
            <Input
              value={gitValue}
              onChange={inputChange}
              placeholder="请输入远程仓库地址(git仓库地址)"
            />
          </div>
          <div className={styles.title_div}>
            请选择本地仓库存放地址(本地仓库地址)
          </div>
          <div className={styles.input_div}>
            <SeletePath
              value={pathValue}
              onChange={pathChange}
              placeholder="请选择本地仓库存放地址(本地仓库地址)"
            />
          </div>
          <div className={styles.git_result_div}>
            <div className={styles.result_title_div}>仓库拉取详情</div>
            <div id="gitResult" className={styles.result_body_div}></div>
          </div>
          <div className={styles.btn_div}>
            <Button
              disabled={status !== 'init'}
              onClick={cloneGit}
              type="primary"
            >
              拉取
            </Button>
            <Button
              onClick={register}
              danger
              style={{
                marginLeft: 12,
              }}
              type="primary"
            >
              重置
            </Button>
          </div>
        </div>
      </div>
    </BodyBgc>
  );
}
export default forwardRef(index);
