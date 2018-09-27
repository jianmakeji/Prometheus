<template lang="html">
  	<div class="videoAlter">
		<Breadcrumb>
  			<BreadcrumbItem to="/videoManage">
  				<Icon type="ios-build" size="24"/>视频管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建视频
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">


			<FormItem label="缩略图:">
			   	<Input type="textarea" placeholder="请输入视频介绍..."></Input>
		   	</FormItem>
			<FormItem label="视频文件:">
			   	<Input type="textarea" placeholder="请输入视频介绍..."></Input>
		   	</FormItem>


		   	<FormItem label="视频名:">
			   	<Input v-model="formItem.title" placeholder="请输入视频名称..." clearable></Input>
		   	</FormItem>
			<FormItem label="视频介绍:">
			   	<Input v-model="formItem.introduce" type="textarea" placeholder="请输入视频介绍..."></Input>
		   	</FormItem>
			<FormItem label="专题:">
	            <Select v-model="formItem.specialColumn" placeholder="选择专题...">
	                <Option value="beijing">精品课程</Option>
	                <Option value="shanghai">专题突破</Option>
	            </Select>
	        </FormItem>
			<FormItem label="课程类别:">
	            <Select v-model="formItem.type" placeholder="选择类别...">
	                <Option value="beijing">领先课堂</Option>
	                <Option value="shanghai">培优课堂</Option>
					<Option value="shenzhen">汇智课堂</Option>
					<Option value="shenzhen">计算专题</Option>
					<Option value="shenzhen">几何专题</Option>
	                <Option value="shenzhen">压轴题专题</Option>
	            </Select>
	        </FormItem>
			<FormItem label="年级:">
	            <Select v-model="formItem.grade" placeholder="选择年级...">
	                <Option value="beijing">七年级</Option>
	                <Option value="shanghai">八年级</Option>
	                <Option value="shenzhen">九年级</Option>
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
				introduce:"",
				specialColumn:"",
				type:"",
				grade:""
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
