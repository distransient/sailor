#!/usr/bin/env node

var wrap = require('word-wrap')
  , argv = process.argv
  , stdin = process.stdin

// just pretend this is a "monad"
if (argv.length > 2) {
  if (argv[2] === '-h' || argv[2] === '-help' || argv[2] === '--help')
    process.stdout.write('Usage: "$0 text", or piped: "textprogram | $0"\n'
      + '  Art is copyright by Project Anime Online! This derivative work is '
      + 'for\n  educational purposes only, and is protected by fair use. '
      + 'Sailor moon belongs to\n  its creators, I hold no copyright! '
      + 'You can find the original art here:\n    '
      + 'http://projectanime.com/sailormoon/sm-ascii.htm\n')
  else print(argv.slice(2, argv.length).join(' '))
} else {
  var data = []
  stdin.setEncoding('utf8')
  stdin.on('readable', function() {
    var chunk = stdin.read()
    if (chunk !== null) print(chunk) 
    else process.exit(1)
  })
}

function print (data) { 
  console.log(wrap(data, { width: 40 }).split('\n'))
  process.exit(0)
}
