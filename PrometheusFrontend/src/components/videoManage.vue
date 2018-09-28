<template lang="html">
  	<div class="videoManage">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>视频管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newVideo">新建</Button><br /><br />
		<Form :model="formItem" label-position="right" :label-width="80" inline>
			<FormItem label="专题">
	            <Select v-model="formItem.specialColumn">
					<Option value="beijing">精品课程</Option>
	                <Option value="shanghai">专题突破</Option>
	            </Select>
	        </FormItem>
			<FormItem label="类型">
	            <Select v-model="formItem.type">
					<Option value="beijing">领先课堂</Option>
	                <Option value="shanghai">培优课堂</Option>
					<Option value="shenzhen">汇智课堂</Option>
					<Option value="shenzhen">计算专题</Option>
					<Option value="shenzhen">几何专题</Option>
	                <Option value="shenzhen">压轴题专题</Option>
	            </Select>
	        </FormItem>
			<FormItem label="年级">
	            <Select v-model="formItem.grade">
					<Option value="beijing">七年级</Option>
	                <Option value="shanghai">八年级</Option>
	                <Option value="shenzhen">九年级</Option>
	            </Select>
	        </FormItem>
	    </Form>
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
		<Modal v-model="codeModal"  @on-ok="downloadCode" ok-text="下载图片至本地">
			<p slot="header" style="color:#19be6b;text-align:center;font-size:18px;">
	            <Icon type="ios-brush-outline" />
	            <span>{{codeTitle}}</span>
	        </p>
			<div style="text-align:center" v-show="qrcodeUrl" class="response">
				<qrcode id="codeImage" :value="qrcodeUrl" v-if="qrcodeUrl"	:options="{ size: 120 }"></qrcode>
			</div>
	    </Modal>
		<Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除视频</span>
	        </p>
	        <div style="text-align:center">
	            {{videoTitle}}
	        </div>
	    </Modal>
  	</div>
</template>

<script>
import Qrcode from '@xkeshi/vue-qrcode';
export default {
	name:"videoManage",
	data(){
		return{
			index:"",
			deleteModel:false,
			videoTitle:"",
			qrcodeUrl:"", 		//二维码url内容
			codeTitle:"",		//弹出层标题(视频名称)
			codeModal:false,
			total:100,
			formItem:{
				specialColumn:"",	//专题
				type:"",			//类型
				grade:""			//年级
			},
			columns:[
				{
					title: 'id',
					key: 'id',
					align: 'center'
				},
				{
					title: '名称',
					key: 'title',
					align: 'center'
				},
				{
					title: '类型',
					key: 'type',
					align: 'center'
				},
				{
					title: '专题',
					key: 'specialColumn',
					align: 'center'
				},
				{
					title: '年级',
					key: 'grade',
					align: 'center'
				},
				{ title: '操作', key: 'opt', align: 'center',
					render: (h, params) => {
						return h("div",[
							h('Button', {
                               	props: {
                                   	type: 'primary',
                                   	size: 'small'
                               	},
                               	style: {
                                   	marginRight: '5px'
                               	},
                               	on: {
                                   	click: () => {
                                       	this.changeTap(params.index)
                                   	}
                               	}
                           	}, '修改'),
						   	h('Button', {
	                           	props: {
	                               	type: 'error',
	                               	size: 'small'
	                           	},
	                           	style: {
	                               	marginRight: '5px'
	                           	},
	                           	on: {
	                               	click: () => {
	                                   	this.removeTap(params.index)
	                               	}
	                           	}
                       		},'删除'),
							h('Button', {
	                           	props: {
	                               	type: 'info',
	                               	size: 'small'
	                           	},
	                           	style: {
	                               	marginRight: '5px'
	                           	},
	                           	on: {
	                               	click: () => {
	                                   	this.generateCode(params.index)
	                               	}
	                           	}
                       		},'生成二维码')
						])
					}
			 	}
			],
			dataList: [
				{id:1,title:"领先课堂1",type:"领先课堂",specialColumn:"精品课程",grade:"七年级", codeUrl:"http://www.baidu.com"},
				{id:2,title:"培优课堂1",type:"培优课堂",specialColumn:"精品课程",grade:"八年级", codeUrl:"http://iconfont.cn"},
				{id:3,title:"汇智课堂1",type:"汇智课堂",specialColumn:"精品课程",grade:"九年级", codeUrl:"https://www.iviewui.com"},
				{id:4,title:"计算专题1",type:"计算专题",specialColumn:"专题突破",grade:"七年级", codeUrl:"https://cn.vuejs.org"},
				{id:5,title:"几何专题1",type:"几何专题",specialColumn:"专题突破",grade:"七年级", codeUrl:"http://www.techbrood.com"},
				{id:6,title:"压轴题专题1",type:"压轴题专题",specialColumn:"专题突破",grade:"七年级", codeUrl:"https://developers.weixin.qq.com"}
			]
		}
	},
	components:{
        qrcode : Qrcode
    },
	methods:{
		pageChange(index){
			console.log(index);
		},
		newVideo(){
			this.$router.push({name:"videoAlter",query:{id:0}});
		},
		//修改
		changeTap(index){
			let videoId = this.dataList[index].id;
			console.log(videoId);
			this.$router.push({name:"videoAlter",query:{id:videoId}});
		},
		//删除
		removeTap(index){
			console.log(index);
			this.index = index;
			this.deleteModel = true;
			this.videoTitle = this.dataList[index].title;
		},
		//生成二维码
		generateCode(index){
			this.index = index;
			this.codeModal = true;
			this.codeTitle = this.dataList[this.index].title;
			this.qrcodeUrl = this.dataList[this.index].codeUrl;
		},
		//下载二维码
		downloadCode(){
			let myCanvas = document.getElementById('codeImage');
			let a = document.createElement("a");
			a.href = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
			a.download = this.dataList[this.index].title +".png";
			a.click();
		},
		okTap(){
			console.log(this.index);
		}
	}
}
</script>

<style lang="css">
.videoManage{
	padding: 20px;
}
.ivu-select-selection{
	width: 200px;
}
</style>
