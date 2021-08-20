(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.6.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2021-02-16
 */
( function( window ) {
var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	slice = arr.slice,

	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[ i ] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
		"ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5]
		// or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
			whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
			whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		return nonHex ?

			// Strip the backslash prefix from a non-hex escape sequence
			nonHex :

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android<4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;

			// Can't trust NodeList.length
			while ( ( target[ j++ ] = els[ i++ ] ) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

				// Support: IE 8 only
				// Exclude object elements
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					if ( newContext !== context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split( "|" ),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[ i ] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( ( cur = cur.nextSibling ) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return ( name === "input" || name === "button" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
					inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
	// Safari 4 - 5 only, Opera <=11.6 - 12.x only
	// IE/Edge & older browsers don't support the :scope pseudo-class.
	// Support: Safari 6.0 only
	// Safari 6.0 supports :scope but it's an alias of :root there.
	support.scope = assert( function( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert( function( el ) {
		el.className = "i";
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert( function( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter[ "ID" ] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter[ "ID" ] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find[ "ID" ] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,

				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Firefox <=3.6 - 5 only
			// Old Firefox doesn't throw on a badly-escaped identifier.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll( "[name=d]" ).length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: Opera 10 - 11 only
			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( function( el ) {

			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		function( a, b ) {
			if ( b ) {
				while ( ( b = b.parentNode ) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferredDoc &&
				contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferredDoc &&
				contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			return a == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[ i ] === bp[ i ] ) {
			i++;
		}

		return i ?

			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Otherwise nodes in our document sort first
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferredDoc ? -1 :
			bp[ i ] == preferredDoc ? 1 :
			/* eslint-enable eqeqeq */
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

				// As well, disconnected nodes are said to be in a document
				// fragment in IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {

		// If no nodeType, this is expected to be an array
		while ( ( node = elem[ i++ ] ) ) {

			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {

			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}

	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace +
					")" + className + "(" + whitespace + "|$)" ) ) && classCache(
						className, function( elem ) {
							return pattern.test(
								typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
							);
				} );
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				/* eslint-disable max-len */

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
				/* eslint-enable max-len */

			};
		},

		"CHILD": function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {

								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		"not": markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element (issue #299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		"has": markFunction( function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		} ),

		"contains": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"selected": function( elem ) {

			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos[ "empty" ]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		"last": createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"odd": createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rcombinators.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = uniqueCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts(
				selector || "*",
				context.nodeType ? [ context ] : context,
				[]
			),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?

				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// If the preceding token was a descendant combinator, insert an implicit any-element `*`
					tokens
						.slice( 0, i - 1 )
						.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache(
			selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), context ) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert( function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute( "href" ) === "#";
} ) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
} ) ) {
	addHandle( "value", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	} );
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert( function( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					null;
		}
	} );
}

return Sizzle;

} )( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						// Support: Chrome 86+
						// In Chrome, if an element having a focusout handler is blurred by
						// clicking outside of it, it invokes the handler synchronously. If
						// that handler calls `.remove()` on the element, the data is cleared,
						// leaving `result` undefined. We need to guard against this.
						return result && result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		// Suppress native focus or blur as it's already being fired
		// in leverageNative.
		_default: function() {
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is display: block
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

},{}],2:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mongoose=e():t.mongoose=e()}("undefined"!=typeof self?self:this,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=95)}([function(t,e,r){"use strict";e.arrayAtomicsSymbol=Symbol("mongoose#Array#_atomics"),e.arrayParentSymbol=Symbol("mongoose#Array#_parent"),e.arrayPathSymbol=Symbol("mongoose#Array#_path"),e.arraySchemaSymbol=Symbol("mongoose#Array#_schema"),e.documentArrayParent=Symbol("mongoose:documentArrayParent"),e.documentIsSelected=Symbol("mongoose#Document#isSelected"),e.documentIsModified=Symbol("mongoose#Document#isModified"),e.documentModifiedPaths=Symbol("mongoose#Document#modifiedPaths"),e.documentSchemaSymbol=Symbol("mongoose#Document#schema"),e.getSymbol=Symbol("mongoose#Document#get"),e.modelSymbol=Symbol("mongoose#Model"),e.objectIdSymbol=Symbol("mongoose#ObjectId"),e.populateModelSymbol=Symbol("mongoose.PopulateOptions#Model"),e.schemaTypeSymbol=Symbol("mongoose#schemaType"),e.sessionNewDocuments=Symbol("mongoose:ClientSession#newDocuments"),e.scopeSymbol=Symbol("mongoose#Document#scope"),e.validatorErrorSymbol=Symbol("mongoose:validatorError")},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s,a=r(113),u=r(49),c=r(62),l=r(63).Buffer,f=r(20),p=r(10),h=r(116),y=r(29),d=r(22),_=r(21),v=r(66),m=r(65),g=r(30),b=r(25),w=r(71),O=r(50);function S(t){if(Array.isArray(t.populate)){var r=[];t.populate.forEach((function(t){if(/[\s]/.test(t.path)){var n=Object.assign({},t);n.path.split(" ").forEach((function(t){n.path=t,r.push(e.populate(n)[0])}))}else r.push(e.populate(t)[0])})),t.populate=e.populate(r)}else null!=t.populate&&"object"===i(t.populate)&&(t.populate=e.populate(t.populate));var o=[],s=t.path.split(" ");null!=t.options&&(t.options=e.clone(t.options));var a,u=n(s);try{for(u.s();!(a=u.n()).done;){var c=a.value;o.push(new h(Object.assign({},t,{path:c})))}}catch(t){u.e(t)}finally{u.f()}return o}
/*!
 * Return the value of `obj` at the given `path`.
 *
 * @param {String} path
 * @param {Object} obj
 */e.specialProperties=O,
/*!
 * Produces a collection name from model `name`. By default, just returns
 * the model name
 *
 * @param {String} name a model name
 * @param {Function} pluralize function that pluralizes the collection name
 * @return {String} a collection name
 * @api private
 */
e.toCollectionName=function(t,e){return"system.profile"===t||"system.indexes"===t?t:"function"==typeof e?e(t):t},
/*!
 * Determines if `a` and `b` are deep equal.
 *
 * Modified from node/lib/assert.js
 *
 * @param {any} a a value to compare to `b`
 * @param {any} b a value to compare to `a`
 * @return {Boolean}
 * @api private
 */
e.deepEqual=function t(r,n){if(r===n)return!0;if("object"!==i(r)&&"object"!==i(n))return r===n;if(r instanceof Date&&n instanceof Date)return r.getTime()===n.getTime();if(v(r,"ObjectID")&&v(n,"ObjectID")||v(r,"Decimal128")&&v(n,"Decimal128"))return r.toString()===n.toString();if(r instanceof RegExp&&n instanceof RegExp)return r.source===n.source&&r.ignoreCase===n.ignoreCase&&r.multiline===n.multiline&&r.global===n.global;if(null==r||null==n)return!1;if(r.prototype!==n.prototype)return!1;if(r instanceof Map&&n instanceof Map)return t(Array.from(r.keys()),Array.from(n.keys()))&&t(Array.from(r.values()),Array.from(n.values()));if(r instanceof Number&&n instanceof Number)return r.valueOf()===n.valueOf();if(l.isBuffer(r))return e.buffer.areEqual(r,n);if(Array.isArray(r)&&Array.isArray(n)){var o=r.length;if(o!==n.length)return!1;for(var s=0;s<o;++s)if(!t(r[s],n[s]))return!1;return!0}null!=r.$__?r=r._doc:g(r)&&(r=r.toObject()),null!=n.$__?n=n._doc:g(n)&&(n=n.toObject());var a=Object.keys(r),u=Object.keys(n),c=a.length;if(c!==u.length)return!1;a.sort(),u.sort();for(var f=c-1;f>=0;f--)if(a[f]!==u[f])return!1;for(var p=0,h=a;p<h.length;p++){var y=h[p];if(!t(r[y],n[y]))return!1}return!0},
/*!
 * Get the last element of an array
 */
e.last=function(t){if(t.length>0)return t[t.length-1]},e.clone=y,
/*!
 * ignore
 */
e.promiseOrCallback=b,
/*!
 * ignore
 */
e.omit=function(t,e){if(null==e)return Object.assign({},t);Array.isArray(e)||(e=[e]);var r,o=Object.assign({},t),i=n(e);try{for(i.s();!(r=i.n()).done;){delete o[r.value]}}catch(t){i.e(t)}finally{i.f()}return o},
/*!
 * Shallow copies defaults into options.
 *
 * @param {Object} defaults
 * @param {Object} options
 * @return {Object} the merged object
 * @api private
 */
e.options=function(t,e){var r,n=Object.keys(t),o=n.length;for(e=e||{};o--;)(r=n[o])in e||(e[r]=t[r]);return e},
/*!
 * Generates a random string
 *
 * @api private
 */
e.random=function(){return Math.random().toString().substr(3)},
/*!
 * Merges `from` into `to` without overwriting existing properties.
 *
 * @param {Object} to
 * @param {Object} from
 * @api private
 */
e.merge=function t(r,n,o,i){o=o||{};var s,a=Object.keys(n),u=0,c=a.length;i=i||"";for(var l=o.omitNested||{};u<c;)if(s=a[u++],!(o.omit&&o.omit[s]||l[i]||O.has(s)))if(null==r[s])r[s]=n[s];else if(e.isObject(n[s])){if(e.isObject(r[s])||(r[s]={}),null!=n[s]){if(o.isDiscriminatorSchemaMerge&&n[s].$isSingleNested&&r[s].$isMongooseDocumentArray||n[s].$isMongooseDocumentArray&&r[s].$isSingleNested)continue;if(n[s].instanceOfSchema){r[s].instanceOfSchema?w(r[s],n[s].clone(),o.isDiscriminatorSchemaMerge):r[s]=n[s].clone();continue}if(n[s]instanceof p){r[s]=new p(n[s]);continue}}t(r[s],n[s],o,i?i+"."+s:s)}else o.overwrite&&(r[s]=n[s])},
/*!
 * Applies toObject recursively.
 *
 * @param {Document|Array|Object} obj
 * @return {Object}
 * @api private
 */
e.toObject=function t(o){var i;if(s||(s=r(12)),null==o)return o;if(o instanceof s)return o.toObject();if(Array.isArray(o)){i=[];var a,u=n(o);try{for(u.s();!(a=u.n()).done;){var c=a.value;i.push(t(c))}}catch(t){u.e(t)}finally{u.f()}return i}if(e.isPOJO(o)){i={};for(var l=0,f=Object.keys(o);l<f.length;l++){var p=f[l];O.has(p)||(i[p]=t(o[p]))}return i}return o},e.isObject=_,
/*!
 * Determines if `arg` is a plain old JavaScript object (POJO). Specifically,
 * `arg` must be an object but not an instance of any special class, like String,
 * ObjectId, etc.
 *
 * `Object.getPrototypeOf()` is part of ES5: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @api private
 * @return {Boolean}
 */
e.isPOJO=function(t){if(null==t||"object"!==i(t))return!1;var e=Object.getPrototypeOf(t);return!e||"Object"===e.constructor.name},
/*!
 * Determines if `obj` is a built-in object like an array, date, boolean,
 * etc.
 */
e.isNativeObject=function(t){return Array.isArray(t)||t instanceof Date||t instanceof Boolean||t instanceof Number||t instanceof String},
/*!
 * Determines if `val` is an object that has no own keys
 */
e.isEmptyObject=function(t){return null!=t&&"object"===i(t)&&0===Object.keys(t).length},
/*!
 * Search if `obj` or any POJOs nested underneath `obj` has a property named
 * `key`
 */
e.hasKey=function(t,r){for(var n=0,o=Object.keys(t);n<o.length;n++){var i=o[n];if(i===r)return!0;if(e.isPOJO(t[i])&&e.hasKey(t[i],r))return!0}return!1},
/*!
 * A faster Array.prototype.slice.call(arguments) alternative
 * @api private
 */
e.args=c,
/*!
 * process.nextTick helper.
 *
 * Wraps `callback` in a try/catch + nextTick.
 *
 * node-mongodb-native has a habit of state corruption when an error is immediately thrown from within a collection callback.
 *
 * @param {Function} callback
 * @api private
 */
e.tick=function(t){if("function"==typeof t)return function(){try{t.apply(this,arguments)}catch(t){d((function(){throw t}))}}},
/*!
 * Returns true if `v` is an object that can be serialized as a primitive in
 * MongoDB
 */
e.isMongooseType=function(t){return t instanceof p||t instanceof f||t instanceof l},e.isMongooseObject=g,
/*!
 * Converts `expires` options of index objects to `expiresAfterSeconds` options for MongoDB.
 *
 * @param {Object} object
 * @api private
 */
e.expires=function(t){var e;t&&"Object"===t.constructor.name&&("expires"in t&&(e="string"!=typeof t.expires?t.expires:Math.round(a(t.expires)/1e3),t.expireAfterSeconds=e,delete t.expires))},
/*!
 * populate helper
 */
e.populate=function(t,r,n,o,s,a,u,c){var l=null;if(1===arguments.length){if(t instanceof h)return[t];if(Array.isArray(t)){var f=p(t);return f.map((function(t){return e.populate(t)[0]}))}l=e.isObject(t)?Object.assign({},t):{path:t}}else l="object"===i(n)?{path:t,select:r,match:n,options:o}:{path:t,select:r,model:n,match:o,options:s,populate:a,justOne:u,count:c};if("string"!=typeof l.path)throw new TypeError("utils.populate: invalid path. Expected string. Got typeof `"+i(t)+"`");return S(l);function p(t){var e=[];return t.forEach((function(t){/[\s]/.test(t.path)?t.path.split(" ").forEach((function(r){var n=Object.assign({},t);n.path=r,e.push(n)})):e.push(t)})),e}},e.getValue=function(t,e,r){return u.get(t,e,"_doc",r)},
/*!
 * Sets the value of `obj` at the given `path`.
 *
 * @param {String} path
 * @param {Anything} val
 * @param {Object} obj
 */
e.setValue=function(t,e,r,n,o){u.set(t,e,r,"_doc",n,o)},
/*!
 * Returns an array of values from object `o`.
 *
 * @param {Object} o
 * @return {Array}
 * @private
 */
e.object={},e.object.vals=function(t){for(var e=Object.keys(t),r=e.length,n=[];r--;)n.push(t[e[r]]);return n},
/*!
 * @see exports.options
 */
e.object.shallowCopy=e.options;
/*!
 * Safer helper for hasOwnProperty checks
 *
 * @param {Object} obj
 * @param {String} prop
 */
var A=Object.prototype.hasOwnProperty;e.object.hasOwnProperty=function(t,e){return A.call(t,e)},
/*!
 * Determine if `val` is null or undefined
 *
 * @return {Boolean}
 */
e.isNullOrUndefined=function(t){return null==t},
/*!
 * ignore
 */
e.array={},
/*!
 * Flattens an array.
 *
 * [ 1, [ 2, 3, [4] ]] -> [1,2,3,4]
 *
 * @param {Array} arr
 * @param {Function} [filter] If passed, will be invoked with each item in the array. If `filter` returns a falsy value, the item will not be included in the results.
 * @return {Array}
 * @private
 */
e.array.flatten=function t(e,r,n){return n||(n=[]),e.forEach((function(e){Array.isArray(e)?t(e,r,n):r&&!r(e)||n.push(e)})),n};
/*!
 * ignore
 */
var $=Object.prototype.hasOwnProperty;e.hasUserDefinedProperty=function(t,r){if(null==t)return!1;if(Array.isArray(r)){var o,s=n(r);try{for(s.s();!(o=s.n()).done;){var a=o.value;if(e.hasUserDefinedProperty(t,a))return!0}}catch(t){s.e(t)}finally{s.f()}return!1}if($.call(t,r))return!0;if("object"===i(t)&&r in t){var u=t[r];return u!==Object.prototype[r]&&u!==Array.prototype[r]}return!1};
/*!
 * ignore
 */
var E=Math.pow(2,32)-1;e.isArrayIndex=function(t){return"number"==typeof t?t>=0&&t<=E:"string"==typeof t&&(!!/^\d+$/.test(t)&&((t=+t)>=0&&t<=E))},
/*!
 * Removes duplicate values from an array
 *
 * [1, 2, 3, 3, 5] => [1, 2, 3, 5]
 * [ ObjectId("550988ba0c19d57f697dc45e"), ObjectId("550988ba0c19d57f697dc45e") ]
 *    => [ObjectId("550988ba0c19d57f697dc45e")]
 *
 * @param {Array} arr
 * @return {Array}
 * @private
 */
e.array.unique=function(t){var e,r=new Set,o=new Set,i=[],s=n(t);try{for(s.s();!(e=s.n()).done;){var a=e.value;if("number"==typeof a||"string"==typeof a||null==a){if(r.has(a))continue;i.push(a),r.add(a)}else if(a instanceof p){if(o.has(a.toString()))continue;i.push(a),o.add(a.toString())}else i.push(a)}}catch(t){s.e(t)}finally{s.f()}return i},
/*!
 * Determines if two buffers are equal.
 *
 * @param {Buffer} a
 * @param {Object} b
 */
e.buffer={},e.buffer.areEqual=function(t,e){if(!l.isBuffer(t))return!1;if(!l.isBuffer(e))return!1;if(t.length!==e.length)return!1;for(var r=0,n=t.length;r<n;++r)if(t[r]!==e[r])return!1;return!0},e.getFunctionName=m,
/*!
 * Decorate buffers
 */
e.decorate=function(t,e){for(var r in e)O.has(r)||(t[r]=e[r])},e.mergeClone=function(t,r){g(r)&&(r=r.toObject({transform:!1,virtuals:!1,depopulate:!0,getters:!1,flattenDecimals:!1}));for(var n,o=Object.keys(r),i=o.length,s=0;s<i;)if(n=o[s++],!O.has(n))if(void 0===t[n])t[n]=e.clone(r[n],{transform:!1,virtuals:!1,depopulate:!0,getters:!1,flattenDecimals:!1});else{var a=r[n];if(null==a||!a.valueOf||a instanceof Date||(a=a.valueOf()),e.isObject(a)){var u=a;g(a)&&!a.isMongooseBuffer&&(u=u.toObject({transform:!1,virtuals:!1,depopulate:!0,getters:!1,flattenDecimals:!1})),a.isMongooseBuffer&&(u=l.from(u)),e.mergeClone(t[n],u)}else t[n]=e.clone(a,{flattenDecimals:!1})}},e.each=function(t,e){var r,o=n(t);try{for(o.s();!(r=o.n()).done;){e(r.value)}}catch(t){o.e(t)}finally{o.f()}},
/*!
 * ignore
 */
e.getOption=function(t){var e,r=Array.prototype.slice.call(arguments,1),o=n(r);try{for(o.s();!(e=o.n()).done;){var i=e.value;if(null!=i[t])return i[t]}}catch(t){o.e(t)}finally{o.f()}return null},
/*!
 * ignore
 */
e.noop=function(){},e.errorToPOJO=function(t){if(!(t instanceof Error))throw new Error("`error` must be `instanceof Error`.");var e,r={},o=n(Object.getOwnPropertyNames(t));try{for(o.s();!(e=o.n()).done;){var i=e.value;r[i]=t[i]}}catch(t){o.e(t)}finally{o.f()}return r}},function(t,e,r){"use strict";(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var n=r(97),o=r(98),i=r(99);function s(){return u.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(t,e){if(s()<e)throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=u.prototype:(null===t&&(t=new u(e)),t.length=e),t}function u(t,e,r){if(!(u.TYPED_ARRAY_SUPPORT||this instanceof u))return new u(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return f(this,t)}return c(this,t,e,r)}function c(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);u.TYPED_ARRAY_SUPPORT?(t=e).__proto__=u.prototype:t=p(t,e);return t}(t,e,r,n):"string"==typeof e?function(t,e,r){"string"==typeof r&&""!==r||(r="utf8");if(!u.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|y(e,r),o=(t=a(t,n)).write(e,r);o!==n&&(t=t.slice(0,o));return t}(t,e,r):function(t,e){if(u.isBuffer(e)){var r=0|h(e.length);return 0===(t=a(t,r)).length||e.copy(t,0,0,r),t}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||(n=e.length)!=n?a(t,0):p(t,e);if("Buffer"===e.type&&i(e.data))return p(t,e.data)}var n;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function l(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function f(t,e){if(l(e),t=a(t,e<0?0:0|h(e)),!u.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function p(t,e){var r=e.length<0?0:0|h(e.length);t=a(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function h(t){if(t>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|t}function y(t,e){if(u.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return L(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return U(t).length;default:if(n)return L(t).length;e=(""+e).toLowerCase(),n=!0}}function d(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return x(this,e,r);case"utf8":case"utf-8":return E(this,e,r);case"ascii":return j(this,e,r);case"latin1":case"binary":return P(this,e,r);case"base64":return $(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function _(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function v(t,e,r,n,o){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=o?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(o)return-1;r=t.length-1}else if(r<0){if(!o)return-1;r=0}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:m(t,e,r,n,o);if("number"==typeof e)return e&=255,u.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):m(t,[e],r,n,o);throw new TypeError("val must be string, number or Buffer")}function m(t,e,r,n,o){var i,s=1,a=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,a/=2,u/=2,r/=2}function c(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(o){var l=-1;for(i=r;i<a;i++)if(c(t,i)===c(e,-1===l?0:i-l)){if(-1===l&&(l=i),i-l+1===u)return l*s}else-1!==l&&(i-=i-l),l=-1}else for(r+u>a&&(r=a-u),i=r;i>=0;i--){for(var f=!0,p=0;p<u;p++)if(c(t,i+p)!==c(e,p)){f=!1;break}if(f)return i}return-1}function g(t,e,r,n){r=Number(r)||0;var o=t.length-r;n?(n=Number(n))>o&&(n=o):n=o;var i=e.length;if(i%2!=0)throw new TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var s=0;s<n;++s){var a=parseInt(e.substr(2*s,2),16);if(isNaN(a))return s;t[r+s]=a}return s}function b(t,e,r,n){return V(L(e,t.length-r),t,r,n)}function w(t,e,r,n){return V(function(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function O(t,e,r,n){return w(t,e,r,n)}function S(t,e,r,n){return V(U(e),t,r,n)}function A(t,e,r,n){return V(function(t,e){for(var r,n,o,i=[],s=0;s<t.length&&!((e-=2)<0);++s)r=t.charCodeAt(s),n=r>>8,o=r%256,i.push(o),i.push(n);return i}(e,t.length-r),t,r,n)}function $(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function E(t,e,r){r=Math.min(t.length,r);for(var n=[],o=e;o<r;){var i,s,a,u,c=t[o],l=null,f=c>239?4:c>223?3:c>191?2:1;if(o+f<=r)switch(f){case 1:c<128&&(l=c);break;case 2:128==(192&(i=t[o+1]))&&(u=(31&c)<<6|63&i)>127&&(l=u);break;case 3:i=t[o+1],s=t[o+2],128==(192&i)&&128==(192&s)&&(u=(15&c)<<12|(63&i)<<6|63&s)>2047&&(u<55296||u>57343)&&(l=u);break;case 4:i=t[o+1],s=t[o+2],a=t[o+3],128==(192&i)&&128==(192&s)&&128==(192&a)&&(u=(15&c)<<18|(63&i)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(l=u)}null===l?(l=65533,f=1):l>65535&&(l-=65536,n.push(l>>>10&1023|55296),l=56320|1023&l),n.push(l),o+=f}return function(t){var e=t.length;if(e<=4096)return String.fromCharCode.apply(String,t);var r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=4096));return r}(n)}e.Buffer=u,e.SlowBuffer=function(t){+t!=t&&(t=0);return u.alloc(+t)},e.INSPECT_MAX_BYTES=50,u.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=s(),u.poolSize=8192,u._augment=function(t){return t.__proto__=u.prototype,t},u.from=function(t,e,r){return c(null,t,e,r)},u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,u.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0})),u.alloc=function(t,e,r){return function(t,e,r,n){return l(e),e<=0?a(t,e):void 0!==r?"string"==typeof n?a(t,e).fill(r,n):a(t,e).fill(r):a(t,e)}(null,t,e,r)},u.allocUnsafe=function(t){return f(null,t)},u.allocUnsafeSlow=function(t){return f(null,t)},u.isBuffer=function(t){return!(null==t||!t._isBuffer)},u.compare=function(t,e){if(!u.isBuffer(t)||!u.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,o=0,i=Math.min(r,n);o<i;++o)if(t[o]!==e[o]){r=t[o],n=e[o];break}return r<n?-1:n<r?1:0},u.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(t,e){if(!i(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=u.allocUnsafe(e),o=0;for(r=0;r<t.length;++r){var s=t[r];if(!u.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(n,o),o+=s.length}return n},u.byteLength=y,u.prototype._isBuffer=!0,u.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)_(this,e,e+1);return this},u.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)_(this,e,e+3),_(this,e+1,e+2);return this},u.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)_(this,e,e+7),_(this,e+1,e+6),_(this,e+2,e+5),_(this,e+3,e+4);return this},u.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?E(this,0,t):d.apply(this,arguments)},u.prototype.equals=function(t){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u.compare(this,t)},u.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},u.prototype.compare=function(t,e,r,n,o){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),e<0||r>t.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&e>=r)return 0;if(n>=o)return-1;if(e>=r)return 1;if(this===t)return 0;for(var i=(o>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0),a=Math.min(i,s),c=this.slice(n,o),l=t.slice(e,r),f=0;f<a;++f)if(c[f]!==l[f]){i=c[f],s=l[f];break}return i<s?-1:s<i?1:0},u.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},u.prototype.indexOf=function(t,e,r){return v(this,t,e,r,!0)},u.prototype.lastIndexOf=function(t,e,r){return v(this,t,e,r,!1)},u.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var o=this.length-e;if((void 0===r||r>o)&&(r=o),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return g(this,t,e,r);case"utf8":case"utf-8":return b(this,t,e,r);case"ascii":return w(this,t,e,r);case"latin1":case"binary":return O(this,t,e,r);case"base64":return S(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return A(this,t,e,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function j(t,e,r){var n="";r=Math.min(t.length,r);for(var o=e;o<r;++o)n+=String.fromCharCode(127&t[o]);return n}function P(t,e,r){var n="";r=Math.min(t.length,r);for(var o=e;o<r;++o)n+=String.fromCharCode(t[o]);return n}function x(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var o="",i=e;i<r;++i)o+=F(t[i]);return o}function T(t,e,r){for(var n=t.slice(e,r),o="",i=0;i<n.length;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}function N(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function k(t,e,r,n,o,i){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function B(t,e,r,n){e<0&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-r,2);o<i;++o)t[r+o]=(e&255<<8*(n?o:1-o))>>>8*(n?o:1-o)}function C(t,e,r,n){e<0&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-r,4);o<i;++o)t[r+o]=e>>>8*(n?o:3-o)&255}function R(t,e,r,n,o,i){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function D(t,e,r,n,i){return i||R(t,0,r,4),o.write(t,e,r,n,23,4),r+4}function M(t,e,r,n,i){return i||R(t,0,r,8),o.write(t,e,r,n,52,8),r+8}u.prototype.slice=function(t,e){var r,n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t),u.TYPED_ARRAY_SUPPORT)(r=this.subarray(t,e)).__proto__=u.prototype;else{var o=e-t;r=new u(o,void 0);for(var i=0;i<o;++i)r[i]=this[i+t]}return r},u.prototype.readUIntLE=function(t,e,r){t|=0,e|=0,r||N(t,e,this.length);for(var n=this[t],o=1,i=0;++i<e&&(o*=256);)n+=this[t+i]*o;return n},u.prototype.readUIntBE=function(t,e,r){t|=0,e|=0,r||N(t,e,this.length);for(var n=this[t+--e],o=1;e>0&&(o*=256);)n+=this[t+--e]*o;return n},u.prototype.readUInt8=function(t,e){return e||N(t,1,this.length),this[t]},u.prototype.readUInt16LE=function(t,e){return e||N(t,2,this.length),this[t]|this[t+1]<<8},u.prototype.readUInt16BE=function(t,e){return e||N(t,2,this.length),this[t]<<8|this[t+1]},u.prototype.readUInt32LE=function(t,e){return e||N(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u.prototype.readUInt32BE=function(t,e){return e||N(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u.prototype.readIntLE=function(t,e,r){t|=0,e|=0,r||N(t,e,this.length);for(var n=this[t],o=1,i=0;++i<e&&(o*=256);)n+=this[t+i]*o;return n>=(o*=128)&&(n-=Math.pow(2,8*e)),n},u.prototype.readIntBE=function(t,e,r){t|=0,e|=0,r||N(t,e,this.length);for(var n=e,o=1,i=this[t+--n];n>0&&(o*=256);)i+=this[t+--n]*o;return i>=(o*=128)&&(i-=Math.pow(2,8*e)),i},u.prototype.readInt8=function(t,e){return e||N(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u.prototype.readInt16LE=function(t,e){e||N(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt16BE=function(t,e){e||N(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt32LE=function(t,e){return e||N(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u.prototype.readInt32BE=function(t,e){return e||N(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u.prototype.readFloatLE=function(t,e){return e||N(t,4,this.length),o.read(this,t,!0,23,4)},u.prototype.readFloatBE=function(t,e){return e||N(t,4,this.length),o.read(this,t,!1,23,4)},u.prototype.readDoubleLE=function(t,e){return e||N(t,8,this.length),o.read(this,t,!0,52,8)},u.prototype.readDoubleBE=function(t,e){return e||N(t,8,this.length),o.read(this,t,!1,52,8)},u.prototype.writeUIntLE=function(t,e,r,n){(t=+t,e|=0,r|=0,n)||k(this,t,e,r,Math.pow(2,8*r)-1,0);var o=1,i=0;for(this[e]=255&t;++i<r&&(o*=256);)this[e+i]=t/o&255;return e+r},u.prototype.writeUIntBE=function(t,e,r,n){(t=+t,e|=0,r|=0,n)||k(this,t,e,r,Math.pow(2,8*r)-1,0);var o=r-1,i=1;for(this[e+o]=255&t;--o>=0&&(i*=256);)this[e+o]=t/i&255;return e+r},u.prototype.writeUInt8=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,1,255,0),u.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},u.prototype.writeUInt16LE=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):B(this,t,e,!0),e+2},u.prototype.writeUInt16BE=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):B(this,t,e,!1),e+2},u.prototype.writeUInt32LE=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):C(this,t,e,!0),e+4},u.prototype.writeUInt32BE=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):C(this,t,e,!1),e+4},u.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e|=0,!n){var o=Math.pow(2,8*r-1);k(this,t,e,r,o-1,-o)}var i=0,s=1,a=0;for(this[e]=255&t;++i<r&&(s*=256);)t<0&&0===a&&0!==this[e+i-1]&&(a=1),this[e+i]=(t/s>>0)-a&255;return e+r},u.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e|=0,!n){var o=Math.pow(2,8*r-1);k(this,t,e,r,o-1,-o)}var i=r-1,s=1,a=0;for(this[e+i]=255&t;--i>=0&&(s*=256);)t<0&&0===a&&0!==this[e+i+1]&&(a=1),this[e+i]=(t/s>>0)-a&255;return e+r},u.prototype.writeInt8=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,1,127,-128),u.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},u.prototype.writeInt16LE=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):B(this,t,e,!0),e+2},u.prototype.writeInt16BE=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):B(this,t,e,!1),e+2},u.prototype.writeInt32LE=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,4,2147483647,-2147483648),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):C(this,t,e,!0),e+4},u.prototype.writeInt32BE=function(t,e,r){return t=+t,e|=0,r||k(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):C(this,t,e,!1),e+4},u.prototype.writeFloatLE=function(t,e,r){return D(this,t,e,!0,r)},u.prototype.writeFloatBE=function(t,e,r){return D(this,t,e,!1,r)},u.prototype.writeDoubleLE=function(t,e,r){return M(this,t,e,!0,r)},u.prototype.writeDoubleBE=function(t,e,r){return M(this,t,e,!1,r)},u.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var o,i=n-r;if(this===t&&r<e&&e<n)for(o=i-1;o>=0;--o)t[o+e]=this[o+r];else if(i<1e3||!u.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)t[o+e]=this[o+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+i),e);return i},u.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!u.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var i;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{var s=u.isBuffer(t)?t:L(new u(t,n).toString()),a=s.length;for(i=0;i<r-e;++i)this[i+e]=s[i%a]}return this};var I=/[^+\/0-9A-Za-z-_]/g;function F(t){return t<16?"0"+t.toString(16):t.toString(16)}function L(t,e){var r;e=e||1/0;for(var n=t.length,o=null,i=[],s=0;s<n;++s){if((r=t.charCodeAt(s))>55295&&r<57344){if(!o){if(r>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&i.push(239,191,189);continue}o=r;continue}if(r<56320){(e-=3)>-1&&i.push(239,191,189),o=r;continue}r=65536+(o-55296<<10|r-56320)}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,r<128){if((e-=1)<0)break;i.push(r)}else if(r<2048){if((e-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function U(t){return n.toByteArray(function(t){if((t=function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}(t).replace(I,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function V(t,e,r,n){for(var o=0;o<n&&!(o+r>=e.length||o>=t.length);++o)e[o+r]=t[o];return o}}).call(this,r(9))},function(t,e,r){"use strict";
/*!
 * Simplified lodash.get to work around the annoying null quirk. See:
 * https://github.com/lodash/lodash/issues/3659
 */function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function i(t,e){return null==t?t:t instanceof Map?t.get(e):t[e]}t.exports=function(t,e,r){var o,s=!1;if("string"==typeof e){if(-1===e.indexOf(".")){var a=i(t,e);return null==a?r:a}o=e.split(".")}else if(s=!0,1===(o=e).length){var u=i(t,o[0]);return null==u?r:u}var c,l=e,f=t,p=n(o);try{for(p.s();!(c=p.n()).done;){var h=c.value;if(null==f)return r;if(!s&&null!=f[l])return f[l];f=i(f,h),s||(l=l.substr(h.length+1))}}catch(t){p.e(t)}finally{p.f()}return null==f?r:f}},function(t,e,r){(function(t){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),r={},n=0;n<e.length;n++)r[e[n]]=Object.getOwnPropertyDescriptor(t,e[n]);return r},i=/%[sdj%]/g;e.format=function(t){if(!m(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(u(arguments[r]));return e.join(" ")}r=1;for(var n=arguments,o=n.length,s=String(t).replace(i,(function(t){if("%%"===t)return"%";if(r>=o)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return t}})),a=n[r];r<o;a=n[++r])_(a)||!w(a)?s+=" "+a:s+=" "+u(a);return s},e.deprecate=function(r,n){if(void 0!==t&&!0===t.noDeprecation)return r;if(void 0===t)return function(){return e.deprecate(r,n).apply(this,arguments)};var o=!1;return function(){if(!o){if(t.throwDeprecation)throw new Error(n);t.traceDeprecation?console.trace(n):console.error(n),o=!0}return r.apply(this,arguments)}};var s,a={};function u(t,r){var n={seen:[],stylize:l};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),d(r)?n.showHidden=r:r&&e._extend(n,r),g(n.showHidden)&&(n.showHidden=!1),g(n.depth)&&(n.depth=2),g(n.colors)&&(n.colors=!1),g(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=c),f(n,t,n.depth)}function c(t,e){var r=u.styles[e];return r?"["+u.colors[r][0]+"m"+t+"["+u.colors[r][1]+"m":t}function l(t,e){return t}function f(t,r,n){if(t.customInspect&&r&&A(r.inspect)&&r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var o=r.inspect(n,t);return m(o)||(o=f(t,o,n)),o}var i=function(t,e){if(g(e))return t.stylize("undefined","undefined");if(m(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}if(v(e))return t.stylize(""+e,"number");if(d(e))return t.stylize(""+e,"boolean");if(_(e))return t.stylize("null","null")}(t,r);if(i)return i;var s=Object.keys(r),a=function(t){var e={};return t.forEach((function(t,r){e[t]=!0})),e}(s);if(t.showHidden&&(s=Object.getOwnPropertyNames(r)),S(r)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return p(r);if(0===s.length){if(A(r)){var u=r.name?": "+r.name:"";return t.stylize("[Function"+u+"]","special")}if(b(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(O(r))return t.stylize(Date.prototype.toString.call(r),"date");if(S(r))return p(r)}var c,l="",w=!1,$=["{","}"];(y(r)&&(w=!0,$=["[","]"]),A(r))&&(l=" [Function"+(r.name?": "+r.name:"")+"]");return b(r)&&(l=" "+RegExp.prototype.toString.call(r)),O(r)&&(l=" "+Date.prototype.toUTCString.call(r)),S(r)&&(l=" "+p(r)),0!==s.length||w&&0!=r.length?n<0?b(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),c=w?function(t,e,r,n,o){for(var i=[],s=0,a=e.length;s<a;++s)x(e,String(s))?i.push(h(t,e,r,n,String(s),!0)):i.push("");return o.forEach((function(o){o.match(/^\d+$/)||i.push(h(t,e,r,n,o,!0))})),i}(t,r,n,a,s):s.map((function(e){return h(t,r,n,a,e,w)})),t.seen.pop(),function(t,e,r){if(t.reduce((function(t,e){return e.indexOf("\n")>=0&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60)return r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1];return r[0]+e+" "+t.join(", ")+" "+r[1]}(c,l,$)):$[0]+l+$[1]}function p(t){return"["+Error.prototype.toString.call(t)+"]"}function h(t,e,r,n,o,i){var s,a,u;if((u=Object.getOwnPropertyDescriptor(e,o)||{value:e[o]}).get?a=u.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):u.set&&(a=t.stylize("[Setter]","special")),x(n,o)||(s="["+o+"]"),a||(t.seen.indexOf(u.value)<0?(a=_(r)?f(t,u.value,null):f(t,u.value,r-1)).indexOf("\n")>-1&&(a=i?a.split("\n").map((function(t){return"  "+t})).join("\n").substr(2):"\n"+a.split("\n").map((function(t){return"   "+t})).join("\n")):a=t.stylize("[Circular]","special")),g(s)){if(i&&o.match(/^\d+$/))return a;(s=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=t.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=t.stylize(s,"string"))}return s+": "+a}function y(t){return Array.isArray(t)}function d(t){return"boolean"==typeof t}function _(t){return null===t}function v(t){return"number"==typeof t}function m(t){return"string"==typeof t}function g(t){return void 0===t}function b(t){return w(t)&&"[object RegExp]"===$(t)}function w(t){return"object"===n(t)&&null!==t}function O(t){return w(t)&&"[object Date]"===$(t)}function S(t){return w(t)&&("[object Error]"===$(t)||t instanceof Error)}function A(t){return"function"==typeof t}function $(t){return Object.prototype.toString.call(t)}function E(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(r){if(g(s)&&(s=t.env.NODE_DEBUG||""),r=r.toUpperCase(),!a[r])if(new RegExp("\\b"+r+"\\b","i").test(s)){var n=t.pid;a[r]=function(){var t=e.format.apply(e,arguments);console.error("%s %d: %s",r,n,t)}}else a[r]=function(){};return a[r]},e.inspect=u,u.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},u.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},e.isArray=y,e.isBoolean=d,e.isNull=_,e.isNullOrUndefined=function(t){return null==t},e.isNumber=v,e.isString=m,e.isSymbol=function(t){return"symbol"===n(t)},e.isUndefined=g,e.isRegExp=b,e.isObject=w,e.isDate=O,e.isError=S,e.isFunction=A,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"===n(t)||void 0===t},e.isBuffer=r(102);var j=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function P(){var t=new Date,e=[E(t.getHours()),E(t.getMinutes()),E(t.getSeconds())].join(":");return[t.getDate(),j[t.getMonth()],e].join(" ")}function x(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",P(),e.format.apply(e,arguments))},e.inherits=r(103),e._extend=function(t,e){if(!e||!w(e))return t;for(var r=Object.keys(e),n=r.length;n--;)t[r[n]]=e[r[n]];return t};var T="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function N(t,e){if(!t){var r=new Error("Promise was rejected with a falsy value");r.reason=t,t=r}return e(t)}e.promisify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');if(T&&t[T]){var e;if("function"!=typeof(e=t[T]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,T,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,r,n=new Promise((function(t,n){e=t,r=n})),o=[],i=0;i<arguments.length;i++)o.push(arguments[i]);o.push((function(t,n){t?r(t):e(n)}));try{t.apply(this,o)}catch(t){r(t)}return n}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),T&&Object.defineProperty(e,T,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,o(t))},e.promisify.custom=T,e.callbackify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');function r(){for(var r=[],n=0;n<arguments.length;n++)r.push(arguments[n]);var o=r.pop();if("function"!=typeof o)throw new TypeError("The last argument must be of type Function");var i=this,s=function(){return o.apply(i,arguments)};e.apply(this,r).then((function(e){t.nextTick(s,null,e)}),(function(e){t.nextTick(N,e,s)}))}return Object.setPrototypeOf(r,Object.getPrototypeOf(e)),Object.defineProperties(r,o(e)),r}}).call(this,r(11))},function(t,e,r){"use strict";var n=r(14);
/*!
 * Module exports.
 */t.exports=n,n.messages=r(129),n.Messages=n.messages,n.DocumentNotFoundError=r(130),n.CastError=r(13),n.ValidationError=r(32),n.ValidatorError=r(72),n.VersionError=r(131),n.ParallelSaveError=r(132),n.OverwriteModelError=r(133),n.MissingSchemaError=r(134),n.DivergentArrayError=r(135),n.StrictModeError=r(33)},function(t,e,r){"use strict";(function(n){
/*!
 * Module dependencies.
 */
function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i=r(5),s=r(7),a=r(51),u=r(73),c=r(3),l=r(136),f=r(22),p=r(0).schemaTypeSymbol,h=r(4),y=r(1),d=r(0).validatorErrorSymbol,_=r(0).documentIsModified,v=r(0).populateModelSymbol,m=i.CastError,g=i.ValidatorError;function b(t,e,r){this[p]=!0,this.path=t,this.instance=r,this.validators=[],this.getters=this.constructor.hasOwnProperty("getters")?this.constructor.getters.slice():[],this.setters=[],this.splitPath(),e=e||{};for(var n=this.constructor.defaultOptions||{},i=0,a=Object.keys(n);i<a.length;i++){var u=a[i];n.hasOwnProperty(u)&&!e.hasOwnProperty(u)&&(e[u]=n[u])}null==e.select&&delete e.select;var c=this.OptionsConstructor||s;this.options=new c(e),this._index=null,y.hasUserDefinedProperty(this.options,"immutable")&&(this.$immutable=this.options.immutable,l(this));for(var f=0,h=Object.keys(this.options);f<h.length;f++){var d=h[f];if("cast"!==d){if(y.hasUserDefinedProperty(this.options,d)&&"function"==typeof this[d]){if("index"===d&&this._index){if(!1===e.index){var _=this._index;if("object"===o(_)&&null!=_){if(_.unique)throw new Error('Path "'+this.path+'" may not have `index` set to false and `unique` set to true');if(_.sparse)throw new Error('Path "'+this.path+'" may not have `index` set to false and `sparse` set to true')}this._index=!1}continue}var v=e[d];if("default"===d){this.default(v);continue}var m=Array.isArray(v)?v:[v];this[d].apply(this,m)}}else this.castFunction(this.options[d])}Object.defineProperty(this,"$$context",{enumerable:!1,configurable:!1,writable:!0,value:null})}
/*!
 * The class that Mongoose uses internally to instantiate this SchemaType's `options` property.
 */b.prototype.OptionsConstructor=s,
/*!
 * ignore
 */
b.prototype.splitPath=function(){return null!=this._presplitPath?this._presplitPath:null!=this.path?(this._presplitPath=-1===this.path.indexOf(".")?[this.path]:this.path.split("."),this._presplitPath):void 0},b.cast=function(t){return 0===arguments.length||(!1===t&&(t=function(t){return t}),this._cast=t),this._cast},b.prototype.castFunction=function(t){return 0===arguments.length||(!1===t&&(t=this.constructor._defaultCaster||function(t){return t}),this._castFunction=t),this._castFunction},b.prototype.cast=function(){throw new Error("Base SchemaType class does not implement a `cast()` function")},b.set=function(t,e){this.hasOwnProperty("defaultOptions")||(this.defaultOptions=Object.assign({},this.defaultOptions)),this.defaultOptions[t]=e},b.get=function(t){this.getters=this.hasOwnProperty("getters")?this.getters:[],this.getters.push(t)},b.prototype.default=function(t){if(1===arguments.length){if(void 0===t)return void(this.defaultValue=void 0);if(null!=t&&t.instanceOfSchema)throw new i("Cannot set default value of path `"+this.path+"` to a mongoose Schema instance.");return this.defaultValue=t,this.defaultValue}return arguments.length>1&&(this.defaultValue=y.args(arguments)),this.defaultValue},b.prototype.index=function(t){return this._index=t,y.expires(this._index),this},b.prototype.unique=function(t){if(!1===this._index){if(!t)return;throw new Error('Path "'+this.path+'" may not have `index` set to false and `unique` set to true')}return null==this._index||!0===this._index?this._index={}:"string"==typeof this._index&&(this._index={type:this._index}),this._index.unique=t,this},b.prototype.text=function(t){if(!1===this._index){if(!t)return;throw new Error('Path "'+this.path+'" may not have `index` set to false and `text` set to true')}return null===this._index||void 0===this._index||"boolean"==typeof this._index?this._index={}:"string"==typeof this._index&&(this._index={type:this._index}),this._index.text=t,this},b.prototype.sparse=function(t){if(!1===this._index){if(!t)return;throw new Error('Path "'+this.path+'" may not have `index` set to false and `sparse` set to true')}return null==this._index||"boolean"==typeof this._index?this._index={}:"string"==typeof this._index&&(this._index={type:this._index}),this._index.sparse=t,this},b.prototype.immutable=function(t){return this.$immutable=t,l(this),this},b.prototype.transform=function(t){return this.options.transform=t,this},b.prototype.set=function(t){if("function"!=typeof t)throw new TypeError("A setter must be a function.");return this.setters.push(t),this},b.prototype.get=function(t){if("function"!=typeof t)throw new TypeError("A getter must be a function.");return this.getters.push(t),this},b.prototype.validate=function(t,e,r){var n,s,a,u;if("function"==typeof t||t&&"RegExp"===y.getFunctionName(t.constructor))return"function"==typeof e?(n={validator:t,message:e}).type=r||"user defined":e instanceof Object&&!r?((n=y.clone(e)).message||(n.message=n.msg),n.validator=t,n.type=n.type||"user defined"):(null==e&&(e=i.messages.general.default),r||(r="user defined"),n={message:e,type:r,validator:t}),n.isAsync&&w(),this.validators.push(n),this;for(s=0,a=arguments.length;s<a;s++){if(u=arguments[s],!y.isPOJO(u)){var c="Invalid validator. Received ("+o(u)+") "+u+". See http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate";throw new Error(c)}this.validate(u.validator,u)}return this};
/*!
 * ignore
 */
var w=h.deprecate((function(){}),"Mongoose: the `isAsync` option for custom validators is deprecated. Make your async validators return a promise instead: https://mongoosejs.com/docs/validation.html#async-custom-validators");
/*!
 * ignore
 */
function O(t){return this.castForQuery(t)}
/*!
 * ignore
 */
/*!
 * Just like handleArray, except also allows `[]` because surprisingly
 * `$in: [1, []]` works fine
 */
function S(t){var e=this;return Array.isArray(t)?t.map((function(t){return Array.isArray(t)&&0===t.length?t:e.castForQuery(t)})):[this.castForQuery(t)]}
/*!
 * ignore
 */b.prototype.required=function(t,e){var r={};if(arguments.length>0&&null==t)return this.validators=this.validators.filter((function(t){return t.validator!==this.requiredValidator}),this),this.isRequired=!1,delete this.originalRequiredValue,this;if("object"===o(t)&&(e=(r=t).message||e,t=t.isRequired),!1===t)return this.validators=this.validators.filter((function(t){return t.validator!==this.requiredValidator}),this),this.isRequired=!1,delete this.originalRequiredValue,this;var n=this;this.isRequired=!0,this.requiredValidator=function(e){var r=c(this,"$__.cachedRequired");if(null!=r&&!this.$__isSelected(n.path)&&!this[_](n.path))return!0;if(null!=r&&n.path in r){var o=!r[n.path]||n.checkRequired(e,this);return delete r[n.path],o}return"function"==typeof t&&!t.apply(this)||n.checkRequired(e,this)},this.originalRequiredValue=t,"string"==typeof t&&(e=t,t=void 0);var s=e||i.messages.general.required;return this.validators.unshift(Object.assign({},r,{validator:this.requiredValidator,message:s,type:"required"})),this},b.prototype.ref=function(t){return this.options.ref=t,this},b.prototype.getDefault=function(t,e){var r="function"==typeof this.defaultValue?this.defaultValue.call(t):this.defaultValue;if(null!=r){"object"!==o(r)||this.options&&this.options.shared||(r=y.clone(r));var n=this.applySetters(r,t,e);return n&&n.$isSingleNested&&(n.$__parent=t),n}return r},
/*!
 * Applies setters without casting
 *
 * @api private
 */
b.prototype._applySetters=function(t,e,r){var n=t;if(r)return n;for(var o=this.setters,i=o.length-1;i>=0;i--)n=o[i].call(e,n,this);return n},
/*!
 * ignore
 */
b.prototype._castNullish=function(t){return t},b.prototype.applySetters=function(t,e,r,n,o){var i=this._applySetters(t,e,r,n,o);return null==i?this._castNullish(i):i=this.cast(i,e,r,n,o)},b.prototype.applyGetters=function(t,e){var r=t,n=this.getters,o=n.length;if(0===o)return r;for(var i=0;i<o;++i)r=n[i].call(e,r,this);return r},b.prototype.select=function(t){return this.selected=!!t,this},b.prototype.doValidate=function(t,e,r,n){var i=!1,s=this.path,a=this.validators.filter((function(t){return null!=t&&"object"===o(t)})),u=a.length;if(!u)return e(null);var c=this;function l(t,r){if(!i)if(void 0===t||t)--u<=0&&f((function(){e(null)}));else{var n=r.ErrorConstructor||g;(i=new n(r))[d]=!0,f((function(){e(i)}))}}a.forEach((function(e){if(!i){var o,a=e.validator,u=y.clone(e);if(u.path=n&&n.path?n.path:s,u.value=t,a instanceof RegExp)l(a.test(t),u);else if("function"==typeof a)if(void 0!==t||a===c.requiredValidator)if(u.isAsync)!
/*!
 * Handle async validators
 */
function(t,e,r,n,o){var i=!1,s=t.call(e,r,(function(t,e){i||(i=!0,e&&(n.message=e),o(t,n))}));"boolean"==typeof s?(i=!0,o(s,n)):s&&"function"==typeof s.then&&s.then((function(t){i||(i=!0,o(t,n))}),(function(t){i||(i=!0,n.reason=t,n.message=t.message,o(!1,n))}))}(a,r,t,u,l);else{try{o=u.propsParameter?a.call(r,t,u):a.call(r,t)}catch(t){o=!1,u.reason=t,t.message&&(u.message=t.message)}null!=o&&"function"==typeof o.then?o.then((function(t){l(t,u)}),(function(t){u.reason=t,u.message=t.message,l(o=!1,u)})):l(o,u)}else l(!0,u)}}))},b.prototype.doValidateSync=function(t,e,r){var n=this.path;if(!this.validators.length)return null;var i=this.validators;if(void 0===t){if(!(this.validators.length>0&&"required"===this.validators[0].type))return null;i=[this.validators[0]]}var s=null;return i.forEach((function(i){if(!s&&null!=i&&"object"===o(i)){var u,c=i.validator,l=y.clone(i);if(l.path=r&&r.path?r.path:n,l.value=t,!c.isAsync)if(c instanceof RegExp)a(c.test(t),l);else if("function"==typeof c){try{u=l.propsParameter?c.call(e,t,l):c.call(e,t)}catch(t){u=!1,l.reason=t}null!=u&&"function"==typeof u.then||a(u,l)}}})),s;function a(t,e){if(!s&&void 0!==t&&!t){var r=e.ErrorConstructor||g;(s=new r(e))[d]=!0}}},b._isRef=function(t,e,r,o){var i=o&&t.options&&(t.options.ref||t.options.refPath);if(!i&&r&&null!=r.$__){var s=r.$__fullPath(t.path);i=(r.ownerDocument?r.ownerDocument():r).populated(s)||r.populated(t.path)}return!!i&&(null==e||(!(n.isBuffer(e)||"Binary"===e._bsontype||!y.isObject(e))||o))},
/*!
 * ignore
 */
b.prototype._castRef=function(t,e,r){if(null==t)return t;if(null!=t.$__)return t.$__.wasPopulated=!0,t;if(n.isBuffer(t)||!y.isObject(t)){if(r)return t;throw new m(this.instance,t,this.path,null,this)}var o=e.$__fullPath(this.path),i=(e.ownerDocument?e.ownerDocument():e).populated(o,!0),s=t;return e.$__.populated&&e.$__.populated[o]&&e.$__.populated[o].options&&e.$__.populated[o].options.options&&e.$__.populated[o].options.options.lean||((s=new i.options[v](t)).$__.wasPopulated=!0),s},b.prototype.$conditionalHandlers={$all:function(t){var e=this;return Array.isArray(t)?t.map((function(t){return e.castForQuery(t)})):[this.castForQuery(t)]},$eq:O,$in:S,$ne:O,$nin:S,$exists:a,$type:u},
/*!
 * Wraps `castForQuery` to handle context
 */
b.prototype.castForQueryWrapper=function(t){if(this.$$context=t.context,"$conditional"in t){var e=this.castForQuery(t.$conditional,t.val);return this.$$context=null,e}if(t.$skipQueryCastForUpdate||t.$applySetters){var r=this._castForQuery(t.val);return this.$$context=null,r}var n=this.castForQuery(t.val);return this.$$context=null,n},b.prototype.castForQuery=function(t,e){var r;if(2===arguments.length){if(!(r=this.$conditionalHandlers[t]))throw new Error("Can't use "+t);return r.call(this,e)}return e=t,this._castForQuery(e)},
/*!
 * Internal switch for runSetters
 *
 * @api private
 */
b.prototype._castForQuery=function(t){return this.applySetters(t,this.$$context)},b.checkRequired=function(t){return arguments.length>0&&(this._checkRequired=t),this._checkRequired},b.prototype.checkRequired=function(t){return null!=t},
/*!
 * ignore
 */
b.prototype.clone=function(){var t=Object.assign({},this.options),e=new this.constructor(this.path,t,this.instance);return e.validators=this.validators.slice(),void 0!==this.requiredValidator&&(e.requiredValidator=this.requiredValidator),void 0!==this.defaultValue&&(e.defaultValue=this.defaultValue),void 0!==this.$immutable&&void 0===this.options.immutable&&(e.$immutable=this.$immutable,l(e)),void 0!==this._index&&(e._index=this._index),void 0!==this.selected&&(e.selected=this.selected),void 0!==this.isRequired&&(e.isRequired=this.isRequired),void 0!==this.originalRequiredValue&&(e.originalRequiredValue=this.originalRequiredValue),e.getters=this.getters.slice(),e.setters=this.setters.slice(),e},
/*!
 * Module exports.
 */
t.exports=e=b,e.CastError=m,e.ValidatorError=g}).call(this,r(2).Buffer)},function(t,e,r){"use strict";var n=r(29),o=function t(e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),null==e)return this;Object.assign(this,n(e))},i=r(8);Object.defineProperty(o.prototype,"type",i),Object.defineProperty(o.prototype,"validate",i),Object.defineProperty(o.prototype,"cast",i),Object.defineProperty(o.prototype,"required",i),Object.defineProperty(o.prototype,"default",i),Object.defineProperty(o.prototype,"ref",i),Object.defineProperty(o.prototype,"select",i),Object.defineProperty(o.prototype,"index",i),Object.defineProperty(o.prototype,"unique",i),Object.defineProperty(o.prototype,"immutable",i),Object.defineProperty(o.prototype,"sparse",i),Object.defineProperty(o.prototype,"text",i),Object.defineProperty(o.prototype,"transform",i),t.exports=o},function(t,e,r){"use strict";t.exports=Object.freeze({enumerable:!0,configurable:!0,writable:!0,value:void 0})},function(t,e){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"===("undefined"==typeof window?"undefined":r(window))&&(n=window)}t.exports=n},function(t,e,r){"use strict";var n=r(15).get().ObjectId,o=r(0).objectIdSymbol;
/*!
 * Getter for convenience with populate, see gh-6115
 */
Object.defineProperty(n.prototype,"_id",{enumerable:!1,configurable:!0,get:function(){return this}}),n.prototype[o]=!0,t.exports=n},function(t,e){var r,n,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(t){r=i}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(t){n=s}}();var u,c=[],l=!1,f=-1;function p(){l&&u&&(l=!1,u.length?c=u.concat(c):f=-1,c.length&&h())}function h(){if(!l){var t=a(p);l=!0;for(var e=c.length;e;){for(u=c,c=[];++f<e;)u&&u[f].run();f=-1,e=c.length}u=null,l=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function y(t,e){this.fun=t,this.array=e}function d(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];c.push(new y(t,e)),1!==c.length||l||a(h)},y.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=d,o.addListener=d,o.once=d,o.off=d,o.removeListener=d,o.removeAllListeners=d,o.emit=d,o.prependListener=d,o.prependOnceListener=d,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e,r){"use strict";(function(e){
/*!
 * Module dependencies.
 */
function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var a,u,c,l=r(19).EventEmitter,f=r(111),p=r(5),h=r(26),y=r(74),d=r(137),_=r(138),v=r(53),m=r(33),g=r(32),b=r(72),w=r(54),O=r(25),S=r(86),A=r(57).compile,$=r(57).defineKey,E=r(173).flatten,j=r(3),P=r(174),x=r(90),T=r(175),N=r(22),k=r(58),B=r(176),C=r(4).inspect,R=r(17).internalToObjectOptions,D=r(49),M=r(177),I=r(1),F=r(179),L=I.clone,U=I.deepEqual,V=I.isMongooseObject,q=Symbol("mongoose.Array#atomicsBackup"),W=r(0).arrayAtomicsSymbol,H=r(0).documentArrayParent,Y=r(0).documentIsModified,K=r(0).documentModifiedPaths,z=r(0).documentSchemaSymbol,Q=r(0).getSymbol,J=r(0).populateModelSymbol,G=r(0).scopeSymbol,X=r(34).schemaMixedSymbol,Z=I.specialProperties;function tt(t,e,r,n){var i=this;"object"===s(r)&&null!=r&&(r=(n=r).skipId),n=Object.assign({},n);var a=j(n,"defaults",!0);if(n.defaults=a,null==this.$__schema){var u=I.isObject(e)&&!e.instanceOfSchema?new v(e):e;this.$__setSchema(u),e=r,r=n,n=arguments[4]||{}}if(this.$__=new f,this.$__.emitter=new l,this.isNew=!("isNew"in n)||n.isNew,this.errors=void 0,this.$__.$options=n||{},this.$locals={},this.$op=null,null!=t&&"object"!==s(t))throw new d(t,"obj","Document");var c=this.$__schema;"boolean"==typeof e||"throw"===e?(this.$__.strictMode=e,e=void 0):(this.$__.strictMode=c.options.strict,this.$__.selected=e);var p,h=c.requiredPaths(!0),y=o(h);try{for(y.s();!(p=y.n()).done;){var _=p.value;this.$__.activePaths.require(_)}}catch(t){y.e(t)}finally{y.f()}this.$__.emitter.setMaxListeners(0);var m=null;I.isPOJO(e)&&(m=B(e));var g=!1===m&&e?rt(e):{};if(null==this._doc&&(this.$__buildDoc(t,e,r,m,g,!1),a&&nt(this,e,r,m,g,!0,{isNew:this.isNew})),t&&(this.$__original_set?this.$__original_set(t,void 0,!0):this.$set(t,void 0,!0),t instanceof tt&&(this.isNew=t.isNew)),n.willInit&&a?l.prototype.once.call(this,"init",(function(){nt(i,e,r,m,g,!1,n.skipDefaults,i.isNew)})):a&&nt(this,e,r,m,g,!1,n.skipDefaults,this.isNew),this.$__._id=this._id,!this.$__.strictMode&&t){var b=this,w=Object.keys(this._doc);w.forEach((function(t){t in c.tree||$(t,null,b)}))}ut(this)}
/*!
 * Document exposes the NodeJS event emitter API, so you can use
 * `on`, `once`, etc.
 */for(var et in I.each(["on","once","emit","listeners","removeListener","setMaxListeners","removeAllListeners","addListener"],(function(t){tt.prototype[t]=function(){return this.$__.emitter[t].apply(this.$__.emitter,arguments)}})),tt.prototype.constructor=tt,l.prototype)tt[et]=l.prototype[et];
/*!
 * ignore
 */
function rt(t){for(var e={},r=0,n=Object.keys(t);r<n.length;r++){var i,s=[],a=o(n[r].split("."));try{for(a.s();!(i=a.n()).done;){var u=i.value;s.push(u),e[s.join(".")]=1}}catch(t){a.e(t)}finally{a.f()}}return e}
/*!
 * ignore
 */function nt(t,e,r,n,o,i,s){for(var a=Object.keys(t.$__schema.paths),u=a.length,c=0;c<u;++c){var l=void 0,f="",p=a[c];if("_id"!==p||!r)for(var h=t.$__schema.paths[p],y=h.splitPath(),d=y.length,_=!1,v=t._doc,m=0;m<d&&null!=v;++m){var g=y[m];if(f+=(f.length?".":"")+g,!0===n){if(f in e)break}else if(!1===n&&e&&!_)if(f in e)_=!0;else if(!o[f])break;if(m===d-1){if(void 0!==v[g])break;if("function"==typeof h.defaultValue){if(!h.defaultValue.$runBeforeSetters&&i)break;if(h.defaultValue.$runBeforeSetters&&!i)break}else if(!i)continue;if(s&&s[f])break;if(e&&null!==n){if(!0===n){if(p in e)continue;try{l=h.getDefault(t,!1)}catch(e){t.invalidate(p,e);break}void 0!==l&&(v[g]=l,t.$__.activePaths.default(p))}else if(_){try{l=h.getDefault(t,!1)}catch(e){t.invalidate(p,e);break}void 0!==l&&(v[g]=l,t.$__.activePaths.default(p))}}else{try{l=h.getDefault(t,!1)}catch(e){t.invalidate(p,e);break}void 0!==l&&(v[g]=l,t.$__.activePaths.default(p))}}else v=v[g]}}}function ot(t){if(null==t)return!0;if("object"!==s(t)||Array.isArray(t))return!1;for(var e=0,r=Object.keys(t);e<r.length;e++){if(!ot(t[r[e]]))return!1}return!0}
/*!
 * ignore
 */
function it(t){var e={};!
/*!
 * ignore
 */
function(t){Object.keys(t.$__.activePaths.states.require).forEach((function(e){var r=t.$__schema.path(e);null!=r&&"function"==typeof r.originalRequiredValue&&(t.$__.cachedRequired[e]=r.originalRequiredValue.call(t,t))}))}(t);var r=new Set(Object.keys(t.$__.activePaths.states.require).filter((function(e){return!(!t.$__isSelected(e)&&!t.isModified(e))&&(!(e in t.$__.cachedRequired)||t.$__.cachedRequired[e])})));function n(t){r.add(t)}Object.keys(t.$__.activePaths.states.init).forEach(n),Object.keys(t.$__.activePaths.states.modify).forEach(n),Object.keys(t.$__.activePaths.states.default).forEach(n);var i,s=t.$getAllSubdocs(),a=t.modifiedPaths(),u=o(s);try{for(u.s();!(i=u.n()).done;){var c=i.value;if(c.$basePath){var l,f=o(r);try{for(f.s();!(l=f.n()).done;){var p=l.value;(null===p||p.startsWith(c.$basePath+"."))&&r.delete(p)}}catch(t){f.e(t)}finally{f.f()}!t.isModified(c.$basePath,a)||t.isDirectModified(c.$basePath)||t.$isDefault(c.$basePath)||(r.add(c.$basePath),e[c.$basePath]=!0)}}}catch(t){u.e(t)}finally{u.f()}var h,y=o(r);try{for(y.s();!(h=y.n()).done;){var d=h.value,_=t.$__schema.path(d);if(_&&_.$isMongooseArray&&(!_.$isMongooseDocumentArray||j(_,"schemaOptions.required")))v(t.$__getValue(d),r,d)}}catch(t){y.e(t)}finally{y.f()}function v(t,e,r){if(null!=t)for(var n=t.length,o=0;o<n;++o)Array.isArray(t[o])?v(t[o],e,r+"."+o):e.add(r+"."+o)}var m,g={skipArrays:!0},b=o(r);try{for(b.s();!(m=b.n()).done;){var w=m.value;if(t.$__schema.nested[w]){var O=t.$__getValue(w);V(O)&&(O=O.toObject({transform:!1}));var S=E(O,w,g,t.$__schema);Object.keys(S).forEach(n)}}}catch(t){b.e(t)}finally{b.f()}var A,$=o(r);try{for($.s();!(A=$.n()).done;){var P=A.value;if(t.$__schema.singleNestedPaths.hasOwnProperty(P))r.delete(P);else{var x=t.$__schema.path(P);if(x&&x.$isSchemaMap){var T=t.$__getValue(P);if(null!=T){var N,k=o(T.keys());try{for(k.s();!(N=k.n()).done;){var B=N.value;r.add(P+"."+B)}}catch(t){k.e(t)}finally{k.f()}}}}}}catch(t){$.e(t)}finally{$.f()}return[r=Array.from(r),e]}
/*!
 * ignore
 */
/*!
 * ignore
 */
function st(t,e){var r,n=new Set(e),i=new Map([]),s=o(e);try{for(s.s();!(r=s.n()).done;){var a=r.value;if(-1!==a.indexOf("."))for(var u=a.split("."),c=u[0],l=1;l<u.length;++l)i.set(c,a),c=c+"."+u[l]}}catch(t){s.e(t)}finally{s.f()}var f,p=[],h=o(t);try{for(h.s();!(f=h.n()).done;){var y=f.value;n.has(y)?p.push(y):i.has(y)&&p.push(i.get(y))}}catch(t){h.e(t)}finally{h.f()}return p}
/*!
 * ignore
 */function at(t,e){return e=new Set(e),t=t.filter((function(t){return!e.has(t)}))}
/*!
 * Runs queued functions
 */
function ut(t){var e=t.$__schema&&t.$__schema.callQueue;if(e.length){var r,n=o(e);try{for(n.s();!(r=n.n()).done;){var i=r.value;"pre"!==i[0]&&"post"!==i[0]&&"on"!==i[0]&&t[i[0]].apply(t,i[1])}}catch(t){n.e(t)}finally{n.f()}}}
/*!
 * ignore
 */
/*!
 * Applies virtuals properties to `json`.
 */
function ct(t,e,r,n){var o,i,s,a=t.$__schema,u=Object.keys(a.virtuals),c=u.length,l=c,f=t._doc,p=j(n,"aliases",!0),h=null;if(Array.isArray(r.virtuals))h=new Set(r.virtuals);else if(r.virtuals&&r.virtuals.pathsToSkip){h=new Set(u);for(var y=0;y<r.virtuals.pathsToSkip.length;y++)h.has(r.virtuals.pathsToSkip[y])&&h.delete(r.virtuals.pathsToSkip[y])}if(!f)return e;for(r=r||{},c=0;c<l;++c)if(o=u[c],(null==h||h.has(o))&&(p||!a.aliases.hasOwnProperty(o))){if(i=o,null!=r.path){if(!o.startsWith(r.path+"."))continue;i=o.substr(r.path.length+1)}var d=i.split(".");if(void 0!==(s=L(t.get(o),r))){var _=d.length;f=e;for(var v=0;v<_-1;++v)f[d[v]]=f[d[v]]||{},f=f[d[v]];f[d[_-1]]=s}}return e}
/*!
 * Applies virtuals properties to `json`.
 *
 * @param {Document} self
 * @param {Object} json
 * @return {Object} `json`
 */function lt(t,e){if(F(e))throw new Error("`transform` function must be synchronous, but the transform on path `"+t+"` returned a promise.")}
/*!
 * ignore
 */tt.prototype.$__schema,tt.prototype.schema,Object.defineProperty(tt.prototype,"$locals",{configurable:!1,enumerable:!1,writable:!0}),tt.prototype.isNew,tt.prototype.id,tt.prototype.errors,tt.prototype.$op,tt.prototype.$__buildDoc=function(t,e,r,n,o){for(var i={},s=Object.keys(this.$__schema.paths).filter((function(t){return!t.includes("$*")})),a=s.length,u=0;u<a;++u){var c=s[u];if("_id"===c){if(r)continue;if(t&&"_id"in t)continue}for(var l=this.$__schema.paths[c].splitPath(),f=l.length,p=f-1,h="",y=i,d=!1,_=0;_<f;++_){var v=l[_];if(h+=(h.length?".":"")+v,!0===n){if(h in e)break}else if(!1===n&&e&&!d)if(h in e)d=!0;else if(!o[h])break;_<p&&(y=y[v]||(y[v]={}))}}this._doc=i},
/*!
 * Converts to POJO when you use the document for querying
 */
tt.prototype.toBSON=function(){return this.toObject(R)},tt.prototype.init=function(t,e,r){return"function"==typeof e&&(r=e,e=null),this.$__init(t,e),r&&r(null,this),this},
/*!
 * ignore
 */
tt.prototype.$__init=function(t,e){if(this.isNew=!1,this.$init=!0,e=e||{},null!=t._id&&e.populated&&e.populated.length){var r,n=String(t._id),i=o(e.populated);try{for(i.s();!(r=i.n()).done;){var s=r.value;if(s.isVirtual?this.populated(s.path,I.getValue(s.path,t),s):this.populated(s.path,s._docs[n],s),null!=s._childDocs){var a,u=o(s._childDocs);try{for(u.s();!(a=u.n()).done;){var c=a.value;null!=c&&null!=c.$__&&(c.$__.parent=this)}}catch(t){u.e(t)}finally{u.f()}s._childDocs=[]}}}catch(t){i.e(t)}finally{i.f()}}
/*!
 * Init helper.
 *
 * @param {Object} self document instance
 * @param {Object} obj raw mongodb doc
 * @param {Object} doc object we are initializing
 * @api private
 */
return function t(e,r,n,o,i){i=i||"";var s,a,u,c=Object.keys(r),l=c.length,f=0;for(;f<l;)p(f++);function p(l){if(u=c[l],a=i+u,s=e.$__schema.path(a),!e.$__schema.$isRootDiscriminator||e.$__isSelected(a))if(!s&&I.isPOJO(r[u]))n[u]||(n[u]={}),t(e,r[u],n[u],o,a+".");else if(s){if(null===r[u])n[u]=s._castNullish(null);else if(void 0!==r[u]){var f=(r[u].$__||{}).wasPopulated||null;if(s&&!f)try{n[u]=s.cast(r[u],e,!0)}catch(t){e.invalidate(t.path,new b({path:t.path,message:t.message,type:"cast",value:t.value,reason:t}))}else n[u]=r[u]}e.isModified(a)||e.$__.activePaths.init(a)}else n[u]=r[u]}}(this,t,this._doc,e),
/*!
 * If populating a path within a document array, make sure each
 * subdoc within the array knows its subpaths are populated.
 *
 * ####Example:
 *     const doc = await Article.findOne().populate('comments.author');
 *     doc.comments[0].populated('author'); // Should be set
 */
function(t,e){if(null==t._id||null==e||0===e.length)return;var r,n=String(t._id),i=o(e);try{for(i.s();!(r=i.n()).done;){var s=r.value;if(!s.isVirtual)for(var a=s.path.split("."),u=0;u<a.length-1;++u){var c=a.slice(0,u+1).join("."),l=a.slice(u+1).join("."),f=t.get(c);if(null!=f&&f.isMongooseDocumentArray){for(var p=0;p<f.length;++p)f[p].populated(l,null==s._docs[n]?[]:s._docs[n][p],s);break}}}}catch(t){i.e(t)}finally{i.f()}}(this,e.populated),this.emit("init",this),this.constructor.emit("init",this),this.$__._id=this._id,this},tt.prototype.update=function(){var t=I.args(arguments);t.unshift({_id:this._id});var e=this.constructor.update.apply(this.constructor,t);return null!=this.$session()&&("session"in e.options||(e.options.session=this.$session())),e},tt.prototype.updateOne=function(t,e,r){var n=this,o=this.constructor.updateOne({_id:this._id},t,e);return o.pre((function(t){n.constructor._middleware.execPre("updateOne",n,[n],t)})),o.post((function(t){n.constructor._middleware.execPost("updateOne",n,[n],{},t)})),null!=this.$session()&&("session"in o.options||(o.options.session=this.$session())),null!=r?o.exec(r):o},tt.prototype.replaceOne=function(){var t=I.args(arguments);return t.unshift({_id:this._id}),this.constructor.replaceOne.apply(this.constructor,t)},tt.prototype.$session=function(t){if(0===arguments.length)return null!=this.$__.session&&this.$__.session.hasEnded?(this.$__.session=null,null):this.$__.session;if(null!=t&&t.hasEnded)throw new p("Cannot set a document's session to a session that has ended. Make sure you haven't called `endSession()` on the session you are passing to `$session()`.");if(this.$__.session=t,!this.ownerDocument){var e,r=this.$getAllSubdocs(),n=o(r);try{for(n.s();!(e=n.n()).done;){var i=e.value;i.$session(t)}}catch(t){n.e(t)}finally{n.f()}}return t},tt.prototype.overwrite=function(t){for(var e=0,r=Array.from(new Set(Object.keys(this._doc).concat(Object.keys(t))));e<r.length;e++){var n=r[e];"_id"!==n&&(this.$__schema.options.versionKey&&n===this.$__schema.options.versionKey||this.$__schema.options.discriminatorKey&&n===this.$__schema.options.discriminatorKey||this.$set(n,t[n]))}return this},tt.prototype.$set=function(t,e,r,i){var a=this;I.isPOJO(r)&&(i=r,r=void 0);var u,c,l,f,d=(i=i||{}).merge,_=r&&!0!==r,v=!0===r,g=this.$__schema.options.typeKey,b=0,w="strict"in i?i.strict:this.$__.strictMode;if(_&&((this.$__.adhocPaths||(this.$__.adhocPaths={}))[t]=this.$__schema.interpretAsType(t,r,this.$__schema.options)),null==t){var O=t;t=e,e=O}else{if("string"!=typeof t){if(t instanceof tt&&(t=t.$__isNested?t.toObject():t._doc),null==t){var A=t;t=e,e=A}f=e?e+".":"";var $=(u=Object.keys(t)).length,E=j(i,"_skipMinimizeTopLevel",!1);if(0===$&&E)return delete i._skipMinimizeTopLevel,e&&this.$set(e,{}),this;for(var T=0;T<$;++T){var N=f+(l=u[T]);if(c=this.$__schema.pathType(N),!0!==r||f||null==t[l]||"nested"!==c||null==this._doc[l]||0!==Object.keys(this._doc[l]).length?i=Object.assign({},i,{_skipMinimizeTopLevel:!1}):(delete this._doc[l],i=Object.assign({},i,{_skipMinimizeTopLevel:!0})),!("object"!==s(t[l])||I.isNativeObject(t[l])||I.isMongooseType(t[l])||null==t[l]||"virtual"===c||"real"===c||"adhocOrUndefined"===c||this.$__path(N)instanceof h||this.$__schema.paths[N]&&this.$__schema.paths[N].options&&this.$__schema.paths[N].options.ref))this.$__.$setCalled.add(f+l),this.$set(t[l],f+l,v,i);else if(w){if(v&&void 0===t[l]&&void 0!==this.get(N))continue;if("adhocOrUndefined"===c&&(c=P(this,N,{typeOnly:!0})),"real"===c||"virtual"===c){var k=t[l];this.$__schema.paths[N]&&this.$__schema.paths[N].$isSingleNested&&t[l]instanceof tt&&(k=k.toObject({virtuals:!1,transform:!1})),this.$set(f+l,k,v,i)}else if("nested"===c&&t[l]instanceof tt)this.$set(f+l,t[l].toObject({transform:!1}),v,i);else if("throw"===w)throw"nested"===c?new y(l,t[l]):new m(l)}else void 0!==t[l]&&this.$set(f+l,t[l],v,i)}return this}this.$__.$setCalled.add(t)}var B,C=this.$__schema.pathType(t);if("adhocOrUndefined"===C&&(C=P(this,t,{typeOnly:!0})),e=x(e),"nested"===C&&e){if("object"===s(e)&&null!=e){var R=null!=this.$__.savedState&&this.$__.savedState.hasOwnProperty(t);if(null!=this.$__.savedState&&!this.isNew&&!this.$__.savedState.hasOwnProperty(t)){var M=this.$__getValue(t);this.$__.savedState[t]=M;for(var F=0,L=Object.keys(M||{});F<L.length;F++){var U=L[F];this.$__.savedState[t+"."+U]=M[U]}}if(d)return this.$set(e,t,v);this.$__setValue(t,null),S(this,t);var V=Object.keys(e);this.$__setValue(t,{});for(var q=0,W=V;q<W.length;q++){var H=W[q];this.$set(t+"."+H,e[H],v)}return R&&I.deepEqual(this.$__.savedState[t],e)?this.unmarkModified(t):this.markModified(t),S(this,t,{skipDocArrays:!0}),this}return this.invalidate(t,new p.CastError("Object",e,t)),this}var Y=-1===t.indexOf(".")?[t]:t.split(".");if("string"==typeof this.$__schema.aliases[Y[0]]&&(Y[0]=this.$__schema.aliases[Y[0]]),"adhocOrUndefined"===C&&w){var K;for(b=0;b<Y.length;++b){var z=Y.slice(0,b+1).join(".");if(b+1<Y.length&&"virtual"===this.$__schema.pathType(z))return D.set(t,e,this),this;if(null!=(B=this.$__schema.path(z))&&B instanceof h){K=!0;break}}if(null==B&&(B=P(this,t)),!K&&!B){if("throw"===w)throw new m(t);return this}}else{if("virtual"===C)return(B=this.$__schema.virtualpath(t)).applySetters(e,this),this;B=this.$__path(t)}var Q,G=this._doc,X="";for(b=0;b<Y.length-1;++b)G=G[Y[b]],X+=(X.length>0?".":"")+Y[b],G||(this.$set(X,{}),this.$__isSelected(X)||this.unmarkModified(X),G=this.$__getValue(X));if(Y.length<=1)Q=t;else{for(b=0;b<Y.length;++b){var Z=Y.slice(0,b+1).join(".");if(null===this.get(Z,null,{getters:!1})){Q=Z;break}}Q||(Q=t)}var et=null!=a.$__.$options.priorDoc?a.$__.$options.priorDoc.$__getValue(t):v?void 0:a.$__getValue(t);if(!B)return this.$__set(Q,t,v,Y,B,e,et),this;if((B.$isSingleNested||B.$isMongooseArray)&&
/*!
 * ignore
 */
function(t,e){if(!t.$__.validationError)return;for(var r=Object.keys(t.$__.validationError.errors),n=0,o=r;n<o.length;n++){var i=o[n];i.startsWith(e+".")&&delete t.$__.validationError.errors[i]}0===Object.keys(t.$__.validationError.errors).length&&(t.$__.validationError=null)}
/*!
 * ignore
 */(this,t),B.$isSingleNested&&null!=e&&d){e instanceof tt&&(e=e.toObject({virtuals:!1,transform:!1}));for(var rt=0,nt=Object.keys(e);rt<nt.length;rt++){var ot=nt[rt];this.$set(t+"."+ot,e[ot],v,i)}return this}var it=!0;try{var st,at=function(){if(null==B.options)return!1;if(!(e instanceof tt))return!1;var t=e.constructor,r=B.options.ref;if(null!=r&&(r===t.modelName||r===t.baseModelName))return!0;var n=B.options.refPath;if(null==n)return!1;var o=e.get(n);return o===t.modelName||o===t.baseModelName}(),ut=!1;if(at&&e instanceof tt&&(this.populated(t,e._id,n({},J,e.constructor)),e.$__.wasPopulated=!0,ut=!0),B.options&&Array.isArray(B.options[g])&&B.options[g].length&&B.options[g][0].ref&&
/*!
 * ignore
 */
function(t,e){if(!Array.isArray(t))return!1;if(0===t.length)return!1;var r,n=o(t);try{for(n.s();!(r=n.n()).done;){var i=r.value;if(!(i instanceof tt))return!1;if(null==i.constructor.modelName)return!1;if(i.constructor.modelName!=e&&i.constructor.baseModelName!=e)return!1}}catch(t){n.e(t)}finally{n.f()}return!0}(e,B.options[g][0].ref)){st=n({},J,e[0].constructor),this.populated(t,e.map((function(t){return t._id})),st);var ct,lt=o(e);try{for(lt.s();!(ct=lt.n()).done;){ct.value.$__.wasPopulated=!0}}catch(t){lt.e(t)}finally{lt.f()}ut=!0}if(null==this.$__schema.singleNestedPaths[t]&&(e=B.applySetters(e,this,!1,et)),B.$isMongooseDocumentArray&&Array.isArray(e)&&e.length>0&&null!=e[0]&&null!=e[0].$__&&null!=e[0].$__.populated){for(var ft=Object.keys(e[0].$__.populated),pt=function(){var r=yt[ht];a.populated(t+"."+r,e.map((function(t){return t.populated(r)})),e[0].$__.populated[r].options)},ht=0,yt=ft;ht<yt.length;ht++)pt();ut=!0}if(!ut&&this.$__.populated){if(Array.isArray(e)&&this.$__.populated[t])for(var dt=0;dt<e.length;++dt)e[dt]instanceof tt&&(e[dt]=e[dt]._id);delete this.$__.populated[t]}B.$isSingleNested&&null!=e&&function(t,e,r){var n=e.schema;if(null==n)return;for(var o=0,i=Object.keys(n.paths);o<i.length;o++){var s=i[o],a=n.paths[s];if(null!=a.$immutableSetter){var u=null==r?void 0:r.$__getValue(s);a.$immutableSetter.call(t,u)}}}(e,B,et),this.$markValid(t)}catch(r){r instanceof p.StrictModeError&&r.isImmutableError?this.invalidate(t,r):r instanceof p.CastError?(this.invalidate(r.path,r),r.$originalErrorPath&&this.invalidate(t,new p.CastError(B.instance,e,t,r.$originalErrorPath))):this.invalidate(t,new p.CastError(B.instance,e,t,r)),it=!1}return it&&(this.$__set(Q,t,v,Y,B,e,et),null!=this.$__.savedState&&(this.isNew||this.$__.savedState.hasOwnProperty(t)?this.$__.savedState.hasOwnProperty(t)&&I.deepEqual(e,this.$__.savedState[t])&&this.unmarkModified(t):this.$__.savedState[t]=et)),B.$isSingleNested&&(this.isDirectModified(t)||null==e)&&S(this,t),this},tt.prototype.set=tt.prototype.$set,tt.prototype.$__shouldModify=function(t,e,r,n,o,i,s){return!!this.isNew||null==this.$__schema.singleNestedPaths[e]&&(void 0===i&&!this.$__isSelected(e)||(void 0!==i||!(e in this.$__.activePaths.states.default))&&(!(this.populated(e)&&i instanceof tt&&U(i._id,s))&&(!U(i,s||I.getValue(e,this))||!(r||null==i||!(e in this.$__.activePaths.states.default)||!U(i,o.getDefault(this,r))))))},tt.prototype.$__set=function(t,e,n,o,i,s,a){c=c||r(27);var l=this.$__shouldModify(t,e,n,o,i,s,a),f=this;l&&(this.markModified(t),u||(u=r(84)),s&&s.isMongooseArray&&(s._registerAtomic("$set",s),s.isMongooseDocumentArray&&s.forEach((function(t){t&&t.__parentArray&&(t.__parentArray=s)})),this.$__.activePaths.forEach((function(t){t.startsWith(e+".")&&f.$__.activePaths.ignore(t)}))));for(var p=this._doc,h=0,y=o.length,d="";h<y;h++){var _=h+1===y;if(d+=d?"."+o[h]:o[h],Z.has(o[h]))return;_?p instanceof Map?p.set(o[h],s):p[o[h]]=s:(I.isPOJO(p[o[h]])||p[o[h]]&&p[o[h]]instanceof c||p[o[h]]&&p[o[h]].$isSingleNested||p[o[h]]&&Array.isArray(p[o[h]])||(p[o[h]]=p[o[h]]||{}),p=p[o[h]])}},tt.prototype.$__getValue=function(t){return I.getValue(t,this._doc)},tt.prototype.$__setValue=function(t,e){return I.setValue(t,e,this._doc),this},tt.prototype.get=function(t,e,r){var n;r=r||{},e&&(n=this.$__schema.interpretAsType(t,e,this.$__schema.options));var o=this.$__path(t);if(null==o&&(o=this.$__schema.virtualpath(t)),o instanceof h){var i=this.$__schema.virtualpath(t);null!=i&&(o=i)}var s=-1===t.indexOf(".")?[t]:t.split("."),a=this._doc;if(o instanceof w)return o.applyGetters(void 0,this);"string"==typeof this.$__schema.aliases[s[0]]&&(s[0]=this.$__schema.aliases[s[0]]);for(var u=0,c=s.length;u<c;u++)a&&a._doc&&(a=a._doc),a=null==a?void 0:a instanceof Map?a.get(s[u],{getters:!1}):u===c-1?I.getValue(s[u],a):a[s[u]];if(n&&(a=n.cast(a)),null!=o&&!1!==r.getters)a=o.applyGetters(a,this);else if(this.$__schema.nested[t]&&r.virtuals)return ct(this,I.clone(a)||{},{path:t});return a},
/*!
 * ignore
 */
tt.prototype[Q]=tt.prototype.get,tt.prototype.$__path=function(t){var e=this.$__.adhocPaths,r=e&&e.hasOwnProperty(t)?e[t]:null;return r||this.$__schema.path(t)},tt.prototype.markModified=function(t,e){this.$__.activePaths.modify(t),null==e||this.ownerDocument||(this.$__.pathsToScopes[t]=e)},tt.prototype.unmarkModified=function(t){this.$__.activePaths.init(t),delete this.$__.pathsToScopes[t]},tt.prototype.$ignore=function(t){this.$__.activePaths.ignore(t)},tt.prototype.directModifiedPaths=function(){return Object.keys(this.$__.activePaths.states.modify)},tt.prototype.$isEmpty=function(t){var e={minimize:!0,virtuals:!1,getters:!1,transform:!1};if(arguments.length>0){var r=this.get(t);return null==r||"object"===s(r)&&(I.isPOJO(r)?ot(r):0===Object.keys(r.toObject(e)).length)}return 0===Object.keys(this.toObject(e)).length},tt.prototype.modifiedPaths=function(t){t=t||{};var e=Object.keys(this.$__.activePaths.states.modify),r=this;return e.reduce((function(e,n){var i=n.split(".");if(e=e.concat(i.reduce((function(t,e,r){return t.concat(i.slice(0,r).concat(e).join("."))}),[]).filter((function(t){return-1===e.indexOf(t)}))),!t.includeChildren)return e;var a=r.get(n);if(null!=a&&"object"===s(a))if(a._doc&&(a=a._doc),Array.isArray(a)){for(var u=a.length,c=0;c<u;++c)if(-1===e.indexOf(n+"."+c)&&(e.push(n+"."+c),null!=a[c]&&a[c].$__)){var l,f=o(a[c].modifiedPaths());try{for(f.s();!(l=f.n()).done;){var p=l.value;e.push(n+"."+c+"."+p)}}catch(t){f.e(t)}finally{f.f()}}}else Object.keys(a).filter((function(t){return-1===e.indexOf(n+"."+t)})).forEach((function(t){e.push(n+"."+t)}));return e}),[])},tt.prototype[K]=tt.prototype.modifiedPaths,tt.prototype.isModified=function(t,e){if(t){Array.isArray(t)||(t=t.split(" "));var r=e||this[K](),n=Object.keys(this.$__.activePaths.states.modify);return t.some((function(t){return!!~r.indexOf(t)}))||t.some((function(t){return n.some((function(e){return e===t||t.startsWith(e+".")}))}))}return this.$__.activePaths.some("modify")},tt.prototype[Y]=tt.prototype.isModified,tt.prototype.$isDefault=function(t){var e=this;if(null==t)return this.$__.activePaths.some("default");if("string"==typeof t&&-1===t.indexOf(" "))return this.$__.activePaths.states.default.hasOwnProperty(t);var r=t;return Array.isArray(r)||(r=r.split(" ")),r.some((function(t){return e.$__.activePaths.states.default.hasOwnProperty(t)}))},tt.prototype.$isDeleted=function(t){return 0===arguments.length?!!this.$__.isDeleted:(this.$__.isDeleted=!!t,this)},tt.prototype.isDirectModified=function(t){var e=this;if(null==t)return this.$__.activePaths.some("modify");if("string"==typeof t&&-1===t.indexOf(" "))return this.$__.activePaths.states.modify.hasOwnProperty(t);var r=t;return Array.isArray(r)||(r=r.split(" ")),r.some((function(t){return e.$__.activePaths.states.modify.hasOwnProperty(t)}))},tt.prototype.isInit=function(t){var e=this;if(null==t)return this.$__.activePaths.some("init");if("string"==typeof t&&-1===t.indexOf(" "))return this.$__.activePaths.states.init.hasOwnProperty(t);var r=t;return Array.isArray(r)||(r=r.split(" ")),r.some((function(t){return e.$__.activePaths.states.init.hasOwnProperty(t)}))},tt.prototype.isSelected=function(t){var e=this;if(null==this.$__.selected)return!0;if("_id"===t)return 0!==this.$__.selected._id;if(-1!==t.indexOf(" ")&&(t=t.split(" ")),Array.isArray(t))return t.some((function(t){return e.$__isSelected(t)}));var r=Object.keys(this.$__.selected),n=null;if(1===r.length&&"_id"===r[0])return 0===this.$__.selected._id;for(var o=0,i=r;o<i.length;o++){var s=i[o];if("_id"!==s&&k(this.$__.selected[s])){n=!!this.$__.selected[s];break}}if(null===n)return!0;if(t in this.$__.selected)return n;for(var a=t+".",u=0,c=r;u<c.length;u++){var l=c[u];if("_id"!==l){if(l.startsWith(a))return n||l!==a;if(a.startsWith(l+"."))return n}}return!n},tt.prototype.$__isSelected=tt.prototype.isSelected,tt.prototype.isDirectSelected=function(t){var e=this;if(null==this.$__.selected)return!0;if("_id"===t)return 0!==this.$__.selected._id;if(-1!==t.indexOf(" ")&&(t=t.split(" ")),Array.isArray(t))return t.some((function(t){return e.isDirectSelected(t)}));var r=Object.keys(this.$__.selected),n=null;if(1===r.length&&"_id"===r[0])return 0===this.$__.selected._id;for(var o=0,i=r;o<i.length;o++){var s=i[o];if("_id"!==s&&k(this.$__.selected[s])){n=!!this.$__.selected[s];break}}return null===n||(this.$__.selected.hasOwnProperty(t)?n:!n)},tt.prototype.validate=function(t,e,r){var n,o=this;if(this.$op="validate",null!=this.ownerDocument||(this.$__.validating?n=new _(this,{parentStack:e&&e.parentStack,conflictStack:this.$__.validating.stack}):this.$__.validating=new _(this,{parentStack:e&&e.parentStack})),1===arguments.length?"object"!==s(arguments[0])||Array.isArray(arguments[0])?"function"==typeof arguments[0]&&(r=arguments[0],e=null,t=null):(e=arguments[0],r=null,t=null):"function"==typeof t?(r=t,e=null,t=null):"function"==typeof e&&(r=e,e=t,t=null),e&&"string"==typeof e.pathsToSkip){var i=-1===e.pathsToSkip.indexOf(" ");e.pathsToSkip=i?[e.pathsToSkip]:e.pathsToSkip.split(" ")}return O(r,(function(r){if(null!=n)return r(n);o.$__validate(t,e,(function(t){o.$op=null,r(t)}))}),this.constructor.events)},tt.prototype.$__validate=function(t,e,r){var n=this;"function"==typeof t?(r=t,e=null,t=null):"function"==typeof e&&(r=e,e=null);var i,a=e&&"object"===s(e)&&"validateModifiedOnly"in e,u=j(e,"pathsToSkip",null);i=a?!!e.validateModifiedOnly:this.$__schema.options.validateModifiedOnly;var c=this,l=function(){var t=n.$__.validationError;if(n.$__.validationError=void 0,i&&null!=t){for(var e=0,r=Object.keys(t.errors);e<r.length;e++){var o=r[e];n.isModified(o)||delete t.errors[o]}0===Object.keys(t.errors).length&&(t=void 0)}if(n.$__.cachedRequired={},n.emit("validate",c),n.constructor.emit("validate",c),n.$__.validating=null,t){for(var s in t.errors)!n[H]&&t.errors[s]instanceof p.CastError&&n.invalidate(s,t.errors[s]);return t}},f=it(this),h=i?f[0].filter((function(t){return n.isModified(t)})):f[0],y=f[1];if("string"==typeof t&&(t=t.split(" ")),Array.isArray(t)?h=st(h,t):u&&(h=at(h,u)),0===h.length)return N((function(){var t=l();if(t)return c.$__schema.s.hooks.execPost("validate:error",c,[c],{error:t},(function(t){r(t)}));r(null,c)}));var d,_={},v=0,m=o(h);try{for(m.s();!(d=m.n()).done;){b(d.value)}}catch(t){m.e(t)}finally{m.f()}function b(t){null==t||_[t]||(_[t]=!0,v++,N((function(){var e=c.$__schema.path(t);if(!e)return--v||w();if(c.$isValid(t)){if(null!=e[X]&&t!==e.path)return--v||w();var r,n=c.$__getValue(t);null==n&&(r=c.populated(t))&&(n=r);var o=t in c.$__.pathsToScopes?c.$__.pathsToScopes[t]:c,s={skipSchemaValidators:y[t],path:t,validateModifiedOnly:i};e.doValidate(n,(function(r){if(r&&(!e.$isMongooseDocumentArray||r.$isArrayValidatorError)){if(e.$isSingleNested&&r instanceof g&&!1===e.schema.options.storeSubdocValidationError)return--v||w();c.invalidate(t,r,void 0,!0)}--v||w()}),o,s)}else--v||w()})))}function w(){var t=l();if(t)return c.$__schema.s.hooks.execPost("validate:error",c,[c],{error:t},(function(t){r(t)}));r(null,c)}},tt.prototype.validateSync=function(t,e){var r=this,n=this;1!==arguments.length||"object"!==s(arguments[0])||Array.isArray(arguments[0])||(e=arguments[0],t=null);var o,i=e&&"object"===s(e)&&"validateModifiedOnly"in e;o=i?!!e.validateModifiedOnly:this.$__schema.options.validateModifiedOnly;var a=e&&e.pathsToSkip;if("string"==typeof t){var u=-1===t.indexOf(" ");t=u?[t]:t.split(" ")}else"string"==typeof a&&-1!==a.indexOf(" ")&&(a=a.split(" "));var c=it(this),l=o?c[0].filter((function(t){return r.isModified(t)})):c[0],f=c[1];Array.isArray(t)?l=st(l,t):Array.isArray(a)&&(l=at(l,a));var h={};l.forEach((function(t){if(!h[t]){h[t]=!0;var e=n.$__schema.path(t);if(e&&n.$isValid(t)){var r=n.$__getValue(t),i=e.doValidateSync(r,n,{skipSchemaValidators:f[t],path:t,validateModifiedOnly:o});if(i&&(!e.$isMongooseDocumentArray||i.$isArrayValidatorError)){if(e.$isSingleNested&&i instanceof g&&!1===e.schema.options.storeSubdocValidationError)return;n.invalidate(t,i,void 0,!0)}}}}));var y=n.$__.validationError;if(n.$__.validationError=void 0,n.emit("validate",n),n.constructor.emit("validate",n),y)for(var d in y.errors)y.errors[d]instanceof p.CastError&&n.invalidate(d,y.errors[d]);return y},tt.prototype.invalidate=function(t,e,r,n){if(this.$__.validationError||(this.$__.validationError=new g(this)),!this.$__.validationError.errors[t])return e&&"string"!=typeof e||(e=new b({path:t,message:e,type:n||"user defined",value:r})),this.$__.validationError===e||this.$__.validationError.addError(t,e),this.$__.validationError},tt.prototype.$markValid=function(t){this.$__.validationError&&this.$__.validationError.errors[t]&&(delete this.$__.validationError.errors[t],0===Object.keys(this.$__.validationError.errors).length&&(this.$__.validationError=null))},tt.prototype.$isValid=function(t){var e=this;return null==this.$__.validationError||0===Object.keys(this.$__.validationError.errors).length||null!=t&&(-1!==t.indexOf(" ")&&(t=t.split(" ")),Array.isArray(t)?t.some((function(t){return null==e.$__.validationError.errors[t]})):null==this.$__.validationError.errors[t])},tt.prototype.$__reset=function(){var t=this;return a||(a=r(18)),this.$__.activePaths.map("init","modify",(function(e){return t.$__getValue(e)})).filter((function(t){return t&&t instanceof Array&&t.isMongooseDocumentArray&&t.length})).forEach((function(e){for(var r=e.length;r--;){var n=e[r];n&&n.$__reset()}t.$__.activePaths.init(e.$path()),e[q]=e[W],e[W]={}})),this.$__.activePaths.map("init","modify",(function(e){return t.$__getValue(e)})).filter((function(t){return t&&t.$isSingleNested})).forEach((function(e){e.$__reset(),e.$__parent===t?t.$__.activePaths.init(e.$basePath):null!=e.$__parent&&e.$__parent.ownerDocument&&e.$__parent.$__reset()})),this.$__dirty().forEach((function(t){var e=t.value;e&&e[W]&&(e[q]=e[W],e[W]={})})),this.$__.backup={},this.$__.backup.activePaths={modify:Object.assign({},this.$__.activePaths.states.modify),default:Object.assign({},this.$__.activePaths.states.default)},this.$__.backup.validationError=this.$__.validationError,this.$__.backup.errors=this.errors,this.$__.activePaths.clear("modify"),this.$__.activePaths.clear("default"),this.$__.validationError=void 0,this.errors=void 0,t=this,this.$__schema.requiredPaths().forEach((function(e){t.$__.activePaths.require(e)})),this},
/*!
 * ignore
 */
tt.prototype.$__undoReset=function(){if(null!=this.$__.backup&&null!=this.$__.backup.activePaths){this.$__.activePaths.states.modify=this.$__.backup.activePaths.modify,this.$__.activePaths.states.default=this.$__.backup.activePaths.default,this.$__.validationError=this.$__.backup.validationError,this.errors=this.$__.backup.errors;var t,e=o(this.$__dirty());try{for(e.s();!(t=e.n()).done;){var r=t.value.value;r&&r[W]&&r[q]&&(r[W]=r[q])}}catch(t){e.e(t)}finally{e.f()}var n,i=o(this.$getAllSubdocs());try{for(i.s();!(n=i.n()).done;){n.value.$__undoReset()}}catch(t){i.e(t)}finally{i.f()}}},tt.prototype.$__dirty=function(){var t=this,e=this.$__.activePaths.map("modify",(function(e){return{path:e,value:t.$__getValue(e),schema:t.$__path(e)}}));(e=e.concat(this.$__.activePaths.map("default",(function(e){if("_id"!==e&&null!=t.$__getValue(e))return{path:e,value:t.$__getValue(e),schema:t.$__path(e)}})))).sort((function(t,e){return t.path<e.path?-1:t.path>e.path?1:0}));var r,n,o=[];return e.forEach((function(t){t&&(null==r||0!==t.path.indexOf(r)?(r=t.path+".",o.push(t),n=t):null!=n&&null!=n.value&&null!=n.value[W]&&n.value.hasAtomics()&&(n.value[W]={},n.value[W].$set=n.value))})),n=r=null,o},tt.prototype.$__setSchema=function(t){t.plugin(T,{deduplicate:!0}),A(t.tree,this,void 0,t.options);for(var e=0,r=Object.keys(t.virtuals);e<r.length;e++){var n=r[e];t.virtuals[n]._applyDefaultGetters()}null==t.path("schema")&&(this.schema=t),this.$__schema=t,this[z]=t},tt.prototype.$__getArrayPathsToValidate=function(){return a||(a=r(18)),this.$__.activePaths.map("init","modify",function(t){return this.$__getValue(t)}.bind(this)).filter((function(t){return t&&t instanceof Array&&t.isMongooseDocumentArray&&t.length})).reduce((function(t,e){return t.concat(e)}),[]).filter((function(t){return t}))},tt.prototype.$getAllSubdocs=function(){function t(e,r,n){var o=e,i=!1;if(n&&(e instanceof tt&&e[z].paths[n]?o=e._doc[n]:e instanceof tt&&e[z].nested[n]?(o=e._doc[n],i=!0):o=e[n]),o instanceof c)r.push(o);else if(o instanceof Map)r=Array.from(o.keys()).reduce((function(e,r){return t(o.get(r),e,null)}),r);else if(o&&o.$isSingleNested)(r=Object.keys(o._doc).reduce((function(e,r){return t(o._doc,e,r)}),r)).push(o);else if(o&&o.isMongooseDocumentArray)o.forEach((function(e){e&&e._doc&&(r=Object.keys(e._doc).reduce((function(r,n){return t(e._doc,r,n)}),r),e instanceof c&&r.push(e))}));else if(i&&null!=o)for(var s=0,a=Object.keys(o);s<a.length;s++){var u=a[s];t(o,r,u)}return r}a||(a=r(18)),c=c||r(27);for(var e=[],n=0,o=Object.keys(this._doc);n<o.length;n++){t(this,e,o[n])}return e},tt.prototype.$__handleReject=function(t){this.listeners("error").length?this.emit("error",t):this.constructor.listeners&&this.constructor.listeners("error").length&&this.constructor.emit("error",t)},tt.prototype.$toObject=function(t,r){var n,o,i={transform:!0,flattenDecimals:!0},s=r?"toJSON":"toObject",a=j(this,"constructor.base.options."+s,{}),u=j(this,"$__schema.options",{});i=I.options(i,L(a)),i=I.options(i,L(u[s]||{})),(t=I.isPOJO(t)?L(t):{})._calledWithOptions=t._calledWithOptions||L(t),n=null!=t._calledWithOptions.minimize?t.minimize:null!=i.minimize?i.minimize:u.minimize,o=null!=t._calledWithOptions.flattenMaps?t.flattenMaps:null!=i.flattenMaps?i.flattenMaps:u.flattenMaps;var c=Object.assign(I.clone(t),{_isNested:!0,json:r,minimize:n,flattenMaps:o});if(I.hasUserDefinedProperty(t,"getters")&&(c.getters=t.getters),I.hasUserDefinedProperty(t,"virtuals")&&(c.virtuals=t.virtuals),(t.depopulate||j(t,"_parentOptions.depopulate",!1))&&t._isNested&&this.$__.wasPopulated)return L(this._id,c);(t=I.options(i,t))._isNested=!0,t.json=r,t.minimize=n,c._parentOptions=t,c._skipSingleNestedGetters=!0;var l=Object.assign({},c);l._skipSingleNestedGetters=!1;var f=t.transform,p=L(this._doc,c)||{};t.getters&&(!function(t,e,r){var n,o,i=t.$__schema,s=Object.keys(i.paths),a=s.length,u=t._doc;if(!u)return e;for(;a--;){var c=(n=s[a]).split("."),l=c.length,f=l-1,p=e,h=void 0;if(u=t._doc,t.$__isSelected(n))for(var y=0;y<l;++y){if(h=c[y],o=u[h],y===f){var d=t.get(n);p[h]=L(d,r)}else{if(null==o){h in u&&(p[h]=o);break}p=p[h]||(p[h]={})}u=o}}}
/*!
 * Applies schema type transforms to `json`.
 *
 * @param {Document} self
 * @param {Object} json
 * @return {Object} `json`
 */(this,p,l),t.minimize&&(p=
/*!
 * Minimizes an object, removing undefined values and empty objects
 *
 * @param {Object} object to minimize
 * @return {Object}
 */
function t(r){var n,o,i,s=Object.keys(r),a=s.length;for(;a--;)o=s[a],i=r[o],I.isObject(i)&&!e.isBuffer(i)&&(r[o]=t(i)),void 0!==r[o]?n=!0:delete r[o];return n?r:void 0}(p)||{})),(t.virtuals||t.getters&&!1!==t.virtuals)&&ct(this,p,l,t),!1===t.versionKey&&this.$__schema.options.versionKey&&delete p[this.$__schema.options.versionKey];var h=t.transform;if(h&&function(t,e){var r=t.$__schema,n=Object.keys(r.paths||{});if(!t._doc)return e;for(var o=0,i=n;o<i.length;o++){var s=i[o],a=r.paths[s];if("function"==typeof a.options.transform){var u=t.get(s),c=a.options.transform.call(t,u);lt(s,c),I.setValue(s,c,e)}else if(null!=a.$embeddedSchemaType&&"function"==typeof a.$embeddedSchemaType.options.transform){for(var l=[].concat(t.get(s)),f=a.$embeddedSchemaType.options.transform,p=0;p<l.length;++p){var h=f.call(t,l[p]);l[p]=h,lt(s,h)}e[s]=l}}}(this,p),t.useProjection&&function(t,e){var r=t.$__schema,n=Object.keys(r.paths||{});if(!t._doc)return e;var o=t.$__.selected;void 0===o&&(o={},M.applyPaths(o,r));if(null==o||0===Object.keys(o).length)return e;for(var i=0,s=n;i<s.length;i++){var a=s[i];null==o[a]||o[a]||delete e[a]}}(this,p),!0===h||u.toObject&&h){var y=t.json?u.toJSON:u.toObject;y&&(h="function"==typeof t.transform?t.transform:y.transform)}else t.transform=f;if("function"==typeof h){var d=h(this,p,t);void 0!==d&&(p=d)}return p},tt.prototype.toObject=function(t){return this.$toObject(t)},tt.prototype.toJSON=function(t){return this.$toObject(t,!0)},tt.prototype.parent=function(){return this.$__.parent},tt.prototype.$parent=tt.prototype.parent,tt.prototype.inspect=function(t){var e;I.isPOJO(t)&&((e=t).minimize=!1);var r=this.toObject(e);return null==r?"MongooseDocument { "+r+" }":r},C.custom&&(
/*!
  * Avoid Node deprecation warning DEP0079
  */
tt.prototype[C.custom]=tt.prototype.inspect),tt.prototype.toString=function(){var t=this.inspect();return"string"==typeof t?t:C(t)},tt.prototype.equals=function(t){if(!t)return!1;var e=this.$__getValue("_id"),r=null!=t.$__?t.$__getValue("_id"):t;return e||r?e&&e.equals?e.equals(r):e===r:U(this,t)},tt.prototype.populate=function(){if(0===arguments.length)return this;var t,e=this.$__.populate||(this.$__.populate={}),r=I.args(arguments);if("function"==typeof r[r.length-1]&&(t=r.pop()),r.length){var n,i=I.populate.apply(null,r),s=o(i);try{for(s.s();!(n=s.n()).done;){var a=n.value;e[a.path]=a}}catch(t){s.e(t)}finally{s.f()}}if(t){var u=I.object.vals(e);this.$__.populate=void 0;var c=this.constructor;if(this.$__isNested){c=this.$__[G].constructor;var l=this.$__.nestedPath;u.forEach((function(t){t.path=l+"."+t.path}))}if(null!=this.$session()){var f=this.$session();u.forEach((function(t){null!=t.options?"session"in t.options||(t.options.session=f):t.options={session:f}}))}c.populate(this,u,t)}return this},tt.prototype.$getPopulatedDocs=function(){var t=[];null!=this.$__.populated&&(t=t.concat(Object.keys(this.$__.populated))),null!=this.$$populatedVirtuals&&(t=t.concat(Object.keys(this.$$populatedVirtuals)));var e,r=[],n=o(t);try{for(n.s();!(e=n.n()).done;){var i=e.value,s=this.get(i);Array.isArray(s)?r=r.concat(s):s instanceof tt&&r.push(s)}}catch(t){n.e(t)}finally{n.f()}return r},tt.prototype.execPopulate=function(t){var e=this,r=null!=t&&"function"!=typeof t;return r?this.populate.apply(this,arguments).execPopulate():O(t,(function(t){e.populate(t)}),this.constructor.events)},tt.prototype.populated=function(t,e,r){if(null==e||!0===e){if(!this.$__.populated)return;var n=t.endsWith(".$*")?t.replace(/\.\$\*$/,""):t,o=this.$__.populated[n];return o?!0===e?o:o.value:void 0}this.$__.populated||(this.$__.populated={}),this.$__.populated[t]={value:e,options:r};for(var i=t.split("."),s=0;s<i.length-1;++s){var a=i.slice(0,s+1).join("."),u=this.get(a);if(null!=u&&null!=u.$__&&this.populated(a)){var c=i.slice(s+1).join(".");u.populated(c,e,r);break}}return e},tt.prototype.depopulate=function(t){var e;"string"==typeof t&&(t=t.split(" "));var r=this.$$populatedVirtuals?Object.keys(this.$$populatedVirtuals):[],n=j(this,"$__.populated",{});if(0===arguments.length){var i,s=o(r);try{for(s.s();!(i=s.n()).done;){var a=i.value;delete this.$$populatedVirtuals[a],delete this._doc[a],delete n[a]}}catch(t){s.e(t)}finally{s.f()}for(var u=Object.keys(n),c=0,l=u;c<l.length;c++){var f=l[c];(e=this.populated(f))&&(delete n[f],this.$set(f,e))}return this}var p,h=o(t);try{for(h.s();!(p=h.n()).done;){var y=p.value;e=this.populated(y),delete n[y],-1!==r.indexOf(y)?(delete this.$$populatedVirtuals[y],delete this._doc[y]):e&&this.$set(y,e)}}catch(t){h.e(t)}finally{h.f()}return this},tt.prototype.$__fullPath=function(t){return t||""},tt.prototype.getChanges=function(){var t=this.$__delta();return t?t[1]:{}},
/*!
 * Module exports.
 */
tt.ValidationError=g,t.exports=tt}).call(this,r(2).Buffer)},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=c(t);if(e){var o=c(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return u(this,r)}}function u(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l=r(14),f=r(3),p=r(4),h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(l,t);var e,r,n,c=a(l);function l(t,e,r,n,i){var s;if(o(this,l),arguments.length>0){var a=y(e),f=d(e),p=_(i),h=v(null,t,a,r,p,f);(s=c.call(this,h)).init(t,e,r,n,i)}else s=c.call(this,v());return u(s)}return e=l,(r=[{key:"toJSON",value:function(){return{stringValue:this.stringValue,valueType:this.valueType,kind:this.kind,value:this.value,path:this.path,reason:this.reason,name:this.name,message:this.message}}
/*!
     * ignore
     */},{key:"init",value:function(t,e,r,n,o){this.stringValue=y(e),this.messageFormat=_(o),this.kind=t,this.value=e,this.path=r,this.reason=n,this.valueType=d(e)}
/*!
     * ignore
     * @param {Readonly<CastError>} other
     */},{key:"copy",value:function(t){this.messageFormat=t.messageFormat,this.stringValue=t.stringValue,this.kind=t.kind,this.value=t.value,this.path=t.path,this.reason=t.reason,this.message=t.message,this.valueType=t.valueType}
/*!
     * ignore
     */},{key:"setModel",value:function(t){this.model=t,this.message=v(t,this.kind,this.stringValue,this.path,this.messageFormat,this.valueType)}}])&&i(e.prototype,r),n&&i(e,n),l}(l);function y(t){var e=p.inspect(t);return(e=e.replace(/^'|'$/g,'"')).startsWith('"')||(e='"'+e+'"'),e}function d(t){if(null==t)return""+t;var e=n(t);return"object"!==e||"function"!=typeof t.constructor?e:t.constructor.name}function _(t){var e=f(t,"options.cast",null);if("string"==typeof e)return e}
/*!
 * ignore
 */function v(t,e,r,n,o,i){if(null!=o){var s=o.replace("{KIND}",e).replace("{VALUE}",r).replace("{PATH}",n);return null!=t&&(s=s.replace("{MODEL}",t.modelName)),s}var a="Cast to "+e+" failed for value "+r+(i?" (type "+i+")":"")+' at path "'+n+'"';return null!=t&&(a+=' for model "'+t.modelName+'"'),a}
/*!
 * exports
 */Object.defineProperty(h.prototype,"name",{value:"CastError"}),t.exports=h},function(t,e,r){"use strict";
/*!
 * ignore
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){var e="function"==typeof Map?new Map:void 0;return(s=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return a(t,arguments,l(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),c(n,t)})(t)}function a(t,e,r){return(a=u()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&c(o,r.prototype),o}).apply(null,arguments)}function u(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(s,t);var e,r,n=(e=s,r=u(),function(){var t,n=l(e);if(r){var o=l(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return i(this,t)});function s(){return o(this,s),n.apply(this,arguments)}return s}(s(Error));Object.defineProperty(f.prototype,"name",{value:"MongooseError"}),t.exports=f},function(t,e,r){"use strict";
/*!
 * ignore
 */var n=null;t.exports.get=function(){return n},t.exports.set=function(t){n=t}},function(t,e,r){"use strict";(function(e){function r(t,r){return new e(t,r)}t.exports={normalizedFunctionString:function(t){return t.toString().replace(/function *\(/,"function (")},allocBuffer:"function"==typeof e.alloc?function(){return e.alloc.apply(e,arguments)}:r,toBuffer:"function"==typeof e.from?function(){return e.from.apply(e,arguments)}:r}}).call(this,r(2).Buffer)},function(t,e,r){"use strict";
/*!
 * ignore
 */e.internalToObjectOptions={transform:!1,virtuals:!1,getters:!1,_skipDepopulateTopLevel:!0,depopulate:!0,flattenDecimals:!1,useProjection:!1}},function(t,e,r){"use strict";(function(e){
/*!
 * Module dependencies.
 */
function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t,e,r){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=p(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function l(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=p(t);if(e){var o=p(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return f(this,r)}}function f(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var h=r(85),y=r(12),d=r(10),_=r(88),v=r(36),m=r(17).internalToObjectOptions,g=r(4),b=r(1),w=r(0).arrayAtomicsSymbol,O=r(0).arrayParentSymbol,S=r(0).arrayPathSymbol,A=r(0).arraySchemaSymbol,$=r(0).documentArrayParent,E=Array.prototype.push,j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(n,t);var r=l(n);function n(){return s(this,n),r.apply(this,arguments)}return function(t,e,r){e&&a(t.prototype,e),r&&a(t,r)}(n,[{key:"isMongooseDocumentArray",get:function(){return!0}
/*!
     * ignore
     */},{key:"toBSON",value:function(){return this.toObject(m)}
/*!
     * ignore
     */},{key:"map",value:function(){var t=u(p(n.prototype),"map",this).apply(this,arguments);return t[A]=null,t[S]=null,t[O]=null,t}},{key:"_cast",value:function(t,r){if(null==this[A])return t;var n=this[A].casterConstructor;if((n.$isMongooseDocumentArray?t&&t.isMongooseDocumentArray:t instanceof n)||t&&t.constructor&&t.constructor.baseCasterConstructor===n)return t[$]&&t.__parentArray||(t[$]=this[O],t.__parentArray=this),t.$setIndex(r),t;if(null==t)return null;if((e.isBuffer(t)||t instanceof d||!b.isObject(t))&&(t={_id:t}),t&&n.discriminators&&n.schema&&n.schema.options&&n.schema.options.discriminatorKey)if("string"==typeof t[n.schema.options.discriminatorKey]&&n.discriminators[t[n.schema.options.discriminatorKey]])n=n.discriminators[t[n.schema.options.discriminatorKey]];else{var o=v(n.discriminators,t[n.schema.options.discriminatorKey]);o&&(n=o)}return n.$isMongooseDocumentArray?n.cast(t,this,void 0,void 0,r):new n(t,this,void 0,void 0,r)}},{key:"id",value:function(t){var e,r,n;try{e=_(t).toString()}catch(t){e=null}var i,s=o(this);try{for(s.s();!(i=s.n()).done;){var a=i.value;if(a&&null!=(n=a.get("_id")))if(n instanceof y){if(r||(r=String(t)),r==n._id)return a}else if(t instanceof d||n instanceof d){if(e==n)return a}else if(t==n||b.deepEqual(t,n))return a}}catch(t){s.e(t)}finally{s.f()}return null}},{key:"toObject",value:function(t){return[].concat(this.map((function(e){return null==e?null:"function"!=typeof e.toObject?e:e.toObject(t)})))}},{key:"slice",value:function(){var t=u(p(n.prototype),"slice",this).apply(this,arguments);return t[O]=this[O],t[S]=this[S],t}},{key:"push",value:function(){var t=u(p(n.prototype),"push",this).apply(this,arguments);return P(this),t}},{key:"pull",value:function(){var t=u(p(n.prototype),"pull",this).apply(this,arguments);return P(this),t}},{key:"shift",value:function(){var t=u(p(n.prototype),"shift",this).apply(this,arguments);return P(this),t}},{key:"splice",value:function(){var t=u(p(n.prototype),"splice",this).apply(this,arguments);return P(this),t}},{key:"inspect",value:function(){return this.toObject()}},{key:"create",value:function(t){var e=this[A].casterConstructor;if(t&&e.discriminators&&e.schema&&e.schema.options&&e.schema.options.discriminatorKey)if("string"==typeof t[e.schema.options.discriminatorKey]&&e.discriminators[t[e.schema.options.discriminatorKey]])e=e.discriminators[t[e.schema.options.discriminatorKey]];else{var r=v(e.discriminators,t[e.schema.options.discriminatorKey]);r&&(e=r)}return new e(t,this)}
/*!
     * ignore
     */},{key:"notify",value:function(t){var e=this;return function r(n,o){for(var i=(o=o||e).length;i--;)if(null!=o[i]){switch(t){case"save":n=e[i]}o[i].isMongooseArray?r(n,o[i]):o[i]&&o[i].emit(t,n)}}}},{key:"_markModified",value:function(t,e){var r,n=this[O];if(n){if(r=this[S],arguments.length)if(null!=e){var o=t.__index;r=r+"."+o+"."+e}else r=r+"."+t;if(null!=r&&r.endsWith(".$"))return this;n.markModified(r,arguments.length>0?t:n)}return this}}]),n}(h);
/*!
 * If this is a document array, each element may contain single
 * populated paths, so we need to modify the top-level document's
 * populated cache. See gh-8247, gh-8265.
 */
function P(t){var e=t[O];if(e&&null!=e.$__.populated){var r,n=o(Object.keys(e.$__.populated).filter((function(e){return e.startsWith(t[S]+".")})));try{var i=function(){var n=r.value,o=n.slice((t[S]+".").length);if(!Array.isArray(e.$__.populated[n].value))return"continue";e.$__.populated[n].value=t.map((function(t){return t.populated(o)}))};for(n.s();!(r=n.n()).done;)i()}catch(t){n.e(t)}finally{n.f()}}}g.inspect.custom&&(j.prototype[g.inspect.custom]=j.prototype.inspect),
/*!
 * Module exports.
 */
t.exports=function(t,e,r){var n=new j;if(n[w]={},n[A]=void 0,Array.isArray(t)&&(t[S]===e&&t[O]===r&&(n[w]=Object.assign({},t[w])),t.forEach((function(t){E.call(n,t)}))),n[S]=e,r&&r instanceof y)for(n[O]=r,n[A]=r.schema.path(e);null!=n&&null!=n[A]&&n[A].$isMongooseArray&&!n[A].$isMongooseDocumentArray;)n[A]=n[A].casterConstructor;return n}}).call(this,r(2).Buffer)},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o,i="object"===("undefined"==typeof Reflect?"undefined":n(Reflect))?Reflect:null,s=i&&"function"==typeof i.apply?i.apply:function(t,e,r){return Function.prototype.apply.call(t,e,r)};o=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var a=Number.isNaN||function(t){return t!=t};function u(){u.init.call(this)}t.exports=u,t.exports.once=function(t,e){return new Promise((function(r,n){function o(r){t.removeListener(e,i),n(r)}function i(){"function"==typeof t.removeListener&&t.removeListener("error",o),r([].slice.call(arguments))}m(t,e,i,{once:!0}),"error"!==e&&function(t,e,r){"function"==typeof t.on&&m(t,"error",e,r)}(t,o,{once:!0})}))},u.EventEmitter=u,u.prototype._events=void 0,u.prototype._eventsCount=0,u.prototype._maxListeners=void 0;var c=10;function l(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+n(t))}function f(t){return void 0===t._maxListeners?u.defaultMaxListeners:t._maxListeners}function p(t,e,r,n){var o,i,s,a;if(l(r),void 0===(i=t._events)?(i=t._events=Object.create(null),t._eventsCount=0):(void 0!==i.newListener&&(t.emit("newListener",e,r.listener?r.listener:r),i=t._events),s=i[e]),void 0===s)s=i[e]=r,++t._eventsCount;else if("function"==typeof s?s=i[e]=n?[r,s]:[s,r]:n?s.unshift(r):s.push(r),(o=f(t))>0&&s.length>o&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=t,u.type=e,u.count=s.length,a=u,console&&console.warn&&console.warn(a)}return t}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function y(t,e,r){var n={fired:!1,wrapFn:void 0,target:t,type:e,listener:r},o=h.bind(n);return o.listener=r,n.wrapFn=o,o}function d(t,e,r){var n=t._events;if(void 0===n)return[];var o=n[e];return void 0===o?[]:"function"==typeof o?r?[o.listener||o]:[o]:r?function(t){for(var e=new Array(t.length),r=0;r<e.length;++r)e[r]=t[r].listener||t[r];return e}(o):v(o,o.length)}function _(t){var e=this._events;if(void 0!==e){var r=e[t];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function v(t,e){for(var r=new Array(e),n=0;n<e;++n)r[n]=t[n];return r}function m(t,e,r,o){if("function"==typeof t.on)o.once?t.once(e,r):t.on(e,r);else{if("function"!=typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+n(t));t.addEventListener(e,(function n(i){o.once&&t.removeEventListener(e,n),r(i)}))}}Object.defineProperty(u,"defaultMaxListeners",{enumerable:!0,get:function(){return c},set:function(t){if("number"!=typeof t||t<0||a(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");c=t}}),u.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},u.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||a(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},u.prototype.getMaxListeners=function(){return f(this)},u.prototype.emit=function(t){for(var e=[],r=1;r<arguments.length;r++)e.push(arguments[r]);var n="error"===t,o=this._events;if(void 0!==o)n=n&&void 0===o.error;else if(!n)return!1;if(n){var i;if(e.length>0&&(i=e[0]),i instanceof Error)throw i;var a=new Error("Unhandled error."+(i?" ("+i.message+")":""));throw a.context=i,a}var u=o[t];if(void 0===u)return!1;if("function"==typeof u)s(u,this,e);else{var c=u.length,l=v(u,c);for(r=0;r<c;++r)s(l[r],this,e)}return!0},u.prototype.addListener=function(t,e){return p(this,t,e,!1)},u.prototype.on=u.prototype.addListener,u.prototype.prependListener=function(t,e){return p(this,t,e,!0)},u.prototype.once=function(t,e){return l(e),this.on(t,y(this,t,e)),this},u.prototype.prependOnceListener=function(t,e){return l(e),this.prependListener(t,y(this,t,e)),this},u.prototype.removeListener=function(t,e){var r,n,o,i,s;if(l(e),void 0===(n=this._events))return this;if(void 0===(r=n[t]))return this;if(r===e||r.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete n[t],n.removeListener&&this.emit("removeListener",t,r.listener||e));else if("function"!=typeof r){for(o=-1,i=r.length-1;i>=0;i--)if(r[i]===e||r[i].listener===e){s=r[i].listener,o=i;break}if(o<0)return this;0===o?r.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(r,o),1===r.length&&(n[t]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",t,s||e)}return this},u.prototype.off=u.prototype.removeListener,u.prototype.removeAllListeners=function(t){var e,r,n;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[t]),this;if(0===arguments.length){var o,i=Object.keys(r);for(n=0;n<i.length;++n)"removeListener"!==(o=i[n])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=r[t]))this.removeListener(t,e);else if(void 0!==e)for(n=e.length-1;n>=0;n--)this.removeListener(t,e[n]);return this},u.prototype.listeners=function(t){return d(this,t,!0)},u.prototype.rawListeners=function(t){return d(this,t,!1)},u.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):_.call(t,e)},u.prototype.listenerCount=_,u.prototype.eventNames=function(){return this._eventsCount>0?o(this._events):[]}},function(t,e,r){"use strict";t.exports=r(15).get().Decimal128},function(t,e,r){"use strict";(function(e){
/*!
 * Determines if `arg` is an object.
 *
 * @param {Object|Array|String|Function|RegExp|any} arg
 * @api private
 * @return {Boolean}
 */
t.exports=function(t){return!!e.isBuffer(t)||"[object Object]"===Object.prototype.toString.call(t)}}).call(this,r(2).Buffer)},function(t,e,r){"use strict";(function(e){
/*!
 * Centralize this so we can more easily work around issues with people
 * stubbing out `process.nextTick()` in tests using sinon:
 * https://github.com/sinonjs/lolex#automatically-incrementing-mocked-time
 * See gh-6074
 */
var r=e.nextTick.bind(e);t.exports=function(t){return r(t)}}).call(this,r(11))},function(t,e,r){"use strict";(function(e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(117);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */function i(t,e){if(t===e)return 0;for(var r=t.length,n=e.length,o=0,i=Math.min(r,n);o<i;++o)if(t[o]!==e[o]){r=t[o],n=e[o];break}return r<n?-1:n<r?1:0}function s(t){return e.Buffer&&"function"==typeof e.Buffer.isBuffer?e.Buffer.isBuffer(t):!(null==t||!t._isBuffer)}var a=r(4),u=Object.prototype.hasOwnProperty,c=Array.prototype.slice,l="foo"===function(){}.name;function f(t){return Object.prototype.toString.call(t)}function p(t){return!s(t)&&("function"==typeof e.ArrayBuffer&&("function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):!!t&&(t instanceof DataView||!!(t.buffer&&t.buffer instanceof ArrayBuffer))))}var h=t.exports=g,y=/\s*function\s+([^\(\s]*)\s*/;function d(t){if(a.isFunction(t)){if(l)return t.name;var e=t.toString().match(y);return e&&e[1]}}function _(t,e){return"string"==typeof t?t.length<e?t:t.slice(0,e):t}function v(t){if(l||!a.isFunction(t))return a.inspect(t);var e=d(t);return"[Function"+(e?": "+e:"")+"]"}function m(t,e,r,n,o){throw new h.AssertionError({message:r,actual:t,expected:e,operator:n,stackStartFunction:o})}function g(t,e){t||m(t,!0,e,"==",h.ok)}function b(t,e,r,o){if(t===e)return!0;if(s(t)&&s(e))return 0===i(t,e);if(a.isDate(t)&&a.isDate(e))return t.getTime()===e.getTime();if(a.isRegExp(t)&&a.isRegExp(e))return t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase;if(null!==t&&"object"===n(t)||null!==e&&"object"===n(e)){if(p(t)&&p(e)&&f(t)===f(e)&&!(t instanceof Float32Array||t instanceof Float64Array))return 0===i(new Uint8Array(t.buffer),new Uint8Array(e.buffer));if(s(t)!==s(e))return!1;var u=(o=o||{actual:[],expected:[]}).actual.indexOf(t);return-1!==u&&u===o.expected.indexOf(e)||(o.actual.push(t),o.expected.push(e),function(t,e,r,n){if(null==t||null==e)return!1;if(a.isPrimitive(t)||a.isPrimitive(e))return t===e;if(r&&Object.getPrototypeOf(t)!==Object.getPrototypeOf(e))return!1;var o=w(t),i=w(e);if(o&&!i||!o&&i)return!1;if(o)return t=c.call(t),e=c.call(e),b(t,e,r);var s,u,l=A(t),f=A(e);if(l.length!==f.length)return!1;for(l.sort(),f.sort(),u=l.length-1;u>=0;u--)if(l[u]!==f[u])return!1;for(u=l.length-1;u>=0;u--)if(s=l[u],!b(t[s],e[s],r,n))return!1;return!0}(t,e,r,o))}return r?t===e:t==e}function w(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function O(t,e){if(!t||!e)return!1;if("[object RegExp]"==Object.prototype.toString.call(e))return e.test(t);try{if(t instanceof e)return!0}catch(t){}return!Error.isPrototypeOf(e)&&!0===e.call({},t)}function S(t,e,r,n){var o;if("function"!=typeof e)throw new TypeError('"block" argument must be a function');"string"==typeof r&&(n=r,r=null),o=function(t){var e;try{t()}catch(t){e=t}return e}(e),n=(r&&r.name?" ("+r.name+").":".")+(n?" "+n:"."),t&&!o&&m(o,r,"Missing expected exception"+n);var i="string"==typeof n,s=!t&&o&&!r;if((!t&&a.isError(o)&&i&&O(o,r)||s)&&m(o,r,"Got unwanted exception"+n),t&&o&&r&&!O(o,r)||!t&&o)throw o}h.AssertionError=function(t){this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=function(t){return _(v(t.actual),128)+" "+t.operator+" "+_(v(t.expected),128)}(this),this.generatedMessage=!0);var e=t.stackStartFunction||m;if(Error.captureStackTrace)Error.captureStackTrace(this,e);else{var r=new Error;if(r.stack){var n=r.stack,o=d(e),i=n.indexOf("\n"+o);if(i>=0){var s=n.indexOf("\n",i+1);n=n.substring(s+1)}this.stack=n}}},a.inherits(h.AssertionError,Error),h.fail=m,h.ok=g,h.equal=function(t,e,r){t!=e&&m(t,e,r,"==",h.equal)},h.notEqual=function(t,e,r){t==e&&m(t,e,r,"!=",h.notEqual)},h.deepEqual=function(t,e,r){b(t,e,!1)||m(t,e,r,"deepEqual",h.deepEqual)},h.deepStrictEqual=function(t,e,r){b(t,e,!0)||m(t,e,r,"deepStrictEqual",h.deepStrictEqual)},h.notDeepEqual=function(t,e,r){b(t,e,!1)&&m(t,e,r,"notDeepEqual",h.notDeepEqual)},h.notDeepStrictEqual=function t(e,r,n){b(e,r,!0)&&m(e,r,n,"notDeepStrictEqual",t)},h.strictEqual=function(t,e,r){t!==e&&m(t,e,r,"===",h.strictEqual)},h.notStrictEqual=function(t,e,r){t===e&&m(t,e,r,"!==",h.notStrictEqual)},h.throws=function(t,e,r){S(!0,t,e,r)},h.doesNotThrow=function(t,e,r){S(!1,t,e,r)},h.ifError=function(t){if(t)throw t},h.strict=o((function t(e,r){e||m(e,!0,r,"==",t)}),h,{equal:h.strictEqual,deepEqual:h.deepStrictEqual,notEqual:h.notStrictEqual,notDeepEqual:h.notDeepStrictEqual}),h.strict.strict=h.strict;var A=Object.keys||function(t){var e=[];for(var r in t)u.call(t,r)&&e.push(r);return e}}).call(this,r(9))},function(t,e){function r(t,e){if(!(this instanceof r))return new r(t,e);this._bsontype="Long",this.low_=0|t,this.high_=0|e}r.prototype.toInt=function(){return this.low_},r.prototype.toNumber=function(){return this.high_*r.TWO_PWR_32_DBL_+this.getLowBitsUnsigned()},r.prototype.toBigInt=function(){return BigInt(this.toString())},r.prototype.toJSON=function(){return this.toString()},r.prototype.toString=function(t){var e=t||10;if(e<2||36<e)throw Error("radix out of range: "+e);if(this.isZero())return"0";if(this.isNegative()){if(this.equals(r.MIN_VALUE)){var n=r.fromNumber(e),o=this.div(n),i=o.multiply(n).subtract(this);return o.toString(e)+i.toInt().toString(e)}return"-"+this.negate().toString(e)}var s=r.fromNumber(Math.pow(e,6));i=this;for(var a="";!i.isZero();){var u=i.div(s),c=i.subtract(u.multiply(s)).toInt().toString(e);if((i=u).isZero())return c+a;for(;c.length<6;)c="0"+c;a=""+c+a}},r.prototype.getHighBits=function(){return this.high_},r.prototype.getLowBits=function(){return this.low_},r.prototype.getLowBitsUnsigned=function(){return this.low_>=0?this.low_:r.TWO_PWR_32_DBL_+this.low_},r.prototype.getNumBitsAbs=function(){if(this.isNegative())return this.equals(r.MIN_VALUE)?64:this.negate().getNumBitsAbs();for(var t=0!==this.high_?this.high_:this.low_,e=31;e>0&&0==(t&1<<e);e--);return 0!==this.high_?e+33:e+1},r.prototype.isZero=function(){return 0===this.high_&&0===this.low_},r.prototype.isNegative=function(){return this.high_<0},r.prototype.isOdd=function(){return 1==(1&this.low_)},r.prototype.equals=function(t){return this.high_===t.high_&&this.low_===t.low_},r.prototype.notEquals=function(t){return this.high_!==t.high_||this.low_!==t.low_},r.prototype.lessThan=function(t){return this.compare(t)<0},r.prototype.lessThanOrEqual=function(t){return this.compare(t)<=0},r.prototype.greaterThan=function(t){return this.compare(t)>0},r.prototype.greaterThanOrEqual=function(t){return this.compare(t)>=0},r.prototype.compare=function(t){if(this.equals(t))return 0;var e=this.isNegative(),r=t.isNegative();return e&&!r?-1:!e&&r?1:this.subtract(t).isNegative()?-1:1},r.prototype.negate=function(){return this.equals(r.MIN_VALUE)?r.MIN_VALUE:this.not().add(r.ONE)},r.prototype.add=function(t){var e=this.high_>>>16,n=65535&this.high_,o=this.low_>>>16,i=65535&this.low_,s=t.high_>>>16,a=65535&t.high_,u=t.low_>>>16,c=0,l=0,f=0,p=0;return f+=(p+=i+(65535&t.low_))>>>16,p&=65535,l+=(f+=o+u)>>>16,f&=65535,c+=(l+=n+a)>>>16,l&=65535,c+=e+s,c&=65535,r.fromBits(f<<16|p,c<<16|l)},r.prototype.subtract=function(t){return this.add(t.negate())},r.prototype.multiply=function(t){if(this.isZero())return r.ZERO;if(t.isZero())return r.ZERO;if(this.equals(r.MIN_VALUE))return t.isOdd()?r.MIN_VALUE:r.ZERO;if(t.equals(r.MIN_VALUE))return this.isOdd()?r.MIN_VALUE:r.ZERO;if(this.isNegative())return t.isNegative()?this.negate().multiply(t.negate()):this.negate().multiply(t).negate();if(t.isNegative())return this.multiply(t.negate()).negate();if(this.lessThan(r.TWO_PWR_24_)&&t.lessThan(r.TWO_PWR_24_))return r.fromNumber(this.toNumber()*t.toNumber());var e=this.high_>>>16,n=65535&this.high_,o=this.low_>>>16,i=65535&this.low_,s=t.high_>>>16,a=65535&t.high_,u=t.low_>>>16,c=65535&t.low_,l=0,f=0,p=0,h=0;return p+=(h+=i*c)>>>16,h&=65535,f+=(p+=o*c)>>>16,p&=65535,f+=(p+=i*u)>>>16,p&=65535,l+=(f+=n*c)>>>16,f&=65535,l+=(f+=o*u)>>>16,f&=65535,l+=(f+=i*a)>>>16,f&=65535,l+=e*c+n*u+o*a+i*s,l&=65535,r.fromBits(p<<16|h,l<<16|f)},r.prototype.div=function(t){if(t.isZero())throw Error("division by zero");if(this.isZero())return r.ZERO;if(this.equals(r.MIN_VALUE)){if(t.equals(r.ONE)||t.equals(r.NEG_ONE))return r.MIN_VALUE;if(t.equals(r.MIN_VALUE))return r.ONE;var e=this.shiftRight(1).div(t).shiftLeft(1);if(e.equals(r.ZERO))return t.isNegative()?r.ONE:r.NEG_ONE;var n=this.subtract(t.multiply(e));return e.add(n.div(t))}if(t.equals(r.MIN_VALUE))return r.ZERO;if(this.isNegative())return t.isNegative()?this.negate().div(t.negate()):this.negate().div(t).negate();if(t.isNegative())return this.div(t.negate()).negate();var o=r.ZERO;for(n=this;n.greaterThanOrEqual(t);){e=Math.max(1,Math.floor(n.toNumber()/t.toNumber()));for(var i=Math.ceil(Math.log(e)/Math.LN2),s=i<=48?1:Math.pow(2,i-48),a=r.fromNumber(e),u=a.multiply(t);u.isNegative()||u.greaterThan(n);)e-=s,u=(a=r.fromNumber(e)).multiply(t);a.isZero()&&(a=r.ONE),o=o.add(a),n=n.subtract(u)}return o},r.prototype.modulo=function(t){return this.subtract(this.div(t).multiply(t))},r.prototype.not=function(){return r.fromBits(~this.low_,~this.high_)},r.prototype.and=function(t){return r.fromBits(this.low_&t.low_,this.high_&t.high_)},r.prototype.or=function(t){return r.fromBits(this.low_|t.low_,this.high_|t.high_)},r.prototype.xor=function(t){return r.fromBits(this.low_^t.low_,this.high_^t.high_)},r.prototype.shiftLeft=function(t){if(0===(t&=63))return this;var e=this.low_;if(t<32){var n=this.high_;return r.fromBits(e<<t,n<<t|e>>>32-t)}return r.fromBits(0,e<<t-32)},r.prototype.shiftRight=function(t){if(0===(t&=63))return this;var e=this.high_;if(t<32){var n=this.low_;return r.fromBits(n>>>t|e<<32-t,e>>t)}return r.fromBits(e>>t-32,e>=0?0:-1)},r.prototype.shiftRightUnsigned=function(t){if(0===(t&=63))return this;var e=this.high_;if(t<32){var n=this.low_;return r.fromBits(n>>>t|e<<32-t,e>>>t)}return 32===t?r.fromBits(e,0):r.fromBits(e>>>t-32,0)},r.fromInt=function(t){if(-128<=t&&t<128){var e=r.INT_CACHE_[t];if(e)return e}var n=new r(0|t,t<0?-1:0);return-128<=t&&t<128&&(r.INT_CACHE_[t]=n),n},r.fromNumber=function(t){return isNaN(t)||!isFinite(t)?r.ZERO:t<=-r.TWO_PWR_63_DBL_?r.MIN_VALUE:t+1>=r.TWO_PWR_63_DBL_?r.MAX_VALUE:t<0?r.fromNumber(-t).negate():new r(t%r.TWO_PWR_32_DBL_|0,t/r.TWO_PWR_32_DBL_|0)},r.fromBigInt=function(t){return r.fromString(t.toString(10),10)},r.fromBits=function(t,e){return new r(t,e)},r.fromString=function(t,e){if(0===t.length)throw Error("number format error: empty string");var n=e||10;if(n<2||36<n)throw Error("radix out of range: "+n);if("-"===t.charAt(0))return r.fromString(t.substring(1),n).negate();if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character: '+t);for(var o=r.fromNumber(Math.pow(n,8)),i=r.ZERO,s=0;s<t.length;s+=8){var a=Math.min(8,t.length-s),u=parseInt(t.substring(s,s+a),n);if(a<8){var c=r.fromNumber(Math.pow(n,a));i=i.multiply(c).add(r.fromNumber(u))}else i=(i=i.multiply(o)).add(r.fromNumber(u))}return i},r.INT_CACHE_={},r.TWO_PWR_16_DBL_=65536,r.TWO_PWR_24_DBL_=1<<24,r.TWO_PWR_32_DBL_=r.TWO_PWR_16_DBL_*r.TWO_PWR_16_DBL_,r.TWO_PWR_31_DBL_=r.TWO_PWR_32_DBL_/2,r.TWO_PWR_48_DBL_=r.TWO_PWR_32_DBL_*r.TWO_PWR_16_DBL_,r.TWO_PWR_64_DBL_=r.TWO_PWR_32_DBL_*r.TWO_PWR_32_DBL_,r.TWO_PWR_63_DBL_=r.TWO_PWR_64_DBL_/2,r.ZERO=r.fromInt(0),r.ONE=r.fromInt(1),r.NEG_ONE=r.fromInt(-1),r.MAX_VALUE=r.fromBits(-1,2147483647),r.MIN_VALUE=r.fromBits(0,-2147483648),r.TWO_PWR_24_=r.fromInt(1<<24),t.exports=r,t.exports.Long=r},function(t,e,r){"use strict";var n=r(67),o=r(22),i=Symbol("mongoose:emitted");t.exports=function(t,e,r,s){return"function"==typeof t?e((function(e){if(null==e)t.apply(this,arguments);else{null!=r&&null!=r.listeners&&r.listeners("error").length>0&&!e[i]&&(e[i]=!0,r.emit("error",e));try{t(e)}catch(e){return o((function(){throw e}))}}})):new(s=s||n.get())((function(t,n){e((function(e,o){return null!=e?(null!=r&&null!=r.listeners&&r.listeners("error").length>0&&!e[i]&&(e[i]=!0,r.emit("error",e)),n(e)):arguments.length>2?t(Array.prototype.slice.call(arguments,1)):void t(o)}))}))}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(6),o=r(34),i=r(21),s=r(1);function a(t,e){if(e&&e.default){var r=e.default;Array.isArray(r)&&0===r.length?e.default=Array:!e.shared&&i(r)&&0===Object.keys(r).length&&(e.default=function(){return{}})}n.call(this,t,e,"Mixed"),this[o.schemaMixedSymbol]=!0}a.schemaName="Mixed",a.defaultOptions={},
/*!
 * Inherits from SchemaType.
 */
a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.get=n.get,a.set=n.set,a.prototype.cast=function(t){return t instanceof Error?s.errorToPOJO(t):t},a.prototype.castForQuery=function(t,e){return 2===arguments.length?e:t},
/*!
 * Module exports.
 */
t.exports=a},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(61)(),o=r(19).EventEmitter,i=r(32),s=r(22),a=r(17).internalToObjectOptions,u=r(3),c=r(25),l=r(4),f=r(0).documentArrayParent,p=r(0).validatorErrorSymbol;function h(t,e,r,o,i){var s={};null!=e&&e.isMongooseDocumentArray?(this.__parentArray=e,this[f]=e.$parent()):(this.__parentArray=void 0,this[f]=void 0),this.$setIndex(i),this.$isDocumentArrayElement=!0,null!=this[f]&&(s.defaults=this[f].$__.$options.defaults),n.call(this,t,o,r,s);var a=this;this.on("isNew",(function(t){a.isNew=t})),a.on("save",(function(){a.constructor.emit("save",a)}))}
/*!
 * Inherit from Document
 */for(var y in h.prototype=Object.create(n.prototype),h.prototype.constructor=h,o.prototype)h[y]=o.prototype[y];h.prototype.toBSON=function(){return this.toObject(a)},
/*!
 * ignore
 */
h.prototype.$setIndex=function(t){if(this.__index=t,null!=u(this,"$__.validationError",null))for(var e=0,r=Object.keys(this.$__.validationError.errors);e<r.length;e++){var n=r[e];this.invalidate(n,this.$__.validationError.errors[n])}},h.prototype.markModified=function(t){if(this.$__.activePaths.modify(t),this.__parentArray){var e=this.__parentArray.$path()+".0."+t;this.isNew&&this.ownerDocument().$__isSelected(e)?this.__parentArray._markModified():this.__parentArray._markModified(this,t)}},
/*!
 * ignore
 */
h.prototype.populate=function(){throw new Error('Mongoose does not support calling populate() on nested docs. Instead of `doc.arr[0].populate("path")`, use `doc.populate("arr.0.path")`')},h.prototype.save=function(t,e){var r=this;return"function"==typeof t&&(e=t,t={}),(t=t||{}).suppressWarning||console.warn("mongoose: calling `save()` on a subdoc does **not** save the document to MongoDB, it only runs save middleware. Use `subdoc.save({ suppressWarning: true })` to hide this warning if you're sure this behavior is right for your app."),c(e,(function(t){r.$__save(t)}))},h.prototype.$__save=function(t){var e=this;return s((function(){return t(null,e)}))},
/*!
 * no-op for hooks
 */
h.prototype.$__remove=function(t){if(null!=t)return t(null,this)},h.prototype.remove=function(t,e){if("function"!=typeof t||e||(e=t,t=void 0),!this.__parentArray||t&&t.noop)return this.$__remove(e),this;var r;if(!this.willRemove){if(!(r=this._doc._id))throw new Error("For your own good, Mongoose does not know how to remove an EmbeddedDocument that has no _id");this.__parentArray.pull({_id:r}),this.willRemove=!0,
/*!
 * Registers remove event listeners for triggering
 * on subdocuments.
 *
 * @param {EmbeddedDocument} sub
 * @api private
 */
function(t){var e=t.ownerDocument();function r(){e.removeListener("save",r),e.removeListener("remove",r),t.emit("remove",t),t.constructor.emit("remove",t),e=t=null}e.on("save",r),e.on("remove",r)}(this)}return this.$__remove(e),this},h.prototype.update=function(){throw new Error("The #update method is not available on EmbeddedDocuments")},h.prototype.inspect=function(){return this.toObject({transform:!1,virtuals:!1,flattenDecimals:!1})},l.inspect.custom&&(
/*!
  * Avoid Node deprecation warning DEP0079
  */
h.prototype[l.inspect.custom]=h.prototype.inspect),h.prototype.invalidate=function(t,e,r){if(n.prototype.invalidate.call(this,t,e,r),!this[f]||null==this.__index){if(e[p]||e instanceof i)return this.ownerDocument().$__.validationError;throw e}var o=this.__index,s=[this.__parentArray.$path(),o,t].join(".");return this[f].invalidate(s,e,r),this.ownerDocument().$__.validationError},h.prototype.$markValid=function(t){if(this[f]){var e=this.__index;if(void 0!==e){var r=[this.__parentArray.$path(),e,t].join(".");this[f].$markValid(r)}}},
/*!
 * ignore
 */
h.prototype.$ignore=function(t){if(n.prototype.$ignore.call(this,t),this[f]){var e=this.__index;if(void 0!==e){var r=[this.__parentArray.$path(),e,t].join(".");this[f].$ignore(r)}}},h.prototype.$isValid=function(t){return void 0===this.__index||!this[f]||(!this[f].$__.validationError||!this[f].$__.validationError.errors[this.$__fullPath(t)])},h.prototype.ownerDocument=function(){if(this.$__.ownerDocument)return this.$__.ownerDocument;var t=this[f];if(!t)return this;for(;t[f]||t.$__parent;)t=t[f]||t.$__parent;return this.$__.ownerDocument=t,this.$__.ownerDocument},h.prototype.$__fullPath=function(t){if(!this.$__.fullPath){var e=this;if(!e[f])return t;for(var r=[];e[f]||e.$__parent;)e[f]?r.unshift(e.__parentArray.$path()):r.unshift(e.$basePath),e=e[f]||e.$__parent;this.$__.fullPath=r.join("."),this.$__.ownerDocument||(this.$__.ownerDocument=e)}return t?this.$__.fullPath+"."+t:this.$__.fullPath},h.prototype.parent=function(){return this[f]},h.prototype.$parent=h.prototype.parent,h.prototype.parentArray=function(){return this.__parentArray},
/*!
 * Module exports.
 */
t.exports=h},function(t,e,r){(function(e){if(void 0!==e)var n=r(2).Buffer;var o=r(16);function i(t,e){if(!(this instanceof i))return new i(t,e);if(!(null==t||"string"==typeof t||n.isBuffer(t)||t instanceof Uint8Array||Array.isArray(t)))throw new Error("only String, Buffer, Uint8Array or Array accepted");if(this._bsontype="Binary",t instanceof Number?(this.sub_type=t,this.position=0):(this.sub_type=null==e?s:e,this.position=0),null==t||t instanceof Number)void 0!==n?this.buffer=o.allocBuffer(i.BUFFER_SIZE):"undefined"!=typeof Uint8Array?this.buffer=new Uint8Array(new ArrayBuffer(i.BUFFER_SIZE)):this.buffer=new Array(i.BUFFER_SIZE),this.position=0;else{if("string"==typeof t)if(void 0!==n)this.buffer=o.toBuffer(t);else{if("undefined"==typeof Uint8Array&&"[object Array]"!==Object.prototype.toString.call(t))throw new Error("only String, Buffer, Uint8Array or Array accepted");this.buffer=a(t)}else this.buffer=t;this.position=t.length}}i.prototype.put=function(t){if(null!=t.length&&"number"!=typeof t&&1!==t.length)throw new Error("only accepts single character String, Uint8Array or Array");if("number"!=typeof t&&t<0||t>255)throw new Error("only accepts number in a valid unsigned byte range 0-255");var e=null;if(e="string"==typeof t?t.charCodeAt(0):null!=t.length?t[0]:t,this.buffer.length>this.position)this.buffer[this.position++]=e;else if(void 0!==n&&n.isBuffer(this.buffer)){var r=o.allocBuffer(i.BUFFER_SIZE+this.buffer.length);this.buffer.copy(r,0,0,this.buffer.length),this.buffer=r,this.buffer[this.position++]=e}else{r=null,r="[object Uint8Array]"===Object.prototype.toString.call(this.buffer)?new Uint8Array(new ArrayBuffer(i.BUFFER_SIZE+this.buffer.length)):new Array(i.BUFFER_SIZE+this.buffer.length);for(var s=0;s<this.buffer.length;s++)r[s]=this.buffer[s];this.buffer=r,this.buffer[this.position++]=e}},i.prototype.write=function(t,e){if(e="number"==typeof e?e:this.position,this.buffer.length<e+t.length){var r=null;if(void 0!==n&&n.isBuffer(this.buffer))r=o.allocBuffer(this.buffer.length+t.length),this.buffer.copy(r,0,0,this.buffer.length);else if("[object Uint8Array]"===Object.prototype.toString.call(this.buffer)){r=new Uint8Array(new ArrayBuffer(this.buffer.length+t.length));for(var i=0;i<this.position;i++)r[i]=this.buffer[i]}this.buffer=r}if(void 0!==n&&n.isBuffer(t)&&n.isBuffer(this.buffer))t.copy(this.buffer,e,0,t.length),this.position=e+t.length>this.position?e+t.length:this.position;else if(void 0!==n&&"string"==typeof t&&n.isBuffer(this.buffer))this.buffer.write(t,e,"binary"),this.position=e+t.length>this.position?e+t.length:this.position;else if("[object Uint8Array]"===Object.prototype.toString.call(t)||"[object Array]"===Object.prototype.toString.call(t)&&"string"!=typeof t){for(i=0;i<t.length;i++)this.buffer[e++]=t[i];this.position=e>this.position?e:this.position}else if("string"==typeof t){for(i=0;i<t.length;i++)this.buffer[e++]=t.charCodeAt(i);this.position=e>this.position?e:this.position}},i.prototype.read=function(t,e){if(e=e&&e>0?e:this.position,this.buffer.slice)return this.buffer.slice(t,t+e);for(var r="undefined"!=typeof Uint8Array?new Uint8Array(new ArrayBuffer(e)):new Array(e),n=0;n<e;n++)r[n]=this.buffer[t++];return r},i.prototype.value=function(t){if((t=null!=t&&t)&&void 0!==n&&n.isBuffer(this.buffer)&&this.buffer.length===this.position)return this.buffer;if(void 0!==n&&n.isBuffer(this.buffer))return t?this.buffer.slice(0,this.position):this.buffer.toString("binary",0,this.position);if(t){if(null!=this.buffer.slice)return this.buffer.slice(0,this.position);for(var e="[object Uint8Array]"===Object.prototype.toString.call(this.buffer)?new Uint8Array(new ArrayBuffer(this.position)):new Array(this.position),r=0;r<this.position;r++)e[r]=this.buffer[r];return e}return u(this.buffer,0,this.position)},i.prototype.length=function(){return this.position},i.prototype.toJSON=function(){return null!=this.buffer?this.buffer.toString("base64"):""},i.prototype.toString=function(t){return null!=this.buffer?this.buffer.slice(0,this.position).toString(t):""};var s=0,a=function(t){for(var e="undefined"!=typeof Uint8Array?new Uint8Array(new ArrayBuffer(t.length)):new Array(t.length),r=0;r<t.length;r++)e[r]=t.charCodeAt(r);return e},u=function(t,e,r){for(var n="",o=e;o<r;o++)n+=String.fromCharCode(t[o]);return n};i.BUFFER_SIZE=256,i.SUBTYPE_DEFAULT=0,i.SUBTYPE_FUNCTION=1,i.SUBTYPE_BYTE_ARRAY=2,i.SUBTYPE_UUID_OLD=3,i.SUBTYPE_UUID=4,i.SUBTYPE_MD5=5,i.SUBTYPE_USER_DEFINED=128,t.exports=i,t.exports.Binary=i}).call(this,r(9))},function(t,e,r){"use strict";function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r(64),s=r(20),a=r(10),u=r(50),c=r(30),l=r(65),f=r(66),p=r(21),h=r(0),y=r(1);
/*!
 * Object clone with Mongoose natives support.
 *
 * If options.minimize is true, creates a minimal data object. Empty objects and undefined values will not be cloned. This makes the data payload sent to MongoDB as small as possible.
 *
 * Functions are never cloned.
 *
 * @param {Object} obj the object to clone
 * @param {Object} options
 * @param {Boolean} isArrayChild true if cloning immediately underneath an array. Special case for minimize.
 * @return {Object} the cloned object
 * @api private
 */
function d(t,e,r){if(null==t)return t;if(Array.isArray(t))return function(t,e){var r,o=[],i=n(t);try{for(i.s();!(r=i.n()).done;){var s=r.value;o.push(d(s,e,!0))}}catch(t){i.e(t)}finally{i.f()}return o}(t,e);if(c(t))return e&&e._skipSingleNestedGetters&&t.$isSingleNested&&(e=Object.assign({},e,{getters:!1})),y.isPOJO(t)&&null!=t.$__&&null!=t._doc?t._doc:e&&e.json&&"function"==typeof t.toJSON?t.toJSON(e):t.toObject(e);if(t.constructor)switch(l(t.constructor)){case"Object":return _(t,e,r);case"Date":return new t.constructor(+t);case"RegExp":return i(t)}return t instanceof a?new a(t.id):f(t,"Decimal128")?e&&e.flattenDecimals?t.toJSON():s.fromString(t.toString()):!t.constructor&&p(t)?_(t,e,r):t[h.schemaTypeSymbol]?t.clone():e&&e.bson&&"function"==typeof t.toBSON?t:null!=t.valueOf?t.valueOf():_(t,e,r)}
/*!
 * ignore
 */
function _(t,e,r){for(var n,o=e&&e.minimize,i={},s=0,a=Object.keys(t);s<a.length;s++){var c=a[s];if(!u.has(c)){var l=d(t[c],e);o&&void 0===l||(!1===o&&void 0===l?delete i[c]:(n||(n=!0),i[c]=l))}}return o&&!r?n&&i:i}t.exports=d},function(t,e,r){"use strict";
/*!
 * Returns if `v` is a mongoose object that has a `toObject()` method we can use.
 *
 * This is for compatibility with libs like Date.js which do foolish things to Natives.
 *
 * @param {any} v
 * @api private
 */t.exports=function(t){return null!=t&&(null!=t.$__||t.isMongooseArray||t.isMongooseBuffer||t.$isMongooseMap)}},function(t,e,r){"use strict";var n=["find","findOne","update","updateMany","updateOne","replaceOne","remove","count","distinct","findAndModify","aggregate","findStream","deleteOne","deleteMany"];function o(){}for(var i=0,s=n.length;i<s;++i){var a=n[i];o.prototype[a]=u(a)}function u(t){return function(){throw new Error("collection."+t+" not implemented")}}t.exports=o,o.methods=n},function(t,e,r){"use strict";
/*!
 * Module requirements
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=r(14),l=r(4),f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(u,t);var e,r,n,a=s(u);function u(t){var e,r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),r=t&&"model"===t.constructor.name?t.constructor.modelName+" validation failed":"Validation failed",(e=a.call(this,r)).errors={},e._message=r,t&&(t.errors=e.errors),e}return e=u,(r=[{key:"toString",value:function(){return this.name+": "+p(this)}
/*!
     * inspect helper
     */},{key:"inspect",value:function(){return Object.assign(new Error(this.message),this)}
/*!
    * add message
    */},{key:"addError",value:function(t,e){this.errors[t]=e,this.message=this._message+": "+p(this)}}])&&o(e.prototype,r),n&&o(e,n),u}(c);
/*!
 * ignore
 */
function p(t){for(var e,r=Object.keys(t.errors||{}),n=r.length,o=[],i=0;i<n;++i)e=r[i],t!==t.errors[e]&&o.push(e+": "+t.errors[e].message);return o.join(", ")}
/*!
 * Module exports
 */l.inspect.custom&&(
/*!
  * Avoid Node deprecation warning DEP0079
  */
f.prototype[l.inspect.custom]=f.prototype.inspect)
/*!
 * Helper for JSON.stringify
 * Ensure `name` and `message` show up in toJSON output re: gh-9847
 */,Object.defineProperty(f.prototype,"toJSON",{enumerable:!1,writable:!1,configurable:!0,value:function(){return Object.assign({},this,{name:this.name,message:this.message})}}),Object.defineProperty(f.prototype,"name",{value:"ValidationError"}),t.exports=f},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);function r(t,n,o){var i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),n=n||"Field `"+t+"` is not in schema and strict mode is set to throw.",(i=e.call(this,n)).isImmutableError=!!o,i.path=t,i}return r}(r(5));Object.defineProperty(u.prototype,"name",{value:"StrictModeError"}),t.exports=u},function(t,e,r){"use strict";e.schemaMixedSymbol=Symbol.for("mongoose:schema_mixed"),e.builtInMiddleware=Symbol.for("mongoose:built-in-middleware")},function(t,e,r){"use strict";
/*!
 * Module requirements.
 */var n=r(79);
/*!
 * @ignore
 */
/*!
 * @ignore
 */
function o(t){return n.cast()(t)}e.castToNumber=o,e.castArraysOfNumbers=function t(e,r){e.forEach((function(n,i){Array.isArray(n)?t(n,r):e[i]=o.call(r,n)}))}},function(t,e,r){"use strict";var n=r(81);
/*!
* returns discriminator by discriminatorMapping.value
*
* @param {Model} model
* @param {string} value
*/t.exports=function(t,e){if(null==t)return null;for(var r=0,o=Object.keys(t);r<o.length;r++){var i=t[o[r]];if(i.schema&&i.schema.discriminatorMapping&&n(i.schema.discriminatorMapping.value,e))return i}return null}},function(t,e,r){"use strict";
/*!
 * Module exports.
 */e.Array=r(84),e.Buffer=r(87),e.Document=e.Embedded=r(27),e.DocumentArray=r(18),e.Decimal128=r(20),e.ObjectId=r(10),e.Map=r(89),e.Subdocument=r(91)},function(t,e,r){"use strict";var n=r(59),o=r(24),i=r(39),s=r(40),a=r(41),u=r(42),c=r(43),l=r(60),f=r(44),p=r(45),h=r(46),y=r(47),d=r(48),_=r(28),v=r(104),m=r(105),g=r(107),b=r(16),w=b.allocBuffer(17825792),O=function(){};O.prototype.serialize=function(t,e){var r="boolean"==typeof(e=e||{}).checkKeys&&e.checkKeys,n="boolean"==typeof e.serializeFunctions&&e.serializeFunctions,o="boolean"!=typeof e.ignoreUndefined||e.ignoreUndefined,i="number"==typeof e.minInternalBufferSize?e.minInternalBufferSize:17825792;w.length<i&&(w=b.allocBuffer(i));var s=m(w,t,r,0,0,n,o,[]),a=b.allocBuffer(s);return w.copy(a,0,0,a.length),a},O.prototype.serializeWithBufferAndIndex=function(t,e,r){var n="boolean"==typeof(r=r||{}).checkKeys&&r.checkKeys,o="boolean"==typeof r.serializeFunctions&&r.serializeFunctions,i="boolean"!=typeof r.ignoreUndefined||r.ignoreUndefined,s="number"==typeof r.index?r.index:0;return m(e,t,n,s||0,0,o,i)-1},O.prototype.deserialize=function(t,e){return v(t,e)},O.prototype.calculateObjectSize=function(t,e){var r="boolean"==typeof(e=e||{}).serializeFunctions&&e.serializeFunctions,n="boolean"!=typeof e.ignoreUndefined||e.ignoreUndefined;return g(t,r,n)},O.prototype.deserializeStream=function(t,e,r,n,o,i){i=null!=i?i:{};for(var s=e,a=0;a<r;a++){var u=t[s]|t[s+1]<<8|t[s+2]<<16|t[s+3]<<24;i.index=s,n[o+a]=this.deserialize(t,i),s+=u}return s},O.BSON_INT32_MAX=2147483647,O.BSON_INT32_MIN=-2147483648,O.BSON_INT64_MAX=Math.pow(2,63)-1,O.BSON_INT64_MIN=-Math.pow(2,63),O.JS_INT_MAX=9007199254740992,O.JS_INT_MIN=-9007199254740992,O.BSON_DATA_NUMBER=1,O.BSON_DATA_STRING=2,O.BSON_DATA_OBJECT=3,O.BSON_DATA_ARRAY=4,O.BSON_DATA_BINARY=5,O.BSON_DATA_OID=7,O.BSON_DATA_BOOLEAN=8,O.BSON_DATA_DATE=9,O.BSON_DATA_NULL=10,O.BSON_DATA_REGEXP=11,O.BSON_DATA_CODE=13,O.BSON_DATA_SYMBOL=14,O.BSON_DATA_CODE_W_SCOPE=15,O.BSON_DATA_INT=16,O.BSON_DATA_TIMESTAMP=17,O.BSON_DATA_LONG=18,O.BSON_DATA_MIN_KEY=255,O.BSON_DATA_MAX_KEY=127,O.BSON_BINARY_SUBTYPE_DEFAULT=0,O.BSON_BINARY_SUBTYPE_FUNCTION=1,O.BSON_BINARY_SUBTYPE_BYTE_ARRAY=2,O.BSON_BINARY_SUBTYPE_UUID=3,O.BSON_BINARY_SUBTYPE_MD5=4,O.BSON_BINARY_SUBTYPE_USER_DEFINED=128,t.exports=O,t.exports.Code=f,t.exports.Map=n,t.exports.Symbol=c,t.exports.BSON=O,t.exports.DBRef=d,t.exports.Binary=_,t.exports.ObjectID=a,t.exports.Long=o,t.exports.Timestamp=s,t.exports.Double=i,t.exports.Int32=l,t.exports.MinKey=h,t.exports.MaxKey=y,t.exports.BSONRegExp=u,t.exports.Decimal128=p},function(t,e){function r(t){if(!(this instanceof r))return new r(t);this._bsontype="Double",this.value=t}r.prototype.valueOf=function(){return this.value},r.prototype.toJSON=function(){return this.value},t.exports=r,t.exports.Double=r},function(t,e){function r(t,e){if(!(this instanceof r))return new r(t,e);this._bsontype="Timestamp",this.low_=0|t,this.high_=0|e}r.prototype.toInt=function(){return this.low_},r.prototype.toNumber=function(){return this.high_*r.TWO_PWR_32_DBL_+this.getLowBitsUnsigned()},r.prototype.toJSON=function(){return this.toString()},r.prototype.toString=function(t){var e=t||10;if(e<2||36<e)throw Error("radix out of range: "+e);if(this.isZero())return"0";if(this.isNegative()){if(this.equals(r.MIN_VALUE)){var n=r.fromNumber(e),o=this.div(n),i=o.multiply(n).subtract(this);return o.toString(e)+i.toInt().toString(e)}return"-"+this.negate().toString(e)}var s=r.fromNumber(Math.pow(e,6));i=this;for(var a="";!i.isZero();){var u=i.div(s),c=i.subtract(u.multiply(s)).toInt().toString(e);if((i=u).isZero())return c+a;for(;c.length<6;)c="0"+c;a=""+c+a}},r.prototype.getHighBits=function(){return this.high_},r.prototype.getLowBits=function(){return this.low_},r.prototype.getLowBitsUnsigned=function(){return this.low_>=0?this.low_:r.TWO_PWR_32_DBL_+this.low_},r.prototype.getNumBitsAbs=function(){if(this.isNegative())return this.equals(r.MIN_VALUE)?64:this.negate().getNumBitsAbs();for(var t=0!==this.high_?this.high_:this.low_,e=31;e>0&&0==(t&1<<e);e--);return 0!==this.high_?e+33:e+1},r.prototype.isZero=function(){return 0===this.high_&&0===this.low_},r.prototype.isNegative=function(){return this.high_<0},r.prototype.isOdd=function(){return 1==(1&this.low_)},r.prototype.equals=function(t){return this.high_===t.high_&&this.low_===t.low_},r.prototype.notEquals=function(t){return this.high_!==t.high_||this.low_!==t.low_},r.prototype.lessThan=function(t){return this.compare(t)<0},r.prototype.lessThanOrEqual=function(t){return this.compare(t)<=0},r.prototype.greaterThan=function(t){return this.compare(t)>0},r.prototype.greaterThanOrEqual=function(t){return this.compare(t)>=0},r.prototype.compare=function(t){if(this.equals(t))return 0;var e=this.isNegative(),r=t.isNegative();return e&&!r?-1:!e&&r?1:this.subtract(t).isNegative()?-1:1},r.prototype.negate=function(){return this.equals(r.MIN_VALUE)?r.MIN_VALUE:this.not().add(r.ONE)},r.prototype.add=function(t){var e=this.high_>>>16,n=65535&this.high_,o=this.low_>>>16,i=65535&this.low_,s=t.high_>>>16,a=65535&t.high_,u=t.low_>>>16,c=0,l=0,f=0,p=0;return f+=(p+=i+(65535&t.low_))>>>16,p&=65535,l+=(f+=o+u)>>>16,f&=65535,c+=(l+=n+a)>>>16,l&=65535,c+=e+s,c&=65535,r.fromBits(f<<16|p,c<<16|l)},r.prototype.subtract=function(t){return this.add(t.negate())},r.prototype.multiply=function(t){if(this.isZero())return r.ZERO;if(t.isZero())return r.ZERO;if(this.equals(r.MIN_VALUE))return t.isOdd()?r.MIN_VALUE:r.ZERO;if(t.equals(r.MIN_VALUE))return this.isOdd()?r.MIN_VALUE:r.ZERO;if(this.isNegative())return t.isNegative()?this.negate().multiply(t.negate()):this.negate().multiply(t).negate();if(t.isNegative())return this.multiply(t.negate()).negate();if(this.lessThan(r.TWO_PWR_24_)&&t.lessThan(r.TWO_PWR_24_))return r.fromNumber(this.toNumber()*t.toNumber());var e=this.high_>>>16,n=65535&this.high_,o=this.low_>>>16,i=65535&this.low_,s=t.high_>>>16,a=65535&t.high_,u=t.low_>>>16,c=65535&t.low_,l=0,f=0,p=0,h=0;return p+=(h+=i*c)>>>16,h&=65535,f+=(p+=o*c)>>>16,p&=65535,f+=(p+=i*u)>>>16,p&=65535,l+=(f+=n*c)>>>16,f&=65535,l+=(f+=o*u)>>>16,f&=65535,l+=(f+=i*a)>>>16,f&=65535,l+=e*c+n*u+o*a+i*s,l&=65535,r.fromBits(p<<16|h,l<<16|f)},r.prototype.div=function(t){if(t.isZero())throw Error("division by zero");if(this.isZero())return r.ZERO;if(this.equals(r.MIN_VALUE)){if(t.equals(r.ONE)||t.equals(r.NEG_ONE))return r.MIN_VALUE;if(t.equals(r.MIN_VALUE))return r.ONE;var e=this.shiftRight(1).div(t).shiftLeft(1);if(e.equals(r.ZERO))return t.isNegative()?r.ONE:r.NEG_ONE;var n=this.subtract(t.multiply(e));return e.add(n.div(t))}if(t.equals(r.MIN_VALUE))return r.ZERO;if(this.isNegative())return t.isNegative()?this.negate().div(t.negate()):this.negate().div(t).negate();if(t.isNegative())return this.div(t.negate()).negate();var o=r.ZERO;for(n=this;n.greaterThanOrEqual(t);){e=Math.max(1,Math.floor(n.toNumber()/t.toNumber()));for(var i=Math.ceil(Math.log(e)/Math.LN2),s=i<=48?1:Math.pow(2,i-48),a=r.fromNumber(e),u=a.multiply(t);u.isNegative()||u.greaterThan(n);)e-=s,u=(a=r.fromNumber(e)).multiply(t);a.isZero()&&(a=r.ONE),o=o.add(a),n=n.subtract(u)}return o},r.prototype.modulo=function(t){return this.subtract(this.div(t).multiply(t))},r.prototype.not=function(){return r.fromBits(~this.low_,~this.high_)},r.prototype.and=function(t){return r.fromBits(this.low_&t.low_,this.high_&t.high_)},r.prototype.or=function(t){return r.fromBits(this.low_|t.low_,this.high_|t.high_)},r.prototype.xor=function(t){return r.fromBits(this.low_^t.low_,this.high_^t.high_)},r.prototype.shiftLeft=function(t){if(0===(t&=63))return this;var e=this.low_;if(t<32){var n=this.high_;return r.fromBits(e<<t,n<<t|e>>>32-t)}return r.fromBits(0,e<<t-32)},r.prototype.shiftRight=function(t){if(0===(t&=63))return this;var e=this.high_;if(t<32){var n=this.low_;return r.fromBits(n>>>t|e<<32-t,e>>t)}return r.fromBits(e>>t-32,e>=0?0:-1)},r.prototype.shiftRightUnsigned=function(t){if(0===(t&=63))return this;var e=this.high_;if(t<32){var n=this.low_;return r.fromBits(n>>>t|e<<32-t,e>>>t)}return 32===t?r.fromBits(e,0):r.fromBits(e>>>t-32,0)},r.fromInt=function(t){if(-128<=t&&t<128){var e=r.INT_CACHE_[t];if(e)return e}var n=new r(0|t,t<0?-1:0);return-128<=t&&t<128&&(r.INT_CACHE_[t]=n),n},r.fromNumber=function(t){return isNaN(t)||!isFinite(t)?r.ZERO:t<=-r.TWO_PWR_63_DBL_?r.MIN_VALUE:t+1>=r.TWO_PWR_63_DBL_?r.MAX_VALUE:t<0?r.fromNumber(-t).negate():new r(t%r.TWO_PWR_32_DBL_|0,t/r.TWO_PWR_32_DBL_|0)},r.fromBits=function(t,e){return new r(t,e)},r.fromString=function(t,e){if(0===t.length)throw Error("number format error: empty string");var n=e||10;if(n<2||36<n)throw Error("radix out of range: "+n);if("-"===t.charAt(0))return r.fromString(t.substring(1),n).negate();if(t.indexOf("-")>=0)throw Error('number format error: interior "-" character: '+t);for(var o=r.fromNumber(Math.pow(n,8)),i=r.ZERO,s=0;s<t.length;s+=8){var a=Math.min(8,t.length-s),u=parseInt(t.substring(s,s+a),n);if(a<8){var c=r.fromNumber(Math.pow(n,a));i=i.multiply(c).add(r.fromNumber(u))}else i=(i=i.multiply(o)).add(r.fromNumber(u))}return i},r.INT_CACHE_={},r.TWO_PWR_16_DBL_=65536,r.TWO_PWR_24_DBL_=1<<24,r.TWO_PWR_32_DBL_=r.TWO_PWR_16_DBL_*r.TWO_PWR_16_DBL_,r.TWO_PWR_31_DBL_=r.TWO_PWR_32_DBL_/2,r.TWO_PWR_48_DBL_=r.TWO_PWR_32_DBL_*r.TWO_PWR_16_DBL_,r.TWO_PWR_64_DBL_=r.TWO_PWR_32_DBL_*r.TWO_PWR_32_DBL_,r.TWO_PWR_63_DBL_=r.TWO_PWR_64_DBL_/2,r.ZERO=r.fromInt(0),r.ONE=r.fromInt(1),r.NEG_ONE=r.fromInt(-1),r.MAX_VALUE=r.fromBits(-1,2147483647),r.MIN_VALUE=r.fromBits(0,-2147483648),r.TWO_PWR_24_=r.fromInt(1<<24),t.exports=r,t.exports.Timestamp=r},function(t,e,r){(function(e,n){var o="inspect",i=r(16),s=parseInt(16777215*Math.random(),10),a=new RegExp("^[0-9a-fA-F]{24}$");try{if(e&&e.from){var u=!0;o=r(4).inspect.custom||"inspect"}}catch(t){u=!1}for(var c=function t(e){if(e instanceof t)return e;if(!(this instanceof t))return new t(e);if(this._bsontype="ObjectID",null==e||"number"==typeof e)return this.id=this.generate(e),void(t.cacheHexString&&(this.__id=this.toString("hex")));var r=t.isValid(e);if(!r&&null!=e)throw new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");if(r&&"string"==typeof e&&24===e.length&&u)return new t(i.toBuffer(e,"hex"));if(r&&"string"==typeof e&&24===e.length)return t.createFromHexString(e);if(null==e||12!==e.length){if(null!=e&&"function"==typeof e.toHexString)return e;throw new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters")}this.id=e,t.cacheHexString&&(this.__id=this.toString("hex"))},l=[],f=0;f<256;f++)l[f]=(f<=15?"0":"")+f.toString(16);c.prototype.toHexString=function(){if(c.cacheHexString&&this.__id)return this.__id;var t="";if(!this.id||!this.id.length)throw new Error("invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is ["+JSON.stringify(this.id)+"]");if(this.id instanceof h)return t=y(this.id),c.cacheHexString&&(this.__id=t),t;for(var e=0;e<this.id.length;e++)t+=l[this.id.charCodeAt(e)];return c.cacheHexString&&(this.__id=t),t},c.prototype.get_inc=function(){return c.index=(c.index+1)%16777215},c.prototype.getInc=function(){return this.get_inc()},c.prototype.generate=function(t){"number"!=typeof t&&(t=~~(Date.now()/1e3));var e=(void 0===n||1===n.pid?Math.floor(1e5*Math.random()):n.pid)%65535,r=this.get_inc(),o=i.allocBuffer(12);return o[3]=255&t,o[2]=t>>8&255,o[1]=t>>16&255,o[0]=t>>24&255,o[6]=255&s,o[5]=s>>8&255,o[4]=s>>16&255,o[8]=255&e,o[7]=e>>8&255,o[11]=255&r,o[10]=r>>8&255,o[9]=r>>16&255,o},c.prototype.toString=function(t){return this.id&&this.id.copy?this.id.toString("string"==typeof t?t:"hex"):this.toHexString()},c.prototype[o]=c.prototype.toString,c.prototype.toJSON=function(){return this.toHexString()},c.prototype.equals=function(t){return t instanceof c?this.toString()===t.toString():"string"==typeof t&&c.isValid(t)&&12===t.length&&this.id instanceof h?t===this.id.toString("binary"):"string"==typeof t&&c.isValid(t)&&24===t.length?t.toLowerCase()===this.toHexString():"string"==typeof t&&c.isValid(t)&&12===t.length?t===this.id:!(null==t||!(t instanceof c||t.toHexString))&&t.toHexString()===this.toHexString()},c.prototype.getTimestamp=function(){var t=new Date,e=this.id[3]|this.id[2]<<8|this.id[1]<<16|this.id[0]<<24;return t.setTime(1e3*Math.floor(e)),t},c.index=~~(16777215*Math.random()),c.createPk=function(){return new c},c.createFromTime=function(t){var e=i.toBuffer([0,0,0,0,0,0,0,0,0,0,0,0]);return e[3]=255&t,e[2]=t>>8&255,e[1]=t>>16&255,e[0]=t>>24&255,new c(e)};var p=[];for(f=0;f<10;)p[48+f]=f++;for(;f<16;)p[55+f]=p[87+f]=f++;var h=e,y=function(t){return t.toString("hex")};c.createFromHexString=function(t){if(void 0===t||null!=t&&24!==t.length)throw new Error("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");if(u)return new c(i.toBuffer(t,"hex"));for(var e=new h(12),r=0,n=0;n<24;)e[r++]=p[t.charCodeAt(n++)]<<4|p[t.charCodeAt(n++)];return new c(e)},c.isValid=function(t){return null!=t&&("number"==typeof t||("string"==typeof t?12===t.length||24===t.length&&a.test(t):t instanceof c||(t instanceof h||"function"==typeof t.toHexString&&(t.id instanceof h||"string"==typeof t.id)&&(12===t.id.length||24===t.id.length&&a.test(t.id)))))},Object.defineProperty(c.prototype,"generationTime",{enumerable:!0,get:function(){return this.id[3]|this.id[2]<<8|this.id[1]<<16|this.id[0]<<24},set:function(t){this.id[3]=255&t,this.id[2]=t>>8&255,this.id[1]=t>>16&255,this.id[0]=t>>24&255}}),t.exports=c,t.exports.ObjectID=c,t.exports.ObjectId=c}).call(this,r(2).Buffer,r(11))},function(t,e){function r(t,e){if(!(this instanceof r))return new r;this._bsontype="BSONRegExp",this.pattern=t||"",this.options=e||"";for(var n=0;n<this.options.length;n++)if("i"!==this.options[n]&&"m"!==this.options[n]&&"x"!==this.options[n]&&"l"!==this.options[n]&&"s"!==this.options[n]&&"u"!==this.options[n])throw new Error("the regular expression options ["+this.options[n]+"] is not supported")}t.exports=r,t.exports.BSONRegExp=r},function(t,e,r){(function(e){var n=e&&r(4).inspect.custom||"inspect";function o(t){if(!(this instanceof o))return new o(t);this._bsontype="Symbol",this.value=t}o.prototype.valueOf=function(){return this.value},o.prototype.toString=function(){return this.value},o.prototype[n]=function(){return this.value},o.prototype.toJSON=function(){return this.value},t.exports=o,t.exports.Symbol=o}).call(this,r(2).Buffer)},function(t,e){var r=function t(e,r){if(!(this instanceof t))return new t(e,r);this._bsontype="Code",this.code=e,this.scope=r};r.prototype.toJSON=function(){return{scope:this.scope,code:this.code}},t.exports=r,t.exports.Code=r},function(t,e,r){"use strict";var n=r(24),o=/^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/,i=/^(\+|-)?(Infinity|inf)$/i,s=/^(\+|-)?NaN$/i,a=6176,u=[124,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].reverse(),c=[248,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].reverse(),l=[120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].reverse(),f=/^([-+])?(\d+)?$/,p=r(16),h=function(t){return!isNaN(parseInt(t,10))},y=function(t){var e=n.fromNumber(1e9),r=n.fromNumber(0),o=0;if(!(t.parts[0]||t.parts[1]||t.parts[2]||t.parts[3]))return{quotient:t,rem:r};for(o=0;o<=3;o++)r=(r=r.shiftLeft(32)).add(new n(t.parts[o],0)),t.parts[o]=r.div(e).low_,r=r.modulo(e);return{quotient:t,rem:r}},d=function(t){this._bsontype="Decimal128",this.bytes=t};d.fromString=function(t){var e,r=!1,y=!1,_=!1,v=0,m=0,g=0,b=0,w=0,O=[0],S=0,A=0,$=0,E=0,j=0,P=0,x=[0,0],T=[0,0],N=0;if((t=t.trim()).length>=7e3)throw new Error(t+" not a valid Decimal128 string");var k=t.match(o),B=t.match(i),C=t.match(s);if(!k&&!B&&!C||0===t.length)throw new Error(t+" not a valid Decimal128 string");if(k&&k[4]&&void 0===k[2])throw new Error(t+" not a valid Decimal128 string");if("+"!==t[N]&&"-"!==t[N]||(r="-"===t[N++]),!h(t[N])&&"."!==t[N]){if("i"===t[N]||"I"===t[N])return new d(p.toBuffer(r?c:l));if("N"===t[N])return new d(p.toBuffer(u))}for(;h(t[N])||"."===t[N];)if("."!==t[N])S<34&&("0"!==t[N]||_)&&(_||(w=m),_=!0,O[A++]=parseInt(t[N],10),S+=1),_&&(g+=1),y&&(b+=1),m+=1,N+=1;else{if(y)return new d(p.toBuffer(u));y=!0,N+=1}if(y&&!m)throw new Error(t+" not a valid Decimal128 string");if("e"===t[N]||"E"===t[N]){var R=t.substr(++N).match(f);if(!R||!R[2])return new d(p.toBuffer(u));j=parseInt(R[0],10),N+=R[0].length}if(t[N])return new d(p.toBuffer(u));if($=0,S){if(E=S-1,v=g,0!==j&&1!==v)for(;"0"===t[w+v-1];)v-=1}else $=0,E=0,O[0]=0,g=1,S=1,v=0;for(j<=b&&b-j>16384?j=-6176:j-=b;j>6111;){if((E+=1)-$>34){var D=O.join("");if(D.match(/^0+$/)){j=6111;break}return new d(p.toBuffer(r?c:l))}j-=1}for(;j<-6176||S<g;){if(0===E){j=-6176,v=0;break}if(S<g?g-=1:E-=1,!(j<6111)){if((D=O.join("")).match(/^0+$/)){j=6111;break}return new d(p.toBuffer(r?c:l))}j+=1}if(E-$+1<v&&"0"!==t[v]){var M=m;y&&-6176===j&&(w+=1,M+=1);var I=parseInt(t[w+E+1],10),F=0;if(I>=5&&(F=1,5===I))for(F=O[E]%2==1,P=w+E+2;P<M;P++)if(parseInt(t[P],10)){F=1;break}if(F)for(var L=E;L>=0&&++O[L]>9;L--)if(O[L]=0,0===L){if(!(j<6111))return new d(p.toBuffer(r?c:l));j+=1,O[L]=1}}if(x=n.fromNumber(0),T=n.fromNumber(0),0===v)x=n.fromNumber(0),T=n.fromNumber(0);else if(E-$<17)for(L=$,T=n.fromNumber(O[L++]),x=new n(0,0);L<=E;L++)T=(T=T.multiply(n.fromNumber(10))).add(n.fromNumber(O[L]));else{for(L=$,x=n.fromNumber(O[L++]);L<=E-17;L++)x=(x=x.multiply(n.fromNumber(10))).add(n.fromNumber(O[L]));for(T=n.fromNumber(O[L++]);L<=E;L++)T=(T=T.multiply(n.fromNumber(10))).add(n.fromNumber(O[L]))}var U,V,q,W,H=function(t,e){if(!t&&!e)return{high:n.fromNumber(0),low:n.fromNumber(0)};var r=t.shiftRightUnsigned(32),o=new n(t.getLowBits(),0),i=e.shiftRightUnsigned(32),s=new n(e.getLowBits(),0),a=r.multiply(i),u=r.multiply(s),c=o.multiply(i),l=o.multiply(s);return a=a.add(u.shiftRightUnsigned(32)),u=new n(u.getLowBits(),0).add(c).add(l.shiftRightUnsigned(32)),{high:a=a.add(u.shiftRightUnsigned(32)),low:l=u.shiftLeft(32).add(new n(l.getLowBits(),0))}}(x,n.fromString("100000000000000000"));H.low=H.low.add(T),U=H.low,V=T,q=U.high_>>>0,W=V.high_>>>0,(q<W||q===W&&U.low_>>>0<V.low_>>>0)&&(H.high=H.high.add(n.fromNumber(1))),e=j+a;var Y={low:n.fromNumber(0),high:n.fromNumber(0)};H.high.shiftRightUnsigned(49).and(n.fromNumber(1)).equals(n.fromNumber)?(Y.high=Y.high.or(n.fromNumber(3).shiftLeft(61)),Y.high=Y.high.or(n.fromNumber(e).and(n.fromNumber(16383).shiftLeft(47))),Y.high=Y.high.or(H.high.and(n.fromNumber(0x7fffffffffff)))):(Y.high=Y.high.or(n.fromNumber(16383&e).shiftLeft(49)),Y.high=Y.high.or(H.high.and(n.fromNumber(562949953421311)))),Y.low=H.low,r&&(Y.high=Y.high.or(n.fromString("9223372036854775808")));var K=p.allocBuffer(16);return N=0,K[N++]=255&Y.low.low_,K[N++]=Y.low.low_>>8&255,K[N++]=Y.low.low_>>16&255,K[N++]=Y.low.low_>>24&255,K[N++]=255&Y.low.high_,K[N++]=Y.low.high_>>8&255,K[N++]=Y.low.high_>>16&255,K[N++]=Y.low.high_>>24&255,K[N++]=255&Y.high.low_,K[N++]=Y.high.low_>>8&255,K[N++]=Y.high.low_>>16&255,K[N++]=Y.high.low_>>24&255,K[N++]=255&Y.high.high_,K[N++]=Y.high.high_>>8&255,K[N++]=Y.high.high_>>16&255,K[N++]=Y.high.high_>>24&255,new d(K)};a=6176,d.prototype.toString=function(){for(var t,e,r,o,i,s,u=0,c=new Array(36),l=0;l<c.length;l++)c[l]=0;var f,p,h,d,_,v=0,m=!1,g={parts:new Array(4)},b=[];v=0;var w=this.bytes;if(o=w[v++]|w[v++]<<8|w[v++]<<16|w[v++]<<24,r=w[v++]|w[v++]<<8|w[v++]<<16|w[v++]<<24,e=w[v++]|w[v++]<<8|w[v++]<<16|w[v++]<<24,t=w[v++]|w[v++]<<8|w[v++]<<16|w[v++]<<24,v=0,{low:new n(o,r),high:new n(e,t)}.high.lessThan(n.ZERO)&&b.push("-"),(i=t>>26&31)>>3==3){if(30===i)return b.join("")+"Infinity";if(31===i)return"NaN";s=t>>15&16383,h=8+(t>>14&1)}else h=t>>14&7,s=t>>17&16383;if(f=s-a,g.parts[0]=(16383&t)+((15&h)<<14),g.parts[1]=e,g.parts[2]=r,g.parts[3]=o,0===g.parts[0]&&0===g.parts[1]&&0===g.parts[2]&&0===g.parts[3])m=!0;else for(_=3;_>=0;_--){var O=0,S=y(g);if(g=S.quotient,O=S.rem.low_)for(d=8;d>=0;d--)c[9*_+d]=O%10,O=Math.floor(O/10)}if(m)u=1,c[v]=0;else for(u=36,l=0;!c[v];)l++,u-=1,v+=1;if((p=u-1+f)>=34||p<=-7||f>0){for(b.push(c[v++]),(u-=1)&&b.push("."),l=0;l<u;l++)b.push(c[v++]);b.push("E"),p>0?b.push("+"+p):b.push(p)}else if(f>=0)for(l=0;l<u;l++)b.push(c[v++]);else{var A=u+f;if(A>0)for(l=0;l<A;l++)b.push(c[v++]);else b.push("0");for(b.push(".");A++<0;)b.push("0");for(l=0;l<u-Math.max(A-1,0);l++)b.push(c[v++])}return b.join("")},d.prototype.toJSON=function(){return{$numberDecimal:this.toString()}},t.exports=d,t.exports.Decimal128=d},function(t,e){function r(){if(!(this instanceof r))return new r;this._bsontype="MinKey"}t.exports=r,t.exports.MinKey=r},function(t,e){function r(){if(!(this instanceof r))return new r;this._bsontype="MaxKey"}t.exports=r,t.exports.MaxKey=r},function(t,e){function r(t,e,n){if(!(this instanceof r))return new r(t,e,n);this._bsontype="DBRef",this.namespace=t,this.oid=e,this.db=n}r.prototype.toJSON=function(){return{$ref:this.namespace,$id:this.oid,$db:null==this.db?"":this.db}},t.exports=r,t.exports.DBRef=r},function(t,e,r){"use strict";t.exports=r(114)},function(t,e,r){"use strict";t.exports=new Set(["__proto__","constructor","prototype"])},function(t,e,r){"use strict";var n=r(52);
/*!
 * ignore
 */t.exports=function(t){var e=null!=this?this.path:null;return n(t,e)}},function(t,e,r){"use strict";var n=r(13);
/*!
 * Given a value, cast it to a boolean, or throw a `CastError` if the value
 * cannot be casted. `null` and `undefined` are considered valid.
 *
 * @param {Any} value
 * @param {String} [path] optional the path to set on the CastError
 * @return {Boolean|null|undefined}
 * @throws {CastError} if `value` is not one of the allowed values
 * @api private
 */t.exports=function(e,r){if(t.exports.convertToTrue.has(e))return!0;if(t.exports.convertToFalse.has(e))return!1;if(null==e)return e;throw new n("boolean",e,r)},t.exports.convertToTrue=new Set([!0,"true",1,"1","yes"]),t.exports.convertToFalse=new Set([!1,"false",0,"0","no"])},function(t,e,r){"use strict";(function(n){
/*!
 * Module dependencies.
 */
function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return s=t.done,t},e:function(t){u=!0,i=t},f:function(){try{s||null==r.return||r.return()}finally{if(u)throw i}}}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var u,c=r(19).EventEmitter,l=r(139),f=r(14),p=r(6),h=r(7),y=r(140),d=r(54),_=r(75),v=r(0).arrayParentSymbol,m=r(3),g=r(141),b=r(71),w=r(49),O=r(15).get().ReadPreference,S=r(142),A=r(4),$=r(1),E=r(146),j=r(147).middlewareFunctions,P=r(77).middlewareFunctions,x=j.concat(P).reduce((function(t,e){return t.add(e)}),new Set),T=0;function N(t,e){if(!(this instanceof N))return new N(t,e);if(this.obj=t,this.paths={},this.aliases={},this.subpaths={},this.virtuals={},this.singleNestedPaths={},this.nested={},this.inherits={},this.callQueue=[],this._indexes=[],this.methods={},this.methodOptions={},this.statics={},this.tree={},this.query={},this.childSchemas=[],this.plugins=[],this.$id=++T,this.mapPaths=[],this.s={hooks:new l},this.options=this.defaultOptions(e),Array.isArray(t)){var r,n=s(t);try{for(n.s();!(r=n.n()).done;){var o=r.value;this.add(o)}}catch(t){n.e(t)}finally{n.f()}}else t&&this.add(t);var i=t&&t._id&&$.isObject(t._id);!this.paths._id&&!this.options.noId&&this.options._id&&!i&&_(this),this.setupTimestamp(this.options.timestamps)}
/*!
 * Create virtual properties with alias field
 */
/*!
 * Inherit from EventEmitter.
 */
N.prototype=Object.create(c.prototype),N.prototype.constructor=N,N.prototype.instanceOfSchema=!0,
/*!
 * ignore
 */
Object.defineProperty(N.prototype,"$schemaType",{configurable:!1,enumerable:!1,writable:!0}),Object.defineProperty(N.prototype,"childSchemas",{configurable:!1,enumerable:!0,writable:!0}),N.prototype.obj,N.prototype.paths,N.prototype.tree,N.prototype.clone=function(){var t=this,e=new(null==this.base?N:this.base.Schema)({},this._userProvidedOptions);return e.base=this.base,e.obj=this.obj,e.options=$.clone(this.options),e.callQueue=this.callQueue.map((function(t){return t})),e.methods=$.clone(this.methods),e.methodOptions=$.clone(this.methodOptions),e.statics=$.clone(this.statics),e.query=$.clone(this.query),e.plugins=Array.prototype.slice.call(this.plugins),e._indexes=$.clone(this._indexes),e.s.hooks=this.s.hooks.clone(),e.tree=$.clone(this.tree),e.paths=$.clone(this.paths),e.nested=$.clone(this.nested),e.subpaths=$.clone(this.subpaths),e.singleNestedPaths=$.clone(this.singleNestedPaths),e.childSchemas=
/*!
 * ignore
 */
function(t){for(var e=[],r=0,n=Object.keys(t.paths);r<n.length;r++){var o=n[r],i=t.paths[o];(i.$isMongooseDocumentArray||i.$isSingleNested)&&e.push({schema:i.schema,model:i.caster})}return e}
/*!
 * ignore
 */(e),e.virtuals=$.clone(this.virtuals),e.$globalPluginsApplied=this.$globalPluginsApplied,e.$isRootDiscriminator=this.$isRootDiscriminator,e.$implicitlyCreated=this.$implicitlyCreated,e.mapPaths=[].concat(this.mapPaths),null!=this.discriminatorMapping&&(e.discriminatorMapping=Object.assign({},this.discriminatorMapping)),null!=this.discriminators&&(e.discriminators=Object.assign({},this.discriminators)),e.aliases=Object.assign({},this.aliases),e.on("init",(function(e){return t.emit("init",e)})),e},N.prototype.pick=function(t,e){var r=new N({},e||this.options);if(!Array.isArray(t))throw new f('Schema#pick() only accepts an array argument, got "'+i(t)+'"');var n,a=s(t);try{for(a.s();!(n=a.n()).done;){var u=n.value;if(this.nested[u])r.add(o({},u,m(this.tree,u)));else{var c=this.path(u);if(null==c)throw new f("Path `"+u+"` is not in the schema");r.add(o({},u,c))}}}catch(t){a.e(t)}finally{a.f()}return r},N.prototype.defaultOptions=function(t){t&&!1===t.safe&&(t.safe={w:0}),t&&t.safe&&0===t.safe.w&&(t.versionKey=!1),this._userProvidedOptions=null==t?{}:$.clone(t);var e=m(this,"base.options",{});if((t=$.options({strict:!("strict"in e)||e.strict,strictQuery:"strictQuery"in e&&e.strictQuery,bufferCommands:!0,capped:!1,versionKey:"__v",optimisticConcurrency:!1,discriminatorKey:"__t",minimize:!0,autoIndex:null,shardKey:null,read:null,validateBeforeSave:!0,noId:!1,_id:!0,noVirtualId:!1,id:!0,typeKey:"type",typePojoToMixed:!("typePojoToMixed"in e)||e.typePojoToMixed},$.clone(t))).read&&(t.read=O(t.read)),t.optimisticConcurrency&&!t.versionKey)throw new f("Must set `versionKey` if using `optimisticConcurrency`");return t},N.prototype.add=function(t,e){if(t instanceof N||null!=t&&t.instanceOfSchema)return b(this,t),this;if(!1===t._id&&null==e&&(this.options._id=!1),"__proto__."===(e=e||"")||"constructor."===e||"prototype."===e)return this;for(var r=0,n=Object.keys(t);r<n.length;r++){var i=n[r],a=e+i;if(null==t[i])throw new TypeError("Invalid value for schema path `"+a+'`, got value "'+t[i]+'"');if("_id"!==i||!1!==t[i])if(t[i]instanceof d||"VirtualType"===m(t[i],"constructor.name",null))this.virtual(t[i]);else{if(Array.isArray(t[i])&&1===t[i].length&&null==t[i][0])throw new TypeError("Invalid value for schema Array path `"+a+'`, got value "'+t[i][0]+'"');if($.isPOJO(t[i])||t[i]instanceof h)if(Object.keys(t[i]).length<1)e&&(this.nested[e.substr(0,e.length-1)]=!0),this.path(a,t[i]);else if(!t[i][this.options.typeKey]||"type"===this.options.typeKey&&t[i].type.type)this.nested[a]=!0,this.add(t[i],a+".");else if(!this.options.typePojoToMixed&&$.isPOJO(t[i][this.options.typeKey])){e&&(this.nested[e.substr(0,e.length-1)]=!0);var u=new N(t[i][this.options.typeKey],{typePojoToMixed:!1}),c=Object.assign({},t[i],o({},this.options.typeKey,u));this.path(e+i,c)}else e&&(this.nested[e.substr(0,e.length-1)]=!0),this.path(e+i,t[i]);else e&&(this.nested[e.substr(0,e.length-1)]=!0),this.path(e+i,t[i])}}return function(t,e){var r,n=s(e=e||Object.keys(t.paths));try{for(n.s();!(r=n.n()).done;){var o=r.value,i=m(t.paths[o],"options");if(null!=i){var a=t.paths[o].path,u=i.alias;if(u){if("string"!=typeof u)throw new Error("Invalid value for alias option on "+a+", got "+u);t.aliases[u]=a,t.virtual(u).get(function(t){return function(){return"function"==typeof this.get?this.get(t):this[t]}}(a)).set(function(t){return function(e){return this.$set(t,e)}}(a))}}}}catch(t){n.e(t)}finally{n.f()}}(this,Object.keys(t).map((function(t){return e?e+t:t}))),this},N.reserved=Object.create(null),N.prototype.reserved=N.reserved;var k=N.reserved;
/*!
 * ignore
 */
function B(t){return/\.\d+/.test(t)?t.replace(/\.\d+\./g,".$.").replace(/\.\d+$/,".$"):t}
/*!
 * ignore
 */function C(t,e){if(0===t.mapPaths.length)return null;var r,n=s(t.mapPaths);try{for(n.s();!(r=n.n()).done;){var o=r.value.path;if(new RegExp("^"+o.replace(/\.\$\*/g,"\\.[^.]+")+"$").test(e))return t.paths[o]}}catch(t){n.e(t)}finally{n.f()}return null}
/*!
 * ignore. Deprecated re: #6405
 */
function R(t,e){var r=e.split(/\.(\d+)\.|\.(\d+)$/).filter(Boolean);if(r.length<2)return t.paths.hasOwnProperty(r[0])?t.paths[r[0]]:"adhocOrUndefined";var n=t.path(r[0]),o=!1;if(!n)return"adhocOrUndefined";for(var i=r.length-1,s=1;s<r.length;++s){o=!1;var a=r[s];if(s===i&&n&&!/\D/.test(a)){n=n.$isMongooseDocumentArray?n.$embeddedSchemaType:n instanceof u.Array?n.caster:void 0;break}if(/\D/.test(a)){if(!n||!n.schema){n=void 0;break}o="nested"===n.schema.pathType(a),n=n.schema.path(a)}else n instanceof u.Array&&s!==i&&(n=n.caster)}return t.subpaths[e]=n,n?"real":o?"nested":"adhocOrUndefined"}
/*!
 * ignore
 */k.prototype=k.emit=k.listeners=k.on=k.removeListener=k.collection=k.errors=k.get=k.init=k.isModified=k.isNew=k.populated=k.remove=k.save=k.toObject=k.validate=1,N.prototype.path=function(t,e){var r=B(t);if(void 0===e){var n=function(t,e,r){if(t.paths.hasOwnProperty(e))return t.paths[e];if(t.subpaths.hasOwnProperty(r))return t.subpaths[r];if(t.singleNestedPaths.hasOwnProperty(r)&&"object"===i(t.singleNestedPaths[r]))return t.singleNestedPaths[r];return null}(this,t,r);if(null!=n)return n;var o=C(this,t);return null!=o?o:null!=(n=this.hasMixedParent(r))?n:/\.\d+\.?.*$/.test(t)?function(t,e){return R(t,e),t.subpaths[e]}(this,t):void 0}var a=t.split(".")[0];if(k[a])throw new Error("`"+a+"` may not be used as a schema pathname");"object"===i(e)&&$.hasUserDefinedProperty(e,"ref")&&E(e.ref,t);var u,c=t.split(/\./),l=c.pop(),f=this.tree,h="",y=s(c);try{for(y.s();!(u=y.n()).done;){var d=u.value;if(h=h+=(h.length>0?".":"")+d,f[d]||(this.nested[h]=!0,f[d]={}),"object"!==i(f[d])){var _="Cannot set nested path `"+t+"`. Parent path `"+h+"` already set to type "+f[d].name+".";throw new Error(_)}f=f[d]}}catch(t){y.e(t)}finally{y.f()}f[l]=$.clone(e),this.paths[t]=this.interpretAsType(t,e,this.options);var v=this.paths[t];if(v.$isSchemaMap){var m=t+".$*",g={type:{}};if($.hasUserDefinedProperty(e,"of"))g=$.isPOJO(e.of)&&Object.keys(e.of).length>0&&!$.hasUserDefinedProperty(e.of,this.options.typeKey)?new N(e.of):e.of;$.hasUserDefinedProperty(e,"ref")&&(g={type:g,ref:e.ref}),this.paths[m]=this.interpretAsType(m,g,this.options),this.mapPaths.push(this.paths[m]),v.$__schemaType=this.paths[m]}if(v.$isSingleNested){for(var b=0,w=Object.keys(v.schema.paths);b<w.length;b++){var O=w[b];this.singleNestedPaths[t+"."+O]=v.schema.paths[O]}for(var S=0,A=Object.keys(v.schema.singleNestedPaths);S<A.length;S++){var j=A[S];this.singleNestedPaths[t+"."+j]=v.schema.singleNestedPaths[j]}for(var P=0,x=Object.keys(v.schema.subpaths);P<x.length;P++){var T=x[P];this.singleNestedPaths[t+"."+T]=v.schema.subpaths[T]}for(var D=0,M=Object.keys(v.schema.nested);D<M.length;D++){var I=M[D];this.singleNestedPaths[t+"."+I]="nested"}Object.defineProperty(v.schema,"base",{configurable:!0,enumerable:!1,writable:!1,value:this.base}),v.caster.base=this.base,this.childSchemas.push({schema:v.schema,model:v.caster})}else v.$isMongooseDocumentArray&&(Object.defineProperty(v.schema,"base",{configurable:!0,enumerable:!1,writable:!1,value:this.base}),v.casterConstructor.base=this.base,this.childSchemas.push({schema:v.schema,model:v.casterConstructor}));if(v.$isMongooseArray&&v.caster instanceof p){for(var F=t,L=v,U=[];L.$isMongooseArray;)F+=".$",L.$isMongooseDocumentArray?(L.$embeddedSchemaType._arrayPath=F,L.$embeddedSchemaType._arrayParentPath=t,L=L.$embeddedSchemaType.clone()):(L.caster._arrayPath=F,L.caster._arrayParentPath=t,L=L.caster.clone()),L.path=F,U.push(L);for(var V=0,q=U;V<q.length;V++){var W=q[V];this.subpaths[W.path]=W}}if(v.$isMongooseDocumentArray){for(var H=0,Y=Object.keys(v.schema.paths);H<Y.length;H++){var K=Y[H],z=v.schema.paths[K];this.subpaths[t+"."+K]=z,"object"===i(z)&&null!=z&&(z.$isUnderneathDocArray=!0)}for(var Q=0,J=Object.keys(v.schema.subpaths);Q<J.length;Q++){var G=J[Q],X=v.schema.subpaths[G];this.subpaths[t+"."+G]=X,"object"===i(X)&&null!=X&&(X.$isUnderneathDocArray=!0)}for(var Z=0,tt=Object.keys(v.schema.singleNestedPaths);Z<tt.length;Z++){var et=tt[Z],rt=v.schema.singleNestedPaths[et];this.subpaths[t+"."+et]=rt,"object"===i(rt)&&null!=rt&&(rt.$isUnderneathDocArray=!0)}}return this},Object.defineProperty(N.prototype,"base",{configurable:!0,enumerable:!1,writable:!0,value:null}),N.prototype.interpretAsType=function(t,e,r){if(e instanceof p){if(e.path===t)return e;var o=e.clone();return o.path=t,o}var s=null!=this.base?this.base.Schema.Types:N.Types;if(!($.isPOJO(e)||e instanceof h)&&"Object"!==$.getFunctionName(e.constructor)){var a=e;(e={})[r.typeKey]=a}var u,c=!e[r.typeKey]||"type"===r.typeKey&&e.type.type?{}:e[r.typeKey];if($.isPOJO(c)||"mixed"===c)return new s.Mixed(t,e);if(Array.isArray(c)||c===Array||"array"===c||c===s.Array){var l=c===Array||"array"===c?e.cast||e.of:c[0];if(l&&l.instanceOfSchema)return new s.DocumentArray(t,l,e);if(l&&l[r.typeKey]&&l[r.typeKey].instanceOfSchema)return new s.DocumentArray(t,l[r.typeKey],e,l);if(Array.isArray(l))return new s.Array(t,this.interpretAsType(t,l,r),e);if("string"==typeof l)l=s[l.charAt(0).toUpperCase()+l.substring(1)];else if(l&&(!l[r.typeKey]||"type"===r.typeKey&&l.type.type)&&$.isPOJO(l)){if(Object.keys(l).length){var f={minimize:r.minimize};r.typeKey&&(f.typeKey=r.typeKey),r.hasOwnProperty("strict")&&(f.strict=r.strict),r.hasOwnProperty("typePojoToMixed")&&(f.typePojoToMixed=r.typePojoToMixed),this._userProvidedOptions.hasOwnProperty("_id")?f._id=this._userProvidedOptions._id:N.Types.DocumentArray.defaultOptions&&null!=N.Types.DocumentArray.defaultOptions._id&&(f._id=N.Types.DocumentArray.defaultOptions._id);var y=new N(l,f);return y.$implicitlyCreated=!0,new s.DocumentArray(t,y,e)}return new s.Array(t,s.Mixed,e)}if(l&&("ClockDate"===(u="string"==typeof(c=!l[r.typeKey]||"type"===r.typeKey&&l.type.type?l:l[r.typeKey])?c:c.schemaName||$.getFunctionName(c))&&(u="Date"),!s.hasOwnProperty(u)))throw new TypeError("Invalid schema configuration: "+"`".concat(u,"` is not a valid type within the array `").concat(t,"`.")+"See http://bit.ly/mongoose-schematypes for a list of valid schema types.");return new s.Array(t,l||s.Mixed,e,r)}if(c&&c.instanceOfSchema)return new s.Embedded(c,t,e);if((u=n.isBuffer(c)?"Buffer":"function"==typeof c||"object"===i(c)?c.schemaName||$.getFunctionName(c):null==c?""+c:c.toString())&&(u=u.charAt(0).toUpperCase()+u.substring(1)),"ObjectID"===u&&(u="ObjectId"),"ClockDate"===u&&(u="Date"),null==s[u])throw new TypeError("Invalid schema configuration: `".concat(u,"` is not ")+"a valid type at path `".concat(t,"`. See ")+"http://bit.ly/mongoose-schematypes for a list of valid schema types.");return new s[u](t,e)},N.prototype.eachPath=function(t){for(var e=Object.keys(this.paths),r=e.length,n=0;n<r;++n)t(e[n],this.paths[e[n]]);return this},N.prototype.requiredPaths=function(t){if(this._requiredpaths&&!t)return this._requiredpaths;for(var e=Object.keys(this.paths),r=e.length,n=[];r--;){var o=e[r];this.paths[o].isRequired&&n.push(o)}return this._requiredpaths=n,this._requiredpaths},N.prototype.indexedPaths=function(){return this._indexedpaths||(this._indexedpaths=this.indexes()),this._indexedpaths},N.prototype.pathType=function(t){var e=B(t);if(this.paths.hasOwnProperty(t))return"real";if(this.virtuals.hasOwnProperty(t))return"virtual";if(this.nested.hasOwnProperty(t))return"nested";if(this.subpaths.hasOwnProperty(e)||this.subpaths.hasOwnProperty(t))return"real";var r=this.singleNestedPaths.hasOwnProperty(e)||this.singleNestedPaths.hasOwnProperty(t);return r?"nested"===r?"nested":"real":null!=C(this,t)?"real":/\.\d+\.|\.\d+$/.test(t)?R(this,t):"adhocOrUndefined"},N.prototype.hasMixedParent=function(t){var e=t.split(/\./g);t="";for(var r=0;r<e.length;++r)if(t=r>0?t+"."+e[r]:e[r],this.paths.hasOwnProperty(t)&&this.paths[t]instanceof u.Mixed)return this.paths[t];return null},N.prototype.setupTimestamp=function(t){return S(this,t)},N.prototype.queue=function(t,e){return this.callQueue.push([t,e]),this},N.prototype.pre=function(t){if(t instanceof RegExp){var e,r=Array.prototype.slice.call(arguments,1),n=s(x);try{for(n.s();!(e=n.n()).done;){var o=e.value;t.test(o)&&this.pre.apply(this,[o].concat(r))}}catch(t){n.e(t)}finally{n.f()}return this}if(Array.isArray(t)){var i,a=Array.prototype.slice.call(arguments,1),u=s(t);try{for(u.s();!(i=u.n()).done;){var c=i.value;this.pre.apply(this,[c].concat(a))}}catch(t){u.e(t)}finally{u.f()}return this}return this.s.hooks.pre.apply(this.s.hooks,arguments),this},N.prototype.post=function(t){if(t instanceof RegExp){var e,r=Array.prototype.slice.call(arguments,1),n=s(x);try{for(n.s();!(e=n.n()).done;){var o=e.value;t.test(o)&&this.post.apply(this,[o].concat(r))}}catch(t){n.e(t)}finally{n.f()}return this}if(Array.isArray(t)){var i,a=Array.prototype.slice.call(arguments,1),u=s(t);try{for(u.s();!(i=u.n()).done;){var c=i.value;this.post.apply(this,[c].concat(a))}}catch(t){u.e(t)}finally{u.f()}return this}return this.s.hooks.post.apply(this.s.hooks,arguments),this},N.prototype.plugin=function(t,e){if("function"!=typeof t)throw new Error('First param to `schema.plugin()` must be a function, got "'+i(t)+'"');if(e&&e.deduplicate){var r,n=s(this.plugins);try{for(n.s();!(r=n.n()).done;){if(r.value.fn===t)return this}}catch(t){n.e(t)}finally{n.f()}}return this.plugins.push({fn:t,opts:e}),t(this,e),this},N.prototype.method=function(t,e,r){if("string"!=typeof t)for(var n in t)this.methods[n]=t[n],this.methodOptions[n]=$.clone(r);else this.methods[t]=e,this.methodOptions[t]=$.clone(r);return this},N.prototype.static=function(t,e){if("string"!=typeof t)for(var r in t)this.statics[r]=t[r];else this.statics[t]=e;return this},N.prototype.index=function(t,e){return t||(t={}),e||(e={}),e.expires&&$.expires(e),this._indexes.push([t,e]),this},N.prototype.set=function(t,e,r){if(1===arguments.length)return this.options[t];switch(t){case"read":this.options[t]=O(e,r),this._userProvidedOptions[t]=this.options[t];break;case"safe":D(this.options,e),this._userProvidedOptions[t]=this.options[t];break;case"timestamps":this.setupTimestamp(e),this.options[t]=e,this._userProvidedOptions[t]=this.options[t];break;case"_id":this.options[t]=e,this._userProvidedOptions[t]=this.options[t],e&&!this.paths._id?_(this):!e&&null!=this.paths._id&&this.paths._id.auto&&this.remove("_id");break;default:this.options[t]=e,this._userProvidedOptions[t]=this.options[t]}return this};
/*!
 * ignore
 */
var D=A.deprecate((function(t,e){t.safe=!1===e?{w:0}:e}),"Mongoose: The `safe` option for schemas is deprecated. Use the `writeConcern` option instead: http://bit.ly/mongoose-write-concern");N.prototype.get=function(t){return this.options[t]};var M="2d 2dsphere hashed text".split(" ");
/*!
 * ignore
 */
function I(t,e){var r,n=e.split("."),o=n.pop(),i=t.tree,a=s(n);try{for(a.s();!(r=a.n()).done;){i=i[r.value]}}catch(t){a.e(t)}finally{a.f()}delete i[o]}
/*!
 * ignore
 */
function F(t){return t.startsWith("$[")&&t.endsWith("]")}
/*!
 * Module exports.
 */Object.defineProperty(N,"indexTypes",{get:function(){return M},set:function(){throw new Error("Cannot overwrite Schema.indexTypes")}}),N.prototype.indexes=function(){return g(this)},N.prototype.virtual=function(t,e){var r=this;if(t instanceof d||null!=t&&"VirtualType"===t.constructor.name)return this.virtual(t.path,t.options);if(e=new y(e),$.hasUserDefinedProperty(e,["ref","refPath"])){if(null==e.localField)throw new Error("Reference virtuals require `localField` option");if(null==e.foreignField)throw new Error("Reference virtuals require `foreignField` option");this.pre("init",(function(r){if(w.has(t,r)){var n=w.get(t,r);this.$$populatedVirtuals||(this.$$populatedVirtuals={}),e.justOne||e.count?this.$$populatedVirtuals[t]=Array.isArray(n)?n[0]:n:this.$$populatedVirtuals[t]=Array.isArray(n)?n:null==n?[]:[n],w.unset(t,r)}}));var n=this.virtual(t);return n.options=e,n.set((function(r){this.$$populatedVirtuals||(this.$$populatedVirtuals={}),e.justOne||e.count?(this.$$populatedVirtuals[t]=Array.isArray(r)?r[0]:r,"object"!==i(this.$$populatedVirtuals[t])&&(this.$$populatedVirtuals[t]=e.count?r:null)):(this.$$populatedVirtuals[t]=Array.isArray(r)?r:null==r?[]:[r],this.$$populatedVirtuals[t]=this.$$populatedVirtuals[t].filter((function(t){return t&&"object"===i(t)})))})),"function"==typeof e.get&&n.get(e.get),n}var o=this.virtuals,s=t.split(".");if("real"===this.pathType(t))throw new Error('Virtual path "'+t+'" conflicts with a real path in the schema');o[t]=s.reduce((function(r,n,o){return r[n]||(r[n]=o===s.length-1?new d(e,t):{}),r[n]}),this.tree);for(var a=s[0],u=0;u<s.length-1;++u){if(null!=this.paths[a]&&this.paths[a].$isMongooseDocumentArray)if("break"===function(){var t=s.slice(u+1).join(".");return r.paths[a].schema.virtual(t).get((function(e,r,n){var o=n.__parentArray[v],i=a+"."+n.__index+"."+t;return o.get(i)})),"break"}())break;a+="."+s[u+1]}return o[t]},N.prototype.virtualpath=function(t){return this.virtuals.hasOwnProperty(t)?this.virtuals[t]:null},N.prototype.remove=function(t){return"string"==typeof t&&(t=[t]),Array.isArray(t)&&t.forEach((function(t){if(null!=this.path(t)||this.nested[t]){if(this.nested[t]){var e,r=s(Object.keys(this.paths).concat(Object.keys(this.nested)));try{for(r.s();!(e=r.n()).done;){var n=e.value;n.startsWith(t+".")&&(delete this.paths[n],delete this.nested[n],I(this,n))}}catch(t){r.e(t)}finally{r.f()}return delete this.nested[t],void I(this,t)}delete this.paths[t],I(this,t)}}),this),this},N.prototype.loadClass=function(t,e){return t===Object.prototype||t===Function.prototype||t.prototype.hasOwnProperty("$isMongooseModelPrototype")||(this.loadClass(Object.getPrototypeOf(t),e),e||Object.getOwnPropertyNames(t).forEach((function(e){if(!e.match(/^(length|name|prototype|constructor|__proto__)$/)){var r=Object.getOwnPropertyDescriptor(t,e);r.hasOwnProperty("value")&&this.static(e,r.value)}}),this),Object.getOwnPropertyNames(t.prototype).forEach((function(r){if(!r.match(/^(constructor)$/)){var n=Object.getOwnPropertyDescriptor(t.prototype,r);e||"function"==typeof n.value&&this.method(r,n.value),"function"==typeof n.get&&(this.virtuals[r]&&(this.virtuals[r].getters=[]),this.virtual(r).get(n.get)),"function"==typeof n.set&&(this.virtuals[r]&&(this.virtuals[r].setters=[]),this.virtual(r).set(n.set))}}),this)),this},
/*!
 * ignore
 */
N.prototype._getSchema=function(t){var e=this.path(t),r=[];if(e)return e.$fullPath=t,e;for(var n=t.split("."),o=0;o<n.length;++o)("$"===n[o]||F(n[o]))&&(n[o]="0");return function t(e,n){for(var o,i,s=e.length+1;s--;)if(i=e.slice(0,s).join("."),o=n.path(i)){if(r.push(i),o.caster){if(o.caster instanceof u.Mixed)return o.caster.$fullPath=r.join("."),o.caster;if(s!==e.length&&o.schema){var a=void 0;return"$"===e[s]||F(e[s])?s+1===e.length?o:((a=t(e.slice(s+1),o.schema))&&(a.$isUnderneathDocArray=a.$isUnderneathDocArray||!o.schema.$isSingleNested),a):((a=t(e.slice(s),o.schema))&&(a.$isUnderneathDocArray=a.$isUnderneathDocArray||!o.schema.$isSingleNested),a)}}else if(o.$isSchemaMap){return s+1>=e.length?o.$__schemaType:t(e.slice(s+1),o.$__schemaType.schema)}return o.$fullPath=r.join("."),o}}(n,this)},
/*!
 * ignore
 */
N.prototype._getPathType=function(t){if(this.path(t))return"real";return function t(e,r){for(var n,o,i=e.length+1;i--;){if(o=e.slice(0,i).join("."),n=r.path(o))return n.caster?n.caster instanceof u.Mixed?{schema:n,pathType:"mixed"}:i!==e.length&&n.schema?"$"===e[i]||F(e[i])?i===e.length-1?{schema:n,pathType:"nested"}:t(e.slice(i+1),n.schema):t(e.slice(i),n.schema):{schema:n,pathType:n.$isSingleNested?"nested":"array"}:{schema:n,pathType:"real"};if(i===e.length&&r.nested[o])return{schema:r,pathType:"nested"}}return{schema:n||r,pathType:"undefined"}}(t.split("."),this)},t.exports=e=N,N.Types=u=r(55),
/*!
 * ignore
 */
e.ObjectId=u.ObjectId}).call(this,r(2).Buffer)},function(t,e,r){"use strict";var n=r(1);function o(t,e){this.path=e,this.getters=[],this.setters=[],this.options=Object.assign({},t)}o.prototype._applyDefaultGetters=function(){if(!(this.getters.length>0||this.setters.length>0)){var t="$"+this.path;this.getters.push((function(){return this[t]})),this.setters.push((function(e){this[t]=e}))}},
/*!
 * ignore
 */
o.prototype.clone=function(){var t=new o(this.options,this.path);return t.getters=[].concat(this.getters),t.setters=[].concat(this.setters),t},o.prototype.get=function(t){return this.getters.push(t),this},o.prototype.set=function(t){return this.setters.push(t),this},o.prototype.applyGetters=function(t,e){n.hasUserDefinedProperty(this.options,["ref","refPath"])&&e.$$populatedVirtuals&&e.$$populatedVirtuals.hasOwnProperty(this.path)&&(t=e.$$populatedVirtuals[this.path]);for(var r=t,o=this.getters.length-1;o>=0;o--)r=this.getters[o].call(e,r,this,e);return r},o.prototype.applySetters=function(t,e){for(var r=t,n=this.setters.length-1;n>=0;n--)r=this.setters[n].call(e,r,this,e);return r},
/*!
 * exports
 */
t.exports=o},function(t,e,r){"use strict";
/*!
 * Module exports.
 */e.String=r(148),e.Number=r(79),e.Boolean=r(152),e.DocumentArray=r(153),e.Embedded=r(160),e.Array=r(56),e.Buffer=r(162),e.Date=r(164),e.ObjectId=r(167),e.Mixed=r(26),e.Decimal128=e.Decimal=r(169),e.Map=r(171),e.Oid=e.ObjectId,e.Object=e.Mixed,e.Bool=e.Boolean,e.ObjectID=e.ObjectId},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i,s,a=r(51),u=r(73),c=r(14),l=r(154),f=r(6),p=f.CastError,h=r(26),y=r(155),d=r(156),_=r(3),v=r(82),m=r(4),g=r(1),b=r(35).castToNumber,w=r(83),O=r(36),S=Symbol("mongoose#isNestedArray"),A=Object.freeze({});function $(t,e,n,o){s||(s=r(37).Embedded);var i,a,u="type";if(o&&o.typeKey&&(u=o.typeKey),this.schemaOptions=o,e){var c={};g.isPOJO(e)&&(e[u]?(delete(c=g.clone(e))[u],e=e[u]):e=h),null!=n&&null!=n.ref&&null==c.ref&&(c.ref=n.ref),e===Object&&(e=h);var l="string"==typeof e?e:g.getFunctionName(e),p=r(55),y=p.hasOwnProperty(l)?p[l]:e;if(this.casterConstructor=y,this.casterConstructor instanceof $&&(this.casterConstructor[S]=!0),"function"!=typeof y||y.$isArraySubdocument||y.$isSchemaMap)this.caster=y,this.caster instanceof s||(this.caster.path=t);else{var d=this.caster instanceof s?null:t;this.caster=new y(d,c)}this.$embeddedSchemaType=this.caster}if(this.$isMongooseArray=!0,f.call(this,t,n,"Array"),null!=this.defaultValue&&(i=this.defaultValue,a="function"==typeof i),!("defaultValue"in this)||void 0!==this.defaultValue){var _=function(){var t=[];return a?t=i.call(this):null!=i&&(t=t.concat(i)),t};_.$runBeforeSetters=!a,this.default(_)}}$.schemaName="Array",$.options={castNonArrays:!0},
/*!
 * ignore
 */
$.defaultOptions={},$.set=f.set,
/*!
 * Inherits from SchemaType.
 */
$.prototype=Object.create(f.prototype),$.prototype.constructor=$,$.prototype.OptionsConstructor=l,
/*!
 * ignore
 */
$._checkRequired=f.prototype.checkRequired,$.checkRequired=f.checkRequired,$.prototype.checkRequired=function(t,e){return f._isRef(this,t,e,!0)?!!t:("function"==typeof this.constructor.checkRequired?this.constructor.checkRequired():$.checkRequired())(t)},$.prototype.enum=function(){for(var t=this;;){var e=_(t,"caster.instance");if("Array"!==e){if("String"!==e&&"Number"!==e)throw new Error("`enum` can only be set on an array of strings or numbers , not "+e);break}t=t.caster}var r=arguments;return!Array.isArray(arguments)&&g.isObject(arguments)&&(r=g.object.vals(r)),t.caster.enum.apply(t.caster,r),this},$.prototype.applyGetters=function(t,e){if(null!=e&&null!=e.$__&&e.populated(this.path))return t;var r=f.prototype.applyGetters.call(this,t,e);if(Array.isArray(r))for(var n=r.length,o=0;o<n;++o)r[o]=this.caster.applyGetters(r[o],e);return r},$.prototype._applySetters=function(t,e,r,n){if(this.casterConstructor.$isMongooseArray&&$.options.castNonArrays&&!this[S]){for(var o=0,i=this;null!=i&&i.$isMongooseArray&&!i.$isMongooseDocumentArray;)++o,i=i.casterConstructor;if(null!=t&&t.length>0){var s=y(t);if(s.min===s.max&&s.max<o&&s.containsNonArrayItem)for(var a=s.max;a<o;++a)t=[t]}}return f.prototype._applySetters.call(this,t,e,r,n)},$.prototype.cast=function(t,e,n,o,s){var a,u;if(i||(i=r(37).Array),Array.isArray(t)){var l=t.length;if(!l&&e){var f=e.schema.indexedPaths(),y=this.path;for(a=0,u=f.length;a<u;++a){var d=f[a][0][y];if("2dsphere"===d||"2d"===d)return}var _=this.path.endsWith(".coordinates")?this.path.substr(0,this.path.lastIndexOf(".")):null;if(null!=_)for(a=0,u=f.length;a<u;++a){if("2dsphere"===f[a][0][_])return}}if(t=i(t,(s=s||A).path||this._arrayPath||this.path,e,this),n&&null!=e&&null!=e.$__&&e.populated(this.path))return t;var v=this.caster,g=v.$isMongooseArray,b="Number"===v.instance;if(v&&this.casterConstructor!==h)try{for(a=0;a<l;a++){if(b&&void 0===t[a])throw new c("Mongoose number arrays disallow storing undefined");var w={};g&&(null!=s.arrayPath||null!=v._arrayParentPath)&&(w.arrayPathIndex=a),t[a]=v.applySetters(t[a],e,n,void 0,w)}}catch(e){throw new p("["+e.kind+"]",m.inspect(t),this.path+"."+a,e,this)}return t}if(n||$.options.castNonArrays)return e&&n&&e.markModified(this.path),this.cast([t],e,n);throw new p("Array",m.inspect(t),this.path,null,this)},
/*!
 * ignore
 */
$.prototype._castForPopulate=function(t,e){if(i||(i=r(37).Array),Array.isArray(t)){var n,o=t.length,s=this.caster;if(s&&this.casterConstructor!==h)try{for(n=0;n<o;n++){var a={};s.$isMongooseArray&&null!=s._arrayParentPath&&(a.arrayPathIndex=n),t[n]=s.cast(t[n],e,!1,void 0,a)}}catch(e){throw new p("["+e.kind+"]",m.inspect(t),this.path+"."+n,e,this)}return t}throw new p("Array",m.inspect(t),this.path,null,this)},
/*!
 * Ignore
 */
$.prototype.discriminator=function(t,e){for(var r=this;r.$isMongooseArray&&!r.$isMongooseDocumentArray;)if(null==(r=r.casterConstructor)||"function"==typeof r)throw new c("You can only add an embedded discriminator on a document array, "+this.path+" is a plain array");return r.discriminator(t,e)},
/*!
 * ignore
 */
$.prototype.clone=function(){var t=Object.assign({},this.options),e=new this.constructor(this.path,this.caster,t,this.schemaOptions);return e.validators=this.validators.slice(),void 0!==this.requiredValidator&&(e.requiredValidator=this.requiredValidator),e},$.prototype.castForQuery=function(t,e){var r,n,o=this;if(2===arguments.length){if(!(r=this.$conditionalHandlers[t]))throw new Error("Can't use "+t+" with Array.");n=r.call(this,e)}else{n=t;var i=this.casterConstructor;if(n&&i.discriminators&&i.schema&&i.schema.options&&i.schema.options.discriminatorKey)if("string"==typeof n[i.schema.options.discriminatorKey]&&i.discriminators[n[i.schema.options.discriminatorKey]])i=i.discriminators[n[i.schema.options.discriminatorKey]];else{var s=O(i.discriminators,n[i.schema.options.discriminatorKey]);s&&(i=s)}var a=this.casterConstructor.prototype,u=a&&(a.castForQuery||a.cast);!u&&i.castForQuery&&(u=i.castForQuery);var c=this.caster;Array.isArray(n)?(this.setters.reverse().forEach((function(t){n=t.call(o,n,o)})),n=n.map((function(t){return g.isObject(t)&&t.$elemMatch?t:u?t=u.call(c,t):null!=t?t=new i(t):t}))):u?n=u.call(c,n):null!=n&&(n=new i(n))}return n};var E=$.prototype.$conditionalHandlers={};function j(t){return function(e){if(!Array.isArray(e))throw new TypeError("conditional "+t+" requires an array");var r,o=[],i=n(e);try{for(i.s();!(r=i.n()).done;){var s=r.value;o.push(d(this.casterConstructor.schema,s))}}catch(t){i.e(t)}finally{i.f()}return o}}E.$all=function(t){return Array.isArray(t)||(t=[t]),t=t.map((function(t){if(g.isObject(t)){var e={};return e[this.path]=t,d(this.casterConstructor.schema,e)[this.path]}return t}),this),this.castForQuery(t)},E.$options=String,E.$elemMatch=function(t){for(var e=Object.keys(t),r=e.length,n=0;n<r;++n){var o=e[n],i=t[o];v(o)&&null!=i&&(t[o]=this.castForQuery(o,i))}var s=_(this,"casterConstructor.schema.options.discriminatorKey"),a=_(this,"casterConstructor.schema.discriminators",{});return null!=s&&null!=t[s]&&null!=a[t[s]]?d(a[t[s]],t):d(this.casterConstructor.schema,t)},E.$geoIntersects=w.cast$geoIntersects,E.$or=j("$or"),E.$and=j("$and"),E.$nor=j("$nor"),E.$near=E.$nearSphere=w.cast$near,E.$within=E.$geoWithin=w.cast$within,E.$size=E.$minDistance=E.$maxDistance=b,E.$exists=a,E.$type=u,E.$eq=E.$gt=E.$gte=E.$lt=E.$lte=E.$ne=E.$regex=$.prototype.castForQuery,E.$nin=f.prototype.$conditionalHandlers.$nin,E.$in=f.prototype.$conditionalHandlers.$in,
/*!
 * Module exports.
 */
t.exports=$},function(t,e,r){"use strict";var n,o=r(0).documentSchemaSymbol,i=r(3),s=r(17).internalToObjectOptions,a=r(1),u=r(0).getSymbol,c=r(0).scopeSymbol;
/*!
 * Compiles schemas.
 */
function l(t,e,o,i){n=n||r(12);for(var s,u,c=Object.keys(t),l=c.length,p=0;p<l;++p){s=t[u=c[p]],f(u,a.isPOJO(s)&&Object.keys(s).length&&(!s[i.typeKey]||"type"===i.typeKey&&s.type.type)?s:null,e,o,c,i)}}
/*!
 * Defines the accessor named prop on the incoming prototype.
 */function f(t,e,f,p,h,y){n=n||r(12);var d=(p?p+".":"")+t;p=p||"",e?Object.defineProperty(f,t,{enumerable:!0,configurable:!0,get:function(){var t,r,s=this;if(this.$__.getters||(this.$__.getters={}),!this.$__.getters[d]){var u=Object.create(n.prototype,(t=this,r={},Object.getOwnPropertyNames(t).forEach((function(e){r[e]=Object.getOwnPropertyDescriptor(t,e),r[e].get?delete r[e]:r[e].enumerable=-1===["isNew","$__","errors","_doc","$locals","$op","__parentArray","__index","$isDocumentArrayElement"].indexOf(e)})),r));p||(u.$__[c]=this),u.$__.nestedPath=d,Object.defineProperty(u,"schema",{enumerable:!1,configurable:!0,writable:!1,value:f.schema}),Object.defineProperty(u,"$__schema",{enumerable:!1,configurable:!0,writable:!1,value:f.schema}),Object.defineProperty(u,o,{enumerable:!1,configurable:!0,writable:!1,value:f.schema}),Object.defineProperty(u,"toObject",{enumerable:!1,configurable:!0,writable:!1,value:function(){return a.clone(s.get(d,null,{virtuals:i(this,"schema.options.toObject.virtuals",null)}))}}),Object.defineProperty(u,"$__get",{enumerable:!1,configurable:!0,writable:!1,value:function(){return s.get(d,null,{virtuals:i(this,"schema.options.toObject.virtuals",null)})}}),Object.defineProperty(u,"toJSON",{enumerable:!1,configurable:!0,writable:!1,value:function(){return s.get(d,null,{virtuals:i(s,"schema.options.toJSON.virtuals",null)})}}),Object.defineProperty(u,"$__isNested",{enumerable:!1,configurable:!0,writable:!1,value:!0});var h=Object.freeze({minimize:!0,virtuals:!1,getters:!1,transform:!1});Object.defineProperty(u,"$isEmpty",{enumerable:!1,configurable:!0,writable:!1,value:function(){return 0===Object.keys(this.get(d,null,h)||{}).length}}),Object.defineProperty(u,"$__parent",{enumerable:!1,configurable:!0,writable:!1,value:this}),l(e,u,d,y),this.$__.getters[d]=u}return this.$__.getters[d]},set:function(t){null!=t&&t.$__isNested?t=t.$__get():t instanceof n&&!t.$__isNested&&(t=t.toObject(s)),(this.$__[c]||this).$set(d,t)}}):Object.defineProperty(f,t,{enumerable:!0,configurable:!0,get:function(){return this[u].call(this.$__[c]||this,d)},set:function(t){this.$set.call(this.$__[c]||this,d,t)}})}
/*!
 * exports
 */
e.compile=l,e.defineKey=f},function(t,e,r){"use strict";
/*!
 * ignore
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t.exports=function(t){return null==t||("object"!==n(t)||!("$meta"in t)&&!("$slice"in t))}},function(t,e,r){"use strict";(function(e){if(void 0!==e.Map)t.exports=e.Map,t.exports.Map=e.Map;else{var r=function(t){this._keys=[],this._values={};for(var e=0;e<t.length;e++)if(null!=t[e]){var r=t[e],n=r[0],o=r[1];this._keys.push(n),this._values[n]={v:o,i:this._keys.length-1}}};r.prototype.clear=function(){this._keys=[],this._values={}},r.prototype.delete=function(t){var e=this._values[t];return null!=e&&(delete this._values[t],this._keys.splice(e.i,1),!0)},r.prototype.entries=function(){var t=this,e=0;return{next:function(){var r=t._keys[e++];return{value:void 0!==r?[r,t._values[r].v]:void 0,done:void 0===r}}}},r.prototype.forEach=function(t,e){e=e||this;for(var r=0;r<this._keys.length;r++){var n=this._keys[r];t.call(e,this._values[n].v,n,e)}},r.prototype.get=function(t){return this._values[t]?this._values[t].v:void 0},r.prototype.has=function(t){return null!=this._values[t]},r.prototype.keys=function(){var t=this,e=0;return{next:function(){var r=t._keys[e++];return{value:void 0!==r?r:void 0,done:void 0===r}}}},r.prototype.set=function(t,e){return this._values[t]?(this._values[t].v=e,this):(this._keys.push(t),this._values[t]={v:e,i:this._keys.length-1},this)},r.prototype.values=function(){var t=this,e=0;return{next:function(){var r=t._keys[e++];return{value:void 0!==r?t._values[r].v:void 0,done:void 0===r}}}},Object.defineProperty(r.prototype,"size",{enumerable:!0,get:function(){return this._keys.length}}),t.exports=r,t.exports.Map=r}}).call(this,r(9))},function(t,e){var r=function t(e){if(!(this instanceof t))return new t(e);this._bsontype="Int32",this.value=e};r.prototype.valueOf=function(){return this.value},r.prototype.toJSON=function(){return this.value},t.exports=r,t.exports.Int32=r},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(12),o=r(180),i=!1;t.exports=function(){return i?o:n},
/*!
 * ignore
 */
t.exports.setBrowser=function(t){i=t}},function(t,e){t.exports=function(t,e,r){var n=[],o=t.length;if(0===o)return n;var i=e<0?Math.max(0,e+o):e||0;for(void 0!==r&&(o=r<0?r+o:r);o-- >i;)n[o-i]=t[o];return n}},function(t,e,r){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var n=r(2),o=n.Buffer;function i(t,e){for(var r in t)e[r]=t[r]}function s(t,e,r){return o(t,e,r)}o.from&&o.alloc&&o.allocUnsafe&&o.allocUnsafeSlow?t.exports=n:(i(n,e),e.Buffer=s),s.prototype=Object.create(o.prototype),i(o,s),s.from=function(t,e,r){if("number"==typeof t)throw new TypeError("Argument must not be a number");return o(t,e,r)},s.alloc=function(t,e,r){if("number"!=typeof t)throw new TypeError("Argument must be a number");var n=o(t);return void 0!==e?"string"==typeof r?n.fill(e,r):n.fill(e):n.fill(0),n},s.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return o(t)},s.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return n.SlowBuffer(t)}},function(t,e){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n=Object.prototype.toString;t.exports=function(t){if("object"!=r(e=t)||"[object RegExp]"!=n.call(e))throw new TypeError("Not a RegExp");var e,o=[];t.global&&o.push("g"),t.multiline&&o.push("m"),t.ignoreCase&&o.push("i"),t.dotAll&&o.push("s"),t.unicode&&o.push("u"),t.sticky&&o.push("y");var i=new RegExp(t.source,o.join(""));return"number"==typeof t.lastIndex&&(i.lastIndex=t.lastIndex),i}},function(t,e,r){"use strict";t.exports=function(t){return t.name?t.name:(t.toString().trim().match(/^function\s*([^\s(]+)/)||[])[1]}},function(t,e,r){"use strict";var n=r(3);
/*!
 * Get the bson type, if it exists
 */t.exports=function(t,e){return n(t,"_bsontype",void 0)===e}},function(t,e,r){"use strict";(function(e){
/*!
 * ignore
 */
var n=r(23),o=r(118),i={_promise:null,get:function(){return i._promise},set:function(t){n.ok("function"==typeof t,"mongoose.Promise must be a function, got ".concat(t)),i._promise=t,o.Promise=t}};
/*!
 * Use native promises by default
 */
i.set(e.Promise),t.exports=i}).call(this,r(9))},function(t,e,r){"use strict";(function(t,n){
/*!
 * Module dependencies.
 */
function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i=r(120).Buffer,s=r(64),a=["__proto__","constructor","prototype"],u=e.clone=function t(r,n){if(null==r)return r;if(Array.isArray(r))return e.cloneArray(r,n);if(r.constructor){if(/ObjectI[dD]$/.test(r.constructor.name))return"function"==typeof r.clone?r.clone():new r.constructor(r.id);if("ReadPreference"===r.constructor.name)return new r.constructor(r.mode,t(r.tags,n));if("Binary"==r._bsontype&&r.buffer&&r.value)return"function"==typeof r.clone?r.clone():new r.constructor(r.value(!0),r.sub_type);if("Date"===r.constructor.name||"Function"===r.constructor.name)return new r.constructor(+r);if("RegExp"===r.constructor.name)return s(r);if("Buffer"===r.constructor.name)return e.cloneBuffer(r)}return l(r)?e.cloneObject(r,n):r.valueOf?r.valueOf():void 0};
/*!
 * ignore
 */
e.cloneObject=function(t,e){for(var r,n,o=e&&e.minimize,i={},s=0,c=Object.keys(t);s<c.length;s++){var l=c[s];-1===a.indexOf(l)&&(n=u(t[l],e),o&&void 0===n||(r||(r=!0),i[l]=n))}return o?r&&i:i},e.cloneArray=function(t,e){for(var r=[],n=0,o=t.length;n<o;n++)r.push(u(t[n],e));return r},e.tick=function(t){if("function"==typeof t)return function(){var e=arguments;f((function(){t.apply(this,e)}))}},e.merge=function t(r,n){for(var o,i=Object.keys(n),s=i.length;s--;)o=i[s],-1===a.indexOf(o)&&(void 0===r[o]?r[o]=n[o]:e.isObject(n[o])?t(r[o],n[o]):r[o]=n[o])},e.mergeClone=function t(r,n){for(var o,i=Object.keys(n),s=i.length;s--;)o=i[s],-1===a.indexOf(o)&&(void 0===r[o]?r[o]=u(n[o]):e.isObject(n[o])?t(r[o],n[o]):r[o]=u(n[o]))},e.readPref=function(t){switch(t){case"p":t="primary";break;case"pp":t="primaryPreferred";break;case"s":t="secondary";break;case"sp":t="secondaryPreferred";break;case"n":t="nearest"}return t},e.readConcern=function(t){if("string"==typeof t){switch(t){case"l":t="local";break;case"a":t="available";break;case"m":t="majority";break;case"lz":t="linearizable";break;case"s":t="snapshot"}t={level:t}}return t};var c=Object.prototype.toString;e.toString=function(t){return c.call(t)};var l=e.isObject=function(t){return"[object Object]"==e.toString(t)};e.isArray=function(t){return Array.isArray(t)||"object"==o(t)&&"[object Array]"==e.toString(t)},e.keys=Object.keys,e.create="function"==typeof Object.create?Object.create:function(t){if(arguments.length>1)throw new Error("Adding properties is not supported");function e(){}return e.prototype=t,new e},e.inherits=function(t,r){t.prototype=e.create(r.prototype),t.prototype.constructor=t};var f=e.soon="function"==typeof t?t:n.nextTick;e.cloneBuffer=function(t){var e=i.alloc(t.length);return t.copy(e,0,0,t.length),e},e.isArgumentsObject=function(t){return"[object Arguments]"===Object.prototype.toString.call(t)}}).call(this,r(69).setImmediate,r(11))},function(t,e,r){(function(t){var n=void 0!==t&&t||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function i(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new i(o.call(setTimeout,n,arguments),clearTimeout)},e.setInterval=function(){return new i(o.call(setInterval,n,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(n,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout((function(){t._onTimeout&&t._onTimeout()}),e))},r(119),e.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==t&&t.clearImmediate||this&&this.clearImmediate}).call(this,r(9))},function(t,e,r){"use strict";(function(t,r,n,o){function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}e.isNode=void 0!==t&&"object"==i(r)&&"object"==(void 0===n?"undefined":i(n))&&"function"==typeof o&&t.argv,e.isMongo=!e.isNode&&"function"==typeof printjson&&"function"==typeof ObjectId&&"function"==typeof rs&&"function"==typeof sh,e.isBrowser=!e.isNode&&!e.isMongo&&"undefined"!=typeof window,e.type=e.isNode?"node":e.isMongo?"mongo":e.isBrowser?"browser":"unknown"}).call(this,r(11),r(125)(t),r(9),r(2).Buffer)},function(t,e,r){"use strict";t.exports=function(t,e,r){for(var n={},o=0,i=Object.keys(e.tree);o<i.length;o++){var s=i[o];r&&(t.paths[s]||t.nested[s]||t.singleNestedPaths[s])||(n[s]=e.tree[s])}for(var a in t.add(n),t.callQueue=t.callQueue.concat(e.callQueue),t.method(e.methods),t.static(e.statics),e.query)t.query[a]=e.query[a];for(var u in e.virtuals)t.virtuals[u]=e.virtuals[u].clone();t.s.hooks.merge(e.s.hooks,!1)}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=r(5),l=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(u,t);var e,r,n,a=s(u);function u(t){var e;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u);var r=t.message;r||(r=c.messages.general.default);var n=f(r,t);return e=a.call(this,n),t=Object.assign({},t,{message:n}),e.properties=t,e.kind=t.type,e.path=t.path,e.value=t.value,e.reason=t.reason,e}
/*!
   * toString helper
   * TODO remove? This defaults to `${this.name}: ${this.message}`
   */return e=u,(r=[{key:"toString",value:function(){return this.message}
/*!
     * Ensure `name` and `message` show up in toJSON output re: gh-9296
     */},{key:"toJSON",value:function(){return Object.assign({name:this.name,message:this.message},this)}}])&&o(e.prototype,r),n&&o(e,n),u}(c);
/*!
 * Formats error messages
 */
function f(t,e){if("function"==typeof t)return t(e);for(var r=0,n=Object.keys(e);r<n.length;r++){var o=n[r];"message"!==o&&(t=t.replace("{"+o.toUpperCase()+"}",e[o]))}return t}
/*!
 * exports
 */Object.defineProperty(l.prototype,"name",{value:"ValidatorError"}),
/*!
 * The object used to define this validator. Not enumerable to hide
 * it from `require('util').inspect()` output re: gh-3925
 */
Object.defineProperty(l.prototype,"properties",{enumerable:!1,writable:!0,value:null}),l.prototype.formatMessage=f,t.exports=l},function(t,e,r){"use strict";
/*!
 * ignore
 */t.exports=function(t){if(Array.isArray(t)){if(!t.every((function(t){return"number"==typeof t||"string"==typeof t})))throw new Error("$type array values must be strings or numbers");return t}if("number"!=typeof t&&"string"!=typeof t)throw new Error("$type parameter must be number, string, or array of numbers and strings");return t}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);function r(t,n){var o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r);var i=Array.isArray(n)?"array":"primitive value";return(o=e.call(this,"Tried to set nested object field `"+t+"` to ".concat(i," `")+n+"` and strict mode is set to throw.")).path=t,o}return r}(r(5));Object.defineProperty(u.prototype,"name",{value:"ObjectExpectedError"}),t.exports=u},function(t,e,r){"use strict";t.exports=function(t){var e={_id:{auto:!0}};e._id[t.options.typeKey]="ObjectId",t.add(e)}},function(t,e,r){"use strict";t.exports=
/*!
 * ignore
 */
function(t,e){if(null==t)return null;if("boolean"==typeof t)return e;if("boolean"==typeof t[e])return t[e]?e:null;if(!(e in t))return e;return t[e]}},function(t,e,r){"use strict";var n=r(34),o=r(25);
/*!
 * Register hooks for this model
 *
 * @param {Model} model
 * @param {Schema} schema
 */
function i(t,e,r){var s={useErrorHandlers:!0,numCallbackParams:1,nullResultByDefault:!0,contextParameter:!0},a=(r=r||{}).decorateDoc?t:t.prototype;t.$appliedHooks=!0;for(var u=0,c=Object.keys(e.paths);u<c.length;u++){var l=c[u],f=e.paths[l],p=null;if(f.$isSingleNested)p=f.caster;else{if(!f.$isMongooseDocumentArray)continue;p=f.Constructor}if(!p.$appliedHooks&&(i(p,f.schema,r),null!=p.discriminators))for(var h=0,y=Object.keys(p.discriminators);h<y.length;h++){var d=y[h];i(p.discriminators[d],p.discriminators[d].schema,r)}}var _=e.s.hooks.filter((function(t){return"updateOne"===t.name||"deleteOne"===t.name?!!t.document:"remove"===t.name||"init"===t.name?null==t.document||!!t.document:null==t.query&&null==t.document||!1!==t.document})).filter((function(t){return!e.methods[t.name]||!t.fn[n.builtInMiddleware]}));t._middleware=_,a.$__originalValidate=a.$__originalValidate||a.$__validate;for(var v=0,m=["save","validate","remove","deleteOne"];v<m.length;v++){var g=m[v],b="validate"===g?"$__originalValidate":"$__".concat(g),w=_.createWrapper(g,a[b],null,s);a["$__".concat(g)]=w}a.$__init=_.createWrapperSync("init",a.$__init,null,s);for(var O=Object.keys(e.methods),S=Object.assign({},s,{checkForPromise:!0}),A=function(){var e=E[$];if(!_.hasHooks(e))return"continue";var r=a[e];a[e]=function(){var r=this,n=Array.prototype.slice.call(arguments),i=n.slice(-1).pop(),s="function"==typeof i?n.slice(0,n.length-1):n;return o(i,(function(t){return r["$__".concat(e)].apply(r,s.concat([t]))}),t.events)},a["$__".concat(e)]=_.createWrapper(e,r,null,S)},$=0,E=O;$<E.length;$++)A()}
/*!
 * ignore
 */
t.exports=i,
/*!
 * ignore
 */
i.middlewareFunctions=["deleteOne","save","validate","remove","updateOne","init"]},function(t,e,r){"use strict";var n=r(13);
/*!
 * Given a value, cast it to a string, or throw a `CastError` if the value
 * cannot be casted. `null` and `undefined` are considered valid.
 *
 * @param {Any} value
 * @param {String} [path] optional the path to set on the CastError
 * @return {string|null|undefined}
 * @throws {CastError}
 * @api private
 */t.exports=function(t,e){if(null==t)return t;if(t._id&&"string"==typeof t._id)return t._id;if(t.toString&&t.toString!==Object.prototype.toString&&!Array.isArray(t))return t.toString();throw new n("string",t,e)}},function(t,e,r){"use strict";
/*!
 * Module requirements.
 */var n=r(5),o=r(150),i=r(6),s=r(151),a=r(80),u=r(1),c=i.CastError;function l(t,e){i.call(this,t,e,"Number")}
/*!
 * ignore
 */
function f(t){return this.cast(t)}l.get=i.get,l.set=i.set,
/*!
 * ignore
 */
l._cast=s,l.cast=function(t){return 0===arguments.length||(!1===t&&(t=this._defaultCaster),this._cast=t),this._cast},
/*!
 * ignore
 */
l._defaultCaster=function(t){if("number"!=typeof t)throw new Error;return t},l.schemaName="Number",l.defaultOptions={},
/*!
 * Inherits from SchemaType.
 */
l.prototype=Object.create(i.prototype),l.prototype.constructor=l,l.prototype.OptionsConstructor=o,
/*!
 * ignore
 */
l._checkRequired=function(t){return"number"==typeof t||t instanceof Number},l.checkRequired=i.checkRequired,l.prototype.checkRequired=function(t,e){return i._isRef(this,t,e,!0)?!!t:("function"==typeof this.constructor.checkRequired?this.constructor.checkRequired():l.checkRequired())(t)},l.prototype.min=function(t,e){if(this.minValidator&&(this.validators=this.validators.filter((function(t){return t.validator!==this.minValidator}),this)),null!=t){var r=e||n.messages.Number.min;r=r.replace(/{MIN}/,t),this.validators.push({validator:this.minValidator=function(e){return null==e||e>=t},message:r,type:"min",min:t})}return this},l.prototype.max=function(t,e){if(this.maxValidator&&(this.validators=this.validators.filter((function(t){return t.validator!==this.maxValidator}),this)),null!=t){var r=e||n.messages.Number.max;r=r.replace(/{MAX}/,t),this.validators.push({validator:this.maxValidator=function(e){return null==e||e<=t},message:r,type:"max",max:t})}return this},l.prototype.enum=function(t,e){return this.enumValidator&&(this.validators=this.validators.filter((function(t){return t.validator!==this.enumValidator}),this)),Array.isArray(t)||(t=u.isObject(t)?u.object.vals(t):Array.prototype.slice.call(arguments),e=n.messages.Number.enum),e=null==e?n.messages.Number.enum:e,this.enumValidator=function(e){return null==e||-1!==t.indexOf(e)},this.validators.push({validator:this.enumValidator,message:e,type:"enum",enumValues:t}),this},l.prototype.cast=function(t,e,r){if(i._isRef(this,t,e,r))return"number"==typeof t?t:this._castRef(t,e,r);var n,o=t&&void 0!==t._id?t._id:t;n="function"==typeof this._castFunction?this._castFunction:"function"==typeof this.constructor.cast?this.constructor.cast():l.cast();try{return n(o)}catch(t){throw new c("Number",o,this.path,t,this)}},l.prototype.$conditionalHandlers=u.options(i.prototype.$conditionalHandlers,{$bitsAllClear:a,$bitsAnyClear:a,$bitsAllSet:a,$bitsAnySet:a,$gt:f,$gte:f,$lt:f,$lte:f,$mod:function(t){var e=this;return Array.isArray(t)?t.map((function(t){return e.cast(t)})):[this.cast(t)]}}),l.prototype.castForQuery=function(t,e){var r;if(2===arguments.length){if(!(r=this.$conditionalHandlers[t]))throw new c("number",e,this.path,null,this);return r.call(this,e)}return e=this._castForQuery(t)},
/*!
 * Module exports.
 */
t.exports=l},function(t,e,r){"use strict";(function(e){
/*!
 * Module requirements.
 */
var n=r(13);
/*!
 * ignore
 */
/*!
 * ignore
 */
function o(t,e){var r=Number(e);if(isNaN(r))throw new n("number",e,t);return r}t.exports=function(t){var r=this;return Array.isArray(t)?t.map((function(t){return o(r.path,t)})):e.isBuffer(t)?t:o(r.path,t)}}).call(this,r(2).Buffer)},function(t,e,r){"use strict";var n=r(10);t.exports=function(t,e){return"string"==typeof t&&"string"==typeof e||"number"==typeof t&&"number"==typeof e?t===e:t instanceof n&&e instanceof n&&t.toString()===e.toString()}},function(t,e,r){"use strict";var n=new Set(["$ref","$id","$db"]);t.exports=function(t){return t.startsWith("$")&&!n.has(t)}},function(t,e,r){"use strict";
/*!
 * Module requirements.
 */var n=r(35).castArraysOfNumbers,o=r(35).castToNumber;function i(t,e){switch(t.$geometry.type){case"Polygon":case"LineString":case"Point":n(t.$geometry.coordinates,e)}return s(e,t),t}function s(t,e){e.$maxDistance&&(e.$maxDistance=o.call(t,e.$maxDistance)),e.$minDistance&&(e.$minDistance=o.call(t,e.$minDistance))}
/*!
 * ignore
 */
e.cast$geoIntersects=function(t){if(!t.$geometry)return;return i(t,this),t},e.cast$near=function(t){var e=r(56);if(Array.isArray(t))return n(t,this),t;if(s(this,t),t&&t.$geometry)return i(t,this);if(!Array.isArray(t))throw new TypeError("$near must be either an array or an object with a $geometry property");return e.prototype.castForQuery.call(this,t)},e.cast$within=function(t){var e=this;if(s(this,t),t.$box||t.$polygon){var r=t.$box?"$box":"$polygon";t[r].forEach((function(t){if(!Array.isArray(t))throw new TypeError("Invalid $within $box argument. Expected an array, received "+t);t.forEach((function(r,n){t[n]=o.call(e,r)}))}))}else if(t.$center||t.$centerSphere){var n=t.$center?"$center":"$centerSphere";t[n].forEach((function(r,i){Array.isArray(r)?r.forEach((function(t,n){r[n]=o.call(e,t)})):t[n][i]=o.call(e,r)}))}else t.$geometry&&i(t,this);return t}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(85),o=r(0).arrayAtomicsSymbol,i=r(0).arrayParentSymbol,s=r(0).arrayPathSymbol,a=r(0).arraySchemaSymbol,u=Array.prototype.push;
/*!
 * Module exports.
 */
t.exports=function(t,e,r,c){var l;if(Array.isArray(t)){var f=t.length;if(0===f)l=new n;else if(1===f)(l=new n(1))[0]=t[0];else if(f<1e4)l=new n,u.apply(l,t);else{l=new n;for(var p=0;p<f;++p)u.call(l,t[p])}null!=t[o]&&(l[o]=t[o])}else l=new n;return l[s]=e,null!=r&&null!=r.$__&&(l[i]=r,l[a]=c||r.schema.path(e)),l}},function(t,e,r){"use strict";(function(e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t,e,r){return(u="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=y(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function c(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function l(t){var e="function"==typeof Map?new Map:void 0;return(l=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return f(t,arguments,y(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),h(n,t)})(t)}function f(t,e,r){return(f=p()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&h(o,r.prototype),o}).apply(null,arguments)}function p(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var d=r(12),_=r(27),v=r(14),m=r(10),g=r(86),b=r(3),w=r(17).internalToObjectOptions,O=r(1),S=r(4),A=r(0).arrayAtomicsSymbol,$=r(0).arrayParentSymbol,E=r(0).arrayPathSymbol,j=r(0).arraySchemaSymbol,P=r(0).populateModelSymbol,x=Symbol("mongoose#Array#sliced"),T=Array.prototype.push,N=Symbol("mongoose#MongooseCoreArray#validators"),k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(S,t);var r,n,o,i,l,f=(r=S,n=p(),function(){var t,e=y(r);if(n){var o=y(this).constructor;t=Reflect.construct(e,arguments,o)}else t=e.apply(this,arguments);return c(this,t)});function S(){return s(this,S),f.apply(this,arguments)}return o=S,(i=[{key:"isMongooseArray",get:function(){return!0}},{key:"validators",get:function(){return this[N]},set:function(t){this[N]=t}},{key:"$__getAtomics",value:function(){var t=[],e=Object.keys(this[A]||{}),r=e.length,n=Object.assign({},w,{_isNested:!0});if(0===r)return t[0]=["$set",this.toObject(n)],t;for(;r--;){var o=e[r],i=this[A][o];O.isMongooseObject(i)?i=i.toObject(n):Array.isArray(i)?i=this.toObject.call(i,n):null!=i&&Array.isArray(i.$each)?i.$each=this.toObject.call(i.$each,n):null!=i&&"function"==typeof i.valueOf&&(i=i.valueOf()),"$addToSet"===o&&(i={$each:i}),t.push([o,i])}return t}
/*!
     * ignore
     */},{key:"$atomics",value:function(){return this[A]||{}}
/*!
     * ignore
     */},{key:"$parent",value:function(){return this[$]}
/*!
     * ignore
     */},{key:"$path",value:function(){return this[E]}},{key:"$shift",value:function(){if(this._registerAtomic("$pop",-1),this._markModified(),!this._shifted)return this._shifted=!0,[].shift.call(this)}},{key:"$pop",value:function(){if(this._registerAtomic("$pop",1),this._markModified(),!this._popped)return this._popped=!0,[].pop.call(this)}
/*!
     * ignore
     */},{key:"$schema",value:function(){return this[j]}},{key:"_cast",value:function(t){var r,n=!1;return this[$]&&(n=this[$].populated(this[E],!0)),n&&null!=t?(r=n.options[P],(e.isBuffer(t)||t instanceof m||!O.isObject(t))&&(t={_id:t}),t.$__schema&&t.$__schema.discriminatorMapping&&void 0!==t.$__schema.discriminatorMapping.key||(t=new r(t)),this[j].caster.applySetters(t,this[$],!0)):this[j].caster.applySetters(t,this[$],!1)}},{key:"_mapCast",value:function(t,e){return this._cast(t,this.length+e)}},{key:"_markModified",value:function(t){var e,r=this[$];if(r){if(e=this[E],arguments.length&&(e=e+"."+t),null!=e&&e.endsWith(".$"))return this;r.markModified(e,arguments.length>0?t:r)}return this}},{key:"_registerAtomic",value:function(t,e){if(!this[x]){if("$set"===t)return this[A]={$set:e},g(this[$],this[E]),this._markModified(),this;this[A]||(this[A]={});var r,n=this[A];if("$pop"===t&&!("$pop"in n)){var o=this;this[$].once("save",(function(){o._popped=o._shifted=null}))}if(this[A].$set||Object.keys(n).length&&!(t in n))return this[A]={$set:this},this;if("$pullAll"===t||"$addToSet"===t)n[t]||(n[t]=[]),n[t]=n[t].concat(e);else if("$pullDocs"===t){var i=n.$pull||(n.$pull={});e[0]instanceof _?(r=i.$or||(i.$or=[]),Array.prototype.push.apply(r,e.map((function(t){return t.toObject({transform:!1,virtuals:!1})})))):(r=i._id||(i._id={$in:[]})).$in=r.$in.concat(e)}else"$push"===t?(n.$push=n.$push||{$each:[]},null!=e&&O.hasUserDefinedProperty(e,"$each")?n.$push=e:n.$push.$each=n.$push.$each.concat(e)):n[t]=e;return this}}},{key:"addToSet",value:function(){B(this,arguments);var t=[].map.call(arguments,this._mapCast,this);t=this[j].applySetters(t,this[$]);var e=[],r="";return t[0]instanceof _?r="doc":t[0]instanceof Date&&(r="date"),t.forEach((function(t){var n,o=+t;switch(r){case"doc":n=this.some((function(e){return e.equals(t)}));break;case"date":n=this.some((function(t){return+t===o}));break;default:n=~this.indexOf(t)}n||([].push.call(this,t),this._registerAtomic("$addToSet",t),this._markModified(),[].push.call(e,t))}),this),e}},{key:"hasAtomics",value:function(){return O.isPOJO(this[A])?Object.keys(this[A]).length:0}},{key:"includes",value:function(t,e){return-1!==this.indexOf(t,e)}},{key:"indexOf",value:function(t,e){t instanceof m&&(t=t.toString()),e=null==e?0:e;for(var r=this.length,n=e;n<r;++n)if(t==this[n])return n;return-1}},{key:"inspect",value:function(){return JSON.stringify(this)}},{key:"nonAtomicPush",value:function(){var t=[].map.call(arguments,this._mapCast,this),e=[].push.apply(this,t);return this._registerAtomic("$set",this),this._markModified(),e}},{key:"pop",value:function(){var t=[].pop.call(this);return this._registerAtomic("$set",this),this._markModified(),t}},{key:"pull",value:function(){for(var t,e=[].map.call(arguments,this._cast,this),r=this[$].get(this[E]),n=r.length;n--;)if((t=r[n])instanceof d){var o=e.some((function(e){return t.equals(e)}));o&&[].splice.call(r,n,1)}else~r.indexOf.call(e,t)&&[].splice.call(r,n,1);return e[0]instanceof _?this._registerAtomic("$pullDocs",e.map((function(t){return t.$__getValue("_id")||t}))):this._registerAtomic("$pullAll",e),this._markModified(),g(this[$],this[E])>0&&this._registerAtomic("$set",this),this}},{key:"push",value:function(){var t=arguments,e=t,r=null!=t[0]&&O.hasUserDefinedProperty(t[0],"$each");if(r&&(e=t[0],t=t[0].$each),null==this[j])return T.apply(this,t);B(this,t);var n,o=this[$];t=[].map.call(t,this._mapCast,this),t=this[j].applySetters(t,o,void 0,void 0,{skipDocumentArrayCast:!0});var i=this[A];if(r){if(e.$each=t,b(i,"$push.$each.length",0)>0&&i.$push.$position!=i.$position)throw new v("Cannot call `Array#push()` multiple times with different `$position`");null!=e.$position?([].splice.apply(this,[e.$position,0].concat(t)),n=this.length):n=[].push.apply(this,t)}else{if(b(i,"$push.$each.length",0)>0&&null!=i.$push.$position)throw new v("Cannot call `Array#push()` multiple times with different `$position`");e=t,n=[].push.apply(this,t)}return this._registerAtomic("$push",e),this._markModified(),n}},{key:"remove",value:function(){return this.pull.apply(this,arguments)}},{key:"set",value:function(t,e){var r=this._cast(e,t);return this[t]=r,this._markModified(t),this}},{key:"shift",value:function(){var t=[].shift.call(this);return this._registerAtomic("$set",this),this._markModified(),t}},{key:"sort",value:function(){var t=[].sort.apply(this,arguments);return this._registerAtomic("$set",this),t}},{key:"splice",value:function(){var t;if(B(this,Array.prototype.slice.call(arguments,2)),arguments.length){var e;if(null==this[j])e=arguments;else{e=[];for(var r=0;r<arguments.length;++r)e[r]=r<2?arguments[r]:this._cast(arguments[r],arguments[0]+(r-2))}t=[].splice.apply(this,e),this._registerAtomic("$set",this)}return t}
/*!
     * ignore
     */},{key:"slice",value:function(){var t=u(y(S.prototype),"slice",this).apply(this,arguments);return t[$]=this[$],t[j]=this[j],t[A]=this[A],t[E]=this[E],t[x]=!0,t}
/*!
     * ignore
     */},{key:"filter",value:function(){var t=u(y(S.prototype),"filter",this).apply(this,arguments);return t[$]=this[$],t[j]=this[j],t[A]=this[A],t[E]=this[E],t}
/*!
     * ignore
     */},{key:"toBSON",value:function(){return this.toObject(w)}},{key:"toObject",value:function(t){return t&&t.depopulate?((t=O.clone(t))._isNested=!0,[].concat(this).map((function(e){return e instanceof d?e.toObject(t):e}))):[].concat(this)}},{key:"unshift",value:function(){var t;return B(this,arguments),null==this[j]?t=arguments:(t=[].map.call(arguments,this._cast,this),t=this[j].applySetters(t,this[$])),[].unshift.apply(this,t),this._registerAtomic("$set",this),this._markModified(),this.length}}])&&a(o.prototype,i),l&&a(o,l),S}(l(Array));
/*!
 * ignore
 */
function B(t,e){var r,n,i,s=null==t?null:b(t[j],"caster.options.ref",null);0===t.length&&e.length>0&&
/*!
 * ignore
 */
function(t,e){if(!e)return!1;var r,n=o(t);try{for(n.s();!(r=n.n()).done;){var i=r.value;if(null==i)return!1;var s=i.constructor;if(!(i instanceof d)||s.modelName!==e&&s.baseModelName!==e)return!1}}catch(t){n.e(t)}finally{n.f()}return!0}(e,s)&&t[$].populated(t[E],[],(r={},n=P,i=e[0].constructor,n in r?Object.defineProperty(r,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[n]=i,r))}S.inspect.custom&&(k.prototype[S.inspect.custom]=k.prototype.inspect),t.exports=k}).call(this,r(2).Buffer)},function(t,e,r){"use strict";
/*!
 * ignore
 */t.exports=function(t,e,r){var n=(r=r||{}).skipDocArrays,o=0;if(!t)return o;for(var i=0,s=Object.keys(t.$__.activePaths.states.modify);i<s.length;i++){var a=s[i];if(n){var u=t.$__schema.path(a);if(u&&u.$isMongooseDocumentArray)continue}a.startsWith(e+".")&&(delete t.$__.activePaths.states.modify[a],++o)}return o}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(15).get().Binary,o=r(1),i=r(63).Buffer;function s(t,e,r){var n,a,c,l,f,p=arguments.length;return n=0===p||null==arguments[0]?0:t,Array.isArray(e)?(c=e[0],l=e[1]):a=e,f="number"==typeof n||n instanceof Number?i.alloc(n):i.from(n,a,r),o.decorate(f,s.mixin),f.isMongooseBuffer=!0,f[s.pathSymbol]=c,f[u]=l,f._subtype=0,f}var a=Symbol.for("mongoose#Buffer#_path"),u=Symbol.for("mongoose#Buffer#_parent");s.pathSymbol=a,
/*!
 * Inherit from Buffer.
 */
s.mixin={_subtype:void 0,_markModified:function(){var t=this[u];return t&&t.markModified(this[s.pathSymbol]),this},write:function(){var t=i.prototype.write.apply(this,arguments);return t>0&&this._markModified(),t},copy:function(t){var e=i.prototype.copy.apply(this,arguments);return t&&t.isMongooseBuffer&&t._markModified(),e}},
/*!
 * Compile other Buffer methods marking this buffer as modified.
 */
"writeUInt8 writeUInt16 writeUInt32 writeInt8 writeInt16 writeInt32 writeFloat writeDouble fill utf8Write binaryWrite asciiWrite set writeUInt16LE writeUInt16BE writeUInt32LE writeUInt32BE writeInt16LE writeInt16BE writeInt32LE writeInt32BE writeFloatLE writeFloatBE writeDoubleLE writeDoubleBE".split(" ").forEach((function(t){i.prototype[t]&&(s.mixin[t]=function(){var e=i.prototype[t].apply(this,arguments);return this._markModified(),e})})),s.mixin.toObject=function(t){var e="number"==typeof t?t:this._subtype||0;return new n(i.from(this),e)},s.mixin.toBSON=function(){return new n(this,this._subtype||0)},s.mixin.equals=function(t){if(!i.isBuffer(t))return!1;if(this.length!==t.length)return!1;for(var e=0;e<this.length;++e)if(this[e]!==t[e])return!1;return!0},s.mixin.subtype=function(t){if("number"!=typeof t)throw new TypeError("Invalid subtype. Expected a number");this._subtype!==t&&this._markModified(),this._subtype=t},
/*!
 * Module exports.
 */
s.Binary=n,t.exports=s},function(t,e,r){"use strict";var n=r(15).get().ObjectId,o=r(23);t.exports=function(t){if(null==t)return t;if(t instanceof n)return t;if(t._id){if(t._id instanceof n)return t._id;if(t._id.toString instanceof Function)return new n(t._id.toString())}if(t.toString instanceof Function)return new n(t.toString());o.ok(!1)}},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t,e,r){return(a="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=h(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function u(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){var e="function"==typeof Map?new Map:void 0;return(c=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return l(t,arguments,h(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),p(n,t)})(t)}function l(t,e,r){return(l=f()?Reflect.construct:function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&p(o,r.prototype),o}).apply(null,arguments)}function f(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var y=r(26),d=r(10),_=r(1).deepEqual,v=r(3),m=r(90),g=r(4),b=r(50),w=r(0).populateModelSymbol,O=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(g,t);var e,r,n,i,c,l=(e=g,r=f(),function(){var t,n=h(e);if(r){var o=h(this).constructor;t=Reflect.construct(n,arguments,o)}else t=n.apply(this,arguments);return u(this,t)});function g(t,e,r,n){var o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,g),null!=t&&"Object"===t.constructor.name&&(t=Object.keys(t).reduce((function(e,r){return e.concat([[r,t[r]]])}),[])),(o=l.call(this,t)).$__parent=null!=r&&null!=r.$__?r:null,o.$__path=e,o.$__schemaType=null==n?new y(e):n,o.$__runDeferred(),o}return n=g,(i=[{key:"$init",value:function(t,e){S(t),a(h(g.prototype),"set",this).call(this,t,e),null!=e&&e.$isSingleNested&&(e.$basePath=this.$__path+"."+t)}},{key:"$__set",value:function(t,e){a(h(g.prototype),"set",this).call(this,t,e)}},{key:"get",value:function(t,e){return t instanceof d&&(t=t.toString()),!1===(e=e||{}).getters?a(h(g.prototype),"get",this).call(this,t):this.$__schemaType.applyGetters(a(h(g.prototype),"get",this).call(this,t),this.$__parent)}},{key:"set",value:function(t,e){if(t instanceof d&&(t=t.toString()),S(t),e=m(e),null==this.$__schemaType)return this.$__deferred=this.$__deferred||[],void this.$__deferred.push({key:t,value:e});var r=this.$__path+"."+t,n=null!=this.$__parent&&this.$__parent.$__?this.$__parent.populated(r)||this.$__parent.populated(this.$__path):null,o=this.get(t);if(null!=n)null==e.$__&&(e=new n.options[w](e)),e.$__.wasPopulated=!0;else try{e=this.$__schemaType.applySetters(e,this.$__parent,!1,this.get(t),{path:r})}catch(t){if(null!=this.$__parent&&null!=this.$__parent.$__)return void this.$__parent.invalidate(r,t);throw t}a(h(g.prototype),"set",this).call(this,t,e),null!=e&&e.$isSingleNested&&(e.$basePath=this.$__path+"."+t);var i=this.$__parent;null==i||null==i.$__||_(e,o)||i.markModified(this.$__path+"."+t)}},{key:"clear",value:function(){a(h(g.prototype),"clear",this).call(this);var t=this.$__parent;null!=t&&t.markModified(this.$__path)}},{key:"delete",value:function(t){t instanceof d&&(t=t.toString()),this.set(t,void 0),a(h(g.prototype),"delete",this).call(this,t)}},{key:"toBSON",value:function(){return new Map(this)}},{key:"toObject",value:function(t){if(v(t,"flattenMaps")){var e,r={},n=o(this.keys());try{for(n.s();!(e=n.n()).done;){var i=e.value;r[i]=this.get(i)}}catch(t){n.e(t)}finally{n.f()}return r}return new Map(this)}},{key:"toJSON",value:function(){var t,e={},r=o(this.keys());try{for(r.s();!(t=r.n()).done;){var n=t.value;e[n]=this.get(n)}}catch(t){r.e(t)}finally{r.f()}return e}},{key:"inspect",value:function(){return new Map(this)}},{key:"$__runDeferred",value:function(){if(this.$__deferred){var t,e=o(this.$__deferred);try{for(e.s();!(t=e.n()).done;){var r=t.value;this.set(r.key,r.value)}}catch(t){e.e(t)}finally{e.f()}this.$__deferred=null}}}])&&s(n.prototype,i),c&&s(n,c),g}(c(Map));
/*!
 * Since maps are stored as objects under the hood, keys must be strings
 * and can't contain any invalid characters
 */
function S(t){var e=n(t);if("string"!==e)throw new TypeError("Mongoose maps only support string keys, got ".concat(e));if(t.startsWith("$"))throw new Error('Mongoose maps do not support keys that start with "$", got "'.concat(t,'"'));if(t.includes("."))throw new Error('Mongoose maps do not support keys that contain ".", got "'.concat(t,'"'));if(b.has(t))throw new Error('Mongoose maps do not support reserved key name "'.concat(t,'"'))}g.inspect.custom&&Object.defineProperty(O.prototype,g.inspect.custom,{enumerable:!1,writable:!1,configurable:!1,value:O.prototype.inspect}),Object.defineProperty(O.prototype,"$__set",{enumerable:!1,writable:!0,configurable:!1}),Object.defineProperty(O.prototype,"$__parent",{enumerable:!1,writable:!0,configurable:!1}),Object.defineProperty(O.prototype,"$__path",{enumerable:!1,writable:!0,configurable:!1}),Object.defineProperty(O.prototype,"$__schemaType",{enumerable:!1,writable:!0,configurable:!1}),Object.defineProperty(O.prototype,"$isMongooseMap",{enumerable:!1,writable:!1,configurable:!1,value:!0}),Object.defineProperty(O.prototype,"$__deferredCalls",{enumerable:!1,writable:!1,configurable:!1,value:!0}),t.exports=O},function(t,e,r){"use strict";var n=r(1);t.exports=function(t){return n.isPOJO(t)&&null!=t.$__&&null!=t._doc?t._doc:t}},function(t,e,r){"use strict";function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r(12),s=r(22),a=r(17).internalToObjectOptions,u=r(25),c=r(0).documentArrayParent;function l(t,e,r,o,s){var a=this;this.$isSingleNested=!0,null!=s&&null!=s.path&&(this.$basePath=s.path);var u=null!=s&&s.priorDoc,c=null;if(u&&(this._doc=Object.assign({},s.priorDoc._doc),delete this._doc[this.$__schema.options.discriminatorKey],c=Object.keys(s.priorDoc._doc||{}).filter((function(t){return t!==a.$__schema.options.discriminatorKey}))),null!=r&&(s=Object.assign({},s,{isNew:r.isNew,defaults:r.$__.$options.defaults})),i.call(this,t,e,o,s),u){var l,f=n(c);try{for(f.s();!(l=f.n()).done;){var p=l.value;if(!this.$__.activePaths.states.modify[p]&&!this.$__.activePaths.states.default[p]&&!this.$__.$setCalled.has(p)){var h=this.$__schema.path(p),y=null==h?void 0:h.getDefault(this);void 0===y?delete this._doc[p]:(this._doc[p]=y,this.$__.activePaths.default(p))}}}catch(t){f.e(t)}finally{f.f()}delete s.priorDoc,delete this.$__.$options.priorDoc}}t.exports=l,l.prototype=Object.create(i.prototype),l.prototype.toBSON=function(){return this.toObject(a)},l.prototype.save=function(t,e){var r=this;return"function"==typeof t&&(e=t,t={}),(t=t||{}).suppressWarning||console.warn("mongoose: calling `save()` on a subdoc does **not** save the document to MongoDB, it only runs save middleware. Use `subdoc.save({ suppressWarning: true })` to hide this warning if you're sure this behavior is right for your app."),u(e,(function(t){r.$__save(t)}))},l.prototype.$__save=function(t){var e=this;return s((function(){return t(null,e)}))},l.prototype.$isValid=function(t){return this.$__parent&&this.$basePath?this.$__parent.$isValid([this.$basePath,t].join(".")):i.prototype.$isValid.call(this,t)},l.prototype.markModified=function(t){if(i.prototype.markModified.call(this,t),this.$__parent&&this.$basePath){if(this.$__parent.isDirectModified(this.$basePath))return;this.$__parent.markModified([this.$basePath,t].join("."),this)}},l.prototype.isModified=function(t,e){var r=this;return this.$__parent&&this.$basePath?Array.isArray(t)||"string"==typeof t?(t=(t=Array.isArray(t)?t:t.split(" ")).map((function(t){return[r.$basePath,t].join(".")})),this.$__parent.isModified(t,e)):this.$__parent.isModified(this.$basePath):i.prototype.isModified.call(this,t,e)},l.prototype.$markValid=function(t){i.prototype.$markValid.call(this,t),this.$__parent&&this.$basePath&&this.$__parent.$markValid([this.$basePath,t].join("."))},
/*!
 * ignore
 */
l.prototype.invalidate=function(t,e,r){if(e!==this.ownerDocument().$__.validationError&&i.prototype.invalidate.call(this,t,e,r),this.$__parent&&this.$basePath)this.$__parent.invalidate([this.$basePath,t].join("."),e,r);else if("cast"===e.kind||"CastError"===e.name)throw e;return this.ownerDocument().$__.validationError},
/*!
 * ignore
 */
l.prototype.$ignore=function(t){i.prototype.$ignore.call(this,t),this.$__parent&&this.$basePath&&this.$__parent.$ignore([this.$basePath,t].join("."))},l.prototype.ownerDocument=function(){if(this.$__.ownerDocument)return this.$__.ownerDocument;var t=this.$__parent;if(!t)return this;for(;t.$__parent||t[c];)t=t.$__parent||t[c];return this.$__.ownerDocument=t,this.$__.ownerDocument},l.prototype.parent=function(){return this.$__parent},l.prototype.$parent=l.prototype.parent,
/*!
 * no-op for hooks
 */
l.prototype.$__remove=function(t){return t(null,this)},l.prototype.remove=function(t,e){"function"==typeof t&&(e=t,t=null),
/*!
 * Registers remove event listeners for triggering
 * on subdocuments.
 *
 * @param {Subdocument} sub
 * @api private
 */
function(t){var e=t.ownerDocument();function r(){e.removeListener("save",r),e.removeListener("remove",r),t.emit("remove",t),t.constructor.emit("remove",t),e=t=null}e.on("save",r),e.on("remove",r)}(this),t&&t.noop||this.$__parent.set(this.$basePath,null),"function"==typeof e&&e(null)},
/*!
 * ignore
 */
l.prototype.populate=function(){throw new Error('Mongoose does not support calling populate() on nested docs. Instead of `doc.nested.populate("path")`, use `doc.populate("nested.path")`')}},function(t,e,r){"use strict";function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r(26),s=r(57).defineKey,a=r(3),u=r(1),c={toJSON:!0,toObject:!0,_id:!0,id:!0};
/*!
 * ignore
 */
t.exports=function(t,e,r,o,l){if(!r||!r.instanceOfSchema)throw new Error("You must pass a valid discriminator Schema");if(t.schema.discriminatorMapping&&!t.schema.discriminatorMapping.isRoot)throw new Error('Discriminator "'+e+'" can only be a discriminator of the root model');if(l){var f=a(t.base,"options.applyPluginsToDiscriminators",!1);t.base._applyPlugins(r,{skipTopLevel:!f})}var p=t.schema.options.discriminatorKey,h=t.schema.path(p);if(null!=h)u.hasUserDefinedProperty(h.options,"select")||(h.options.select=!0),h.options.$skipDiscriminatorCheck=!0;else{var y={};y[p]={default:void 0,select:!0,$skipDiscriminatorCheck:!0},y[p][t.schema.options.typeKey]=String,t.schema.add(y),s(p,null,t.prototype,null,[p],t.schema.options)}if(r.path(p)&&!0!==r.path(p).options.$skipDiscriminatorCheck)throw new Error('Discriminator "'+e+'" cannot have field with name "'+p+'"');var d=e;if(("string"==typeof o&&o.length||null!=o)&&(d=o),function(e,r){e._baseSchema=r,r.paths._id&&r.paths._id.options&&!r.paths._id.options.auto&&e.remove("_id");for(var o=[],s=0,a=Object.keys(r.paths);s<a.length;s++){var l=a[s];if(e.nested[l])o.push(l);else if(-1!==l.indexOf(".")){var f,y="",_=n(l.split(".").slice(0,-1));try{for(_.s();!(f=_.n()).done;){var v=f.value;y+=(y.length?".":"")+v,(e.paths[y]instanceof i||e.singleNestedPaths[y]instanceof i)&&o.push(l)}}catch(t){_.e(t)}finally{_.f()}}}u.merge(e,r,{isDiscriminatorSchemaMerge:!0,omit:{discriminators:!0,base:!0},omitNested:o.reduce((function(t,e){return t["tree."+e]=!0,t}),{})});for(var m=0,g=o;m<g.length;m++){var b=g[m];delete e.paths[b]}e.childSchemas.forEach((function(t){t.model.prototype.$__setSchema(t.schema)}));var w={};w[p]={default:d,select:!0,set:function(t){if(t===d||Array.isArray(d)&&u.deepEqual(t,d))return d;throw new Error("Can't set discriminator key \""+p+'"')},$skipDiscriminatorCheck:!0},w[p][e.options.typeKey]=h?h.options[e.options.typeKey]:String,e.add(w),e.discriminatorMapping={key:p,value:d,isRoot:!1},r.options.collection&&(e.options.collection=r.options.collection);var O=e.options.toJSON,S=e.options.toObject,A=e.options._id,$=e.options.id,E=Object.keys(e.options);e.options.discriminatorKey=r.options.discriminatorKey;for(var j=0,P=E;j<P.length;j++){var x=P[j];if(!c[x]){if("pluralization"===x&&1==e.options[x]&&null==r.options[x])continue;if(!u.deepEqual(e.options[x],r.options[x]))throw new Error("Can't customize discriminator option "+x+" (can only modify "+Object.keys(c).join(", ")+")")}}e.options=u.clone(r.options),O&&(e.options.toJSON=O),S&&(e.options.toObject=S),void 0!==A&&(e.options._id=A),e.options.id=$,e.s.hooks=t.schema.s.hooks.merge(e.s.hooks),e.plugins=Array.prototype.slice.call(r.plugins),e.callQueue=r.callQueue.concat(e.callQueue),delete e._requiredpaths}(r,t.schema),t.discriminators||(t.discriminators={}),t.schema.discriminatorMapping||(t.schema.discriminatorMapping={key:p,value:null,isRoot:!0}),t.schema.discriminators||(t.schema.discriminators={}),t.schema.discriminators[e]=r,t.discriminators[e])throw new Error('Discriminator with name "'+e+'" already exists');return r}},function(t,e,r){"use strict";var n=r(75);t.exports=function(t,e){return null==e||null==e._id||(t=t.clone(),e._id?t.paths._id||(n(t),t.options._id=!0):(t.remove("_id"),t.options._id=!1)),t}},function(t,e,r){"use strict";var n=r(36);
/*!
 * Find the correct constructor, taking into account discriminators
 */t.exports=function(t,e){var r=t.schema.options.discriminatorKey;if(null!=e&&t.discriminators&&null!=e[r])if(t.discriminators[e[r]])t=t.discriminators[e[r]];else{var o=n(t.discriminators,e[r]);o&&(t=o)}return t}},function(t,e,r){"use strict";t.exports=r(96)},function(t,e,r){"use strict";(function(n){function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}r(15).set(r(100));var c=r(61),l=r(67);c.setBrowser(!0),Object.defineProperty(e,"Promise",{get:function(){return l.get()},set:function(t){l.set(t)}}),e.PromiseProvider=l,e.Error=r(5),e.Schema=r(53),e.Types=r(37),e.VirtualType=r(54),e.SchemaType=r(6),e.utils=r(1),e.Document=c(),e.model=function(t,r){var n=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(n,t);var e=s(n);function n(t,o){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),e.call(this,t,r,o)}return n}(e.Document);return n.modelName=t,n},
/*!
 * Module exports.
 */
"undefined"!=typeof window&&(window.mongoose=t.exports,window.Buffer=n)}).call(this,r(2).Buffer)},function(t,e,r){"use strict";e.byteLength=function(t){var e=c(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,n=c(t),s=n[0],a=n[1],u=new i(function(t,e,r){return 3*(e+r)/4-r}(0,s,a)),l=0,f=a>0?s-4:s;for(r=0;r<f;r+=4)e=o[t.charCodeAt(r)]<<18|o[t.charCodeAt(r+1)]<<12|o[t.charCodeAt(r+2)]<<6|o[t.charCodeAt(r+3)],u[l++]=e>>16&255,u[l++]=e>>8&255,u[l++]=255&e;2===a&&(e=o[t.charCodeAt(r)]<<2|o[t.charCodeAt(r+1)]>>4,u[l++]=255&e);1===a&&(e=o[t.charCodeAt(r)]<<10|o[t.charCodeAt(r+1)]<<4|o[t.charCodeAt(r+2)]>>2,u[l++]=e>>8&255,u[l++]=255&e);return u},e.fromByteArray=function(t){for(var e,r=t.length,o=r%3,i=[],s=0,a=r-o;s<a;s+=16383)i.push(l(t,s,s+16383>a?a:s+16383));1===o?(e=t[r-1],i.push(n[e>>2]+n[e<<4&63]+"==")):2===o&&(e=(t[r-2]<<8)+t[r-1],i.push(n[e>>10]+n[e>>4&63]+n[e<<2&63]+"="));return i.join("")};for(var n=[],o=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,u=s.length;a<u;++a)n[a]=s[a],o[s.charCodeAt(a)]=a;function c(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function l(t,e,r){for(var o,i,s=[],a=e;a<r;a+=3)o=(t[a]<<16&16711680)+(t[a+1]<<8&65280)+(255&t[a+2]),s.push(n[(i=o)>>18&63]+n[i>>12&63]+n[i>>6&63]+n[63&i]);return s.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},function(t,e){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
e.read=function(t,e,r,n,o){var i,s,a=8*o-n-1,u=(1<<a)-1,c=u>>1,l=-7,f=r?o-1:0,p=r?-1:1,h=t[e+f];for(f+=p,i=h&(1<<-l)-1,h>>=-l,l+=a;l>0;i=256*i+t[e+f],f+=p,l-=8);for(s=i&(1<<-l)-1,i>>=-l,l+=n;l>0;s=256*s+t[e+f],f+=p,l-=8);if(0===i)i=1-c;else{if(i===u)return s?NaN:1/0*(h?-1:1);s+=Math.pow(2,n),i-=c}return(h?-1:1)*s*Math.pow(2,i-n)},e.write=function(t,e,r,n,o,i){var s,a,u,c=8*i-o-1,l=(1<<c)-1,f=l>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=n?0:i-1,y=n?1:-1,d=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=l):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),(e+=s+f>=1?p/u:p*Math.pow(2,1-f))*u>=2&&(s++,u/=2),s+f>=l?(a=0,s=l):s+f>=1?(a=(e*u-1)*Math.pow(2,o),s+=f):(a=e*Math.pow(2,f-1)*Math.pow(2,o),s=0));o>=8;t[r+h]=255&a,h+=y,a/=256,o-=8);for(s=s<<o|a,c+=o;c>0;t[r+h]=255&s,h+=y,s/=256,c-=8);t[r+h-y]|=128*d}},function(t,e){var r={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==r.call(t)}},function(t,e,r){"use strict";
/*!
 * Module exports.
 */e.Binary=r(101),e.Collection=function(){throw new Error("Cannot create a collection from browser library")},e.getConnection=function(){return function(){throw new Error("Cannot create a connection from browser library")}},e.Decimal128=r(108),e.ObjectId=r(109),e.ReadPreference=r(110)},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(38).Binary;
/*!
 * Module exports.
 */t.exports=n},function(t,e){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t.exports=function(t){return t&&"object"===r(t)&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}},function(module,exports,__webpack_require__){"use strict";var Long=__webpack_require__(24).Long,Double=__webpack_require__(39).Double,Timestamp=__webpack_require__(40).Timestamp,ObjectID=__webpack_require__(41).ObjectID,_Symbol=__webpack_require__(43).Symbol,Code=__webpack_require__(44).Code,MinKey=__webpack_require__(46).MinKey,MaxKey=__webpack_require__(47).MaxKey,Decimal128=__webpack_require__(45),Int32=__webpack_require__(60),DBRef=__webpack_require__(48).DBRef,BSONRegExp=__webpack_require__(42).BSONRegExp,Binary=__webpack_require__(28).Binary,utils=__webpack_require__(16),deserialize=function(t,e,r){var n=(e=null==e?{}:e)&&e.index?e.index:0,o=t[n]|t[n+1]<<8|t[n+2]<<16|t[n+3]<<24;if(o<5||t.length<o||o+n>t.length)throw new Error("corrupt bson message");if(0!==t[n+o-1])throw new Error("One object, sized correctly, with a spot for an EOO, but the EOO isn't 0x00");return deserializeObject(t,n,e,r)},deserializeObject=function t(e,r,n,o){var i=null!=n.evalFunctions&&n.evalFunctions,s=null!=n.cacheFunctions&&n.cacheFunctions,a=null!=n.cacheFunctionsCrc32&&n.cacheFunctionsCrc32;if(!a)var u=null;var c=null==n.fieldsAsRaw?null:n.fieldsAsRaw,l=null!=n.raw&&n.raw,f="boolean"==typeof n.bsonRegExp&&n.bsonRegExp,p=null!=n.promoteBuffers&&n.promoteBuffers,h=null==n.promoteLongs||n.promoteLongs,y=null==n.promoteValues||n.promoteValues,d=r;if(e.length<5)throw new Error("corrupt bson message < 5 bytes long");var _=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24;if(_<5||_>e.length)throw new Error("corrupt bson message");for(var v=o?[]:{},m=0;;){var g=e[r++];if(0===g)break;for(var b=r;0!==e[b]&&b<e.length;)b++;if(b>=e.length)throw new Error("Bad BSON Document: illegal CString");var w=o?m++:e.toString("utf8",r,b);if(r=b+1,g===BSON.BSON_DATA_STRING){var O=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24;if(O<=0||O>e.length-r||0!==e[r+O-1])throw new Error("bad string length in bson");v[w]=e.toString("utf8",r,r+O-1),r+=O}else if(g===BSON.BSON_DATA_OID){var S=utils.allocBuffer(12);e.copy(S,0,r,r+12),v[w]=new ObjectID(S),r+=12}else if(g===BSON.BSON_DATA_INT&&!1===y)v[w]=new Int32(e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24);else if(g===BSON.BSON_DATA_INT)v[w]=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24;else if(g===BSON.BSON_DATA_NUMBER&&!1===y)v[w]=new Double(e.readDoubleLE(r)),r+=8;else if(g===BSON.BSON_DATA_NUMBER)v[w]=e.readDoubleLE(r),r+=8;else if(g===BSON.BSON_DATA_DATE){var A=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24,$=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24;v[w]=new Date(new Long(A,$).toNumber())}else if(g===BSON.BSON_DATA_BOOLEAN){if(0!==e[r]&&1!==e[r])throw new Error("illegal boolean type value");v[w]=1===e[r++]}else if(g===BSON.BSON_DATA_OBJECT){var E=r,j=e[r]|e[r+1]<<8|e[r+2]<<16|e[r+3]<<24;if(j<=0||j>e.length-r)throw new Error("bad embedded document length in bson");v[w]=l?e.slice(r,r+j):t(e,E,n,!1),r+=j}else if(g===BSON.BSON_DATA_ARRAY){E=r;var P=n,x=r+(j=e[r]|e[r+1]<<8|e[r+2]<<16|e[r+3]<<24);if(c&&c[w]){for(var T in P={},n)P[T]=n[T];P.raw=!0}if(v[w]=t(e,E,P,!0),0!==e[(r+=j)-1])throw new Error("invalid array terminator byte");if(r!==x)throw new Error("corrupted array bson")}else if(g===BSON.BSON_DATA_UNDEFINED)v[w]=void 0;else if(g===BSON.BSON_DATA_NULL)v[w]=null;else if(g===BSON.BSON_DATA_LONG){A=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24,$=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24;var N=new Long(A,$);v[w]=h&&!0===y&&N.lessThanOrEqual(JS_INT_MAX_LONG)&&N.greaterThanOrEqual(JS_INT_MIN_LONG)?N.toNumber():N}else if(g===BSON.BSON_DATA_DECIMAL128){var k=utils.allocBuffer(16);e.copy(k,0,r,r+16),r+=16;var B=new Decimal128(k);v[w]=B.toObject?B.toObject():B}else if(g===BSON.BSON_DATA_BINARY){var C=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24,R=C,D=e[r++];if(C<0)throw new Error("Negative binary type element size found");if(C>e.length)throw new Error("Binary type size larger than document size");if(null!=e.slice){if(D===Binary.SUBTYPE_BYTE_ARRAY){if((C=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24)<0)throw new Error("Negative binary type element size found for subtype 0x02");if(C>R-4)throw new Error("Binary type with subtype 0x02 contains to long binary size");if(C<R-4)throw new Error("Binary type with subtype 0x02 contains to short binary size")}v[w]=p&&y?e.slice(r,r+C):new Binary(e.slice(r,r+C),D)}else{var M="undefined"!=typeof Uint8Array?new Uint8Array(new ArrayBuffer(C)):new Array(C);if(D===Binary.SUBTYPE_BYTE_ARRAY){if((C=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24)<0)throw new Error("Negative binary type element size found for subtype 0x02");if(C>R-4)throw new Error("Binary type with subtype 0x02 contains to long binary size");if(C<R-4)throw new Error("Binary type with subtype 0x02 contains to short binary size")}for(b=0;b<C;b++)M[b]=e[r+b];v[w]=p&&y?M:new Binary(M,D)}r+=C}else if(g===BSON.BSON_DATA_REGEXP&&!1===f){for(b=r;0!==e[b]&&b<e.length;)b++;if(b>=e.length)throw new Error("Bad BSON Document: illegal CString");var I=e.toString("utf8",r,b);for(b=r=b+1;0!==e[b]&&b<e.length;)b++;if(b>=e.length)throw new Error("Bad BSON Document: illegal CString");var F=e.toString("utf8",r,b);r=b+1;var L=new Array(F.length);for(b=0;b<F.length;b++)switch(F[b]){case"m":L[b]="m";break;case"s":L[b]="g";break;case"i":L[b]="i"}v[w]=new RegExp(I,L.join(""))}else if(g===BSON.BSON_DATA_REGEXP&&!0===f){for(b=r;0!==e[b]&&b<e.length;)b++;if(b>=e.length)throw new Error("Bad BSON Document: illegal CString");for(I=e.toString("utf8",r,b),b=r=b+1;0!==e[b]&&b<e.length;)b++;if(b>=e.length)throw new Error("Bad BSON Document: illegal CString");F=e.toString("utf8",r,b),r=b+1,v[w]=new BSONRegExp(I,F)}else if(g===BSON.BSON_DATA_SYMBOL){if((O=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24)<=0||O>e.length-r||0!==e[r+O-1])throw new Error("bad string length in bson");v[w]=new _Symbol(e.toString("utf8",r,r+O-1)),r+=O}else if(g===BSON.BSON_DATA_TIMESTAMP)A=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24,$=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24,v[w]=new Timestamp(A,$);else if(g===BSON.BSON_DATA_MIN_KEY)v[w]=new MinKey;else if(g===BSON.BSON_DATA_MAX_KEY)v[w]=new MaxKey;else if(g===BSON.BSON_DATA_CODE){if((O=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24)<=0||O>e.length-r||0!==e[r+O-1])throw new Error("bad string length in bson");var U=e.toString("utf8",r,r+O-1);if(i)if(s){var V=a?u(U):U;v[w]=isolateEvalWithHash(functionCache,V,U,v)}else v[w]=isolateEval(U);else v[w]=new Code(U);r+=O}else if(g===BSON.BSON_DATA_CODE_W_SCOPE){var q=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24;if(q<13)throw new Error("code_w_scope total size shorter minimum expected length");if((O=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24)<=0||O>e.length-r||0!==e[r+O-1])throw new Error("bad string length in bson");U=e.toString("utf8",r,r+O-1),E=r+=O,j=e[r]|e[r+1]<<8|e[r+2]<<16|e[r+3]<<24;var W=t(e,E,n,!1);if(r+=j,q<8+j+O)throw new Error("code_w_scope total size is to short, truncating scope");if(q>8+j+O)throw new Error("code_w_scope total size is to long, clips outer document");i?(s?(V=a?u(U):U,v[w]=isolateEvalWithHash(functionCache,V,U,v)):v[w]=isolateEval(U),v[w].scope=W):v[w]=new Code(U,W)}else{if(g!==BSON.BSON_DATA_DBPOINTER)throw new Error("Detected unknown BSON type "+g.toString(16)+' for fieldname "'+w+'", are you using the latest BSON parser');if((O=e[r++]|e[r++]<<8|e[r++]<<16|e[r++]<<24)<=0||O>e.length-r||0!==e[r+O-1])throw new Error("bad string length in bson");var H=e.toString("utf8",r,r+O-1);r+=O;var Y=utils.allocBuffer(12);e.copy(Y,0,r,r+12),S=new ObjectID(Y),r+=12;var K=H.split("."),z=K.shift(),Q=K.join(".");v[w]=new DBRef(Q,S,z)}}if(_!==r-d){if(o)throw new Error("corrupt array bson");throw new Error("corrupt object bson")}return null!=v.$id&&(v=new DBRef(v.$ref,v.$id,v.$db)),v},isolateEvalWithHash=function isolateEvalWithHash(functionCache,hash,functionString,object){var value=null;return null==functionCache[hash]&&(eval("value = "+functionString),functionCache[hash]=value),functionCache[hash].bind(object)},isolateEval=function isolateEval(functionString){var value=null;return eval("value = "+functionString),value},BSON={},functionCache=BSON.functionCache={};BSON.BSON_DATA_NUMBER=1,BSON.BSON_DATA_STRING=2,BSON.BSON_DATA_OBJECT=3,BSON.BSON_DATA_ARRAY=4,BSON.BSON_DATA_BINARY=5,BSON.BSON_DATA_UNDEFINED=6,BSON.BSON_DATA_OID=7,BSON.BSON_DATA_BOOLEAN=8,BSON.BSON_DATA_DATE=9,BSON.BSON_DATA_NULL=10,BSON.BSON_DATA_REGEXP=11,BSON.BSON_DATA_DBPOINTER=12,BSON.BSON_DATA_CODE=13,BSON.BSON_DATA_SYMBOL=14,BSON.BSON_DATA_CODE_W_SCOPE=15,BSON.BSON_DATA_INT=16,BSON.BSON_DATA_TIMESTAMP=17,BSON.BSON_DATA_LONG=18,BSON.BSON_DATA_DECIMAL128=19,BSON.BSON_DATA_MIN_KEY=255,BSON.BSON_DATA_MAX_KEY=127,BSON.BSON_BINARY_SUBTYPE_DEFAULT=0,BSON.BSON_BINARY_SUBTYPE_FUNCTION=1,BSON.BSON_BINARY_SUBTYPE_BYTE_ARRAY=2,BSON.BSON_BINARY_SUBTYPE_UUID=3,BSON.BSON_BINARY_SUBTYPE_MD5=4,BSON.BSON_BINARY_SUBTYPE_USER_DEFINED=128,BSON.BSON_INT32_MAX=2147483647,BSON.BSON_INT32_MIN=-2147483648,BSON.BSON_INT64_MAX=Math.pow(2,63)-1,BSON.BSON_INT64_MIN=-Math.pow(2,63),BSON.JS_INT_MAX=9007199254740992,BSON.JS_INT_MIN=-9007199254740992;var JS_INT_MAX_LONG=Long.fromNumber(9007199254740992),JS_INT_MIN_LONG=Long.fromNumber(-9007199254740992);module.exports=deserialize},function(t,e,r){"use strict";(function(e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(106).writeIEEE754,i=r(24).Long,s=r(59),a=r(28).Binary,u=r(16).normalizedFunctionString,c=/\x00/,l=["$db","$ref","$id","$clusterTime"],f=function(t){return"object"===n(t)&&"[object Date]"===Object.prototype.toString.call(t)},p=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},h=function(t,e,r,n,o){t[n++]=C.BSON_DATA_STRING;var i=o?t.write(e,n,"ascii"):t.write(e,n,"utf8");t[(n=n+i+1)-1]=0;var s=t.write(r,n+4,"utf8");return t[n+3]=s+1>>24&255,t[n+2]=s+1>>16&255,t[n+1]=s+1>>8&255,t[n]=s+1&255,n=n+4+s,t[n++]=0,n},y=function(t,e,r,n,s){if(Math.floor(r)===r&&r>=C.JS_INT_MIN&&r<=C.JS_INT_MAX)if(r>=C.BSON_INT32_MIN&&r<=C.BSON_INT32_MAX){t[n++]=C.BSON_DATA_INT;var a=s?t.write(e,n,"ascii"):t.write(e,n,"utf8");n+=a,t[n++]=0,t[n++]=255&r,t[n++]=r>>8&255,t[n++]=r>>16&255,t[n++]=r>>24&255}else if(r>=C.JS_INT_MIN&&r<=C.JS_INT_MAX)t[n++]=C.BSON_DATA_NUMBER,n+=a=s?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,o(t,r,n,"little",52,8),n+=8;else{t[n++]=C.BSON_DATA_LONG,n+=a=s?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var u=i.fromNumber(r),c=u.getLowBits(),l=u.getHighBits();t[n++]=255&c,t[n++]=c>>8&255,t[n++]=c>>16&255,t[n++]=c>>24&255,t[n++]=255&l,t[n++]=l>>8&255,t[n++]=l>>16&255,t[n++]=l>>24&255}else t[n++]=C.BSON_DATA_NUMBER,n+=a=s?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,o(t,r,n,"little",52,8),n+=8;return n},d=function(t,e,r,n,o){return t[n++]=C.BSON_DATA_NULL,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,n},_=function(t,e,r,n,o){return t[n++]=C.BSON_DATA_BOOLEAN,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,t[n++]=r?1:0,n},v=function(t,e,r,n,o){t[n++]=C.BSON_DATA_DATE,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var s=i.fromNumber(r.getTime()),a=s.getLowBits(),u=s.getHighBits();return t[n++]=255&a,t[n++]=a>>8&255,t[n++]=a>>16&255,t[n++]=a>>24&255,t[n++]=255&u,t[n++]=u>>8&255,t[n++]=u>>16&255,t[n++]=u>>24&255,n},m=function(t,e,r,n,o){if(t[n++]=C.BSON_DATA_REGEXP,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,r.source&&null!=r.source.match(c))throw Error("value "+r.source+" must not contain null bytes");return n+=t.write(r.source,n,"utf8"),t[n++]=0,r.global&&(t[n++]=115),r.ignoreCase&&(t[n++]=105),r.multiline&&(t[n++]=109),t[n++]=0,n},g=function(t,e,r,n,o){if(t[n++]=C.BSON_DATA_REGEXP,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,null!=r.pattern.match(c))throw Error("pattern "+r.pattern+" must not contain null bytes");return n+=t.write(r.pattern,n,"utf8"),t[n++]=0,n+=t.write(r.options.split("").sort().join(""),n,"utf8"),t[n++]=0,n},b=function(t,e,r,n,o){return null===r?t[n++]=C.BSON_DATA_NULL:"MinKey"===r._bsontype?t[n++]=C.BSON_DATA_MIN_KEY:t[n++]=C.BSON_DATA_MAX_KEY,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,n},w=function(t,e,r,n,o){if(t[n++]=C.BSON_DATA_OID,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,"string"==typeof r.id)t.write(r.id,n,"binary");else{if(!r.id||!r.id.copy)throw new Error("object ["+JSON.stringify(r)+"] is not a valid ObjectId");r.id.copy(t,n,0,12)}return n+12},O=function(t,e,r,n,o){t[n++]=C.BSON_DATA_BINARY,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var i=r.length;return t[n++]=255&i,t[n++]=i>>8&255,t[n++]=i>>16&255,t[n++]=i>>24&255,t[n++]=C.BSON_BINARY_SUBTYPE_DEFAULT,r.copy(t,n,0,i),n+=i},S=function(t,e,r,n,o,i,s,a,u,c){for(var l=0;l<c.length;l++)if(c[l]===r)throw new Error("cyclic dependency detected");c.push(r),t[n++]=Array.isArray(r)?C.BSON_DATA_ARRAY:C.BSON_DATA_OBJECT,n+=u?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var f=B(t,r,o,n,i+1,s,a,c);return c.pop(),f},A=function(t,e,r,n,o){return t[n++]=C.BSON_DATA_DECIMAL128,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,r.bytes.copy(t,n,0,16),n+16},$=function(t,e,r,n,o){t[n++]="Long"===r._bsontype?C.BSON_DATA_LONG:C.BSON_DATA_TIMESTAMP,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var i=r.getLowBits(),s=r.getHighBits();return t[n++]=255&i,t[n++]=i>>8&255,t[n++]=i>>16&255,t[n++]=i>>24&255,t[n++]=255&s,t[n++]=s>>8&255,t[n++]=s>>16&255,t[n++]=s>>24&255,n},E=function(t,e,r,n,o){return t[n++]=C.BSON_DATA_INT,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,t[n++]=255&r,t[n++]=r>>8&255,t[n++]=r>>16&255,t[n++]=r>>24&255,n},j=function(t,e,r,n,i){return t[n++]=C.BSON_DATA_NUMBER,n+=i?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0,o(t,r,n,"little",52,8),n+=8},P=function(t,e,r,n,o,i,s){t[n++]=C.BSON_DATA_CODE,n+=s?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var a=u(r),c=t.write(a,n+4,"utf8")+1;return t[n]=255&c,t[n+1]=c>>8&255,t[n+2]=c>>16&255,t[n+3]=c>>24&255,n=n+4+c-1,t[n++]=0,n},x=function(t,e,r,o,i,s,a,u,c){if(r.scope&&"object"===n(r.scope)){t[o++]=C.BSON_DATA_CODE_W_SCOPE;var l=c?t.write(e,o,"ascii"):t.write(e,o,"utf8");o+=l,t[o++]=0;var f=o,p="string"==typeof r.code?r.code:r.code.toString();o+=4;var h=t.write(p,o+4,"utf8")+1;t[o]=255&h,t[o+1]=h>>8&255,t[o+2]=h>>16&255,t[o+3]=h>>24&255,t[o+4+h-1]=0,o=o+h+4;var y=B(t,r.scope,i,o,s+1,a,u);o=y-1;var d=y-f;t[f++]=255&d,t[f++]=d>>8&255,t[f++]=d>>16&255,t[f++]=d>>24&255,t[o++]=0}else{t[o++]=C.BSON_DATA_CODE,o+=l=c?t.write(e,o,"ascii"):t.write(e,o,"utf8"),t[o++]=0,p=r.code.toString();var _=t.write(p,o+4,"utf8")+1;t[o]=255&_,t[o+1]=_>>8&255,t[o+2]=_>>16&255,t[o+3]=_>>24&255,o=o+4+_-1,t[o++]=0}return o},T=function(t,e,r,n,o){t[n++]=C.BSON_DATA_BINARY,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var i=r.value(!0),s=r.position;return r.sub_type===a.SUBTYPE_BYTE_ARRAY&&(s+=4),t[n++]=255&s,t[n++]=s>>8&255,t[n++]=s>>16&255,t[n++]=s>>24&255,t[n++]=r.sub_type,r.sub_type===a.SUBTYPE_BYTE_ARRAY&&(s-=4,t[n++]=255&s,t[n++]=s>>8&255,t[n++]=s>>16&255,t[n++]=s>>24&255),i.copy(t,n,0,r.position),n+=r.position},N=function(t,e,r,n,o){t[n++]=C.BSON_DATA_SYMBOL,n+=o?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var i=t.write(r.value,n+4,"utf8")+1;return t[n]=255&i,t[n+1]=i>>8&255,t[n+2]=i>>16&255,t[n+3]=i>>24&255,n=n+4+i-1,t[n++]=0,n},k=function(t,e,r,n,o,i,s){t[n++]=C.BSON_DATA_OBJECT,n+=s?t.write(e,n,"ascii"):t.write(e,n,"utf8"),t[n++]=0;var a,u=n,c=(a=null!=r.db?B(t,{$ref:r.namespace,$id:r.oid,$db:r.db},!1,n,o+1,i):B(t,{$ref:r.namespace,$id:r.oid},!1,n,o+1,i))-u;return t[u++]=255&c,t[u++]=c>>8&255,t[u++]=c>>16&255,t[u++]=c>>24&255,a},B=function(t,r,o,i,a,u,B,C){i=i||0,(C=C||[]).push(r);var R=i+4;if(Array.isArray(r))for(var D=0;D<r.length;D++){var M=""+D,I=r[D];if(I&&I.toBSON){if("function"!=typeof I.toBSON)throw new Error("toBSON is not a function");I=I.toBSON()}var F=n(I);if("string"===F)R=h(t,M,I,R,!0);else if("number"===F)R=y(t,M,I,R,!0);else{if("bigint"===F)throw new TypeError("Unsupported type BigInt, please use Decimal128");if("boolean"===F)R=_(t,M,I,R,!0);else if(I instanceof Date||f(I))R=v(t,M,I,R,!0);else if(void 0===I)R=d(t,M,0,R,!0);else if(null===I)R=d(t,M,0,R,!0);else if("ObjectID"===I._bsontype||"ObjectId"===I._bsontype)R=w(t,M,I,R,!0);else if(e.isBuffer(I))R=O(t,M,I,R,!0);else if(I instanceof RegExp||p(I))R=m(t,M,I,R,!0);else if("object"===F&&null==I._bsontype)R=S(t,M,I,R,o,a,u,B,!0,C);else if("object"===F&&"Decimal128"===I._bsontype)R=A(t,M,I,R,!0);else if("Long"===I._bsontype||"Timestamp"===I._bsontype)R=$(t,M,I,R,!0);else if("Double"===I._bsontype)R=j(t,M,I,R,!0);else if("function"==typeof I&&u)R=P(t,M,I,R,0,0,u);else if("Code"===I._bsontype)R=x(t,M,I,R,o,a,u,B,!0);else if("Binary"===I._bsontype)R=T(t,M,I,R,!0);else if("Symbol"===I._bsontype)R=N(t,M,I,R,!0);else if("DBRef"===I._bsontype)R=k(t,M,I,R,a,u,!0);else if("BSONRegExp"===I._bsontype)R=g(t,M,I,R,!0);else if("Int32"===I._bsontype)R=E(t,M,I,R,!0);else if("MinKey"===I._bsontype||"MaxKey"===I._bsontype)R=b(t,M,I,R,!0);else if(void 0!==I._bsontype)throw new TypeError("Unrecognized or invalid _bsontype: "+I._bsontype)}}else if(r instanceof s)for(var L=r.entries(),U=!1;!U;){var V=L.next();if(!(U=V.done)){if(M=V.value[0],F=n(I=V.value[1]),"string"==typeof M&&-1===l.indexOf(M)){if(null!=M.match(c))throw Error("key "+M+" must not contain null bytes");if(o){if("$"===M[0])throw Error("key "+M+" must not start with '$'");if(~M.indexOf("."))throw Error("key "+M+" must not contain '.'")}}if("string"===F)R=h(t,M,I,R);else if("number"===F)R=y(t,M,I,R);else{if("bigint"===F)throw new TypeError("Unsupported type BigInt, please use Decimal128");if("boolean"===F)R=_(t,M,I,R);else if(I instanceof Date||f(I))R=v(t,M,I,R);else if(null===I||void 0===I&&!1===B)R=d(t,M,0,R);else if("ObjectID"===I._bsontype||"ObjectId"===I._bsontype)R=w(t,M,I,R);else if(e.isBuffer(I))R=O(t,M,I,R);else if(I instanceof RegExp||p(I))R=m(t,M,I,R);else if("object"===F&&null==I._bsontype)R=S(t,M,I,R,o,a,u,B,!1,C);else if("object"===F&&"Decimal128"===I._bsontype)R=A(t,M,I,R);else if("Long"===I._bsontype||"Timestamp"===I._bsontype)R=$(t,M,I,R);else if("Double"===I._bsontype)R=j(t,M,I,R);else if("Code"===I._bsontype)R=x(t,M,I,R,o,a,u,B);else if("function"==typeof I&&u)R=P(t,M,I,R,0,0,u);else if("Binary"===I._bsontype)R=T(t,M,I,R);else if("Symbol"===I._bsontype)R=N(t,M,I,R);else if("DBRef"===I._bsontype)R=k(t,M,I,R,a,u);else if("BSONRegExp"===I._bsontype)R=g(t,M,I,R);else if("Int32"===I._bsontype)R=E(t,M,I,R);else if("MinKey"===I._bsontype||"MaxKey"===I._bsontype)R=b(t,M,I,R);else if(void 0!==I._bsontype)throw new TypeError("Unrecognized or invalid _bsontype: "+I._bsontype)}}}else{if(r.toBSON){if("function"!=typeof r.toBSON)throw new Error("toBSON is not a function");if(null!=(r=r.toBSON())&&"object"!==n(r))throw new Error("toBSON function did not return an object")}for(M in r){if((I=r[M])&&I.toBSON){if("function"!=typeof I.toBSON)throw new Error("toBSON is not a function");I=I.toBSON()}if(F=n(I),"string"==typeof M&&-1===l.indexOf(M)){if(null!=M.match(c))throw Error("key "+M+" must not contain null bytes");if(o){if("$"===M[0])throw Error("key "+M+" must not start with '$'");if(~M.indexOf("."))throw Error("key "+M+" must not contain '.'")}}if("string"===F)R=h(t,M,I,R);else if("number"===F)R=y(t,M,I,R);else{if("bigint"===F)throw new TypeError("Unsupported type BigInt, please use Decimal128");if("boolean"===F)R=_(t,M,I,R);else if(I instanceof Date||f(I))R=v(t,M,I,R);else if(void 0===I)!1===B&&(R=d(t,M,0,R));else if(null===I)R=d(t,M,0,R);else if("ObjectID"===I._bsontype||"ObjectId"===I._bsontype)R=w(t,M,I,R);else if(e.isBuffer(I))R=O(t,M,I,R);else if(I instanceof RegExp||p(I))R=m(t,M,I,R);else if("object"===F&&null==I._bsontype)R=S(t,M,I,R,o,a,u,B,!1,C);else if("object"===F&&"Decimal128"===I._bsontype)R=A(t,M,I,R);else if("Long"===I._bsontype||"Timestamp"===I._bsontype)R=$(t,M,I,R);else if("Double"===I._bsontype)R=j(t,M,I,R);else if("Code"===I._bsontype)R=x(t,M,I,R,o,a,u,B);else if("function"==typeof I&&u)R=P(t,M,I,R,0,0,u);else if("Binary"===I._bsontype)R=T(t,M,I,R);else if("Symbol"===I._bsontype)R=N(t,M,I,R);else if("DBRef"===I._bsontype)R=k(t,M,I,R,a,u);else if("BSONRegExp"===I._bsontype)R=g(t,M,I,R);else if("Int32"===I._bsontype)R=E(t,M,I,R);else if("MinKey"===I._bsontype||"MaxKey"===I._bsontype)R=b(t,M,I,R);else if(void 0!==I._bsontype)throw new TypeError("Unrecognized or invalid _bsontype: "+I._bsontype)}}}C.pop(),t[R++]=0;var q=R-i;return t[i++]=255&q,t[i++]=q>>8&255,t[i++]=q>>16&255,t[i++]=q>>24&255,R},C={BSON_DATA_NUMBER:1,BSON_DATA_STRING:2,BSON_DATA_OBJECT:3,BSON_DATA_ARRAY:4,BSON_DATA_BINARY:5,BSON_DATA_UNDEFINED:6,BSON_DATA_OID:7,BSON_DATA_BOOLEAN:8,BSON_DATA_DATE:9,BSON_DATA_NULL:10,BSON_DATA_REGEXP:11,BSON_DATA_CODE:13,BSON_DATA_SYMBOL:14,BSON_DATA_CODE_W_SCOPE:15,BSON_DATA_INT:16,BSON_DATA_TIMESTAMP:17,BSON_DATA_LONG:18,BSON_DATA_DECIMAL128:19,BSON_DATA_MIN_KEY:255,BSON_DATA_MAX_KEY:127,BSON_BINARY_SUBTYPE_DEFAULT:0,BSON_BINARY_SUBTYPE_FUNCTION:1,BSON_BINARY_SUBTYPE_BYTE_ARRAY:2,BSON_BINARY_SUBTYPE_UUID:3,BSON_BINARY_SUBTYPE_MD5:4,BSON_BINARY_SUBTYPE_USER_DEFINED:128,BSON_INT32_MAX:2147483647,BSON_INT32_MIN:-2147483648};C.BSON_INT64_MAX=Math.pow(2,63)-1,C.BSON_INT64_MIN=-Math.pow(2,63),C.JS_INT_MAX=9007199254740992,C.JS_INT_MIN=-9007199254740992,t.exports=B}).call(this,r(2).Buffer)},function(t,e){e.readIEEE754=function(t,e,r,n,o){var i,s,a="big"===r,u=8*o-n-1,c=(1<<u)-1,l=c>>1,f=-7,p=a?0:o-1,h=a?1:-1,y=t[e+p];for(p+=h,i=y&(1<<-f)-1,y>>=-f,f+=u;f>0;i=256*i+t[e+p],p+=h,f-=8);for(s=i&(1<<-f)-1,i>>=-f,f+=n;f>0;s=256*s+t[e+p],p+=h,f-=8);if(0===i)i=1-l;else{if(i===c)return s?NaN:1/0*(y?-1:1);s+=Math.pow(2,n),i-=l}return(y?-1:1)*s*Math.pow(2,i-n)},e.writeIEEE754=function(t,e,r,n,o,i){var s,a,u,c="big"===n,l=8*i-o-1,f=(1<<l)-1,p=f>>1,h=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,y=c?i-1:0,d=c?-1:1,_=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=f):(s=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-s))<1&&(s--,u*=2),(e+=s+p>=1?h/u:h*Math.pow(2,1-p))*u>=2&&(s++,u/=2),s+p>=f?(a=0,s=f):s+p>=1?(a=(e*u-1)*Math.pow(2,o),s+=p):(a=e*Math.pow(2,p-1)*Math.pow(2,o),s=0));o>=8;t[r+y]=255&a,y+=d,a/=256,o-=8);for(s=s<<o|a,l+=o;l>0;t[r+y]=255&s,y+=d,s/=256,l-=8);t[r+y-d]|=128*_}},function(t,e,r){"use strict";(function(e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(24).Long,i=r(39).Double,s=r(40).Timestamp,a=r(41).ObjectID,u=r(43).Symbol,c=r(42).BSONRegExp,l=r(44).Code,f=r(45),p=r(46).MinKey,h=r(47).MaxKey,y=r(48).DBRef,d=r(28).Binary,_=r(16).normalizedFunctionString,v=function(t,e,r){var n=5;if(Array.isArray(t))for(var o=0;o<t.length;o++)n+=m(o.toString(),t[o],e,!0,r);else for(var i in t.toBSON&&(t=t.toBSON()),t)n+=m(i,t[i],e,!1,r);return n};function m(t,r,m,b,w){switch(r&&r.toBSON&&(r=r.toBSON()),n(r)){case"string":return 1+e.byteLength(t,"utf8")+1+4+e.byteLength(r,"utf8")+1;case"number":return Math.floor(r)===r&&r>=g.JS_INT_MIN&&r<=g.JS_INT_MAX&&r>=g.BSON_INT32_MIN&&r<=g.BSON_INT32_MAX?(null!=t?e.byteLength(t,"utf8")+1:0)+5:(null!=t?e.byteLength(t,"utf8")+1:0)+9;case"undefined":return b||!w?(null!=t?e.byteLength(t,"utf8")+1:0)+1:0;case"boolean":return(null!=t?e.byteLength(t,"utf8")+1:0)+2;case"object":if(null==r||r instanceof p||r instanceof h||"MinKey"===r._bsontype||"MaxKey"===r._bsontype)return(null!=t?e.byteLength(t,"utf8")+1:0)+1;if(r instanceof a||"ObjectID"===r._bsontype||"ObjectId"===r._bsontype)return(null!=t?e.byteLength(t,"utf8")+1:0)+13;if(r instanceof Date||"object"===n(S=r)&&"[object Date]"===Object.prototype.toString.call(S))return(null!=t?e.byteLength(t,"utf8")+1:0)+9;if(void 0!==e&&e.isBuffer(r))return(null!=t?e.byteLength(t,"utf8")+1:0)+6+r.length;if(r instanceof o||r instanceof i||r instanceof s||"Long"===r._bsontype||"Double"===r._bsontype||"Timestamp"===r._bsontype)return(null!=t?e.byteLength(t,"utf8")+1:0)+9;if(r instanceof f||"Decimal128"===r._bsontype)return(null!=t?e.byteLength(t,"utf8")+1:0)+17;if(r instanceof l||"Code"===r._bsontype)return null!=r.scope&&Object.keys(r.scope).length>0?(null!=t?e.byteLength(t,"utf8")+1:0)+1+4+4+e.byteLength(r.code.toString(),"utf8")+1+v(r.scope,m,w):(null!=t?e.byteLength(t,"utf8")+1:0)+1+4+e.byteLength(r.code.toString(),"utf8")+1;if(r instanceof d||"Binary"===r._bsontype)return r.sub_type===d.SUBTYPE_BYTE_ARRAY?(null!=t?e.byteLength(t,"utf8")+1:0)+(r.position+1+4+1+4):(null!=t?e.byteLength(t,"utf8")+1:0)+(r.position+1+4+1);if(r instanceof u||"Symbol"===r._bsontype)return(null!=t?e.byteLength(t,"utf8")+1:0)+e.byteLength(r.value,"utf8")+4+1+1;if(r instanceof y||"DBRef"===r._bsontype){var O={$ref:r.namespace,$id:r.oid};return null!=r.db&&(O.$db=r.db),(null!=t?e.byteLength(t,"utf8")+1:0)+1+v(O,m,w)}return r instanceof RegExp||"[object RegExp]"===Object.prototype.toString.call(r)?(null!=t?e.byteLength(t,"utf8")+1:0)+1+e.byteLength(r.source,"utf8")+1+(r.global?1:0)+(r.ignoreCase?1:0)+(r.multiline?1:0)+1:r instanceof c||"BSONRegExp"===r._bsontype?(null!=t?e.byteLength(t,"utf8")+1:0)+1+e.byteLength(r.pattern,"utf8")+1+e.byteLength(r.options,"utf8")+1:(null!=t?e.byteLength(t,"utf8")+1:0)+v(r,m,w)+1;case"function":if(r instanceof RegExp||"[object RegExp]"===Object.prototype.toString.call(r)||"[object RegExp]"===String.call(r))return(null!=t?e.byteLength(t,"utf8")+1:0)+1+e.byteLength(r.source,"utf8")+1+(r.global?1:0)+(r.ignoreCase?1:0)+(r.multiline?1:0)+1;if(m&&null!=r.scope&&Object.keys(r.scope).length>0)return(null!=t?e.byteLength(t,"utf8")+1:0)+1+4+4+e.byteLength(_(r),"utf8")+1+v(r.scope,m,w);if(m)return(null!=t?e.byteLength(t,"utf8")+1:0)+1+4+e.byteLength(_(r),"utf8")+1}var S;return 0}var g={BSON_INT32_MAX:2147483647,BSON_INT32_MIN:-2147483648,JS_INT_MAX:9007199254740992,JS_INT_MIN:-9007199254740992};t.exports=v}).call(this,r(2).Buffer)},function(t,e,r){"use strict";
/*!
 * ignore
 */t.exports=r(38).Decimal128},function(t,e,r){"use strict";
/*!
 * [node-mongodb-native](https://github.com/mongodb/node-mongodb-native) ObjectId
 * @constructor NodeMongoDbObjectId
 * @see ObjectId
 */var n=r(38).ObjectID;
/*!
 * Getter for convenience with populate, see gh-6115
 */Object.defineProperty(n.prototype,"_id",{enumerable:!1,configurable:!0,get:function(){return this}}),
/*!
 * ignore
 */
t.exports=n},function(t,e,r){"use strict";
/*!
 * ignore
 */t.exports=function(){}},function(t,e,r){"use strict";
/*!
 * Dependencies
 */var n=r(112).ctor("require","modify","init","default","ignore");t.exports=function(){this.strictMode=void 0,this.selected=void 0,this.shardval=void 0,this.saveError=void 0,this.validationError=void 0,this.adhocPaths=void 0,this.removing=void 0,this.inserting=void 0,this.saving=void 0,this.version=void 0,this.getters={},this._id=void 0,this.populate=void 0,this.populated=void 0,this.wasPopulated=!1,this.scope=void 0,this.activePaths=new n,this.pathsToScopes={},this.cachedRequired={},this.session=null,this.$setCalled=new Set,this.ownerDocument=void 0,this.fullPath=void 0}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(1),o=t.exports=function(){};
/*!
 * StateMachine represents a minimal `interface` for the
 * constructors it builds via StateMachine.ctor(...).
 *
 * @api private
 */
/*!
 * StateMachine.ctor('state1', 'state2', ...)
 * A factory method for subclassing StateMachine.
 * The arguments are a list of states. For each state,
 * the constructor's prototype gets state transition
 * methods named after each state. These transition methods
 * place their path argument into the given state.
 *
 * @param {String} state
 * @param {String} [state]
 * @return {Function} subclass constructor
 * @private
 */
o.ctor=function(){var t=n.args(arguments),e=function(){o.apply(this,arguments),this.paths={},this.states={},this.stateNames=t;for(var e,r=t.length;r--;)e=t[r],this.states[e]={}};return e.prototype=new o,t.forEach((function(t){e.prototype[t]=function(e){this._changeState(e,t)}})),e},
/*!
 * This function is wrapped by the state change functions:
 *
 * - `require(path)`
 * - `modify(path)`
 * - `init(path)`
 *
 * @api private
 */
o.prototype._changeState=function(t,e){var r=this.states[this.paths[t]];r&&delete r[t],this.paths[t]=e,this.states[e][t]=!0},
/*!
 * ignore
 */
o.prototype.clear=function(t){for(var e,r=Object.keys(this.states[t]),n=r.length;n--;)e=r[n],delete this.states[t][e],delete this.paths[e]},
/*!
 * Checks to see if at least one path is in the states passed in via `arguments`
 * e.g., this.some('required', 'inited')
 *
 * @param {String} state that we want to check for.
 * @private
 */
o.prototype.some=function(){var t=this,e=arguments.length?arguments:this.stateNames;return Array.prototype.some.call(e,(function(e){return Object.keys(t.states[e]).length}))},
/*!
 * This function builds the functions that get assigned to `forEach` and `map`,
 * since both of those methods share a lot of the same logic.
 *
 * @param {String} iterMethod is either 'forEach' or 'map'
 * @return {Function}
 * @api private
 */
o.prototype._iter=function(t){return function(){var e=arguments.length,r=n.args(arguments,0,e-1),o=arguments[e-1];r.length||(r=this.stateNames);var i=this,s=r.reduce((function(t,e){return t.concat(Object.keys(i.states[e]))}),[]);return s[t]((function(t,e,r){return o(t,e,r)}))}},
/*!
 * Iterates over the paths that belong to one of the parameter states.
 *
 * The function profile can look like:
 * this.forEach(state1, fn);         // iterates over all paths in state1
 * this.forEach(state1, state2, fn); // iterates over all paths in state1 or state2
 * this.forEach(fn);                 // iterates over all paths in all states
 *
 * @param {String} [state]
 * @param {String} [state]
 * @param {Function} callback
 * @private
 */
o.prototype.forEach=function(){return this.forEach=this._iter("forEach"),this.forEach.apply(this,arguments)},
/*!
 * Maps over the paths that belong to one of the parameter states.
 *
 * The function profile can look like:
 * this.forEach(state1, fn);         // iterates over all paths in state1
 * this.forEach(state1, state2, fn); // iterates over all paths in state1 or state2
 * this.forEach(fn);                 // iterates over all paths in all states
 *
 * @param {String} [state]
 * @param {String} [state]
 * @param {Function} callback
 * @return {Array}
 * @private
 */
o.prototype.map=function(){return this.map=this._iter("map"),this.map.apply(this,arguments)}},function(t,e){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n=1e3,o=6e4,i=60*o,s=24*i;function a(t,e,r,n){var o=e>=1.5*r;return Math.round(t/r)+" "+n+(o?"s":"")}t.exports=function(t,e){e=e||{};var u=r(t);if("string"===u&&t.length>0)return function(t){if((t=String(t)).length>100)return;var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(!e)return;var r=parseFloat(e[1]);switch((e[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*r;case"weeks":case"week":case"w":return 6048e5*r;case"days":case"day":case"d":return r*s;case"hours":case"hour":case"hrs":case"hr":case"h":return r*i;case"minutes":case"minute":case"mins":case"min":case"m":return r*o;case"seconds":case"second":case"secs":case"sec":case"s":return r*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}(t);if("number"===u&&isFinite(t))return e.long?function(t){var e=Math.abs(t);if(e>=s)return a(t,e,s,"day");if(e>=i)return a(t,e,i,"hour");if(e>=o)return a(t,e,o,"minute");if(e>=n)return a(t,e,n,"second");return t+" ms"}(t):function(t){var e=Math.abs(t);if(e>=s)return Math.round(t/s)+"d";if(e>=i)return Math.round(t/i)+"h";if(e>=o)return Math.round(t/o)+"m";if(e>=n)return Math.round(t/n)+"s";return t+"ms"}(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e,r){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(115),i=["__proto__","constructor","prototype"];
/*!
 * Returns the value passed to it.
 */
function s(t){return t}e.get=function(t,r,n,i){var a;"function"==typeof n&&(n.length<2?(i=n,n=void 0):(a=n,n=void 0)),i||(i=s);var u="string"==typeof t?o(t):t;if(!Array.isArray(u))throw new TypeError("Invalid `path`. Must be either string or array");for(var c,l=r,f=0;f<u.length;++f){if(c=u[f],Array.isArray(l)&&!/^\d+$/.test(c)){var p=u.slice(f);return[].concat(l).map((function(t){return t?e.get(p,t,n||a,i):i(void 0)}))}if(a)l=a(l,c);else{var h=n&&l[n]?l[n]:l;l=h instanceof Map?h.get(c):h[c]}if(!l)return i(l)}return i(l)},e.has=function(t,e){var r="string"==typeof t?o(t):t;if(!Array.isArray(r))throw new TypeError("Invalid `path`. Must be either string or array");for(var i=r.length,s=e,a=0;a<i;++a){if(null==s||"object"!==n(s)||!(r[a]in s))return!1;s=s[r[a]]}return!0},e.unset=function(t,e){var r="string"==typeof t?o(t):t;if(!Array.isArray(r))throw new TypeError("Invalid `path`. Must be either string or array");for(var s=r.length,a=e,u=0;u<s;++u){if(null==a||"object"!==n(a)||!(r[u]in a))return!1;if(-1!==i.indexOf(r[u]))return!1;if(u===s-1)return delete a[r[u]],!0;a=a instanceof Map?a.get(r[u]):a[r[u]]}return!0},e.set=function(t,r,n,a,u,c){var l;"function"==typeof a&&(a.length<2?(u=a,a=void 0):(l=a,a=void 0)),u||(u=s);var f="string"==typeof t?o(t):t;if(!Array.isArray(f))throw new TypeError("Invalid `path`. Must be either string or array");if(null!=n){for(var p=0;p<f.length;++p)if(-1!==i.indexOf(f[p]))return;for(var h,y=c||/\$/.test(t)&&!1!==c,d=n,_=(p=0,f.length-1);p<_;++p)if("$"!=(h=f[p])){if(Array.isArray(d)&&!/^\d+$/.test(h)){var v=f.slice(p);if(!y&&Array.isArray(r))for(var m=0;m<d.length&&m<r.length;++m)e.set(v,r[m],d[m],a||l,u,y);else for(m=0;m<d.length;++m)e.set(v,r,d[m],a||l,u,y);return}if(l)d=l(d,h);else{var g=a&&d[a]?d[a]:d;d=g instanceof Map?g.get(h):g[h]}if(!d)return}else if(p==_-1)break;if(h=f[_],a&&d[a]&&(d=d[a]),Array.isArray(d)&&!/^\d+$/.test(h))if(!y&&Array.isArray(r))!
/*!
 * Recursively set nested arrays
 */
function t(e,r,n,o,i,s){for(var a,u=0;u<e.length&&u<r.length;++u)a=e[u],Array.isArray(a)&&Array.isArray(r[u])?t(a,r[u],n,o,i,s):a&&(o?o(a,n,s(r[u])):(a[i]&&(a=a[i]),a[n]=s(r[u])))}(d,r,h,l,a,u);else for(m=0;m<d.length;++m){var b=d[m];b&&(l?l(b,h,u(r)):(b[a]&&(b=b[a]),b[h]=u(r)))}else l?l(d,h,u(r)):d instanceof Map?d.set(h,u(r)):d[h]=u(r)}}},function(t,e,r){"use strict";t.exports=function(t){for(var e=[],r="",n="DEFAULT",o=0;o<t.length;++o)"IN_SQUARE_BRACKETS"!==n||/\d/.test(t[o])||"]"===t[o]||(n="DEFAULT",r=e[e.length-1]+"["+r,e.splice(e.length-1,1)),"["===t[o]?("IMMEDIATELY_AFTER_SQUARE_BRACKETS"!==n&&(e.push(r),r=""),n="IN_SQUARE_BRACKETS"):"]"===t[o]?"IN_SQUARE_BRACKETS"===n?(n="IMMEDIATELY_AFTER_SQUARE_BRACKETS",e.push(r),r=""):(n="DEFAULT",r+=t[o]):"."===t[o]?("IMMEDIATELY_AFTER_SQUARE_BRACKETS"!==n&&(e.push(r),r=""),n="DEFAULT"):r+=t[o];return"IMMEDIATELY_AFTER_SQUARE_BRACKETS"!==n&&e.push(r),e}},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(29);t.exports=function t(e){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._docs={},this._childDocs=[],null!=e&&(e=o(e),Object.assign(this,e),"object"===n(e.subPopulate)&&(this.populate=e.subPopulate),null!=e.perDocumentLimit&&null!=e.limit))throw new Error("Can not use `limit` and `perDocumentLimit` at the same time. Path: `"+e.path+"`.")}},function(t,e,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function s(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(t){n[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var r,a,u=s(t),c=1;c<arguments.length;c++){for(var l in r=Object(arguments[c]))o.call(r,l)&&(u[l]=r[l]);if(n){a=n(r);for(var f=0;f<a.length;f++)i.call(r,a[f])&&(u[a[f]]=r[a[f]])}}return u}},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(62),i=r(23),s=r(4),a=r(68),u=r(121)("mquery");function c(t,e){if(!(this instanceof c))return new c(t,e);var r=this.constructor.prototype;this.op=r.op||void 0,this.options=Object.assign({},r.options),this._conditions=r._conditions?a.clone(r._conditions):{},this._fields=r._fields?a.clone(r._fields):void 0,this._update=r._update?a.clone(r._update):void 0,this._path=r._path||void 0,this._distinct=r._distinct||void 0,this._collection=r._collection||void 0,this._traceFunction=r._traceFunction||void 0,e&&this.setOptions(e),t&&(t.find&&t.remove&&t.update?this.collection(t):this.find(t))}var l="$geoWithin";Object.defineProperty(c,"use$geoWithin",{get:function(){return"$geoWithin"==l},set:function(t){l=!0===t?"$geoWithin":"$within"}}),c.prototype.toConstructor=function(){function t(e,r){if(!(this instanceof t))return new t(e,r);c.call(this,e,r)}a.inherits(t,c);var e=t.prototype;return e.options={},e.setOptions(this.options),e.op=this.op,e._conditions=a.clone(this._conditions),e._fields=a.clone(this._fields),e._update=a.clone(this._update),e._path=this._path,e._distinct=this._distinct,e._collection=this._collection,e._traceFunction=this._traceFunction,t},c.prototype.setOptions=function(t){if(!t||!a.isObject(t))return this;for(var e,r=a.keys(t),n=0;n<r.length;++n)if("function"==typeof this[e=r[n]]){var o=a.isArray(t[e])?t[e]:[t[e]];this[e].apply(this,o)}else this.options[e]=t[e];return this},c.prototype.collection=function(t){return this._collection=new c.Collection(t),this},c.prototype.collation=function(t){return this.options.collation=t,this},c.prototype.$where=function(t){return this._conditions.$where=t,this},c.prototype.where=function(){if(!arguments.length)return this;this.op||(this.op="find");var t=n(arguments[0]);if("string"==t)return this._path=arguments[0],2===arguments.length&&(this._conditions[this._path]=arguments[1]),this;if("object"==t&&!Array.isArray(arguments[0]))return this.merge(arguments[0]);throw new TypeError("path must be a string or object")},c.prototype.equals=function(t){this._ensurePath("equals");var e=this._path;return this._conditions[e]=t,this},c.prototype.eq=function(t){this._ensurePath("eq");var e=this._path;return this._conditions[e]=t,this},c.prototype.or=function(t){var e=this._conditions.$or||(this._conditions.$or=[]);return a.isArray(t)||(t=[t]),e.push.apply(e,t),this},c.prototype.nor=function(t){var e=this._conditions.$nor||(this._conditions.$nor=[]);return a.isArray(t)||(t=[t]),e.push.apply(e,t),this},c.prototype.and=function(t){var e=this._conditions.$and||(this._conditions.$and=[]);return Array.isArray(t)||(t=[t]),e.push.apply(e,t),this},
/*!
 * gt, gte, lt, lte, ne, in, nin, all, regex, size, maxDistance
 *
 *     Thing.where('type').nin(array)
 */
"gt gte lt lte ne in nin all regex size maxDistance minDistance".split(" ").forEach((function(t){c.prototype[t]=function(){var e,r;1===arguments.length?(this._ensurePath(t),r=arguments[0],e=this._path):(r=arguments[1],e=arguments[0]);var o=null===this._conditions[e]||"object"===n(this._conditions[e])?this._conditions[e]:this._conditions[e]={};return o["$"+t]=r,this}})),c.prototype.mod=function(){var t,e;1===arguments.length?(this._ensurePath("mod"),t=arguments[0],e=this._path):2!==arguments.length||a.isArray(arguments[1])?3===arguments.length?(t=o(arguments,1),e=arguments[0]):(t=arguments[1],e=arguments[0]):(this._ensurePath("mod"),t=o(arguments),e=this._path);var r=this._conditions[e]||(this._conditions[e]={});return r.$mod=t,this},c.prototype.exists=function(){var t,e;0===arguments.length?(this._ensurePath("exists"),t=this._path,e=!0):1===arguments.length?"boolean"==typeof arguments[0]?(this._ensurePath("exists"),t=this._path,e=arguments[0]):(t=arguments[0],e=!0):2===arguments.length&&(t=arguments[0],e=arguments[1]);var r=this._conditions[t]||(this._conditions[t]={});return r.$exists=e,this},c.prototype.elemMatch=function(){if(null==arguments[0])throw new TypeError("Invalid argument");var t,e,r;if("function"==typeof arguments[0])this._ensurePath("elemMatch"),e=this._path,t=arguments[0];else if(a.isObject(arguments[0]))this._ensurePath("elemMatch"),e=this._path,r=arguments[0];else if("function"==typeof arguments[1])e=arguments[0],t=arguments[1];else{if(!arguments[1]||!a.isObject(arguments[1]))throw new TypeError("Invalid argument");e=arguments[0],r=arguments[1]}t&&(t(r=new c),r=r._conditions);var n=this._conditions[e]||(this._conditions[e]={});return n.$elemMatch=r,this},c.prototype.within=function(){if(this._ensurePath("within"),this._geoComparison=l,0===arguments.length)return this;if(2===arguments.length)return this.box.apply(this,arguments);if(2<arguments.length)return this.polygon.apply(this,arguments);var t=arguments[0];if(!t)throw new TypeError("Invalid argument");if(t.center)return this.circle(t);if(t.box)return this.box.apply(this,t.box);if(t.polygon)return this.polygon.apply(this,t.polygon);if(t.type&&t.coordinates)return this.geometry(t);throw new TypeError("Invalid argument")},c.prototype.box=function(){var t,e;if(3===arguments.length)t=arguments[0],e=[arguments[1],arguments[2]];else{if(2!==arguments.length)throw new TypeError("Invalid argument");this._ensurePath("box"),t=this._path,e=[arguments[0],arguments[1]]}var r=this._conditions[t]||(this._conditions[t]={});return r[this._geoComparison||l]={$box:e},this},c.prototype.polygon=function(){var t,e;"string"==typeof arguments[0]?(e=arguments[0],t=o(arguments,1)):(this._ensurePath("polygon"),e=this._path,t=o(arguments));var r=this._conditions[e]||(this._conditions[e]={});return r[this._geoComparison||l]={$polygon:t},this},c.prototype.circle=function(){var t,e;if(1===arguments.length)this._ensurePath("circle"),t=this._path,e=arguments[0];else{if(2!==arguments.length)throw new TypeError("Invalid argument");t=arguments[0],e=arguments[1]}if(!("radius"in e)||!e.center)throw new Error("center and radius are required");var r=this._conditions[t]||(this._conditions[t]={}),n=e.spherical?"$centerSphere":"$center",o=this._geoComparison||l;return r[o]={},r[o][n]=[e.center,e.radius],"unique"in e&&(r[o].$uniqueDocs=!!e.unique),this},c.prototype.near=function(){var t,e;if(this._geoComparison="$near",0===arguments.length)return this;if(1===arguments.length)this._ensurePath("near"),t=this._path,e=arguments[0];else{if(2!==arguments.length)throw new TypeError("Invalid argument");t=arguments[0],e=arguments[1]}if(!e.center)throw new Error("center is required");var r=this._conditions[t]||(this._conditions[t]={}),n=e.spherical?"$nearSphere":"$near";if(Array.isArray(e.center)){r[n]=e.center;var o="maxDistance"in e?e.maxDistance:null;null!=o&&(r.$maxDistance=o),null!=e.minDistance&&(r.$minDistance=e.minDistance)}else{if("Point"!=e.center.type||!Array.isArray(e.center.coordinates))throw new Error(s.format("Invalid GeoJSON specified for %s",n));r[n]={$geometry:e.center},"maxDistance"in e&&(r[n].$maxDistance=e.maxDistance),"minDistance"in e&&(r[n].$minDistance=e.minDistance)}return this},c.prototype.intersects=function(){if(this._ensurePath("intersects"),this._geoComparison="$geoIntersects",0===arguments.length)return this;var t=arguments[0];if(null!=t&&t.type&&t.coordinates)return this.geometry(t);throw new TypeError("Invalid argument")},c.prototype.geometry=function(){if("$within"!=this._geoComparison&&"$geoWithin"!=this._geoComparison&&"$near"!=this._geoComparison&&"$geoIntersects"!=this._geoComparison)throw new Error("geometry() must come after `within()`, `intersects()`, or `near()");var t,e;if(1!==arguments.length)throw new TypeError("Invalid argument");if(this._ensurePath("geometry"),e=this._path,!(t=arguments[0]).type||!Array.isArray(t.coordinates))throw new TypeError("Invalid argument");var r=this._conditions[e]||(this._conditions[e]={});return r[this._geoComparison]={$geometry:t},this},c.prototype.select=function(){var t=arguments[0];if(!t)return this;if(1!==arguments.length)throw new Error("Invalid select: select only takes 1 argument");this._validate("select");var e,r,o=this._fields||(this._fields={}),i=n(t);if(("string"==i||a.isArgumentsObject(t))&&"number"==typeof t.length||Array.isArray(t)){for("string"==i&&(t=t.split(/\s+/)),e=0,r=t.length;e<r;++e){var s=t[e];if(s){var u="-"==s[0]?0:1;0===u&&(s=s.substring(1)),o[s]=u}}return this}if(a.isObject(t)){var c=a.keys(t);for(e=0;e<c.length;++e)o[c[e]]=t[c[e]];return this}throw new TypeError("Invalid select() argument. Must be string or object.")},c.prototype.slice=function(){if(0===arguments.length)return this;var t,e;if(this._validate("slice"),1===arguments.length){var r=arguments[0];if("object"===n(r)&&!Array.isArray(r)){for(var i=Object.keys(r),s=i.length,a=0;a<s;++a)this.slice(i[a],r[i[a]]);return this}this._ensurePath("slice"),t=this._path,e=arguments[0]}else 2===arguments.length?"number"==typeof arguments[0]?(this._ensurePath("slice"),t=this._path,e=o(arguments)):(t=arguments[0],e=arguments[1]):3===arguments.length&&(t=arguments[0],e=o(arguments,1));var u=this._fields||(this._fields={});return u[t]={$slice:e},this},c.prototype.sort=function(t){if(!t)return this;var e,r,o;this._validate("sort");var i=n(t);if(Array.isArray(t)){for(r=t.length,e=0;e<t.length;++e){if(!Array.isArray(t[e]))throw new Error("Invalid sort() argument, must be array of arrays");h(this.options,t[e][0],t[e][1])}return this}if(1===arguments.length&&"string"==i){for(r=(t=t.split(/\s+/)).length,e=0;e<r;++e)if(o=t[e]){var s="-"==o[0]?-1:1;-1===s&&(o=o.substring(1)),p(this.options,o,s)}return this}if(a.isObject(t)){var u=a.keys(t);for(e=0;e<u.length;++e)o=u[e],p(this.options,o,t[o]);return this}if("undefined"!=typeof Map&&t instanceof Map)return y(this.options,t),this;throw new TypeError("Invalid sort() argument. Must be a string, object, or array.")};
/*!
 * @ignore
 */
var f={1:1,"-1":-1,asc:1,ascending:1,desc:-1,descending:-1};function p(t,e,r){if(Array.isArray(t.sort))throw new TypeError("Can't mix sort syntaxes. Use either array or object:\n- `.sort([['field', 1], ['test', -1]])`\n- `.sort({ field: 1, test: -1 })`");var n;if(r&&r.$meta)(n=t.sort||(t.sort={}))[e]={$meta:r.$meta};else{n=t.sort||(t.sort={});var o=String(r||1).toLowerCase();if(!(o=f[o]))throw new TypeError("Invalid sort value: { "+e+": "+r+" }");n[e]=o}}function h(t,e,r){if(t.sort=t.sort||[],!Array.isArray(t.sort))throw new TypeError("Can't mix sort syntaxes. Use either array or object:\n- `.sort([['field', 1], ['test', -1]])`\n- `.sort({ field: 1, test: -1 })`");var n=String(r||1).toLowerCase();if(!(n=f[n]))throw new TypeError("Invalid sort value: [ "+e+", "+r+" ]");t.sort.push([e,n])}function y(t,e){if(t.sort=t.sort||new Map,!(t.sort instanceof Map))throw new TypeError("Can't mix sort syntaxes. Use either array or object or map consistently");e.forEach((function(e,r){var n=String(e||1).toLowerCase();if(!(n=f[n]))throw new TypeError("Invalid sort value: < "+r+": "+e+" >");t.sort.set(r,n)}))}
/*!
 * limit, skip, maxScan, batchSize, comment
 *
 * Sets these associated options.
 *
 *     query.comment('feed query');
 */
/*!
 * Internal helper for update, updateMany, updateOne
 */
function d(t,e,r,n,o,i,s){return t.op=e,c.canMerge(r)&&t.merge(r),n&&t._mergeUpdate(n),a.isObject(o)&&t.setOptions(o),i||s?!t._update||!t.options.overwrite&&0===a.keys(t._update).length?(s&&a.soon(s.bind(null,null,0)),t):(o=t._optionsForExec(),s||(o.safe=!1),r=t._conditions,n=t._updateForExec(),u("update",t._collection.collectionName,r,n,o),s=t._wrapCallback(e,s,{conditions:r,doc:n,options:o}),t._collection[e](r,n,o,a.tick(s)),t):t}["limit","skip","maxScan","batchSize","comment"].forEach((function(t){c.prototype[t]=function(e){return this._validate(t),this.options[t]=e,this}})),c.prototype.maxTime=c.prototype.maxTimeMS=function(t){return this._validate("maxTime"),this.options.maxTimeMS=t,this},c.prototype.snapshot=function(){return this._validate("snapshot"),this.options.snapshot=!arguments.length||!!arguments[0],this},c.prototype.hint=function(){if(0===arguments.length)return this;this._validate("hint");var t=arguments[0];if(a.isObject(t)){var e=this.options.hint||(this.options.hint={});for(var r in t)e[r]=t[r];return this}if("string"==typeof t)return this.options.hint=t,this;throw new TypeError("Invalid hint. "+t)},c.prototype.j=function(t){return this.options.j=t,this},c.prototype.slaveOk=function(t){return this.options.slaveOk=!arguments.length||!!t,this},c.prototype.read=c.prototype.setReadPreference=function(t){return arguments.length>1&&!c.prototype.read.deprecationWarningIssued&&(console.error("Deprecation warning: 'tags' argument is not supported anymore in Query.read() method. Please use mongodb.ReadPreference object instead."),c.prototype.read.deprecationWarningIssued=!0),this.options.readPreference=a.readPref(t),this},c.prototype.readConcern=c.prototype.r=function(t){return this.options.readConcern=a.readConcern(t),this},c.prototype.tailable=function(){return this._validate("tailable"),this.options.tailable=!arguments.length||!!arguments[0],this},c.prototype.writeConcern=c.prototype.w=function(t){return"object"===n(t)?(void 0!==t.j&&(this.options.j=t.j),void 0!==t.w&&(this.options.w=t.w),void 0!==t.wtimeout&&(this.options.wtimeout=t.wtimeout)):this.options.w="m"===t?"majority":t,this},c.prototype.wtimeout=c.prototype.wTimeout=function(t){return this.options.wtimeout=t,this},c.prototype.merge=function(t){if(!t)return this;if(!c.canMerge(t))throw new TypeError("Invalid argument. Expected instanceof mquery or plain object");return t instanceof c?(t._conditions&&a.merge(this._conditions,t._conditions),t._fields&&(this._fields||(this._fields={}),a.merge(this._fields,t._fields)),t.options&&(this.options||(this.options={}),a.merge(this.options,t.options)),t._update&&(this._update||(this._update={}),a.mergeClone(this._update,t._update)),t._distinct&&(this._distinct=t._distinct),this):(a.merge(this._conditions,t),this)},c.prototype.find=function(t,e){if(this.op="find","function"==typeof t?(e=t,t=void 0):c.canMerge(t)&&this.merge(t),!e)return this;var r=this._conditions,n=this._optionsForExec();return this.$useProjection?n.projection=this._fieldsForExec():n.fields=this._fieldsForExec(),u("find",this._collection.collectionName,r,n),e=this._wrapCallback("find",e,{conditions:r,options:n}),this._collection.find(r,n,a.tick(e)),this},c.prototype.cursor=function(t){if(this.op){if("find"!==this.op)throw new TypeError(".cursor only support .find method")}else this.find(t);var e=this._conditions,r=this._optionsForExec();return this.$useProjection?r.projection=this._fieldsForExec():r.fields=this._fieldsForExec(),u("findCursor",this._collection.collectionName,e,r),this._collection.findCursor(e,r)},c.prototype.findOne=function(t,e){if(this.op="findOne","function"==typeof t?(e=t,t=void 0):c.canMerge(t)&&this.merge(t),!e)return this;var r=this._conditions,n=this._optionsForExec();return this.$useProjection?n.projection=this._fieldsForExec():n.fields=this._fieldsForExec(),u("findOne",this._collection.collectionName,r,n),e=this._wrapCallback("findOne",e,{conditions:r,options:n}),this._collection.findOne(r,n,a.tick(e)),this},c.prototype.count=function(t,e){if(this.op="count",this._validate(),"function"==typeof t?(e=t,t=void 0):c.canMerge(t)&&this.merge(t),!e)return this;var r=this._conditions,n=this._optionsForExec();return u("count",this._collection.collectionName,r,n),e=this._wrapCallback("count",e,{conditions:r,options:n}),this._collection.count(r,n,a.tick(e)),this},c.prototype.distinct=function(t,e,r){if(this.op="distinct",this._validate(),!r){switch(n(e)){case"function":r=e,"string"==typeof t&&(e=t,t=void 0);break;case"undefined":case"string":break;default:throw new TypeError("Invalid `field` argument. Must be string or function")}switch(n(t)){case"function":r=t,t=e=void 0;break;case"string":e=t,t=void 0}}if("string"==typeof e&&(this._distinct=e),c.canMerge(t)&&this.merge(t),!r)return this;if(!this._distinct)throw new Error("No value for `distinct` has been declared");var o=this._conditions,i=this._optionsForExec();return u("distinct",this._collection.collectionName,o,i),r=this._wrapCallback("distinct",r,{conditions:o,options:i}),this._collection.distinct(this._distinct,o,i,a.tick(r)),this},c.prototype.update=function(t,e,r,o){var i;switch(arguments.length){case 3:"function"==typeof r&&(o=r,r=void 0);break;case 2:"function"==typeof e&&(o=e,e=t,t=void 0);break;case 1:switch(n(t)){case"function":o=t,t=r=e=void 0;break;case"boolean":i=t,t=void 0;break;default:e=t,t=r=void 0}}return d(this,"update",t,e,r,i,o)},c.prototype.updateMany=function(t,e,r,o){var i;switch(arguments.length){case 3:"function"==typeof r&&(o=r,r=void 0);break;case 2:"function"==typeof e&&(o=e,e=t,t=void 0);break;case 1:switch(n(t)){case"function":o=t,t=r=e=void 0;break;case"boolean":i=t,t=void 0;break;default:e=t,t=r=void 0}}return d(this,"updateMany",t,e,r,i,o)},c.prototype.updateOne=function(t,e,r,o){var i;switch(arguments.length){case 3:"function"==typeof r&&(o=r,r=void 0);break;case 2:"function"==typeof e&&(o=e,e=t,t=void 0);break;case 1:switch(n(t)){case"function":o=t,t=r=e=void 0;break;case"boolean":i=t,t=void 0;break;default:e=t,t=r=void 0}}return d(this,"updateOne",t,e,r,i,o)},c.prototype.replaceOne=function(t,e,r,o){var i;switch(arguments.length){case 3:"function"==typeof r&&(o=r,r=void 0);break;case 2:"function"==typeof e&&(o=e,e=t,t=void 0);break;case 1:switch(n(t)){case"function":o=t,t=r=e=void 0;break;case"boolean":i=t,t=void 0;break;default:e=t,t=r=void 0}}return this.setOptions({overwrite:!0}),d(this,"replaceOne",t,e,r,i,o)},c.prototype.remove=function(t,e){var r;if(this.op="remove","function"==typeof t?(e=t,t=void 0):c.canMerge(t)?this.merge(t):!0===t&&(r=t,t=void 0),!r&&!e)return this;var n=this._optionsForExec();e||(n.safe=!1);var o=this._conditions;return u("remove",this._collection.collectionName,o,n),e=this._wrapCallback("remove",e,{conditions:o,options:n}),this._collection.remove(o,n,a.tick(e)),this},c.prototype.deleteOne=function(t,e){var r;if(this.op="deleteOne","function"==typeof t?(e=t,t=void 0):c.canMerge(t)?this.merge(t):!0===t&&(r=t,t=void 0),!r&&!e)return this;var n=this._optionsForExec();e||(n.safe=!1),delete n.justOne;var o=this._conditions;return u("deleteOne",this._collection.collectionName,o,n),e=this._wrapCallback("deleteOne",e,{conditions:o,options:n}),this._collection.deleteOne(o,n,a.tick(e)),this},c.prototype.deleteMany=function(t,e){var r;if(this.op="deleteMany","function"==typeof t?(e=t,t=void 0):c.canMerge(t)?this.merge(t):!0===t&&(r=t,t=void 0),!r&&!e)return this;var n=this._optionsForExec();e||(n.safe=!1),delete n.justOne;var o=this._conditions;return u("deleteOne",this._collection.collectionName,o,n),e=this._wrapCallback("deleteOne",e,{conditions:o,options:n}),this._collection.deleteMany(o,n,a.tick(e)),this},c.prototype.findOneAndUpdate=function(t,e,r,n){switch(this.op="findOneAndUpdate",this._validate(),arguments.length){case 3:"function"==typeof r&&(n=r,r={});break;case 2:"function"==typeof e&&(n=e,e=t,t=void 0),r=void 0;break;case 1:"function"==typeof t?(n=t,t=r=e=void 0):(e=t,t=r=void 0)}return c.canMerge(t)&&this.merge(t),e&&this._mergeUpdate(e),r&&this.setOptions(r),n?this._findAndModify("update",n):this},c.prototype.findOneAndRemove=c.prototype.findOneAndDelete=function(t,e,r){return this.op="findOneAndRemove",this._validate(),"function"==typeof e?(r=e,e=void 0):"function"==typeof t&&(r=t,t=void 0),c.canMerge(t)&&this.merge(t),e&&this.setOptions(e),r?this._findAndModify("remove",r):this},c.prototype._findAndModify=function(t,e){i.equal("function",n(e));var r,o=this._optionsForExec();if("remove"==t)o.remove=!0;else if("new"in o||(o.new=!0),"upsert"in o||(o.upsert=!1),!(r=this._updateForExec())){if(!o.upsert)return this.findOne(e);r={$set:{}}}null!=this._fieldsForExec()&&(this.$useProjection?o.projection=this._fieldsForExec():o.fields=this._fieldsForExec());var s=this._conditions;return u("findAndModify",this._collection.collectionName,s,r,o),e=this._wrapCallback("findAndModify",e,{conditions:s,doc:r,options:o}),this._collection.findAndModify(s,r,o,a.tick(e)),this},c.prototype._wrapCallback=function(t,e,r){var n=this._traceFunction||c.traceFunction;if(n){r.collectionName=this._collection.collectionName;var o=n&&n.call(null,t,r,this),i=(new Date).getTime();return function(t,r){if(o){var n=(new Date).getTime()-i;o.call(null,t,r,n)}e&&e.apply(null,arguments)}}return e},c.prototype.setTraceFunction=function(t){return this._traceFunction=t,this},c.prototype.exec=function(t,e){switch(n(t)){case"function":e=t,t=null;break;case"string":this.op=t}i.ok(this.op,"Missing query type: (find, update, etc)"),"update"!=this.op&&"remove"!=this.op||e||(e=!0);var r=this;if("function"!=typeof e)return new c.Promise((function(t,e){r[r.op]((function(r,n){r?e(r):t(n),t=e=null}))}));this[this.op](e)},c.prototype.thunk=function(){var t=this;return function(e){t.exec(e)}},c.prototype.then=function(t,e){var r=this;return new c.Promise((function(t,e){r.exec((function(r,n){r?e(r):t(n),t=e=null}))})).then(t,e)},c.prototype.stream=function(t){if("find"!=this.op)throw new Error("stream() is only available for find");var e=this._conditions,r=this._optionsForExec();return this.$useProjection?r.projection=this._fieldsForExec():r.fields=this._fieldsForExec(),u("stream",this._collection.collectionName,e,r,t),this._collection.findStream(e,r,t)},c.prototype.selected=function(){return!!(this._fields&&Object.keys(this._fields).length>0)},c.prototype.selectedInclusively=function(){if(!this._fields)return!1;var t=Object.keys(this._fields);if(0===t.length)return!1;for(var e=0;e<t.length;++e){var r=t[e];if(0===this._fields[r])return!1;if(this._fields[r]&&"object"===n(this._fields[r])&&this._fields[r].$meta)return!1}return!0},c.prototype.selectedExclusively=function(){if(!this._fields)return!1;var t=Object.keys(this._fields);if(0===t.length)return!1;for(var e=0;e<t.length;++e){var r=t[e];if(0===this._fields[r])return!0}return!1},c.prototype._mergeUpdate=function(t){this._update||(this._update={}),t instanceof c?t._update&&a.mergeClone(this._update,t._update):a.mergeClone(this._update,t)},c.prototype._optionsForExec=function(){return a.clone(this.options)},c.prototype._fieldsForExec=function(){return a.clone(this._fields)},c.prototype._updateForExec=function(){for(var t=a.clone(this._update),e=a.keys(t),r=e.length,n={};r--;){var o=e[r];this.options.overwrite?n[o]=t[o]:"$"!==o[0]?(n.$set||(t.$set?n.$set=t.$set:n.$set={}),n.$set[o]=t[o],e.splice(r,1),~e.indexOf("$set")||e.push("$set")):"$set"===o&&n.$set||(n[o]=t[o])}return this._compiledUpdate=n,n},c.prototype._ensurePath=function(t){if(!this._path)throw new Error(t+"() must be used after where() when called with these arguments")},
/*!
 * Permissions
 */
c.permissions=r(124),c._isPermitted=function(t,e){var r=c.permissions[e];return!r||!0!==r[t]},c.prototype._validate=function(t){var e,r;if(void 0===t){if("function"!=typeof(r=c.permissions[this.op]))return!0;e=r(this)}else c._isPermitted(t,this.op)||(e=t);if(e)throw new Error(e+" cannot be used with "+this.op)},c.canMerge=function(t){return t instanceof c||a.isObject(t)},c.setGlobalTraceFunction=function(t){c.traceFunction=t},
/*!
 * Exports.
 */
c.utils=a,c.env=r(70),c.Collection=r(126),c.BaseCollection=r(31),c.Promise=r(128),t.exports=c},function(t,e,r){(function(t,e){!function(t,r){"use strict";if(!t.setImmediate){var n,o,i,s,a,u=1,c={},l=!1,f=t.document,p=Object.getPrototypeOf&&Object.getPrototypeOf(t);p=p&&p.setTimeout?p:t,"[object process]"==={}.toString.call(t.process)?n=function(t){e.nextTick((function(){y(t)}))}:!function(){if(t.postMessage&&!t.importScripts){var e=!0,r=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=r,e}}()?t.MessageChannel?((i=new MessageChannel).port1.onmessage=function(t){y(t.data)},n=function(t){i.port2.postMessage(t)}):f&&"onreadystatechange"in f.createElement("script")?(o=f.documentElement,n=function(t){var e=f.createElement("script");e.onreadystatechange=function(){y(t),e.onreadystatechange=null,o.removeChild(e),e=null},o.appendChild(e)}):n=function(t){setTimeout(y,0,t)}:(s="setImmediate$"+Math.random()+"$",a=function(e){e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(s)&&y(+e.data.slice(s.length))},t.addEventListener?t.addEventListener("message",a,!1):t.attachEvent("onmessage",a),n=function(e){t.postMessage(s+e,"*")}),p.setImmediate=function(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),r=0;r<e.length;r++)e[r]=arguments[r+1];var o={callback:t,args:e};return c[u]=o,n(u),u++},p.clearImmediate=h}function h(t){delete c[t]}function y(t){if(l)setTimeout(y,0,t);else{var e=c[t];if(e){l=!0;try{!function(t){var e=t.callback,r=t.args;switch(r.length){case 0:e();break;case 1:e(r[0]);break;case 2:e(r[0],r[1]);break;case 3:e(r[0],r[1],r[2]);break;default:e.apply(void 0,r)}}(e)}finally{h(t),l=!1}}}}}("undefined"==typeof self?void 0===t?this:t:self)}).call(this,r(9),r(11))},function(t,e,r){var n=r(2),o=n.Buffer;function i(t,e){for(var r in t)e[r]=t[r]}function s(t,e,r){return o(t,e,r)}o.from&&o.alloc&&o.allocUnsafe&&o.allocUnsafeSlow?t.exports=n:(i(n,e),e.Buffer=s),i(o,s),s.from=function(t,e,r){if("number"==typeof t)throw new TypeError("Argument must not be a number");return o(t,e,r)},s.alloc=function(t,e,r){if("number"!=typeof t)throw new TypeError("Argument must be a number");var n=o(t);return void 0!==e?"string"==typeof r?n.fill(e,r):n.fill(e):n.fill(0),n},s.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return o(t)},s.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return n.SlowBuffer(t)}},function(t,e,r){(function(n){function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(){var t;try{t=e.storage.debug}catch(t){}return!t&&void 0!==n&&"env"in n&&(t=n.env.DEBUG),t}(e=t.exports=r(122)).log=function(){return"object"===("undefined"==typeof console?"undefined":o(console))&&console.log&&Function.prototype.apply.call(console.log,console,arguments)},e.formatArgs=function(t){var r=this.useColors;if(t[0]=(r?"%c":"")+this.namespace+(r?" %c":" ")+t[0]+(r?"%c ":" ")+"+"+e.humanize(this.diff),!r)return;var n="color: "+this.color;t.splice(1,0,n,"color: inherit");var o=0,i=0;t[0].replace(/%[a-zA-Z%]/g,(function(t){"%%"!==t&&(o++,"%c"===t&&(i=o))})),t.splice(i,0,n)},e.save=function(t){try{null==t?e.storage.removeItem("debug"):e.storage.debug=t}catch(t){}},e.load=i,e.useColors=function(){if("undefined"!=typeof window&&window.process&&"renderer"===window.process.type)return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},e.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:function(){try{return window.localStorage}catch(t){}}(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],e.formatters.j=function(t){try{return JSON.stringify(t)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},e.enable(i())}).call(this,r(11))},function(t,e,r){function n(t){var r;function n(){if(n.enabled){var t=n,o=+new Date,i=o-(r||o);t.diff=i,t.prev=r,t.curr=o,r=o;for(var s=new Array(arguments.length),a=0;a<s.length;a++)s[a]=arguments[a];s[0]=e.coerce(s[0]),"string"!=typeof s[0]&&s.unshift("%O");var u=0;s[0]=s[0].replace(/%([a-zA-Z%])/g,(function(r,n){if("%%"===r)return r;u++;var o=e.formatters[n];if("function"==typeof o){var i=s[u];r=o.call(t,i),s.splice(u,1),u--}return r})),e.formatArgs.call(t,s);var c=n.log||e.log||console.log.bind(console);c.apply(t,s)}}return n.namespace=t,n.enabled=e.enabled(t),n.useColors=e.useColors(),n.color=function(t){var r,n=0;for(r in t)n=(n<<5)-n+t.charCodeAt(r),n|=0;return e.colors[Math.abs(n)%e.colors.length]}(t),n.destroy=o,"function"==typeof e.init&&e.init(n),e.instances.push(n),n}function o(){var t=e.instances.indexOf(this);return-1!==t&&(e.instances.splice(t,1),!0)}(e=t.exports=n.debug=n.default=n).coerce=function(t){return t instanceof Error?t.stack||t.message:t},e.disable=function(){e.enable("")},e.enable=function(t){var r;e.save(t),e.names=[],e.skips=[];var n=("string"==typeof t?t:"").split(/[\s,]+/),o=n.length;for(r=0;r<o;r++)n[r]&&("-"===(t=n[r].replace(/\*/g,".*?"))[0]?e.skips.push(new RegExp("^"+t.substr(1)+"$")):e.names.push(new RegExp("^"+t+"$")));for(r=0;r<e.instances.length;r++){var i=e.instances[r];i.enabled=e.enabled(i.namespace)}},e.enabled=function(t){if("*"===t[t.length-1])return!0;var r,n;for(r=0,n=e.skips.length;r<n;r++)if(e.skips[r].test(t))return!1;for(r=0,n=e.names.length;r<n;r++)if(e.names[r].test(t))return!0;return!1},e.humanize=r(123),e.instances=[],e.names=[],e.skips=[],e.formatters={}},function(t,e){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n=1e3,o=6e4,i=60*o,s=24*i;function a(t,e,r){if(!(t<e))return t<1.5*e?Math.floor(t/e)+" "+r:Math.ceil(t/e)+" "+r+"s"}t.exports=function(t,e){e=e||{};var u,c=r(t);if("string"===c&&t.length>0)return function(t){if((t=String(t)).length>100)return;var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(!e)return;var r=parseFloat(e[1]);switch((e[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*r;case"days":case"day":case"d":return r*s;case"hours":case"hour":case"hrs":case"hr":case"h":return r*i;case"minutes":case"minute":case"mins":case"min":case"m":return r*o;case"seconds":case"second":case"secs":case"sec":case"s":return r*n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}(t);if("number"===c&&!1===isNaN(t))return e.long?a(u=t,s,"day")||a(u,i,"hour")||a(u,o,"minute")||a(u,n,"second")||u+" ms":function(t){if(t>=s)return Math.round(t/s)+"d";if(t>=i)return Math.round(t/i)+"h";if(t>=o)return Math.round(t/o)+"m";if(t>=n)return Math.round(t/n)+"s";return t+"ms"}(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))}},function(t,e,r){"use strict";var n=e;n.distinct=function(t){return t._fields&&Object.keys(t._fields).length>0?"field selection and slice":(Object.keys(n.distinct).every((function(r){return!t.options[r]||(e=r,!1)})),e);var e},n.distinct.select=n.distinct.slice=n.distinct.sort=n.distinct.limit=n.distinct.skip=n.distinct.batchSize=n.distinct.comment=n.distinct.maxScan=n.distinct.snapshot=n.distinct.hint=n.distinct.tailable=!0,n.findOneAndUpdate=n.findOneAndRemove=function(t){var e;return Object.keys(n.findOneAndUpdate).every((function(r){return!t.options[r]||(e=r,!1)})),e},n.findOneAndUpdate.limit=n.findOneAndUpdate.skip=n.findOneAndUpdate.batchSize=n.findOneAndUpdate.maxScan=n.findOneAndUpdate.snapshot=n.findOneAndUpdate.hint=n.findOneAndUpdate.tailable=n.findOneAndUpdate.comment=!0,n.count=function(t){return t._fields&&Object.keys(t._fields).length>0?"field selection and slice":(Object.keys(n.count).every((function(r){return!t.options[r]||(e=r,!1)})),e);var e},n.count.slice=n.count.batchSize=n.count.comment=n.count.maxScan=n.count.snapshot=n.count.tailable=!0},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,r){"use strict";var n=r(70);if("unknown"==n.type)throw new Error("Unknown environment");t.exports=n.isNode?r(127):(n.isMongo,r(31))},function(t,e,r){"use strict";var n=r(31);function o(t){this.collection=t,this.collectionName=t.collectionName}r(68).inherits(o,n),o.prototype.find=function(t,e,r){this.collection.find(t,e,(function(t,e){if(t)return r(t);try{e.toArray(r)}catch(t){r(t)}}))},o.prototype.findOne=function(t,e,r){this.collection.findOne(t,e,r)},o.prototype.count=function(t,e,r){this.collection.count(t,e,r)},o.prototype.distinct=function(t,e,r,n){this.collection.distinct(t,e,r,n)},o.prototype.update=function(t,e,r,n){this.collection.update(t,e,r,n)},o.prototype.updateMany=function(t,e,r,n){this.collection.updateMany(t,e,r,n)},o.prototype.updateOne=function(t,e,r,n){this.collection.updateOne(t,e,r,n)},o.prototype.replaceOne=function(t,e,r,n){this.collection.replaceOne(t,e,r,n)},o.prototype.deleteOne=function(t,e,r){this.collection.deleteOne(t,e,r)},o.prototype.deleteMany=function(t,e,r){this.collection.deleteMany(t,e,r)},o.prototype.remove=function(t,e,r){this.collection.remove(t,e,r)},o.prototype.findAndModify=function(t,e,r,n){var o=Array.isArray(r.sort)?r.sort:[];this.collection.findAndModify(t,o,e,r,n)},o.prototype.findStream=function(t,e,r){return this.collection.find(t,e).stream(r)},o.prototype.findCursor=function(t,e){return this.collection.find(t,e)},t.exports=o},function(t,e,r){(function(r,n,o){var i,s,a,u;function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}
/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */u=function(){var t,e,i;return function t(e,r,n){function o(s,a){if(!r[s]){if(!e[s]){var u="function"==typeof _dereq_&&_dereq_;if(!a&&u)return u(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var l=r[s]={exports:{}};e[s][0].call(l.exports,(function(t){var r=e[s][1][t];return o(r||t)}),l,l.exports,t,e,r,n)}return r[s].exports}for(var i="function"==typeof _dereq_&&_dereq_,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e,r){"use strict";e.exports=function(t){var e=t._SomePromiseArray;function r(t){var r=new e(t),n=r.promise();return r.setHowMany(1),r.setUnwrap(),r.init(),n}t.any=function(t){return r(t)},t.prototype.any=function(){return r(this)}}},{}],2:[function(t,e,n){"use strict";var o;try{throw new Error}catch(t){o=t}var i=t("./schedule"),s=t("./queue"),a=t("./util");function u(){this._customScheduler=!1,this._isTickUsed=!1,this._lateQueue=new s(16),this._normalQueue=new s(16),this._haveDrainedQueues=!1,this._trampolineEnabled=!0;var t=this;this.drainQueues=function(){t._drainQueues()},this._schedule=i}function c(t,e,r){this._lateQueue.push(t,e,r),this._queueTick()}function l(t,e,r){this._normalQueue.push(t,e,r),this._queueTick()}function f(t){this._normalQueue._pushOne(t),this._queueTick()}u.prototype.setScheduler=function(t){var e=this._schedule;return this._schedule=t,this._customScheduler=!0,e},u.prototype.hasCustomScheduler=function(){return this._customScheduler},u.prototype.enableTrampoline=function(){this._trampolineEnabled=!0},u.prototype.disableTrampolineIfNecessary=function(){a.hasDevTools&&(this._trampolineEnabled=!1)},u.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues},u.prototype.fatalError=function(t,e){e?(r.stderr.write("Fatal "+(t instanceof Error?t.stack:t)+"\n"),r.exit(2)):this.throwLater(t)},u.prototype.throwLater=function(t,e){if(1===arguments.length&&(e=t,t=function(){throw e}),"undefined"!=typeof setTimeout)setTimeout((function(){t(e)}),0);else try{this._schedule((function(){t(e)}))}catch(t){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")}},a.hasDevTools?(u.prototype.invokeLater=function(t,e,r){this._trampolineEnabled?c.call(this,t,e,r):this._schedule((function(){setTimeout((function(){t.call(e,r)}),100)}))},u.prototype.invoke=function(t,e,r){this._trampolineEnabled?l.call(this,t,e,r):this._schedule((function(){t.call(e,r)}))},u.prototype.settlePromises=function(t){this._trampolineEnabled?f.call(this,t):this._schedule((function(){t._settlePromises()}))}):(u.prototype.invokeLater=c,u.prototype.invoke=l,u.prototype.settlePromises=f),u.prototype._drainQueue=function(t){for(;t.length()>0;){var e=t.shift();if("function"==typeof e){var r=t.shift(),n=t.shift();e.call(r,n)}else e._settlePromises()}},u.prototype._drainQueues=function(){this._drainQueue(this._normalQueue),this._reset(),this._haveDrainedQueues=!0,this._drainQueue(this._lateQueue)},u.prototype._queueTick=function(){this._isTickUsed||(this._isTickUsed=!0,this._schedule(this.drainQueues))},u.prototype._reset=function(){this._isTickUsed=!1},e.exports=u,e.exports.firstLineError=o},{"./queue":26,"./schedule":29,"./util":36}],3:[function(t,e,r){"use strict";e.exports=function(t,e,r,n){var o=!1,i=function(t,e){this._reject(e)},s=function(t,e){e.promiseRejectionQueued=!0,e.bindingPromise._then(i,i,null,this,t)},a=function(t,e){0==(50397184&this._bitField)&&this._resolveCallback(e.target)},u=function(t,e){e.promiseRejectionQueued||this._reject(t)};t.prototype.bind=function(i){o||(o=!0,t.prototype._propagateFrom=n.propagateFromFunction(),t.prototype._boundValue=n.boundValueFunction());var c=r(i),l=new t(e);l._propagateFrom(this,1);var f=this._target();if(l._setBoundTo(c),c instanceof t){var p={promiseRejectionQueued:!1,promise:l,target:f,bindingPromise:c};f._then(e,s,void 0,l,p),c._then(a,u,void 0,l,p),l._setOnCancel(c)}else l._resolveCallback(f);return l},t.prototype._setBoundTo=function(t){void 0!==t?(this._bitField=2097152|this._bitField,this._boundTo=t):this._bitField=-2097153&this._bitField},t.prototype._isBound=function(){return 2097152==(2097152&this._bitField)},t.bind=function(e,r){return t.resolve(r).bind(e)}}},{}],4:[function(t,e,r){"use strict";var n;"undefined"!=typeof Promise&&(n=Promise);var o=t("./promise")();o.noConflict=function(){try{Promise===o&&(Promise=n)}catch(t){}return o},e.exports=o},{"./promise":22}],5:[function(t,e,r){"use strict";var n=Object.create;if(n){var o=n(null),i=n(null);o[" size"]=i[" size"]=0}e.exports=function(e){var r=t("./util"),n=r.canEvaluate;function o(t){return function(t,n){var o;if(null!=t&&(o=t[n]),"function"!=typeof o){var i="Object "+r.classString(t)+" has no method '"+r.toString(n)+"'";throw new e.TypeError(i)}return o}(t,this.pop()).apply(t,this)}function i(t){return t[this]}function s(t){var e=+this;return e<0&&(e=Math.max(0,e+t.length)),t[e]}r.isIdentifier,e.prototype.call=function(t){var e=[].slice.call(arguments,1);return e.push(t),this._then(o,void 0,void 0,e,void 0)},e.prototype.get=function(t){var e;if("number"==typeof t)e=s;else if(n){var r=(void 0)(t);e=null!==r?r:i}else e=i;return this._then(e,void 0,void 0,t,void 0)}}},{"./util":36}],6:[function(t,e,r){"use strict";e.exports=function(e,r,n,o){var i=t("./util"),s=i.tryCatch,a=i.errorObj,u=e._async;e.prototype.break=e.prototype.cancel=function(){if(!o.cancellation())return this._warn("cancellation is disabled");for(var t=this,e=t;t._isCancellable();){if(!t._cancelBy(e)){e._isFollowing()?e._followee().cancel():e._cancelBranched();break}var r=t._cancellationParent;if(null==r||!r._isCancellable()){t._isFollowing()?t._followee().cancel():t._cancelBranched();break}t._isFollowing()&&t._followee().cancel(),t._setWillBeCancelled(),e=t,t=r}},e.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--},e.prototype._enoughBranchesHaveCancelled=function(){return void 0===this._branchesRemainingToCancel||this._branchesRemainingToCancel<=0},e.prototype._cancelBy=function(t){return t===this?(this._branchesRemainingToCancel=0,this._invokeOnCancel(),!0):(this._branchHasCancelled(),!!this._enoughBranchesHaveCancelled()&&(this._invokeOnCancel(),!0))},e.prototype._cancelBranched=function(){this._enoughBranchesHaveCancelled()&&this._cancel()},e.prototype._cancel=function(){this._isCancellable()&&(this._setCancelled(),u.invoke(this._cancelPromises,this,void 0))},e.prototype._cancelPromises=function(){this._length()>0&&this._settlePromises()},e.prototype._unsetOnCancel=function(){this._onCancelField=void 0},e.prototype._isCancellable=function(){return this.isPending()&&!this._isCancelled()},e.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled()},e.prototype._doInvokeOnCancel=function(t,e){if(i.isArray(t))for(var r=0;r<t.length;++r)this._doInvokeOnCancel(t[r],e);else if(void 0!==t)if("function"==typeof t){if(!e){var n=s(t).call(this._boundValue());n===a&&(this._attachExtraTrace(n.e),u.throwLater(n.e))}}else t._resultCancelled(this)},e.prototype._invokeOnCancel=function(){var t=this._onCancel();this._unsetOnCancel(),u.invoke(this._doInvokeOnCancel,this,t)},e.prototype._invokeInternalOnCancel=function(){this._isCancellable()&&(this._doInvokeOnCancel(this._onCancel(),!0),this._unsetOnCancel())},e.prototype._resultCancelled=function(){this.cancel()}}},{"./util":36}],7:[function(t,e,r){"use strict";e.exports=function(e){var r=t("./util"),n=t("./es5").keys,o=r.tryCatch,i=r.errorObj;return function(t,s,a){return function(u){var c=a._boundValue();t:for(var l=0;l<t.length;++l){var f=t[l];if(f===Error||null!=f&&f.prototype instanceof Error){if(u instanceof f)return o(s).call(c,u)}else if("function"==typeof f){var p=o(f).call(c,u);if(p===i)return p;if(p)return o(s).call(c,u)}else if(r.isObject(u)){for(var h=n(f),y=0;y<h.length;++y){var d=h[y];if(f[d]!=u[d])continue t}return o(s).call(c,u)}}return e}}}},{"./es5":13,"./util":36}],8:[function(t,e,r){"use strict";e.exports=function(t){var e=!1,r=[];function n(){this._trace=new n.CapturedTrace(o())}function o(){var t=r.length-1;if(t>=0)return r[t]}return t.prototype._promiseCreated=function(){},t.prototype._pushContext=function(){},t.prototype._popContext=function(){return null},t._peekContext=t.prototype._peekContext=function(){},n.prototype._pushContext=function(){void 0!==this._trace&&(this._trace._promiseCreated=null,r.push(this._trace))},n.prototype._popContext=function(){if(void 0!==this._trace){var t=r.pop(),e=t._promiseCreated;return t._promiseCreated=null,e}return null},n.CapturedTrace=null,n.create=function(){if(e)return new n},n.deactivateLongStackTraces=function(){},n.activateLongStackTraces=function(){var r=t.prototype._pushContext,i=t.prototype._popContext,s=t._peekContext,a=t.prototype._peekContext,u=t.prototype._promiseCreated;n.deactivateLongStackTraces=function(){t.prototype._pushContext=r,t.prototype._popContext=i,t._peekContext=s,t.prototype._peekContext=a,t.prototype._promiseCreated=u,e=!1},e=!0,t.prototype._pushContext=n.prototype._pushContext,t.prototype._popContext=n.prototype._popContext,t._peekContext=t.prototype._peekContext=o,t.prototype._promiseCreated=function(){var t=this._peekContext();t&&null==t._promiseCreated&&(t._promiseCreated=this)}},n}},{}],9:[function(t,e,n){"use strict";e.exports=function(e,n){var o,i,s,a=e._getDomain,u=e._async,l=t("./errors").Warning,f=t("./util"),p=f.canAttachTrace,h=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,y=/\((?:timers\.js):\d+:\d+\)/,d=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,_=null,v=null,m=!1,g=!(0==f.env("BLUEBIRD_DEBUG")),b=!(0==f.env("BLUEBIRD_WARNINGS")||!g&&!f.env("BLUEBIRD_WARNINGS")),w=!(0==f.env("BLUEBIRD_LONG_STACK_TRACES")||!g&&!f.env("BLUEBIRD_LONG_STACK_TRACES")),O=0!=f.env("BLUEBIRD_W_FORGOTTEN_RETURN")&&(b||!!f.env("BLUEBIRD_W_FORGOTTEN_RETURN"));e.prototype.suppressUnhandledRejections=function(){var t=this._target();t._bitField=-1048577&t._bitField|524288},e.prototype._ensurePossibleRejectionHandled=function(){if(0==(524288&this._bitField)){this._setRejectionIsUnhandled();var t=this;setTimeout((function(){t._notifyUnhandledRejection()}),1)}},e.prototype._notifyUnhandledRejectionIsHandled=function(){W("rejectionHandled",o,void 0,this)},e.prototype._setReturnedNonUndefined=function(){this._bitField=268435456|this._bitField},e.prototype._returnedNonUndefined=function(){return 0!=(268435456&this._bitField)},e.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var t=this._settledValue();this._setUnhandledRejectionIsNotified(),W("unhandledRejection",i,t,this)}},e.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=262144|this._bitField},e.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=-262145&this._bitField},e.prototype._isUnhandledRejectionNotified=function(){return(262144&this._bitField)>0},e.prototype._setRejectionIsUnhandled=function(){this._bitField=1048576|this._bitField},e.prototype._unsetRejectionIsUnhandled=function(){this._bitField=-1048577&this._bitField,this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())},e.prototype._isRejectionUnhandled=function(){return(1048576&this._bitField)>0},e.prototype._warn=function(t,e,r){return L(t,e,r||this)},e.onPossiblyUnhandledRejection=function(t){var e=a();i="function"==typeof t?null===e?t:f.domainBind(e,t):void 0},e.onUnhandledRejectionHandled=function(t){var e=a();o="function"==typeof t?null===e?t:f.domainBind(e,t):void 0};var S=function(){};e.longStackTraces=function(){if(u.haveItemsQueued()&&!X.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if(!X.longStackTraces&&Y()){var t=e.prototype._captureStackTrace,r=e.prototype._attachExtraTrace;X.longStackTraces=!0,S=function(){if(u.haveItemsQueued()&&!X.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");e.prototype._captureStackTrace=t,e.prototype._attachExtraTrace=r,n.deactivateLongStackTraces(),u.enableTrampoline(),X.longStackTraces=!1},e.prototype._captureStackTrace=I,e.prototype._attachExtraTrace=F,n.activateLongStackTraces(),u.disableTrampolineIfNecessary()}},e.hasLongStackTraces=function(){return X.longStackTraces&&Y()};var A=function(){try{if("function"==typeof CustomEvent){var t=new CustomEvent("CustomEvent");return f.global.dispatchEvent(t),function(t,e){var r=new CustomEvent(t.toLowerCase(),{detail:e,cancelable:!0});return!f.global.dispatchEvent(r)}}return"function"==typeof Event?(t=new Event("CustomEvent"),f.global.dispatchEvent(t),function(t,e){var r=new Event(t.toLowerCase(),{cancelable:!0});return r.detail=e,!f.global.dispatchEvent(r)}):((t=document.createEvent("CustomEvent")).initCustomEvent("testingtheevent",!1,!0,{}),f.global.dispatchEvent(t),function(t,e){var r=document.createEvent("CustomEvent");return r.initCustomEvent(t.toLowerCase(),!1,!0,e),!f.global.dispatchEvent(r)})}catch(t){}return function(){return!1}}(),$=f.isNode?function(){return r.emit.apply(r,arguments)}:f.global?function(t){var e="on"+t.toLowerCase(),r=f.global[e];return!!r&&(r.apply(f.global,[].slice.call(arguments,1)),!0)}:function(){return!1};function E(t,e){return{promise:e}}var j={promiseCreated:E,promiseFulfilled:E,promiseRejected:E,promiseResolved:E,promiseCancelled:E,promiseChained:function(t,e,r){return{promise:e,child:r}},warning:function(t,e){return{warning:e}},unhandledRejection:function(t,e,r){return{reason:e,promise:r}},rejectionHandled:E},P=function(t){var e=!1;try{e=$.apply(null,arguments)}catch(t){u.throwLater(t),e=!0}var r=!1;try{r=A(t,j[t].apply(null,arguments))}catch(t){u.throwLater(t),r=!0}return r||e};function x(){return!1}function T(t,e,r){var n=this;try{t(e,r,(function(t){if("function"!=typeof t)throw new TypeError("onCancel must be a function, got: "+f.toString(t));n._attachCancellationCallback(t)}))}catch(t){return t}}function N(t){if(!this._isCancellable())return this;var e=this._onCancel();void 0!==e?f.isArray(e)?e.push(t):this._setOnCancel([e,t]):this._setOnCancel(t)}function k(){return this._onCancelField}function B(t){this._onCancelField=t}function C(){this._cancellationParent=void 0,this._onCancelField=void 0}function R(t,e){if(0!=(1&e)){this._cancellationParent=t;var r=t._branchesRemainingToCancel;void 0===r&&(r=0),t._branchesRemainingToCancel=r+1}0!=(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}e.config=function(t){if("longStackTraces"in(t=Object(t))&&(t.longStackTraces?e.longStackTraces():!t.longStackTraces&&e.hasLongStackTraces()&&S()),"warnings"in t){var r=t.warnings;X.warnings=!!r,O=X.warnings,f.isObject(r)&&"wForgottenReturn"in r&&(O=!!r.wForgottenReturn)}if("cancellation"in t&&t.cancellation&&!X.cancellation){if(u.haveItemsQueued())throw new Error("cannot enable cancellation after promises are in use");e.prototype._clearCancellationData=C,e.prototype._propagateFrom=R,e.prototype._onCancel=k,e.prototype._setOnCancel=B,e.prototype._attachCancellationCallback=N,e.prototype._execute=T,D=R,X.cancellation=!0}return"monitoring"in t&&(t.monitoring&&!X.monitoring?(X.monitoring=!0,e.prototype._fireEvent=P):!t.monitoring&&X.monitoring&&(X.monitoring=!1,e.prototype._fireEvent=x)),e},e.prototype._fireEvent=x,e.prototype._execute=function(t,e,r){try{t(e,r)}catch(t){return t}},e.prototype._onCancel=function(){},e.prototype._setOnCancel=function(t){},e.prototype._attachCancellationCallback=function(t){},e.prototype._captureStackTrace=function(){},e.prototype._attachExtraTrace=function(){},e.prototype._clearCancellationData=function(){},e.prototype._propagateFrom=function(t,e){};var D=function(t,e){0!=(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)};function M(){var t=this._boundTo;return void 0!==t&&t instanceof e?t.isFulfilled()?t.value():void 0:t}function I(){this._trace=new J(this._peekContext())}function F(t,e){if(p(t)){var r=this._trace;if(void 0!==r&&e&&(r=r._parent),void 0!==r)r.attachExtraTrace(t);else if(!t.__stackCleaned__){var n=V(t);f.notEnumerableProp(t,"stack",n.message+"\n"+n.stack.join("\n")),f.notEnumerableProp(t,"__stackCleaned__",!0)}}}function L(t,r,n){if(X.warnings){var o,i=new l(t);if(r)n._attachExtraTrace(i);else if(X.longStackTraces&&(o=e._peekContext()))o.attachExtraTrace(i);else{var s=V(i);i.stack=s.message+"\n"+s.stack.join("\n")}P("warning",i)||q(i,"",!0)}}function U(t){for(var e=[],r=0;r<t.length;++r){var n=t[r],o="    (No stack trace)"===n||_.test(n),i=o&&K(n);o&&!i&&(m&&" "!==n.charAt(0)&&(n="    "+n),e.push(n))}return e}function V(t){var e=t.stack,r=t.toString();return e="string"==typeof e&&e.length>0?function(t){for(var e=t.stack.replace(/\s+$/g,"").split("\n"),r=0;r<e.length;++r){var n=e[r];if("    (No stack trace)"===n||_.test(n))break}return r>0&&"SyntaxError"!=t.name&&(e=e.slice(r)),e}(t):["    (No stack trace)"],{message:r,stack:"SyntaxError"==t.name?e:U(e)}}function q(t,e,r){if("undefined"!=typeof console){var n;if(f.isObject(t)){var o=t.stack;n=e+v(o,t)}else n=e+String(t);"function"==typeof s?s(n,r):"function"!=typeof console.log&&"object"!==c(console.log)||console.log(n)}}function W(t,e,r,n){var o=!1;try{"function"==typeof e&&(o=!0,"rejectionHandled"===t?e(n):e(r,n))}catch(t){u.throwLater(t)}"unhandledRejection"===t?P(t,r,n)||o||q(r,"Unhandled rejection "):P(t,n)}function H(t){var e;if("function"==typeof t)e="[function "+(t.name||"anonymous")+"]";else{if(e=t&&"function"==typeof t.toString?t.toString():f.toString(t),/\[object [a-zA-Z0-9$_]+\]/.test(e))try{e=JSON.stringify(t)}catch(t){}0===e.length&&(e="(empty array)")}return"(<"+function(t){return t.length<41?t:t.substr(0,38)+"..."}(e)+">, no stack trace)"}function Y(){return"function"==typeof G}var K=function(){return!1},z=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;function Q(t){var e=t.match(z);if(e)return{fileName:e[1],line:parseInt(e[2],10)}}function J(t){this._parent=t,this._promisesCreated=0;var e=this._length=1+(void 0===t?0:t._length);G(this,J),e>32&&this.uncycle()}f.inherits(J,Error),n.CapturedTrace=J,J.prototype.uncycle=function(){var t=this._length;if(!(t<2)){for(var e=[],r={},n=0,o=this;void 0!==o;++n)e.push(o),o=o._parent;for(n=(t=this._length=n)-1;n>=0;--n){var i=e[n].stack;void 0===r[i]&&(r[i]=n)}for(n=0;n<t;++n){var s=r[e[n].stack];if(void 0!==s&&s!==n){s>0&&(e[s-1]._parent=void 0,e[s-1]._length=1),e[n]._parent=void 0,e[n]._length=1;var a=n>0?e[n-1]:this;s<t-1?(a._parent=e[s+1],a._parent.uncycle(),a._length=a._parent._length+1):(a._parent=void 0,a._length=1);for(var u=a._length+1,c=n-2;c>=0;--c)e[c]._length=u,u++;return}}}},J.prototype.attachExtraTrace=function(t){if(!t.__stackCleaned__){this.uncycle();for(var e=V(t),r=e.message,n=[e.stack],o=this;void 0!==o;)n.push(U(o.stack.split("\n"))),o=o._parent;!function(t){for(var e=t[0],r=1;r<t.length;++r){for(var n=t[r],o=e.length-1,i=e[o],s=-1,a=n.length-1;a>=0;--a)if(n[a]===i){s=a;break}for(a=s;a>=0;--a){var u=n[a];if(e[o]!==u)break;e.pop(),o--}e=n}}(n),function(t){for(var e=0;e<t.length;++e)(0===t[e].length||e+1<t.length&&t[e][0]===t[e+1][0])&&(t.splice(e,1),e--)}(n),f.notEnumerableProp(t,"stack",function(t,e){for(var r=0;r<e.length-1;++r)e[r].push("From previous event:"),e[r]=e[r].join("\n");return r<e.length&&(e[r]=e[r].join("\n")),t+"\n"+e.join("\n")}(r,n)),f.notEnumerableProp(t,"__stackCleaned__",!0)}};var G=function(){var t=/^\s*at\s*/,e=function(t,e){return"string"==typeof t?t:void 0!==e.name&&void 0!==e.message?e.toString():H(e)};if("number"==typeof Error.stackTraceLimit&&"function"==typeof Error.captureStackTrace){Error.stackTraceLimit+=6,_=t,v=e;var r=Error.captureStackTrace;return K=function(t){return h.test(t)},function(t,e){Error.stackTraceLimit+=6,r(t,e),Error.stackTraceLimit-=6}}var n,o=new Error;if("string"==typeof o.stack&&o.stack.split("\n")[0].indexOf("stackDetection@")>=0)return _=/@/,v=e,m=!0,function(t){t.stack=(new Error).stack};try{throw new Error}catch(t){n="stack"in t}return!("stack"in o)&&n&&"number"==typeof Error.stackTraceLimit?(_=t,v=e,function(t){Error.stackTraceLimit+=6;try{throw new Error}catch(e){t.stack=e.stack}Error.stackTraceLimit-=6}):(v=function(t,e){return"string"==typeof t?t:"object"!==c(e)&&"function"!=typeof e||void 0===e.name||void 0===e.message?H(e):e.toString()},null)}();"undefined"!=typeof console&&void 0!==console.warn&&(s=function(t){console.warn(t)},f.isNode&&r.stderr.isTTY?s=function(t,e){var r=e?"[33m":"[31m";console.warn(r+t+"[0m\n")}:f.isNode||"string"!=typeof(new Error).stack||(s=function(t,e){console.warn("%c"+t,e?"color: darkorange":"color: red")}));var X={warnings:b,longStackTraces:!1,cancellation:!1,monitoring:!1};return w&&e.longStackTraces(),{longStackTraces:function(){return X.longStackTraces},warnings:function(){return X.warnings},cancellation:function(){return X.cancellation},monitoring:function(){return X.monitoring},propagateFromFunction:function(){return D},boundValueFunction:function(){return M},checkForgottenReturns:function(t,e,r,n,o){if(void 0===t&&null!==e&&O){if(void 0!==o&&o._returnedNonUndefined())return;if(0==(65535&n._bitField))return;r&&(r+=" ");var i="",s="";if(e._trace){for(var a=e._trace.stack.split("\n"),u=U(a),c=u.length-1;c>=0;--c){var l=u[c];if(!y.test(l)){var f=l.match(d);f&&(i="at "+f[1]+":"+f[2]+":"+f[3]+" ");break}}if(u.length>0){var p=u[0];for(c=0;c<a.length;++c)if(a[c]===p){c>0&&(s="\n"+a[c-1]);break}}}var h="a promise was created in a "+r+"handler "+i+"but was not returned from it, see http://goo.gl/rRqMUw"+s;n._warn(h,!0,e)}},setBounds:function(t,e){if(Y()){for(var r,n,o=t.stack.split("\n"),i=e.stack.split("\n"),s=-1,a=-1,u=0;u<o.length;++u)if(c=Q(o[u])){r=c.fileName,s=c.line;break}for(u=0;u<i.length;++u){var c;if(c=Q(i[u])){n=c.fileName,a=c.line;break}}s<0||a<0||!r||!n||r!==n||s>=a||(K=function(t){if(h.test(t))return!0;var e=Q(t);return!!(e&&e.fileName===r&&s<=e.line&&e.line<=a)})}},warn:L,deprecated:function(t,e){var r=t+" is deprecated and will be removed in a future version.";return e&&(r+=" Use "+e+" instead."),L(r)},CapturedTrace:J,fireDomEvent:A,fireGlobalEvent:$}}},{"./errors":12,"./util":36}],10:[function(t,e,r){"use strict";e.exports=function(t){function e(){return this.value}function r(){throw this.reason}t.prototype.return=t.prototype.thenReturn=function(r){return r instanceof t&&r.suppressUnhandledRejections(),this._then(e,void 0,void 0,{value:r},void 0)},t.prototype.throw=t.prototype.thenThrow=function(t){return this._then(r,void 0,void 0,{reason:t},void 0)},t.prototype.catchThrow=function(t){if(arguments.length<=1)return this._then(void 0,r,void 0,{reason:t},void 0);var e=arguments[1],n=function(){throw e};return this.caught(t,n)},t.prototype.catchReturn=function(r){if(arguments.length<=1)return r instanceof t&&r.suppressUnhandledRejections(),this._then(void 0,e,void 0,{value:r},void 0);var n=arguments[1];n instanceof t&&n.suppressUnhandledRejections();var o=function(){return n};return this.caught(r,o)}}},{}],11:[function(t,e,r){"use strict";e.exports=function(t,e){var r=t.reduce,n=t.all;function o(){return n(this)}t.prototype.each=function(t){return r(this,t,e,0)._then(o,void 0,void 0,this,void 0)},t.prototype.mapSeries=function(t){return r(this,t,e,e)},t.each=function(t,n){return r(t,n,e,0)._then(o,void 0,void 0,t,void 0)},t.mapSeries=function(t,n){return r(t,n,e,e)}}},{}],12:[function(t,e,r){"use strict";var n,o,i=t("./es5"),s=i.freeze,a=t("./util"),u=a.inherits,c=a.notEnumerableProp;function l(t,e){function r(n){if(!(this instanceof r))return new r(n);c(this,"message","string"==typeof n?n:e),c(this,"name",t),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):Error.call(this)}return u(r,Error),r}var f=l("Warning","warning"),p=l("CancellationError","cancellation error"),h=l("TimeoutError","timeout error"),y=l("AggregateError","aggregate error");try{n=TypeError,o=RangeError}catch(t){n=l("TypeError","type error"),o=l("RangeError","range error")}for(var d="join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "),_=0;_<d.length;++_)"function"==typeof Array.prototype[d[_]]&&(y.prototype[d[_]]=Array.prototype[d[_]]);i.defineProperty(y.prototype,"length",{value:0,configurable:!1,writable:!0,enumerable:!0}),y.prototype.isOperational=!0;var v=0;function m(t){if(!(this instanceof m))return new m(t);c(this,"name","OperationalError"),c(this,"message",t),this.cause=t,this.isOperational=!0,t instanceof Error?(c(this,"message",t.message),c(this,"stack",t.stack)):Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}y.prototype.toString=function(){var t=Array(4*v+1).join(" "),e="\n"+t+"AggregateError of:\n";v++,t=Array(4*v+1).join(" ");for(var r=0;r<this.length;++r){for(var n=this[r]===this?"[Circular AggregateError]":this[r]+"",o=n.split("\n"),i=0;i<o.length;++i)o[i]=t+o[i];e+=(n=o.join("\n"))+"\n"}return v--,e},u(m,Error);var g=Error.__BluebirdErrorTypes__;g||(g=s({CancellationError:p,TimeoutError:h,OperationalError:m,RejectionError:m,AggregateError:y}),i.defineProperty(Error,"__BluebirdErrorTypes__",{value:g,writable:!1,enumerable:!1,configurable:!1})),e.exports={Error:Error,TypeError:n,RangeError:o,CancellationError:g.CancellationError,OperationalError:g.OperationalError,TimeoutError:g.TimeoutError,AggregateError:g.AggregateError,Warning:f}},{"./es5":13,"./util":36}],13:[function(t,e,r){var n=function(){"use strict";return void 0===this}();if(n)e.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:n,propertyIsWritable:function(t,e){var r=Object.getOwnPropertyDescriptor(t,e);return!(r&&!r.writable&&!r.set)}};else{var o={}.hasOwnProperty,i={}.toString,s={}.constructor.prototype,a=function(t){var e=[];for(var r in t)o.call(t,r)&&e.push(r);return e};e.exports={isArray:function(t){try{return"[object Array]"===i.call(t)}catch(t){return!1}},keys:a,names:a,defineProperty:function(t,e,r){return t[e]=r.value,t},getDescriptor:function(t,e){return{value:t[e]}},freeze:function(t){return t},getPrototypeOf:function(t){try{return Object(t).constructor.prototype}catch(t){return s}},isES5:n,propertyIsWritable:function(){return!0}}}},{}],14:[function(t,e,r){"use strict";e.exports=function(t,e){var r=t.map;t.prototype.filter=function(t,n){return r(this,t,n,e)},t.filter=function(t,n,o){return r(t,n,o,e)}}},{}],15:[function(t,e,r){"use strict";e.exports=function(e,r,n){var o=t("./util"),i=e.CancellationError,s=o.errorObj,a=t("./catch_filter")(n);function u(t,e,r){this.promise=t,this.type=e,this.handler=r,this.called=!1,this.cancelPromise=null}function c(t){this.finallyHandler=t}function l(t,e){return null!=t.cancelPromise&&(arguments.length>1?t.cancelPromise._reject(e):t.cancelPromise._cancel(),t.cancelPromise=null,!0)}function f(){return h.call(this,this.promise._target()._settledValue())}function p(t){if(!l(this,t))return s.e=t,s}function h(t){var o=this.promise,a=this.handler;if(!this.called){this.called=!0;var u=this.isFinallyHandler()?a.call(o._boundValue()):a.call(o._boundValue(),t);if(u===n)return u;if(void 0!==u){o._setReturnedNonUndefined();var h=r(u,o);if(h instanceof e){if(null!=this.cancelPromise){if(h._isCancelled()){var y=new i("late cancellation observer");return o._attachExtraTrace(y),s.e=y,s}h.isPending()&&h._attachCancellationCallback(new c(this))}return h._then(f,p,void 0,this,void 0)}}}return o.isRejected()?(l(this),s.e=t,s):(l(this),t)}return u.prototype.isFinallyHandler=function(){return 0===this.type},c.prototype._resultCancelled=function(){l(this.finallyHandler)},e.prototype._passThrough=function(t,e,r,n){return"function"!=typeof t?this.then():this._then(r,n,void 0,new u(this,e,t),void 0)},e.prototype.lastly=e.prototype.finally=function(t){return this._passThrough(t,0,h,h)},e.prototype.tap=function(t){return this._passThrough(t,1,h)},e.prototype.tapCatch=function(t){var r=arguments.length;if(1===r)return this._passThrough(t,1,void 0,h);var n,i=new Array(r-1),s=0;for(n=0;n<r-1;++n){var u=arguments[n];if(!o.isObject(u))return e.reject(new TypeError("tapCatch statement predicate: expecting an object but got "+o.classString(u)));i[s++]=u}i.length=s;var c=arguments[n];return this._passThrough(a(i,c,this),1,void 0,h)},u}},{"./catch_filter":7,"./util":36}],16:[function(t,e,r){"use strict";e.exports=function(e,r,n,o,i,s){var a=t("./errors").TypeError,u=t("./util"),c=u.errorObj,l=u.tryCatch,f=[];function p(t,r,o,i){if(s.cancellation()){var a=new e(n),u=this._finallyPromise=new e(n);this._promise=a.lastly((function(){return u})),a._captureStackTrace(),a._setOnCancel(this)}else(this._promise=new e(n))._captureStackTrace();this._stack=i,this._generatorFunction=t,this._receiver=r,this._generator=void 0,this._yieldHandlers="function"==typeof o?[o].concat(f):f,this._yieldedPromise=null,this._cancellationPhase=!1}u.inherits(p,i),p.prototype._isResolved=function(){return null===this._promise},p.prototype._cleanup=function(){this._promise=this._generator=null,s.cancellation()&&null!==this._finallyPromise&&(this._finallyPromise._fulfill(),this._finallyPromise=null)},p.prototype._promiseCancelled=function(){if(!this._isResolved()){var t;if(void 0!==this._generator.return)this._promise._pushContext(),t=l(this._generator.return).call(this._generator,void 0),this._promise._popContext();else{var r=new e.CancellationError("generator .return() sentinel");e.coroutine.returnSentinel=r,this._promise._attachExtraTrace(r),this._promise._pushContext(),t=l(this._generator.throw).call(this._generator,r),this._promise._popContext()}this._cancellationPhase=!0,this._yieldedPromise=null,this._continue(t)}},p.prototype._promiseFulfilled=function(t){this._yieldedPromise=null,this._promise._pushContext();var e=l(this._generator.next).call(this._generator,t);this._promise._popContext(),this._continue(e)},p.prototype._promiseRejected=function(t){this._yieldedPromise=null,this._promise._attachExtraTrace(t),this._promise._pushContext();var e=l(this._generator.throw).call(this._generator,t);this._promise._popContext(),this._continue(e)},p.prototype._resultCancelled=function(){if(this._yieldedPromise instanceof e){var t=this._yieldedPromise;this._yieldedPromise=null,t.cancel()}},p.prototype.promise=function(){return this._promise},p.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver),this._receiver=this._generatorFunction=void 0,this._promiseFulfilled(void 0)},p.prototype._continue=function(t){var r=this._promise;if(t===c)return this._cleanup(),this._cancellationPhase?r.cancel():r._rejectCallback(t.e,!1);var n=t.value;if(!0===t.done)return this._cleanup(),this._cancellationPhase?r.cancel():r._resolveCallback(n);var i=o(n,this._promise);if(i instanceof e||null!==(i=function(t,r,n){for(var i=0;i<r.length;++i){n._pushContext();var s=l(r[i])(t);if(n._popContext(),s===c){n._pushContext();var a=e.reject(c.e);return n._popContext(),a}var u=o(s,n);if(u instanceof e)return u}return null}(i,this._yieldHandlers,this._promise))){var s=(i=i._target())._bitField;0==(50397184&s)?(this._yieldedPromise=i,i._proxy(this,null)):0!=(33554432&s)?e._async.invoke(this._promiseFulfilled,this,i._value()):0!=(16777216&s)?e._async.invoke(this._promiseRejected,this,i._reason()):this._promiseCancelled()}else this._promiseRejected(new a("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s",String(n))+"From coroutine:\n"+this._stack.split("\n").slice(1,-7).join("\n")))},e.coroutine=function(t,e){if("function"!=typeof t)throw new a("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var r=Object(e).yieldHandler,n=p,o=(new Error).stack;return function(){var e=t.apply(this,arguments),i=new n(void 0,void 0,r,o),s=i.promise();return i._generator=e,i._promiseFulfilled(void 0),s}},e.coroutine.addYieldHandler=function(t){if("function"!=typeof t)throw new a("expecting a function but got "+u.classString(t));f.push(t)},e.spawn=function(t){if(s.deprecated("Promise.spawn()","Promise.coroutine()"),"function"!=typeof t)return r("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var n=new p(t,this),o=n.promise();return n._run(e.spawn),o}}},{"./errors":12,"./util":36}],17:[function(t,e,r){"use strict";e.exports=function(e,r,n,o,i,s){var a=t("./util");a.canEvaluate,a.tryCatch,a.errorObj,e.join=function(){var t,e=arguments.length-1;e>0&&"function"==typeof arguments[e]&&(t=arguments[e]);var n=[].slice.call(arguments);t&&n.pop();var o=new r(n).promise();return void 0!==t?o.spread(t):o}}},{"./util":36}],18:[function(t,e,r){"use strict";e.exports=function(e,r,n,o,i,s){var a=e._getDomain,u=t("./util"),l=u.tryCatch,f=u.errorObj,p=e._async;function h(t,e,r,n){this.constructor$(t),this._promise._captureStackTrace();var o=a();this._callback=null===o?e:u.domainBind(o,e),this._preservedValues=n===i?new Array(this.length()):null,this._limit=r,this._inFlight=0,this._queue=[],p.invoke(this._asyncInit,this,void 0)}function y(t,r,o,i){if("function"!=typeof r)return n("expecting a function but got "+u.classString(r));var s=0;if(void 0!==o){if("object"!==c(o)||null===o)return e.reject(new TypeError("options argument must be an object but it is "+u.classString(o)));if("number"!=typeof o.concurrency)return e.reject(new TypeError("'concurrency' must be a number but it is "+u.classString(o.concurrency)));s=o.concurrency}return new h(t,r,s="number"==typeof s&&isFinite(s)&&s>=1?s:0,i).promise()}u.inherits(h,r),h.prototype._asyncInit=function(){this._init$(void 0,-2)},h.prototype._init=function(){},h.prototype._promiseFulfilled=function(t,r){var n=this._values,i=this.length(),a=this._preservedValues,u=this._limit;if(r<0){if(n[r=-1*r-1]=t,u>=1&&(this._inFlight--,this._drainQueue(),this._isResolved()))return!0}else{if(u>=1&&this._inFlight>=u)return n[r]=t,this._queue.push(r),!1;null!==a&&(a[r]=t);var c=this._promise,p=this._callback,h=c._boundValue();c._pushContext();var y=l(p).call(h,t,r,i),d=c._popContext();if(s.checkForgottenReturns(y,d,null!==a?"Promise.filter":"Promise.map",c),y===f)return this._reject(y.e),!0;var _=o(y,this._promise);if(_ instanceof e){var v=(_=_._target())._bitField;if(0==(50397184&v))return u>=1&&this._inFlight++,n[r]=_,_._proxy(this,-1*(r+1)),!1;if(0==(33554432&v))return 0!=(16777216&v)?(this._reject(_._reason()),!0):(this._cancel(),!0);y=_._value()}n[r]=y}return++this._totalResolved>=i&&(null!==a?this._filter(n,a):this._resolve(n),!0)},h.prototype._drainQueue=function(){for(var t=this._queue,e=this._limit,r=this._values;t.length>0&&this._inFlight<e;){if(this._isResolved())return;var n=t.pop();this._promiseFulfilled(r[n],n)}},h.prototype._filter=function(t,e){for(var r=e.length,n=new Array(r),o=0,i=0;i<r;++i)t[i]&&(n[o++]=e[i]);n.length=o,this._resolve(n)},h.prototype.preservedValues=function(){return this._preservedValues},e.prototype.map=function(t,e){return y(this,t,e,null)},e.map=function(t,e,r,n){return y(t,e,r,n)}}},{"./util":36}],19:[function(t,e,r){"use strict";e.exports=function(e,r,n,o,i){var s=t("./util"),a=s.tryCatch;e.method=function(t){if("function"!=typeof t)throw new e.TypeError("expecting a function but got "+s.classString(t));return function(){var n=new e(r);n._captureStackTrace(),n._pushContext();var o=a(t).apply(this,arguments),s=n._popContext();return i.checkForgottenReturns(o,s,"Promise.method",n),n._resolveFromSyncValue(o),n}},e.attempt=e.try=function(t){if("function"!=typeof t)return o("expecting a function but got "+s.classString(t));var n,u=new e(r);if(u._captureStackTrace(),u._pushContext(),arguments.length>1){i.deprecated("calling Promise.try with more than 1 argument");var c=arguments[1],l=arguments[2];n=s.isArray(c)?a(t).apply(l,c):a(t).call(l,c)}else n=a(t)();var f=u._popContext();return i.checkForgottenReturns(n,f,"Promise.try",u),u._resolveFromSyncValue(n),u},e.prototype._resolveFromSyncValue=function(t){t===s.errorObj?this._rejectCallback(t.e,!1):this._resolveCallback(t,!0)}}},{"./util":36}],20:[function(t,e,r){"use strict";var n=t("./util"),o=n.maybeWrapAsError,i=t("./errors").OperationalError,s=t("./es5"),a=/^(?:name|message|stack|cause)$/;function u(t){var e;if(function(t){return t instanceof Error&&s.getPrototypeOf(t)===Error.prototype}(t)){(e=new i(t)).name=t.name,e.message=t.message,e.stack=t.stack;for(var r=s.keys(t),o=0;o<r.length;++o){var u=r[o];a.test(u)||(e[u]=t[u])}return e}return n.markAsOriginatingFromRejection(t),t}e.exports=function(t,e){return function(r,n){if(null!==t){if(r){var i=u(o(r));t._attachExtraTrace(i),t._reject(i)}else if(e){var s=[].slice.call(arguments,1);t._fulfill(s)}else t._fulfill(n);t=null}}}},{"./errors":12,"./es5":13,"./util":36}],21:[function(t,e,r){"use strict";e.exports=function(e){var r=t("./util"),n=e._async,o=r.tryCatch,i=r.errorObj;function s(t,e){if(!r.isArray(t))return a.call(this,t,e);var s=o(e).apply(this._boundValue(),[null].concat(t));s===i&&n.throwLater(s.e)}function a(t,e){var r=this._boundValue(),s=void 0===t?o(e).call(r,null):o(e).call(r,null,t);s===i&&n.throwLater(s.e)}function u(t,e){if(!t){var r=new Error(t+"");r.cause=t,t=r}var s=o(e).call(this._boundValue(),t);s===i&&n.throwLater(s.e)}e.prototype.asCallback=e.prototype.nodeify=function(t,e){if("function"==typeof t){var r=a;void 0!==e&&Object(e).spread&&(r=s),this._then(r,u,void 0,this,t)}return this}}},{"./util":36}],22:[function(t,e,n){"use strict";e.exports=function(){var n=function(){return new y("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")},o=function(){return new x.PromiseInspection(this._target())},i=function(t){return x.reject(new y(t))};function s(){}var a,u={},c=t("./util");a=c.isNode?function(){var t=r.domain;return void 0===t&&(t=null),t}:function(){return null},c.notEnumerableProp(x,"_getDomain",a);var l=t("./es5"),f=t("./async"),p=new f;l.defineProperty(x,"_async",{value:p});var h=t("./errors"),y=x.TypeError=h.TypeError;x.RangeError=h.RangeError;var d=x.CancellationError=h.CancellationError;x.TimeoutError=h.TimeoutError,x.OperationalError=h.OperationalError,x.RejectionError=h.OperationalError,x.AggregateError=h.AggregateError;var _=function(){},v={},m={},g=t("./thenables")(x,_),b=t("./promise_array")(x,_,g,i,s),w=t("./context")(x),O=w.create,S=t("./debuggability")(x,w),A=(S.CapturedTrace,t("./finally")(x,g,m)),$=t("./catch_filter")(m),E=t("./nodeback"),j=c.errorObj,P=c.tryCatch;function x(t){t!==_&&function(t,e){if(null==t||t.constructor!==x)throw new y("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");if("function"!=typeof e)throw new y("expecting a function but got "+c.classString(e))}(this,t),this._bitField=0,this._fulfillmentHandler0=void 0,this._rejectionHandler0=void 0,this._promise0=void 0,this._receiver0=void 0,this._resolveFromExecutor(t),this._promiseCreated(),this._fireEvent("promiseCreated",this)}function T(t){this.promise._resolveCallback(t)}function N(t){this.promise._rejectCallback(t,!1)}function k(t){var e=new x(_);e._fulfillmentHandler0=t,e._rejectionHandler0=t,e._promise0=t,e._receiver0=t}return x.prototype.toString=function(){return"[object Promise]"},x.prototype.caught=x.prototype.catch=function(t){var e=arguments.length;if(e>1){var r,n=new Array(e-1),o=0;for(r=0;r<e-1;++r){var s=arguments[r];if(!c.isObject(s))return i("Catch statement predicate: expecting an object but got "+c.classString(s));n[o++]=s}return n.length=o,t=arguments[r],this.then(void 0,$(n,t,this))}return this.then(void 0,t)},x.prototype.reflect=function(){return this._then(o,o,void 0,this,void 0)},x.prototype.then=function(t,e){if(S.warnings()&&arguments.length>0&&"function"!=typeof t&&"function"!=typeof e){var r=".then() only accepts functions but was passed: "+c.classString(t);arguments.length>1&&(r+=", "+c.classString(e)),this._warn(r)}return this._then(t,e,void 0,void 0,void 0)},x.prototype.done=function(t,e){this._then(t,e,void 0,void 0,void 0)._setIsFinal()},x.prototype.spread=function(t){return"function"!=typeof t?i("expecting a function but got "+c.classString(t)):this.all()._then(t,void 0,void 0,v,void 0)},x.prototype.toJSON=function(){var t={isFulfilled:!1,isRejected:!1,fulfillmentValue:void 0,rejectionReason:void 0};return this.isFulfilled()?(t.fulfillmentValue=this.value(),t.isFulfilled=!0):this.isRejected()&&(t.rejectionReason=this.reason(),t.isRejected=!0),t},x.prototype.all=function(){return arguments.length>0&&this._warn(".all() was passed arguments but it does not take any"),new b(this).promise()},x.prototype.error=function(t){return this.caught(c.originatesFromRejection,t)},x.getNewLibraryCopy=e.exports,x.is=function(t){return t instanceof x},x.fromNode=x.fromCallback=function(t){var e=new x(_);e._captureStackTrace();var r=arguments.length>1&&!!Object(arguments[1]).multiArgs,n=P(t)(E(e,r));return n===j&&e._rejectCallback(n.e,!0),e._isFateSealed()||e._setAsyncGuaranteed(),e},x.all=function(t){return new b(t).promise()},x.cast=function(t){var e=g(t);return e instanceof x||((e=new x(_))._captureStackTrace(),e._setFulfilled(),e._rejectionHandler0=t),e},x.resolve=x.fulfilled=x.cast,x.reject=x.rejected=function(t){var e=new x(_);return e._captureStackTrace(),e._rejectCallback(t,!0),e},x.setScheduler=function(t){if("function"!=typeof t)throw new y("expecting a function but got "+c.classString(t));return p.setScheduler(t)},x.prototype._then=function(t,e,r,n,o){var i=void 0!==o,s=i?o:new x(_),u=this._target(),l=u._bitField;i||(s._propagateFrom(this,3),s._captureStackTrace(),void 0===n&&0!=(2097152&this._bitField)&&(n=0!=(50397184&l)?this._boundValue():u===this?void 0:this._boundTo),this._fireEvent("promiseChained",this,s));var f=a();if(0!=(50397184&l)){var h,y,v=u._settlePromiseCtx;0!=(33554432&l)?(y=u._rejectionHandler0,h=t):0!=(16777216&l)?(y=u._fulfillmentHandler0,h=e,u._unsetRejectionIsUnhandled()):(v=u._settlePromiseLateCancellationObserver,y=new d("late cancellation observer"),u._attachExtraTrace(y),h=e),p.invoke(v,u,{handler:null===f?h:"function"==typeof h&&c.domainBind(f,h),promise:s,receiver:n,value:y})}else u._addCallbacks(t,e,s,n,f);return s},x.prototype._length=function(){return 65535&this._bitField},x.prototype._isFateSealed=function(){return 0!=(117506048&this._bitField)},x.prototype._isFollowing=function(){return 67108864==(67108864&this._bitField)},x.prototype._setLength=function(t){this._bitField=-65536&this._bitField|65535&t},x.prototype._setFulfilled=function(){this._bitField=33554432|this._bitField,this._fireEvent("promiseFulfilled",this)},x.prototype._setRejected=function(){this._bitField=16777216|this._bitField,this._fireEvent("promiseRejected",this)},x.prototype._setFollowing=function(){this._bitField=67108864|this._bitField,this._fireEvent("promiseResolved",this)},x.prototype._setIsFinal=function(){this._bitField=4194304|this._bitField},x.prototype._isFinal=function(){return(4194304&this._bitField)>0},x.prototype._unsetCancelled=function(){this._bitField=-65537&this._bitField},x.prototype._setCancelled=function(){this._bitField=65536|this._bitField,this._fireEvent("promiseCancelled",this)},x.prototype._setWillBeCancelled=function(){this._bitField=8388608|this._bitField},x.prototype._setAsyncGuaranteed=function(){p.hasCustomScheduler()||(this._bitField=134217728|this._bitField)},x.prototype._receiverAt=function(t){var e=0===t?this._receiver0:this[4*t-4+3];if(e!==u)return void 0===e&&this._isBound()?this._boundValue():e},x.prototype._promiseAt=function(t){return this[4*t-4+2]},x.prototype._fulfillmentHandlerAt=function(t){return this[4*t-4+0]},x.prototype._rejectionHandlerAt=function(t){return this[4*t-4+1]},x.prototype._boundValue=function(){},x.prototype._migrateCallback0=function(t){t._bitField;var e=t._fulfillmentHandler0,r=t._rejectionHandler0,n=t._promise0,o=t._receiverAt(0);void 0===o&&(o=u),this._addCallbacks(e,r,n,o,null)},x.prototype._migrateCallbackAt=function(t,e){var r=t._fulfillmentHandlerAt(e),n=t._rejectionHandlerAt(e),o=t._promiseAt(e),i=t._receiverAt(e);void 0===i&&(i=u),this._addCallbacks(r,n,o,i,null)},x.prototype._addCallbacks=function(t,e,r,n,o){var i=this._length();if(i>=65531&&(i=0,this._setLength(0)),0===i)this._promise0=r,this._receiver0=n,"function"==typeof t&&(this._fulfillmentHandler0=null===o?t:c.domainBind(o,t)),"function"==typeof e&&(this._rejectionHandler0=null===o?e:c.domainBind(o,e));else{var s=4*i-4;this[s+2]=r,this[s+3]=n,"function"==typeof t&&(this[s+0]=null===o?t:c.domainBind(o,t)),"function"==typeof e&&(this[s+1]=null===o?e:c.domainBind(o,e))}return this._setLength(i+1),i},x.prototype._proxy=function(t,e){this._addCallbacks(void 0,void 0,e,t,null)},x.prototype._resolveCallback=function(t,e){if(0==(117506048&this._bitField)){if(t===this)return this._rejectCallback(n(),!1);var r=g(t,this);if(!(r instanceof x))return this._fulfill(t);e&&this._propagateFrom(r,2);var o=r._target();if(o!==this){var i=o._bitField;if(0==(50397184&i)){var s=this._length();s>0&&o._migrateCallback0(this);for(var a=1;a<s;++a)o._migrateCallbackAt(this,a);this._setFollowing(),this._setLength(0),this._setFollowee(o)}else if(0!=(33554432&i))this._fulfill(o._value());else if(0!=(16777216&i))this._reject(o._reason());else{var u=new d("late cancellation observer");o._attachExtraTrace(u),this._reject(u)}}else this._reject(n())}},x.prototype._rejectCallback=function(t,e,r){var n=c.ensureErrorObject(t),o=n===t;if(!o&&!r&&S.warnings()){var i="a promise was rejected with a non-error: "+c.classString(t);this._warn(i,!0)}this._attachExtraTrace(n,!!e&&o),this._reject(t)},x.prototype._resolveFromExecutor=function(t){if(t!==_){var e=this;this._captureStackTrace(),this._pushContext();var r=!0,n=this._execute(t,(function(t){e._resolveCallback(t)}),(function(t){e._rejectCallback(t,r)}));r=!1,this._popContext(),void 0!==n&&e._rejectCallback(n,!0)}},x.prototype._settlePromiseFromHandler=function(t,e,r,n){var o=n._bitField;if(0==(65536&o)){var i;n._pushContext(),e===v?r&&"number"==typeof r.length?i=P(t).apply(this._boundValue(),r):(i=j).e=new y("cannot .spread() a non-array: "+c.classString(r)):i=P(t).call(e,r);var s=n._popContext();0==(65536&(o=n._bitField))&&(i===m?n._reject(r):i===j?n._rejectCallback(i.e,!1):(S.checkForgottenReturns(i,s,"",n,this),n._resolveCallback(i)))}},x.prototype._target=function(){for(var t=this;t._isFollowing();)t=t._followee();return t},x.prototype._followee=function(){return this._rejectionHandler0},x.prototype._setFollowee=function(t){this._rejectionHandler0=t},x.prototype._settlePromise=function(t,e,r,n){var i=t instanceof x,a=this._bitField,u=0!=(134217728&a);0!=(65536&a)?(i&&t._invokeInternalOnCancel(),r instanceof A&&r.isFinallyHandler()?(r.cancelPromise=t,P(e).call(r,n)===j&&t._reject(j.e)):e===o?t._fulfill(o.call(r)):r instanceof s?r._promiseCancelled(t):i||t instanceof b?t._cancel():r.cancel()):"function"==typeof e?i?(u&&t._setAsyncGuaranteed(),this._settlePromiseFromHandler(e,r,n,t)):e.call(r,n,t):r instanceof s?r._isResolved()||(0!=(33554432&a)?r._promiseFulfilled(n,t):r._promiseRejected(n,t)):i&&(u&&t._setAsyncGuaranteed(),0!=(33554432&a)?t._fulfill(n):t._reject(n))},x.prototype._settlePromiseLateCancellationObserver=function(t){var e=t.handler,r=t.promise,n=t.receiver,o=t.value;"function"==typeof e?r instanceof x?this._settlePromiseFromHandler(e,n,o,r):e.call(n,o,r):r instanceof x&&r._reject(o)},x.prototype._settlePromiseCtx=function(t){this._settlePromise(t.promise,t.handler,t.receiver,t.value)},x.prototype._settlePromise0=function(t,e,r){var n=this._promise0,o=this._receiverAt(0);this._promise0=void 0,this._receiver0=void 0,this._settlePromise(n,t,o,e)},x.prototype._clearCallbackDataAtIndex=function(t){var e=4*t-4;this[e+2]=this[e+3]=this[e+0]=this[e+1]=void 0},x.prototype._fulfill=function(t){var e=this._bitField;if(!((117506048&e)>>>16)){if(t===this){var r=n();return this._attachExtraTrace(r),this._reject(r)}this._setFulfilled(),this._rejectionHandler0=t,(65535&e)>0&&(0!=(134217728&e)?this._settlePromises():p.settlePromises(this))}},x.prototype._reject=function(t){var e=this._bitField;if(!((117506048&e)>>>16)){if(this._setRejected(),this._fulfillmentHandler0=t,this._isFinal())return p.fatalError(t,c.isNode);(65535&e)>0?p.settlePromises(this):this._ensurePossibleRejectionHandled()}},x.prototype._fulfillPromises=function(t,e){for(var r=1;r<t;r++){var n=this._fulfillmentHandlerAt(r),o=this._promiseAt(r),i=this._receiverAt(r);this._clearCallbackDataAtIndex(r),this._settlePromise(o,n,i,e)}},x.prototype._rejectPromises=function(t,e){for(var r=1;r<t;r++){var n=this._rejectionHandlerAt(r),o=this._promiseAt(r),i=this._receiverAt(r);this._clearCallbackDataAtIndex(r),this._settlePromise(o,n,i,e)}},x.prototype._settlePromises=function(){var t=this._bitField,e=65535&t;if(e>0){if(0!=(16842752&t)){var r=this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0,r,t),this._rejectPromises(e,r)}else{var n=this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0,n,t),this._fulfillPromises(e,n)}this._setLength(0)}this._clearCancellationData()},x.prototype._settledValue=function(){var t=this._bitField;return 0!=(33554432&t)?this._rejectionHandler0:0!=(16777216&t)?this._fulfillmentHandler0:void 0},x.defer=x.pending=function(){return S.deprecated("Promise.defer","new Promise"),{promise:new x(_),resolve:T,reject:N}},c.notEnumerableProp(x,"_makeSelfResolutionError",n),t("./method")(x,_,g,i,S),t("./bind")(x,_,g,S),t("./cancel")(x,b,i,S),t("./direct_resolve")(x),t("./synchronous_inspection")(x),t("./join")(x,b,g,_,p,a),x.Promise=x,x.version="3.5.1",t("./map.js")(x,b,i,g,_,S),t("./call_get.js")(x),t("./using.js")(x,i,g,O,_,S),t("./timers.js")(x,_,S),t("./generators.js")(x,i,_,g,s,S),t("./nodeify.js")(x),t("./promisify.js")(x,_),t("./props.js")(x,b,g,i),t("./race.js")(x,_,g,i),t("./reduce.js")(x,b,i,g,_,S),t("./settle.js")(x,b,S),t("./some.js")(x,b,i),t("./filter.js")(x,_),t("./each.js")(x,_),t("./any.js")(x),c.toFastProperties(x),c.toFastProperties(x.prototype),k({a:1}),k({b:2}),k({c:3}),k(1),k((function(){})),k(void 0),k(!1),k(new x(_)),S.setBounds(f.firstLineError,c.lastLineError),x}},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(t,e,r){"use strict";e.exports=function(e,r,n,o,i){var s=t("./util");function a(t){var n=this._promise=new e(r);t instanceof e&&n._propagateFrom(t,3),n._setOnCancel(this),this._values=t,this._length=0,this._totalResolved=0,this._init(void 0,-2)}return s.isArray,s.inherits(a,i),a.prototype.length=function(){return this._length},a.prototype.promise=function(){return this._promise},a.prototype._init=function t(r,i){var a=n(this._values,this._promise);if(a instanceof e){var u=(a=a._target())._bitField;if(this._values=a,0==(50397184&u))return this._promise._setAsyncGuaranteed(),a._then(t,this._reject,void 0,this,i);if(0==(33554432&u))return 0!=(16777216&u)?this._reject(a._reason()):this._cancel();a=a._value()}if(null!==(a=s.asArray(a)))0!==a.length?this._iterate(a):-5===i?this._resolveEmptyArray():this._resolve(function(t){switch(t){case-2:return[];case-3:return{};case-6:return new Map}}(i));else{var c=o("expecting an array or an iterable object but got "+s.classString(a)).reason();this._promise._rejectCallback(c,!1)}},a.prototype._iterate=function(t){var r=this.getActualLength(t.length);this._length=r,this._values=this.shouldCopyValues()?new Array(r):this._values;for(var o=this._promise,i=!1,s=null,a=0;a<r;++a){var u=n(t[a],o);s=u instanceof e?(u=u._target())._bitField:null,i?null!==s&&u.suppressUnhandledRejections():null!==s?0==(50397184&s)?(u._proxy(this,a),this._values[a]=u):i=0!=(33554432&s)?this._promiseFulfilled(u._value(),a):0!=(16777216&s)?this._promiseRejected(u._reason(),a):this._promiseCancelled(a):i=this._promiseFulfilled(u,a)}i||o._setAsyncGuaranteed()},a.prototype._isResolved=function(){return null===this._values},a.prototype._resolve=function(t){this._values=null,this._promise._fulfill(t)},a.prototype._cancel=function(){!this._isResolved()&&this._promise._isCancellable()&&(this._values=null,this._promise._cancel())},a.prototype._reject=function(t){this._values=null,this._promise._rejectCallback(t,!1)},a.prototype._promiseFulfilled=function(t,e){return this._values[e]=t,++this._totalResolved>=this._length&&(this._resolve(this._values),!0)},a.prototype._promiseCancelled=function(){return this._cancel(),!0},a.prototype._promiseRejected=function(t){return this._totalResolved++,this._reject(t),!0},a.prototype._resultCancelled=function(){if(!this._isResolved()){var t=this._values;if(this._cancel(),t instanceof e)t.cancel();else for(var r=0;r<t.length;++r)t[r]instanceof e&&t[r].cancel()}},a.prototype.shouldCopyValues=function(){return!0},a.prototype.getActualLength=function(t){return t},a}},{"./util":36}],24:[function(t,e,r){"use strict";e.exports=function(e,r){var n={},o=t("./util"),i=t("./nodeback"),s=o.withAppended,a=o.maybeWrapAsError,u=o.canEvaluate,l=t("./errors").TypeError,f={__isPromisified__:!0},p=new RegExp("^(?:"+["arity","length","name","arguments","caller","callee","prototype","__isPromisified__"].join("|")+")$"),h=function(t){return o.isIdentifier(t)&&"_"!==t.charAt(0)&&"constructor"!==t};function y(t){return!p.test(t)}function d(t){try{return!0===t.__isPromisified__}catch(t){return!1}}function _(t,e,r){var n=o.getDataPropertyOrDefault(t,e+r,f);return!!n&&d(n)}function v(t,e,r,n){for(var i=o.inheritedDataKeys(t),s=[],a=0;a<i.length;++a){var u=i[a],c=t[u],f=n===h||h(u);"function"!=typeof c||d(c)||_(t,u,e)||!n(u,c,t,f)||s.push(u,c)}return function(t,e,r){for(var n=0;n<t.length;n+=2){var o=t[n];if(r.test(o))for(var i=o.replace(r,""),s=0;s<t.length;s+=2)if(t[s]===i)throw new l("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s",e))}}(s,e,r),s}var m=u?void 0:function(t,u,c,l,f,p){var h=function(){return this}(),y=t;function d(){var o=u;u===n&&(o=this);var c=new e(r);c._captureStackTrace();var l="string"==typeof y&&this!==h?this[y]:t,f=i(c,p);try{l.apply(o,s(arguments,f))}catch(t){c._rejectCallback(a(t),!0,!0)}return c._isFateSealed()||c._setAsyncGuaranteed(),c}return"string"==typeof y&&(t=l),o.notEnumerableProp(d,"__isPromisified__",!0),d};function g(t,e,r,i,s){for(var a=new RegExp(e.replace(/([$])/,"\\$")+"$"),u=v(t,e,a,r),c=0,l=u.length;c<l;c+=2){var f=u[c],p=u[c+1],h=f+e;if(i===m)t[h]=m(f,n,f,p,e,s);else{var y=i(p,(function(){return m(f,n,f,p,e,s)}));o.notEnumerableProp(y,"__isPromisified__",!0),t[h]=y}}return o.toFastProperties(t),t}e.promisify=function(t,e){if("function"!=typeof t)throw new l("expecting a function but got "+o.classString(t));if(d(t))return t;var r=function(t,e,r){return m(t,e,void 0,t,null,r)}(t,void 0===(e=Object(e)).context?n:e.context,!!e.multiArgs);return o.copyDescriptors(t,r,y),r},e.promisifyAll=function(t,e){if("function"!=typeof t&&"object"!==c(t))throw new l("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");var r=!!(e=Object(e)).multiArgs,n=e.suffix;"string"!=typeof n&&(n="Async");var i=e.filter;"function"!=typeof i&&(i=h);var s=e.promisifier;if("function"!=typeof s&&(s=m),!o.isIdentifier(n))throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");for(var a=o.inheritedDataKeys(t),u=0;u<a.length;++u){var f=t[a[u]];"constructor"!==a[u]&&o.isClass(f)&&(g(f.prototype,n,i,s,r),g(f,n,i,s,r))}return g(t,n,i,s,r)}}},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(t,e,r){"use strict";e.exports=function(e,r,n,o){var i,s=t("./util"),a=s.isObject,u=t("./es5");"function"==typeof Map&&(i=Map);var c=function(){var t=0,e=0;function r(r,n){this[t]=r,this[t+e]=n,t++}return function(n){e=n.size,t=0;var o=new Array(2*n.size);return n.forEach(r,o),o}}();function l(t){var e,r=!1;if(void 0!==i&&t instanceof i)e=c(t),r=!0;else{var n=u.keys(t),o=n.length;e=new Array(2*o);for(var s=0;s<o;++s){var a=n[s];e[s]=t[a],e[s+o]=a}}this.constructor$(e),this._isMap=r,this._init$(void 0,r?-6:-3)}function f(t){var r,i=n(t);return a(i)?(r=i instanceof e?i._then(e.props,void 0,void 0,void 0,void 0):new l(i).promise(),i instanceof e&&r._propagateFrom(i,2),r):o("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n")}s.inherits(l,r),l.prototype._init=function(){},l.prototype._promiseFulfilled=function(t,e){if(this._values[e]=t,++this._totalResolved>=this._length){var r;if(this._isMap)r=function(t){for(var e=new i,r=t.length/2|0,n=0;n<r;++n){var o=t[r+n],s=t[n];e.set(o,s)}return e}(this._values);else{r={};for(var n=this.length(),o=0,s=this.length();o<s;++o)r[this._values[o+n]]=this._values[o]}return this._resolve(r),!0}return!1},l.prototype.shouldCopyValues=function(){return!1},l.prototype.getActualLength=function(t){return t>>1},e.prototype.props=function(){return f(this)},e.props=function(t){return f(t)}}},{"./es5":13,"./util":36}],26:[function(t,e,r){"use strict";function n(t){this._capacity=t,this._length=0,this._front=0}n.prototype._willBeOverCapacity=function(t){return this._capacity<t},n.prototype._pushOne=function(t){var e=this.length();this._checkCapacity(e+1),this[this._front+e&this._capacity-1]=t,this._length=e+1},n.prototype.push=function(t,e,r){var n=this.length()+3;if(this._willBeOverCapacity(n))return this._pushOne(t),this._pushOne(e),void this._pushOne(r);var o=this._front+n-3;this._checkCapacity(n);var i=this._capacity-1;this[o+0&i]=t,this[o+1&i]=e,this[o+2&i]=r,this._length=n},n.prototype.shift=function(){var t=this._front,e=this[t];return this[t]=void 0,this._front=t+1&this._capacity-1,this._length--,e},n.prototype.length=function(){return this._length},n.prototype._checkCapacity=function(t){this._capacity<t&&this._resizeTo(this._capacity<<1)},n.prototype._resizeTo=function(t){var e=this._capacity;this._capacity=t,function(t,e,r,n,o){for(var i=0;i<o;++i)r[i+n]=t[i+e],t[i+e]=void 0}(this,0,this,e,this._front+this._length&e-1)},e.exports=n},{}],27:[function(t,e,r){"use strict";e.exports=function(e,r,n,o){var i=t("./util");function s(t,a){var u,c=n(t);if(c instanceof e)return(u=c).then((function(t){return s(t,u)}));if(null===(t=i.asArray(t)))return o("expecting an array or an iterable object but got "+i.classString(t));var l=new e(r);void 0!==a&&l._propagateFrom(a,3);for(var f=l._fulfill,p=l._reject,h=0,y=t.length;h<y;++h){var d=t[h];(void 0!==d||h in t)&&e.cast(d)._then(f,p,void 0,l,null)}return l}e.race=function(t){return s(t,void 0)},e.prototype.race=function(){return s(this,void 0)}}},{"./util":36}],28:[function(t,e,r){"use strict";e.exports=function(e,r,n,o,i,s){var a=e._getDomain,u=t("./util"),c=u.tryCatch;function l(t,r,n,o){this.constructor$(t);var s=a();this._fn=null===s?r:u.domainBind(s,r),void 0!==n&&(n=e.resolve(n))._attachCancellationCallback(this),this._initialValue=n,this._currentCancellable=null,this._eachValues=o===i?Array(this._length):0===o?null:void 0,this._promise._captureStackTrace(),this._init$(void 0,-5)}function f(t,e){this.isFulfilled()?e._resolve(t):e._reject(t)}function p(t,e,r,o){return"function"!=typeof e?n("expecting a function but got "+u.classString(e)):new l(t,e,r,o).promise()}function h(t){this.accum=t,this.array._gotAccum(t);var r=o(this.value,this.array._promise);return r instanceof e?(this.array._currentCancellable=r,r._then(y,void 0,void 0,this,void 0)):y.call(this,r)}function y(t){var r,n=this.array,o=n._promise,i=c(n._fn);o._pushContext(),(r=void 0!==n._eachValues?i.call(o._boundValue(),t,this.index,this.length):i.call(o._boundValue(),this.accum,t,this.index,this.length))instanceof e&&(n._currentCancellable=r);var a=o._popContext();return s.checkForgottenReturns(r,a,void 0!==n._eachValues?"Promise.each":"Promise.reduce",o),r}u.inherits(l,r),l.prototype._gotAccum=function(t){void 0!==this._eachValues&&null!==this._eachValues&&t!==i&&this._eachValues.push(t)},l.prototype._eachComplete=function(t){return null!==this._eachValues&&this._eachValues.push(t),this._eachValues},l.prototype._init=function(){},l.prototype._resolveEmptyArray=function(){this._resolve(void 0!==this._eachValues?this._eachValues:this._initialValue)},l.prototype.shouldCopyValues=function(){return!1},l.prototype._resolve=function(t){this._promise._resolveCallback(t),this._values=null},l.prototype._resultCancelled=function(t){if(t===this._initialValue)return this._cancel();this._isResolved()||(this._resultCancelled$(),this._currentCancellable instanceof e&&this._currentCancellable.cancel(),this._initialValue instanceof e&&this._initialValue.cancel())},l.prototype._iterate=function(t){var r,n;this._values=t;var o=t.length;if(void 0!==this._initialValue?(r=this._initialValue,n=0):(r=e.resolve(t[0]),n=1),this._currentCancellable=r,!r.isRejected())for(;n<o;++n){var i={accum:null,value:t[n],index:n,length:o,array:this};r=r._then(h,void 0,void 0,i,void 0)}void 0!==this._eachValues&&(r=r._then(this._eachComplete,void 0,void 0,this,void 0)),r._then(f,f,void 0,r,this)},e.prototype.reduce=function(t,e){return p(this,t,e,null)},e.reduce=function(t,e,r,n){return p(t,e,r,n)}}},{"./util":36}],29:[function(t,e,i){"use strict";var s,a,u,c,l,f=t("./util"),p=f.getNativePromise();if(f.isNode&&"undefined"==typeof MutationObserver){var h=n.setImmediate,y=r.nextTick;s=f.isRecentNode?function(t){h.call(n,t)}:function(t){y.call(r,t)}}else if("function"==typeof p&&"function"==typeof p.resolve){var d=p.resolve();s=function(t){d.then(t)}}else s="undefined"==typeof MutationObserver||"undefined"!=typeof window&&window.navigator&&(window.navigator.standalone||window.cordova)?void 0!==o?function(t){o(t)}:"undefined"!=typeof setTimeout?function(t){setTimeout(t,0)}:function(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")}:(a=document.createElement("div"),u={attributes:!0},c=!1,l=document.createElement("div"),new MutationObserver((function(){a.classList.toggle("foo"),c=!1})).observe(l,u),function(t){var e=new MutationObserver((function(){e.disconnect(),t()}));e.observe(a,u),c||(c=!0,l.classList.toggle("foo"))});e.exports=s},{"./util":36}],30:[function(t,e,r){"use strict";e.exports=function(e,r,n){var o=e.PromiseInspection;function i(t){this.constructor$(t)}t("./util").inherits(i,r),i.prototype._promiseResolved=function(t,e){return this._values[t]=e,++this._totalResolved>=this._length&&(this._resolve(this._values),!0)},i.prototype._promiseFulfilled=function(t,e){var r=new o;return r._bitField=33554432,r._settledValueField=t,this._promiseResolved(e,r)},i.prototype._promiseRejected=function(t,e){var r=new o;return r._bitField=16777216,r._settledValueField=t,this._promiseResolved(e,r)},e.settle=function(t){return n.deprecated(".settle()",".reflect()"),new i(t).promise()},e.prototype.settle=function(){return e.settle(this)}}},{"./util":36}],31:[function(t,e,r){"use strict";e.exports=function(e,r,n){var o=t("./util"),i=t("./errors").RangeError,s=t("./errors").AggregateError,a=o.isArray,u={};function c(t){this.constructor$(t),this._howMany=0,this._unwrap=!1,this._initialized=!1}function l(t,e){if((0|e)!==e||e<0)return n("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");var r=new c(t),o=r.promise();return r.setHowMany(e),r.init(),o}o.inherits(c,r),c.prototype._init=function(){if(this._initialized)if(0!==this._howMany){this._init$(void 0,-5);var t=a(this._values);!this._isResolved()&&t&&this._howMany>this._canPossiblyFulfill()&&this._reject(this._getRangeError(this.length()))}else this._resolve([])},c.prototype.init=function(){this._initialized=!0,this._init()},c.prototype.setUnwrap=function(){this._unwrap=!0},c.prototype.howMany=function(){return this._howMany},c.prototype.setHowMany=function(t){this._howMany=t},c.prototype._promiseFulfilled=function(t){return this._addFulfilled(t),this._fulfilled()===this.howMany()&&(this._values.length=this.howMany(),1===this.howMany()&&this._unwrap?this._resolve(this._values[0]):this._resolve(this._values),!0)},c.prototype._promiseRejected=function(t){return this._addRejected(t),this._checkOutcome()},c.prototype._promiseCancelled=function(){return this._values instanceof e||null==this._values?this._cancel():(this._addRejected(u),this._checkOutcome())},c.prototype._checkOutcome=function(){if(this.howMany()>this._canPossiblyFulfill()){for(var t=new s,e=this.length();e<this._values.length;++e)this._values[e]!==u&&t.push(this._values[e]);return t.length>0?this._reject(t):this._cancel(),!0}return!1},c.prototype._fulfilled=function(){return this._totalResolved},c.prototype._rejected=function(){return this._values.length-this.length()},c.prototype._addRejected=function(t){this._values.push(t)},c.prototype._addFulfilled=function(t){this._values[this._totalResolved++]=t},c.prototype._canPossiblyFulfill=function(){return this.length()-this._rejected()},c.prototype._getRangeError=function(t){var e="Input array must contain at least "+this._howMany+" items but contains only "+t+" items";return new i(e)},c.prototype._resolveEmptyArray=function(){this._reject(this._getRangeError(0))},e.some=function(t,e){return l(t,e)},e.prototype.some=function(t){return l(this,t)},e._SomePromiseArray=c}},{"./errors":12,"./util":36}],32:[function(t,e,r){"use strict";e.exports=function(t){function e(t){void 0!==t?(t=t._target(),this._bitField=t._bitField,this._settledValueField=t._isFateSealed()?t._settledValue():void 0):(this._bitField=0,this._settledValueField=void 0)}e.prototype._settledValue=function(){return this._settledValueField};var r=e.prototype.value=function(){if(!this.isFulfilled())throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},n=e.prototype.error=e.prototype.reason=function(){if(!this.isRejected())throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},o=e.prototype.isFulfilled=function(){return 0!=(33554432&this._bitField)},i=e.prototype.isRejected=function(){return 0!=(16777216&this._bitField)},s=e.prototype.isPending=function(){return 0==(50397184&this._bitField)},a=e.prototype.isResolved=function(){return 0!=(50331648&this._bitField)};e.prototype.isCancelled=function(){return 0!=(8454144&this._bitField)},t.prototype.__isCancelled=function(){return 65536==(65536&this._bitField)},t.prototype._isCancelled=function(){return this._target().__isCancelled()},t.prototype.isCancelled=function(){return 0!=(8454144&this._target()._bitField)},t.prototype.isPending=function(){return s.call(this._target())},t.prototype.isRejected=function(){return i.call(this._target())},t.prototype.isFulfilled=function(){return o.call(this._target())},t.prototype.isResolved=function(){return a.call(this._target())},t.prototype.value=function(){return r.call(this._target())},t.prototype.reason=function(){var t=this._target();return t._unsetRejectionIsUnhandled(),n.call(t)},t.prototype._value=function(){return this._settledValue()},t.prototype._reason=function(){return this._unsetRejectionIsUnhandled(),this._settledValue()},t.PromiseInspection=e}},{}],33:[function(t,e,r){"use strict";e.exports=function(e,r){var n=t("./util"),o=n.errorObj,i=n.isObject,s={}.hasOwnProperty;return function(t,a){if(i(t)){if(t instanceof e)return t;var u=function(t){try{return function(t){return t.then}(t)}catch(t){return o.e=t,o}}(t);if(u===o){a&&a._pushContext();var c=e.reject(u.e);return a&&a._popContext(),c}if("function"==typeof u)return function(t){try{return s.call(t,"_promise0")}catch(t){return!1}}(t)?(c=new e(r),t._then(c._fulfill,c._reject,void 0,c,null),c):function(t,i,s){var a=new e(r),u=a;s&&s._pushContext(),a._captureStackTrace(),s&&s._popContext();var c=n.tryCatch(i).call(t,(function(t){a&&(a._resolveCallback(t),a=null)}),(function(t){a&&(a._rejectCallback(t,!1,!0),a=null)}));return a&&c===o&&(a._rejectCallback(c.e,!0,!0),a=null),u}(t,u,a)}return t}}},{"./util":36}],34:[function(t,e,r){"use strict";e.exports=function(e,r,n){var o=t("./util"),i=e.TimeoutError;function s(t){this.handle=t}s.prototype._resultCancelled=function(){clearTimeout(this.handle)};var a=function(t){return u(+this).thenReturn(t)},u=e.delay=function(t,o){var i,u;return void 0!==o?(i=e.resolve(o)._then(a,null,null,t,void 0),n.cancellation()&&o instanceof e&&i._setOnCancel(o)):(i=new e(r),u=setTimeout((function(){i._fulfill()}),+t),n.cancellation()&&i._setOnCancel(new s(u)),i._captureStackTrace()),i._setAsyncGuaranteed(),i};function c(t){return clearTimeout(this.handle),t}function l(t){throw clearTimeout(this.handle),t}e.prototype.delay=function(t){return u(t,this)},e.prototype.timeout=function(t,e){var r,a;t=+t;var u=new s(setTimeout((function(){r.isPending()&&function(t,e,r){var n;n="string"!=typeof e?e instanceof Error?e:new i("operation timed out"):new i(e),o.markAsOriginatingFromRejection(n),t._attachExtraTrace(n),t._reject(n),null!=r&&r.cancel()}(r,e,a)}),t));return n.cancellation()?(a=this.then(),(r=a._then(c,l,void 0,u,void 0))._setOnCancel(u)):r=this._then(c,l,void 0,u,void 0),r}}},{"./util":36}],35:[function(t,e,r){"use strict";e.exports=function(e,r,n,o,i,s){var a=t("./util"),u=t("./errors").TypeError,c=t("./util").inherits,l=a.errorObj,f=a.tryCatch,p={};function h(t){setTimeout((function(){throw t}),0)}function y(t,r){var o=0,s=t.length,a=new e(i);return function i(){if(o>=s)return a._fulfill();var u=function(t){var e=n(t);return e!==t&&"function"==typeof t._isDisposable&&"function"==typeof t._getDisposer&&t._isDisposable()&&e._setDisposable(t._getDisposer()),e}(t[o++]);if(u instanceof e&&u._isDisposable()){try{u=n(u._getDisposer().tryDispose(r),t.promise)}catch(t){return h(t)}if(u instanceof e)return u._then(i,h,null,null,null)}i()}(),a}function d(t,e,r){this._data=t,this._promise=e,this._context=r}function _(t,e,r){this.constructor$(t,e,r)}function v(t){return d.isDisposer(t)?(this.resources[this.index]._setDisposable(t),t.promise()):t}function m(t){this.length=t,this.promise=null,this[t-1]=null}d.prototype.data=function(){return this._data},d.prototype.promise=function(){return this._promise},d.prototype.resource=function(){return this.promise().isFulfilled()?this.promise().value():p},d.prototype.tryDispose=function(t){var e=this.resource(),r=this._context;void 0!==r&&r._pushContext();var n=e!==p?this.doDispose(e,t):null;return void 0!==r&&r._popContext(),this._promise._unsetDisposable(),this._data=null,n},d.isDisposer=function(t){return null!=t&&"function"==typeof t.resource&&"function"==typeof t.tryDispose},c(_,d),_.prototype.doDispose=function(t,e){return this.data().call(t,t,e)},m.prototype._resultCancelled=function(){for(var t=this.length,r=0;r<t;++r){var n=this[r];n instanceof e&&n.cancel()}},e.using=function(){var t=arguments.length;if(t<2)return r("you must pass at least 2 arguments to Promise.using");var o,i=arguments[t-1];if("function"!=typeof i)return r("expecting a function but got "+a.classString(i));var u=!0;2===t&&Array.isArray(arguments[0])?(t=(o=arguments[0]).length,u=!1):(o=arguments,t--);for(var c=new m(t),p=0;p<t;++p){var h=o[p];if(d.isDisposer(h)){var _=h;(h=h.promise())._setDisposable(_)}else{var g=n(h);g instanceof e&&(h=g._then(v,null,null,{resources:c,index:p},void 0))}c[p]=h}var b=new Array(c.length);for(p=0;p<b.length;++p)b[p]=e.resolve(c[p]).reflect();var w=e.all(b).then((function(t){for(var e=0;e<t.length;++e){var r=t[e];if(r.isRejected())return l.e=r.error(),l;if(!r.isFulfilled())return void w.cancel();t[e]=r.value()}O._pushContext(),i=f(i);var n=u?i.apply(void 0,t):i(t),o=O._popContext();return s.checkForgottenReturns(n,o,"Promise.using",O),n})),O=w.lastly((function(){var t=new e.PromiseInspection(w);return y(c,t)}));return c.promise=O,O._setOnCancel(c),O},e.prototype._setDisposable=function(t){this._bitField=131072|this._bitField,this._disposer=t},e.prototype._isDisposable=function(){return(131072&this._bitField)>0},e.prototype._getDisposer=function(){return this._disposer},e.prototype._unsetDisposable=function(){this._bitField=-131073&this._bitField,this._disposer=void 0},e.prototype.disposer=function(t){if("function"==typeof t)return new _(t,this,o());throw new u}}},{"./errors":12,"./util":36}],36:[function(t,e,o){"use strict";var i=t("./es5"),s="undefined"==typeof navigator,a={e:{}},u,l="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n?n:void 0!==this?this:null;function f(){try{var t=u;return u=null,t.apply(this,arguments)}catch(t){return a.e=t,a}}function p(t){return u=t,f}var h=function(t,e){var r={}.hasOwnProperty;function n(){for(var n in this.constructor=t,this.constructor$=e,e.prototype)r.call(e.prototype,n)&&"$"!==n.charAt(n.length-1)&&(this[n+"$"]=e.prototype[n])}return n.prototype=e.prototype,t.prototype=new n,t.prototype};function y(t){return null==t||!0===t||!1===t||"string"==typeof t||"number"==typeof t}function d(t){return"function"==typeof t||"object"===c(t)&&null!==t}function _(t){return y(t)?new Error(P(t)):t}function v(t,e){var r,n=t.length,o=new Array(n+1);for(r=0;r<n;++r)o[r]=t[r];return o[r]=e,o}function m(t,e,r){if(!i.isES5)return{}.hasOwnProperty.call(t,e)?t[e]:void 0;var n=Object.getOwnPropertyDescriptor(t,e);return null!=n?null==n.get&&null==n.set?n.value:r:void 0}function g(t,e,r){if(y(t))return t;var n={value:r,configurable:!0,enumerable:!1,writable:!0};return i.defineProperty(t,e,n),t}function b(t){throw t}var w=function(){var t=[Array.prototype,Object.prototype,Function.prototype],e=function(e){for(var r=0;r<t.length;++r)if(t[r]===e)return!0;return!1};if(i.isES5){var r=Object.getOwnPropertyNames;return function(t){for(var n=[],o=Object.create(null);null!=t&&!e(t);){var s;try{s=r(t)}catch(t){return n}for(var a=0;a<s.length;++a){var u=s[a];if(!o[u]){o[u]=!0;var c=Object.getOwnPropertyDescriptor(t,u);null!=c&&null==c.get&&null==c.set&&n.push(u)}}t=i.getPrototypeOf(t)}return n}}var n={}.hasOwnProperty;return function(r){if(e(r))return[];var o=[];t:for(var i in r)if(n.call(r,i))o.push(i);else{for(var s=0;s<t.length;++s)if(n.call(t[s],i))continue t;o.push(i)}return o}}(),O=/this\s*\.\s*\S+\s*=/;function S(t){try{if("function"==typeof t){var e=i.names(t.prototype),r=i.isES5&&e.length>1,n=e.length>0&&!(1===e.length&&"constructor"===e[0]),o=O.test(t+"")&&i.names(t).length>0;if(r||n||o)return!0}return!1}catch(t){return!1}}function A(t){function e(){}e.prototype=t;for(var r=8;r--;)new e;return t}var $=/^[a-z$_][a-z$_0-9]*$/i;function E(t){return $.test(t)}function j(t,e,r){for(var n=new Array(t),o=0;o<t;++o)n[o]=e+o+r;return n}function P(t){try{return t+""}catch(t){return"[no string representation]"}}function x(t){return t instanceof Error||null!==t&&"object"===c(t)&&"string"==typeof t.message&&"string"==typeof t.name}function T(t){try{g(t,"isOperational",!0)}catch(t){}}function N(t){return null!=t&&(t instanceof Error.__BluebirdErrorTypes__.OperationalError||!0===t.isOperational)}function k(t){return x(t)&&i.propertyIsWritable(t,"stack")}var B="stack"in new Error?function(t){return k(t)?t:new Error(P(t))}:function(t){if(k(t))return t;try{throw new Error(P(t))}catch(t){return t}};function C(t){return{}.toString.call(t)}function R(t,e,r){for(var n=i.names(t),o=0;o<n.length;++o){var s=n[o];if(r(s))try{i.defineProperty(e,s,i.getDescriptor(t,s))}catch(t){}}}var D=function(t){return i.isArray(t)?t:null};if("undefined"!=typeof Symbol&&Symbol.iterator){var M="function"==typeof Array.from?function(t){return Array.from(t)}:function(t){for(var e,r=[],n=t[Symbol.iterator]();!(e=n.next()).done;)r.push(e.value);return r};D=function(t){return i.isArray(t)?t:null!=t&&"function"==typeof t[Symbol.iterator]?M(t):null}}var I=void 0!==r&&"[object process]"===C(r).toLowerCase(),F=void 0!==r&&void 0!==r.env;function L(t){return F?r.env[t]:void 0}function U(){if("function"==typeof Promise)try{var t=new Promise((function(){}));if("[object Promise]"==={}.toString.call(t))return Promise}catch(t){}}function V(t,e){return t.bind(e)}var q={isClass:S,isIdentifier:E,inheritedDataKeys:w,getDataPropertyOrDefault:m,thrower:b,isArray:i.isArray,asArray:D,notEnumerableProp:g,isPrimitive:y,isObject:d,isError:x,canEvaluate:s,errorObj:a,tryCatch:p,inherits:h,withAppended:v,maybeWrapAsError:_,toFastProperties:A,filledRange:j,toString:P,canAttachTrace:k,ensureErrorObject:B,originatesFromRejection:N,markAsOriginatingFromRejection:T,classString:C,copyDescriptors:R,hasDevTools:"undefined"!=typeof chrome&&chrome&&"function"==typeof chrome.loadTimes,isNode:I,hasEnvVariables:F,env:L,global:l,getNativePromise:U,domainBind:V},W;q.isRecentNode=q.isNode&&(W=r.versions.node.split(".").map(Number),0===W[0]&&W[1]>10||W[0]>0),q.isNode&&q.toFastProperties(r);try{throw new Error}catch(t){q.lastLineError=t}e.exports=q},{"./es5":13}]},{},[4])(4)},"object"==c(e)&&void 0!==t?t.exports=u():(s=[],void 0===(a="function"==typeof(i=u)?i.apply(e,s):i)||(t.exports=a)),"undefined"!=typeof window&&null!==window?window.P=window.Promise:"undefined"!=typeof self&&null!==self&&(self.P=self.Promise)}).call(this,r(11),r(9),r(69).setImmediate)},function(t,e,r){"use strict";var n=t.exports={};n.DocumentNotFoundError=null,n.general={},n.general.default="Validator failed for path `{PATH}` with value `{VALUE}`",n.general.required="Path `{PATH}` is required.",n.Number={},n.Number.min="Path `{PATH}` ({VALUE}) is less than minimum allowed value ({MIN}).",n.Number.max="Path `{PATH}` ({VALUE}) is more than maximum allowed value ({MAX}).",n.Number.enum="`{VALUE}` is not a valid enum value for path `{PATH}`.",n.Date={},n.Date.min="Path `{PATH}` ({VALUE}) is before minimum allowed value ({MIN}).",n.Date.max="Path `{PATH}` ({VALUE}) is after maximum allowed value ({MAX}).",n.String={},n.String.enum="`{VALUE}` is not a valid enum value for path `{PATH}`.",n.String.match="Path `{PATH}` is invalid ({VALUE}).",n.String.minlength="Path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).",n.String.maxlength="Path `{PATH}` (`{VALUE}`) is longer than the maximum allowed length ({MAXLENGTH})."},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=r(5),c=r(4),l=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);
/*!
   * OverwriteModel Error constructor.
   */function r(t,n,o,i){var s,a;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r);var l=u.messages;return a=null!=l.DocumentNotFoundError?"function"==typeof l.DocumentNotFoundError?l.DocumentNotFoundError(t,n):l.DocumentNotFoundError:'No document found for query "'+c.inspect(t)+'" on model "'+n+'"',(s=e.call(this,a)).result=i,s.numAffected=o,s.filter=t,s.query=t,s}return r}(u);Object.defineProperty(l.prototype,"name",{value:"DocumentNotFoundError"}),
/*!
 * exports
 */
t.exports=l},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);function r(t,n,o){var i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r);var s=o.join(", ");return(i=e.call(this,'No matching document found for id "'+t._id+'" version '+n+' modifiedPaths "'+s+'"')).version=n,i.modifiedPaths=o,i}return r}(r(5));Object.defineProperty(u.prototype,"name",{value:"VersionError"}),
/*!
 * exports
 */
t.exports=u},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);function r(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r);return e.call(this,"Can't save() the same doc multiple times in parallel. Document: "+t._id)}return r}(r(5));Object.defineProperty(u.prototype,"name",{value:"ParallelSaveError"}),
/*!
 * exports
 */
t.exports=u},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);
/*!
   * OverwriteModel Error constructor.
   * @param {String} name
   */function r(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),e.call(this,"Cannot overwrite `"+t+"` model once compiled.")}return r}(r(5));Object.defineProperty(u.prototype,"name",{value:"OverwriteModelError"}),
/*!
 * exports
 */
t.exports=u},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);
/*!
   * MissingSchema Error constructor.
   * @param {String} name
   */function r(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r);var n="Schema hasn't been registered for model \""+t+'".\nUse mongoose.model(name, schema)';return e.call(this,n)}return r}(r(5));Object.defineProperty(u.prototype,"name",{value:"MissingSchemaError"}),
/*!
 * exports
 */
t.exports=u},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);
/*!
   * DivergentArrayError constructor.
   * @param {Array<String>} paths
   */function r(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r);var n="For your own good, using `document.save()` to update an array which was selected using an $elemMatch projection OR populated using skip, limit, query conditions, or exclusion of the _id field when the operation results in a $pop or $set of the entire array is not supported. The following path(s) would have been modified unsafely:\n  "+t.join("\n  ")+"\nUse Model.update() to update these arrays instead.";return e.call(this,n)}return r}(r(5));Object.defineProperty(u.prototype,"name",{value:"DivergentArrayError"}),
/*!
 * exports
 */
t.exports=u},function(t,e,r){"use strict";var n=r(33);
/*!
 * ignore
 */t.exports=function(t){var e,r;t.$immutable?(t.$immutableSetter=(e=t.path,r=t.options.immutable,function(t){if(null==this||null==this.$__)return t;if(this.isNew)return t;if(!("function"==typeof r?r.call(this,this):r))return t;var o=this.$__getValue(e);if("throw"===this.$__.strictMode&&t!==o)throw new n(e,"Path `"+e+"` is immutable and strict mode is set to throw.",!0);return o}),t.set(t.$immutableSetter)):t.$immutableSetter&&(t.setters=t.setters.filter((function(e){return e!==t.$immutableSetter})),delete t.$immutableSetter)}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);function r(t,n,o){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),e.call(this,'Parameter "'+n+'" to '+o+"() must be an object, got "+t.toString())}return r}(r(5));Object.defineProperty(u.prototype,"name",{value:"ObjectParameterError"}),t.exports=u},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function i(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=a(t);if(e){var o=a(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return s(this,r)}}function s(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var u=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}(r,t);var e=i(r);function r(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r);return e.call(this,"Can't validate() the same doc multiple times in parallel. Document: "+t._id)}return r}(r(14));Object.defineProperty(u.prototype,"name",{value:"ParallelValidateError"}),
/*!
 * exports
 */
t.exports=u},function(t,e,r){"use strict";(function(e){function r(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var o=0,i=function(){};return{s:i,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(){this._pres=new Map,this._posts=new Map}function s(t,e,r,n,o,i,s){if(i.useErrorHandlers){var a={error:e};return t.execPost(r,n,o,a,(function(t){return"function"==typeof s&&s(t)}))}return"function"==typeof s?s(e):void 0}function a(t,e,r){return t.has(e)?t.get(e):r}function u(t,e,r,n){var o;try{o=t.apply(e,r)}catch(t){return n(t)}c(o)&&o.then((function(){return n()}),(function(t){return n(t)}))}function c(t){return null!=t&&"function"==typeof t.then}function l(t){var r=!1,n=this;return function(){var o=arguments;if(!r)return r=!0,e.nextTick((function(){return t.apply(n,o)}))}}i.prototype.execPre=function(t,r,n,o){3===arguments.length&&(o=n,n=[]);var i=a(this._pres,t,[]),s=i.length,f=i.numAsync||0,p=0,h=f,y=!1,d=n;if(!s)return e.nextTick((function(){o(null)}));var _=function t(){if(!(p>=s)){var n=i[p];if(n.isAsync){var a=[l(v),l((function(t){if(t){if(y)return;return y=!0,o(t)}if(0==--h&&p>=s)return o(null)}))];u(n.fn,r,a,a[0])}else if(n.fn.length>0){a=[l(v)];for(var f=arguments.length>=2?arguments:[null].concat(d),_=1;_<f.length;++_)a.push(f[_]);u(n.fn,r,a,a[0])}else{var m=null;try{m=n.fn.call(r)}catch(t){if(null!=t)return o(t)}if(c(m))m.then((function(){return v()}),(function(t){return v(t)}));else{if(++p>=s)return h>0?void 0:e.nextTick((function(){o(null)}));t()}}}};function v(t){if(t){if(y)return;return y=!0,o(t)}if(++p>=s)return h>0?void 0:o(null);_.apply(r,arguments)}_.apply(null,[null].concat(n))},i.prototype.execPreSync=function(t,e,r){for(var n=a(this._pres,t,[]),o=n.length,i=0;i<o;++i)n[i].fn.apply(e,r||[])},i.prototype.execPost=function(t,r,n,o,i){arguments.length<5&&(i=o,o=null);var s=a(this._posts,t,[]),f=s.length,p=0,h=null;if(o&&o.error&&(h=o.error),!f)return e.nextTick((function(){i.apply(null,[h].concat(n))}));var y=function t(){for(var e=s[p].fn,o=0,a=n.length,y=[],d=0;d<a;++d)o+=n[d]&&n[d]._kareemIgnore?0:1,n[d]&&n[d]._kareemIgnore||y.push(n[d]);if(h)if(e.length===o+2){var _=l((function(e){if(e&&(h=e),++p>=f)return i.call(null,h);t()}));u(e,r,[h].concat(y).concat([_]),_)}else{if(++p>=f)return i.call(null,h);t()}else{var v=l((function(e){return e?(h=e,t()):++p>=f?i.apply(null,[null].concat(n)):void t()}));if(e.length===o+2)return++p>=f?i.apply(null,[null].concat(n)):t();if(e.length===o+1)u(e,r,y.concat([v]),v);else{var m,g;try{g=e.apply(r,y)}catch(t){m=t,h=t}if(c(g))return g.then((function(){return v()}),(function(t){return v(t)}));if(++p>=f)return i.apply(null,[m].concat(n));t()}}};y()},i.prototype.execPostSync=function(t,e,r){for(var n=a(this._posts,t,[]),o=n.length,i=0;i<o;++i)n[i].fn.apply(e,r||[])},i.prototype.createWrapperSync=function(t,e){var r=this;return function(){r.execPreSync(t,this,arguments);var n=e.apply(this,arguments);return r.execPostSync(t,this,[n]),n}},i.prototype.wrap=function(t,e,r,n,o){var i=n.length>0?n[n.length-1]:null,a=("function"==typeof i&&n.slice(0,n.length-1),this),u=(o=o||{}).checkForPromise;this.execPre(t,r,n,(function(c){if(c){for(var l=o.numCallbackParams||0,f=o.contextParameter?[r]:[],p=f.length;p<l;++p)f.push(null);return s(a,c,t,r,f,o,i)}var h="function"==typeof i?n.length-1:n.length,y=e.length,d=e.apply(r,n.slice(0,h).concat(_));if(u){if(null!=d&&"function"==typeof d.then)return d.then((function(t){return _(null,t)}),(function(t){return _(t)}));if(y<h+1)return _(null,d)}function _(){var e=Array.prototype.slice.call(arguments,1);if(o.nullResultByDefault&&0===e.length&&e.push(null),arguments[0])return s(a,arguments[0],t,r,e,o,i);a.execPost(t,r,e,(function(){return arguments[0]?"function"==typeof i?i(arguments[0]):void 0:"function"==typeof i?i.apply(r,arguments):void 0}))}}))},i.prototype.filter=function(t){for(var e=this,r=this.clone(),n=Array.from(r._pres.keys()),o=function(){var n=s[i],o=e._pres.get(n).map((function(t){return Object.assign({},t,{name:n})})).filter(t);if(0===o.length)return r._pres.delete(n),"continue";o.numAsync=o.filter((function(t){return t.isAsync})).length,r._pres.set(n,o)},i=0,s=n;i<s.length;i++)o();for(var a=Array.from(r._posts.keys()),u=function(){var n=l[c],o=e._posts.get(n).map((function(t){return Object.assign({},t,{name:n})})).filter(t);if(0===o.length)return r._posts.delete(n),"continue";r._posts.set(n,o)},c=0,l=a;c<l.length;c++)u();return r},i.prototype.hasHooks=function(t){return this._pres.has(t)||this._posts.has(t)},i.prototype.createWrapper=function(t,r,n,o){var i=this;return this.hasHooks(t)?function(){var e=n||this,s=Array.prototype.slice.call(arguments);i.wrap(t,r,e,s,o)}:function(){var t=arguments,n=this;e.nextTick((function(){return r.apply(n,t)}))}},i.prototype.pre=function(t,e,r,n,i){var s={};"object"===o(e)&&null!=e?e=(s=e).isAsync:"boolean"!=typeof arguments[1]&&(n=r,r=e,e=!1);var u=a(this._pres,t,[]);if(this._pres.set(t,u),e&&(u.numAsync=u.numAsync||0,++u.numAsync),"function"!=typeof r)throw new Error('pre() requires a function, got "'+o(r)+'"');return i?u.unshift(Object.assign({},s,{fn:r,isAsync:e})):u.push(Object.assign({},s,{fn:r,isAsync:e})),this},i.prototype.post=function(t,e,r,n){var i=a(this._posts,t,[]);if("function"==typeof e&&(n=!!r,r=e,e={}),"function"!=typeof r)throw new Error('post() requires a function, got "'+o(r)+'"');return n?i.unshift(Object.assign({},e,{fn:r})):i.push(Object.assign({},e,{fn:r})),this._posts.set(t,i),this},i.prototype.clone=function(){var t,e=new i,n=r(this._pres.keys());try{for(n.s();!(t=n.n()).done;){var o=t.value,s=this._pres.get(o).slice();s.numAsync=this._pres.get(o).numAsync,e._pres.set(o,s)}}catch(t){n.e(t)}finally{n.f()}var a,u=r(this._posts.keys());try{for(u.s();!(a=u.n()).done;){var c=a.value;e._posts.set(c,this._posts.get(c).slice())}}catch(t){u.e(t)}finally{u.f()}return e},i.prototype.merge=function(t,e){var n,o=(e=1===arguments.length||e)?this.clone():this,i=r(t._pres.keys());try{var s=function(){var e=n.value,r=a(o._pres,e,[]),i=t._pres.get(e).filter((function(t){return-1===r.map((function(t){return t.fn})).indexOf(t.fn)})),s=r.concat(i);s.numAsync=r.numAsync||0,s.numAsync+=i.filter((function(t){return t.isAsync})).length,o._pres.set(e,s)};for(i.s();!(n=i.n()).done;)s()}catch(t){i.e(t)}finally{i.f()}var u,c=r(t._posts.keys());try{var l=function(){var e=u.value,r=a(o._posts,e,[]),n=t._posts.get(e).filter((function(t){return-1===r.indexOf(t)}));o._posts.set(e,r.concat(n))};for(c.s();!(u=c.n()).done;)l()}catch(t){c.e(t)}finally{c.f()}return o},t.exports=i}).call(this,r(11))},function(t,e,r){"use strict";var n=r(8),o=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),Object.assign(this,e),null!=e&&null!=e.options&&(this.options=Object.assign({},e.options))};Object.defineProperty(o.prototype,"ref",n),Object.defineProperty(o.prototype,"refPath",n),Object.defineProperty(o.prototype,"localField",n),Object.defineProperty(o.prototype,"foreignField",n),Object.defineProperty(o.prototype,"justOne",n),Object.defineProperty(o.prototype,"count",n),Object.defineProperty(o.prototype,"match",n),Object.defineProperty(o.prototype,"options",n),Object.defineProperty(o.prototype,"skip",n),Object.defineProperty(o.prototype,"limit",n),Object.defineProperty(o.prototype,"perDocumentLimit",n),t.exports=o},function(t,e,r){"use strict";var n=r(3),o=r(21);
/*!
 * Gather all indexes defined in the schema, including single nested,
 * document arrays, and embedded discriminators.
 */
t.exports=function(t){var e=[],r=new WeakMap,i=t.constructor.indexTypes,s=new Map;return function t(a,u,c){if(r.has(a))return;r.set(a,!0),u=u||"";for(var l=Object.keys(a.paths),f=0,p=l;f<p.length;f++){var h=p[f],y=a.paths[h];if(null==c||!c.paths[h]){if(y.$isMongooseDocumentArray||y.$isSingleNested){if(!0!==n(y,"options.excludeIndexes")&&!0!==n(y,"schemaOptions.excludeIndexes")&&!0!==n(y,"schema.options.excludeIndexes")&&t(y.schema,u+h+"."),null!=y.schema.discriminators)for(var d=y.schema.discriminators,_=Object.keys(d),v=0,m=_;v<m.length;v++){var g=m[v];t(d[g],u+h+".",y.schema)}if(y.$isMongooseDocumentArray)continue}var b=y._index||y.caster&&y.caster._index;if(!1!==b&&null!=b){var w={},O=o(b),S=O?b:{},A="string"==typeof b?b:!!O&&b.type;if(A&&-1!==i.indexOf(A))w[u+h]=A;else if(S.text)w[u+h]="text",delete S.text;else{var $=-1===Number(b);w[u+h]=$?-1:1}delete S.type,"background"in S||(S.background=!0),null!=a.options.autoIndex&&(S._autoIndex=a.options.autoIndex);var E=S&&S.name;"string"==typeof E&&s.has(E)?Object.assign(s.get(E),w):(e.push([w,S]),s.set(E,w))}}}r.delete(a),u?
/*!
   * Checks for indexes added to subdocs using Schema.index().
   * These indexes need their paths prefixed properly.
   *
   * schema._indexes = [ [indexObj, options], [indexObj, options] ..]
   */
function(t,r){for(var n=t._indexes,o=n.length,i=0;i<o;++i){for(var s=n[i][0],a=n[i][1],u=Object.keys(s),c=u.length,l={},f=0;f<c;++f){var p=u[f];l[r+p]=s[p]}var h=Object.assign({},a);if(null!=a&&null!=a.partialFilterExpression){h.partialFilterExpression={};for(var y=a.partialFilterExpression,d=0,_=Object.keys(y);d<_.length;d++){var v=_[d];h.partialFilterExpression[r+v]=y[v]}}e.push([l,h])}}(a,u):(a._indexes.forEach((function(t){"background"in t[1]||(t[1].background=!0)})),e=e.concat(a._indexes))}(t),e}},function(t,e,r){"use strict";var n=r(143),o=r(145),i=r(3),s=r(76),a=r(34);t.exports=function(t,e){var r=t.childSchemas.find((function(t){return!!t.schema.options.timestamps}));if(e||r){var u=s(e,"createdAt"),c=s(e,"updatedAt"),l=null!=e&&e.hasOwnProperty("currentTime")?e.currentTime:null,f={};t.$timestamps={createdAt:u,updatedAt:c},c&&!t.paths[c]&&(f[c]=Date),u&&!t.paths[u]&&(f[u]=Date),t.add(f),t.pre("save",(function(t){var e=i(this,"$__.saveOptions.timestamps");if(!1===e)return t();var r=null!=e&&!1===e.updatedAt,n=null!=e&&!1===e.createdAt,o=null!=l?l():(this.ownerDocument?this.ownerDocument():this).constructor.base.now(),s=this._id&&this._id.auto;if(!n&&u&&!this.get(u)&&this.$__isSelected(u)&&this.$set(u,s?this._id.getTimestamp():o),!r&&c&&(this.isNew||this.isModified())){var a=o;this.isNew&&(null!=u?a=this.$__getValue(u):s&&(a=this._id.getTimestamp())),this.$set(c,a)}t()})),t.methods.initializeTimestamps=function(){var t=null!=l?l():this.constructor.base.now();return u&&!this.get(u)&&this.$set(u,t),c&&!this.get(c)&&this.$set(c,t),this},h[a.builtInMiddleware]=!0;var p={query:!0,model:!1};t.pre("findOneAndReplace",p,h),t.pre("findOneAndUpdate",p,h),t.pre("replaceOne",p,h),t.pre("update",p,h),t.pre("updateOne",p,h),t.pre("updateMany",p,h)}function h(t){var e=null!=l?l():this.model.base.now();"findOneAndReplace"===this.op&&null==this.getUpdate()&&this.setUpdate({}),o(e,u,c,this.getUpdate(),this.options,this.schema),n(e,this.getUpdate(),this.model.schema),t()}}},function(t,e,r){"use strict";function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r(144),s=r(76);
/*!
 * ignore
 */
function a(t,e,r){if(null!=e){if(Object.keys(e).some((function(t){return t.startsWith("$")}))&&(e.$push&&p(e.$push),e.$addToSet&&p(e.$addToSet),null!=e.$set))for(var o=0,i=Object.keys(e.$set);o<i.length;o++){var a=i[o];u(r,a,e.$set,t)}var c,l=n(Object.keys(e).filter((function(t){return!t.startsWith("$")})));try{for(l.s();!(c=l.n()).done;){var f=c.value;u(r,f,e,t)}}catch(t){l.e(t)}finally{l.f()}}function p(e){for(var n=0,o=Object.keys(e);n<o.length;n++){var i=o[n],a=r.path(i.replace(/\.\$\./i,".").replace(/.\$$/,""));e[i]&&a&&a.$isMongooseDocumentArray&&a.schema.options.timestamps&&function(){var r=a.schema.options.timestamps,n=s(r,"createdAt"),o=s(r,"updatedAt");e[i].$each?e[i].$each.forEach((function(e){null!=o&&(e[o]=t),null!=n&&(e[n]=t)})):(null!=o&&(e[i][o]=t),null!=n&&(e[i][n]=t))}()}}}function u(t,e,r,o){var u=i(e),c=t.path(u);if(c){for(var l=[],f=u.split("."),p=f.length-1;p>0;--p){var h=t.path(f.slice(0,p).join("."));null!=h&&(h.$isMongooseDocumentArray||h.$isSingleNested)&&l.push({parentPath:e.split(".").slice(0,p).join("."),parentSchemaType:h})}if(Array.isArray(r[e])&&c.$isMongooseDocumentArray)!function(t,e,r){var n=e.schema.options.timestamps;if(n)for(var o=t.length,i=s(n,"createdAt"),u=s(n,"updatedAt"),c=0;c<o;++c)null!=u&&(t[c][u]=r),null!=i&&(t[c][i]=r),a(r,t[c],e.schema)}(r[e],c,o);else if(r[e]&&c.$isSingleNested)!function(t,e,r){var n=e.schema.options.timestamps;if(n){var o=s(n,"createdAt"),i=s(n,"updatedAt");null!=i&&(t[i]=r),null!=o&&(t[o]=r),a(r,t,e.schema)}}(r[e],c,o);else if(l.length>0){var y,d=n(l);try{for(d.s();!(y=d.n()).done;){var _=y.value,v=_.parentPath,m=_.parentSchemaType,g=m.schema.options.timestamps,b=s(g,"updatedAt");if(g&&null!=b)if(m.$isSingleNested)r[v+"."+b]=o;else if(m.$isMongooseDocumentArray){var w=e.substr(v.length+1);if(/^\d+$/.test(w)){r[v+"."+w][b]=o;continue}var O=w.indexOf(".");r[v+"."+(w=-1!==O?w.substr(0,O):w)+"."+b]=o}}}catch(t){d.e(t)}finally{d.f()}}else if(null!=c.schema&&c.schema!=t&&r[e]){var S=c.schema.options.timestamps,A=s(S,"createdAt"),$=s(S,"updatedAt");if(!S)return;null!=$&&(r[e][$]=o),null!=A&&(r[e][A]=o)}}}t.exports=a},function(t,e,r){"use strict";t.exports=function(t){return t.replace(/\.\$(\[[^\]]*\])?(?=\.)/g,".0").replace(/\.\$(\[[^\]]*\])?$/g,".0")}},function(t,e,r){"use strict";
/*!
 * ignore
 */var n=r(3);t.exports=
/*!
 * ignore
 */
function(t,e,r,o,i){var s=o,a=s,u=n(i,"overwrite",!1),c=n(i,"timestamps",!0);if(!c||null==s)return o;var l=null!=c&&!1===c.createdAt,f=null!=c&&!1===c.updatedAt;if(u)return o&&o.$set&&(o=o.$set,s.$set={},a=s.$set),f||!r||o[r]||(a[r]=t),l||!e||o[e]||(a[e]=t),s;if(o=o||{},Array.isArray(s))return s.push({$set:{updatedAt:t}}),s;if(s.$set=s.$set||{},!f&&r&&(!o.$currentDate||!o.$currentDate[r])){var p=!1;if(-1!==r.indexOf("."))for(var h=r.split("."),y=1;y<h.length;++y){var d=h.slice(-y).join("."),_=h.slice(0,-y).join(".");if(null!=o[_]){o[_][d]=t,p=!0;break}if(o.$set&&o.$set[_]){o.$set[_][d]=t,p=!0;break}}p||(s.$set[r]=t),s.hasOwnProperty(r)&&delete s[r]}if(!l&&e){o[e]&&delete o[e],o.$set&&o.$set[e]&&delete o.$set[e];var v=!1;if(-1!==e.indexOf("."))for(var m=e.split("."),g=1;g<m.length;++g){var b=m.slice(-g).join("."),w=m.slice(0,-g).join(".");if(null!=o[w]){o[w][b]=t,v=!0;break}if(o.$set&&o.$set[w]){o.$set[w][b]=t,v=!0;break}}v||(s.$setOnInsert=s.$setOnInsert||{},s.$setOnInsert[e]=t)}0===Object.keys(s.$set).length&&delete s.$set;return s}},function(t,e,r){"use strict";var n=r(14),o=r(4);t.exports=function(t,e){if("string"==typeof t)return;if("function"==typeof t)return;throw new n('Invalid ref at path "'+e+'". Got '+o.inspect(t,{depth:0}))}},function(t,e,r){"use strict";
/*!
 * ignore
 */
/*!
 * Apply query middleware
 *
 * @param {Query} query constructor
 * @param {Model} model
 */
function n(t,e){var r={useErrorHandlers:!0,numCallbackParams:1,nullResultByDefault:!0},o=e.hooks.filter((function(t){var e=function(t){var e={};t.hasOwnProperty("query")&&(e.query=t.query);t.hasOwnProperty("document")&&(e.document=t.document);return e}(t);return"updateOne"===t.name?null==e.query||!!e.query:"deleteOne"===t.name?!!e.query||0===Object.keys(e).length:"validate"===t.name||"remove"===t.name?!!e.query:null==t.query&&null==t.document||!!t.query}));t.prototype._execUpdate=o.createWrapper("update",t.prototype._execUpdate,null,r),t.prototype.__distinct=o.createWrapper("distinct",t.prototype.__distinct,null,r),t.prototype.validate=o.createWrapper("validate",t.prototype.validate,null,r),n.middlewareFunctions.filter((function(t){return"update"!==t&&"distinct"!==t&&"validate"!==t})).forEach((function(e){t.prototype["_".concat(e)]=o.createWrapper(e,t.prototype["_".concat(e)],null,r)}))}t.exports=n,
/*!
 * ignore
 */
n.middlewareFunctions=["count","countDocuments","deleteMany","deleteOne","distinct","estimatedDocumentCount","find","findOne","findOneAndDelete","findOneAndRemove","findOneAndReplace","findOneAndUpdate","remove","replaceOne","update","updateMany","updateOne","validate"]},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var i=r(6),s=r(5),a=r(149),u=r(78),c=r(1),l=i.CastError;function f(t,e){this.enumValues=[],this.regExp=null,i.call(this,t,e,"String")}
/*!
 * ignore
 */
function p(t){return this.castForQuery(t)}f.schemaName="String",f.defaultOptions={},
/*!
 * Inherits from SchemaType.
 */
f.prototype=Object.create(i.prototype),f.prototype.constructor=f,Object.defineProperty(f.prototype,"OptionsConstructor",{configurable:!1,enumerable:!1,writable:!1,value:a}),
/*!
 * ignore
 */
f._cast=u,f.cast=function(t){return 0===arguments.length||(!1===t&&(t=this._defaultCaster),this._cast=t),this._cast},
/*!
 * ignore
 */
f._defaultCaster=function(t){if(null!=t&&"string"!=typeof t)throw new Error;return t},f.get=i.get,f.set=i.set,
/*!
 * ignore
 */
f._checkRequired=function(t){return(t instanceof String||"string"==typeof t)&&t.length},f.checkRequired=i.checkRequired,f.prototype.enum=function(){if(this.enumValidator&&(this.validators=this.validators.filter((function(t){return t.validator!==this.enumValidator}),this),this.enumValidator=!1),void 0===arguments[0]||!1===arguments[0])return this;var t,e;c.isObject(arguments[0])?Array.isArray(arguments[0].values)?(t=arguments[0].values,e=arguments[0].message):(t=c.object.vals(arguments[0]),e=s.messages.String.enum):(t=arguments,e=s.messages.String.enum);var r,o=n(t);try{for(o.s();!(r=o.n()).done;){var i=r.value;void 0!==i&&this.enumValues.push(this.cast(i))}}catch(t){o.e(t)}finally{o.f()}var a=this.enumValues;return this.enumValidator=function(t){return void 0===t||~a.indexOf(t)},this.validators.push({validator:this.enumValidator,message:e,type:"enum",enumValues:a}),this},f.prototype.lowercase=function(t){return arguments.length>0&&!t?this:this.set((function(t,e){return"string"!=typeof t&&(t=e.cast(t)),t?t.toLowerCase():t}))},f.prototype.uppercase=function(t){return arguments.length>0&&!t?this:this.set((function(t,e){return"string"!=typeof t&&(t=e.cast(t)),t?t.toUpperCase():t}))},f.prototype.trim=function(t){return arguments.length>0&&!t?this:this.set((function(t,e){return"string"!=typeof t&&(t=e.cast(t)),t?t.trim():t}))},f.prototype.minlength=function(t,e){if(this.minlengthValidator&&(this.validators=this.validators.filter((function(t){return t.validator!==this.minlengthValidator}),this)),null!=t){var r=e||s.messages.String.minlength;r=r.replace(/{MINLENGTH}/,t),this.validators.push({validator:this.minlengthValidator=function(e){return null===e||e.length>=t},message:r,type:"minlength",minlength:t})}return this},f.prototype.minLength=f.prototype.minlength,f.prototype.maxlength=function(t,e){if(this.maxlengthValidator&&(this.validators=this.validators.filter((function(t){return t.validator!==this.maxlengthValidator}),this)),null!=t){var r=e||s.messages.String.maxlength;r=r.replace(/{MAXLENGTH}/,t),this.validators.push({validator:this.maxlengthValidator=function(e){return null===e||e.length<=t},message:r,type:"maxlength",maxlength:t})}return this},f.prototype.maxLength=f.prototype.maxlength,f.prototype.match=function(t,e){var r=e||s.messages.String.match;return this.validators.push({validator:function(e){return!!t&&(t.lastIndex=0,null==e||""===e||t.test(e))},message:r,type:"regexp",regexp:t}),this},f.prototype.checkRequired=function(t,e){return i._isRef(this,t,e,!0)?!!t:("function"==typeof this.constructor.checkRequired?this.constructor.checkRequired():f.checkRequired())(t)},f.prototype.cast=function(t,e,r){if(i._isRef(this,t,e,r))return"string"==typeof t?t:this._castRef(t,e,r);var n;n="function"==typeof this._castFunction?this._castFunction:"function"==typeof this.constructor.cast?this.constructor.cast():f.cast();try{return n(t)}catch(e){throw new l("string",t,this.path,null,this)}};var h=c.options(i.prototype.$conditionalHandlers,{$all:function(t){var e=this;return Array.isArray(t)?t.map((function(t){return e.castForQuery(t)})):[this.castForQuery(t)]},$gt:p,$gte:p,$lt:p,$lte:p,$options:String,$regex:p,$not:p});Object.defineProperty(f.prototype,"$conditionalHandlers",{configurable:!1,enumerable:!1,writable:!1,value:Object.freeze(h)}),f.prototype.castForQuery=function(t,e){var r;if(2===arguments.length){if(!(r=this.$conditionalHandlers[t]))throw new Error("Can't use "+t+" with String.");return r.call(this,e)}return e=t,"[object RegExp]"===Object.prototype.toString.call(e)?e:this._castForQuery(e)},
/*!
 * Module exports.
 */
t.exports=f},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"enum",l),Object.defineProperty(c.prototype,"match",l),Object.defineProperty(c.prototype,"lowercase",l),Object.defineProperty(c.prototype,"trim",l),Object.defineProperty(c.prototype,"uppercase",l),Object.defineProperty(c.prototype,"minLength",l),Object.defineProperty(c.prototype,"minlength",l),Object.defineProperty(c.prototype,"maxLength",l),Object.defineProperty(c.prototype,"maxlength",l),Object.defineProperty(c.prototype,"populate",l),
/*!
 * ignore
 */
t.exports=c},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"min",l),Object.defineProperty(c.prototype,"max",l),Object.defineProperty(c.prototype,"enum",l),Object.defineProperty(c.prototype,"populate",l),
/*!
 * ignore
 */
t.exports=c},function(t,e,r){"use strict";var n=r(23);
/*!
 * Given a value, cast it to a number, or throw a `CastError` if the value
 * cannot be casted. `null` and `undefined` are considered valid.
 *
 * @param {Any} value
 * @param {String} [path] optional the path to set on the CastError
 * @return {Boolean|null|undefined}
 * @throws {Error} if `value` is not one of the allowed values
 * @api private
 */t.exports=function(t){return null==t?t:""===t?null:("string"!=typeof t&&"boolean"!=typeof t||(t=Number(t)),n.ok(!isNaN(t)),t instanceof Number?t.valueOf():"number"==typeof t?t:Array.isArray(t)||"function"!=typeof t.valueOf?t.toString&&!Array.isArray(t)&&t.toString()==Number(t)?Number(t):void n.ok(!1):Number(t.valueOf()))}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(13),o=r(6),i=r(52),s=r(1);function a(t,e){o.call(this,t,e,"Boolean")}a.schemaName="Boolean",a.defaultOptions={},
/*!
 * Inherits from SchemaType.
 */
a.prototype=Object.create(o.prototype),a.prototype.constructor=a,
/*!
 * ignore
 */
a._cast=i,a.set=o.set,a.cast=function(t){return 0===arguments.length||(!1===t&&(t=this._defaultCaster),this._cast=t),this._cast},
/*!
 * ignore
 */
a._defaultCaster=function(t){if(null!=t&&"boolean"!=typeof t)throw new Error;return t},
/*!
 * ignore
 */
a._checkRequired=function(t){return!0===t||!1===t},a.checkRequired=o.checkRequired,a.prototype.checkRequired=function(t){return this.constructor._checkRequired(t)},Object.defineProperty(a,"convertToTrue",{get:function(){return i.convertToTrue},set:function(t){i.convertToTrue=t}}),Object.defineProperty(a,"convertToFalse",{get:function(){return i.convertToFalse},set:function(t){i.convertToFalse=t}}),a.prototype.cast=function(t){var e;e="function"==typeof this._castFunction?this._castFunction:"function"==typeof this.constructor.cast?this.constructor.cast():a.cast();try{return e(t)}catch(e){throw new n("Boolean",t,this.path,e,this)}},a.$conditionalHandlers=s.options(o.prototype.$conditionalHandlers,{}),a.prototype.castForQuery=function(t,e){var r;return 2===arguments.length?(r=a.$conditionalHandlers[t])?r.call(this,e):this._castForQuery(e):this._castForQuery(t)},a.prototype._castNullish=function(t){if(void 0===t&&null!=this.$$context&&null!=this.$$context._mongooseOptions&&this.$$context._mongooseOptions.omitUndefined)return t;var e="function"==typeof this.constructor.cast?this.constructor.cast():a.cast();return null==e?t:!(e.convertToFalse instanceof Set&&e.convertToFalse.has(t))&&(!!(e.convertToTrue instanceof Set&&e.convertToTrue.has(t))||t)},
/*!
 * Module exports.
 */
t.exports=a},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n,o,i=r(56),s=r(13),a=r(19).EventEmitter,u=r(159),c=r(6),l=r(32),f=r(92),p=r(3),h=r(93),y=r(4),d=r(1),_=r(94),v=r(0).arrayAtomicsSymbol,m=r(0).arrayPathSymbol,g=r(0).documentArrayParent;function b(t,e,r,n){null!=n&&null!=n._id?e=h(e,n):null!=r&&null!=r._id&&(e=h(e,r));var o=w(e,r);o.prototype.$basePath=t,i.call(this,t,o,r),this.schema=e,this.schemaOptions=n||{},this.$isMongooseDocumentArray=!0,this.Constructor=o,o.base=e.base;var s=this.defaultValue;"defaultValue"in this&&void 0===s||this.default((function(){var t=s.call(this);return Array.isArray(t)||(t=[t]),t}));var a=this;this.$embeddedSchemaType=new c(t+".$",{required:p(this,"schemaOptions.required",!1)}),this.$embeddedSchemaType.cast=function(t,e,r){return a.cast(t,e,r)[0]},this.$embeddedSchemaType.$isMongooseDocumentArrayElement=!0,this.$embeddedSchemaType.caster=this.Constructor,this.$embeddedSchemaType.schema=this.schema}
/*!
 * Ignore
 */
function w(t,e,n){function i(){o.apply(this,arguments),this.$session(this.ownerDocument().$session())}o||(o=r(27));var s=null!=n?n.prototype:o.prototype;for(var u in i.prototype=Object.create(s),i.prototype.$__setSchema(t),i.schema=t,i.prototype.constructor=i,i.$isArraySubdocument=!0,i.events=new a,t.methods)i.prototype[u]=t.methods[u];for(var c in t.statics)i[c]=t.statics[c];for(var l in a.prototype)i[l]=a.prototype[l];return i.options=e,i}
/*!
 * Scopes paths selected in a query to this array.
 * Necessary for proper default application of subdocument values.
 *
 * @param {DocumentArrayPath} array - the array to scope `fields` paths
 * @param {Object|undefined} fields - the root fields selected in the query
 * @param {Boolean|undefined} init - if we are being created part of a query result
 */
function O(t,e,r){if(r&&e){for(var n,o,i,s=t.path+".",a=Object.keys(e),u=a.length,c={};u--;)if((o=a[u]).startsWith(s)){if("$"===(i=o.substring(s.length)))continue;i.startsWith("$.")&&(i=i.substr(2)),n||(n=!0),c[i]=e[o]}return n&&c||void 0}}b.schemaName="DocumentArray",b.options={castNonArrays:!0},
/*!
 * Inherits from ArrayType.
 */
b.prototype=Object.create(i.prototype),b.prototype.constructor=b,b.prototype.OptionsConstructor=u,b.prototype.discriminator=function(t,e,r){"function"==typeof t&&(t=d.getFunctionName(t));var n=w(e=f(this.casterConstructor,t,e,r),null,this.casterConstructor);n.baseCasterConstructor=this.casterConstructor;try{Object.defineProperty(n,"name",{value:t})}catch(t){}return this.casterConstructor.discriminators[t]=n,this.casterConstructor.discriminators[t]},b.prototype.doValidate=function(t,e,i,s){n||(n=r(18));var a=this;try{c.prototype.doValidate.call(this,t,(function(r){if(r)return r.$isArrayValidatorError=!0,e(r);var u,c=t&&t.length;if(!c)return e();if(s&&s.updateValidator)return e();t.isMongooseDocumentArray||(t=new n(t,a.path,i));function f(t){null!=t&&((u=t)instanceof l||(u.$isArrayValidatorError=!0)),--c||e(u)}for(var p=0,h=c;p<h;++p){var y=t[p];if(null!=y){if(!(y instanceof o)){var d=_(a.casterConstructor,t[p]);y=t[p]=new d(y,t,void 0,void 0,p)}null==s||!s.validateModifiedOnly||y.isModified()?y.$__validate(f):--c||e(u)}else--c||e(u)}}),i)}catch(t){return t.$isArrayValidatorError=!0,e(t)}},b.prototype.doValidateSync=function(t,e,r){var n=c.prototype.doValidateSync.call(this,t,e);if(null!=n)return n.$isArrayValidatorError=!0,n;var i=t&&t.length,s=null;if(i){for(var a=0,u=i;a<u;++a){var l=t[a];if(l){if(!(l instanceof o)){var f=_(this.casterConstructor,t[a]);l=t[a]=new f(l,t,void 0,void 0,a)}if(null==r||!r.validateModifiedOnly||l.isModified()){var p=l.validateSync();p&&null==s&&(s=p)}}}return s}},
/*!
 * ignore
 */
b.prototype.getDefault=function(t){var e="function"==typeof this.defaultValue?this.defaultValue.call(t):this.defaultValue;if(null==e)return e;n||(n=r(18)),Array.isArray(e)||(e=[e]),e=new n(e,this.path,t);for(var o=0;o<e.length;++o){var i=new(_(this.casterConstructor,e[o]))({},e,void 0,void 0,o);i.init(e[o]),i.isNew=!0,Object.assign(i.$__.activePaths.default,i.$__.activePaths.init),i.$__.activePaths.init={},e[o]=i}return e},b.prototype.cast=function(t,e,i,a,u){if(n||(n=r(18)),null!=t&&null!=t[m]&&t===a)return t;var c,l,f={transform:!1,virtuals:!1};if(u=u||{},!Array.isArray(t)){if(!i&&!b.options.castNonArrays)throw new s("DocumentArray",y.inspect(t),this.path,null,this);return e&&i&&e.markModified(this.path),this.cast([t],e,i,a,u)}t&&t.isMongooseDocumentArray||u.skipDocumentArrayCast?t&&t.isMongooseDocumentArray&&(t=new n(t,this.path,e)):t=new n(t,this.path,e),null!=a&&(t[v]=a[v]||{}),null!=u.arrayPathIndex&&(t[m]=this.path+"."+u.arrayPathIndex);for(var p=t.length,h={skipId:!0,willInit:!0},w=0;w<p;++w)if(t[w]){var S=_(this.casterConstructor,t[w]);if(!t[w].$__||t[w]instanceof S&&t[w][g]===e||(t[w]=t[w].toObject({transform:!1,virtuals:t[w].schema===S.schema})),t[w]instanceof o)null==t[w].__index&&t[w].$setIndex(w);else if(null!=t[w])if(i)e?c||(c=O(this,e.$__.selected,i)):c=!0,l=new S(null,t,h,c,w),t[w]=l.init(t[w]);else if(a&&"function"==typeof a.id&&(l=a.id(t[w]._id)),a&&l&&d.deepEqual(l.toObject(f),t[w]))l.set(t[w]),t[w]=l;else try{l=new S(t[w],t,void 0,void 0,w),t[w]=l}catch(e){var A=y.inspect(t[w]);throw new s("embedded",A,t[m],e,this)}}return t},
/*!
 * ignore
 */
b.prototype.clone=function(){var t=Object.assign({},this.options),e=new this.constructor(this.path,this.schema,t,this.schemaOptions);return e.validators=this.validators.slice(),void 0!==this.requiredValidator&&(e.requiredValidator=this.requiredValidator),e.Constructor.discriminators=Object.assign({},this.Constructor.discriminators),e},
/*!
 * ignore
 */
b.prototype.applyGetters=function(t,e){return c.prototype.applyGetters.call(this,t,e)},b.defaultOptions={},b.set=c.set,
/*!
 * Module exports.
 */
t.exports=b},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"enum",l),Object.defineProperty(c.prototype,"of",l),
/*!
 * ignore
 */
t.exports=c},function(t,e,r){"use strict";t.exports=function t(e){if(!Array.isArray(e))return{min:0,max:0,containsNonArrayItem:!0};if(0===e.length)return{min:1,max:1,containsNonArrayItem:!1};if(1===e.length&&!Array.isArray(e[0]))return{min:1,max:1,containsNonArrayItem:!1};for(var r=t(e[0]),n=1;n<e.length;++n){var o=t(e[n]);o.min<r.min&&(r.min=o.min),o.max>r.max&&(r.max=o.max),r.containsNonArrayItem=r.containsNonArrayItem||o.containsNonArrayItem}return r.min=r.min+1,r.max=r.max+1,r}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s=r(13),a=r(33),u=r(55),c=r(157),l=r(3),f=r(158),p=r(82),h=r(4),y=r(21),d=r(30),_=["Polygon","MultiPolygon"];function v(t,e,r){if(Array.isArray(t))t.forEach((function(n,o){if(Array.isArray(n)||y(n))return v(n,e,r);t[o]=e.castForQueryWrapper({val:n,context:r})}));else for(var n=Object.keys(t),o=n.length;o--;){var i=n[o],s=t[i];Array.isArray(s)||y(s)?(v(s,e,r),t[i]=s):t[i]=e.castForQuery({val:s,context:r})}}t.exports=function t(e,r,o,m){if(Array.isArray(r))throw new Error("Query filter must be an object, got an array ",h.inspect(r));if(null==r)return r;r.hasOwnProperty("_bsontype")&&"ObjectID"!==r._bsontype&&delete r._bsontype,null!=e&&null!=e.discriminators&&null!=r[e.options.discriminatorKey]&&(e=f(e,r[e.options.discriminatorKey])||e);var g,b,w,O,S,A,$=Object.keys(r),E=$.length;for(o=o||{};E--;)if(A=r[O=$[E]],"$or"===O||"$nor"===O||"$and"===O){if(!Array.isArray(A))throw new s("Array",A,O);for(var j=0;j<A.length;++j){if(null==A[j]||"object"!==i(A[j]))throw new s("Object",A[j],O+"."+j);A[j]=t(e,A[j],o,m)}}else{if("$where"===O){if("string"!==(S=i(A))&&"function"!==S)throw new Error("Must have a string or function for $where");"function"===S&&(r[O]=A.toString());continue}if("$elemMatch"===O)A=t(e,A,o,m);else if("$text"===O)A=c(A,O);else{if(!e)continue;if(!(b=e.path(O)))for(var P=O.split("."),x=P.length;x--;){var T=P.slice(0,x).join("."),N=P.slice(x).join("."),k=e.path(T),B=l(k,"schema.options.discriminatorKey");if(null!=k&&null!=l(k,"schema.discriminators")&&null!=B&&N!==B){var C=l(r,T+"."+B);null!=C&&(b=k.schema.discriminators[C].path(N))}}if(b){if(null==A)continue;if("Object"===A.constructor.name)if(Object.keys(A).some(p))for(var R=Object.keys(A),D=void 0,M=R.length;M--;)if(w=A[D=R[M]],"$not"===D){if(w&&b&&!b.caster){if((g=Object.keys(w)).length&&p(g[0]))for(var I in w)w[I]=b.castForQueryWrapper({$conditional:I,val:w[I],context:m});else A[D]=b.castForQueryWrapper({$conditional:D,val:w,context:m});continue}t(b.caster?b.caster.schema:e,w,o,m)}else A[D]=b.castForQueryWrapper({$conditional:D,val:w,context:m});else r[O]=b.castForQueryWrapper({val:A,context:m});else if(Array.isArray(A)&&-1===["Buffer","Array"].indexOf(b.instance)){var F,L=[],U=n(A);try{for(U.s();!(F=U.n()).done;){var V=F.value;L.push(b.castForQueryWrapper({val:V,context:m}))}}catch(t){U.e(t)}finally{U.f()}r[O]={$in:L}}else r[O]=b.castForQueryWrapper({val:A,context:m})}else{for(var q=O.split("."),W=q.length,H=void 0,Y=void 0,K=void 0;W--&&(H=q.slice(0,W).join("."),!(b=e.path(H))););if(b){b.caster&&b.caster.schema?((K={})[Y=q.slice(W).join(".")]=A,r[O]=t(b.caster.schema,K,o,m)[Y]):r[O]=A;continue}if(y(A)){var z="";if(A.$near?z="$near":A.$nearSphere?z="$nearSphere":A.$within?z="$within":A.$geoIntersects?z="$geoIntersects":A.$geoWithin&&(z="$geoWithin"),z){var Q=new u.Number("__QueryCasting__"),J=A[z];if(null!=A.$maxDistance&&(A.$maxDistance=Q.castForQueryWrapper({val:A.$maxDistance,context:m})),null!=A.$minDistance&&(A.$minDistance=Q.castForQueryWrapper({val:A.$minDistance,context:m})),"$within"===z){var G=J.$center||J.$centerSphere||J.$box||J.$polygon;if(!G)throw new Error("Bad $within parameter: "+JSON.stringify(A));J=G}else if("$near"===z&&"string"==typeof J.type&&Array.isArray(J.coordinates))J=J.coordinates;else if(("$near"===z||"$nearSphere"===z||"$geoIntersects"===z)&&J.$geometry&&"string"==typeof J.$geometry.type&&Array.isArray(J.$geometry.coordinates))null!=J.$maxDistance&&(J.$maxDistance=Q.castForQueryWrapper({val:J.$maxDistance,context:m})),null!=J.$minDistance&&(J.$minDistance=Q.castForQueryWrapper({val:J.$minDistance,context:m})),d(J.$geometry)&&(J.$geometry=J.$geometry.toObject({transform:!1,virtuals:!1})),J=J.$geometry.coordinates;else if("$geoWithin"===z)if(J.$geometry){d(J.$geometry)&&(J.$geometry=J.$geometry.toObject({virtuals:!1}));var X=J.$geometry.type;if(-1===_.indexOf(X))throw new Error('Invalid geoJSON type for $geoWithin "'+X+'", must be "Polygon" or "MultiPolygon"');J=J.$geometry.coordinates}else J=J.$box||J.$polygon||J.$center||J.$centerSphere,d(J)&&(J=J.toObject({virtuals:!1}));v(J,Q,m);continue}}if(e.nested[O])continue;if(o.upsert&&o.strict){if("throw"===o.strict)throw new a(O);throw new a(O,'Path "'+O+'" is not in schema, strict mode is `true`, and upsert is `true`.')}if("throw"===o.strictQuery)throw new a(O,'Path "'+O+"\" is not in schema and strictQuery is 'throw'.");o.strictQuery&&delete r[O]}}}return r}},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(13),i=r(52),s=r(78);
/*!
 * Casts val to an object suitable for `$text`. Throws an error if the object
 * can't be casted.
 *
 * @param {Any} val value to cast
 * @param {String} [path] path to associate with any errors that occured
 * @return {Object} casted object
 * @see https://docs.mongodb.com/manual/reference/operator/query/text/
 * @api private
 */
t.exports=function(t,e){if(null==t||"object"!==n(t))throw new o("$text",t,e);return null!=t.$search&&(t.$search=s(t.$search,e+".$search")),null!=t.$language&&(t.$language=s(t.$language,e+".$language")),null!=t.$caseSensitive&&(t.$caseSensitive=i(t.$caseSensitive,e+".$castSensitive")),null!=t.$diacriticSensitive&&(t.$diacriticSensitive=i(t.$diacriticSensitive,e+".$diacriticSensitive")),t}},function(t,e,r){"use strict";var n=r(81);
/*!
* returns discriminator by discriminatorMapping.value
*
* @param {Schema} schema
* @param {string} value
*/t.exports=function(t,e){if(null==t||null==t.discriminators)return null;for(var r=0,o=Object.keys(t.discriminators);r<o.length;r++){var i=o[r],s=t.discriminators[i];if(null!=s.discriminatorMapping&&n(s.discriminatorMapping.value,e))return s}return null}},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"excludeIndexes",l),Object.defineProperty(c.prototype,"_id",l),
/*!
 * ignore
 */
t.exports=c},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o,i=r(13),s=r(19).EventEmitter,a=r(74),u=r(161),c=r(6),l=r(51),f=r(35).castToNumber,p=r(92),h=r(83),y=r(3),d=r(94),_=r(93),v=r(17).internalToObjectOptions;function m(t,e,r){t=_(t,r),this.caster=g(t),this.caster.path=e,this.caster.prototype.$basePath=e,this.schema=t,this.$isSingleNested=!0,c.call(this,e,r,"Embedded")}
/*!
 * ignore
 */
/*!
 * ignore
 */
function g(t,e){o||(o=r(91));var n=function(t,e,r){var n=this;this.$__parent=r,o.apply(this,arguments),this.$session(this.ownerDocument().$session()),r&&(r.on("save",(function(){n.emit("save",n),n.constructor.emit("save",n)})),r.on("isNew",(function(t){n.isNew=t,n.emit("isNew",t),n.constructor.emit("isNew",t)})))},i=null!=e?e.prototype:o.prototype;for(var a in(n.prototype=Object.create(i)).$__setSchema(t),n.prototype.constructor=n,n.schema=t,n.$isSingleNested=!0,n.events=new s,n.prototype.toBSON=function(){return this.toObject(v)},t.methods)n.prototype[a]=t.methods[a];for(var u in t.statics)n[u]=t.statics[u];for(var c in s.prototype)n[c]=s.prototype[c];return n}
/*!
 * Special case for when users use a common location schema to represent
 * locations for use with $geoWithin.
 * https://docs.mongodb.org/manual/reference/operator/query/geoWithin/
 *
 * @param {Object} val
 * @api private
 */t.exports=m,m.prototype=Object.create(c.prototype),m.prototype.constructor=m,m.prototype.OptionsConstructor=u,m.prototype.$conditionalHandlers.$geoWithin=function(t){return{$geometry:this.castForQuery(t.$geometry)}},
/*!
 * ignore
 */
m.prototype.$conditionalHandlers.$near=m.prototype.$conditionalHandlers.$nearSphere=h.cast$near,m.prototype.$conditionalHandlers.$within=m.prototype.$conditionalHandlers.$geoWithin=h.cast$within,m.prototype.$conditionalHandlers.$geoIntersects=h.cast$geoIntersects,m.prototype.$conditionalHandlers.$minDistance=f,m.prototype.$conditionalHandlers.$maxDistance=f,m.prototype.$conditionalHandlers.$exists=l,m.prototype.cast=function(t,e,r,o,i){if(t&&t.$isSingleNested&&t.parent===e)return t;if(null!=t&&("object"!==n(t)||Array.isArray(t)))throw new a(this.path,t);var s,u=d(this.caster,t),c=y(e,"$__.selected",{}),l=this.path,f=Object.keys(c).reduce((function(t,e){return e.startsWith(l+".")&&(t[e.substr(l.length+1)]=c[e]),t}),{});return i=Object.assign({},i,{priorDoc:o}),r?((s=new u(void 0,f,e)).init(t),s):0===Object.keys(t).length?new u({},f,e,void 0,i):new u(t,f,e,void 0,i)},m.prototype.castForQuery=function(t,e,r){var n;if(2===arguments.length){if(!(n=this.$conditionalHandlers[t]))throw new Error("Can't use "+t);return n.call(this,e)}if(null==(e=t))return e;this.options.runSetters&&(e=this._applySetters(e));var o=d(this.caster,e),s=null!=r&&null!=r.strict?r.strict:void 0;try{e=new o(e,s)}catch(t){if(!(t instanceof i))throw new i("Embedded",e,this.path,t,this);throw t}return e},m.prototype.doValidate=function(t,e,r,n){var o=d(this.caster,t);if(n&&n.skipSchemaValidators)return t instanceof o||(t=new o(t,null,r)),t.validate(e);c.prototype.doValidate.call(this,t,(function(r){return r?e(r):t?void t.validate(e):e(null)}),r,n)},m.prototype.doValidateSync=function(t,e,r){if(!r||!r.skipSchemaValidators){var n=c.prototype.doValidateSync.call(this,t,e);if(n)return n}if(t)return t.validateSync()},m.prototype.discriminator=function(t,e,r){return e=p(this.caster,t,e,r),this.caster.discriminators[t]=g(e,this.caster),this.caster.discriminators[t]},m.defaultOptions={},m.set=c.set,
/*!
 * ignore
 */
m.prototype.clone=function(){var t=Object.assign({},this.options),e=new this.constructor(this.schema,this.path,t);return e.validators=this.validators.slice(),void 0!==this.requiredValidator&&(e.requiredValidator=this.requiredValidator),e.caster.discriminators=Object.assign({},this.caster.discriminators),e}},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"_id",l),t.exports=c},function(t,e,r){"use strict";(function(e){
/*!
 * Module dependencies.
 */
function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(87),i=r(163),s=r(6),a=r(80),u=r(1),c=o.Binary,l=s.CastError;function f(t,e){s.call(this,t,e,"Buffer")}
/*!
 * ignore
 */
function p(t){return this.castForQuery(t)}f.schemaName="Buffer",f.defaultOptions={},
/*!
 * Inherits from SchemaType.
 */
f.prototype=Object.create(s.prototype),f.prototype.constructor=f,f.prototype.OptionsConstructor=i,
/*!
 * ignore
 */
f._checkRequired=function(t){return!(!t||!t.length)},f.set=s.set,f.checkRequired=s.checkRequired,f.prototype.checkRequired=function(t,e){return s._isRef(this,t,e,!0)?!!t:this.constructor._checkRequired(t)},f.prototype.cast=function(t,r,i){var a;if(s._isRef(this,t,r,i)){if(t&&t.isMongooseBuffer)return t;if(e.isBuffer(t))return t&&t.isMongooseBuffer||(t=new o(t,[this.path,r]),null!=this.options.subtype&&(t._subtype=this.options.subtype)),t;if(t instanceof c){if(a=new o(t.value(!0),[this.path,r]),"number"!=typeof t.sub_type)throw new l("Buffer",t,this.path,null,this);return a._subtype=t.sub_type,a}return this._castRef(t,r,i)}if(t&&t._id&&(t=t._id),t&&t.isMongooseBuffer)return t;if(e.isBuffer(t))return t&&t.isMongooseBuffer||(t=new o(t,[this.path,r]),null!=this.options.subtype&&(t._subtype=this.options.subtype)),t;if(t instanceof c){if(a=new o(t.value(!0),[this.path,r]),"number"!=typeof t.sub_type)throw new l("Buffer",t,this.path,null,this);return a._subtype=t.sub_type,a}if(null===t)return t;var u=n(t);if("string"===u||"number"===u||Array.isArray(t)||"object"===u&&"Buffer"===t.type&&Array.isArray(t.data))return"number"===u&&(t=[t]),a=new o(t,[this.path,r]),null!=this.options.subtype&&(a._subtype=this.options.subtype),a;throw new l("Buffer",t,this.path,null,this)},f.prototype.subtype=function(t){return this.options.subtype=t,this},f.prototype.$conditionalHandlers=u.options(s.prototype.$conditionalHandlers,{$bitsAllClear:a,$bitsAnyClear:a,$bitsAllSet:a,$bitsAnySet:a,$gt:p,$gte:p,$lt:p,$lte:p}),f.prototype.castForQuery=function(t,e){var r;if(2===arguments.length){if(!(r=this.$conditionalHandlers[t]))throw new Error("Can't use "+t+" with Buffer.");return r.call(this,e)}e=t;var n=this._castForQuery(e);return n?n.toObject({transform:!1,virtuals:!1}):n},
/*!
 * Module exports.
 */
t.exports=f}).call(this,r(2).Buffer)},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"subtype",l),
/*!
 * ignore
 */
t.exports=c},function(t,e,r){"use strict";
/*!
 * Module requirements.
 */var n=r(5),o=r(165),i=r(6),s=r(166),a=r(1),u=i.CastError;function c(t,e){i.call(this,t,e,"Date")}
/*!
 * Date Query casting.
 *
 * @api private
 */
function l(t){return this.cast(t)}c.schemaName="Date",c.defaultOptions={},
/*!
 * Inherits from SchemaType.
 */
c.prototype=Object.create(i.prototype),c.prototype.constructor=c,c.prototype.OptionsConstructor=o,
/*!
 * ignore
 */
c._cast=s,c.set=i.set,c.cast=function(t){return 0===arguments.length||(!1===t&&(t=this._defaultCaster),this._cast=t),this._cast},
/*!
 * ignore
 */
c._defaultCaster=function(t){if(null!=t&&!(t instanceof Date))throw new Error;return t},c.prototype.expires=function(t){return this._index&&"Object"===this._index.constructor.name||(this._index={}),this._index.expires=t,a.expires(this._index),this},
/*!
 * ignore
 */
c._checkRequired=function(t){return t instanceof Date},c.checkRequired=i.checkRequired,c.prototype.checkRequired=function(t,e){return i._isRef(this,t,e,!0)?!!t:("function"==typeof this.constructor.checkRequired?this.constructor.checkRequired():c.checkRequired())(t)},c.prototype.min=function(t,e){if(this.minValidator&&(this.validators=this.validators.filter((function(t){return t.validator!==this.minValidator}),this)),t){var r=e||n.messages.Date.min;"string"==typeof r&&(r=r.replace(/{MIN}/,t===Date.now?"Date.now()":t.toString()));var o=this;this.validators.push({validator:this.minValidator=function(e){var r=t;"function"==typeof t&&t!==Date.now&&(r=r.call(this));var n=r===Date.now?r():o.cast(r);return null===e||e.valueOf()>=n.valueOf()},message:r,type:"min",min:t})}return this},c.prototype.max=function(t,e){if(this.maxValidator&&(this.validators=this.validators.filter((function(t){return t.validator!==this.maxValidator}),this)),t){var r=e||n.messages.Date.max;"string"==typeof r&&(r=r.replace(/{MAX}/,t===Date.now?"Date.now()":t.toString()));var o=this;this.validators.push({validator:this.maxValidator=function(e){var r=t;"function"==typeof r&&r!==Date.now&&(r=r.call(this));var n=r===Date.now?r():o.cast(r);return null===e||e.valueOf()<=n.valueOf()},message:r,type:"max",max:t})}return this},c.prototype.cast=function(t){var e;e="function"==typeof this._castFunction?this._castFunction:"function"==typeof this.constructor.cast?this.constructor.cast():c.cast();try{return e(t)}catch(e){throw new u("date",t,this.path,e,this)}},c.prototype.$conditionalHandlers=a.options(i.prototype.$conditionalHandlers,{$gt:l,$gte:l,$lt:l,$lte:l}),c.prototype.castForQuery=function(t,e){if(2!==arguments.length)return this._castForQuery(t);var r=this.$conditionalHandlers[t];if(!r)throw new Error("Can't use "+t+" with Date.");return r.call(this,e)},
/*!
 * Module exports.
 */
t.exports=c},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"min",l),Object.defineProperty(c.prototype,"max",l),Object.defineProperty(c.prototype,"expires",l),
/*!
 * ignore
 */
t.exports=c},function(t,e,r){"use strict";var n=r(23);t.exports=function(t){return null==t||""===t?null:t instanceof Date?(n.ok(!isNaN(t.valueOf())),t):(n.ok("boolean"!=typeof t),e=t instanceof Number||"number"==typeof t?new Date(t):"string"==typeof t&&!isNaN(Number(t))&&(Number(t)>=275761||Number(t)<-271820)?new Date(Number(t)):"function"==typeof t.valueOf?new Date(t.valueOf()):new Date(t),isNaN(e.valueOf())?void n.ok(!1):e);var e}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n,o=r(168),i=r(6),s=r(88),a=r(10),u=r(1),c=i.CastError;function l(t,e){var r="string"==typeof t&&24===t.length&&/^[a-f0-9]+$/i.test(t),n=e&&e.suppressWarning;!r&&void 0!==t||n||(console.warn("mongoose: To create a new ObjectId please try `Mongoose.Types.ObjectId` instead of using `Mongoose.Schema.ObjectId`. Set the `suppressWarning` option if you're trying to create a hex char path in your schema."),console.trace()),i.call(this,t,e,"ObjectID")}
/*!
 * ignore
 */
function f(t){return this.cast(t)}
/*!
 * ignore
 */
function p(){return new a}function h(t){if(n||(n=r(12)),this instanceof n){if(void 0===t){var e=new a;return this.$__._id=e,e}this.$__._id=t}return t}
/*!
 * Module exports.
 */l.schemaName="ObjectId",l.defaultOptions={},
/*!
 * Inherits from SchemaType.
 */
l.prototype=Object.create(i.prototype),l.prototype.constructor=l,l.prototype.OptionsConstructor=o,l.get=i.get,l.set=i.set,l.prototype.auto=function(t){return t&&(this.default(p),this.set(h)),this},
/*!
 * ignore
 */
l._checkRequired=function(t){return t instanceof a},
/*!
 * ignore
 */
l._cast=s,l.cast=function(t){return 0===arguments.length||(!1===t&&(t=this._defaultCaster),this._cast=t),this._cast},
/*!
 * ignore
 */
l._defaultCaster=function(t){if(!(t instanceof a))throw new Error(t+" is not an instance of ObjectId");return t},l.checkRequired=i.checkRequired,l.prototype.checkRequired=function(t,e){return i._isRef(this,t,e,!0)?!!t:("function"==typeof this.constructor.checkRequired?this.constructor.checkRequired():l.checkRequired())(t)},l.prototype.cast=function(t,e,r){if(i._isRef(this,t,e,r))return t instanceof a?t:null!=t&&"objectid"===(t.constructor.name||"").toLowerCase()?new a(t.toHexString()):this._castRef(t,e,r);var n;n="function"==typeof this._castFunction?this._castFunction:"function"==typeof this.constructor.cast?this.constructor.cast():l.cast();try{return n(t)}catch(e){throw new c("ObjectId",t,this.path,e,this)}},l.prototype.$conditionalHandlers=u.options(i.prototype.$conditionalHandlers,{$gt:f,$gte:f,$lt:f,$lte:f}),p.$runBeforeSetters=!0,t.exports=l},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"auto",l),Object.defineProperty(c.prototype,"populate",l),
/*!
 * ignore
 */
t.exports=c},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(6),o=n.CastError,i=r(20),s=r(170),a=r(1);function u(t,e){n.call(this,t,e,"Decimal128")}
/*!
 * ignore
 */
function c(t){return this.cast(t)}u.schemaName="Decimal128",u.defaultOptions={},
/*!
 * Inherits from SchemaType.
 */
u.prototype=Object.create(n.prototype),u.prototype.constructor=u,
/*!
 * ignore
 */
u._cast=s,u.set=n.set,u.cast=function(t){return 0===arguments.length||(!1===t&&(t=this._defaultCaster),this._cast=t),this._cast},
/*!
 * ignore
 */
u._defaultCaster=function(t){if(null!=t&&!(t instanceof i))throw new Error;return t},
/*!
 * ignore
 */
u._checkRequired=function(t){return t instanceof i},u.checkRequired=n.checkRequired,u.prototype.checkRequired=function(t,e){return n._isRef(this,t,e,!0)?!!t:("function"==typeof this.constructor.checkRequired?this.constructor.checkRequired():u.checkRequired())(t)},u.prototype.cast=function(t,e,r){if(n._isRef(this,t,e,r))return t instanceof i?t:this._castRef(t,e,r);var s;s="function"==typeof this._castFunction?this._castFunction:"function"==typeof this.constructor.cast?this.constructor.cast():u.cast();try{return s(t)}catch(e){throw new o("Decimal128",t,this.path,e,this)}},u.prototype.$conditionalHandlers=a.options(n.prototype.$conditionalHandlers,{$gt:c,$gte:c,$lt:c,$lte:c}),
/*!
 * Module exports.
 */
t.exports=u},function(t,e,r){"use strict";(function(e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(20),i=r(23);t.exports=function(t){return null==t?t:"object"===n(t)&&"string"==typeof t.$numberDecimal?o.fromString(t.$numberDecimal):t instanceof o?t:"string"==typeof t?o.fromString(t):e.isBuffer(t)?new o(t):"number"==typeof t?o.fromString(String(t)):"function"==typeof t.valueOf&&"string"==typeof t.valueOf()?o.fromString(t.valueOf()):void i.ok(!1)}}).call(this,r(2).Buffer)},function(t,e,r){"use strict";(function(e){
/*!
 * ignore
 */
function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t,e,r){return(a="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=f(t)););return t}(t,e);if(n){var o=Object.getOwnPropertyDescriptor(n,e);return o.get?o.get.call(r):o.value}})(t,e,r||t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=f(t);if(e){var o=f(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return l(this,r)}}function l(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var p=r(89),h=r(172),y=r(6),d=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(h,t);var r,n,i,l=c(h);function h(t,e){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,h),(r=l.call(this,t,e,"Map")).$isSchemaMap=!0,r}return r=h,(n=[{key:"set",value:function(t,e){return y.set(t,e)}},{key:"cast",value:function(t,r,n){if(t instanceof p)return t;var i=this.path;if(n){var s=new p({},i,r,this.$__schemaType);if(t instanceof e.Map){var a,u=o(t.keys());try{for(u.s();!(a=u.n()).done;){var c=a.value,l=t.get(c);l=null==l?s.$__schemaType._castNullish(l):s.$__schemaType.cast(l,r,!0,null,{path:i+"."+c}),s.$init(c,l)}}catch(t){u.e(t)}finally{u.f()}}else for(var f=0,h=Object.keys(t);f<h.length;f++){var y=h[f],d=t[y];d=null==d?s.$__schemaType._castNullish(d):s.$__schemaType.cast(d,r,!0,null,{path:i+"."+y}),s.$init(y,d)}return s}return new p(t,i,r,this.$__schemaType)}},{key:"clone",value:function(){var t=a(f(h.prototype),"clone",this).call(this);return null!=this.$__schemaType&&(t.$__schemaType=this.$__schemaType.clone()),t}}])&&s(r.prototype,n),i&&s(r,i),h}(y);d.prototype.OptionsConstructor=h,d.defaultOptions={},t.exports=d}).call(this,r(9))},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=u(t);if(e){var o=u(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return a(this,r)}}function a(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var c=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(r,t);var e=s(r);function r(){return o(this,r),e.apply(this,arguments)}return r}(r(7)),l=r(8);Object.defineProperty(c.prototype,"of",l),t.exports=c},function(t,e,r){"use strict";(function(t){
/*!
 * Module dependencies.
 */
function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var o=r(15).get().Binary,i=r(20),s=r(10),a=r(30);
/*!
 * ignore
 */
function u(e){return e&&"object"===n(e)&&!(e instanceof Date)&&!(e instanceof s)&&(!Array.isArray(e)||e.length>0)&&!(e instanceof t)&&!(e instanceof i)&&!(e instanceof o)}e.flatten=
/*!
 * ignore
 */
function e(r,n,o,i){var s;s=r&&a(r)&&!t.isBuffer(r)?Object.keys(r.toObject({transform:!1,virtuals:!1})):Object.keys(r||{});var c=s.length,l={};n=n?n+".":"";for(var f=0;f<c;++f){var p=s[f],h=r[p];l[n+p]=h;var y=i&&i.path&&i.path(n+p),d=i&&i.nested&&i.nested[n+p];if(!y||"Mixed"!==y.instance){if(u(h)){if(o&&o.skipArrays&&Array.isArray(h))continue;var _=e(h,n+p,o,i);for(var v in _)l[v]=_[v];Array.isArray(h)&&(l[n+p]=h)}if(d)for(var m=Object.keys(i.paths),g=0,b=m;g<b.length;g++){var w=b[g];w.startsWith(n+p+".")&&!l.hasOwnProperty(w)&&(l[w]=void 0)}}}return l}
/*!
 * ignore
 */,e.modifiedPaths=function e(r,n,o){var i=Object.keys(r||{}),s=i.length;o=o||{},n=n?n+".":"";for(var c=0;c<s;++c){var l=i[c],f=r[l];o[n+l]=!0,a(f)&&!t.isBuffer(f)&&(f=f.toObject({transform:!1,virtuals:!1})),u(f)&&e(f,n+l,o)}return o}}).call(this,r(2).Buffer)},function(t,e,r){"use strict";var n=r(3);
/*!
 * Like `schema.path()`, except with a document, because impossible to
 * determine path type without knowing the embedded discriminator key.
 */t.exports=function t(e,r,o){for(var i=(o=o||{}).typeOnly,s=r.split("."),a=null,u="adhocOrUndefined",c=0;c<s.length;++c){var l=s.slice(0,c+1).join(".");if(null!=(a=e.schema.path(l))){if("Mixed"===a.instance)return i?"real":a;if(u=e.schema.pathType(l),(a.$isSingleNested||a.$isMongooseDocumentArrayElement)&&null!=a.schema.discriminators){var f=a.schema.discriminators,p=e.get(l+"."+n(a,"schema.options.discriminatorKey"));if(null==p||null==f[p])continue;var h=s.slice(c+1).join(".");return t(e.get(l),h,o)}}else u="adhocOrUndefined"}return i?u:a}},function(t,e,r){"use strict";
/*!
 * ignore
 */
/*!
 * Returns this documents _id cast to a string.
 */
function n(){return null!=this._id?String(this._id):null}t.exports=function(t){!t.paths.id&&!t.options.noVirtualId&&t.options.id&&t.virtual("id").get(n)}},function(t,e,r){"use strict";var n=r(58);
/*!
 * ignore
 */t.exports=function(t){if(null==t)return null;var e=Object.keys(t),r=e.length,o=null;if(1===r&&"_id"===e[0])o=!!t[e[r]];else for(;r--;)if("_id"!==e[r]&&n(t[e[r]])){o=!t[e[r]];break}return o}},function(t,e,r){"use strict";
/*!
 * Module dependencies
 */function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(!t)return;if("string"==typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){u=!0,s=t},f:function(){try{a||null==r.return||r.return()}finally{if(u)throw s}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var s=r(178),a=r(3),u=r(36),c=r(58),l=r(29);
/*!
 * Set each path query option to lean
 *
 * @param {Object} option
 */
function f(t){return function(e){e.options||(e.options={}),null!=t&&Array.isArray(t.virtuals)&&((t=Object.assign({},t)).virtuals=t.virtuals.filter((function(t){return"string"==typeof t&&t.startsWith(e.path+".")})).map((function(t){return t.slice(e.path.length+1)}))),e.options.lean=t}}
/*!
 * Handle the `WriteOpResult` from the server
 */
/*!
 * Prepare a set of path options for query population.
 *
 * @param {Query} query
 * @param {Object} options
 * @return {Array}
 */
e.preparePopulationOptions=function(t,e){var r=t.options.populate,n=Object.keys(r).reduce((function(t,e){return t.concat([r[e]])}),[]);return null!=e.lean&&n.filter((function(t){return null==a(t,"options.lean")})).forEach(f(e.lean)),n.forEach((function(e){e._localModel=t.model})),n},
/*!
 * Prepare a set of path options for query population. This is the MongooseQuery
 * version
 *
 * @param {Query} query
 * @param {Object} options
 * @return {Array}
 */
e.preparePopulationOptionsMQ=function(t,e){var r=t._mongooseOptions.populate,n=Object.keys(r).reduce((function(t,e){return t.concat([r[e]])}),[]);null!=e.lean&&n.filter((function(t){return null==a(t,"options.lean")})).forEach(f(e.lean));var o=a(t,"options.session",null);null!=o&&n.forEach((function(t){null!=t.options?"session"in t.options||(t.options.session=o):t.options={session:o}}));var i=t._fieldsForExec();return n.forEach((function(t){t._queryProjection=i})),n.forEach((function(e){e._localModel=t.model})),n},
/*!
 * If the document is a mapped discriminator type, it returns a model instance for that type, otherwise,
 * it returns an instance of the given model.
 *
 * @param {Model}  model
 * @param {Object} doc
 * @param {Object} fields
 *
 * @return {Document}
 */
e.createModel=function(t,r,n,o,i){t.hooks.execPreSync("createModel",r);var s=t.schema?t.schema.discriminatorMapping:null,a=s&&s.isRoot?s.key:null,c=r[a];if(a&&c&&t.discriminators){var f=t.discriminators[c]||u(t.discriminators,c);if(f){var p=l(o);return e.applyPaths(p,f.schema),new f(void 0,p,!0)}}return void 0===i&&((i={}).defaults=!0),new t(void 0,n,{skipId:!0,isNew:!1,willInit:!0,defaults:i.defaults})},
/*!
 * ignore
 */
e.applyPaths=function(t,e){var r,i,u;if(t)for(u=(i=Object.keys(t)).length;u--;)if("+"!==i[u][0]){var l=t[i[u]];if(c(l)){r=!l;break}}var f=[],p=[],h=[];switch(function e(n,o){if(o||(o=""),-1!==h.indexOf(n))return[];h.push(n);var i=[];return n.eachPath((function(n,a){o&&(n=o+"."+n);var u=E(n,a);if(null==u&&a.$isMongooseArray&&!a.$isMongooseDocumentArray&&(u=E(n,a.caster)),null!=u&&i.push(u),a.schema){var c=e(a.schema,n);!1===r&&s(t,n,a.schema,f,c)}})),h.pop(),i}(e),r){case!0:var y,d=o(p);try{for(d.s();!(y=d.n()).done;){var _=y.value;t[_]=0}}catch(t){d.e(t)}finally{d.f()}break;case!1:e&&e.paths._id&&e.paths._id.options&&!1===e.paths._id.options.select&&(t._id=0);var v,m=o(f);try{for(m.s();!(v=m.n()).done;){var g=v.value;t[g]=t[g]||1}}catch(t){m.e(t)}finally{m.f()}break;case void 0:if(null==t)break;for(var b=0,w=Object.keys(t||{});b<w.length;b++){var O=w[b];O.startsWith("+")&&delete t[O]}var S,A=o(p);try{for(A.s();!(S=A.n()).done;){var $=S.value;t[$]=0}}catch(t){A.e(t)}finally{A.f()}}function E(e,o){var s="+"+e,u=t&&s in t;if(u&&delete t[s],"boolean"==typeof o.selected){if(u)return delete t[s],void(!1===r&&i.length>1&&!~i.indexOf(e)&&(t[e]=1));for(var c=e.split("."),l="",h=0;h<c.length;++h)if(l+=l.length?"."+c[h]:c[h],-1!==p.indexOf(l))return;if(!r&&a(o,"options.$skipDiscriminatorCheck",!1))for(var y="",d=0;d<c.length;++d){y+=(0===y.length?"":".")+c[d];var _=a(t,y,!1)||a(t,y+".$",!1);if(_&&"object"!==n(_))return}return(o.selected?f:p).push(e),e}}},e.handleDeleteWriteOpResult=function(t){return function(e,r){if(e)return t(e);var n=Object.assign({},r.result);return null!=a(r,"result.n",null)&&(n.deletedCount=r.result.n),null!=r.deletedCount&&(n.deletedCount=r.deletedCount),t(null,n)}}},function(t,e,r){"use strict";t.exports=function(t,e,r,n,o){var i=Object.keys(t).reduce((function(t,r){return t||r.startsWith(e+".")}),!1),s=e+"."+r.options.discriminatorKey;i||1!==o.length||o[0]!==s||n.splice(n.indexOf(s),1)}},function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t.exports=function(t){return!!t&&("object"===n(t)||"function"==typeof t)&&"function"==typeof t.then}},function(t,e,r){"use strict";
/*!
 * Module dependencies.
 */var n=r(12),o=r(19).EventEmitter,i=r(5),s=r(53),a=r(10),u=i.ValidationError,c=r(77),l=r(21);function f(t,e,r,o,u){if(!(this instanceof f))return new f(t,e,r,o,u);if(l(e)&&!e.instanceOfSchema&&(e=new s(e)),e=this.schema||e,!this.schema&&e.options._id&&void 0===(t=t||{})._id&&(t._id=new a),!e)throw new i.MissingSchemaError;for(var p in this.$__setSchema(e),n.call(this,t,r,o,u),c(this,e,{decorateDoc:!0}),e.methods)this[p]=e.methods[p];for(var h in e.statics)this[h]=e.statics[h]}
/*!
 * Inherit from the NodeJS document
 */f.prototype=Object.create(n.prototype),f.prototype.constructor=f,
/*!
 * ignore
 */
f.events=new o,
/*!
 * Browser doc exposes the event emitter API
 */
f.$emitter=new o,["on","once","emit","listeners","removeListener","setMaxListeners","removeAllListeners","addListener"].forEach((function(t){f[t]=function(){return f.$emitter[t].apply(f.$emitter,arguments)}})),
/*!
 * Module exports.
 */
f.ValidationError=u,t.exports=f}])}));
},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var $ = require("jquery");
var Styling_1 = require("../utils/Styling");
var mongoose = require('mongoose');
var Shortener = /** @class */ (function () {
    function Shortener() {
        this.inputFields = [];
        this.submitButtons = [];
        this.init();
    }
    Shortener.prototype.init = function () {
        var mainDiv = document.getElementById('main');
        this.getUberDiv("long to short").appendTo(mainDiv);
        this.getUberDiv("short to long").appendTo(mainDiv);
        this.setPlusIcon();
        //this.getUberDiv("keyword search").appendTo(mainDiv);
        // this.getConvertButton().appendTo(mainDiv);
    };
    Shortener.prototype.setForm = function (action) {
        var form;
        if (action === "long to short") {
            form = $('<form class="my-form" id="post-form" action="/" method="POST"></form>');
        }
        else {
            form = $("<form class=\"my-form\" id=\"read-form\" action=\"/\" method=\"GET\"></form>");
        }
        return form;
    };
    Shortener.prototype.getUberDiv = function (label) {
        var uberDiv = $('<div class="uber-div"></div>');
        // const subDivLeft: JQuery<HTMLElement> = $('<div class="sub-div-left"></div>');
        var subDivRight = $('<div class="sub-div-right"></div>');
        var form = this.setForm(label);
        // const returnValueDiv: JQuery<HTMLElement> = $('<div class="return-div"></div>');
        var input = $('<input name="url" class="data-input">');
        var inputName = $("<h3 class=\"form-headings\">" + label + "</h3>");
        var button;
        if (label === "long to short") {
            button = this.getPostButton();
        }
        else {
            button = this.getReadButton(form);
        }
        this.inputFields.push(input);
        this.submitButtons.push(button);
        inputName.appendTo(form);
        input.appendTo(form);
        button.appendTo(form);
        form.appendTo(subDivRight);
        // returnValueDiv.appendTo(subDivRight);
        // subDivLeft.appendTo(uberDiv);
        subDivRight.appendTo(uberDiv);
        return uberDiv;
    };
    Shortener.prototype.getPostButton = function () {
        var _this = this;
        var button = $('<button type="submit">go</button>');
        button.click(function () {
            _this.handleClickPostButton();
        });
        return button;
    };
    Shortener.prototype.handleClickPostButton = function () {
        var inputFields = document.getElementsByClassName('data-input');
        var inputURL = String($(inputFields[0]).val());
        var urlIsValid = this.isValidUrl(inputURL);
        if (!urlIsValid) {
            alert("url is not valid");
            $("#post-form").submit(function () { return false; });
        }
        location.reload();
    };
    Shortener.prototype.getReadButton = function (form) {
        var _this = this;
        var button = $('<button type="submit">go</button>');
        button.click(function () {
            var inputVal = String(_this.inputFields[1].val());
            _this.handleClickReadButton(inputVal);
            form.attr('action', inputVal);
        });
        return button;
    };
    Shortener.prototype.handleClickReadButton = function (shortUrl) {
    };
    Shortener.prototype.shortToLongConversion = function () {
    };
    Shortener.prototype.keywordSearch = function () {
    };
    Shortener.prototype.isValidUrl = function (string) {
        var url;
        try {
            url = new URL(string);
        }
        catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    };
    Shortener.prototype.setPlusIcon = function () {
        var plusIcon = $('#svg-icon');
        plusIcon.click(function () {
            $("#instructions-par").toggle();
        });
    };
    return Shortener;
}());
function init() {
    new Shortener;
    Styling_1["default"].letterAnimationHeading();
    var heading = $('#heading');
}
init();

},{"../utils/Styling":4,"jquery":1,"mongoose":2}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Styling = /** @class */ (function () {
    function Styling() {
    }
    Styling.letterAnimationHeading = function () {
        var heading = $('#heading');
        var headingText = heading.text();
        var headingTextSplit = headingText.split("");
        var headingTextForRemove = headingTextSplit;
        var i = 0;
        this.removeLetterAnimationLoop(i, headingTextForRemove, heading, headingTextSplit);
    };
    Styling.removeLetterAnimationLoop = function (i, headingTextForRemove, heading, headingTextSplit) {
        var _this = this;
        if (i < 15) {
            setTimeout(function () {
                var headingTextAfterRemove = headingTextForRemove.join("");
                heading.text(headingTextAfterRemove);
                headingTextForRemove.pop();
                i++;
                _this.removeLetterAnimationLoop(i, headingTextForRemove, heading, headingTextSplit);
            }, 100);
        }
        else {
            i = 15;
            this.addLetterAnimationLoop(i, heading);
        }
    };
    Styling.addLetterAnimationLoop = function (i, heading) {
        var _this = this;
        var str = "THE SHORTINATOR";
        var headingTextSplit = str.split("");
        setTimeout(function () {
            for (var j = 1; j < i; j++) {
                headingTextSplit.pop();
            }
            var headingText = headingTextSplit.join("");
            heading.text(headingText);
            i--;
            if (i > 0) {
                _this.addLetterAnimationLoop(i, heading);
            }
        }, 100);
    };
    return Styling;
}());
exports["default"] = Styling;

},{}]},{},[3]);
