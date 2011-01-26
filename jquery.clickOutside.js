/**
 * bind clickOutside event - Plugin for jQuery
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Depends:
 *   jquery.js
 * 
 * Author: hiromitz ( http://github.com/hiromitz )
 * 
 */
;(function($, d) {
	var i = 0,
		propname = 'clickOutside';
	
	// click function
	$.fn.clickOutside = function(data, fn) {
		
		return this.each(function() {
			var self = this,
				$self = $(this),
				f = false,
				ev = $self.data(propname) || 'click.clickOutside' + i;
			
			// unbind function
			if(data === 'unbind') {
				$(d).unbind(ev);
				return;
			}
			
			if(fn == null) {
	            fn = data;
	            data = null;
	        }
			if(data === 'unbind' || !$.isFunction(fn)) return;
			
			$self.data(propname, ev)
			.hover(function() {
				f = true;
			}, function() {
				f = false;
			});
			
			$(d).bind(ev, function() {
				if(f) return;
				fn.call(self, arguments);
			});
			
			i++;
		});
	};
	
	// add clickOutside to bind
	var _bind = $.fn.bind;
	$.fn.bind = function(type, data, fn) {
		if(type !== 'clickOutside') return _bind.apply(this, [type, data, fn]);
		
		return this.clickOutside(data, fn);
	};
	
	// add clickOutside to unbind
	var _unbind = $.fn.unbind;
	$.fn.unbind = function(type, fn){
		if(type !== 'clickOutside') return _unbind.apply(this, arguments);
		
		return this.each(function() {
			$(d)._unbind($(this).data(propname));
		});
	};
	
})(jQuery, document);

