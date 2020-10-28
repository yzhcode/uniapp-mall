/*
 * @Author: yzh
 * @Date: 2020-08-25 14:27:13
 * @Description: 网站设置信息
 */
import {
	mutationsCallback,
	mutationParseParams,
	mutationSaveObj,
	actionFunTemplate,
	actionWithCallbackFunTemplate
} from '@/store/storeHelp.js';

const state = {
    
}

const getter = {
    getSetting(state, key) {
        return state[key];
    }
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({ commit, state }, config) {
        commit('CHANGE_SETTING', config)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}