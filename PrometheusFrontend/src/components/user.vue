<template lang="html">
  	<div class="user">
		<Breadcrumb>
	        <BreadcrumbItem>
	            <Icon type="ios-build" size="24"/>用户管理
	        </BreadcrumbItem>
	    </Breadcrumb><br />
		<Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
	name:"user",
	data(){
		return{
			total:0,
            offset:0,
			columns:[
				{ 	title: 'id',	key: 'id',	align: 'center'	},
				{	title: '用户名',	key: 'name',	align: 'center'}
			],
			dataList:[]
		}
	},
	methods:{
		pageChange(index){
			console.log(index);
            this.offset  = (index-1)*10;
            let that = this,
				getDataUrl = globel_.serverHost+ globel_.configAPI.getUser + this.offset;
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				that.$Loading.finish();
				that.dataList = result.data.rows;
				that.total = result.data.count;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		},
	},
    created(){
        let that = this;
        let getDataUrl = globel_.serverHost+ globel_.configAPI.getUser + this.offset;
		this.$http.get( getDataUrl ).then(function(result){
            console.log(result);
			that.$Loading.finish();
			that.dataList = result.data.rows;
			that.total = result.data.count;
		}).catch(function(err){
            console.log(err)
			that.$Loading.error();
			that.$Message.error({duration:3,content:err});
		})
    }
}
</script>

<style lang="css" scoped>
.user{
	padding: 20px;
}
</style>
