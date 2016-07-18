var SAMFileWriterFactory = Java.type('htsjdk.samtools.SAMFileWriterFactory');
var inputFile= new java.io.File(arguments[0]);
var samReader = Java.type('htsjdk.samtools.SamReaderFactory').makeDefault().open(inputFile);
var samWriter = new SAMFileWriterFactory().makeSAMWriter(samReader.getFileHeader(),true,java.lang.System.out);
var iter = samReader.iterator();
var array=[];
for(;;)
	{
	var rec = null;
	if(iter.hasNext()) rec=iter.next();
	if(rec==null  || (array.length>0 && array[0].getReadName()!=rec.getReadName()))
		{
		if(array.length>0) {
			var lowest_index =-1,n_lowest=0;
			for(var i in array) {
				var rec2= array[i];
				if(lowest_index ==-1 || rec2.getMappingQuality() < array[lowest_index].getMappingQuality() )
					{
					lowest_index=i;
					n_lowest=1;
					}
				else if(rec2.getMappingQuality() == array[lowest_index].getMappingQuality() )
					{
					n_lowest++;
					}
				}
			if( n_lowest!=-1 && n_lowest<3) 
				{
				samWriter.addAlignment(array[lowest_index]);
				}
			}
		if(rec==null) break;
		array=[];
		
		}
	array.push(rec);
	
	}
samReader.close();
samWriter.close();

