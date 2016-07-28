

var HandlerClass = Java.type("com.sun.net.httpserver.HttpHandler");
var HttpServer = Java.type("com.sun.net.httpserver.HttpServer");
var InetSocketAddress = Java.type("java.net.InetSocketAddress");
var vcfFilesList=[];


var optind=0;

while(optind< arguments.length)
	{
	vcfFilesList.push(new java.io.File(arguments[optind++]));
	}

if(vcfFilesList.length==0)
	{
	java.lang.System.err.println("No VCF input");
	//java.lang.System.exit(-1);
	}

function query2map(httpExchange) {
	var map={};
	var requesturi= httpExchange.getRequestURI();
	if( requesturi == null) return map;
	var query = requesturi.getQuery();
	if( query == null) return map;
	var tokens = query.split("&");
	for(var i in tokens)
		{
		var s = tokens[i];
		if ( s.length == 0 ) continue; 
		var eq = s.indexOf("=");
		if(eq==-1) {
			map[s]="";
			}
		else
			{
			map[s.substring(0,eq) ] = s.substring(eq+1);
			}
		}
	return map;
	}

var MyHandler  = Java.extend(HandlerClass, {
	handle : function(t) {
           	var response = "This is the response " +JSON.stringify(query2map(t));
	        t.sendResponseHeaders(200, response.length());
                var os = t.getResponseBody();
                os.write(response.getBytes());
                os.close();
		}
	});

var port = 8080;
var address = new InetSocketAddress(port)
server = HttpServer.create(address,0);
server.createContext("/", new MyHandler());
server.setExecutor(null);
server.start();
print("Starting server. Print Ctrl-C to stop");

for(;;) {

}
