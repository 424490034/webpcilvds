
export const ColConfig = {
span: 16,
};

export const formItemLayout = {
labelCol: { span: 6 }, // 左侧 label 宽度
wrapperCol: { span: 14 }, // 右侧 控件 宽度
style: {
	marginBottom:24,
},
};

export const domainFormNames = {
	domain:'domain',
};
    
export const domainFormConditions = [
		{
			inputType:'input',
			title:domainFormNames.domain,
			label:'需要查询的域名地址',
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
    