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
                // { 	title: 'id',	key: 'Id',	align: 'center'	},
                {	title: '用户名',	key: 'nickName',	align: 'center'},
				{	title: '用户头像',	key: 'avatarUrl',	align: 'center',
                    render: (h, params) => {
                          return h('img', {
                            domProps: {
                                  type: 'primary',
                                  size: 'small',
                                  src:  params.row.avatarUrl
                              },
                              style: {
                                  width: '40px',
                                  height:"40px",
                                  margin:"10px auto",
                                  borderRadius:"40px"
                              },
                          })
                      }
                }
			],
			dataList:[]
		}
	},
	methods:{
		pageChange(index){
            this.offset  = (index-1)*10;
            let that = this,
				getDataUrl = globel_.serverHost+ globel_.configAPI.getUser;
			this.$Loading.start();
			this.$http.get( getDataUrl ,{params:{
                limit:10,
                offset:that.offset
            }}).then(function(result){
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
        let getDataUrl = globel_.serverHost+ globel_.configAPI.getUser;
		this.$http.get( getDataUrl ,{params:{
            limit:10,
            offset:that.offset
        }}).then(function(result){
			that.$Loading.finish();
			that.dataList = result.data.rows;
			that.total = result.data.count;
		}).catch(function(err){
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
