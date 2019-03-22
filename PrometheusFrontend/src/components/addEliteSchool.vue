<template lang="html">
	<div class="addEliteSchool">
		<Breadcrumb>
	        <BreadcrumbItem  to="/eliteSchool">
	            <Icon type="ios-build" size="24"/>名校试题管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">
		   	<FormItem label="试题名称:">
			   	<Input v-model="formItem.name" placeholder="请输入试题名称..." clearable></Input>
		   	</FormItem>
            <FormItem label="所属学校:">
				<Select v-model="formItem.grade" placeholder="选择学校...">
	                <Option v-for="(item,index) in gradeData" :value="item.id" :key="index">{{item.title}}</Option>
	            </Select>
		   	</FormItem>
			<FormItem label="所属年级:">
				<Select v-model="formItem.grade" placeholder="选择年级...">
	                <Option v-for="(item,index) in gradeData" :value="item.id" :key="index">{{item.title}}</Option>
	            </Select>
		   	</FormItem>
            <FormItem label="所属科目:">
				<Select v-model="formItem.grade" placeholder="选择科目...">
	                <Option v-for="(item,index) in gradeData" :value="item.id" :key="index">{{item.title}}</Option>
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
import $ from 'jquery'

export default {
  	name: "addEliteSchool",
  	data() {
    	return {
	      	id: "",
			BreadcrumbTitle:"",
	      	submitUrl: "",
	      	g_object_name: '',

	      	progressPercent: 0,
		  	imgUrl:"",
		  	fileImage:"",

	      	courseTypeData: "", //所属类别的数据
			gradeData: globel_.gradeData, //所属类别的数据
	      	teacherData: "",
	      	formItem: {
		        // thumb:globel_.defaultImage,
		        thumb: "",
		        teacherId: "",
		        name: "",
		        describe: "",
		        courseType: "",
				grade:0,
		        price: 0
		    },

			imgList:[],		//点击添加图片，进行数据交互
			imgBox:[],		//存放图片名称的box
			refresh:true
		}
  	},
  	methods: {
	    submitClick() {
			// this.formItem.thumb = this.fileImage;
	      	// let that = this;
	      	// this.$Loading.start();
	      	// if (this.id == 0) { //新建	post
	        // 	this.$http.post(this.submitUrl, {
		    //       	thumb: this.formItem.thumb,
		    //       	teacherId: this.formItem.teacherId,
		    //       	name: this.formItem.name,
		    //       	describe: this.formItem.describe,
		    //       	courseType: this.formItem.courseType,
		    //       	price: this.formItem.price,
		    //       	grade: this.formItem.grade
	        // 	}).then(function(result) {
		    //       	if (result.status == 200) {
		    //         	that.$Loading.finish();
		    //         	that.$Message.success({
			//               	duration: 2,
			//               	content: globel_.configMessage.operateSuccess
		    //         	});
			//             setTimeout(function() {
			//               	that.$router.push({
			//                 	name: "specialColumn"
			//               	});
			//             }, 3000)
		    //       	}
		    //     }).catch(function(err) {
		    //       	that.$Loading.error();
		    //       	that.$Message.error({
		    //         	duration: 2,
		    //         	content: err
		    //       	});
		    //     })
	      	// } else { //修改	put
	        // 	this.$http.put(this.submitUrl, {
	        //   		thumb: this.formItem.thumb,
	        //   		teacherId: this.formItem.teacherId,
	        //   		name: this.formItem.name,
	        //   		describe: this.formItem.describe,
	        //   		courseType: this.formItem.courseType,
	        //   		price: this.formItem.price,
		    //       	grade: this.formItem.grade
	        // 	}).then(function(result) {
	        //   		if (result.status == 200) {
	        //     		that.$Loading.finish();
	        //     		that.$Message.success({
			//               	duration: 2,
	        //       			content: globel_.configMessage.operateSuccess
	        //     		});
	        //     		setTimeout(function() {
	        //       			that.$router.push({
	        //         			name: "specialColumn"
	        //       			});
	        //     		}, 3000)
	        //   		}
	        // 	}).catch(function(err) {
	        //   		that.$Loading.error();
	        //   		that.$Message.error({
	        //     		duration: 2,
	        //     		content: err
	        //   		});
	        // 	})
	      	// }
	    }
  	},
  	created() {
    	let that = this,
      	getCourseTyoeDataUrl = globel_.serverHost + "/api/manage/courseType?limit=1000&offset=0",
      	getTeacherDataUrl = globel_.serverHost + "/api/manage/teacher?limit=1000&offset=0";
    	this.$Loading.start();

    	// 获取类别数据作为选择项
    	this.$http.get(getCourseTyoeDataUrl).then(function(result) {
      		that.courseTypeData = result.data.rows;
    	}).catch(function(err) {
      		that.$Loading.error();
    	});
    	//获取老师数据作为选择项
    	this.$http.get(getTeacherDataUrl).then(function(result) {
      	that.teacherData = result.data.rows;
    	}).catch(function(err) {
      		that.$Loading.error();
    	});

    	this.id = this.$route.query.id;
	    if (this.id != 0) { //修改
			this.BreadcrumbTitle = "修改名校试题";
	      	this.submitUrl = globel_.serverHost + globel_.configAPI.updataSpecialColumnById.replace(":id", this.id);
	      	let that = this,
	        	getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnDataById.replace(":id", this.id);
	      	this.$http.get(getDataUrl).then(function(result) {
			  	that.fileImage = result.data.thumb.replace(globel_.aliHttp + "courseImages/",'').split('?')[0];
	        	// 数据赋值
	        	that.$Loading.finish();
				that.imgUrl = result.data.thumb;
	        	that.formItem = result.data;
				that.progressPercent = 100;
	      	}).catch(function(err) {
	        	that.$Loading.error();
	        	that.$Message.error({
	          	duration: 3,
	          	content: err
	        	});
	      	})
	    } else { //新建
			that.$Loading.finish();
			this.BreadcrumbTitle = "新建名校试题";
	      	this.submitUrl = globel_.serverHost + globel_.configAPI.createSpecialColumn;
	    }
	}
}
</script>

<style lang="css" scoped>
.addEliteSchool{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
