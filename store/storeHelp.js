

export const mutationsReturn = {}; // mutation执行结果，用于返回到action中{时间戳_随机数:{return:false, msg:obj}}
export const callbackKey = "__callback__"
export const configKey = "__config__"

export function getMutaionParams(config, key) {
	let params = {};
	params[configKey] = config;
	if (key) {
		params[callbackKey] = key
	}
	
	return params;
}

export function mutationsCallback(callback, ret, msg) {
	if (callback) {
		mutationsReturn[callback] = {ret:ret, msg:msg}
	}
}

export function mutationParseParams(params) {
	return {config:params[configKey], callback:params[callbackKey]}
}

export function mutationSaveObj(state, config) {
	for(let key in config){
	    if (state.hasOwnProperty(key)) {
	        let value = config[key];
	        if (value) {
	            state[key] = value;
	        }
	    }
	}
}

export function actionCallback(key, resolve, reject) {
	let {ret, msg} = mutationsReturn[key];
	console.info('actionCallback--> key:',key,",ret:",ret,",msg:",JSON.stringify(msg));
	// 删除临时key
	delete mutationsReturn[key]
	if (ret) {
		resolve(msg);
	} else {
		reject(msg);
	}
}

export function actionFunTemplate(commit, state, config, mutation) {
	commit(mutation, getMutaionParams(config));
}
	
export function actionWithCallbackFunTemplate(commit, state, config, keyPrefix, mutation) {
	return new Promise((resolve, reject) => {
		// 生成一个key值
		let callback = keyPrefix + (Math.random()*1000000000);
		console.info(keyPrefix+'WithCallback--> key:',callback,", config:",JSON.stringify(config));
		// 打包key和外部传来的config，一起给mutations
		commit(mutation, getMutaionParams(config, callback))
		// mutations执行完成后执行回调
		console.info(keyPrefix+'WithCallback--> finish, will callback');
		actionCallback(callback, resolve, reject);
	});
}

