// Integer multiplication function that uses lambda function arguments. Note: in JavaScript scope is highly porous and "lambda-like" functions are normal
var multiply = {
	"type" : {
		"string" : {
			"iterant" : function( base, output ) {
				return output + base;
			},
			"negative" : function( output ) {
				return output.split( '' ).reverse().join( '' );
			}
		},
		"array" : {
			"iterant" : function( base, output ) {
				return output.concat( base );
			},
			"negative" : function( output ) {
				for( var i=0; i<output.length; i++ ) {
					if( typeof output[i] == 'string' ) {
						output[i] = output[i].split( '' ).reverse().join( '' );
					} else if( typeof output[i] == 'number' || typeof output[i] == 'bigint' ) {
						output[i] *= -1;
					} else if( typeof output[i] == 'array' ) {
						output[i] = this( output[i] );
					}
					// No effect for object items
				}
				return output;

			}
		},
		"object" : {
			"iterant" : function( base, output ) {
				output["child-"+Object.keys( output ).length] = base;
				return output;
			},
			"negative" : function( output ) {
				// No effect for objects
				return output;
			}
		}
	},
	"run" : function( base, multiplicant ) {
		if( typeof base != 'number' && typeof base != 'bigint' ) {
			var output = null, type = null;
			if( typeof base == 'string' ) {
				type = 'string';
				output = '';
			} else if( Array.isArray( base ) ) {
				type = 'array';
				output = base;
			} else if( typeof base == 'object' ) {
				type = 'object';
				output = { "value" : "shell" };
			}

			for( var i=0; i<Math.abs( multiplicant ); i++ ) {
				output = this.type[type].iterant( base, output );
			}
			if( multiplicant < 0 ) {
				output = this.type[type].negative( output );
			}
			return output;
		} else {
			return base*multiplicant;
		}		
	}
};

// Test
console.log( multiply.run( 5, 37 ) );
console.log( multiply.run( 'Harp', 7 ) );
console.log( multiply.run( 'summer*', -2 ) );
console.log( multiply.run( [ 'Here', 'There', 'Everywhere' ], -3 ) );
console.log( multiply.run( { "value" : "item" }, 4 ) );
