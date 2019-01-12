Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'hash',
	base: '',
	routes: [
		{ path: '/', name: 'listLazyLoad', component: ListLazyLoad }
	]
})

var vm = new Vue({
	router,
	data: {
		
	},
	methods: {
		
	},
	created: function() {
		
	}, 
	mounted: function() {
		
	}
}).$mount('#app')
