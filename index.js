#!/usr/bin/env node
process.stdin.setEncoding('utf8')

var wrap = require('word-wrap')
  , path = require('path')
  , fs = require('fs')

  , help = 'Usage: "sailor blah blah...", or piped: "textprogram | sailor"\n\n'
    + '  Art is copyright by Project Anime Online! This derivative work is '
    + 'for\n  educational purposes only, and is protected by fair use. '
    + 'Sailor moon belongs to\n  its creators, I hold no copyright! '
    + '\n\nYou can find the original art here:\n  '
    + 'http://projectanime.com/sailormoon/sm-ascii.htm\n\n'

  , main = 'moon1'

// implemented as a pure function, for fun and profit
process.stdin.on('readable', function () { 
  process.stdout.write(
    process.argv.length > 2 ? ( // are there cli args
      ( process.argv[2] === '-h' 
        || process.argv[2] === '-help' 
        || process.argv[2] === '--help' ) ? 
      help : ( 
        process.argv[2] === '-a' ? (
          process.argv.length > 4 ?
          format(
            process.argv.slice(4, process.argv.length).join(' ')
          , process.argv[3]
          ) : format(process.stdin.read(), process.argv[3])
        ) : format(process.argv.slice(2, process.argv.length).join(' '), main)
      )
    ) : (  // or a pipe
      format(process.stdin.read(), main) 
    )
  )
})

// formats text into array of text lines and parses it thru "style", which creates art
// "null" is process.stdin.read's EOF value, run a newline with it!
function format (text, art) { 
  return text === null ? '\n' : style(
    [Array(46).join('_')].concat(
      wrap(text.replace(/\s+/g, ' '), { width: 40 })
      .split('\n')
      .map(function(string){ 
        return '| ' + string.replace(/^(\s*)|(\s*)$/g, '') 
          + Array(44 - string.length).join(' ') + ' |'
      })
    , Array(46).join('-')
    )
  , load(art).split('\n')
  )
}

// takes array of lines and inserts it into ultra cute text art
function style (lines, art) {
  return art.map(function (line, index) {
    return line 
      + Array(80 - line.length).join(' ') 
      + (lines[index - 5] !== undefined ? lines[index - 5] : '')
  }).join('\n')
}

function load (art) {
  return fs.readFileSync(
    path.join(path.dirname(process.argv[1]), 'art', art)
  , { encoding: 'utf8' }
  )
}
