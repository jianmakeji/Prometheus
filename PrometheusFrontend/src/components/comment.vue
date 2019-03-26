<template lang="html">
    <div class="comment">
        <Breadcrumb>
			<BreadcrumbItem>
				<Icon type="ios-build" size="24"/>评论管理
			</BreadcrumbItem>
		</Breadcrumb><br />
        <Form label-position="right" :label-width="80" inline style="width:100%;">
			<FormItem label="课程类别:">
	            <Select v-model="category" @on-change="categoryChange" label-in-value style="width:200px">
					<Option v-for="(item,index) in categoryData" :value="item.Id" :key="index">{{item.name}}</Option>
	            </Select>
	        </FormItem>
	    </Form>
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
import $ from 'jquery'
export default {
    name:"comment",
    data(){
        return{
            id:"",
            index:"",
            offset:0,
            total:100,
            category:1,
            categoryData:[
                {Id:1,name:"专题突破"},
                {Id:2,name:"名校试题"}
            ],
            commentTitle:"",
            deleteModel:false,
            columns:[
                // { title: 'id', key: 'Id', align: 'center', width:100},
                // { title: '用户ID', key: 'userId', align: 'center', width:100 },
                { title: '用户名称', key: 'nickName', align: 'center', width:150,
                    render:(h, params) =>{
                        return h('div',[
                            h('p', params.row.user.nickName)
                        ])
                    }
                },
                { title: '课程', key: 'courseId', align: 'center', width:200,
                    render:(h, params) =>{
                        return h('div',[
                            h('p', params.row.course.name)
                        ])
                    }
                },
                { title: '内容', key: 'content', align: 'center' },
                { title: '操作', key: 'opt', align: 'center', width:80,
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
        categoryChange(option){
            let value = option.value;
			this.category = value;
            console.log(option);
            let that = this,
                getDataUrl = globel_.serverHost+ globel_.configAPI.getCommentData;
            this.$Loading.start();
            this.$http.get( getDataUrl ,{params:{
                limit:10,
                offset:that.offset,
                category:that.category
            }}).then(function(result){
    			that.$Loading.finish();
    			that.dataList = result.data.rows;
    			that.total = result.data.count;
    		}).catch(function(err){
    			that.$Loading.error();
    			that.$Message.error({duration:3,content:err});
    		})
        },
        pageChange(index){
            this.offset  = (index-1)*10;
            let that = this,
                getDataUrl = globel_.serverHost+ globel_.configAPI.getCommentData;
            this.$Loading.start();
            this.$http.get( getDataUrl ,{params:{
                limit:10,
                offset:that.offset,
                category:that.category
            }}).then(function(result){
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
					let getDataUrl = globel_.serverHost + globel_.configAPI.getCommentData;
					that.$http.get( getDataUrl ,{params:{
                        limit:10,
                        offset:that.offset,
                        category:that.category
                    }}).then(function(result){
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
		let getDataUrl = globel_.serverHost + globel_.configAPI.getCommentData;
		this.$http.get( getDataUrl ,{params:{
            limit:10,
            offset:that.offset,
            category:that.category
        }}).then(function(result){
			that.$Loading.finish();
            console.log(result);
			that.dataList = result.data.rows;
			that.total = result.data.count;
		}).catch(function(err){
            console.log(err);
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
