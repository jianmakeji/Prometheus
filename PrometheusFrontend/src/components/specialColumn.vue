<template lang="html">
	<div class="specialColumn">
		<Breadcrumb>
	        <BreadcrumbItem>
	            <Icon type="ios-build" size="24"/>视频类别管理
	        </BreadcrumbItem>
	    </Breadcrumb><br />
		<Button icon="md-add" type="primary" @click="newType">新建</Button><br /><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
		<Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除类别</span>
	        </p>
	        <div style="text-align:center">
	            {{typeTitle}}
	        </div>
	    </Modal>
    </div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
    name:"specialColumn",
    data () {
        return {
			offset:0,
			deleteModel:false,
			typeTitle:"",
			index:"",
			total:0,
			columns:[
				{
                    title: 'id',
                    key: 'Id',
					align: 'center'
                },
                {
                    title: '专栏名称',
                    key: 'name',
					align: 'center'
                },
                {
                    title: '所属类型',
                    key: "courseType",
					align: 'center'
                },
				{
                    title: '对应老师id',
                    key: "teacherId",
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
                       	},'删除')
						])
					}
			 	}
			],
			dataList: []
        }
    },
    methods: {
		pageChange(index){
			this.offset = (index - 1) * 10;
			let that = this,
			 	getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnData + that.offset;
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				that.$Loading.finish();
				that.dataList = result.data.rows;
			}).catch(function(err){
				console.log(err);
				that.$Loading.error();
				that.$Message.error('获取数据失败！');
			})
		},
		newType(){
			this.$router.push({name:"addSpecialColumn",query:{id:0}});
		},
		changeTap(index){
			let typeId = this.dataList[index].Id;
			this.$router.push({name:"addSpecialColumn",query:{id:typeId}});
		},
		removeTap(index){
			this.index = index;
			this.deleteModel = true;
			this.typeTitle = this.dataList[index].title;
		},
		okTap(){
			let that = this,
				deleteUrl = globel_.serverHost + globel_.configAPI.deleteSpecialColumnById.replace(":id",this.dataList[this.index].Id);
			this.$Loading.start();
			this.$http.delete(deleteUrl).then(function(result){
				// console.log(result);
				if(result.status == 200){
					that.$Message.success("删除成功！");
					let getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnData + that.offset;
					that.$http.get( getDataUrl ).then(function(result){
						that.$Loading.finish();
						that.dataList = result.data.rows;
					}).catch(function(err){
						that.$Loading.error();
						that.$Message.error("获取数据失败！");
					})
				}
				that.dataList = result.data.rows;
			}).catch(function(err){
					console.log(err);
					that.$Loading.error();
					that.$Message.error("删除失败！");
			})
		}
    },
	created(){
		console.log(globel_.serverHost);
		let that = this,
			getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnData + that.offset;
		this.$http.get( getDataUrl ).then(function(result){
			console.log(result);
			that.dataList = result.data.rows;
			that.total = result.data.count;
		}).catch(function(err){
				console.log(err);
		})
	}
}
</script>

<style lang="css">
.specialColumn{
	padding: 20px;
}
</style>
