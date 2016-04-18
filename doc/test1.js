// 数据缓存
// 建议开发者选择mvvm框架来通过数据来驱动UI变化
(function(){
			 var bt=document.getElementById("signinb");
			 var pt=document.getElementById("signinno");
			 $('#signinb').onclick=function(){
			  localStorage.setItem("vinput",$('#signinno').val());
			  location.href='http://vloz-zshc.daoapp.io/end';
			 }
})();

