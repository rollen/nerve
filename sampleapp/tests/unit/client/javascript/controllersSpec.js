describe('ToDoListCtrl', function() {
	var todoCtrl
	, scope;

	beforeEach(function(){
		scope = {}
		todoCtrl =  new ToDoListCtrl(scope);
	});

	it('should have one sample todo', function(){
		expect(scope.items.length).toBe(1);
		expect(scope.items[0]).toEqual(new ToDoItem('Run tests'));
	});
	
	it('should allow for the addition of a todo', function(){
		expect(scope.name).toBe('');	

		scope.add_item('New Item');
		
		expect(scope.items[1]).toEqual(new ToDoItem('New Item'));
	});
});

