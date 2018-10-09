<template lang="html">
  <div class="courseType">
	<Breadcrumb>
		<BreadcrumbItem>
			<Icon type="ios-build" size="24"/>类别管理
		</BreadcrumbItem>
	</Breadcrumb><br />
	<Button icon="md-add" type="primary" @click="newClass">新建</Button><br /><br />
	<Table :columns="columns" :data="dataList"></Table><br />
	<Page :total="total" show-total @on-change="pageChange"/>
	<Modal v-model="deleteModel" width="360" @on-ok="okTap">
        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
            <Icon type="ios-information-circle" size="20"></Icon>
            <span>确定要删除类别</span>
        </p>
        <div style="text-align:center">
            {{courseTypeTitle}}
        </div>
    </Modal>
  </div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
	name:"courseType",
	data(){
		return{
			offset:0,
			deleteModel:false,
			courseTypeTitle:"",
			index:"",
			total:0,
			columns:[
				{ title: 'id', key: 'Id', align: 'center' },
                { title: '类别名称', key: 'name', align: 'center' },
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
			dataList: []
		}
	},
	methods:{
		//分页页数改变事件
		pageChange(index){
			this.offset = (index - 1) * 10;
			let that = this,
			 	getDataUrl = globel_.serverHost + globel_.configAPI.getCourseTypeData + that.offset;
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				that.$Loading.finish();
				that.dataList = result.data.rows;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error('获取数据失败！');
			})
		},
		newClass(){
			this.$router.push({name:"addCourseType",query:{id:0}});
		},
		changeTap(index){
			let specialColumnId = this.dataList[index].Id;
			this.$router.push({name:"addCourseType",query:{id:specialColumnId}});
		},
		removeTap(index){
			this.index = index;
			this.deleteModel = true;
			this.courseTypeTitle = this.dataList[index].name;
		},
		okTap(){
			let that = this,
				deleteUrl = globel_.serverHost + globel_.configAPI.deleteCourseTypeById.replace(":id",this.dataList[this.index].Id);
			this.$Loading.start();
			this.$http.delete(deleteUrl).then(function(result){
				if(result.status == 200){
					that.$Message.success({duration:3,content:globel_.configMessage.deleteSuccess});
					let getDataUrl = globel_.serverHost + globel_.configAPI.getCourseTypeData + that.offset;
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
			getDataUrl = globel_.serverHost + globel_.configAPI.getCourseTypeData + that.offset;
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

<style lang="css" scoped>
.courseType{
	padding: 20px;
}
</style>
