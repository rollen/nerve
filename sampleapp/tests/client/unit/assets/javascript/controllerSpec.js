/*global describe, it, expect, beforeEach */
/*global ToDoListCtrl, ToDoItem */

(function () {
	"use strict";
	describe('ToDoController', function () {
		var scope, controller, todoItem;

		describe('add_item', function () {

			beforeEach(function () {
				scope = {};
				controller = new ToDoListCtrl(scope);
				todoItem = new ToDoItem('Commit code to github');
			});

			it('should add todos to the controller', function () {
				expect(scope.items.length).toBe(1);
				scope.add_item();
				expect(scope.items.length).toBe(2);
			});
		});
	});
}());
