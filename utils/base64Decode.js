function b64DecodeUnicode(str) {
    if(!str){
      return "No output"
    }
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }

  module.exports=b64DecodeUnicode;