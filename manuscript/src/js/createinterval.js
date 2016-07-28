/** check the number of arguments */
if( arguments.length!=3) {
	java.lang.System.err.println("Usage: chr start end");
	java.lang.System.exit(-1);
	}

/** search the htsjdk class htsjdk.samtools.util.Interval */
var Interval = Java.type("htsjdk.samtools.util.Interval");

/** create a new instance of htsjdk.samtools.util.Interval */

var region = new Interval(
	arguments[0],
	parseInt(arguments[1]),
	parseInt(arguments[2])
	);

/** print it */

print(region);
