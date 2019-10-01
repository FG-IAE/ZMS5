/*
 * @see http://nicolas.rudas.info/jQuery/getPlugin/
 */
 
function pluginLanguage() {
	return getZMILangStr('LOCALE',{'nocache':""+new Date()});
}

/**
 * jQuery UI
 */
function pluginUI(s, c) {
	$.plugin('ui',{
		files: [
				$ZMI.getConfProperty('jquery.ui.js'),
				$ZMI.getConfProperty('jquery.ui.css')
		]});
	$.plugin('ui').get(s,function(){
			c();
		});
}


/**
 * jQuery UI Autocomplete
 */
function zmiAutocompleteDefaultFormatter(l, q) {
	return $.map(l,function(x){
		var label = x;
		var value = x;
		if (typeof x == "object") {
			label = x.label;
			value = x.value;
		}
		var orig = label;
		return {label: label.replace(
								new RegExp(
										"(?![^&;]+;)(?!<[^<>]*)(" +
										$.ui.autocomplete.escapeRegex(q) +
										")(?![^<>]*>)(?![^&;]+;)", "gi"
										), "<strong>$1</strong>" ),
				value: value,
				orig: label};
			})
}

function zmiAutocomplete(s, o) {
	pluginUI(s,function() {
		$(s).autocomplete(o)
		.data("ui-autocomplete")._renderItem = function( ul, item ) {
				return $( "<li></li>" )
					.data( "item.autocomplete", item )
					.append( "<a>" + item.label + "</a>" )
					.appendTo( ul );
			};
	});
}


/**
 * ZMSLightbox
 */
$(function(){
	$('a.zmslightbox,a.fancybox')
		.each(function() {
				var $img = $("img",$(this));
				$img.attr("data-hiresimg",$(this).attr("href"));
				$(this).click(function() {
						return showFancybox($img);
					});
			});
});

function pluginFancybox(s, c) {
	$.plugin('zmslightbox',{
		files: ['/++resource++zms_/jquery/zmslightbox/zmslightbox.js',
				'/++resource++zms_/jquery/zmslightbox/zmslightbox.css']
		});
	$.plugin('zmslightbox').get(s,c);
}

function showFancybox($sender) {
	pluginFancybox('body',function() {
			show_zmslightbox($sender);
		});
	return false;
}


/**
 * Autocomplete
 * @see http://bassistance.de/jquery-plugins/jquery-plugin-autocomplete/
 * @deprecated
 */
function pluginAutocomplete(s, c) {
	$.plugin('autocomplete',{
		files: ['/++resource++zms_/jquery/autocomplete/jquery.bgiframe.min.js',
				'/++resource++zms_/jquery/autocomplete/jquery.autocomplete.min.js',
				'/++resource++zms_/jquery/autocomplete/jquery.autocomplete.css']
	});
	$.plugin('autocomplete').get(s,c);
}


/**
 * Jcrop - the jQuery Image Cropping Plugin
 * @see http://deepliquid.com/content/Jcrop.html
 */
function runPluginJcrop(c) {
	$.plugin('jcrop',{
		files: ['/++resource++zms_/jquery/jcrop/jquery.Jcrop.min.js',
				'/++resource++zms_/jquery/jcrop/jquery.Jcrop.css']
		});
	$.plugin('jcrop').get('body',c);
}
