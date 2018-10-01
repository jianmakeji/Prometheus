module.exports = {

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
