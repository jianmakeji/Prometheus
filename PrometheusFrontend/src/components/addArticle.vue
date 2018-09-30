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
			<FormItem label="缩略图:">
			   	<Input v-model="formItem.articleName" placeholder="请输入文章名..." clearable></Input>
		   	</FormItem>
		   	<FormItem label="文章名:">
			   	<Input v-model="formItem.articleName" placeholder="请输入文章名..." clearable></Input>
		   	</FormItem>
			<FormItem label="好文摘要:">
			   	<Input v-model="formItem.articleAbstract" placeholder="请输入摘要内容..." clearable></Input>
		   	</FormItem>
			<FormItem label="文章内容:">
				<div id="WangEditor">
			        <div ref="editorElem" style="text-align:left"></div>
			    </div>
			</FormItem>
			<FormItem label="所属类型:">
	            <Select v-model="formItem.articleType" placeholder="选择类型...">
	                <Option value="1">父子篇</Option>
	                <Option value="2">成长篇</Option>
	                <Option value="3">亲子篇</Option>
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
export default {
	name:"addArticle",
	data(){
		return{
			id:"",
			submitUrl:"",
			formItem:{
				articleName:"",
				articleType:"1",
				articleAbstract:""
			},
			editorContent: ''
		}
	},
	methods:{
		submitClick(){
			console.log("submit");
		},
		getContent: function () {
            alert(this.editorContent)
        }
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
