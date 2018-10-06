<template lang="html">
 	<div class="addCourseType">
	  	<Breadcrumb>
  			<BreadcrumbItem to="/courseType">
  				<Icon type="ios-build" size="24"/>类别管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="80">
		   	<FormItem label="类别名:">
			   	<Input v-model="formItem.name" placeholder="请输入类别名称..." clearable></Input>
		   	</FormItem>
			<FormItem label="类别介绍:">
			   	<Input v-model="formItem.describe" type="textarea" placeholder="请输入介绍内容..."></Input>
		   	</FormItem>
			<FormItem label="年级:">
	            <Select v-model="formItem.grade" placeholder="选择年级...">
					<Option v-for="item in gradeData" :value="item.id">{{item.title}}</Option>
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
	name:"addCourseType",
	data(){
		return{
			id:"",							//当前数据id号
            BreadcrumbTitle:"",
			submitUrl:"",					//提交路径(新建还是修改)
			gradeData:globel_.gradeData,
			formItem:{
				name:"",
				describe:"",
				grade:""
			}
		}
	},
	methods:{
		submitClick(){
			let that = this;
			this.$Loading.start();
			if(this.id == 0){		//新建	post
				this.$http.post( this.submitUrl ,{
					name:this.formItem.name,
					describe:this.formItem.describe,
					grade:this.formItem.grade
				}).then(function(result){
					if(result.status == 200){
						that.$Loading.finish();
						that.$Message.success({duration:2,content:globel_.configMessage.operateSuccess});
						setTimeout(function(){
							that.$router.push({name:"courseType"});
						},3000)
					}
				}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:2,content:err});
				})
			}else{				//修改	put
				this.$http.put( this.submitUrl ,{
					name:this.formItem.name,
					describe:this.formItem.describe,
					grade:this.formItem.grade
				}).then(function(result){
					if(result.status == 200){
						that.$Loading.finish();
						that.$Message.success({duration:2,content:globel_.configMessage.operateSuccess});
						setTimeout(function(){
							that.$router.push({name:"courseType"});
						},3000)
					}
				}).catch(function(err){
					that.$Loading.error();
					that.$Message.error({duration:2,content:err});
				})
			}
		}
	},
	created(){
		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
            this.BreadcrumbTitle = "修改类型";
			this.submitUrl = globel_.serverHost + globel_.configAPI.updataCourseTypeById.replace(":id",this.id);
			let that = this,
				getDataUrl = globel_.serverHost + globel_.configAPI.getCourseTypeDataById.replace(":id",this.id);
			this.$Loading.start();
			this.$http.get( getDataUrl ).then(function(result){
				// 数据赋值
				that.$Loading.finish();
				that.formItem = result.data;
			}).catch(function(err){
				that.$Loading.error();
				that.$Message.error({duration:3,content:err});
			})
		}else{					//新建
            this.BreadcrumbTitle = "新建类型";
			this.submitUrl = globel_.serverHost + globel_.configAPI.createCourseType;
		}
	}
}
</script>

<style lang="css">
.addCourseType{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
