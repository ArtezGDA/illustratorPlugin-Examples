/* Expand Outlines - Multiple */

function duplicateOutline(targetGroup, compound, strokeW, color) {
	// Duplicate the compoundPath
	var duplicate = compound.duplicate();
	
	// Send to back
	duplicate.move(targetGroup, ElementPlacement.PLACEATEND);
	
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
function extraOutlines(targetGroup, objectGroup, strokeW, color) {
	
	// For each compound in the group, duplicate it
	var compounds = objectGroup.compoundPathItems;
	var numberOfCompounds = compounds.length; // Prevent recursive loop
	for (j = 0; j < numberOfCompounds; j++) {
		$.writeln(compounds[j], compounds.length);
		var compoundObj = compounds[j];
		
		duplicateOutline(targetGroup, compoundObj, strokeW, color);
	}
}
function buildOutlineStack(objectGroup) {
	var groups  = objectGroup.groupItems;
	var targetGroup = groups.add();
	targetGroup.move(objectGroup, ElementPlacement.PLACEATEND);
	var group = groups[0];
	// Maximum stroke width and steps
	var max_stroke = 400;
	var stroke_step = 20;
	
	// Repeat the stroke duplicating
	for (stroke = stroke_step; stroke < max_stroke; stroke += stroke_step) {
		
		$.writeln(stroke);
		var grey = new RGBColor();
		// Fade from black to white
		grey.red = (stroke / max_stroke) * 255;
		grey.green = (stroke / max_stroke) * 255;
		grey.blue = (stroke / max_stroke) * 255;
		extraOutlines(targetGroup, group, stroke, grey);
	}
}

// Get the document
var doc = app.activeDocument;
var elements = doc.layers[0];
// build the stack of outlines on the 1st layer
buildOutlineStack(elements);
