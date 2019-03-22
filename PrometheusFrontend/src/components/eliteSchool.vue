<template lang="html">
    <div class="eliteSchool">
        <Breadcrumb>
            <BreadcrumbItem>
                <Icon type="ios-build" size="24"/>名校试题管理
            </BreadcrumbItem>
        </Breadcrumb><br />
        <Button icon="md-add" type="primary" @click="newEliteSchool">新建</Button><br /><br />
        <Table :columns="columns" :data="dataList"></Table><br />
        <Page :total="total" show-total @on-change="pageChange"/>
    </div>
</template>

<script>
import globel_ from './../config/global.vue'
import $ from 'jquery'
export default {
	name:"eliteSchool",
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
        newEliteSchool(){
            this.$router.push({name:"addEliteSchool",query:{id:0}});
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
.eliteSchool{
	padding: 20px;
}
</style>
