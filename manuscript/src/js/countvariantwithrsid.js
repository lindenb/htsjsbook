/** check the number of arguments */
if( arguments.length!=1) {
	java.lang.System.err.println("Usage: <vcf file>");
	java.lang.System.exit(-1);
	}

/** get the java class  htsjdk.variant.vcf.VCFFileReader https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/variant/vcf/VCFFileReader.html */
var VCFFileReader = Java.type("htsjdk.variant.vcf.VCFFileReader");

/** create a File object */
var vcfFile =new java.io.File(arguments[0]);

/** create a new VCFFileReader for this file https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/variant/vcf/VCFFileReader.html#VCFFileReader-java.io.File-boolean- */
var requireIndex = false;
var vcfReader =  new VCFFileReader( vcfFile, requireIndex );

/** get an iterator over the variants in this vcf file https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/variant/vcf/VCFFileReader.html#iterator-- */
var iter = vcfReader.iterator();

var numVariants = 0;

/** while there is something to read */
while(iter.hasNext())
	{
	/** get the next variant */
	var variant = iter.next();
	/* ignore this variant if doesn't have a dbsnp ID */
	if( ! variant.hasID()) continue;
	var id = variant.getID();
	if( id.match(/rs[0-9]+/) == null ) continue;

	numVariants++;
	}

/** close the iterator */
iter.close();

/** close the vcfReader */
vcfReader.close();

/** print the number of variants  */

print( numVariants ) ;
