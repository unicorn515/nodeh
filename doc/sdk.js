/**
 * SDK连接 功能相关
 */
var SDKBridge = function (ctr,data) {
	var userUID = localStorage.getItem("vinput"),
		that = this;
	if(!userUID){
     	window.location.href = '/n';
    	return;
	}
	//缓存需要获取的用户信息账号
	this.person = {};
	//缓存需要获取的群组账号
	this.team =[];
	this.person[userUID] = true;
	this.controller = ctr;
	this.cache = data;
	window.nim = this.nim = new NIM({
		//控制台日志，上线时应该关掉
		debug: true || { api: 'info', style: 'font-size:14px;color:blue;background-color:rgba(0,0,0,0.1)' },
        appKey: 'c1d92027795778d4c36b673da2559bca',
        //appKey: '45c6af3c98409b18a84451215d0bdd6e',
        account: userUID,
        //hdkg1的token
        //token: 'e10adc3949ba59abbe56e057f20f883e',
        token: '123456',
        //连接
        onconnect: onConnect.bind(this),
		onerror: onError.bind(this),
        // 群
        onteams: onTeams.bind(this),
        onteammembers: onTeamMembers.bind(this),
        //消息
        onmsg: onMsg.bind(this), 
        onroamingmsgs: saveMsgs.bind(this),
        onofflinemsgs: saveMsgs.bind(this),
		onsessions: onSessions.bind(this),
     	//同步完成
        onsyncteammembersdone: onSyncTeamMembersDone.bind(this),
        onsyncdone: onSyncDone.bind(this),

        //系统通知
     	onofflinesysmsgs: onOfflineSysmsgs.bind(this),

        onsynccreateteam:onSyncCreateteam.bind(this),
		syncRelations: false,
		syncFriends: false,
		syncFriendUsers: false
    });
	function onConnect() {
		this.teamMemberDone = false;
		this.sysMsgDone = false;
	    console&&console.log('连接成功');
	};
	function onError(error) {
	    console.log('错误信息' + error);
	};
	function onTeams(teams) {
		console.log('oteam');
		var teamlist = this.cache.getTeamlist();
		teamlist = this.nim.mergeTeams(teamlist, teams);    
		teamlist = this.nim.cutTeams(teamlist, teams.invalid);
		this.cache.setTeamList(teamlist);
	};
	function onSessions(sessions){
		console.log('osess');
		var old = this.cache.getSessions();
		this.cache.setSessions(this.nim.mergeSessions(old, sessions));
	};

	function saveMsgs(msgs) {
		msgs = msgs.msgs;
	    this.cache.addMsgs(msgs);
	};
	function onSyncDone() {
		console.log('消息同步完成');	
 		var ctr = this.controller;
 		this.sysMsgDone = true;
	    //如果用户数据拉取完毕，UI开始呈现
	    if(this.teamMemberDone){
	    	ctr.initInfo();
	    }
	};
	function onSyncTeamMembersDone() {
		console.log('群成员同步完成');
		var ctr = this.controller;
	    this.teamMemberDone = true;
	    //如果用户消息等拉取完毕，UI开始呈现
	    if(this.sysMsgDone){
	    	//ctr.initInfo(this.person,this.team);
	    	ctr.initInfo();
	    }
	};
	function onTeamMembers(obj) {
		console.log('ontmem');
		this.cache.setTeamMembers(obj.teamId,obj.members);
		/*
		var members = obj.members;
	    for(var i = 0;i<members.length;i++){
    		this.person[members[i].account] = true;	
		}
		*/
	};
	function onMsg(msg) {
		//涉及UI太多放到main.js里去处理了
	    this.controller.doMsg(msg);
	};
	function onOfflineSysmsgs(sysMsgs){
		var data = this.cache.getSysMsgs();
		data =this.nim.mergeSysMsgs(data, sysMsgs).sort(function(a,b){
			return b.time-a.time;
		});
		this.cache.setSysMsgs(data);
		this.cache.addSysMsgCount(data.length);
	}


	function onSyncCreateteam(data){
		console.log('oncrtteam');
		console.log({data});
		this.cache.addTeam(data);
		this.controller.buildTeams();
	};

}

/********** 这里通过原型链封装了sdk的方法，主要是为了方便快速阅读sdkAPI的使用 *********/


/**
* 发送普通文本消息
* @param scene：场景，分为：P2P点对点对话，team群对话
* @param to：消息的接收方
* @param text：发送的消息文本
* @param callback：回调
*/
SDKBridge.prototype.sendTextMessage = function (scene, to, text , callback) {
    this.nim.sendText({
        scene: scene || 'p2p',
        to: to,
        text: text,
        done: callback
    });
};


/**
 * 获取云记录消息
 * @param  {Object} param 数据对象
 * @return {void}       
 */
SDKBridge.prototype.getHistoryMsgs = function(param){
	this.nim.getHistoryMsgs (param);
}
/**
 * 获取本地历史记录消息  
 */
SDKBridge.prototype.getLocalMsgs = function(scene,to,lastMsgId,done){
	if(lastMsgId){
		this.nim.getLocalMsgs ({
			scene:scene,
			to:to,
			lastMsgIdClient:lastMsgId,
			limit:20,
			done:done
		});
	}else{
		this.nim.getLocalMsgs ({
			scene:scene,
			to:to,
			limit:20,
			done:done
		});
	}
	
}
SDKBridge.prototype.getLocalTeams = function(teamIds,done){
	this.nim.getLocalTeams ({
		teamIds:teamIds,
		done:done
	});
}
/**
 * 获取本地系统消息记录
 * @param  {Funciton} done 回调
 * @return {void}       
 */
SDKBridge.prototype.getLocalSysMsgs = function(done){
	this.nim.getLocalSysMsgs({
		done:done
	});
}

/**
 * 获取删除本地系统消息记录
 * @param  {Funciton} done 回调
 * @return {void}       
 */
SDKBridge.prototype.deleteAllLocalSysMsgs = function(done){
	this.nim.deleteAllLocalSysMsgs({
        done: done
    });
}

// 获取群信息
SDKBridge.prototype.getTeam = function(account,done){
	this.nim.getTeam({
		teamId: account,
		done: done
	});
}

SDKBridge.prototype.createTeam = function(param){
	this.nim.createTeam(param);
}	
SDKBridge.prototype.getTeamMembers = function(param){
	this.nim.getTeamMembers(param);
}
SDKBridge.prototype.leaveTeam = function(param){
	this.nim.leaveTeam(param);
}
SDKBridge.prototype.dismissTeam = function(param){
	this.nim.dismissTeam(param);
}
SDKBridge.prototype.addTeamMembers= function(param){
	this.nim.addTeamMembers(param);
}

/**
 * 已读回执
 */
SDKBridge.prototype.sendMsgReceipt = function(msg,done){
	this.nim.sendMsgReceipt({
	    msg:msg,
	    done: done
	});
}