// Basic class for CSS styles
var cssStyle = function( name, type ) {
	var style = {
		attrs : {},
		name : '',
		prefix : '',
		verbose : false
	};

	style.set = function( attr, value ) {
		if( typeof attr == 'string' ) {
			this.attrs[attr] = value;
			return true;
		} else {
			return false;
		}
	};
	style.clear = function( attr ) {
		delete this.attrs[attr];
		return true;
	};

	style.type = function( type ) {
		if( type == 'class' ) {
			this.prefix = '.';
		} else if( type == 'id' ) {
			this.prefix = '#';
		} else {
			this.prefix = '';
		}
	}

	style.print = function() {
		var eol = this.verbose ? "\n" : '';
		var ind = this.verbose ? "\t" : '';
		var spa = this.verbose ? ' ' : '';
		var output = this.prefix + this.name + spa + '{' + eol;
		for( var attr in this.attrs ) {
			output += ind + attr + spa + ':' + spa + this.attrs[attr] + ';' + eol;
		}
		output += '}' + eol;
		return output;		
	};

	style.name = String( name );
	style.type( type );

	return style;
};

// Test
var style = cssStyle( 'block', 'class' );
style.set( 'color', 'red' );
style.set( 'padding', '2px 2.5px' );
console.log( style.print() );
style.clear( 'padding' );
style.set( 'margin', '2px' );
style.verbose = true;
console.log( style.print() );
style.set( 'border-radius', '10px' );
style.type( 'id' );
style.verbose = false;
console.log( style.print() );


