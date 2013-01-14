function ToDoItem(name){
	this.name = name;	
}

function ToDoListCtrl($scope){
	$scope.name = '';
	$scope.items = [new ToDoItem('Run tests')];
	$scope.add_item = function(name){
		$scope.items.push(new ToDoItem(name));
	}
}
