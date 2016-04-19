
var dom={
	   	 $cct : $('#cct'),
    	 $p1pan : $('#p1pan'),
    	 $conte:$('#conte'),
    	 $say:$('#say'),
    	 $qname:$('#qname'),
    	 $p2 : $('#p2'),
    	 $p1 : $('#p1'),
    	 $p2title : $('#p2title'),
    	 $panlist : $('#panlist'),
    	 $signin:$('#signin')
};

var yunXin = {
    init: function () {
    	this.userUID=localStorage.getItem("vinput"); 
        this.cache = new Cache();
        this.mysdk = new SDKBridge(this,this.cache);
        this.histp=0;
        this.msgl=0;
        this.undis='';
        this.initNode();
    },
    initNode:function(){
    	dom.$p2.css({'width':window.innerWidth,'height':window.innerHeight,'transform':'translate3d('+window.innerWidth+'px,-'+window.innerHeight+'px,0)'});
		dom.$p1.css({'width':window.innerWidth,'height':window.innerHeight});
     	$('#p2back').click(function(){
     		this.undis='';
     		dom.$qname.val('');
     		dom.$qname.hide();
    		dom.$p1.css('transform','translate3d(0,0,0)');
			dom.$p2.css('transform','translate3d('+window.innerWidth+'px,-'+window.innerHeight+'px,0)');
    	});		
    	var that=this;
    	$('#panlist').click(function(){that.gets();});
    	$('#p2inputbt').click(function(){that.sends();});
    	$('#btadd').click(function(){that.addq();});
    	$('#btout').click(function(){that.delq();});
    },
    initconte:function(l){
    	var conteword=l.result.v1.rep;
    	var str='<ul>'+l.result.v1.mono+'经验库';
    	for(var i=0;i<conteword.length;i++){
        	str=str+'<li>'+conteword[i]+'</li>';
        }
        str+='</ul>';
        dom.$conte.html(str);
        $('#conte ul li').click(function(){
        	str=dom.$say.val();
        	str+=$(this)[0].innerText;
        	dom.$say.val(str).focus();
		});
    },
	fetch:function(u,p){
		return new Promise(function(res,rej){
					$.post(u, p, function(data){
					res(data);
					})
				})
	},
    initInfo:function(){
    	var that=this;
    	console.log('initinit');
    	var str='<ul>';
		//var tar=[];
        var tl=this.cache.getTeamlist();
        for(var i=0;i<tl.length;i++){
        	var sss = this.cache.findSession('team-'+tl[i].teamId);
			//tar.push(tl[i].teamId);
        	var n=(!!sss)?sss.unread:0;
        	str=str+'<li>'+tl[i].name+'<span style="width: '+this.unlen(n)+'px"></span></li>';
        }
        str+='</ul>';
        dom.$p1pan.html(str);
        $('#p1pan ul li').click(function(){
        	    dom.$p2title.html($(this)[0].innerText);
        	    //改其innerhtml，去掉span
        	    $(this).empty(); 
        	    $(this)[0].innerHTML='<li>'+dom.$p2title.text()+'</li>';
				that.undis=tl[$(this).index()].teamId;
				that.histp=that.cache.getMsgs(that.undis).length;
				that.msgl=that.histp;
				dom.$say.val('');
				dom.$panlist.html('showmore');
				that.fetch('http://vloz-zshc.daoapp.io/api/rest/rep','p='+dom.$signin.text()).then(that.initconte.bind(that));
				dom.$p2.css('transform','translate3d(0,-'+window.innerHeight+'px,0)');
				dom.$p1.css('transform','translate3d(-'+window.innerWidth+'px,0,0)');
		});
		this.fetch('http://vloz-zshc.daoapp.io/api/rest/gtmt','tags='+tl.map(function(e){return e.teamId;}).join('_')).then(function(d){
			dom.$signin.html(d.result.v1.mtno);
		});
    },
	unlen:function(n){
		return (n>10)?100:n*10;
	},
    /**
     * 加载更多云记录
    
    loadMoreCloudMsg:function(){
        var id = this.$chatEditor.data('to'),
            scene = this.$chatEditor.data('type'),
            lastItem = $("#j-cloudMsgList .item").first(),
            param ={
                scene:scene,
                to:id,
                beginTime:0,
                endTime:parseInt(lastItem.attr('data-time')),
                lastMsgId:parseInt(lastItem.attr('data-idServer')),//idServer 服务器用于区分消息用的ID，主要用于获取历史消息
                limit:20,
                reverse:false,
                done:this.cbCloudMsg.bind(this)
            }
        this.mysdk.getHistoryMsgs(param);
    },
 */
    sends: function () {
    	var to=this.undis;
    	var says=dom.$say.val().trim();
    	//回buttom
    	if((this.msgl-this.histp)>5){
    		this.histp=this.msgl;
    		this.gets();
    	}else{
    		var debug1='team-'+this.undis;
    		var sessions = this.cache.findSession(debug1);
    		if(!!sessions)console.log(sessions.unread);
    	}
    	if(says.length===0){
                return;
            } else {
                this.mysdk.sendTextMessage('team', to, says, this.cbsend.bind(this));
            }			
    },
    cbsend:function(err,msg){
            	this.cache.addMsgs(msg);
              	this.msgl+=1;
              	this.histp+=1;
               	var str='<div>'+msg.from+' @'+this.parseunixtime(msg.time)+' 说 '+msg.text+'</div>';
               	if(dom.$panlist.children().length>4)dom.$panlist.children(':nth-child(-n+2)').remove();
               	dom.$panlist.append(str);
               	if(dom.$cct.children().length>4)dom.$cct.children(':nth-child(-n+2)').remove();
           		dom.$cct.append(str);
               	dom.$say.val('').focus();
            },
   gets:function(){
   	if(this.histp<1)return;
   	var cp=parseInt(this.histp/5)+1;
   	this.histp-=5;
   	if(this.histp<0)this.histp=0;
   	var tp=parseInt(this.msgl/5)+1;
	var msgs=this.cache.getMsgs(this.undis);
	var str='showmore '+cp+'@'+tp;
	for(var i=0;i<5;i++){
	 if(i===this.msgl)break;
	 var instr=	'<div>'+msgs[this.histp+i].from+' @'+this.parseunixtime(msgs[this.histp+i].time)+' 说 '+msgs[this.histp+i].text+'</div>';
	 str+=instr;
	}
   	dom.$panlist.html(str);
   },
   addq:function(){
   	var inputs=dom.$qname.val().trim();
   	 if(inputs.length===0){
   	 	dom.$qname.show();
   	 }else{
   	 	//
   	 	dom.$qname.val('');
   	 	dom.$qname.hide();
   	 }
   },
   delq:function(){
   	var tl=this.cache.getTeamlist();
   	var tmem=this.cache.getTeamMembers(tl[0].teamId);
   	var p='uid='+this.userUID+'&tm='+tmem.map(function(e){return e.account;}).join('_')+'&tn='+tl.map(function(e){return e.teamId;}).join('_');
   	this.fetch('http://vloz-zshc.daoapp.io/api/s3',p).then(function(d){
		location.href='/end';
	});
   },
    /**
     * 获取当前会话消息
     * @return {void}
     
    getHistoryMsgs: function (scene,account) {
        var id = scene+"-"+account;
        var sessions = this.cache.findSession(id);
        var msgs = this.cache.getMsgs(id);
        //标记已读回执
        this.sendMsgRead(account,scene);
        if(!!sessions){
            if(sessions.unread>=msgs.length){
                var msgid = (msgs.length>0)?msgs[0].idClient:false;
                this.mysdk.getLocalMsgs(scene,account,msgid,this.getLocalMsgsDone.bind(this));
                return;
            }
        }
        var temp = appUI.buildChatContentUI(id,this.cache);
        this.$chatContent.html(temp);
        this.$chatContent.scrollTop(9999);
        //已读回执UI处理
        this.markMsgRead(id);
    },*/
    //UI上标记消息已读 nim.isMsgRemoteRead 不支持群已读回执

    doMsg:function(msg){
    	 console.log('onmsg');
        console.log({msg});          
            this.cache.addMsgs(msg);
            var oldmsgl=this.msgl;
            this.msgl=this.cache.getMsgs(this.undis).length;
            if(msg.type!=='notification'){
            	var str='<div>'+msg.from+' @'+this.parseunixtime(msg.time)+' 说 '+msg.text+'</div>';
            if(this.undis===msg.to){
            	if((oldmsgl-this.histp)<6){
            	if(dom.$panlist.children().length>4)dom.$panlist.children(':nth-child(-n+2)').remove();
            	dom.$panlist.append(str);
            	histp+=(this.msgl-oldmsgl);
            	}//查看历史记录状态则不更新界面，但要改变bottom的返回位置
            }          
            if(dom.$cct.children().length>4)dom.$cct.children(':nth-child(-n+2)').remove();
            dom.$cct.append(str);
            }else if(msg.attach.type==='dismissTeam'){
            	location.href='/end';
            	//截获dismiss 随即ajax(群主退出时一并做了) 回调后href至gameover页
            }
    },
    
    parseunixtime:function(ut){
    	var dt=new Date(ut);
    	return dt.getHours()+'时'+dt.getMinutes()+'分'+dt.getSeconds();
    }
};
yunXin.init();