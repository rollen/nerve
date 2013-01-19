var fixtures = require('./../spec_helper').fixtures
, exec = require('child_process').exec
, spawn = require('child_process').spawn
, EventEmitter = require('events').EventEmitter
, sys = require('sys')
, path = require('path');

describe ("accessing_assets.spec.js", function(){
	it('should allow for a file to be downloaded', function(done){
		var node_process
		, port
		, expected_file
		, received_file
		, cmd = {}
		, emitter;

	port = 8080;
	
	var file_location = path.resolve(__dirname, '..','..', 'server.js');
	cmd['download_file'] = 'curl http://localhost:' + port + '/assets/angular/t.js';

	function start_framework_instance(){
		node_process = spawn('node',[file_location])
		node_process.stdout.setEncoding('utf8');

		node_process.stdout.on('error', function(data){
			console.log(data);
		});

		setTimeout(function(){
			emitter.emit('server_started')
		}, 300);
	}

	function kill_framework_instance(){
		if(node_process && node_process.pid){
			process.kill(node_process.pid);
		}
		emitter.emit('test_results_and_end_test');
	}

	function download_file(error, stdout, stderr){
		if(error){ 
			console.log(erro);
			node_process.kill(node_process.pid);
		} else {
			exec(cmd['download_file'], function(error, stdout, stderr){
				received_file = stdout;
				fixtures.readFile('javascript', 't.js', function(error, read_file_from_fixtures_folder){
					expected_file = read_file_from_fixtures_folder;
					emitter.emit('file_downloaded');
				});
			});
		}
	}

	function error(e){
		console.log(e);
		done();
	}

	function test_results_and_end_test(){
		expect(received_file).toBe(expected_file);
		done();
	}

	emitter = new EventEmitter();
	emitter.on('start_asset_download_test', start_framework_instance);
	emitter.on('server_started', download_file);
	emitter.on('file_downloaded', kill_framework_instance);
	emitter.on('test_results_and_end_test', test_results_and_end_test);
	emitter.on('error', error);

	emitter.emit('start_asset_download_test');

	});
});
