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
				<Select v-model="formItem.schoolId" placeholder="选择学校...">
	                <Option v-for="(item,index) in schoolData" :value="item.Id" :key="index">{{item.name}}</Option>
	            </Select>
		   	</FormItem>
			<FormItem label="所属年级:">
				<Select v-model="formItem.grade" placeholder="选择年级...">
	                <Option v-for="(item,index) in gradeData" :value="item.id" :key="index">{{item.title}}</Option>
	            </Select>
		   	</FormItem>
            <FormItem label="所属科目:">
				<Select v-model="formItem.subject" placeholder="选择科目...">
	                <Option v-for="(item,index) in subject" :value="item.id" :key="index">{{item.title}}</Option>
	            </Select>
		   	</FormItem>
			<FormItem label="试题上传:">
				<input type="file" @change="downloadFile" ref="inputFile" accept="application/pdf"/>
				<Progress :percent="fileProgressPercent" />
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
var hostPrefix = "http://dc-yl.oss-cn-hangzhou.aliyuncs.com/";

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
  	name: "addEliteSchool",
  	data() {
    	return {
	      	id: "",
			BreadcrumbTitle:"",
	      	submitUrl: "",
			schoolData:[],	//学校数据

			gradeData: globel_.gradeData, //所属类别的数据
			subject:globel_.subjectData,
	      	teacherData: "",
			pdfFile:"",
			fileProgressPercent:0,
	      	formItem: {
		        name: "",
		        schoolId:0,
				grade:0,
		        subject: 0,
				downloadFile:""
		    },

			imgList:[],		//点击添加图片，进行数据交互
			imgBox:[],		//存放图片名称的box
			refresh:true
		}
  	},
  	methods: {
		//pdf上传
        downloadFile(files) {
            let that = this;
            var file = files.target.files[0]; //获取要上传的文件对象
            this.$http({
                method: 'get',
              url: globel_.serverHost + '/api/getSTSSignature/5'
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
              client.multipartUpload('downloadFile/' + newFilename, file, {
                  progress(p) {
                      that.fileProgressPercent = p * 100;
                  }
              }).then(function(result) {
                  that.$http.get(globel_.serverHost + globel_.configAPI.getUrlSignature + result.name).then(function(result){
                      that.pdfFile = newFilename;
                      that.$Loading.finish();
                      that.$Message.success({
                          duration: 2,
                          content: globel_.configMessage.uploadVideoSuccess
                      });
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
       },
	    submitClick() {
			this.formItem.downloadFile = this.pdfFile;
	      	let that = this;
	      	this.$Loading.start();
	      	if (this.id == 0) { //新建	post
	        	this.$http.post(this.submitUrl, {
		          	name: this.formItem.name,
					schoolId:this.formItem.schoolId,
			        subject:this.formItem.subject,
		          	grade: this.formItem.grade,
					downloadFile:this.formItem.downloadFile
	        	}).then(function(result) {
		          	if (result.status == 200) {
		            	that.$Loading.finish();
		            	that.$Message.success({
			              	duration: 2,
			              	content: globel_.configMessage.operateSuccess
		            	});
			            setTimeout(function() {
			              	that.$router.push({
			                	name: "eliteSchool"
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
					name: this.formItem.name,
					schoolId:this.formItem.schoolId,
			        subject:this.formItem.subject,
		          	grade: this.formItem.grade,
					downloadFile:this.formItem.downloadFile
	        	}).then(function(result) {
	          		if (result.status == 200) {
	            		that.$Loading.finish();
	            		that.$Message.success({
			              	duration: 2,
	              			content: globel_.configMessage.operateSuccess
	            		});
	            		setTimeout(function() {
	              			that.$router.push({
	                			name: "eliteSchool"
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
	    }
  	},
  	created() {
    	let that = this,
      	getSchoolDataUrl = globel_.serverHost + "/api/manage/school?limit=1000&offset=0";
    	this.$Loading.start();

    	// 获取类别数据作为选择项
    	this.$http.get(getSchoolDataUrl).then(function(result) {
      		that.schoolData = result.data.rows;
    	}).catch(function(err) {
      		that.$Loading.error();
    	});

    	this.id = this.$route.query.id;
	    if (this.id != 0) { //修改
			this.BreadcrumbTitle = "修改名校试题";
	      	this.submitUrl = globel_.serverHost + globel_.configAPI.updateEliteSchoolById.replace(":id", this.id);
	      	let that = this,
	        	getDataUrl = globel_.serverHost + globel_.configAPI.updateEliteSchoolById.replace(":id", this.id);
	      	this.$http.get(getDataUrl).then(function(result) {
				that.pdfFile = result.data.downloadFile;
	        	// 数据赋值
	        	that.$Loading.finish();
	        	that.formItem = result.data;
				that.fileProgressPercent = 100;
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
	      	this.submitUrl = globel_.serverHost + globel_.configAPI.createEliteSchool;
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
