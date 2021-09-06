var run = function() {
	var info = {
		list1 : [ 'Tom', 'Jane', 'Mary', 'Farouk', 'Elizabeth', 'Pat' ],
		list2 : [ 'Worker', 'Manager', 'Contractor', 'Executive' ],
		list3 : [ 'Experienced', 'Skilled', 'Novice' ],
		list4 : ['Boston', 'Chicago', 'Los Angeles', 'San Francisco', 'Seattle', 'Atlanta', 'Austin', 'Houston' ],
		loc : {
			'Illinois' : [ 'Chicago' ],
			'California' : [ 'Los Angeles', 'San Francisco' ],
			'Georgia' : [ 'Atlanta' ],
			'Washington' : [ 'Seattle' ],
			'Texas' : [ 'Austin', 'Houston' ]
		},
		eigenKey : [
			[ 0, 1, 1, 3 ],
			[ 1, 2, 1, 4 ],
			[ 2, 0, 2, 6 ],
			[ 2, 0, 0, 2 ],
			[ 3, 1, 1, 0 ],
			[ 4, 2, 1, 5 ],
			[ 5, 0, 1, 4 ],
			[ 5, 0, 2, 4 ]
		]
	};

	var output = '';
	for( var i=0; i<info.eigenKey.length; i++ ) {
		output += info.list1[info.eigenKey[i][0]] + " is a&?" + info.list3[info.eigenKey[i][2]];
		output += " " + info.list2[info.eigenKey[i][1]] + " from " + info.list4[info.eigenKey[i][3]];
		for( var state in info.loc.length ) {
			for( var k=0; k< info.loc[state].length; k++ ) {
				if( info.loc[state][k] == info.list[3] ) {
					output += ", " + state;
				}
			}
		}
		output += ".\n";
	}

	output = output.replace( /(&\?)([^aeio])/gi, ' $2' );
	output = output.replace( /(&\?)([aeio])/gi, 'n $2' );

	return output;
}

try {
	document.write( "<pre>" + run() + "</pre>" );
} catch( error ) {
	console.log( run() );
}
