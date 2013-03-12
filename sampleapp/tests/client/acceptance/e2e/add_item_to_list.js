/*global describe, it, expect */
/*global pause, browser, input, repeater, element */

(function () {
	"use strict";

	describe('add_item_to_list', function () {
		it('works', function () {
			browser().navigateTo('/index');
			input('name').enter('Commit code to git');
			element(':button').click();
			expect(repeater('ul li').count()).toEqual(2);
		});
	});
}());
