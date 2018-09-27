import Vue from 'vue'
import Router from 'vue-router'
import videoSpecialColumn from '@/components/videoSpecialColumn'
import videoSpecialColumnAlter from '@/components/videoSpecialColumnAlter'
import videoType from '@/components/videoType'
import videoTypeAlter from '@/components/videoTypeAlter'
import videoManage from '@/components/videoManage'
import videoAlter from '@/components/videoAlter'
import articleType from '@/components/articleType'
import articleTypeAlter from '@/components/articleTypeAlter'
import articleManage from '@/components/articleManage'
import articleAlter from '@/components/articleAlter'
import userManage from '@/components/userManage'
import teacherManage from '@/components/teacherManage'
import teacherAlter from '@/components/teacherAlter'

Vue.use(Router)

export default new Router({
  	routes: [
		{
	    	path: '/',
	    	name: 'videoSpecialColumn',
	    	component: videoSpecialColumn
	    },{
	    	path: '/videoSpecialColumn',
	    	name: 'videoSpecialColumn',
	    	component: videoSpecialColumn
	    },{
	    	path: '/videoType',
	    	name: 'videoType',
	    	component: videoType
	    },{
	    	path: '/videoType/videoTypeAlter',
	    	name: 'videoTypeAlter',
	    	component: videoTypeAlter
	    },{
	    	path: '/videoClass/videoSpecialColumnAlter',
	    	name: 'videoSpecialColumnAlter',
	    	component: videoSpecialColumnAlter
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
	    },{
	    	path: '/userManage',
	    	name: 'userManage',
	    	component: userManage
	    },{
	    	path: '/teacherManage',
	    	name: 'teacherManage',
	    	component: teacherManage
	    },{
	    	path: '/teacherManage/teacherAlter',
	    	name: 'teacherAlter',
	    	component: teacherAlter
	    }
	]
})
