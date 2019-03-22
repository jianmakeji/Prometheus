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
    </div>
</template>

<script>
import globel_ from './../config/global.vue'
import $ from 'jquery'
export default {
	name:"school",
	data(){
		return{

			total:0,
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
			dataList: [
                {Id:"1","name":"长郡中学"}
            ]
		}
	},
	methods:{
        newSchool(){
            this.$router.push({name:"addSchool",query:{id:0}});
        },
        pageChange(index){

        },
        changeTap(index){

        },
        removeTap(index){

        },
	},
	created(){

	}
}
</script>

<style lang="css">
.school{
	padding: 20px;
}
</style>
