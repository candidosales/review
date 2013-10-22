/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-home' : '&#xe000;',
			'icon-newspaper' : '&#xe001;',
			'icon-books' : '&#xe002;',
			'icon-file' : '&#xe003;',
			'icon-star' : '&#xe004;',
			'icon-star-2' : '&#xe005;',
			'icon-enter' : '&#xf323;',
			'icon-building' : '&#xf245;',
			'icon-bubbles' : '&#xe006;',
			'icon-users' : '&#xe007;',
			'icon-info' : '&#xe008;',
			'icon-download' : '&#xf11a;',
			'icon-expand' : '&#xe009;',
			'icon-info-2' : '&#xf315;',
			'icon-enter-2' : '&#xe00a;',
			'icon-zoomin' : '&#xf320;',
			'icon-zoomout' : '&#xf321;',
			'icon-bookmark' : '&#xf143;',
			'icon-question' : '&#xe00b;',
			'icon-query' : '&#xf08a;',
			'icon-contract' : '&#xe00c;',
			'icon-wordpress' : '&#xe00d;',
			'icon-calendar' : '&#xe00e;',
			'icon-lightbulb' : '&#xe00f;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};