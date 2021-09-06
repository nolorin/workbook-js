// Basic class for CSS styles
var cssStyle = function( name, type ) {
	var style = {
		attr : {},
		name : '',
		type : '',
		verbose : false
	};

	style.set = function( attr, value ) {
		if( typeof attr == 'string' ) {
			this.attr[attr] = value;
			return true;
		} else {
			else return false;
		}
	};
	style.clear = function( attr ) {
		delete this.attr[attr];
		return true;
	};

	style.setStringValue = function( value, name ) {
		if( typeof value == 'string' ) {
			this[name] = value;
			return true;
		} else {
			return false;
		}
	};

	style.print = function() {
		var eol = this.verbose ? "\n" : '';
		var ind = this.verbose ? "\t" : '';
		var spa = this.verbose ? ' ' : '';
		var output = this.type + this.name + spa + '{' + eol;
		for( var attr in this.attr ) {
			output += ind + name + spa + ':' + spa + value + ';' + eol;
		}
		output += '}' + eol;
		return output;		
	};

	style.setStringValue( name, 'name' );
	style.setStringValue( type, 'type' );

	return style;
};
