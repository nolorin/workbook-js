// Basic HTML generating class
var htmlElement = function( tag ) {
	var html = {
		"tag" : tag,
		"attrs" : {},
		"innerHTML" : {},
		"shortTag" : false,
		"closeTag" : true,
		"verbose" : true
	}
	html.attr = function( name, value ) {
		this.attrs[name] = value;
	};
	html.clear = function( name ) {
		delete this.attrs[name];
	};
	html.append = function( child, name ) {
		var key = typeof name == 'undefined' ? Object.keys( this.innerHTML ).length : name;
		this.innerHTML[key] = child;
	};
	html.drop = function( name ) {
		delete this.innerHTML[name];
	};
	html.print = function() {
		var eol = this.verbose ? "\n" : '';
		var ind = this.verbose ? "\t" : '';
		var output = '<' + this.tag;
		if( Object.keys( this.attrs ).length > 0 ) {
			output += ' ';
			for( attr in this.attrs ) {
				output += attr + '=';
				output += typeof this.attrs[attr] != 'boolean'  ? '"' + this.attrs[attr] + '" ' : this.attrs[attr];
			}
			output = output.substring( 0, output.length-1 );
		}
		if( !this.shortTag && this.closeTag ) {
			if( Object.keys( this.innerHTML ).length > 0 ) {
				output += '>' + eol;
				for( inner in this.innerHTML ) {
					var childOutput = typeof this.innerHTML[inner].print == 'function' ? this.innerHTML[inner].print() : this.innerHTML[inner];
					output += ind + childOutput.replace( '/\n/', "\n" + ind ) + eol;
				}
			} else {
				output += '>';
			}
			output += '</' + this.tag + '>';
		} else {
			output += this.shortTag ? '/>' : '>';
		}
		return output;
	};
	return html;
};

// Test
var html = htmlElement( 'div' );
html.attr( 'id', 'node-1' );
html.attr( 'style', 'color:black' );
console.log( html.print() );
html.shortTag = true;
console.log( html.print() );
html.shortTag = html.closeTag = false;
console.log( html.print() );

var child = htmlElement( 'span' );
child.attr( 'info', 'true' );
html.append( child, 'select' );
console.log( html.print() );
html.closeTag = true;
console.log( html.print() );
html.verbose = false;
console.log( html.print() );
html.verbose = true;
html.clear( 'style' );
html.append( 'Here is a text inner.' );
html.drop( 'select' );
console.log( html.print() );
