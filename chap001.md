
## The jjs command line

The **jjs** command-line tool is used to invoke the **Nashorn engine**. You can use it to interpret one or several script files, or to run an interactive shell.

### getting help

```
$ jjs -h
jjs [<options>] <files> [-- <arguments>]
	-D (-Dname=value. Set a system property. This option can be repeated.)

	-cp, -classpath (-cp path. Specify where to find user class files.)

	-doe, -dump-on-error (Dump a stack trace on errors.)
		param: [true|false]   default: false

	-fv, -fullversion (Print full version info of Nashorn.)
		param: [true|false]   default: false

	-fx (Launch script as an fx application.)
		param: [true|false]   default: false

	-h, -help (Print help for command line flags.)
		param: [true|false]   default: false

	--language (Specify ECMAScript language version.)
		param: [es5|es6]   default: es5

	-ot, --optimistic-types (Use optimistic type assumptions with deoptimizing recompilation. 
	                        This makes the compiler try, for any program symbol whose type cannot 
	                        be proven at compile time, to type it as narrow and primitive as 
	                        possible. If the runtime encounters an error because symbol type 
	                        is too narrow, a wider method will be generated until steady stage 
	                        is reached. While this produces as optimal Java Bytecode as possible, 
	                        erroneous type guesses will lead to longer warmup. Optimistic typing 
	                        is currently disabled by default, but can be enabled for significantly 
	                        better peak performance.)
		param: [true|false]   default: false

	-scripting (Enable scripting features.)
		param: [true|false]   default: false

	-strict (Run scripts in strict mode.)
		param: [true|false]   default: false

	-t, -timezone (Set timezone for script execution.)
		param: <timezone>   default: Europe/Paris

	-v, -version (Print version info of Nashorn.)
		param: [true|false]   default: false

```

### Hello

```
$ echo "print('hello world');" | jjs
jjs> hello world
jjs> 
```

```
$ jjs
jjs> print("Hello world");
Hello world
jjs>
```


### js

 <<[This Code Sample Has A Title](src/js/biostar201139.js)
