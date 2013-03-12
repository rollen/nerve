function ToDoItem(name) {
	'use strict';

	this.name = name;
}

function ToDoListCtrl($scope) {
	'use strict';

	$scope.name = '';
	$scope.items = [new ToDoItem('Run tests')];
	$scope.add_item = function () {
		$scope.items.push(new ToDoItem($scope.name));
	};
}
