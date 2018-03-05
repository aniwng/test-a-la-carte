const path = require('path');
const webpack = require('webpack');
const express = require('express');
const fs = require('fs');
const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.get('/data',function(req, res){
    res.sendFile(path.join(__dirname, '/data.json'));
});

app.get('/config',function(req, res){
    res.sendFile(path.join(__dirname, '/CI_TESTSUITE.xml'));
});

app.get('/tests',function(req, res){
    res.sendFile(path.join(__dirname, '/tests.txt'));
});

app.get('/git-branch',function(req, res){
    const exec = require('child_process').exec;
    exec('./getBranches.sh',
        (error, stdout) => {
            fs.writeFile('git-branch.txt', stdout, (err) => {
                if (err) return console.log(err);
            });
            console.log('Output -> ' + stdout);
            if(error !== null){
                console.log("Error -> "+error);
            }
            res.end();
        });
    res.sendFile(path.join(__dirname, '/git-branch.txt'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/receive', function(req, res) {
    const body = req.body.join(', ');
    fs.writeFile('tests.txt', body, (err) => {
        if (err) return console.log(err);
        console.log('Write selected tests... > test.txt');
    });
    const exec = require('child_process').exec;
    exec('java -jar ./qa_a_la_carte_v2.jar',
        (error, stdout) => {
            console.log('Output -> ' + stdout);
            if(error !== null){
                console.log("Error -> "+error);
            }
            res.end();
        });
});

app.listen(3000, function(err) {
    if (err) {
        return console.error(err);
    }

    console.log('Listening at http://127.0.0.1:3000/');
});