// 数据缓存
// 建议开发者选择mvvm框架来通过数据来驱动UI变化
var Cache = (function(){
	var Cache = function (argument) {
		this.teamlist = [];
		this.teamMembers = {};
		this.teamMap = {};
		this.msgs ={};
		this.sessions=[];
	};

	Cache.prototype.getSessions=function(){return this.sessions;};
	Cache.prototype.setSessions = function(sessions){
		this.sessions = sessions;
	};
	Cache.prototype.findSession = function (id) {
		for (var i = this.sessions.length - 1; i >= 0; i--) {
			if(this.sessions[i].id ===id){
				return this.sessions[i];
			}
		};
		return false;
	}
	Cache.prototype.addMsgs = function(msgs) {
		
		var item,
			user;
		if(!$.isArray(msgs)){
			this.addMsg(msgs);
			return;
		}
		for (var i = 0; i <msgs.length; i++) {
			if(msgs[i].scene==="team"){
				if(msgs[i].type==='notification')continue;
				user = msgs[i].to;
				if(!this.msgs[user]){
					this.msgs[user] = [];
				}
				this.msgs[user].push(msgs[i]);
			}
		};
	};
	Cache.prototype.addMsg = function(msg){
		var user;
		if(msg.type==='notification')return;
		if(msg.scene==="team"){
			user = msg.to;
			if(!this.msgs[user]){
				this.msgs[user] = [];
			}
			this.msgs[user].push(msg);
		}
		/*
		for(var i = 0;i<this.sessions.length;i++){
			if(user===this.sessions[i]){
				this.sessions.splice(i,1);
				break;
			}
		}*/
	};
	
	Cache.prototype.getCustomSysMsgs = function(data){
		return this.customSysMsgs;
	}
	// /**
	//  * 删除漫游消息/历史消息
	//  * @param {String} to 需移除的消息对象标识
	//  */
	// Cache.prototype.rmMsgs = function(to) {
	// 	if($.type(to) === "string"){
	// 		if(!!this.msgs["p2p-"+to]){
	// 			delete this.msgs["p2p-"+to];
	// 		}
	// 	}else{
	// 		if(!!this.msgs["team-"+to]){
	// 			delete this.msgs["team-"+to];
	// 		}
	// 	}
	// };

	/**
	 * 获取漫游/历史消息
	 * @return {Array}    
	 */

	Cache.prototype.getMsgs = function(id) {
		if(!!this.msgs[id]){
			return this.msgs[id];
		}else{
			return [];
		}
	};

	/**
	 * 根据映射名来获取消息对象集合 如"p2p-iostest"
	 * @param  {String} name 名字
	 * @return {Array}     
	 */
	Cache.prototype.getMsgsByUser = function (name) {
		return this.msgs[name]||[];
	}
	/**
	 * 离线消息处理
	 * @param {Array} msgs 
	 */
	Cache.prototype.addOfflineMsgs= function(msgs) {
		for (var i = msgs.length - 1; i >= 0; i--) {
			if (/text|image|file|audio|video|geo|custom|notification/i.test(msgs[i].type)) {
				this.addMsgs(msgs[i]);
			}else{
				continue;
			}
		};
	};

	/**
	 * 初始化群列表
	 * @param {array} list 
	 */
	Cache.prototype.setTeamList = function(list) {
		var item;
		for (var i = list.length - 1; i >= 0; i--) {
			item = list[i];
			this.teamMap[item.teamId] = item;
		};
		this.teamlist = list;
	};

	Cache.prototype.addTeam = function(team) {
		if(!this.hasTeam(team.teamId)){
			this.teamMap[team.teamId] = team;
			this.teamlist.push(team);
		}
	};
	Cache.prototype.hasTeam = function(id) {
		var item;
		for (var i = this.teamlist.length - 1; i >= 0; i--) {
			item = this.teamlist[i];
			if(item.teamId===id){
				return true;
			}
		};
		return false;
	};

	/**
	* 获取群列表
	*/
	Cache.prototype.getTeamlist = function() {
	    return this.teamlist;
	};

	/**
	* 获取群对象
	*/
	Cache.prototype.getTeamMap = function() {
	    return this.teamMap;
	};
	Cache.prototype.addTeamMap = function(data) {
	    for (var i = data.length - 1; i >= 0; i--) {
			item = data[i];
			this.teamMap[item.teamId] = item;
		};
	};
	/**
	* 根据群id获取群对象
	*/
	Cache.prototype.getTeamById = function(teamId) {
	   	if(this.hasTeam(teamId)){
			return this.teamMap[teamId];
		}
	    return null;
	};
	Cache.prototype.getTeamMapById = function(teamId) {
		return this.teamMap[teamId]||null;
	};

	/**
	* 根据群id删除群
	*/
	Cache.prototype.removeTeamById = function (id) {
	    for (var i in this.teamlist) {
	        if (this.teamlist[i].teamId === id) {
	            this.teamlist.splice(i, 1);
	            break;
	        }
	    }
	};
	Cache.prototype.setTeamMembers = function(account,list){
		this.teamMembers[account] = list;
	}
	Cache.prototype.getTeamMembers = function(account){
		return this.teamMembers[account]||[];
	}

	return Cache;
})();

