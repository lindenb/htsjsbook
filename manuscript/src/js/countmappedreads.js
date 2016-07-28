/** check the number of arguments */
if( arguments.length!=1) {
	java.lang.System.err.println("Usage: <bam file>");
	java.lang.System.exit(-1);
	}


/** create a SamReaderFactory https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/samtools/SamReaderFactory.html */
var samReaderFactory = Java.type("htsjdk.samtools.SamReaderFactory").makeDefault();

/** create a File object */
var bamFile =new java.io.File(arguments[0]);
/** open this file. https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/samtools/SamReaderFactory.html#open-java.io.File- */
var samReader =  samReaderFactory.open(bamFile);

/** get a SamRecord iterator https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/samtools/SamReader.html#iterator-- */
var iter = samReader.iterator();

var numberOfReads = 0;
/** while there is something to read */
while(iter.hasNext())
	{
	/** get next read */
	var samRecord = iter.next();
	/* ignore this read if it's unmapped  https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/samtools/SAMRecord.html#getReadUnmappedFlag-- */
	if( samRecord.getReadUnmappedFlag()) continue;
	numberOfReads++;
	}

/** close the iterator */
iter.close();

/** close the samReader */
samReader.close();

/** print number of reads  */

print( numberOfReads ) ;

