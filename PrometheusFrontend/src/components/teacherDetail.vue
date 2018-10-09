<template lang="html">
  	<div class="teacherDetail">
		<Breadcrumb>
  			<BreadcrumbItem to="/teacher">
  				<Icon type="ios-build" size="24"/>老师管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>老师专题查询
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
		<Modal v-model="checkModel" width="720">
	        <p slot="header" style="color:#2db7f5;text-align:center;font-size:18px;">
	            <Icon type="ios-eye" size="20"></Icon>
	            <span>{{specialColumnTitle}}:共{{courseTotal}}个课程</span>
	        </p>
	        <div style="text-align:center">
			        <Table height="400" :columns="courseColums" :data="courseList"></Table><br />
	        </div>
	    </Modal>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
	name:"teacherDetail",
	data(){
		return{
			id:"",
			total:0,
			checkModel:false,
			columns:[
				{ title: 'id', key: 'Id', align: 'center' },
				{ title: '专栏名', key: 'name', align: 'center' },
                { title: '价格', key: 'price', align: 'center' },
				{ title: '课程详情', key: 'opt', align: 'center',
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
                           	}, '查看课程')
						])
					}
			 	}
			],
			dataList: [],
			//通过专栏查课程的弹出层数据
			specialColumnTitle:"",
			courseTotal:0,
			courseColums:[
				{ title: 'id', key: 'Id', align: 'center' },
				{ title: '课程名', key: 'name', align: 'center' }
			],
			courseList:[]
		}
	},
	methods:{
		pageChange(index){
            this.offset = (index - 1) * 10;
            let that = this,
    			getDataUrl = globel_.serverHost + globel_.configAPI.getTeacherDataById.replace(":id",this.id);
    		this.$http.get( getDataUrl ).then(function(result){
    			// 数据赋值
    			that.$Loading.finish();
    			that.dataList = result.data.special_columns;
    			that.total = result.data.special_columns.length;
    		}).catch(function(err){
    			that.$Loading.error();
    			that.$Message.error({duration:3,content:err});
    		})
		},
		checkTap(index){
			this.specialColumnTitle = this.dataList[index].name;
			this.checkModel = true;
			let specialColumnId = this.dataList[index].Id,
				that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getCourseDataBySpecialColumn.replace(":id",specialColumnId);
			this.$http.get( getDataUrl ).then(function(result){
				// 数据赋值
				that.$Loading.finish();
				that.courseList = result.data.rows;
				that.courseTotal = result.data.count;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		}
	},
	created(){
		this.id = this.$route.query.id;
		let that = this,
			getDataUrl = globel_.serverHost + globel_.configAPI.getTeacherDataById.replace(":id",this.id);
		this.$http.get( getDataUrl ).then(function(result){
			// 数据赋值
			that.$Loading.finish();
			that.dataList = result.data.special_columns;
			that.total = result.data.special_columns.length;
		}).catch(function(err){
			that.$Loading.error();
			that.$Message.error({duration:3,content:err});
		})
	}
}
</script>

<style lang="css" scoped>
.teacherDetail{
	padding: 20px;
}
</style>
