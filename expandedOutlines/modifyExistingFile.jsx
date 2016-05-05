/* Expand Outlines - Multiple */

function duplicateOutline(group, compound, strokeW, color) {
	// Duplicate the compoundPath
	var duplicate = compound.duplicate();
	
	// Send to back
	duplicate.move(group, ElementPlacement.PLACEATEND);
	
	// Find the paths of the new compoundPath
	var paths = duplicate.pathItems;
	// Stroke and color each path
	for (k = 0; k < paths.length; k++) {
		var path = paths[k];
		path.strokeColor = color;
		path.fillColor = color;
		path.strokeCap = StrokeCap.ROUNDENDCAP;
		path.strokeJoin = StrokeJoin.ROUNDENDJOIN;
		path.strokeWidth = strokeW;
	}
}
function extraOutlines(objectGroup, strokeW, color) {
	
	// For each compound in the group, duplicate it
	var compounds = objectGroup.compoundPathItems;
	var numberOfCompounds = compounds.length; // Prevent recursive loop
	for (j = 0; j < numberOfCompounds; j++) {
		$.writeln(compounds[j], compounds.length);
		var compoundObj = compounds[j];
		
		duplicateOutline(objectGroup, compoundObj, strokeW, color);
	}
}
function buildOutlineStack(objectGroup) {
	var groups  = objectGroup.groupItems;
	for (i = 0; i < groups.length; i++) {
		$.writeln (groups[i]);
		var group = groups[i];
		var max_stroke = 30;
		var stroke = 0;
		stroke = 10
		var grey = new RGBColor();
		// Fade from black to white
		grey.red = (stroke / max_stroke) * 255;
		grey.green = (stroke / max_stroke) * 255;
		grey.blue = (stroke / max_stroke) * 255;
		extraOutlines(group, stroke, grey);
		
		stroke = 20
		var grey = new RGBColor();
		// Fade from black to white
		grey.red = (stroke / max_stroke) * 255;
		grey.green = (stroke / max_stroke) * 255;
		grey.blue = (stroke / max_stroke) * 255;
		extraOutlines(group, stroke, grey);
		
		/*
		// Maximum stroke width and steps
		var max_stroke = 500;
		var stroke_step = 10;
		
		// Repeat the stroke duplicating
		for (stroke = 0; stroke < max_stroke; stroke += stroke_step) {
			
			var grey = new RGBColor();
			// Fade from black to white
			grey.red = (stroke / max_stroke) * 255;
			grey.green = (stroke / max_stroke) * 255;
			grey.blue = (stroke / max_stroke) * 255;
			extraOutlines(group, stroke, grey);
			
		}
		*/
	}
}

// Get the document
var doc = app.activeDocument;
var elements = doc.layers[0];
// build the stack of outlines on the 1st layer
buildOutlineStack(elements);
