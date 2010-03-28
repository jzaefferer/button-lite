/*!
 * jQuery Button Lite Plugin
 * http://github.com/jzaefferer/button-lite
 *
 * Copyright 2010, Jörn Zaefferer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * 
 * Depends on:
 * jquery.ui.widget.js
 * jquery.ui.button.css (and base theme files)
 */
(function($) {

var lastActive;

$.widget( "ui.buttonlite", {
	_create: function() {
		var options = this.options;
		
		if ( this.element.is( ":disabled" ) ) {
			options.disabled = true;
		}

		this.element
			.bind( "mouseenter.buttonlite", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).addClass( "ui-state-hover" );
				if ( this === lastActive ) {
					$( this ).addClass( "ui-state-active" );
				}
			})
			.bind( "mouseleave.buttonlite", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( "ui-state-hover" );
			})
			.bind( "focus.buttonlite", function() {
				// no need to check disabled, focus won't be triggered anyway
				$( this ).addClass( "ui-state-focus" );
			})
			.bind( "blur.buttonlite", function() {
				$( this ).removeClass( "ui-state-focus" );
			})
			.bind( "mousedown.buttonlite", function() {
				if ( options.disabled ) {
					return false;
				}
				$( this ).addClass( "ui-state-active" );
				lastActive = this;
				$( document ).one( "mouseup", function() {
					lastActive = null;
				});
			})
			.bind( "mouseup.buttonlite", function() {
				if ( options.disabled ) {
					return false;
				}
				$( this ).removeClass( "ui-state-active" );
			})
			.bind( "keydown.buttonlite", function(event) {
				if ( options.disabled ) {
					return false;
				}
				if ( event.keyCode == $.ui.keyCode.SPACE || event.keyCode == $.ui.keyCode.ENTER ) {
					$( this ).addClass( "ui-state-active" );
				}
			})
			.bind( "keyup.buttonlite", function() {
				$( this ).removeClass( "ui-state-active" );
			});
			
		if ( this.element.is("a") ) {
			this.element.keyup(function(event) {
				if ( event.keyCode === $.ui.keyCode.SPACE ) {
					// TODO pass through original event correctly (just as 2nd argument doesn't work)
					$( this ).click();
				}
			});
		}
		
		// TODO see comment on the original line in jquery.ui.button.js
		this._setOption( "disabled", options.disabled );
	},
	
	_setOption: function( key, value ) {
		$.Widget.prototype._setOption.apply( this, arguments );
		if ( key === "disabled" ) {
			if ( value ) {
				this.element.attr( "disabled", true );
			} else {
				this.element.removeAttr( "disabled" );
			}
		}
	}
});
	
	
})(jQuery);
