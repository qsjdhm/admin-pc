
(function($,undefined){
	$.fn.multiInput = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("multiInput - No such method: " + options);
			}
		}

		return this.each(function(){
			var para = {};    // 保留参数
			var self = this;  // 保存组件对象
			var pIndex = 0;   // 保留input的最大索引
			
			var defaults = {
					width  : "100px",
					height : "60px"
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.createHtml();  // 创建组件html
				this.addEvent();  // 添加事件
			};
			
			/**
			 * 功能: 创建html
			 * 参数: 无
			 * 返回: 无
			 */
			this.createHtml = function(){
				var html = '';
				html += '<div class="input-option">';
				html += '	<input type="text" key="mInput0" value="" />';
				html += '	<i class="add fa fa-plus fa-lg"></i>';
				html += '	<i class="del fa fa-remove fa-lg"></i>';
				html += '</div>';
				pIndex = 1;
				
				$(self).empty().append(html);
			};
			
			
			/**
			 * 功能: 添加事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addEvent = function(){
				$(self).find(".add").die("click").live("click", function(e){
					self.addOption(e, this);
				});
				
				$(self).find(".del").die("click").live("click", function(e){
					self.delOption(e, this);
				});
				
				// 绑定数据更改事件
				$(self).find(".input-option input").live("input propertychange", function(){
			    	// 触发数据变化事件
					$(self).trigger("dataChange");
			    });
				
				// 触发数据变化事件
				//$(self).trigger("dataChange");
			};
			
			/**
			 * 功能: 添加一条
			 * 参数: e 点击的事件源
			 * 返回: 无
			 */
			this.addOption = function(e, eThis){
				var html = '';
				html += '<div class="input-option">';
				html += '	<input type="text" key="mInput'+pIndex+'" value="" />';
				html += '	<i class="add fa fa-plus fa-lg"></i>';
				html += '	<i class="del fa fa-remove fa-lg"></i>'; 
				html += '</div>';
				pIndex ++;
				
				$(self).append(html);
				
				// 触发数据变化事件
				$(self).trigger("dataChange");
			};
			
			/**
			 * 功能: 删除一条
			 * 参数: e 点击的事件源
			 * 返回: 无
			 */
			this.delOption = function(e, eThis){
				// 判断是不是只剩下最后一条   
				if($(self).find(".input-option").length == 1){
					$(eThis).prevAll("input").val("");
					$(eThis).prevAll("input").focus();
				}else{
					$(eThis).parent(".input-option").remove();
				}
				
				// 触发数据变化事件
				$(self).trigger("dataChange");
			};
			
			/**
			 * 功能: 返回选中的数据
			 * 参数: 无
			 * 返回: 选中的数据
			 * 示例: $(".multi-input").multiInput("callbackData");
			 */
			this.callbackData = function(){
				var selectData = [];
				var lis = $(self).find(".input-option input[type='text']");
				$.each(lis, function(k,v){
					selectData.push({"id":$(v).attr("key"), "name":$(v).val()});
				});
				return selectData;
			};
			
			
			// 初始化上传控制层插件
			this.init(self);
		});
	};
})(jQuery);

