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
export default {
    name:"specialColumn",
    data () {
        return {
			deleteModel:false,
			typeTitle:"",
			index:"",
			total:100,
			columns:[
				{
                    title: 'id',
                    key: 'id',
					align: 'center'
                },
                {
                    title: '类型名称',
                    key: 'title',
					align: 'center'
                },
                {
                    title: '所属专栏',
                    key: "specialColumn",
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
			dataList: [
                { id:1, title: '领先课堂', specialColumn: '精品课程'},
	            { id:2, title: '培优课堂', specialColumn: '精品课程'},
		        { id:3, title: '汇智课堂', specialColumn: '精品课程'},
			    { id:4, title: '计算专题', specialColumn: '专题突破'},
			    { id:4, title: '集合专题', specialColumn: '专题突破'},
			    { id:4, title: '压轴题专题', specialColumn: '专题突破'},
            ]
        }
    },
    methods: {
		pageChange(index){
			console.log(index);
		},
		newType(){
			this.$router.push({name:"addSpecialColumn",query:{id:0}});
		},
		changeTap(index){
			let typeId = this.dataList[index].id;
			console.log(typeId);
			this.$router.push({name:"addSpecialColumn",query:{id:typeId}});
		},
		removeTap(index){
			console.log(index);
			this.index = index;
			this.deleteModel = true;
			this.typeTitle = this.dataList[index].title;
		},
		okTap(){
			console.log(this.index);
		}
    }
}
</script>

<style lang="css">
.specialColumn{
	padding: 20px;
}
</style>
