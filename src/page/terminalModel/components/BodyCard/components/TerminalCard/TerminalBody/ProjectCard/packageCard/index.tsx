/**
 * @file package解析卡片
 */
import { Tag, Tooltip, Modal, message } from 'antd';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { parsePackage } from 'utils/xlOrder';
import { YoutubeOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';
import { openFileInFolder } from 'electron/download/util';
const { confirm } = Modal;
interface IProps {
  actions: any;
  models: any;
  terData: any;
  height: string;
  runPackageOrder: any;
  stopOrder: any;
  clearDiv: any;
}
function index(props: IProps, ref: any) {
  const { clearDiv, terData = {}, runPackageOrder, stopOrder } = props;
  const { projectData = {} } = terData;
  const [packageData, setPackageData] = useState<any>({}); // script对应数据
  const [packageList, setPaceageList] = useState<any>([]); // 解析后的key集合
  const [isError, setError] = useState(false);
  const [runKey, setRunKey] = useState<string>('');
  useImperativeHandle(ref, () => ({
    clearKey,
  }));
  useEffect(() => {
    if (terData.initOrderKey) {
      if (terData.initOrderKey === 'orderOpenVSCode') {
        codeRun();
      } else if (terData.initOrderKey === 'orderOpenExplorer') {
        openPath();
      } else if (terData.initOrderKey === 'orderOpenCmd') {
        codeCmd();
      } else if (terData.initOrderKey === 'orderOpenPowerShell') {
        codePowerShell();
      } else if (terData.initOrderKey === 'orderOpenSmartGit') {
        codeSmartGit();
      } else if (!runKey) {
        run(terData.initOrderKey);
      } else {
        if (runKey && terData.initOrderKey !== runKey) {
          run(terData.initOrderKey);
        }
      }
    }
  }, [terData]);
  function clearKey() {
    setRunKey('');
  }
  // 打开文件路径
  async function openPath() {
    if (projectData.path) {
      openFileInFolder(projectData.path);
    } else {
      message.error('文件路径丢失');
    }
  }
  useEffect(() => {
    parsePackage(projectData.path).then((results) => {
      if (results && !results.isError && results.data) {
        // 不存在错误
        setError(false);
        setPackageData(results.data);
        setPaceageList(Object.keys(results.data));
      } else {
        setError(true);
        setPackageData({});
        setPaceageList([]);
      }
    });
  }, []);
  function run(key: string) {
    if (key === runKey) {
      return;
    }
    if (runKey) {
      stopOrder();
      setRunKey(key);
      runPackageOrder(`npm run ${key}`, false, key);
      return;
    }
    setRunKey(key);
    runPackageOrder(`npm run ${key}`, false, key);
  }
  function codeRun() {
    runPackageOrder(`code .`, true);
  }
  function codeCmd() {
    runPackageOrder(`start cmd`, true);
  }
  function codePowerShell() {
    runPackageOrder(`start PowerShell`, true);
  }
  function codeSmartGit() {
    runPackageOrder(`smartgit .`, true);
  }
  return (
    <div
      className={styles.terminal_project_div}
      onMouseDown={(e) => {
        e?.stopPropagation(); //  取消父级事件冒泡
        // 取消绑定在document上的事件冒泡（原生）
        e?.nativeEvent.stopImmediatePropagation();
      }}
      onMouseMove={(e) => {
        e?.stopPropagation(); //  取消父级事件冒泡
        // 取消绑定在document上的事件冒泡（原生）
        e?.nativeEvent.stopImmediatePropagation();
      }}
      onMouseUp={(e) => {
        e?.stopPropagation(); //  取消父级事件冒泡
        // 取消绑定在document上的事件冒泡（原生）
        e?.nativeEvent.stopImmediatePropagation();
      }}
    >
      {isError ? (
        <div className={styles.terminal_project_error_div}>
          当前项目package文件不存在
        </div>
      ) : (
        <>
          <Tooltip title={'快捷打开powerShell窗口'}>
            <Tag
              icon={<YoutubeOutlined />}
              className={styles.icon_cus}
              color={'#f50'}
              onClick={codePowerShell}
            >
              powerShell
            </Tag>
          </Tooltip>
          <Tooltip title={'快捷打开cmd窗口'}>
            <Tag
              icon={<YoutubeOutlined />}
              className={styles.icon_cus}
              color={'#f50'}
              onClick={codeCmd}
            >
              cmd窗口
            </Tag>
          </Tooltip>
          <Tooltip title={'请确保已安装SmartGit并配置环境'}>
            <Tag
              onClick={codeSmartGit}
              icon={<YoutubeOutlined />}
              className={styles.icon_cus}
              color={'#f50'}
            >
              打开SmartGit
            </Tag>
          </Tooltip>
          <Tooltip title={'请确保已安装vscode并配置环境'}>
            <Tag
              onClick={codeRun}
              icon={<YoutubeOutlined />}
              className={styles.icon_cus}
              color={'#f50'}
            >
              打开项目
            </Tag>
          </Tooltip>
          <Tooltip title={'使用资源管理器打开'}>
            <Tag
              onClick={openPath}
              icon={<YoutubeOutlined />}
              className={styles.icon_cus}
              color={'#f50'}
            >
              打开所在路径
            </Tag>
          </Tooltip>
          <Tooltip title={'清理控制台'}>
            <Tag
              onClick={clearDiv}
              icon={<YoutubeOutlined />}
              className={styles.icon_cus}
              color={'#f50'}
            >
              清除打印
            </Tag>
          </Tooltip>
          {packageList.map((item: any, index: number) => {
            return (
              <Tooltip title={packageData[item]} key={index}>
                <Tag
                  onClick={() => {
                    run(item);
                  }}
                  icon={<YoutubeOutlined />}
                  className={styles.icon_cus}
                  color={runKey === item ? '#87d068' : '#2db7f5'}
                >
                  {item}
                </Tag>
              </Tooltip>
            );
          })}
        </>
      )}
    </div>
  );
}
export default forwardRef(index);
