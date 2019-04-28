$(function() {
	function Paging(element, options) {
		this.element = element;
		this.options = {
			pageNo: options.pageNo || 1,
			totalPage: options.totalPage,
			totalSize: options.totalSize,
			pagesize: options.pagesize,
			callback: options.callback
		};
		this.init()
	}
	Paging.prototype = {
		constructor: Paging,
		init: function() {
			this.creatHtml();
			this.bindEvent()
		},
		creatHtml: function() {
			let me = this;
			let content = "";
			let current =Number(me.options.pageNo);
			let total = me.options.totalPage;
			let totalNum = me.options.totalSize;
			let totalSize = me.options.pagesize;

			content += `<span class='totalSize'> 共有<span>${totalNum}</span>条数据</span>`;
			if (current == 1) {
				content += `<span class='prev_page dis' disabled='disabled' id='prev_page'>上一页</span>`;
			} else {
				content += `<span class='prev_page' id='prev_page'>上一页</span>`;
			}
			content += `&nbsp;&nbsp;第${current}页 / 共 <span class='all_page' id='all_page'>${total}页&nbsp;&nbsp;</span>`;
			if (current == total) {
				content += `<span class='next_page dis' id='next_page'>下一页</span>`;
			} else {
				content += `<span class='next_page' disabled='disabled' id='next_page'>下一页</span>`;
			}
			me.element.html(content)
		},
		bindEvent: function() {
			let me = this;
			let total = me.options.totalPage;
			me.element.on('click', 'span', function() {
				let id = $(this).attr("id");
				if (id == "prev_page") {
					if (me.options.pageNo <= 1) {
						me.options.pageNo = 1;
					} else {
						me.options.pageNo -= 1;
						me.creatHtml();
						if (me.options.callback) {
							me.options.callback(me.options.pageNo)
						}
					}
				} else if (id == "next_page") {
					if (me.options.pageNo >= me.options.totalPage) {
						me.options.pageNo = me.options.totalPage
					} else {
						me.options.pageNo += 1;
						me.creatHtml();
						if (me.options.callback) {
							me.options.callback(me.options.pageNo)
						}
					}
				} 

				
			});
		}
	};
	$.fn.paging = function(options) {
		return new Paging($(this), options)
	}
})