import { domainFormConditions } from './domainFormFields';
import {
  colorCodeFormConditions,
  colorFormConditions,
} from './colorFormFields';
/**
 * @file 操作表单汇总
 */
export default {
  domainForm: domainFormConditions,
  colorForm: {
    rgb: colorFormConditions,
    code: colorCodeFormConditions,
  },
};
