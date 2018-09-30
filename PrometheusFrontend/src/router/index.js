import Vue from 'vue'
import Router from 'vue-router'
import courseType from '@/components/courseType'
import addCourseType from '@/components/addCourseType'
import specialColumn from '@/components/specialColumn'
import addSpecialColumn from '@/components/addSpecialColumn'
import course from '@/components/course'
import addCourse from '@/components/addCourse'
import articleType from '@/components/articleType'
import addArticleType from '@/components/addArticleType'
import articles from '@/components/articles'
import addArticle from '@/components/addArticle'
import user from '@/components/user'
import teacher from '@/components/teacher'
import addTeacher from '@/components/addTeacher'

Vue.use(Router)

export default new Router({
  	routes: [
		{
	    	path: '/',
	    	name: 'courseType',
	    	component: courseType
	    },{
	    	path: '/courseType',
	    	name: 'courseType',
	    	component: courseType
	    },{
	    	path: '/specialColumn',
	    	name: 'specialColumn',
	    	component: specialColumn
	    },{
	    	path: '/specialColumn/addSpecialColumn',
	    	name: 'addSpecialColumn',
	    	component: addSpecialColumn
	    },{
	    	path: '/courseType/addCourseType',
	    	name: 'addCourseType',
	    	component: addCourseType
	    },{
	    	path: '/course',
	    	name: 'course',
	    	component: course
	    },{
	    	path: '/addCourse',
	    	name: 'addCourse',
	    	component: addCourse
	    },{
	    	path: '/articleType',
	    	name: 'articleType',
	    	component: articleType
	    },{
	    	path: '/articleType/addArticleType',
	    	name: 'addArticleType',
	    	component: addArticleType
	    },{
	    	path: '/articles',
	    	name: 'articles',
	    	component: articles
	    },{
	    	path: '/articles/addArticle',
	    	name: 'addArticle',
	    	component: addArticle
	    },{
	    	path: '/user',
	    	name: 'user',
	    	component: user
	    },{
	    	path: '/teacher',
	    	name: 'teacher',
	    	component: teacher
	    },{
	    	path: '/teacher/addTeacher',
	    	name: 'addTeacher',
	    	component: addTeacher
	    }
	]
})
