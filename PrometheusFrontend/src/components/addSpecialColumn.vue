<template lang="html">
	<div class="addSpecialColumn">
		<Breadcrumb>
	        <BreadcrumbItem  to="/specialColumn">
	            <Icon type="ios-build" size="24"/>专题管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">

			<FormItem label="封面图:">
				<img v-if="imgUrl.length" :src="imgUrl" style="width:165px;height:112px;" class="specialColumnImg"><br>
                <input type="file" @change="doUpload" ref="inputFile" class="fileInput" accept="image/*"/>
				<Progress :percent="progressPercent" />
	        </FormItem>
			<FormItem label="专题上传:">
				<input type="file" @change="downloadFile" ref="inputFile" class="fileInput" accept="application/pdf"/>
				<Progress :percent="pdfProgressPercent" />
	        </FormItem>
			<FormItem label="专题名称:">
				<Input v-model="formItem.name" placeholder="请输入专栏名称..." clearable></Input>
			</FormItem>
			<FormItem label="对应老师:">
				<Select v-model="formItem.teacherId" placeholder="选择老师...">
					<Option v-for="(item,index) in teacherData" :value="item.Id" :key="index">{{item.name}}</Option>
				</Select>
			</FormItem>
			<FormItem label="对应学科:">
				<Select v-model="formItem.subject" placeholder="选择学科...">
					<Option v-for="(item,index) in subjectData" :value="item.id" :key="index">{{item.title}}</Option>
				</Select>
			</FormItem>
			<FormItem label="简介图:">
				<Button type="primary" @click="addImg">添加图片</Button>
			</FormItem>
			<FormItem v-for="(imgItem,index) in imgList" :key="index">
				<img v-if="refresh" v-show="imgItem.length" :src="imgItem" style="width:80px;height:80px;" class="specialColumnImg"><br>
				<input type="file" @change="addImgUpload" :imgIndex="index" accept="image/*"/>
			</FormItem>
			<FormItem label="所属年级:">
				<Select v-model="formItem.grade" placeholder="选择年级...">
	                <Option v-for="(item,index) in gradeData" :value="item.id" :key="index">{{item.title}}</Option>
	            </Select>
		   	</FormItem>
			<FormItem label="专题介绍:">
			   	<Input v-model="formItem.describe" placeholder="请输入专栏介绍..." type="textarea"></Input>
		   	</FormItem>
			<FormItem label="价格:">
				<InputNumber v-model="formItem.price" @on-change="priceChange"></InputNumber>
			</FormItem>
			<FormItem label="推荐:" size="large">
				<i-switch v-model="recommend" @on-change="recommendChange" />
		   	</FormItem>
			<FormItem label="海报:" v-if="recommend">
				<img v-if="posterImgUrl.length" :src="posterImgUrl" style="width:110px;height:176px;" class="specialColumnImg"><br>
                <input type="file" @change="doUploadPoster" ref="inputFile" class="fileInput" accept="image/*"/>
				<Progress :percent="posterPercent" />
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
			posterImgUrl:"",
			posterPercent:0,
			posterImage:"",
		  	imgUrl:"",
		  	thumbImage:"",
			pdfFile:"",
			pdfProgressPercent:0,

			gradeData: globel_.gradeData, //所属类别的数据
			subjectData:globel_.subjectData,
	      	teacherData: "",
			recommend:false,
	      	formItem: {
		        recommend:0,
		        thumb: "",
		        teacherId: "",
		        name: "",
				downloadFile:"",
		        describe: "",
				grade:0,
		        price: 0,
				subject:0,
				briefImages:"",
				poster:""
		    },

			imgList:[],		//点击添加图片，进行数据交互
			imgBox:[],		//存放图片名称的box
			refresh:true
		}
  	},
  	methods: {
	    submitClick() {
			this.formItem.briefImages = this.imgBox.join(",");
			this.formItem.thumb = this.thumbImage;
			this.formItem.poster = this.posterImage;
			this.formItem.downloadFile = this.pdfFile;
	      	let that = this;
	      	this.$Loading.start();
	      	if (this.id == 0) { //新建	post
	        	this.$http.post(this.submitUrl, {
					recommend:this.formItem.recommend,
			        thumb: this.formItem.thumb,
			        teacherId: this.formItem.teacherId,
			        name: this.formItem.name,
					downloadFile:this.formItem.downloadFile,
			        describe: this.formItem.describe,
					grade:this.formItem.grade,
			        price: this.formItem.price,
					subject:this.formItem.subject,
					briefImages:this.formItem.briefImages,
					poster:this.formItem.poster
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
					recommend:this.formItem.recommend,
			        thumb: this.formItem.thumb,
			        teacherId: this.formItem.teacherId,
			        name: this.formItem.name,
					downloadFile:this.formItem.downloadFile,
			        describe: this.formItem.describe,
					grade:this.formItem.grade,
			        price: this.formItem.price,
					subject:this.formItem.subject,
					briefImages:this.formItem.briefImages,
					poster:this.formItem.poster
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
                      that.pdfProgressPercent = p * 100;
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
		addImg(){
			this.imgList.push("");
		},
		addImgUpload(files){
			let that = this;
			var imgIndex = parseInt(files.path[0].attributes.imgindex.value);			//记录是第几个input点击
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
		        client.multipartUpload('courseImages/' + newFilename, file).then(function(result) {
					that.$http.get(globel_.serverHost + globel_.configAPI.getUrlSignature + result.name).then(function(result){
						that.imgList[imgIndex] = result.data;
						that.imgBox.push(newFilename);
						that.refresh = false;
						that.$nextTick(() => {
							that.refresh = true
						})
		              	that.$Loading.finish();
			            that.$Message.success({
			              duration: 2,
			              content: globel_.configMessage.uploadImgSuccess
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
	    priceChange(num) {
	      this.formItem.price = num;
	    },
		recommendChange(bool){
			if(bool == true){
				this.formItem.recommend = 1;
			}else{
				this.formItem.recommend = 0;
			}
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
						that.thumbImage = newFilename;
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
	    },
		doUploadPoster(files){
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
						that.posterPercent = p * 100;
					}
				}).then(function(result) {
					that.$http.get(globel_.serverHost + globel_.configAPI.getUrlSignature + result.name).then(function(result){
						that.posterImage = newFilename;
						that.$Loading.finish();
						that.$Message.success({
						  duration: 2,
						  content: globel_.configMessage.uploadImgSuccess
						});
						that.posterImgUrl = result.data;
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
      	getTeacherDataUrl = globel_.serverHost + "/api/manage/teacher?limit=1000&offset=0";
    	this.$Loading.start();

    	//获取老师数据作为选择项
    	this.$http.get(getTeacherDataUrl).then(function(result) {
      	that.teacherData = result.data.rows;
    	}).catch(function(err) {
      		that.$Loading.error();
    	});

    	this.id = this.$route.query.id;
	    if (this.id != 0) { //修改
			this.BreadcrumbTitle = "修改专题";
	      	this.submitUrl = globel_.serverHost + globel_.configAPI.updataSpecialColumnById.replace(":id", this.id);
	      	let that = this,
	        	getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnDataById.replace(":id", this.id);
	      	this.$http.get(getDataUrl).then(function(result) {
	        	that.formItem = result.data;

	        	// 数据赋值
	        	that.$Loading.finish();

				that.pdfFile = result.data.downloadFile;
				that.pdfProgressPercent = 100;

				if(result.data.recommend == 1){
					that.recommend = true;
					that.posterImgUrl = result.data.poster;
					that.posterImage = result.data.poster.split("courseImages/")[1].split("?")[0];
					that.posterPercent = 100;
				}else{
					that.recommend = false;
				}
				that.imgUrl = result.data.thumb;
				that.thumbImage = result.data.thumb.split("courseImages/")[1].split("?")[0];
				that.progressPercent = 100;

				let imgListArr = new Array();
				let imgBoxArr = new Array();
				imgListArr = result.data.briefImages.split(",");
				imgBoxArr = result.data.briefImages.split(",");
				imgListArr.pop();
				imgBoxArr.pop();
				that.imgList = imgListArr;
				for (let i = 0; i < imgBoxArr.length; i++) {
					imgBoxArr[i] = imgBoxArr[i].split("courseImages/")[1].split("?")[0];
				}
				that.imgBox = imgBoxArr;
	      	}).catch(function(err) {
	        	that.$Loading.error();
	        	that.$Message.error({
	          	duration: 3,
	          	content: err
	        	});
	      	})
	    } else { //新建
			that.$Loading.finish();
			this.BreadcrumbTitle = "新建专题";
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
