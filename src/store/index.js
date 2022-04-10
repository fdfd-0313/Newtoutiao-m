import Vue from 'vue'
import Vuex from 'vuex'
import { getIem, setIem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
    state: {
        // 一个对象，储存当前登录用户信息(token等数据)
        // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
        user: getIem(TOKEN_KEY)
    },
    mutations: {
        setUser (state, data) {
            state.user = data
            // setItem(TOKEN_KEY, state.user)
            // 为了防止刷新丢失，我们需要把数据备份到本地存储
            // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
            setIem(TOKEN_KEY, state.user)
        }
    },
    actions: {},
    modules: {}
})
