
export const ColConfig = {
span: 24,
};
  

export const formItemLayout = {
labelCol: { span: 8 }, // 左侧 label 宽度
wrapperCol: { span: 16 }, // 右侧 控件 宽度
style: {
	marginBottom:24,
},
};
  

export const batchFormNames = {

	name:'name',

};
    

export const batchFormConditions = [
		
		{
			inputType:'input',
			title:batchFormNames.name,
			label:'快捷指令名',

			itemConfig:{
				rules:[
					
					{
						required:true,
						message:'请输入',
					},
				],
			},

			componentsConfig:{
				placeholder:'请输入',
				autoComplete:'off',
				allowClear:true,
				maxLength:100,
			},
			formItemLayout,
			ColConfig,
		},
];
    