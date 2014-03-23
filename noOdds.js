/*
Description:

Write a small function that returns the values of an array that are not odd.

All values in the array will be integers. Return the good values in the order they are given.

function noOdds( values )
 */

// old school
function noOdds( values ){

  var result = [];
  
  for (var i = 0; i < values.length; i++) {
    if ( (values[i] % 2) === 0 ) {
      result.push(values[i]);
    }
  }
  
  return result;
}

// map()
function onOdds( values ) {
	return values.filter( function( x ) {
		return ( x % 2 === 0 );
	});
}