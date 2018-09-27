<template lang="html">
	<div class="videoTypeAlter">
		<Breadcrumb>
	        <BreadcrumbItem  to="/videoType">
	            <Icon type="ios-build" size="24"/>视频类别管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>新建视频类别
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">
			<FormItem label="缩略图:">
				<Input v-model="formItem.videoType" placeholder="请输入视频类别名称..." clearable></Input>
			</FormItem>
		   	<FormItem label="类别名称:">
			   	<Input v-model="formItem.title" placeholder="请输入视频类别名称..." clearable></Input>
		   	</FormItem>
		   	<FormItem label="所属专栏:">
				<Select v-model="formItem.specialColumn" placeholder="选择类型...">
	                <Option value="beijing">精品课程</Option>
	                <Option value="shanghai">专题突破</Option>
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
	name:"videoTypeAlter",
	data(){
		return{
			formItem:{
				title:"",
				specialColumn:""
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
.videoTypeAlter{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
