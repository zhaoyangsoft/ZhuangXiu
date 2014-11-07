(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon_pen': '&#xe600;',
		'icon_paintcan': '&#xf0d1;',
		'icon_qrcode': '&#xe601;',
		'icon_checkmark': '&#xe602;',
		'icon_checkmark2': '&#xe603;',
		'icon_cancel': '&#xe604;',
		'icon_cancel2': '&#xe605;',
		'icon_plus': '&#xe606;',
		'icon_plus2': '&#xe607;',
		'icon_minus': '&#xe608;',
		'icon_minus2': '&#xe609;',
		'icon_smiley': '&#xe60a;',
		'icon_sad': '&#xe60b;',
		'icon_angle_left': '&#xf104;',
		'icon_angle_right': '&#xf105;',
		'icon_angle_up': '&#xf106;',
		'icon_angle_down': '&#xf107;',
		'icon_chevron_circle_left': '&#xf137;',
		'icon_chevron_circle_right': '&#xf138;',
		'icon_chevron_circle_up': '&#xf139;',
		'icon_chevron_circle_down': '&#xf13a;',
		'icon_wechat': '&#xf1d7;',
		'icon_users': '&#xe60c;',
		'icon_pictures': '&#xe60d;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon_[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
