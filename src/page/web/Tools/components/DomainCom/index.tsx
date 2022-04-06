/**
 * @file 域名ip查询组件
 */
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { copyText } from 'utils';
import { getDomainId } from 'utils/System';
import { Filter } from 'xl-study-com';
import styles from '../index.module.scss';
interface IProps {
  models: any;
  actions: any;
}
export default function index(props: IProps) {
  const {
    models: { ToolFormFields },
  } = props;
  const [result, setResult] = useState<any>({});
  console.log(result);
  // 筛选组件参数
  const filterProps = {
    queryCondition: ToolFormFields['domainForm'],
    onSearch: async (payload: any) => {
      let data = await getDomainId(payload.domain);
      setResult(data);
    },
    onReset: () => {
      setResult({});
    },
  };
  return (
    <div className={styles.tools_domain_form}>
      <Filter {...filterProps} />
      <div className={styles.result_div}>
        <div className={styles.title_div}>域名查询结果</div>
        <div className={styles.result_body_div}>
          {!isEmpty(result) ? (
            <>
              ip地址
              <a
                style={{
                  margin: '0  8px',
                }}
                onClick={() => {
                  copyText(result.ip);
                }}
              >
                {result.ip}
              </a>
              - 网际互连协议
              <a
                style={{
                  margin: '0  8px',
                }}
                onClick={() => {
                  copyText(result.agreement);
                }}
              >
                {result.agreement}
              </a>
            </>
          ) : (
            <a>请输入进行查询</a>
          )}
        </div>
      </div>
    </div>
  );
}
