const ListLazyLoad = { 
		template: `
		<div>
			<div style="display: block; padding: 15px; text-align: center">
				<strong>Vue lazy load list example</strong>
				<span style="paddingt-left: 10px">Total Rows: {{totalRows}}</span>
			</div>
			<div>
				<div id="testContainer" v-bind:style="{ height: containerHeight + 'px' }" style="overflow: auto; width: 80%; margin: auto">
					<div v-for="item in items" v-bind:style="{ height: rowHeight + 'px' }" style="overflow: hidden; padding: 5px; border-bottom: 1px dashed #cccccc">
						{{'Item No: ' + (item._id ? item._id : '') + ', random name of Item:' + (item._schemaName ? item._schemaName : '')}}
					</div>	
				</div>
			</div>
		</div>`,
		data: function() {
			return {
				chunkSize: 100,
				totalRows: 0,
				serviceAddress: './dummydatagenerator.php',
				callInProgressData: null,
				isScrolling: false,
				containerHeight: 500,
				rowHeight: 50,
				items: [],
				itemsDisplayed: {from: 0, to: 0}
			}
		},
		methods: {
			checkItemsDisplayed: function() {
				var container = $("#testContainer");
				var scrollTop = 0;
				var clientHeight = this.containerHeight;
				if(container && container.length) {
					var displayWindow = container[0];
					scrollTop = displayWindow.scrollTop;
					clientHeight = displayWindow.clientHeight;
				}

				this.itemsDisplayed.from  = Math.floor(scrollTop/this.rowHeight);
				this.itemsDisplayed.to  = this.itemsDisplayed.from + Math.floor(clientHeight/this.rowHeight);
				//console.log('Showing records from  ' + this.itemsDisplayed.from  + ' to ' + this.itemsDisplayed.to);
			},
			loadItems: function(startRow, endRow) {
				if(this.callInProgressData && this.callInProgressData.startRow == startRow && this.callInProgressData.endRow == endRow)
					return;
				else
					this.callInProgressData = {startRow: startRow, endRow: endRow};

				if(!startRow && !endRow) {
					this.checkItemsDisplayed();
					startRow = this.itemsDisplayed.from;
					endRow = this.itemsDisplayed.to;
				}

				if(this.totalRows && endRow >= this.totalRows)
					endRow = this.totalRows -1;

				this.$http.post(this.serviceAddress, {
					startRow: startRow,
					endRow: endRow
				}).then(response => {

					var responseItems = response.data.response.data;
					this.totalRows = response.data.response.totalRows;
					
					if(!responseItems || !responseItems.length || !this.totalRows) {
						this.callInProgressData = null;
						return;
					}

					//console.log(responseItems);
					// initial generate of local data - fake empty rows
					if(this.items.length == 0 && this.totalRows > 0) {
						for (var i = 0; i < this.totalRows; i++) {
							this.items.push({_id: null, _schemaName: null});
						}
					}
					
					var responseInd = 0;
					for(var itemDisplayedInd = startRow; itemDisplayedInd <= endRow && responseInd < responseItems.length; itemDisplayedInd++) {

						if(this.items[itemDisplayedInd]._id != null) {
							// already there, fake items have _id null
							continue;
						}

						for(var itemProperty in responseItems[responseInd]) {
							this.items[itemDisplayedInd][itemProperty]=responseItems[responseInd][itemProperty];
						}
						//this.$set(this.items[itemDisplayedInd], '_id', 2)
						
						responseInd++;
					}

					this.callInProgressData = null;
				}, 
				response => {
					console.log(response);
					this.callInProgressData = null;
				});
			},
			scroll: function() {
				var obj = this;
				$("#testContainer").scroll(function () {
					var scrollObj = this;
					var scrollHeight = scrollObj.scrollHeight;
					var scrollPosition = scrollObj.clientHeight + scrollObj.scrollTop;

					window.clearTimeout(obj.isScrolling);

					obj.isScrolling = setTimeout(function() {
						obj.checkItemsDisplayed();
						obj.loadItems.call(obj, obj.itemsDisplayed.from, obj.itemsDisplayed.to + 1);
					}, 100);
				});
			},
			whichItemsAreVisible: function() {
				for(var itemInd = 0;  itemInd < this.items.length; itemInd++) {
					console.log(this.items[itemInd]);
				}
			}
		},
		created: function() {
			this.loadItems();
		},
		mounted: function() {
			this.scroll();
		}
	}
