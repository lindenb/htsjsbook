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

/** get the VCF header https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/variant/vcf/VCFFileReader.html#getFileHeader-- */
var vcfHeader = vcfReader.getFileHeader();

/** print the number of samples in this VCF file https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/variant/vcf/VCFHeader.html#getNGenotypeSamples--  */
print("File "+vcfFile+" : "+  vcfHeader.getNGenotypeSamples() );

/** close the vcfReader */
vcfReader.close();

