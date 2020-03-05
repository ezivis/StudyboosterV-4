'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// your code here
	$('.task').click(taskClicked);

}
function taskClicked(e) {

	var containingProject = $(this).closest(".task");
	//var description = $(containingProject).find(".task");
    //if (description.length == 0) {
	console.log("Task clicked");
    $(containingProject).append("<p>Task notes.</p>");
    //}
	e.preventDefault();
}
