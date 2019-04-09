<template lang="html">
  	<div class="addSpecialCode">



		<Breadcrumb>
  			<BreadcrumbItem to="/specialCode">
  				<Icon type="ios-build" size="24"/>师道码管理
  			</BreadcrumbItem>
			<BreadcrumbItem>
  				<Icon type="md-add" size="24"/>{{BreadcrumbTitle}}
  			</BreadcrumbItem>
  		</Breadcrumb><br />
		<Form :label-width="80">
            <FormItem label="专题选择:">
                <Button type="info" @click="openSpecialModal">选择相应专题</Button>
	        </FormItem>
            <FormItem label="生成数:">
                <InputNumber :min="1" v-model="limit"></InputNumber>
	        </FormItem>
			<FormItem>
				<Button type="primary" long @click="submitClick">提交</Button>
			</FormItem>
		</Form>
        <Modal v-model="checkboxModel" width="720" @on-ok="okTap">
	        <p slot="header" style="color:#2db7f5;text-align:center;font-size:18px;">
	            <Icon type="ios-information-circle" size="20"></Icon>
	            <span>请选择专题</span>
	        </p>
	        <div style="text-align:center">
                <CheckboxGroup v-model="specialColumn">
                    <Checkbox v-for="item in specialColumnData" size="large" :label="item.Id" true-value false-value>{{item.name}}</Checkbox>
                </CheckboxGroup>
	        </div>
	    </Modal>
  	</div>
</template>

<script>
import globel_ from './../config/global.vue'
import $ from 'jquery'

export default {
	name:"addSpecialCode",
	data(){
		return{
			id:"",
            BreadcrumbTitle:"",
			submitUrl:"",

            limit:1,
            specialColumnIds:"",
            createUserId:"",

            checkboxModel:false,
            specialColumn:[],
            specialColumnData:[]
		}
	},
	methods:{
        openSpecialModal(){
            this.checkboxModel = true;
        },
        okTap(){
            this.specialColumnIds = this.specialColumn.join(",");
        },
		submitClick(){
            let that = this;
            if(this.id == 0){
                $.ajax({
                    url: this.submitUrl,
                    type: 'POST',
                    data: {
                        limit:this.limit,
                        specialColumnIds:this.specialColumnIds,
                        createUserId:this.createUserId
                    },
                    beforeSend: function(request) {
                        request.setRequestHeader("Authorization", window.localStorage.getItem('Authorization'));
                    },
                    success(result){
                        if (result.status == 200) {
                            // 下载随机码表格
                            location.href = globel_.serverHost + result.message;

    		            	that.$Loading.finish();
    		            	that.$Message.success({
    			              	duration: 2,
    			              	content: globel_.configMessage.operateSuccess
    		            	});
    			            setTimeout(function() {
    			              	that.$router.push({
    			                	name: "specialCode"
    			              	});
    			            },2000)
    		          	}
                    }
                })

            }else{

            }
		},
	},
	created(){
        let that = this;
		this.id = this.$route.query.id;
        this.createUserId = window.localStorage.getItem('userId');
        // 获取专题
		let	getDataUrl = globel_.serverHost + globel_.configAPI.getSpecialColumnData;
		this.$http.get( getDataUrl,{params:{
			limit:10000,
			offset:0
		}}).then(function(result){
			that.specialColumnData    = result.data.rows;
		})

		if(this.id != 0){		//修改
            this.BreadcrumbTitle  = "修改师道码";
			this.submitUrl = globel_.serverHost + globel_.configAPI.getSchoolById.replace(":id",this.id);
			this.$Loading.start();

		}else{					//新建
            this.BreadcrumbTitle  = "新建师道码";
			this.submitUrl = globel_.serverHost + globel_.configAPI.createSdCode;
		}
	}
}
</script>

<style lang="css" scoped>
.addSpecialCode{
	padding: 20px;
}
form{
	width: 70%;
	margin: 0 auto;
}
.ivu-checkbox-wrapper.ivu-checkbox-large{
    display: block;
    text-align: left;
    font-size: 14px;
}
</style>
