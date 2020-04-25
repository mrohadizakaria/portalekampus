import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import Identitas from './modules/identitas'
import Auth from './modules/auth'

const vuexStorage = new VuexPersistence({
    storage: localStorage, 
})
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
		identitas:Identitas,
		auth:Auth,
	},
	plugins: [vuexStorage.plugin]
})
