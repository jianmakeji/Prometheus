<template lang="html">
    <div class="comment">
        <Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>评论管理
			</BreadcrumbItem>
		</Breadcrumb><br />
        <Table :columns="columns" :data="dataList"></Table><br />
		<Page :total="total" show-total @on-change="pageChange"/>
        <Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除评论</span>
	        </p>
	        <div style="text-align:center">
	            {{commentTitle}}
	        </div>
	    </Modal>
    </div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
    name:"comment",
    data(){
        return{
            id:"",
            index:"",
            offset:0,
            total:100,
            commentTitle:"",
            deleteModel:false,
            columns:[
                { title: 'id', key: 'Id', align: 'center', width:100},
                { title: '用户ID', key: 'userId', align: 'center', width:100 },
                { title: '用户名称', key: 'nickName', align: 'center', width:100,
                    render:(h, params) =>{
                        return h('div',[
                            h('p', params.row.user.nickName)
                        ])
                    }
                },
                { title: '课程', key: 'courseId', align: 'center', width:200},
                { title: '内容', key: 'content', align: 'center' },
                { title: '操作', key: 'opt', align: 'center', width:200,
        			render: (h, params) => {
        				return h("div",[
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
            dataList:[],
        }
    },
    methods:{
        pageChange(index){
            this.offset  = (index-1)*10;
            let that = this,
                getDataUrl = globel_.serverHost+ globel_.configAPI.getCommentData + this.offset;
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
        removeTap(index){
			this.index = index;
			this.deleteModel = true;
			this.commentTitle = this.dataList[index].content;
		},
        okTap(){
            let that = this,
				deleteUrl = globel_.serverHost + globel_.configAPI.deleteCommentById.replace(":id",this.dataList[this.index].Id);
			this.$Loading.start();
			this.$http.delete(deleteUrl).then(function(result){
				if(result.status == 200){
					that.$Message.success({duration:3,content:globel_.configMessage.deleteSuccess});
					let getDataUrl = globel_.serverHost + globel_.configAPI.getCommentData + that.offset;
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
        let that = this;
		this.$Loading.start();
		let getDataUrl = globel_.serverHost+ globel_.configAPI.getCommentData + this.offset;
		this.$http.get( getDataUrl ).then(function(result){
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

<style lang="css">
.comment{
    padding: 20px;
}
</style>
