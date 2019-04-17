<template>
  	<div id="app">
        <Modal class="modalDialog" v-model="loginModal" width="360" :closable="false" :footer-hide="true" :mask-closable="false" :fullscreen="true">
            <Form class="myForm" style="width:300px;margin:250px auto;">
                <h2 style="text-align:center;margin-top:15px;margin-bottom:20px;">登录系统</h2>
                <FormItem>
                    <Input v-model="formItem.username" placeholder="请输入用户名..." type="email" name="username" clearable >{{formItem.username}}</Input>
                </FormItem>
                <FormItem>
                    <Input v-model="formItem.password" placeholder="请输入密码..." type="password" name="password" clearable @on-keyup.enter="submit">{{formItem.password}}</Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" v-on:click="submit" long>确定</Button>
                </FormItem>
            </Form>
            <p :style="styleObject">备案/许可证编号为：湘ICP备18021338号</p>
        </Modal>
	  	<div class="layout">
          	<Layout >
              	<Sider ref="side1" hide-trigger collapsible :collapsed-width="78" width="240" v-model="isCollapsed" @on-collapse="onCollapse">
                  	<Menu :active-name="activeName" theme="dark" width="auto" :class="menuitemClasses" @on-select="menuTap">
						<MenuItem name="login" >
                          	<img style="width:100%;height:auto;" v-bind:src= "logoSrc"/>
                      	</MenuItem>
                        <MenuItem name="1" >
                          	<Icon type="ios-school" />
                          	<span>学校管理</span>
                      	</MenuItem>
                      	<MenuItem name="2" >
                          	<Icon type="ios-videocam" />
                          	<span>专题管理</span>
                      	</MenuItem>
                      	<MenuItem name="3">
                          	<Icon type="ios-videocam" />
                          	<span>专题视频管理</span>
                      	</MenuItem>
                        <MenuItem name="4">
                          	<Icon type="ios-book" />
                          	<span>试题管理</span>
                      	</MenuItem>
                        <MenuItem name="5">
                          	<Icon type="ios-book" />
                          	<span>试题视频管理</span>
                      	</MenuItem>
                        <MenuItem name="9">
                          	<Icon type="ios-key" />
                          	<span>师道码管理</span>
                      	</MenuItem>
						<MenuItem name="6">
                          	<Icon type="md-person" />
                          	<span>老师管理</span>
                      	</MenuItem>
						<MenuItem name="7">
                          	<Icon type="md-person" />
                          	<span>用户管理</span>
                      	</MenuItem>
                        <MenuItem name="8">
                          	<Icon type="ios-chatbubbles" />
                          	<span>评论管理</span>
                      	</MenuItem>
                  	</Menu>
              	</Sider>
              	<Layout>
                  	<Header :style="{padding: 0}" class="layout-header-bar">
                      	<div>
                            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>简码科技中小学视频教育管理系统
                            <Button type="text" icon="md-log-out" style="position: absolute;right: 5%;top: 15px;color: rgb(237, 64, 20);" @click="loginOut">退出</Button>
                        </div>
                  	</Header>
                  	<Content :style="{margin: '20px', background: '#fff', minHeight: mHeight}">
  						<router-view/>
                  	</Content>
              	</Layout>
          	</Layout>
      	</div>
  	</div>
</template>

<script>
import globel_ from './config/global.vue'
import $ from 'jquery'

export default {
  	name: 'App',
  	data () {
	  	return {
            mHeight:0,
            loginModal:true,
			activeName:"1",
		  	isCollapsed: false,
            logoSrc:'./static/images/logo_horizontal.png',
            formItem:{
                username:"",
                password:""
            },
            styleObject:{width:'300px', margin:'0 auto',textAlign: 'center', color: '#999',paddingTop:""}
	  	}
  	},
  	computed: {
	  	rotateIcon () {
		  	return [
			  	'menu-icon',
			  	this.isCollapsed ? 'rotate-icon' : ''
		  	];
	  	},
	  	menuitemClasses () {
		  	return [
			  	'menu-item',
			  	this.isCollapsed ? 'collapsed-menu' : ''
		  	]
	  	}
  	},
  	methods: {
        onCollapse(isCollapse){
            if(isCollapse){
                this.logoSrc = "./static/images/logo_small.png";
            }else{
                this.logoSrc = "./static/images/logo_horizontal.png";
            }
        },
	  	collapsedSider () {
		  	this.$refs.side1.toggleCollapse();
	  	},
	  	menuTap (event){
                let that = this;
                if(event == 1){
    				this.$router.push({name:"school"});
    			}else if(event == 2){
    				this.$router.push({name:"specialColumn"});		//专栏
    			}else if(event == 3){
    				this.$router.push({name:"specialCourse"});
    			}else if(event == 4){
    				this.$router.push({name:"eliteSchool"});
    			}else if(event == 5){
    				this.$router.push({name:"eliteCourse"});
    			}else if(event == 6){
    				this.$router.push({name:"teacher"});
    			}else if(event == 7){
        			this.$router.push({name:"user"});
    			}else if(event == 8){
    				this.$router.push({name:"comment"});
    			}else if(event == 9){
    				this.$router.push({name:"specialCode"});
    			}
	  	},
        loginOut(){
            this.$router.push('../');
            this.loginModal = true;
        },
        submit(){
            let that = this;
            this.$Loading.start();
            this.$http.post( globel_.serverHost + globel_.configAPI.login ,{
                username : this.formItem.username,
                password : this.formItem.password
            }).then(function(result){
                if (result.data.status == 200) {
                    that.$Loading.finish();
                    // 添加缓存userID
                    window.localStorage.setItem('userId',result.data.userId);
                    window.localStorage.setItem('Authorization',result.data.token);

                    that.loginModal = false;
                    that.$http.defaults.headers.common['Authorization'] = result.data.token;
                    // that.$http.defaults.withCredentials = true;
            		that.$router.push({name:"school"});

                    that.mHeight = document.documentElement.clientHeight - 110 +"px";
                }else{
                    that.$Loading.finish();
                    that.loginModal = true;
                    that.$Message.error({ duration: 2, content: result.data.message});
                }
            }).catch(function(err){
                that.$Loading.finish();
                that.$Message.error({
                  duration: 2,
                  content: err
                });
            })
        }
  	},
	created(){
        this.$router.push('../');
        this.styleObject.paddingTop = document.documentElement.clientHeight - 750 + "px";
	},
}
</script>

<style>
#app {
  	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	color: #2c3e50;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon{
    transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 150px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
.modalDialog .ivu-modal-body{
    background-color: rgba(55,55,55,1);
}
.modalDialog .ivu-form h2{
    color:white;
}
.layout .ivu-layout .ivu-layout-header{
    background: white;
}
</style>
