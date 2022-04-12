import { domainFormConditions } from './domainFormFields';
import {
  colorCodeFormConditions,
  colorFormConditions,
} from './colorFormFields';
import {
  imgCompressFormConditions,
  imgCompressFormNames,
  initKeys,
  initImgKeys,
} from './imgCompressFormFields';
/**
 * @file 操作表单汇总
 */
export default {
  // 域名查询表单
  domainForm: domainFormConditions,
  // 颜色转换表单
  colorForm: {
    rgb: colorFormConditions,
    code: colorCodeFormConditions,
  },
  // 图片压缩表单
  imgCompress: {
    imgCompressFormConditions,
    imgCompressFormNames,
    initKeys,
    initImgKeys,
  },
};
