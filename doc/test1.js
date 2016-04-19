(function(){
			 //var bt=document.getElementById("signinb");
			 //var pt=document.getElementById("signinno");
			 console.log('im');
			 $('#signinb').onclick=function(){
			 	console.log('ht');
			  localStorage.setItem("vinput",$('#signinno').val());
			  location.href='http://vloz-zshc.daoapp.io/end';
			 }
})();

