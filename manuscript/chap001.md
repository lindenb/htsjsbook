
## The jjs command line

The **jjs** command-line tool is used to invoke the **Nashorn engine**.
You can use it to interpret one or several script files, or to run an interactive shell.

## Installing htsjdk

**HTSJDK** is a Java API for high-throughput sequencing data (HTS) formats.

> HTSJDK is an implementation of a unified Java library for accessing common file formats, such as SAM and VCF, used for high-throughput sequencing data. There are also an number of useful utilities for manipulating HTS data.

htsjdk is available at https://github.com/samtools/htsjdk/

You can download the pre-compiled libraries from maven central.

<<[Downloading the htsjdk libraries](src/sh/download.sh)

at the time of writing, the following java libraries will be fetched:

```
./lib/commons-logging/commons-logging/1.1.1/commons-logging-1.1.1.jar
./lib/com/github/samtools/htsjdk/2.5.1/htsjdk-2.5.1.jar
./lib/gov/nih/nlm/ncbi/ngs-java/1.2.4/ngs-java-1.2.4.jar
./lib/org/xerial/snappy/snappy-java/1.0.3-rc3/snappy-java-1.0.3-rc3.jar
./lib/org/apache/commons/commons-jexl/2.1.1/commons-jexl-2.1.1.jar
./lib/org/apache/commons/commons-compress/1.4.1/commons-compress-1.4.1.jar
./lib/org/tukaani/xz/1.5/xz-1.5.jar
```


## Hello World

running  **jjs** from stdin

```
$ echo "print('hello world');" | jjs
jjs> hello world
jjs> 
```

interactively

```
$ jjs
jjs> print("Hello world");
Hello world
jjs>
```

## Accessing the HTSJK Java Classes


**jjs** can easily use the **standard** java classes.

```
$ echo "java.lang.System.out.println(java.lang.String.format('%02.3f',2.01))" | jjs -scripting
jjs> 2.010
jjs>
```

for non standard class, one must retrieve the class using the `Java.type` directive:

> The Java.type() function takes a string with the fully qualified Java class name, and returns the corresponding JavaClass function object

but if we try to access a htsjdk class, such as [htsjdk.variant.vcf.VCFConstants](https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/variant/vcf/VCFConstants.html) we'll get an error.

```
$ echo 'Java.type("htsjdk.variant.vcf.VCFConstants")'  | jjs
jjs> java.lang.RuntimeException: java.lang.ClassNotFoundException: htsjdk.variant.vcf.VCFConstants
jjs> 
```

why ? because we need to tell jjs where it can find the htsjdk libaries. So, we're going to create a variable `${HTSJDKCLASSPATH}` containing the paths to the htsjdk libraries.

```
export HTSJDKCLASSPATH=lib/commons-logging/commons-logging/1.1.1/commons-logging-1.1.1.jar:lib/com/github/samtools/htsjdk/2.5.1/htsjdk-2.5.1.jar:lib/gov/nih/nlm/ncbi/ngs-java/1.2.4/ngs-java-1.2.4.jar:lib/org/xerial/snappy/snappy-java/1.0.3-rc3/snappy-java-1.0.3-rc3.jar:lib/org/apache/commons/commons-jexl/2.1.1/commons-jexl-2.1.1.jar:lib/org/apache/commons/commons-compress/1.4.1/commons-compress-1.4.1.jar:lib/org/tukaani/xz/1.5/xz-1.5.jar
```

and we use this variable `${HTSJDKCLASSPATH}` when invoking jjs with the `-classpath` (or `-cp`) option.

```
$ echo 'Java.type("htsjdk.variant.vcf.VCFConstants")'  | jjs  -classpath ${HTSJDKCLASSPATH}
jjs> [JavaClass htsjdk.variant.vcf.VCFConstants]
jjs>
```

ok, it seems to work, now let's print the value of [htsjdk.variant.vcf.VCFConstants.FILTER_HEADER_START](https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/variant/vcf/VCFConstants.html#FILTER_HEADER_START ) ?

```
$ echo 'print(Java.type("htsjdk.variant.vcf.VCFConstants").FILTER_HEADER_START)'  | jjs  -classpath ${HTSJDKCLASSPATH}
jjs> ##FILTER
jjs> 
```


## Creating Java Objects

> To instantiate a class, pass the JavaClass function object to the new operator. Nashorn/jjs invokes the corresponding constructor based on the arguments passed to the function.

Let's create and print a  [htsjdk.samtools.util.Interval](https://samtools.github.io/htsjdk/javadoc/htsjdk/htsjdk/samtools/util/Interval.html)

```
$ jjs  -classpath ${HTSJDKCLASSPATH}
jjs> var Interval = Java.type("htsjdk.samtools.util.Interval");
jjs> var region = new Interval("chr1",1234,5678);
jjs> print(region);
chr1:1234-5678	+	.
```

## Creating Programs

javascript programs can be placed in plain files.

<<[createinterval.js](src/js/createinterval.js)

```
$ jjs  -classpath ${HTSJDKCLASSPATH}  ../js/createinterval.js 
Usage: chr start end
```

we use `--` to separate our arguments from jjs's arguments.

```
# WRONG
$ jjs  -classpath ${HTSJDKCLASSPATH}  js/createinterval.js chr1 567 890
Usage: chr start end
#CORRECT
$ jjs  -classpath ${HTSJDKCLASSPATH}  js/createinterval.js -- chr1 567 890
chr1:567-890	+	.
```


### Example: Opening a BAM file.

Source: [src/js/openbam.js](https://github.com/lindenb/htsjsbook/blob/master/manuscript/src/js/openbam.js)

<<[Open a Bam file](src/js/openbam.js)

### Example: Counting the number of mapped reads in a BAM file.

Source: [src/js/countmappedreads.js](https://github.com/lindenb/htsjsbook/blob/master/manuscript/src/js/countmappedreads.js)

<<[Count mapped reads](src/js/countmappedreads.js)

```
$  jjs  -classpath ${HTSJDKCLASSPATH}  ../js/countmappedreads.js -- input.bam
7893281

real	2m9.692s
user	1m56.907s
sys	0m3.808s
```

of course, javascript is much slower than samtools/C:

```
$ time ~/package/samtools/samtools-1.3.1/samtools  view  -c -F 4 input.bam
7893281

real	1m1.804s
user	0m54.899s
sys	0m2.292s
```


### Example: Opening a VCF file.

Source: [src/js/openvcf.js](https://github.com/lindenb/htsjsbook/blob/master/manuscript/src/js/openvcf.js)

<<[Open a VCF file](src/js/openvcf.js)

### Example: Count Variants having a dbsnp ID in a VCF file

Source: [src/js/countvariantwithrsid.js](https://github.com/lindenb/htsjsbook/blob/master/manuscript/src/js/countvariantwithrsid.js)

<<[Count Variants having a dbsnp ID in a VCF file](src/countvariantwithrsid.js)

```
$ time jjs  -classpath ${HTSJDKCLASSPATH}  ../js/countvariantwithrsid.js -- input.vcf.gz
1429

real	0m1.569s
user	0m2.520s
sys	0m0.204s
```

again javascript+java is slow

```
$ time (gunzip -c input.vcf.gz | awk '($3 ~ /^rs[0-9]+/)' | wc -l)
1429

real	0m0.037s
user	0m0.028s
sys	0m0.016s
```

but we take advantage of the htsjdk API.


