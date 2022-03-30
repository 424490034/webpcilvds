
import { extraEnum } from 'page/project/addNew/config/threeFormFields';
export const tableList = [
    {
      title: '指定指令',
      key: 'seleteOrder',
    },
    {
      title: '触发时机',
      key: 'timing',
        render: (text: string)=>{
          switch (text) {
              case '1':
                  return '执行指令之前'
              default:
                  return '执行指令之后'
          }
      }
    },
    {
      title: '定制操作',
      key: 'extra',
        render: (text: string) => {
            let data = '';
            extraEnum.map((item:any) => {
                if (item.value === text) {
                    data = item.label
                }
            })
            return data
        }
      
    },
];