function ToDoItem(name){
	this.name = name;	
}

function ToDoListCtrl($scope, $log){
	$scope.name = '';
	$scope.items = [new ToDoItem('Run tests')];
	$scope.add_item = function(){
		$scope.items.push(new ToDoItem($scope.name));
	}
}
