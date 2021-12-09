(function(window, undefined) {
	var rquickExpr = /^#([\w-]*)$/;
	var jQuery = function(selector) {
		return new jQuery.fn.init(selector);
	};
	jQuery.fn = jQuery.prototype = {
		constructor:jQuery,
		length: 0,
		size: function() {
			return this.length;
		},
		init:function(selector) {
			if (typeof selector === "string") {
				match = rquickExpr.exec(selector);
				if(match&&match[1]){
					elem = document.getElementById(match[1]);
					if (elem && elem.parentNode) {
						if (elem.id !== match[1]) {
							jQuery.error("语法错误，元素id和参数不一致!")
						}
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}else{
					jQuery.error(selector+"语法错误，暂时支持id的获取!")
				}

			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			} else {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			}
		}
	};
	jQuery.fn.init.prototype = jQuery.fn;
	jQuery.extend = jQuery.fn.extend = function() {
		var target = this;
		var length = arguments.length;
		var i = 0;
		if (length > 1) {
			target = arguments[0] || {};
			i = 1;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue;
					}
					target[name] = copy;
				}
			}
		}
		return target;
	};
	var rclass = /[\t\r\n]/g;
	jQuery.fn.extend({
		html:function(value) {
			var elem = this[0];
			if(!elem){
				return;
			}
			if (value === undefined) {
				return jQuery.trim(elem.nodeType === 1 ? elem.innerHTML:"");
			} else {
				if (elem.nodeType === 1) {
					elem.innerHTML = value;
				}
			}
		},
		width:function(){
			var elem=this[0];
			if(!elem){
				return 0;
			}
			if ( jQuery.isWindow( elem ) ) {
				return parseInt(elem.document.documentElement[ "offsetWidth" ]);
			}
			return parseInt(this.css("width"));
		},
		height:function(){
			var elem=this[0];
			if(!elem){
				return 0;
			}
			if ( jQuery.isWindow( elem ) ) {
				return parseInt(elem.document.documentElement[ "offsetHeight" ]);
			}
			return parseInt(this.css("height"));
		},
		val:function() {
			var elem = this[0];
			if (elem) {
				var hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
				if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
					return ret;
				}
				ret = elem.value;

				return typeof ret === "string" ? ret.replace(/\r/g, ""):ret == null ? "":ret;
			}
			return "";
		},
		attr:function(name, value) {
			if (value == undefined) {
					if(name=="value"){
						return this.val();
					}
			}
			var elem = this[0];
			if(elem){
				return jQuery.attr(elem, name, value);
			}
		},
		removeClass:function(){
			var elem = this[0];
			if(elem){
				elem.className="";
			}
		},
		toggle:function(){
			var elem = this[0];
			if(elem){
				var cur=elem.style.display;
				if("none"==cur){
					this.show();
				}else{
					this.hide();
				}
			}
		},
		hasClass: function(selector) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
					return true;
				}
			}

			return false;
		},
		addClass:function(value){
			var elem = this[0];
			if(elem){
				elem.className=value;
			}
		},
		show:function(){
			var elem = this[0];
			if(elem){
				elem.style.display = "block";
			}
		},
		hide:function(){
			var elem = this[0];
			if(elem){
				elem.style.display = "none";
			}
		},
		fadeOut:function(){
			this.hide();
		},
		fadeIn:function(){
			this.show();
		},
		slideDown:function(time,fn){
			this.show();
			if(fn){
				fn();
			}
		},
	   slideUp:function(time,fn){
			this.hide();
			if(fn){
				fn();
			}
		},
		children: function(filter) {
			var elem=this[0];
			var r = [];
			if(elem){
				var elems= jQuery.sibling( elem.firstChild );
				if(elems.length>0){
					for(var i=0;i<elems.length;i++){
						var temp=elems[i];
						if(filter&&filter.indexOf(".")!=-1){
							if(temp&&("."+temp.className)==filter){
								r.push( jQuery(temp));
							}
						}else if(filter){
							if(elems.nodeName.toLowerCase==filter.toLowerCase){
								r.push( jQuery(temp ));
							}
						}else{
							r.push( jQuery(temp ));
						}

					}
				}
			}
			return r;
		},
		iphoneStyle:function(on,off,onShow,offShow) {
			var elem=this[0];
			var that=this;
			if(elem){
				if(on&&off){
					onShow=onShow||on;
					offShow=offShow||off;
					var id=this.attr("id")+"_iphone";
					var id_on=this.attr("id")+"_iphone_on";
					var id_off=this.attr("id")+"_iphone_off";
					var content="<DIV id='"+id+"'><table><tr><td><div id='"+id_on+"' class='iphone_on'>"+onShow+"</div></td><td><div id='"+id_off+"' class='iphone_off'>"+offShow+"</div></td></tr></table></DIV>";
					this.hide();
					this.after(content);
					if(that.attr("checked")){
						$("#"+id).removeClass("checkOff");
						$("#"+id).addClass("checkOn");
						$("#"+id).attr("val",on);
						that.attr("value",on);
						that.attr("val",on);
					}else{
						$("#"+id).removeClass("checkOn");
						$("#"+id).addClass("checkOff");
						$("#"+id).attr("val",off);
						that.attr("value",off);
						that.attr("val",off);
					}
					$("#"+id).click(function(){
						if($("#"+id).attr("val")!=on){
							$("#"+id).removeClass("checkOff");
							$("#"+id).addClass("checkOn");
							$("#"+id).attr("val",on);
							that.attr("value",on);
							that.attr("val",on);
						}else{
							$("#"+id).removeClass("checkOn");
							$("#"+id).addClass("checkOff");
							$("#"+id).attr("val",off);
							that.attr("value",off);
							that.attr("val",off);
							clearCookies();
						}
					});
				}else{
					jQuery.error("请指定on and off in iphoneStyle!")
				}

			}
		},
		after:function(content){
			var elem=this[0];
			if(elem){
				if ( elem.parentNode ) {
					var tmp=document.createElement("div");
					var rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig
					tmp.innerHTML =  content.replace( rxhtmlTag, "<$1></$2>" );
					tmp = tmp.lastChild;
					elem.parentNode.insertBefore( tmp, elem.nextSibling );
				}
			}
		},
		css:function(name, value) {
			var elem = this[0];
			if(elem){
				return jQuery.css(elem, name, value);
			}
		}

	});
	// 浏览器的支持特性
	jQuery.support = (function() {
		var div = document.createElement("div");
		div.setAttribute("className", "t");
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		a = div.getElementsByTagName("a")[0];
		if (!a) {
			a.style.cssText = "top:1px;float:left;opacity:.5";
		}

		var support = {
			getSetAttribute:div.className !== "t",
			cssFloat:!!a.style.cssFloat,
			style:/top/.test(a.getAttribute("style"))
		}
		return support;
	})();
	// 标准方法
	jQuery.extend({
		ajaxSetup:function(){
			//没有任何设置，只是防止异常
		},
		trim:function(text) {
			return text == null ? "":(text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		},
		isIE6:function(){
			return !-[1,]&&!window.XMLHttpRequest;
		},
		error:function(msg) {
			throw new Error(msg);
		},
		isWindow: function( obj ) {
			return obj != null && obj == obj.window;
		},
		sibling: function( n, elem ) {
			var r = [];
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					r.push( n );
				}
			}
			return r;
		},
		parseJSON:function(data) {
			if (window.JSON && window.JSON.parse) {
				return window.JSON.parse(data);
			}
			if (data === null) {
				return data;
			}
			if (typeof data === "string") {
				data = jQuery.trim(data);
				if (data) {
					var rvalidchars = /^[\],:{}\s]*$/, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g, rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
					if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
						return (new Function("return " + data))();
					}
				}
			}

			jQuery.error("Invalid JSON: " + data);
		},
		getAjaxHttp:function() {
			try {
				return new window.XMLHttpRequest();
			} catch (e) {
				try {
					return new window.ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					jQuery.error("getAjaxHttp  error");
				}
			}
		},
		getJSON:function(url, data, callback) {
			if (!data) {
				data = {};
			}
			var append = "";
			for (key in data) {
				append = append + "&" + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
			}
			if (append.length > 0 && url.indexOf("?") == -1) {
				append = "?" + append.substring(1);
			}
			if (append.length > 0){
				append =  append.substring(1);
			}
			jQuery.post(url,append,function(content){
					callback(jQuery.parseJSON(content));
			})
		},
		getAjaxContent:function(url, data, callback) {
			if (!data) {
				data = {};
			}
			var append = "";
			for (key in data) {
				append = append + "&" + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
			}
			if (append.length > 0 && url.indexOf("?") == -1) {
				append = "?" + append.substring(1);
			}
			if (append.length > 0){
				append =  append.substring(1);
			}
			jQuery.post(url,append,function(content){
					callback(content);
			})
		},
		get:function(url,callback) {
			var request = jQuery.getAjaxHttp();
			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					callback(request.responseText);
				}
			}
			request.open("get", url, true);
			request.send(null);
		},
		post:function(url,data,callback) {
			var request = jQuery.getAjaxHttp();
			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200) {
					callback(request.responseText);
				}
			}
			request.open("post", url, true);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
			request.send(data);
		},
		each:function(obj, callback, args) {
			var value, i = 0, length = obj.length;
			if (args) {
				for (; i < length; i++) {
					value = callback.apply(obj[i], args);
					if (value === false) {
						break;
					}
				}
			} else {
				for (; i < length; i++) {
					value = callback.call(obj[i], i, obj[i]);
					if (value === false) {
						break;
					}
				}
			}
			return obj;
		},
		cssProps:{
			"float":jQuery.support.cssFloat ? "cssFloat":"styleFloat"
		},
		camelCase:function(string) {
			return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(all, letter) {
				return letter.toUpperCase();
			});
		},
		css:function(elem, name, value) {
			if (value !== undefined) {
				if (typeof name === "string") {
					var type = typeof value;
					if ( type === "number") {
						value += "px";
					}
					var name = jQuery.camelCase(name);
					elem.style[name]=value;
				}
			} else {
				if (typeof name === "string") {
						var name = jQuery.camelCase(name);
						var val;
						name = jQuery.cssProps[name] || name
						var hooks = jQuery.cssHooks[name] || jQuery.cssHooks[name];
						if (hooks && "get" in hooks) {
							val = hooks.get(elem);
						}
						if(window.getComputedStyle){
							var computed=window.getComputedStyle( elem, null );
							val = computed ? computed[ name ]  || computed.getPropertyValue( name ): undefined;
						}
						if (val === undefined) {
							val = elem.style[name];
						}
						if(!val){
							val=elem.currentStyle[name]
						}
						return val;
				}else{
					for(key in name){
						var val=name[key];
						var type = typeof val;
						if ( type === "number") {
							val += "px";
						}
						elem.style[ jQuery.camelCase(key)]=val;
					}
					return;
				}
			}

		},
		attr:function(elem, name, value) {
			var ret, hooks, nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) {
				return;
			}
			name = name.toLowerCase();
			try{
				hooks = jQuery.valHooks[elem.type] ||jQuery.attrHooks[name] || jQuery.cssHooks[name]  ;
			}catch(e){
				return;
			}
			if (value !== undefined) {
				if (value === null) {
					elem.removeAttribute(name);
				} else if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
					return ret;
				} else {
					elem.setAttribute(name, value + "");
					return value;
				}
			} else if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
				return ret;
			} else {
				if (typeof elem.getAttribute !== "undefined") {
					ret = elem.getAttribute(name);
				}
				if(ret){
					return ret;
				}else{
					return "";
				}
			}
		},
		inArray:function(elem, arr, i) {
			var len;
			if (arr) {
				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i):i:0;
				for (; i < len; i++) {
					if (i in arr && arr[i] === elem) {
						return i;
					}
				}
			}
			return -1;
		},
		attrHooks:{

		},
		cssHooks:{

		},
		valHooks:{
			option:{
				get:function(elem) {
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value:elem.text;
				}
			},
			input:{
				get:function(elem) {
					return elem.value;
				},
				set:function(elem, value) {
					return elem.value = value;
				}
			},
			select:{
				get:function(elem) {
					var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one" || index < 0, values = one ? null:[], max = one ? index + 1:options.length, i = index < 0 ? max:one ? index:0;
					for (; i < max; i++) {
						option = options[i];
						if (option.selected || i === index) {
							value = jQuery(option).val();
							if (one) {
								return value;
							}
							values.push(value);
						}
					}
					return values;
				},
				set:function(elem, values) {
					if (!values.length) {
						values = [ values ];
					}
					var value, option, options = elem.options;
					var max = options.length;
					for (i = 0; i < max; i++) {
						value = jQuery(option[i]).val();
						this.selected = jQuery.inArray(value, values) >= 0;
					}
					return values;
				}
			}
		}
	});
	// 修补一些浏览器的bug
	if (!jQuery.support.getSetAttribute) {
		jQuery.each([ "width", "height" ], function(i, name) {
			jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
				set:function(elem, value) {
					if (value === "") {
						elem.setAttribute(name, "auto");
						return value;
					}
				}
			})
		});
	}
	if (!jQuery.support.style) {
		jQuery.attrHooks.style = {
			get:function(elem) {
				return elem.style.cssText || undefined;
			},
			set:function(elem, value) {
				return (elem.style.cssText = value + "");
			}
		};
	}
	;
	jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup error contextmenu").split(" "), function(i, name) {
		jQuery.fn[name] = function() {
			var elem = this[0];
			if(elem){
				if(arguments.length>0){
					var eventHandle=arguments[0];
					if (elem.addEventListener) {
						elem.addEventListener(name, eventHandle, false);
					} else if (elem.attachEvent) {
						elem.attachEvent("on" + name, eventHandle);
					}
				}else{
					try{
						var meth=elem[name];
						meth.call(elem);
					}catch(e){
					  if(name=="click"){
					  	if(document.all){
			            elem.click();
			        }else{
			            var evt = document.createEvent("MouseEvents");
			            evt.initEvent("click", true, true);
			            elem.dispatchEvent(evt);
			        }
					  }
					}
				}
			}

		};
	});
	jQuery.each([ "height", "width" ], function(i, name) {
		jQuery.cssHooks[name] = {
			get:function(elem) {
				var val = name === "width" ? elem.offsetWidth:elem.offsetHeight;
				if (val <= 0 || val == null) {
					val = elem.style[name];
					val = parseFloat(val) || 0;
				}
				return val + "px";
			}
		};
	});
	window.jQuery = window.$ = jQuery;
})(window);


/*var search = window.location.search;
var parameters = search.replace("?", "").split("&");
var pos, paraName, paraValue;
if (parameters && parameters != "") {
    for (var i = 0; i < parameters.length; i++) {
        pos = parameters[i].indexOf("=");
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);
        eval("var " + paraName + "='" + paraValue + "'")
    }
}*/

function doauthen() {
        $("#serviceShowHide").hide();
        $("#isUsernameErrorImg").hide();
        $("#isPwdErrorImg").hide();
        $("#isServiceErrorImg").hide();
        $("#isValidCodeErrorImg").hide();
        $("#serviceShowHideTop").css("background-position", "-373px 0px");
        $("#username_hk_posi").css("background-position", "-373px 0px");
        $("#pwd_hk_posi").css("background-position", "-373px 0px");
        $("#left_hk_regist_validcode").css("background-position", "-373px 0px");
    disableLoginButton();
    if (checkForm() == true) {
        // 改为使用接口认证
        var queryString = encodeURIComponent(encodeURIComponent(getQueryString()));
	 //勾选系统配置--服务配置--域名就将用户名拼接成用户名@服务名
        var username=document.getElementById("username").value;
        var domainName="";
      /*  if(document.getElementById("isNoDomainName")){
        	domainName=document.getElementById("isNoDomainName").value;
        	if(domainName=='true'){
          		var temp=document.getElementById("net_access_type");
          		if(temp){
          			username=username+"@"+temp.value;
          		}
          }
        }*/


        var tj=document.getElementById("Tj_yes");
        if (tj.style.display == "block" || tj.style.display == "") {
        	username=prefixValue+username;
        }
        var userId = encodeURIComponent(encodeURIComponent(username));
      //针对记住密码加密修改
    		var password = document.getElementById("pwd").value;
    		//对是否开启密码加密进行判断
        var  encrypt =  document.getElementById("passwordEncrypt").value;
        var macString = getQueryStringByName("mac");
        if(isNull(macString)){
        	macString="111111111";
        }
        if("true"==encrypt){
		    			if(password.length<150){
		    				var passwordMac = password+">"+macString;
		    				password = encryptedPassword(passwordMac);
		    			}
          }else{
	          	if(password.length>150){
	          		 encrypt = "true";
	          	}
          }
        encrypt = encodeURIComponent(encodeURIComponent(encrypt));
        var password = encodeURIComponent(encodeURIComponent(password));
        var service = "";
        if(document.getElementById("net_access_type")){
        		service = encodeURIComponent(encodeURIComponent(document.getElementById("net_access_type").value));
        }
        var operatorPwd="";
        var operatorUserId="";
        if(document.getElementById('isNoOperatorPasswordFrameId')){
          //运营商密码框是否显示
          var isOperatorhide=document.getElementById('isNoOperatorPasswordFrameId').style.display;
          //显示运营商密码框则提交数据---校验
          if(isOperatorhide!="none"){
          	operatorPwd = document.getElementById("operatorPwd").value;
          	if("true"==encrypt && !isNull(operatorPwd)){
          		operatorPwd =  encryptedPassword(operatorPwd);
          		operatorPwd=encodeURIComponent(encodeURIComponent(operatorPwd));
          	}else{
          		operatorPwd=encodeURIComponent(encodeURIComponent(document.getElementById("operatorPwd").value));
          	}
          }
        }

        if(document.getElementById('isNoOperatorUserIdFrameId')){
          //运营商用户名框是否显示
          var isOperatorUserIdhide=document.getElementById('isNoOperatorUserIdFrameId').style.display;
          //显示运营商用户名框框则提交数据---校验
          if(isOperatorUserIdhide!="none"){
          	operatorUserId=encodeURIComponent(encodeURIComponent(document.getElementById("operatorUserId").value));
          }
        }

        var code="";
        var isDisplayValidCode=document.getElementById('isDisplayValidCode').style.display;
        if(isDisplayValidCode!="none"){
        	code=document.getElementById("validCode").value;
        	if(code==""){
        		showerror("验证码不能为空.",5);
        		return false;
        	}
        }
        AuthInterFace.init("./");
        AuthInterFace.login(userId,password,service,queryString,operatorPwd,operatorUserId,code,encrypt,function(authResult){
        	 if(authResult.result=="success"){
           	if(authResult.message&&authResult.message!=""){
           		alert(authResult.message);
           	}
                   var c = document.getElementById("disPlayIs_check_no");
                   var a = document.getElementById("disPlayClearSave_yes");
                   var d = document.getElementById("disPlayClearTj_yes");
                   var b = document.getElementById("disPlayIs_tj_no");
                   var macStringTemp = getQueryStringByName("mac");
                   if(isNull(macStringTemp)){
                  	 macStringTemp="111111111";
                   }
                   if (a.style.display == "block" || a.style.display == "") {
                       if (document.getElementById("username")) {
                           setCookies("EPORTAL_COOKIE_USERNAME", document.getElementById("username").value)
                       }
                       setCookies("EPORTAL_COOKIE_NEWV","true");
                       if (document.getElementById("pwd")) {
			                         //对密码进行rsa加密保存
			                      	 var password = document.getElementById("pwd").value;
															 if(password.length<150){
																 		var passwordMacTemp = password+">"+macStringTemp;
																     var passwordEncrypt = encryptedPassword(passwordMacTemp);
									                    setCookies("EPORTAL_COOKIE_PASSWORD", passwordEncrypt)
															 }else{
																       setCookies("EPORTAL_COOKIE_PASSWORD", password);
															 }
                       }
                       if (document.getElementById("net_access_type")) {
                           setCookies("EPORTAL_COOKIE_SERVER", document.getElementById("net_access_type").value);
                           setCookies("EPORTAL_COOKIE_SERVER_NAME", document.getElementById("selectDisname").innerHTML)
                       }
                       if(document.getElementById("operatorPwd")){
                     		setCookies("EPORTAL_COOKIE_OPERATORPWD", document.getElementById("operatorPwd").value);
                     	}
                   } else {
                       if (c.style.display == "block" || c.style.display == "") {
                           setCookies("EPORTAL_COOKIE_USERNAME", "");
                           setCookies("EPORTAL_COOKIE_PASSWORD", "");
                           setCookies("EPORTAL_COOKIE_SERVER", "");
                           setCookies("EPORTAL_COOKIE_SERVER_NAME", "")
                           setCookies("EPORTAL_COOKIE_OPERATORPWD","");
                           setCookies("EPORTAL_COOKIE_NEWV","");
                       }
                   }
                   if (d.style.display == "block" || d.style.display == "") {
                       setCookies("EPORTAL_AUTO_LAND", "true")
                   } else {
                       setCookies("EPORTAL_AUTO_LAND", "")
                   }

               if(successPage&&successPage!=''&&successPage=="true"){

                 var newWin;
                 var _width=document.body.clientWidth-300;
                 var _height=document.body.clientHeight-150;
                 newWin =  window.open ('success.jsp?page=min', '认证成功页面', 'height=100,width=250,top="'+_height+'",left="'+_width+'",toolbar=no,menubar=no, scrollbars=no, resizable=no,location=no, status=no'); //这句要写
              	 newWin.location.href = "success.jsp?userIndex="+authResult.userIndex+"&keepaliveInterval="+authResult.keepaliveInterval+"&page=min";
                  AuthInterFace.getOnlineUserInfo(authResult.userIndex,function(onlineUserInfo){
                  		 var userUrl = onlineUserInfo.userUrl;
                       if (userUrl && userUrl != "") {
                      	    window.location.href=userUrl;
                       }
                  });
               }else{
              	  window.location="success.jsp?userIndex="+authResult.userIndex+"&keepaliveInterval="+authResult.keepaliveInterval;
               }
        	 }else{
        		   //认证失败，清除cookie中的服务选项
        			setCookies("EPORTAL_COOKIE_SERVER", "");
            	setCookies("EPORTAL_COOKIE_SERVER_NAME", "");
        		 		var url=authResult.validCodeUrl;
	         			if(url!=null&&url!=""){
	         				$("#validImage").attr("src",url);
	         				$("#isDisplayValidCode").show();
	        				$("#isDisplayValidCodeTip").show();
	         			}
		        		var message=authResult.message;
		        		//认证失败的地方
		        		if(message.indexOf("ERR_USER_FIRSTLOGIN_NEED_CHANGE_PASSWORD")>-1){
		        			if(userId!=null&&password!=null){
		        				document.getElementById("userIdHj").value =userId;
		        				document.getElementById("passHj").value =password;
			        			document.getElementById("haiJunForm").submit();
			        			return;
		        			}
		        		}
		           	if(message.indexOf("网络协议书")>-1){
		           		errorTip=true;
		           		opensetting();
		           	}else if(shouldDisplayOperatorInfo(message)){
		           			document.getElementById("isNoOperatorPasswordFrameId").style.display="block";
			  		   		  document.getElementById("isNoOperatorPasswordFrameId_space").style.display="block";
			  		   			document.getElementById("isNoOperatorUserIdFrameId").style.display="block";
			  		   		  document.getElementById("isNoOperatorUserIdFrameId_space").style.display="block";

			  		   		  if(document.getElementById("selectDisname").innerHTML &&
			  		   		  		document.getElementById("selectDisname").innerHTML!="" &&
			  		   		  		document.getElementById("selectDisname").innerHTML!="请选择服务"){
			  		   		  	$("#operatorUserId_tip").attr("value","请输入"+document.getElementById("selectDisname").innerHTML+"对应的账号");
			  		   		  	$("#operatorPwd_tip").attr("value","请输入"+document.getElementById("selectDisname").innerHTML+"对应的密码");
			  		   		  }


					  		   	 if(message.indexOf("<OperatorId>")){
					  		   		 operatorInfo = message.split("<OperatorId>");
					  		   		 message=operatorInfo[0];
					  		   		 if(operatorInfo.length>1){
					  		   			document.getElementById("operatorUserId").value =operatorInfo[1] ;
					  		   		  $("#operatorUserId_tip").focus();
					  		   		 }
					  		   	 }

			  		   			showerror(message);
		           	}else{
		           	 if(message.indexOf("<OperatorId>")){
			  		   		 operatorInfo = message.split("<OperatorId>");
			  		   		 message=operatorInfo[0];
		           	 }
		           		showerror(message);
		           		if(errorTip){
		           			errorTip=false;
		           			closeSubPage();
		           		}
		           		 // 显示错误信息
		           	}
           }
        });
    }
}


function shouldDisplayOperatorInfo(errorMessage){

	var errorMessages = $("#countTrId").attr("errorMessages");

	if(errorMessages==null || errorMessages=="" || errorMessages == "null") {
		return false;
	}
	var errors = errorMessages.split("<errorMessage>");
	if(errors.length>0){
		for(var i=0;i<errors.length;i++){
			if(errorMessage.match(errors[i])!=null){
				return true;
			}
		}
	}
	return false;
}

var errorTip=false;
function registerNetWorkProtocol(){
		var userId=$("#username").val();
		if(userId&&userId!=''){
			AuthInterFace.init("./");
 			AuthInterFace.registerNetWorkProtocol(userId,function(procotol){
 				if(procotol.result=='ok'){
 					doauthen();
 				}else{
 					alert("注册网络协议书失败！请重新登陆！");
 				 closeSubPage();
 				}
 			});
		}
	}
//勾选记住密码
function checkIsChooseTj() {
    jQuery("#disPlayClearTj_yes").show();
    jQuery("#disPlayIs_tj_no").hide();
    jQuery("#disPlayClearSave_yes").show();
    jQuery("#disPlayIs_check_no").hide()
    setCookies("EPORTAL_COOKIE_SAVEPASSWORD", "true");
}
//勾选自动登录
function checkClearTjChoose() {
    jQuery("#disPlayClearTj_yes").hide();
    jQuery("#disPlayIs_tj_no").show();
}

function disableLoginButton() {
    if (document.getElementById("loginLink")) {
        document.getElementById("loginLink").disabled = true
    }
}
function ableLoginButton() {
    if (document.getElementById("loginLink")) {
        document.getElementById("loginLink").disabled = false
    }
}
function escape2Unicode(a) {
    return a.replace(/&#(x)?([^&]{1,5});?/g, function (e, d, f) {
        return String.fromCharCode(parseInt(f, d ? 16 : 10));
    })
}

function checkForm() {
    var a = $("#username").attr("value");
    if (a == "" || a == null) {
        showerror("&#35831;&#22635;&#20889;&#29992;&#25143;&#21517;&#33;",1);
        return false
    }
    var a_new = a.replace(/^\s+|\s+$/g,'');
    if (a_new == null || (a_new != null && a_new.length != a.length)){
		showerror('用户名首尾不能包含空格!',1);
		return false;
    }
    if ($("#pwd").attr("value") == "") {
        showerror("&#35831;&#22635;&#20889;&#23494;&#30721;&#33;", 2);
        return false
    }


    if(document.getElementById('isNoOperatorUserIdFrameId')){
      //运营商密码框是否显示
      var isOperatorhide=document.getElementById('isNoOperatorUserIdFrameId').style.display;
      //显示运营商密码框则提交数据---校验
      if(isOperatorhide!="none"){
      	var operatorUserId=$("#operatorUserId").attr("value");
  	    if(operatorUserId==''){
  	    	showerror('运营商账号不能为空',7);
  	    	return false;
  	    }
  	    if(operatorUserId.indexOf('>')>-1){
  	    	showerror('运营商账号不能包含特殊符号',7);
  	    	return false;
  	    }
      }else{
      	document.getElementById("operatorUserId").value="";
      }
    }


    if(document.getElementById('isNoOperatorPasswordFrameId')){
      //运营商密码框是否显示
      var isOperatorhide=document.getElementById('isNoOperatorPasswordFrameId').style.display;
      //显示运营商密码框则提交数据---校验
      if(isOperatorhide!="none"){
      	var operatorPwd=$("#operatorPwd").attr("value");
  	    if(operatorPwd==''){
  	    	showerror('运营商密码不能为空',6);
  	    	return false;
  	    }
  	    if(operatorPwd.indexOf('>')>-1){
  	    	showerror('运营商密码不能包含特殊符号',6);
  	    	return false;
  	    }
      }else{
      	document.getElementById("operatorPwd").value="";
      	setCookies("EPORTAL_COOKIE_OPERATORPWD","");
      }
    }

    if ($("#uuidQrCode").val("value") == "") {
    	 if (document.getElementById("isDisplayServicesTip").style.display!="none"){
	    		 if ($("#net_access_type").val("value") == "" && $("#username").attr("value").indexOf("``") == -1) {
	           showerror("请选择服务",3);
	           return false
	       }
    	 }
    }
    var jsonTemp="";
	  try{
	  		jsonTemp=decodeURIComponent(getCookie("servicesJsonStr"));
	  }catch(e2){
	  	//alert(e2);
	  }
  	if(jsonTemp&&jsonTemp!=null&&jsonTemp!=""&&jsonTemp!="null"&&jsonTemp.length>0){
  		 var tempBchs=jsonTemp.split("@%%username@%%");
  		 var name=document.getElementById("username").value;
  		 if(tempBchs.length>1&&tempBchs[0]!=name){
  			 setCookies("servicesJsonStr",encodeURIComponent(name+"@%%username@%%"+tempBchs[1]));
  		 }
  	}
    return true
}
function showerror(c, a) {
    		ableLoginButton();
        showAuthFailMessage_hk(c, a);
        try {
            freshImage()
        } catch (b) {
        }
    }
function freshImage() {
	jQuery("#validImage").attr("src", "./validcode?rnd=?" + Math.random());
}
function imgLoadFail(b) {
    var a = $("#" + b);
    if (a) {
        a.attr("src", a.attr("val"))
    }
}
function showAuthFailMessage_hk(b, a) {
    $("#errorInfo_hk").show();
    $("#errorInfo_tupian").show();
    jQuery("#errorInfo_center").html("<span id='error_span_content'>" + b + "</span>");
    jQuery("#errorInfo_center").attr("val", b);
    switch(a){
	    case 1:
	    	$("#username_tip").focus();
	      $("#isUsernameErrorImg").show();
	      $("#username_hk_posi").css("background-position", "-373px -64px");
	      break;
	    case 2:
	    	$("#pwd_tip").focus();
	      $("#isPwdErrorImg").show();
	      $("#pwd_hk_posi").css("background-position", "-373px -64px");
	      break;
	    case 3:
	    	 $("#isServiceErrorImg").show();
	       $("#serviceShowHideTop").css("background-position", "-373px -64px");
	       break;
	    case 4:
	    	 break;
	    case 5:
	    	 $("#isValidCodeErrorImg").show();
	        break;
	    case 6:
	    	$("#isOperatorPwdErrorImg").show();
	    	$("#operatorPwd_hk_posi").css("background-position", "-373px -64px");
	    	break;
	    case 7:
	    	$("#isOperatorUserIdErrorImg").show();
	    	$("#operatorUserId_hk_posi").css("background-position", "-373px -64px");
	    	break;
    }
}

function setCookies(a, b) {
    var c = new Date();
    c.setTime(c.getTime() + 1000 * 24 * 3600 * 1000);
    document.cookie = a + "=" + encodeURIComponent(b) + "; expires=" + c.toGMTString() + "; path=/eportal/"
}

function getCookie(b) {
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    if (a != null) {
        return decodeURIComponent(a[2])
    }
    return null;
}

function delCookie(a) {
    var b = new Date();
    b.setTime(b.getTime() - 1);
    document.cookie = a + "=;expires=" + b.toGMTString() + "; path=/eportal/"
}

function getQueryString(){
	var  queryString = document.location.search;
	if(queryString!=null&&queryString!=""){
		return queryString.substring(1);
	}else{
		return "";
	}
}

function getQueryStringByName(name) {
  var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
  if (result == null || result.length < 1) {
      return "";
  }
  return result[1];
}

function initInputFromCookies_hk() {

	var isnew = getCookie("EPORTAL_COOKIE_NEWV");
	if(isnew != null && isnew != "" ){
		var b = getCookie("EPORTAL_COOKIE_USERNAME");
    if (b != null && b != "" && document.getElementById("username")) {
        document.getElementById("username").value = decodeURIComponent(b);
        document.getElementById("username_tip").focus();
    }
    var b = getCookie("EPORTAL_COOKIE_PASSWORD");
    var flagService = false;
    if (b != null && b != "" && document.getElementById("pwd")) {
        document.getElementById("pwd").value = b;
        document.getElementById("pwd_tip").focus();
        if (document.getElementById("net_access_type")) {
            var c = getCookie("EPORTAL_COOKIE_SERVER");
            var a = getCookie("EPORTAL_COOKIE_SERVER_NAME");
            if (c == null || c == ""||((null==services||"[]"==services||""==services)&&typeflag!="true")) {
                a = $defaultService;
                c = $defaultValue;
              	setCookies("EPORTAL_COOKIE_SERVER", "");
              	setCookies("EPORTAL_COOKIE_SERVER_NAME", "");
              	flagService = true;
            }else{
            	//portal服务不为空
	            	if((null!=services||"[]"!=services||""!=services)&&"true"!=typeflag){
			            		//检测cookie中保存的服务是否正确
			            		for(var i=0;i<services.length;i++){
			            			var name =services[i].serviceName;
			            			if(null!=name && c==name){
			            				a=services[i].serviceShowName;
			            				flagService = true;
			            				break;
			            			}
			            		}
	            	}
	            	//portal上开启根据用户名获取服务
	            	if(typeflag=="true"&& null!=c &&  ""!=c){
	            		  flagService = true;
	            	}
            }
            if(true==flagService){
	            	document.getElementById("net_access_type").value = c;
	            	$("#selectDisname").html(a);
            }
        }
        jQuery("#disPlayClearSave_yes").show();
        jQuery("#disPlayIs_check_no").hide()
    }
	}else{
		setCookies("EPORTAL_COOKIE_PASSWORD","");
		setCookies("EPORTAL_COOKIE_USERNAME","");

	}

    var coolieoperatorpwd = getCookie("EPORTAL_COOKIE_OPERATORPWD");
    if(coolieoperatorpwd!=null&&coolieoperatorpwd!=''&&document.getElementById("isNoOperatorPasswordFrameId")&&document.getElementById("isNoOperatorPasswordFrameId").style.display!="none")
		{

    	if(document.getElementById("selectDisname").innerHTML &&
 		  		document.getElementById("selectDisname").innerHTML!="" &&
 		  		document.getElementById("selectDisname").innerHTML!="请选择服务"){
    		  $("#operatorPwd_tip").attr("value","请输入"+document.getElementById("selectDisname").innerHTML+"对应的密码");
    	}

				$("#isNoOperatorPasswordFrameId_space").show();
				$("#isNoOperatorPasswordFrameId").show();
				document.getElementById("operatorPwd").value=coolieoperatorpwd;
		}
    var cookiedomian=getCookie("EPORTAL_COOKIE_DOMAIN");
    if(document.getElementById("isNoDomainName")){
			if(cookiedomian!=null&&cookiedomian!=''){
				document.getElementById("isNoDomainName").value=cookiedomian;
			}
		}
    var d = getCookie("EPORTAL_AUTO_LAND");
    if (d == "true") {
        $("#disPlayClearTj_yes").show();
        $("#disPlayIs_tj_no").hide();
    } else {
        $("#disPlayClearTj_yes").hide();
        $("#disPlayIs_tj_no").show();
    }
    $("#username_tip").focus();
    $("#username").focus();
}
function clickMenu() {
   $("#username").blur(function () {
        $("#username_hk_posi").css("background-position", "-373px 0px");
    });
    $("#pwd").blur(function () {
        $("#pwd_hk_posi").css("background-position", "-373px 0px");
    });
    $("#loginLink").blur(function () {
        $("#loginLink_div").css("background-position", "-373px -105px");
    })
}
function jqueryBind() {
     	$("#username_tip").focus(function () {
				  //  $("#username").attr("value", "");
				    $("#username").show();
				    $("#username").focus();
				    $("#username_tip").hide();
				    $("#serviceShowHide").hide();
				    $("#deleteUserNameDiv").show();
		});
		$("#username_tip").keypress(function () {
				  //  $("#username").attr("value", "");
				    $("#username").show();
				    $("#username").focus();
				    $("#username_tip").hide();
				    $("#deleteUserNameDiv").show();
		});
		$("#username").blur(function () {
				    if ($("#username").attr("value") == "") {
				        $("#username").hide();
				        $("#username_tip").show()
				        $("#deleteUserNameDiv").hide();
				    }
		});
		$("#pwd_tip").focus(function () {
	       //  $("#pwd").attr("value", "");
	         $("#pwd").show();
	         $("#pwd").focus();
	         $("#pwd_tip").hide();
	         $("#serviceShowHide").hide()
	          $("#deleteDiv").show();

	     });
	     $("#pwd_tip").keypress(function () {
	       //  $("#pwd").attr("value", "");
	         $("#pwd").show();
	         $("#pwd").focus();
	         $("#pwd_tip").hide()
	         $("#deleteDiv").show();
	     });
	     $("#pwd").blur(function () {
	         if ($("#pwd").attr("value") == "") {
	             $("#pwd").hide();
	             $("#pwd_tip").show()
	             $("#deleteDiv").hide();
	         }
	     });
        initInputFromCookies_hk();
        clickMenu()
        $(document).keyup(function (e) {
	        if (e.keyCode == 13) {
	                    enterProcess()
	        }
        });
        loginFrameProcess();
        if (navigator.userAgent.indexOf("Firefox") >= 0) {
            if (document.getElementById("errorInfo_center").textContent != "") {
                document.getElementById("errorInfo_hk").style.display = "block"
            }
        } else {
            if (document.getElementById("errorInfo_center").innerText != "") {
                document.getElementById("errorInfo_hk").style.display = "block"
            }
        }
    try {
        autoLan();
        $("#username_tip").focus();
    } catch (f) {
    }

}
var services = [];
function loginFrameProcess() {
    var q = 35;
    var j = 33;
    var r = 180;
    var u = 50;
    var f = 42;
    var c = 1;
    var v = 5;
    var t = navigator.userAgent.toLowerCase();
        if ($("#username").attr("value") != "") {
            $("#username").show();
            $("#username_tip").hide();
           /* $("#username").focus();*/
        }
        if ($("#pwd").attr("value") == "") {
            $("#pwd").hide();
            $("#pwd_tip").show()
        }
        if($("#operatorPwd").attr("value")==""){
					$("#operatorPwd").hide();
					$("#operatorPwd_tip").show();
		}
			 $("#operatorPwd_tip").focus(function(){
					$("#operatorPwd").attr("value","");
				  $("#operatorPwd").show();
					$("#operatorPwd").focus();
					$("#operatorPwd_tip").hide();
					$("#serviceShowHide").hide();
				 });
				 $("#operatorPwd_tip").keypress(function(){
					 	$("#operatorPwd").attr("value","");
				    $("#operatorPwd").show();
				    $("#operatorPwd").focus();
				    $("#operatorPwd_tip").hide();
				 });
				 $("#operatorPwd").blur(function(){
				 	if ($("#operatorPwd").attr("value") == "") {
						 $("#operatorPwd").hide();
						 $("#operatorPwd_tip").show();
					}
				 });

		      if($("#operatorUserId").attr("value")==""){
						$("#operatorUserId").hide();
						$("#operatorUserId_tip").show();
			}
				 $("#operatorUserId_tip").focus(function(){
						$("#operatorUserId").attr("value","");
					  $("#operatorUserId").show();
						$("#operatorUserId").focus();
						$("#operatorUserId_tip").hide();
						$("#serviceShowHide").hide();
					 });
					 $("#operatorUserId_tip").keypress(function(){
						 	$("#operatorUserId").attr("value","");
					    $("#operatorUserId").show();
					    $("#operatorUserId").focus();
					    $("#operatorUserId_tip").hide();
					 });
					 $("#operatorUserId").blur(function(){
					 	if ($("#operatorUserId").attr("value") == "") {
							 $("#operatorUserId").hide();
							 $("#operatorUserId_tip").show();
						}
					 });


			 if($("#validCode").attr("value")==""){
						$("#validCode").hide();
						$("#validCode_tip").show();
					}
				 $("#validCode_tip").focus(function(){
						$("#validCode").attr("value","");
					  $("#validCode").show();
						$("#validCode").focus();
						$("#validCode_tip").hide();
						$("#serviceShowHide").hide();
					 });
					 $("#validCode_tip").keypress(function(){
						 	$("#validCode").attr("value","");
					    $("#validCode").show();
					    $("#validCode").focus();
					    $("#validCode_tip").hide();
					 });
					 $("#validCode").blur(function(){
					 	if ($("#validCode").attr("value") == "") {
							 $("#validCode").hide();
							 $("#validCode_tip").show();
						}
					 });
				 var isfocus=false;
				 var serviceJ = -1;
			 //服务获取焦点  打开服务列表
				 $("#selectDisname").focus(function(){
					 	if(typeflag=="true"&&$("#serviceShowHideTop").attr("show")!="true"){
						 	//sam动态下发服务
					 		$("#serviceShowHideTop").click();
						 }
							 //eportal后台配置服务
							 var _default_server=document.getElementById('net_access_type').value;
							 	for(var i=0;i<services.length;i++){
							 		 var name =services[i].serviceName;
							 		 var obj=document.getElementById("_service_"+i).parentNode.parentNode;
									 if(name == _default_server){
										 serviceJ=i;
										 mOver(obj);
									 }else{
										 mOut(obj);
									 }
								 }
					 	isfocus=true;
					 	if(typeflag=="true"&&$("#serviceShowHideTop").attr("show")!="true"){

					 	}else{
					 		$("#serviceShowHide").show();
					 	}
				 });
				 //服务框失去焦点
				 $("#selectDisname").blur(function(){
					 isfocus=false;
				 });
        $("#loginLink").focus(function () {
            $("#serviceShowHide").hide();
            $("#serviceShowHideTop").attr("show", "false");
            $("#loginLink_div").css("background-position", "-373px -105px");
        });

        $(document).keydown(function(event){
					 if(isfocus){
							//方向键向上
						 if(event.keyCode == 38){
							 if(serviceJ == -1){
								 serviceJ=0;
							 }else{
									if(serviceJ==0){
										serviceJ=services.length-1;
								 	}else{
								 		serviceJ=serviceJ-1;
								 	}
							 }
						 }
						 //方向键向下
						 if(event.keyCode == 40){
							 if(serviceJ==-1){
								 serviceJ=0;
							 }else{
								 if(serviceJ==services.length-1){
									 serviceJ=0;
								 	}else{
								 		serviceJ=serviceJ+1;
								 	}
							 }
						 }
						 var _serviceName,_serviceShowName;
						 for(var i=0;i<services.length;i++){
							 var name =services[i].serviceName;
							 var obj=document.getElementById("_service_"+i).parentNode.parentNode;
							 if(serviceJ==i){
								 mOver(obj);
								 _serviceName=name;
								 _serviceShowName=services[i].serviceShowName;
							 }else{
								 mOut(obj);
							 }
						 }
						 //使用空格选择服务
						 if(event.keyCode == 32){
							 	selectService(_serviceName,_serviceShowName,serviceJ);
						 }
					 }
					});

    	$("#serviceShowHideTop").click(function(){
			 	$("#errorInfo_hk").hide();//点击服务框时隐藏错误信息
			   try{
				  if(typeflag=="true"&&$("#serviceShowHideTop").attr("show")!="true"){
				  	var username=$('#username').attr("value");
					  if(username==""){
					  	showerror("选择服务前请先输入用户名",1);
					  	return;
					  }
					  var tj=document.getElementById("Tj_yes");
		        if (tj.style.display == "block" || tj.style.display == "") {
		        	username=prefixValue+username;
		        }
				  	 var jsonTemp="";
						  try{
						  	jsonTemp=decodeURIComponent(getCookie("servicesJsonStr"));
						  }catch(e2){

						  }
				  	if(jsonTemp&&jsonTemp!=null&&jsonTemp!=""&&jsonTemp!="null"&&jsonTemp.length>0){
					  		 var tempBchs=jsonTemp.split("@%%username@%%");
					  		 if(tempBchs.length>1&&tempBchs[0]==username){
					  			 serviceProcessForSecondGetByUserName(jsonTemp);
					  			 return;
					  		 }
				  	}
				  	var url = "userV2.do?method=getServices";
					  var search = window.location.search;
						var data = {
							        "username": username,
							        "search": search
						};
						jQuery.getAjaxContent(url, data, serviceProcessForSecondGetByUserName);

				  }else{
						  	if($("#serviceShowHideTop").attr("show")&& $("#serviceShowHideTop").attr("show")=="true"){
							  	$("#serviceShowHide").hide();
							  	$("#serviceShowHideTop").attr("show","false");
							  }else{
							  	$("#serviceShowHide").show();
							  	$("#serviceShowHideTop").attr("show","true");
							  }
				  }
			 }catch(e){
				 //alert(e);
			 }
    });
    	try{
				 var search_bch = window.location.search;
				 var service_ace=false;
				 if(search_bch.indexOf('&t=ace')!=-1){
					 service_ace=true;
				 }
				 var serviceCookie = getCookie("EPORTAL_SERVICE_NAME");
				 var serviceCookieShow = "";
				 var showServiceCnt=0;
				 var temp_bch={};
				 for(var i=0;i<services.length;i++){
					 var serviceName =services[i].serviceName;
					 if(service_ace==true){
						 if(services[i].aceNotShow=='true'){
							 $("#bch_service_"+services[i].serviceName).hide();
						 }else{
							 temp_bch=services[i];
							 showServiceCnt=showServiceCnt+1;
							 if(serviceName==serviceCookie){
								 serviceCookieShow=services[i].serviceShowName;
							 }
						 }
					 }
				 }
				 if(showServiceCnt==1){
					 serviceCookie=temp_bch.serviceName;
					 serviceCookieShow=temp_bch.serviceShowName;
				 }
				 if(serviceCookie&&serviceCookieShow&&serviceCookie!=""&&serviceCookieShow!=""){
					  $("#selectDisname").html(serviceCookieShow);
						$("#net_access_type").attr("value",serviceCookie);
				 }
			 }catch(e){

			 }
			 $("#loginFrame").show();
			 //点击首页其他地方隐藏服务下拉框
				 var flag=true;
				 $("#serviceShowHideTop").click(function(){
					 flag=false;
				 });
				 $("#serviceShowHide").click(function(){
					 flag=false;
				 });
				 $("#loginbody").click(function(){
					 if(flag){
						 $("#serviceShowHide").hide();
					 }
					 flag=true;
				 });
}

function enterProcess() {
        $("#loginLink").click()
}
function autoLan() {
    var a = getCookie("EPORTAL_AUTO_LAND");
    if ((a == "true" && getCookie("EPORTAL_COOKIE_USERNAME") != null && getCookie("EPORTAL_COOKIE_PASSWORD") != null) || (typeof(isAutoLand) != "undefined" && isAutoLand != "null" && isAutoLand != "")) {
            enterProcess()
    } else {

    }
}

var $serviceId = "";
function selectService(serviceName,serviceShowName,serviceNum){
			if($serviceId!=""){
				$("#"+$serviceId).css({"background-color":"#FFFFFF","color":"#757575"});
			}
			$("#bch_service_"+serviceNum).css({"background-color":"#7ad79d","color":"#FFFFFF"});
			$serviceId="bch_service_"+serviceNum;
			$("#selectDisname").html(serviceShowName);
			if(document.getElementById("isNoOperatorPasswordFrameId")){
				//判断是否是江苏电信服务..当前启用了江苏电信服务则显示运营商密码框
				var flag="";
				if(serviceName!="[-1-1]系统默认服务[-1-1]"){
					flag=document.getElementById("operatorPasswordFrame_"+serviceNum).value;
				}
				if(flag.indexOf("true")>-1)
				{
					if(document.getElementById("selectDisname").innerHTML &&
	   		  		document.getElementById("selectDisname").innerHTML!="" &&
	   		  		document.getElementById("selectDisname").innerHTML!="请选择服务"){
							$("#operatorPwd_tip").attr("value","请输入"+document.getElementById("selectDisname").innerHTML+"对应的密码");
					}
					$("#isNoOperatorPasswordFrameId").show();
					$("#isNoOperatorPasswordFrameId_space").show();
				}else{
					var dx=dxServics;
					if(serviceName==dx&&dx!=""){
						if(document.getElementById("selectDisname").innerHTML &&
		   		  		document.getElementById("selectDisname").innerHTML!="" &&
		   		  		document.getElementById("selectDisname").innerHTML!="请选择服务"){
							$("#operatorPwd_tip").attr("value","请输入"+document.getElementById("selectDisname").innerHTML+"对应的密码");
						}
						$("#isNoOperatorPasswordFrameId_space").show();
						$("#isNoOperatorPasswordFrameId").show();
					}else{
						$("#isNoOperatorPasswordFrameId").hide();
						$("#isNoOperatorPasswordFrameId_space").hide();
						$("#isNoOperatorUserIdFrameId").hide();
						$("#isNoOperatorUserIdFrameId_space").hide();
					}
				}
			}
			if(document.getElementById("isNoDomainName")){
				$("#isNoDomainName").attr("value",$("#domainName"+serviceNum).val());
				setCookies("EPORTAL_COOKIE_DOMAIN", $("#domainName"+serviceNum).val());
			}else{
					setCookies("EPORTAL_COOKIE_DOMAIN", "");
			}

		$("#net_access_type").attr("value",serviceName);
		$("#serviceShowHide").hide();
		$("#serviceShowHideTop").attr("show","false");
		hideErrorTipImage();
}
//隐藏错误图片
function hideErrorTipImage(){
	$("#isUsernameErrorImg").hide();
	$("#isPwdErrorImg").hide();
	$("#isServiceErrorImg").hide();
	$("#isOperatorPwdErrorImg").hide();
	$("#isValidCodeErrorImg").hide();
}
function mOver(a) {
        if (a.id == $serviceId) {
            return
        }
        $(a).css("background-color", "#e0f1e5")
}
function mOut(a) {
        if (a.id == $serviceId) {
            return
        }
        $(a).css("background-color", "#FFFFFF")
}

function serviceProcessForSecondGetByUserName(jsonTemp){
	 if(jsonTemp==null||jsonTemp==""||jsonTemp=="null"){
		 var labelHtml="";
		 var label="系统默认服务";
		 var labelValue="[-1-1]系统默认服务[-1-1]";
		 labelHtml=labelHtml +"<div id='bch_service_"+labelValue+"' class=\"login_frame_hang\" onmouseover=\"mOver(this)\" onmouseout=\"mOut(this)\" onclick=\"selectService('"+labelValue+"','"+label+"','"+0+"')\"><div class=\"left_right_input\"> 	<div id=\"service_detail_left\" class=\"left\"></div>  	<div class=\"right\" id='_service_"+0+"'>"+label+"		</div></div></div>";
		 $("#serviceContent").html(labelHtml);
	 }else{
		 var jsonStr="";
		 var tempBchs=jsonTemp.split("@%%username@%%");
		 if(tempBchs.length>1){
			 jsonTemp=tempBchs[1];
		 }
		 var username=$('#username').attr("value");
		 try{
			 setCookies("servicesJsonStr",username+"@%%username@%%"+jsonTemp);
		 }catch(e){
			 //alert(e);
		 }
		 var serviceFormats=jsonTemp.split("@");
		 for(var i=0;i<serviceFormats.length;i++){
			 var serviceFormat='{"aceNotShow":"false","serviceDefault":"false","serviceName":"5555","serviceShowName":"5555"}';
			 jsonStr=jsonStr+serviceFormat.replace(/5555/g, serviceFormats[i])+",";
		 }
		 if(jsonStr.length>0){
			 jsonStr=jsonStr.substring(0,jsonStr.length-1);
			 jsonStr="["+jsonStr+"]";
		 }
		 services=jQuery.parseJSON(jsonStr);
		 var labelHtml="";
		 var cc=1;
		 if(dxServics.indexOf("%")>0){
			 if($("#isNoOperatorPasswordFrameId")&&dxServics!=''){
				 dxServics=dxServics.split("%");
				 cc=2;
			 }
		 }
		 for(var i=0;i<services.length;i++){
			 var label=services[i].serviceShowName;
			 var labelValue=services[i].serviceName;
			 var dxFlag=false;
			 if(cc==2){
				 if(dxServics&&dxServics.length>=1){
					 for(var tt=0;tt<dxServics.length;tt++){
						 if(dxServics[i]==labelValue){
							 dxFlag=true;
						 }
					 }
				 }
			 }else{
					 if(dxServics&&dxServics!=''){
						 if(dxServics==labelValue){
							 dxFlag=true;
						 }
				 }
			 }
			 labelHtml=labelHtml +"<div id='bch_service_"+i+"' class=\"login_frame_hang\" onmouseover=\"mOver(this)\" onmouseout=\"mOut(this)\" onclick=\"selectService('"+labelValue+"','"+label+"','"+i+"')\"><div class=\"left_right_input\"> 	<div id=\"service_detail_left\" class=\"left\"></div>  	<div class=\"right\" id='_service_"+i+"'>"+label+"		</div>";
			//为了解决选择服务的js
			 labelHtml=labelHtml +"<input id='operatorPasswordFrame_"+i+"' type=\"hidden\" value='"+dxFlag+"'>";
			 labelHtml=labelHtml +"</input></div></div>";
		 }
		 $("#serviceContent").html(labelHtml);
	  }
	 	if($("#serviceShowHideTop").attr("show")&& $("#serviceShowHideTop").attr("show")=="true"){
	  	$("#serviceShowHide").hide();
	  	$("#serviceShowHideTop").attr("show","false");
	  }else{
	  	$("#serviceShowHide").show();
	  	$("#serviceShowHideTop").attr("show","true");
	  }
}

function closeSubPage() {
	  $("#tipframe").hide();
	  window.parent.document.getElementById("divPop").style.display = 'none';
	  window.parent.document.getElementById("divTupian").style.display = 'none';
	  window.parent.document.getElementById("divTupian3").style.display = 'none';
	  window.parent.document.getElementById("divMask").style.display = 'none';
}

function opensetting() {
  $("#tipframe").show();//ie高版本不支持div遮罩--临时使用此实现效果
  window.parent.document.getElementById("divMask").style.height = window.parent.document.body.scrollHeight;
  //显示遮罩
  window.parent.document.getElementById("divMask").style.display = 'block';
  window.parent.document.getElementById("divPop").style.display = 'block';
  window.parent.document.getElementById("divTupian").style.display = 'block';
  window.parent.document.getElementById("divTupian3").style.display = 'block';
  window.top.scrollTo(0, 0);
  $("#appDownDiv").hide();
  $("#settingDiv").show();
  $("#subPageUrl_chongzhi").hide();
}

function openAppdown(){
  $("#tipframe").show();//ie高版本不支持div遮罩--临时使用此实现效果
  window.parent.document.getElementById("divMask").style.height = window.parent.document.body.scrollHeight;
  //显示遮罩
  window.parent.document.getElementById("divMask").style.display = 'block';
  window.parent.document.getElementById("divPop").style.display = 'block';
  window.parent.document.getElementById("divTupian").style.display = 'block';
  window.parent.document.getElementById("divTupian3").style.display = 'block';
  window.top.scrollTo(0, 0);
  $("#settingDiv").hide();
  $("#appDownDiv").show();
  $("#subPageUrl_chongzhi").hide();
}

function deletePwd(){
	document.getElementById("pwd").value="";

}

function deleteUserName(){
	document.getElementById("username").value="";
}
