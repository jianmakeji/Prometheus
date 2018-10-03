<template lang="html">
	<div class="addSpecialColumn">
		<Breadcrumb>
	        <BreadcrumbItem  to="/specialColumn">
	            <Icon type="ios-build" size="24"/>专栏管理
	        </BreadcrumbItem>
			<BreadcrumbItem>
	            <Icon type="md-add" size="24"/>新建专栏
	        </BreadcrumbItem>
	    </Breadcrumb><br>
		<Form :model="formItem" :label-width="80">
			<FormItem label="封面图:">
                <input type="file" @change="doUpload" ref="inputFile"/>
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
      submitUrl: "",
      //图片上传参数
      AccessKeyId: "",
      AccessKeySecret: "",
      Expiration: "",
      SecurityToken: "",
      dir: "",
      host: hostPrefix,
      g_object_name: '',
      key: "",

      courseTypeData: "", //所属类别的数据
      teacherData: "",
      formItem: {
        // thumb:globel_.defaultImage,
        thumb: globel_.defaultImage,
        teacherId: "",
        name: "",
        describe: "",
        courseType: "",
        price: 0
      }
    }
  },
  methods: {
    submitClick() {
      let that = this;
      this.$Loading.start();
      if (this.id == 0) { //新建	post
        this.$http.post(this.submitUrl, {
          thumb: this.formItem.thumb,
          teacherId: this.formItem.teacherId,
          name: this.formItem.name,
          describe: this.formItem.describe,
          courseType: this.formItem.courseType,
          price: this.formItem.price
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
          price: this.formItem.price
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
    //图片上传事件没实现
    handleSuccess(res, file) {
      this.formItem.thumb = hostPrefix + g_object_name;
      this.formItem.imageUrl = hostPrefix + g_object_name;
    },
    handleFormatError(file) {
      this.$Message.error("文件格式错误！");
    },
    handleMaxSize(file) {
      this.$Message.error("文件不能超过2M！");
    },
    handleBeforeUpload(file) {
      // console.log(globel_.serverHost);
      let message = this.$Message;
      var that = this;
      // console.log(that.host);
      $.ajax({
        type: 'GET',
        url: globel_.serverHost + '/api/getSTSSignature/1',
        async: false,
        dataType: 'json',
        success: function(result) {
          // console.log(result);

          that.$refs.upload.data.AccessKeyId = result.credentials.AccessKeyId;
          that.$refs.upload.data.AccessKeySecret = result.credentials.AccessKeySecret;
          that.$refs.upload.data.Expiration = result.credentials.Expiration;
          that.$refs.upload.data.SecurityToken = result.credentials.SecurityToken;
          that.$refs.upload.data.dir = result.credentials.dir;
          that.$refs.upload.data.host = result.credentials.host;
          // that.$refs.upload.data.key = result.credentials.dir;

          // key = result.credentials.dir;
          g_object_name = result.credentials.dir;
          calculate_object_name(file.name)
          that.$refs.upload.data.key = g_object_name;

          console.log("g_object_name", g_object_name);
          // key = result.credentials.dir;
          // g_object_name = result.credentials.dir;
          // calculate_object_name(file.name)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest, textStatus, errorThrown);
          that.$Notice.error({
            title: errorThrown
          });
        }
      });

      // this.$http.get( globel_.serverHost + '/api/getSTSSignature/1',{
      // 	async:false
      // }).then(function(result){
      // 	console.log(result,file.name);
      // 	// that.AccessKeyId = result.AccessKeyId;
      // 	// that.AccessKeySecret = result.AccessKeySecret;
      // 	// that.Expiration = result.Expiration;
      // 	// that.SecurityToken = result.SecurityToken;
      // 	// that.dir = result.dir;
      // 	// that.host = result.host;
      // 	// key = result.dir;
      // 	// g_object_name = result.dir;
      // 	// calculate_object_name(file.name)
      // 	// that.key = g_object_name;
      // 	console.log("============",that.$refs.upload.data.host);
      // 	that.$refs.upload.data.AccessKeyId = result.data.credentials.AccessKeyId;
      // 	that.$refs.upload.data.AccessKeySecret = result.data.credentials.AccessKeySecret;
      // 	that.$refs.upload.data.Expiration = result.data.credentials.Expiration;
      // 	that.$refs.upload.data.SecurityToken = result.data.credentials.SecurityToken;
      // 	that.$refs.upload.data.dir = result.data.credentials.dir;
      //     that.$refs.upload.data.host = result.data.credentials.host;
      //
      // 	console.log("============",that.$refs.upload.data.host);
      //     key = result.data.credentials.dir;
      //     g_object_name = result.data.credentials.dir;
      //     calculate_object_name(file.name)
      // }).catch(function(err){
      //     alert(err);
      // })

    },
    doUpload(files) {
			console.log('###############################################');
      var file = files.target.files[0]; //获取要上传的文件对象
      this.$http({
        method: 'get',
        url: globel_.serverHost + '/api/getSTSSignature/1'
      }).then((res) => {
        console.log(res);
        var client = new OSS({
          region: 'oss-cn-hangzhou',
          accessKeyId: res.data.credentials.AccessKeyId,
          accessKeySecret: res.data.credentials.AccessKeySecret,
          stsToken: res.data.credentials.SecurityToken,
          bucket: 'jm-prometheus'
        });
        var fileName = Date.parse(new Date());
        var fileExt = file.name.toLowerCase().split('.').splice(-1);
        var randStr = 'weqwe';
        var newFilename = fileName + "-" + randStr + "." + fileExt[0];
        client.multipartUpload('courseImages/'+newFilename, file).then(function(result) {
          console.log('success:'+result);
        }).catch(function(err) {
          console.log('failure:'+err);
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
      this.submitUrl = globel_.serverHost + globel_.configAPI.updataSpecialColumnById.replace(":id", this.id);
      let that = this,
        getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnDataById.replace(":id", this.id);
      this.$Loading.start();
      this.$http.get(getDataUrl).then(function(result) {
        // 数据赋值
        that.$Loading.finish();
        that.formItem = result.data;
      }).catch(function(err) {
        that.$Loading.error();
        that.$Message.error({
          duration: 3,
          content: err
        });
      })
    } else { //新建
      this.submitUrl = globel_.serverHost + globel_.configAPI.createSpecialColumn;
    }
  }
}
</script>

<style lang="css">
.addSpecialColumn{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
