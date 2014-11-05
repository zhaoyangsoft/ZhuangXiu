/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon_checkmark': '&#xe600;',
		'icon_checkmark2': '&#xe601;',
		'icon_cancel': '&#xe602;',
		'icon_cancel2': '&#xe603;',
		'icon_plus': '&#xe604;',
		'icon_plus2': '&#xe605;',
		'icon_minus': '&#xe606;',
		'icon_minus2': '&#xe607;',
		'icon_notice': '&#xe608;',
		'icon_notice2': '&#xe609;',
		'icon_angles_left': '&#xf100;',
		'icon_angles_right': '&#xf101;',
		'icon_angles_top': '&#xf102;',
		'icon_angles_bottom': '&#xf103;',
		'icon_angle_left': '&#xf104;',
		'icon_angle_right': '&#xf105;',
		'icon_angle_up': '&#xf106;',
		'icon_angle_down': '&#xf107;',
		'icon_angle_circle_left': '&#xf137;',
		'icon_angle_circle_right': '&#xf138;',
		'icon_angle_circle_top': '&#xf139;',
		'icon_angle_circle_bottom': '&#xf13a;',
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
