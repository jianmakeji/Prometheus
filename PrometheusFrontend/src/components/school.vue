<template lang="html">
    <div class="school">
        <Breadcrumb>
            <BreadcrumbItem>
                <Icon type="ios-build" size="24"/>学校管理
            </BreadcrumbItem>
        </Breadcrumb><br />
        <Button icon="md-add" type="primary" @click="newSchool">新建</Button><br /><br />
        <Table :columns="columns" :data="dataList"></Table><br />
        <Page :total="total" show-total @on-change="pageChange"/>
        <Modal v-model="deleteModel" width="360" @on-ok="okTap">
	        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>确定要删除学校？</span>
	        </p>
	        <div style="text-align:center">
	            {{schoolTitle}}
	        </div>
	    </Modal>
    </div>
</template>

<script>
import globel_ from './../config/global.vue'
import $ from 'jquery'
export default {
	name:"school",
	data(){
		return{
            id:"",
            offset:0,
			total:0,
            deleteModel:false,
            schoolTitle:"",
            columns:[
                { title: 'id', key: 'Id', align: 'center' ,width:90},
                { title: '名称', key: 'name', align: 'center' },
                { title: '操作', key: 'opt', align: 'center',width:160,
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
        newSchool(){
            this.$router.push({name:"addSchool",query:{id:0}});
        },
        pageChange(index){
            this.offset  = (index-1)*10;
            let that = this,
                getDataUrl = globel_.serverHost + globel_.configAPI.getSchoolData;
            this.$Loading.start();
            this.$http.get( getDataUrl ,{ params:{
                limit:10,
                offset:this.offset
            }}).then(function(result){
    			that.$Loading.finish();
    			that.dataList = result.data.rows;
    			that.total = result.data.count;
    		}).catch(function(err){
    			that.$Loading.error();
    			that.$Message.error({duration:3,content:err});
    		})
        },
        changeTap(index){
            let schoolId = this.dataList[index].Id;
			this.$router.push({name:"addSchool",query:{id:schoolId}});
        },
        removeTap(index){
            this.index = index;
			this.deleteModel = true;
			this.schoolTitle = this.dataList[index].name;
        },
        okTap(){
            let that = this,
				deleteUrl = globel_.serverHost + globel_.configAPI.deleteSchoolById.replace(":id",this.dataList[this.index].Id);
			this.$Loading.start();
			this.$http.delete(deleteUrl).then(function(result){
				if(result.status == 200){
					that.$Message.success({duration:3,content:globel_.configMessage.deleteSuccess});
                    let getDataUrl = globel_.serverHost + globel_.configAPI.getSchoolData;
            		that.$http.get( getDataUrl ,{ params:{
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
			}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:3,content:err});
			})
        }
	},
	created(){
        let that = this;
		this.$Loading.start();
		let getDataUrl = globel_.serverHost + globel_.configAPI.getSchoolData;
		this.$http.get( getDataUrl ,{ params:{
            limit:10,
            offset:this.offset
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

<style lang="css">
.school{
	padding: 20px;
}
</style>
