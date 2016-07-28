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

/** get the SAM header https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/samtools/SamReader.html#getFileHeader-- */
var samHeader = samReader.getFileHeader();

/** print the sort order for this file https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/samtools/SAMFileHeader.html#getSortOrder-- */
print("File "+bamFile+" : "+  samHeader.getSortOrder() );

/** close the samReader */
samReader.close();

