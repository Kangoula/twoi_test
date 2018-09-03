// * * * * * * * * * * * * * * * * *
// Two-I: node.js test
// @author: Julien Pirson
// * * * * * * * * * * * * * * * * *

// You will need Linux and Node.js package


// * * * * * * * * * * * * * * * * *
// exercice 4
// * * * * * * * * * * * * * * * * *
//
// Goal:
// You have to list your download folder (or any other folder) using child process
// then write them in a basic text file
//
// good luck !

const { spawn } = require('child_process');
const fs = require('fs');

const writeToFile =  data => {
  fs.writeFile('./list', data, (err, data) => {
    if(err){
      console.error('an error occured during write', err);
    } else {
      console.log('file saved');
    }
  });
};

const listDirectory = path => {

  const child = spawn('ls', ['--file-type'], {cwd: path});

  child.on('exit', (code, signal) => {
    if(code !== 0)
      console.log('process exited with code ', code, signal);
  });

  child.stdout.on('data', data => {
    writeToFile(data);
  });

  child.stderr.on('data', data => {
    console.error(`child stderr:\n${data}`);
  });
};

listDirectory('/home/kangoula/Downloads');
