<template lang="html">
  	<div class="addArticle">
		<Breadcrumb>
  			<BreadcrumbItem to="/articles">
  				<Icon type="ios-build" size="24"/>好文管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>新建好文
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :model="formItem" :label-width="150">
			<FormItem label="封面图:">
                <Upload ref="upload" :action="host" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
					:data="{
                  		'key': g_object_name,
                  		'policy': policyBase64,
                  		'OSSAccessKeyId': accessid,
                  		'success_action_status': '200',
                  		'callback': callbackbody,
                  		'signature': signature,
                  	}" :show-upload-list="false">
                    <div style="width:100px;height:auto">
                        <img :src="formItem.thumb" style="width: 100%">
                    </div>
                </Upload>
	        </FormItem>
		   	<FormItem label="名称:">
			   	<Input v-model="formItem.name" placeholder="请输入文章名..." clearable></Input>
		   	</FormItem>
			<FormItem label="摘要:">
			   	<Input v-model="formItem.abstract" placeholder="请输入摘要..." clearable></Input>
		   	</FormItem>
			<FormItem label="内容:">
				<div id="WangEditor">
			        <div ref="editorElem" style="text-align:left"></div>
			    </div>
			</FormItem>
			<FormItem label="所属类别:">
	            <Select v-model="formItem.articleType" placeholder="选择类别...">
	                <Option v-for="item in articleTypeData" :value="item.id">{{item.title}}</Option>
	            </Select>
	        </FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
  	</div>
</template>

<script>
import WangEditor from 'wangeditor'
import globel_ from "./../config/global.vue"
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
	name:"addArticle",
	data(){
		return{
			id:"",
			submitUrl:"",
			articleTypeData:globel_.articleTypeData,
			formItem:{
				thumb:globel_.defaultImage,
				name:"",
				abstract:"",
				content:"",
				articleType:"",
			},
			//图片上传参数
			g_object_name: '',
			policyBase64: '',
			accessid: '',
			callbackbody: '',
			signature: '',
			host: hostPrefix,
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
		},
		//图片上传事件没实现
		handleSuccess(){

		},
		handleFormatError(){

		},
		handleMaxSize(){

		},
		handleBeforeUpload(){

		},

	},
	created(){
		this.id = this.$route.query.id;
		if(this.id != 0){		//修改
			console.log("修改",this.id,typeof this.id);
			// this.submitUrl = "" 		//新建专栏的链接
		}else{					//新建
			// this.submitUrl = "" 		//新建专栏的链接
			console.log("新建",this.id);
		}
	},
	mounted() {
		let that = this
		this.editor = new WangEditor('#WangEditor')  //这个地方传入div元素的id 需要加#号
		this.editor.change = function () {
		  	console.log(this.txt.html())
			that.content = this.txt.html();
	  	}
		this.editor.create()     // 生成编辑器
		this.editor.txt.html('<p>输入内容...</p>')   //注意：这个地方是txt  不是官方文档中的$txt
    }
}
</script>

<style lang="css">
.addArticle{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
</style>
