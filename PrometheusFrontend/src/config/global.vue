<script type="text/javascript">
	const serverHost = "http://192.168.3.103:7001";
	const defaultImage = "https://www.baidu.com/img/bd_logo1.png?where=super";
	// const defaultImage = "./../assets/logo.jpg";
	const subjectData=[
		{id:1,title:"数学"},
		{id:2,title:"英语"},
		{id:3,title:"物理"},
		{id:4,title:"化学"}
	];
	const gradeData=[
		{id:6,title:"六年级"},
		{id:7,title:"七年级"},
		{id:8,title:"八年级"},
		{id:9,title:"九年级"}
	];
	const articleTypeData = [
		{id:1,title:"父子篇"},
		{id:2,title:"成长篇"},
		{id:3,title:"亲子篇"}
	];
	const configMessage = {
		operateSuccess:"操作成功，等待2秒后返回！",
		deleteSuccess:"删除成功！"
	};
	const configAPI = {
		//课程类别增删改查
		createCourseType:"/api/manage/courseType",
		deleteCourseTypeById:"/api/manage/courseType/:id",
		updataCourseTypeById:"/api/manage/courseType/:id",
		getCourseTypeData:"/api/manage/courseType?limit=10&offset=",
		getCourseTypeDataById:"/api/manage/courseType/:id",

		//课程专栏增删改查
		createSpecialColumn:"/api/manage/specialColumn",
		deleteSpecialColumnById:"/api/manage/specialColumn/:id",
		updataSpecialColumnById:"/api/manage/specialColumn/:id",
		getSpecialColumnData:"/api/manage/specialColumn?limit=10&offset=",
		getSpecialColumnDataById:"/api/manage/specialColumn/:id",

		//课程增删改查
		createCourse:"/api/manage/course",
		deleteCourseById:"/api/manage/course/:id",
		updataCourseById:"/api/manage/course/:id",
		getCourseData:"/api/manage/course?limit=10&offset=",
		getCourseDataById:"/api/manage/course/:id",
		getCourseDataBySpecialColumn:"/api/manage/course/getCourseBySpecialColumnId/:id?limit=10000&offset=0",
		getCourseByCondition:"/api/manage/course/getCourseByCondition?limit=10&offset=",

		//好文增删改查
		createArticle:"/api/manage/article",
		deleteArticleById:"/api/manage/article/:id",
		updataArticleById:"/api/manage/article/:id",
		getArticleData:"/api/manage/article?limit=10&offset=",
		getArticleDataById:"/api/manage/article/:id",

		//老师增删改查
		createTeacher:"/api/manage/teacher",
		deleteTeacherById:"/api/manage/teacher/:id",
		updataTeacherById:"/api/manage/teacher/:id",
		getTeacherData:"/api/manage/teacher?limit=10&offset=",
		getTeacherDataById:"/api/manage/teacher/:id",
	};
	export default{
		serverHost,			//ip地址
		defaultImage,		//上传默认占位图
		subjectData,		//学科数组
		gradeData,			//年级
		configAPI,			//接口数据
		configMessage,		//提示信息
		articleTypeData		//好文分享类别数据
	}
</script>
