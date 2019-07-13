
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


var isPc = IsPC();
//alert(isPc);
//判断加密 1026
if(isPc){

if(document.referrer.indexOf("dedeyuan.com")<=0&&document.referrer.indexOf("ym79.com")<=0&&document.referrer.indexOf("dedeyuan.com")<=0&&document.referrer.indexOf("dedeyuan.com")<=0&&document.referrer.indexOf("dedeyuan.com")<=0){
    top.location.href='http://www.dedeyuan.com';
}



}
