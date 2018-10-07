module.exports = {
    xyData: xyData
}
var xy_data = xyData()

function xyData() {
    var arr = {
        videoList: [
            {
                id: 1, name: "直线、射线、线段", describe: "直线、射线、线段的表示方法", courseType: "领先课堂",
                specialColumn: "精品课程", thumb: "http://img5.imgtn.bdimg.com/it/u=2799293021,1713737542&fm=27&gp=0.jpg",
                videoAddress: "http://zeus-education.oss-cn-hangzhou.aliyuncs.com/edu1.mp4"
            },
            {
                id: 2, name: "两点间的距离", describe: "两点间的距离", courseType: "领先课堂", specialColumn: "精品课程",
                thumb: "http://img1.imgtn.bdimg.com/it/u=2213670986,2923778817&fm=27&gp=0.jpg",
                videoAddress: "http://zeus-education.oss-cn-hangzhou.aliyuncs.com/edu1.mp4"
            },
            {
                id: 2, name: "正方体", describe: "正方体正方体正方体", courseType: "领先课堂", specialColumn: "精品课程",
                thumb: "http://img5.imgtn.bdimg.com/it/u=2198746125,2255961738&fm=26&gp=0.jpg",
                videoAddress: "http://zeus-education.oss-cn-hangzhou.aliyuncs.com/edu1.mp4"
            }
        ],
        courseType: [
            { id: 1, name: "精品课程", describe: "精品课程" },
            { id: 2, name: "专题突破", describe: "专题突破" }
        ],
        //精品课程
        jingpin_course_type: [
            {
                id: 1, name: "领先课堂", grade: "九年级", describe: "领先课堂领先课堂领先课堂",
                thumb: "http://img5.imgtn.bdimg.com/it/u=2198746125,2255961738&fm=27&gp=0.jpg"
            },
            {
                id: 2, name: "培优课堂", grade: "九年级", describe: "培优课堂培优课堂培优课堂",
                thumb: "http://img1.imgtn.bdimg.com/it/u=1908706871,148556360&fm=27&gp=0.jpg"
            },
            {
                id: 2, name: "汇智课堂", grade: "九年级", describe: "培优课堂培优课堂培优课堂",
                thumb: "http://img3.imgtn.bdimg.com/it/u=2200166214,500725521&fm=27&gp=0.jpg"
            }
        ],
        // 专题突破
        zhuanti_course_type: [
            {
                id: 1, name: "计算专题", grade: "九年级", describe: "计算专题计算专题",
                thumb: "http://img5.imgtn.bdimg.com/it/u=2198746125,2255961738&fm=27&gp=0.jpg"
            },
            {
                id: 2, name: "集合专题", grade: "九年级", describe: "集合专题集合专题",
                thumb: "http://img1.imgtn.bdimg.com/it/u=1908706871,148556360&fm=27&gp=0.jpg"
            },
            {
                id: 2, name: "压轴题专题", grade: "九年级", describe: "压轴题专题",
                thumb: "http://img3.imgtn.bdimg.com/it/u=2200166214,500725521&fm=27&gp=0.jpg"
            }
        ]
    }
    return arr;
}
