<template lang="html">
    <div class="login" style="width:25%;margin:200px auto;" v-cloak>
		<Form class="myForm">
			<h2 style="text-align:center;margin-top:15px;margin-bottom:20px;">单点登录系统</h2>
	    	<FormItem>
	            <Input v-model="formItem.username" placeholder="请输入用户名..." type="email" name="username" clearable >{{formItem.username}}</Input>
	        </FormItem>
	        <FormItem>
	            <Input v-model="formItem.password" placeholder="请输入密码..." type="password" name="password" clearable >{{formItem.password}}</Input>
	        </FormItem>
	        <FormItem>
	        	<Button type="primary" v-on:click="submit"  long>确定</Button>
	        </FormItem>
	    </Form>
		<div id="login_container">
		</div>
	</div>
</template>

<script>
import globel_ from './../config/global.vue'
export default {
    name:"login",
    data(){
        return{
            formItem:{
                username:"",
                password:""
            }
        }
    },
    methods:{
        submit(){
            console.log(this.formItem);
            let that = this;
            this.$http.post( globel_.serverHost + globel_.configAPI.login ,{
                username : this.formItem.username,
                password : this.formItem.password
            }).then(function(result){
                console.log(result);
                if (result.data.status == 200) {
                    globel_.loginFlag = 1;
                    that.$router.push({name:"courseType"});
                }else{
                    that.$Message.error({
                      duration: 2,
                      content: result.data.message
                    });
                }
            }).catch(function(err){
                console.log(err);
            })
        }
    }
}
</script>

<style lang="css">
</style>
