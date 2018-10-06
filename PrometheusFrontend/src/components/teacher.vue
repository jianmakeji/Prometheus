<template lang="html">
  	<div class="teacher">
		<Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>老师管理
			</BreadcrumbItem>
		</Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newTeacher">新建</Button><br /><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
		<Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除老师</span>
	        </p>
	        <div style="text-align:center">
	            {{teacherName}}
	        </div>
	    </Modal>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
	name:"teacher",
	data(){
		return{
			index:"",
			teacherName:"",
			deleteModel:false,
			total:0,
			columns:[
				{ 	title: 'id',	key: 'Id',	align: 'center'	},

				{	title: '姓名',	key: 'name',	align: 'center'},
				{	title: "学科",	key: 'subject',	align: 'center'},
				{	title: "详情",	key: 'opt',	align: 'center',
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
										this.checkTap(params.index)
									}
								}
							}, '查看')
						])
					}
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
                       	},'删除')
						])
					}
			 	}

			],
			dataList:[]
		}
	},
	methods:{
		pageChange(index){
            this.offset = (index - 1) * 10;
			let that = this,
			 	getDataUrl = globel_.serverHost + globel_.configAPI.getTeacherData + that.offset;
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				that.$Loading.finish();
				that.dataList = result.data.rows;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error('获取数据失败！');
			})
		},
		newTeacher(){
			this.$router.push({name:"addTeacher",query:{id:0}});
		},
		checkTap(index){
			let teacherId = this.dataList[index].Id;
			this.$router.push({name:"teacherDetail",query:{id:teacherId}});
		},
		changeTap(index){
			let teacherId = this.dataList[index].Id;
			this.$router.push({name:"addTeacher",query:{id:teacherId}});
		},
		removeTap(index){
			this.index = index;
			this.teacherName = this.dataList[index].name;
			this.deleteModel = true;
		},
		okTap(){
            let that = this,
				deleteUrl = globel_.serverHost + globel_.configAPI.deleteTeacherById.replace(":id",this.dataList[this.index].Id);
			this.$Loading.start();
			this.$http.delete(deleteUrl).then(function(result){
				if(result.status == 200){
					that.$Message.success({duration:3,content:globel_.configMessage.deleteSuccess});
					let getDataUrl = globel_.serverHost + globel_.configAPI.getTeacherData + that.offset;
					that.$http.get( getDataUrl ).then(function(result){
						that.$Loading.finish();
						that.dataList = result.data.rows;
						that.total = result.data.count;
					}).catch(function(err){
						that.$Loading.error();
						that.$Message.error({duration:3,content:err});
					})
				}
			}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:3,content:err});
			})
		}
	},
	created(){
		let that = this,
			getDataUrl = globel_.serverHost + globel_.configAPI.getTeacherData + that.offset;
		this.$Loading.start();
		this.$http.get( getDataUrl ).then(function(result){
			that.$Loading.finish();
			that.dataList = result.data.rows;
			that.total = result.data.count;
		}).catch(function(err){
			that.$Loading.error();
		})
	}
}
</script>

<style lang="css">
.teacher{
	padding: 20px;
}
</style>
