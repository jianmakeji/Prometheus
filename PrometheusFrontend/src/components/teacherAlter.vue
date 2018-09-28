<template lang="html">
  	<div class="teacherAlter">
		<Breadcrumb>
  			<BreadcrumbItem to="/teacherManage">
  				<Icon type="ios-build" size="24"/>老师管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建老师
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">
		   	<FormItem label="姓名:">
			   	<Input v-model="formItem.name" placeholder="请输入老师姓名..." clearable></Input>
		   	</FormItem>
			<FormItem label="介绍:">
			   	<Input v-model="formItem.introduce" type="textarea" placeholder="请输入介绍内容..."></Input>
		   	</FormItem>
			<FormItem label="学科:">
				<Select v-model="formItem.subject" placeholder="选择学科...">
					<Option v-for="item in subjectData" :value="item.id">{{item.title}}</Option>
	            </Select>
		   	</FormItem>
			<FormItem label="对应专题:">
				<Select v-model="formItem.specialColumn" placeholder="选择专题...">
	                <Option value="1">精品课程</Option>
	                <Option value="2">专题突破</Option>
	            </Select>
		   	</FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
	name:"teacherAlter",
	data(){
		return{
			id:"",
			submitUrl:"",
			subjectData:globel_.subjectData,
			formItem:{
				name:"",
				introduce:"",
				subject:""
			}
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
		}
	},
	created(){
		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
			console.log("修改",this.id,typeof this.id);
			// this.submitUrl = "" 		//新建专栏的链接
		}else{					//新建
			// this.submitUrl = "" 		//修改专栏的链接
			console.log("新建",this.id);
		}
	}
}
</script>

<style lang="css">
.teacherAlter{
	padding: 20px;
}
</style>
