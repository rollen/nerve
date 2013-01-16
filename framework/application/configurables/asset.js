function Asset(){
	var object = {}

	object.$get = function($httpFileResponseWriter, $appConfig, $path, $fileInfoService, $q, $fs){
		var o = {}

		o.fileCheckPromise = function(fully_qualified_filename){
			var deferred = $q.defer();
			$fs.lstat(fully_qualified_filename, function(error, stats){
				if(error){
					deferred.reject(error);
				} else {
					deferred.resolve(fully_qualified_filename);
				}
			});
			return deferred.promise;
		}

		o.createfileCheckPromises = function(relative_filename){
			var arr = [];
			$appConfig('asset_path').forEach(function(folderpath){
				var fully_qualified_filename = $path.join(folderpath, relative_filename);
				arr.push(o.fileCheckPromise(fully_qualified_filename));
			});
			return arr;
		}


		o.onAllPromisesResolved = function(onFileWriteComplete){
			return function(promises){
				var possible = []
				, exceptions = []
				, picked_path
				, fileInfo;
			
				promises.forEach(function(promise){
					if (promise.isFulfilled()) {
						possible.push(promise.valueOf());
					} else {
						exceptions.push(promise.valueOf().exception);
					}	
				});

				if(possible.length >= 1){
					picked_path = possible[0];
					fileInfo = $fileInfoService($path.dirname(picked_path), $path.basename(picked_path));
					$httpFileResponseWriter.writeToResponse(fileInfo, onFileWriteComplete);
				} else {
					console.log('exceptions');
					onFileWriteComplete(exceptions);
				}
			}
		}

		o.findAndWriteToResponse = function(relative_filename, onFileWriteComplete){
			$q.allResolved(o.createfileCheckPromises(relative_filename))
				.then(o.onAllPromisesResolved(onFileWriteComplete))
		}	
	
		return o;	
	}
	return object;
}

module.exports = Asset;
