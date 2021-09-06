// Basic HTML generating class
var htmlElement = function( tag ) {
	var html = {
		"tag" : tag,
		"attr" : {},
		"innerHTML" : {},
		"shortTag" : false,
		"closeTag" : true,
		"verbose" : true
	}
	html.attr = function( name, value ) {
		this.attr[name] = value;
	};
	html.clear = function( name ) {
		delete this[name];
	};
	html.append = function( name, child ) {
		this.innerHTML[name] = child;
	};
	html.drop = function( name, child ) {
		delete this[name];
	};
	html.print = function() {
		var eol = this.verbose ? "\n" : '';
		var ind = this.verbose ? "\t" : '';
		var output = '<' + this.tag;
		if( this.attr.length > 0 ) {
			output += ' ';
			for( attr in this.attr ) {
				output += attr + '=';
				output += !is_bool( this.attr[attr] ) ? '"' + this.attr[attr] + '" ' : this.attr[attr];
			}
			output = output.substring( 0, output.length-1 );
		}
		if( !this.short_tag && this.close_tag ) {
			output += this.innerHTML.length > 0 ? '>' : '>' + eol;
			for( var i=0; i<this.innerHTML.length; i++ ) {
				var child_output = String( this.innerHTML[i] );
				output += ind + preg_replace( '/\n/', "\n" + ind, child_output ) + eol;
			}
			output += '</' + this.tag + '>';
		} else {
			output += this.short_tag ? '/>' : '>';
		}
		return output;
	};
	return html;
};