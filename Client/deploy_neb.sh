# /bin/bash
function usage(){
	echo "usage:sh deploy.sh [web-desktop|web-mobile]"
}
if [ $# -ne 1 ];then
	usage
	exit 1
fi
TARGET=''
if [ $1 == "web-desktop" ];then
	TARGET=$1
elif [ $1 == "web-mobile" ];then
	TARGET=$1
else
	usage
	exit 1
fi
ROOT=`pwd`
RES='deploy_res'
if [ ! -d $RES ];then
	echo "mkdir $RES"
	mkdir $RES
fi
cd $RES;
NEBJS='neb.js'
if [ ! -d $NEBJS ];then
	echo "nebjs not exist"
	git clone https://github.com/nebulasio/neb.js.git
fi
cd $NEBJS;
NEB_FILE='nebulas.min.js'

if [ ! -f dist/$NEB_FILE ];then
	npm install;
	npm run build;
	npm install minify --save;
	echo "const minify = require('minify');
	minify('dist/nebulas.js', (error, data) => {
    	if (error){ return console.error(error.message);}
    	console.log(data);
	});" > neb_minify.js
	node neb_minify.js>dist/$NEB_FILE
fi
cd $ROOT/$RES
NEBPAY='nebPay'
if [ ! -d $NEBPAY ];then
	echo "nebpay not exist"
	git clone https://github.com/nebulasio/nebPay.git
fi
cd $ROOT
DIST="$ROOT/build/$TARGET/dist"
if [ ! -d $DIST ];then
	echo "mkdir $DIST"
	mkdir -p $DIST
fi
cp $ROOT/$RES/$NEBJS/dist/nebulas.min.js $DIST/
cp $ROOT/$RES/$NEBPAY/dist/nebPay.min.js $DIST/
SED='s/<\/head>/<script type=\"text\/javascript\" src=\".\/dist\/nebulas.min.js\"><\/script>'
SED+='<script type=\"text\/javascript\" src=\".\/dist\/nebPay.min.js\"><\/script>'
SED+='<script type=\"text\/javascript\">'
SED+='var HttpRequest = require(\"nebulas\").HttpRequest;var Neb = require(\"nebulas\").Neb;var Account = require(\"nebulas\").Account;var Transaction = require(\"nebulas\").Transaction;var Unit = require(\"nebulas\").Unit;var NebPay = require(\"nebpay\");'
SED+='<\/script>'
FAVICON='favicon.ico'
FAVICON_PATH="$ROOT/$RES/$FAVICON"
if [ -f $FAVICON_PATH ];then
    echo "$FAVICON exist"
	cp $FAVICON_PATH $DIST/
	SED+='<link rel=\"icon\" type=\"image\/x-icon\" href=\".\/dist\/favicon.ico\">'
else
    echo "$FAVICON not exist"
fi
SED+='<\/head>/g'
# echo "$SED"
cd build/$TARGET
INDEX=index.html
NUM=`cat index.html | grep nebulas | wc -l`
if [ $NUM -eq 0 ];then
	echo "deploy..."
	sed -e "$SED" "$INDEX" > "$INDEX.sed"
	mv "$INDEX.sed" "$INDEX"
	echo "deploy complete"
else
	echo "already deploy..."
fi 
cd $ROOT
