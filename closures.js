// Closure that encapsulates other closures. Note: in JavaScript closures are simply instantly executed anonymous functions
var info = { "value" : true }, option  = 'partial';
console.log( function( info, option ) {
	// Input sanitizing on object "info"
	for( var prop in info ) {
		var found = false, whitelist = array( 'value' );
		for( var i=0; i<whitelist.length; i++ ) {
			if( whitelist[i] == prop ) {
				found = true;
			}
		}
		if( !found ) {
			delete info.prop;
		}
	}
	info.value = info.value ? true : false;

	// Partially open closure
	if( option == 'partial' ) {

		return ( function( info ) {
			output = info.value ? 'purple' : 'neon green';
			return output;
		} )( info );

	// Restricted open closure
	} else if( option == 'restricted' ) {

		return ( function( value ) {
			output = value ? 'Sunday' : 'Wednesday';
			return output;
		} )( info.value );

	// Trigger fully encapsulated and scope-isolated code
	} else {

		return ( function() {
			return true;
		} )();

	}
} )( info, option );
