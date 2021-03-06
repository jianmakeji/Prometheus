import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login'
import school from '@/components/school'
import specialColumn from '@/components/specialColumn'
import addSpecialColumn from '@/components/addSpecialColumn'
import specialCourse from '@/components/specialCourse'
import addSpecialCourse from '@/components/addSpecialCourse'
import user from '@/components/user'
import teacher from '@/components/teacher'
import teacherDetail from '@/components/teacherDetail'
import addTeacher from '@/components/addTeacher'
import exchange from '@/components/exchange'
import comment from '@/components/comment'
import addSchool from '@/components/addSchool'
import eliteSchool from '@/components/eliteSchool'
import addEliteSchool from '@/components/addEliteSchool'
import eliteCourse from '@/components/eliteCourse'
import addEliteCourse from '@/components/addEliteCourse'
import specialCode from '@/components/specialCode'
import addSpecialCode from '@/components/addSpecialCode'


Vue.use(Router)

export default new Router({
    mode:"history",
  	routes: [{
            path:"/",
            name: '',
	    	component: school
        },{
	    	path: '/school',
	    	name: 'school',
	    	component: school
	    },{
	    	path: '/specialColumn',
	    	name: 'specialColumn',
	    	component: specialColumn
	    },{
	    	path: '/specialColumn/addSpecialColumn',
	    	name: 'addSpecialColumn',
	    	component: addSpecialColumn
	    },{
	    	path: '/specialCourse',
	    	name: 'specialCourse',
	    	component: specialCourse
	    },{
	    	path: '/addSpecialCourse',
	    	name: 'addSpecialCourse',
	    	component: addSpecialCourse
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
	    },{
	    	path: '/exchange',
	    	name: 'exchange',
	    	component: exchange
	    },{
	    	path: '/teacherDetail',
	    	name: 'teacherDetail',
	    	component: teacherDetail
	    },{
	    	path: '/comment',
	    	name: 'comment',
	    	component: comment
	    },{
	    	path: '/addSchool',
	    	name: 'addSchool',
	    	component: addSchool
	    },{
	    	path: '/eliteSchool',
	    	name: 'eliteSchool',
	    	component: eliteSchool
	    },{
	    	path: '/addEliteSchool',
	    	name: 'addEliteSchool',
	    	component: addEliteSchool
	    },{
	    	path: '/eliteCourse',
	    	name: 'eliteCourse',
	    	component: eliteCourse
	    },{
	    	path: '/addEliteCourse',
	    	name: 'addEliteCourse',
	    	component: addEliteCourse
	    },{
            path:'/specialCode',
            name:'specialCode',
            component:specialCode
        },{
            path:'/addSpecialCode',
            name:'addSpecialCode',
            component:addSpecialCode
        }
	]
})
