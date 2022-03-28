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
import router from 'utils/History';
import { getGitPath } from 'utils/GitUtils';
function index(props: any, ref: any) {
  const { setCurrent, oneData, toTop } = props;
  useImperativeHandle(ref, () => ({
    register,
    getData,
  }));

  const [pathValue, setPathValue] = useState(
    (oneData && oneData.pathValue) || undefined
  );
  function getData() {
    return {
      pathValue,
    };
  }
  function cloneGit() {
    if (pathValue) {
      setCurrent();
    } else {
      message.error('请正确填写');
    }
  }
  function register() {
    setPathValue(undefined);
  }

  async function pathChange(value: any) {
    setPathValue(value);
    let data = await getGitPath(value);
  }

  return (
    <BodyBgc width={'80%'}>
      <div className={styles.steps_one_div}>
        <div className={styles.address_div}>
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
          <div className={styles.btn_div}>
            <Button type="primary" onClick={toTop}>
              重新选择
            </Button>
            <Button
              style={{
                marginLeft: 12,
              }}
              disabled={!pathValue}
              onClick={cloneGit}
              type="primary"
            >
              下一步
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
            <Button
              type="primary"
              style={{
                marginLeft: 12,
              }}
              onClick={router.goBack}
            >
              取消新增
            </Button>
          </div>
        </div>
      </div>
    </BodyBgc>
  );
}
export default forwardRef(index);
