// Export Each Layer as SVG

// Get the active document
if ( app.documents.length > 0 ) {
	var doc = app.activeDocument;
	
	// Display dialog to the user
	alert(doc)
	
	// Print to Javascript console of the ExtendScript ToolKit
	$.writeln(doc)
}