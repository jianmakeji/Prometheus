<template lang="html">
	<div class="addSpecialColumn">
		<Breadcrumb>
	        <BreadcrumbItem  to="/specialColumn">
	            <Icon type="ios-build" size="24"/>专栏管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">
			<FormItem label="封面图:">
				<img v-if="imgUrl.length" :src="imgUrl" style="width:80px;height:80px;" class="specialColumnImg"><br>
                <input type="file" @change="doUpload" ref="inputFile" class="fileInput" accept="image/*"/>
				<Progress :percent="progressPercent" />
	        </FormItem>
		   	<FormItem label="专栏名称:">
			   	<Input v-model="formItem.name" placeholder="请输入专栏名称..." clearable></Input>
		   	</FormItem>
			<FormItem label="专栏介绍:">
			   	<Input v-model="formItem.describe" placeholder="请输入专栏介绍..." type="textarea"></Input>
		   	</FormItem>
		   	<FormItem label="所属类别:">
				<Select v-model="formItem.courseType" placeholder="选择类别...">
	                <Option v-for="item in courseTypeData" :value="item.Id">{{item.name}}</Option>
	            </Select>
		   	</FormItem>
			<FormItem label="所属年级:">
				<Select v-model="formItem.grade" placeholder="选择年级...">
	                <Option v-for="item in gradeData" :value="item.id">{{item.title}}</Option>
	            </Select>
		   	</FormItem>
			<FormItem label="对应老师:">
				<Select v-model="formItem.teacherId" placeholder="选择老师...">
					<Option v-for="item in teacherData" :value="item.Id">{{item.name}}</Option>
				</Select>
			</FormItem>
			<FormItem label="价格:">
				<InputNumber v-model="formItem.price" @on-change="priceChange"></InputNumber>
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
import OSS from 'ali-oss'

var g_object_name = "";
var key = '';
var hostPrefix = "http://jm-prometheus.oss-cn-hangzhou.aliyuncs.com";

function random_string(len) {
  	var len = len || 32;
  	var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  	var maxPos = chars.length;
  	var pwd = '';
  	for (var i = 0; i < len; i++) {
    	pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  	}
  	return pwd;
}

function get_suffix(filename) {
  	var pos = filename.lastIndexOf('.')
  	var suffix = ''
  	if (pos != -1) {
    	suffix = filename.substring(pos)
  	}
  	return suffix;
}

function calculate_object_name(filename) {
  	var suffix = get_suffix(filename)
  	g_object_name = key + random_string(10) + suffix
}

function get_uploaded_object_name(filename) {
  	return g_object_name;
}
export default {
  	name: "addSpecialColumn",
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
		    }
    	}
  	},
  	methods: {
	    submitClick() {
			this.formItem.thumb = this.fileImage;
	      	let that = this;
	      	this.$Loading.start();
	      	if (this.id == 0) { //新建	post
	        	this.$http.post(this.submitUrl, {
		          	thumb: this.formItem.thumb,
		          	teacherId: this.formItem.teacherId,
		          	name: this.formItem.name,
		          	describe: this.formItem.describe,
		          	courseType: this.formItem.courseType,
		          	price: this.formItem.price,
		          	grade: this.formItem.grade
	        	}).then(function(result) {
		          	if (result.status == 200) {
		            	that.$Loading.finish();
		            	that.$Message.success({
			              	duration: 2,
			              	content: globel_.configMessage.operateSuccess
		            	});
			            setTimeout(function() {
			              	that.$router.push({
			                	name: "specialColumn"
			              	});
			            }, 3000)
		          	}
		        }).catch(function(err) {
		          	that.$Loading.error();
		          	that.$Message.error({
		            	duration: 2,
		            	content: err
		          	});
		        })
	      	} else { //修改	put
	        	this.$http.put(this.submitUrl, {
	          		thumb: this.formItem.thumb,
	          		teacherId: this.formItem.teacherId,
	          		name: this.formItem.name,
	          		describe: this.formItem.describe,
	          		courseType: this.formItem.courseType,
	          		price: this.formItem.price,
		          	grade: this.formItem.grade
	        	}).then(function(result) {
	          		if (result.status == 200) {
	            		that.$Loading.finish();
	            		that.$Message.success({
			              	duration: 2,
	              			content: globel_.configMessage.operateSuccess
	            		});
	            		setTimeout(function() {
	              			that.$router.push({
	                			name: "specialColumn"
	              			});
	            		}, 3000)
	          		}
	        	}).catch(function(err) {
	          		that.$Loading.error();
	          		that.$Message.error({
	            		duration: 2,
	            		content: err
	          		});
	        	})
	      	}
	    },
	    priceChange(num) {
	      this.formItem.price = num;
	    },
		//图片上传
	    doUpload(files) {
	      	let that = this;
	      	var file = files.target.files[0]; //获取要上传的文件对象
	      	this.$http({
	        	method: 'get',
	        	url: globel_.serverHost + '/api/getSTSSignature/1'
	      	}).then((res) => {
		        var client = new OSS({
		          	region: 'oss-cn-hangzhou',
		          	accessKeyId: res.data.credentials.AccessKeyId,
		          	accessKeySecret: res.data.credentials.AccessKeySecret,
		          	stsToken: res.data.credentials.SecurityToken,
		          	bucket: 'jm-prometheus'
		        });

				calculate_object_name(file.name);
		        var newFilename =  g_object_name;
		        client.multipartUpload('courseImages/' + newFilename, file, {
			        progress(p) {
			            that.progressPercent = p * 100;
			        }
		        }).then(function(result) {
					that.$http.get(globel_.serverHost + globel_.configAPI.getUrlSignature + result.name).then(function(result){
						that.fileImage = newFilename;
		              	that.$Loading.finish();
			            that.$Message.success({
			              duration: 2,
			              content: globel_.configMessage.uploadImgSuccess
			            });
						that.imgUrl = result.data;
					}).catch(function(err){
						that.$Loading.error();
						that.$Message.error({
						  duration: 2,
						  content:err
						});
					})

		        }).catch(function(err) {
					that.$Loading.error();
					that.$Message.error({
					  	duration: 2,
					  	content: err
					});
		        });
		    }).catch((err) => {
				that.$Loading.error();
				that.$Message.error({
					duration: 2,
					content: err
				});
		    });
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
			this.BreadcrumbTitle = "修改专栏";
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
			this.BreadcrumbTitle = "新建专栏";
	      	this.submitUrl = globel_.serverHost + globel_.configAPI.createSpecialColumn;
	    }
	}
}
</script>

<style lang="css" scoped>
.addSpecialColumn{
	padding: 20px;
}
.specialColumnImg{
	width: 150px;
	height: auto;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
