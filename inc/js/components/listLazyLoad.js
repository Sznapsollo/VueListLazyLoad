const ListLazyLoad = { 
		template: `
			<div id="testContainer" style="position: fixed; top: 50%; left: 50%; margin: auto auto; height: 500px; width: 500px; margin-left: -250px; margin-top: -250px; overflow: auto">
				<div v-for="item in items">
					{{'Item No: ' + item.index + ', random name of Item:' + item.name}}
				</div>
				<div><i v-if="requestInProgress" class="fa fa-cog fa-2x fa-spin"></i></div>
			</div>`,
		data: function() {
			return {
				chunkSize: 100,
				requestInProgress: false,
				items: []
			}
		},
		methods: {
			loadItems: function(startRow, endRow) {
				this.requestInProgress = true;
				this.$http.post("./dummydatagenerator.php", {
					startRow: startRow,
					endRow: endRow
				}).then(response => {
					this.items = this.items.concat(response.body.items);
					this.requestInProgress = false;
				}, 
				response => {
					this.requestInProgress = false;
					console.log(response);
				});
			},
			scroll: function() {
				var obj = this;
				$("#testContainer").scroll(function () {
					var scrollHeight = this.scrollHeight;
					var scrollPosition = this.clientHeight + this.scrollTop;
					if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
						obj.loadItems(obj.items.length, obj.items.length + obj.chunkSize);
					}
				});
			},
		},
		created: function() {
			this.loadItems();
		},
		mounted: function() {
			this.scroll();
		}
	}
