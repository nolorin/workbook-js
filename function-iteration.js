// Recursively iterating lambda functions

var lambdaLoops = {
	// Checks if variable is contained within array, including any arrays with scopes within that array's scope (i.e., sub-arrays, sub-sub-arrays, sub-sub-sub-arrays, etc.).
	arrayCheck : function( needle, haystack ) {
		for( var i=0; i<haystack.length; i++ ) {
			if( haystack[i] == needle ) {
				return true;
			} else if( typeof haystack[i] == 'array' ) {
				var output = this( needle, haystack[i] );
				if( output ) {
					return true;
				}
			}
		}
		return false;
	},
	// Checks whether a lambda function results in a constant value after being applied to itself over and over.
	nToInfinity : function( lambda, numIterations, setDepth ) {
		var info = { i : 0, d : 0 };
		info['iters'] = typeof numIterations == 'undefined' ? 100 : numIterations;
		info['depth'] = typeof setDepth == 'undefined' ? 1 : setDepth;
		var iteration = function( info, func, prev ) {
			if( info.i < info.iters ) {
				var result = func( prev );
				if( result == prev ) {
					info.d++;
					if( info.d > info.depth ) {
						return true;
					}
				}
				return this( info, func, result );
			} else {
				return null;
			}
		}
		if( iteration( info, lambda, null ) ) {
			return true;
		} else {
			return false;
		}
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
}
