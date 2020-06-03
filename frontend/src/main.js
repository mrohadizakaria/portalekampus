import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import moment from 'moment';
import api from './plugins/api';

Vue.use(api);

Vue.config.productionTip = false

//filter output
Vue.filter('formatTanggal', function(value,format='DD/MM/YYYY hh:mm') 
{
	var tanggal = moment(String(value)).format(format);    
    return tanggal;
});
Vue.filter('formatTA', function(value) 
{
	value = parseInt(value);
	return value+'/'+(value+1);
});
Vue.filter('formatUang', function(value) 
{
	var num = new Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.');
	var pos = num.lastIndexOf('.');
	num = num.substring(0,pos) + ',' + num.substring(pos+1)	
	return num;
});

//mixin
Vue.mixin({
	methods:{
		getCurrentDate ()
		{
			return moment().format('YYYY-MM-DD HH:mm:ss');
		}
	}
})
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
