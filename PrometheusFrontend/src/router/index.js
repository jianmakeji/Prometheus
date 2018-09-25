import Vue from 'vue'
import Router from 'vue-router'
import videoType from '@/components/videoType'
import videoTypeAlter from '@/components/videoTypeAlter'
import videoClass from '@/components/videoClass'
import videoClassAlter from '@/components/videoClassAlter'
import videoManage from '@/components/videoManage'
import videoAlter from '@/components/videoAlter'
import articleType from '@/components/articleType'
import articleTypeAlter from '@/components/articleTypeAlter'
import articleManage from '@/components/articleManage'
import articleAlter from '@/components/articleAlter'

Vue.use(Router)

export default new Router({
  	routes: [
		{
	    	path: '/',
	    	name: 'videoType',
	    	component: videoType
	    },
		{
	    	path: '/videoType',
	    	name: 'videoType',
	    	component: videoType
	    },{
	    	path: '/videoClass/videoTypeAlter',
	    	name: 'videoTypeAlter',
	    	component: videoTypeAlter
	    },{
	    	path: '/videoClass',
	    	name: 'videoClass',
	    	component: videoClass
	    },{
	    	path: '/videoClass/videoClassAlter',
	    	name: 'videoClassAlter',
	    	component: videoClassAlter
	    },{
	    	path: '/videoManage',
	    	name: 'videoManage',
	    	component: videoManage
	    },{
	    	path: '/videoAlter',
	    	name: 'videoAlter',
	    	component: videoAlter
	    },{
	    	path: '/articleType',
	    	name: 'articleType',
	    	component: articleType
	    },{
	    	path: '/articleType/articleTypeAlter',
	    	name: 'articleTypeAlter',
	    	component: articleTypeAlter
	    },{
	    	path: '/articleManage',
	    	name: 'articleManage',
	    	component: articleManage
	    },{
	    	path: '/articleManage/articleAlter',
	    	name: 'articleAlter',
	    	component: articleAlter
	    }
	]
})
