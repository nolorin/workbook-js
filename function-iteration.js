// Recursive function iteration

var iterations = {
	// Checks if variable is contained within array, including any arrays with scopes within that array's scope (i.e., sub-arrays, sub-sub-arrays, sub-sub-sub-arrays, etc.).
	arrayCheck : function( needle, haystack ) {
		for( var i=0; i<haystack.length; i++ ) {
			if( haystack[i] == needle ) {
				return true;
			} else if( haystack[i] instanceof Array ) {
				var output = iterations.arrayCheck( needle, haystack[i] );
				if( output ) {
					return true;
				}
			}
		}
		return false;
	},
	// Checks whether a lambda function results in a constant value after being applied to itself over and over.
	nToInfinity : function( initial, func, numIterations, setDepth ) {
		var depth = typeof setDepth == 'number' ? setDepth : 1;
		var prev = initial;
		for( i=0, d=0; i<numIterations; i++ ) {
			result = func( prev );
			if( result == prev ) {
				d++;
			}
			if( d >= depth ) {
				return true;
			} else {
				prev = result;
			}
		}
		return false;
	},
	// Apply a lambda function over and over to a variable for a set number of times and until a specific result is achieved, whichever comes first
	funcIterate : function( value, lambda, numIterations, goal ) {
		var goal = typeof goal != 'undefined' ? goal : null;
		if( value == goal ) {
			return null;
		} else {
			let i = 0;
			var result = value;
			do {
				result = lambda( result );
				i++;
			} while( i<numIterations && result != goal );
			return result;
		}
	}
};

// Test1
var array = [ 8, 203, [ 31, 2, [ 17, 23 ], 58, 2, 12 ], 4, [ 12, 1, 0, 0, 172 ], [ 1, [ 3, 17, 2 ], [ 36, 28, 583, 2 ], 1, 90 ] ];
console.log( iterations.arrayCheck( 0, array ) ); // Returns TRUE
console.log( iterations.arrayCheck( 112, array ) ); // Returns FALSE
console.log( iterations.arrayCheck( 'Subject', array ) ); // Returns FALSE
console.log( iterations.arrayCheck( 583, array ) ); // Returns TRUE

console.log();

// Test2
var func = function( input ) {
	return Math.round( input/2 );
};
console.log( iterations.nToInfinity( 10, func, 10 ) ); // Returns TRUE;
console.log( iterations.nToInfinity( 10, func, 1 ) ); // Returns FALSE
console.log( iterations.nToInfinity( 10, func, 4 ) ); // Returns FALSE
console.log( iterations.nToInfinity( 10, func, 5 ) ); // Returns TRUE (Five is the number of times required to get the same result twice for depth of 1)
console.log( iterations.nToInfinity( 10, func, 5, 2 ) ); // Returns FALSE
console.log( iterations.nToInfinity( 10, func, 6, 2 ) ); // Returns TRUE (When depth is 2, another iteration is needed to get same result)

console.log();

// Test3
console.log( iterations.funcIterate( 10, func, 2, 1 ) ); // Returns 3.0, the result of func after two iterations
console.log( iterations.funcIterate( 10, func, 1e15, 1 ) ); // Returns 1.0 without running through 1e15
