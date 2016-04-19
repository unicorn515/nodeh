
			 var bt=document.getElementById("signinb");
			 var pt=document.getElementById("signinno");
			 $('#signinb').onclick=function(){
			  localStorage.setItem("vinput",$('#signinno').val());
			  location.href='http://vloz-zshc.daoapp.io/end';
			 }


