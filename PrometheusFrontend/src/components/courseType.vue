<template lang="html">
  <div class="courseType">
	<Breadcrumb>
		<BreadcrumbItem>
			<Icon type="ios-build" size="24"/>类别管理
		</BreadcrumbItem>
	</Breadcrumb><br />
	<Button icon="md-add" type="primary" @click="newClass">新建</Button><br /><br />
	<Table :columns="columns" :data="dataList"></Table><br />
	<Page :total="total" show-total @on-change="pageChange"/>
	<Modal v-model="deleteModel" width="360" @on-ok="okTap">
        <p slot="header" style="color:#ed4014;text-align:center;font-size:18px;">
            <Icon type="ios-information-circle" size="20"></Icon>
            <span>确定要删除类别</span>
        </p>
        <div style="text-align:center">
            {{specialColumnTitle}}
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
	name:"courseType",
	data(){
		return{
			deleteModel:false,
			specialColumnTitle:"",
			index:"",
			total:100,
			columns:[
				{ title: 'id', key: 'id', align: 'center' },
                { title: '专题名称', key: 'title', align: 'center' },
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
                {id:1,title:"精品课程"}, {id:2,title:"专题突破"}
            ]
		}
	},
	methods:{
		pageChange(index){
			console.log(index);
		},
		newClass(){
			this.$router.push({name:"addCourseType",query:{id:0}});
		},
		changeTap(index){
			let specialColumnId = this.dataList[index].id;
			console.log(specialColumnId);
			this.$router.push({name:"addCourseType",query:{id:specialColumnId}});
		},
		removeTap(index){
			console.log(index);
			this.index = index;
			this.deleteModel = true;
			this.specialColumnTitle = this.dataList[index].title;
		},
		okTap(){
			console.log(this.index);
		}
	}
}
</script>

<style lang="css">
.courseType{
	padding: 20px;
}
</style>
