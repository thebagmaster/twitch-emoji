require('shelljs/global');
var package = require( __dirname + '/package.json' );
var jsonfile = require('jsonfile');

const _exec = function( command )
{
	if (exec(command).code !== 0) 
	{
	  echo('Error: command failed');
	  echo(command);
	  exit(1);
	}
};


const splitVersion = package.version.split( '.' );

splitVersion[2]++;

const finalVersion = splitVersion.join('.');

package.version = finalVersion;

jsonfile.writeFileSync( __dirname + '/package.json', package );

_exec( 'cd /Users/james/blurrt/twitch-emoji' );
_exec( '/usr/local/bin/gulp gen-sub' );
_exec( '/usr/local/bin/gulp build' );
_exec( 'npm test' );
_exec( 'git add .' );
_exec( 'git commit -am "Autoupdated emojis"' );
_exec( 'git push origin master' );
_exec( 'git tag ' + finalVersion );
_exec( 'git push origin master --tags' );
_exec( 'npm publish' );
_exec( 'osascript -e \'tell app "System Events" to display dialog "Twitch Emoji Updated Successfully"\'' );