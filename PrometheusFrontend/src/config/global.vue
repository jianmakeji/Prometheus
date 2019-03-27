<script type="text/javascript">

	// const serverHost = "http://prometheus.design-engine.org";
	// const serverHost = "https://bestpro.vip";
	const serverHost = "http://192.168.3.252:7001";
	// const serverHost = "http://localhost:8080";

	const aliHttp = "http://jm-prometheus.oss-cn-hangzhou.aliyuncs.com/";
	// const aliHttp = "https://jm-prometheus.oss-cn-hangzhou.aliyuncs.com/";

	const subjectData=[
		{id:1,title:"数学"},
		{id:2,title:"英语"},
		{id:3,title:"物理"},
		{id:4,title:"化学"}
	];
	const gradeData=[
		{id:7,title:"七年级"},
		{id:8,title:"八年级"},
		{id:9,title:"九年级"}
	];
	const configMessage = {
		uploadImgSuccess:"图片上传成功！",
		uploadVideoSuccess:"视频上传成功！",
		operateSuccess:"操作成功，等待2秒后返回！",
		deleteSuccess:"删除成功！",
		createCodeSuccess:"二维码生成成功",
		createCodeError:"二维码生成失败",
		optError:"操作失败"
	};
	const configAPI = {
		login:"/api/manage/login",
		checkToken:"/api/manage/checkToken/:token",
		getUrlSignature:"/api/getUrlSignature?objectPath=",				//获取图片或视频时请求

		//学校增删改查
		createSchool:"/api/manage/school",
		getSchoolData:"/api/manage/school",
		updateSchoolById:"/api/manage/school/:id",
		deleteSchoolById:"/api/manage/school/:id",

		//名校试题
		createEliteSchool:"/api/manage/eliteSchool",
		getEliteSchoolData:"/api/manage/eliteSchool",
		updateEliteSchoolById:"/api/manage/eliteSchool/:id",
		deleteEliteSchoolById:"/api/manage/eliteSchool/:id",

		//名校试题视频
		createEliteCourse:"/api/manage/eliteCourse",
		getEliteCourseData:"/api/manage/eliteCourse",
		updateEliteCourseById:"/api/manage/eliteCourse/:id",
		deleteEliteCourseById:"/api/manage/eliteCourse/:id",
		getEliteCourseQRCode:"/api/manage/eliteCourse/getQRCode",

		//课程专栏增删改查
		createSpecialColumn:"/api/manage/specialColumn",
		deleteSpecialColumnById:"/api/manage/specialColumn/:id",
		updataSpecialColumnById:"/api/manage/specialColumn/:id",
		getSpecialColumnData:"/api/manage/specialColumn",
		getSpecialColumnDataById:"/api/manage/specialColumn/:id",

		//课程增删改查
		createSpecialCourse:"/api/manage/specialCourse",
		deleteSpecialCourseById:"/api/manage/specialCourse/:id",
		updataSpecialCourseById:"/api/manage/specialCourse/:id",
		getSpecialCourseData:"/api/manage/specialCourse",
		getSpecialCourseDataById:"/api/manage/specialCourse/:id",
		getSpecialCourseDataBySpecialColumnId:"/api/manage/specialCourse/getSpecialCourseBySpecialColumnId",
		getSpecialCourseByCondition:"/api/manage/specialCourse/getCourseByCondition",
		getSpecialCourseQRCode:"/api/manage/specialCourse/getQRCode",

		//老师增删改查
		createTeacher:"/api/manage/teacher",
		deleteTeacherById:"/api/manage/teacher/:id",
		updataTeacherById:"/api/manage/teacher/:id",
		getTeacherData:"/api/manage/teacher",
		getTeacherDataById:"/api/manage/teacher/:id",

		getUser:"/api/manage/users",
		//评论
		deleteCommentById:"/api/manage/comment/:id",
		getCommentData:"/api/manage/comment"
	};
	export default{
		aliHttp,			//阿里云文件存储
		serverHost,			//ip地址
		subjectData,		//学科数组
		gradeData,			//年级
		configAPI,			//接口数据
		configMessage		//提示信息
	}
</script>
