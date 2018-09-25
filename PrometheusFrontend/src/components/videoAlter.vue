<template lang="html">
  	<div class="videoAlter">
		<Breadcrumb>
  			<BreadcrumbItem to="/videoManage">
  				<Icon type="ios-build" size="24"/>视频年级管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建年级
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">
		   	<FormItem label="视频名:">
			   	<Input v-model="formItem.videoName" placeholder="请输入视频名称..." clearable></Input>
		   	</FormItem>
			<FormItem label="视频介绍:">
			   	<Input v-model="formItem.introduce" placeholder="请输入视频介绍..." clearable></Input>
		   	</FormItem>
			<FormItem label="类型:">
	            <Select v-model="formItem.type" placeholder="选择类型...">
	                <Option value="beijing">New York</Option>
	                <Option value="shanghai">London</Option>
	                <Option value="shenzhen">Sydney</Option>
	            </Select>
	        </FormItem>
			<FormItem label="年级:">
	            <Select v-model="formItem.class" placeholder="选择年级...">
	                <Option value="beijing">New York</Option>
	                <Option value="shanghai">London</Option>
	                <Option value="shenzhen">Sydney</Option>
	            </Select>
	        </FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>
export default {
	name:"videoAlter",
	data(){
		return{
			formItem:{
				videoName:"",
				introduce:""
			}
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
		}
	}
}
</script>

<style lang="css">
.videoAlter{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
