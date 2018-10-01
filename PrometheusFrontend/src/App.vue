<template>
  	<div id="app">
	  	<div class="layout">
          	<Layout>
              	<Sider ref="side1" hide-trigger collapsible :collapsed-width="78" width="240" v-model="isCollapsed">
                  	<Menu :active-name="activeName" theme="dark" width="auto" :class="menuitemClasses" @on-select="menuTap">
						<MenuItem name="0" >
                          	<img  style="width:100%;height:auto;" src= "./assets/logo.jpg"/>
                      	</MenuItem>
                      	<MenuItem name="1">
                          	<Icon type="ios-videocam" />
                          	<span>类别管理</span>
                      	</MenuItem>
                      	<MenuItem name="2" >
                          	<Icon type="ios-videocam" />
                          	<span>专栏管理</span>
                      	</MenuItem>
                      	<MenuItem name="3">
                          	<Icon type="ios-videocam" />
                          	<span>视频管理</span>
                      	</MenuItem>
					  	<MenuItem name="4">
                        	<Icon type="md-paper" />
                          	<span>好文类别管理</span>
                      	</MenuItem>
					  	<MenuItem name="5">
                          	<Icon type="md-paper" />
                          	<span>好文管理</span>
                      	</MenuItem>
						<MenuItem name="6">
                          	<Icon type="md-person" />
                          	<span>用户管理</span>
                      	</MenuItem>
						<MenuItem name="7">
                          	<Icon type="md-person" />
                          	<span>老师管理</span>
                      	</MenuItem>
						<MenuItem name="8">
                          	<Icon type="logo-bitcoin" />
                          	<span>交易管理</span>
                      	</MenuItem>
                  	</Menu>
              	</Sider>
              	<Layout>
                  	<Header :style="{padding: 0}" class="layout-header-bar">
                      	<Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>心一教育后台管理系统
                  	</Header>
                  	<Content :style="{margin: '20px', background: '#fff', minHeight: '800px'}">
  						<router-view/>
                  	</Content>
              	</Layout>
          	</Layout>
      	</div>
  	</div>
</template>

<script>
export default {
  	name: 'App',
  	data () {
	  	return {
			activeName:"1",
		  	isCollapsed: false
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
	  	collapsedSider () {
		  	this.$refs.side1.toggleCollapse();
	  	},
	  	menuTap (event){
		  	let that = this;
			if(event == 1){
				this.$router.push({name:"courseType"});		//类型
			}else if(event == 2){
				this.$router.push({name:"specialColumn"});		//专栏
			}else if(event == 3){
				this.$router.push({name:"course"});
			}else if(event == 4){
				this.$router.push({name:"articleType"});
			}else if(event == 5){
				this.$router.push({name:"articles"});
			}else if(event == 6){
				this.$router.push({name:"user"});
			}else if(event == 7){
				this.$router.push({name:"teacher"});
			}else if(event == 8){
				this.$router.push({name:"exchange"});
			}
	  	}
  	},
	created(){
		this.$router.push({name:"courseType"});
	}
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
    width: 90px;
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
</style>
