module.exports = {

  aliConfig: () => {
    const alioss = exports = {};

    alioss.region = 'oss-cn-hangzhou';
    alioss.AccessKeyId = 'LTAIkUgfJUoAgdcT';
    alioss.AccessKeySecret = '41W3jB8PCFNkgDjcr8zklMJUKdYYU5';
    alioss.endpoint = 'oss-cn-hangzhou.aliyuncs.com';
    alioss.PolicyFile = 'policy/all_policy.txt';
    alioss.RoleArn = 'acs:ram::1751937945456422:role/prometheusfileoperation';
    alioss.TokenExpireTime = '3600';
    alioss.bucket = 'jm-prometheus';

    return alioss;
  },

  jwtSlot:() =>{
    return 'LTAIkUgFNkgDjcr8zklMJfJUoAgdcT';
  },
  //接口统一返回数据操作
  success: (message)=>{
    const result = {
      'status':200,
      'message':message,
    };
    return result;
  },

  failure: (message)=>{
    const result = {
      'status':500,
      'message':message,
    };
    return result;
  }
}
