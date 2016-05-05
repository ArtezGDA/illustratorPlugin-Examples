/* Expand Outlines - Multiple */

function duplicateOutline(compound, strokeW, color) {
	// Duplicate the compoundPath
//	var duplicate = compound.duplicate();
	
	var duplicate = compound;
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
	
	var compounds = objectGroup.compoundPathItems;
	for (j = 0; j < compounds.length; j++) {
		$.writeln(compounds[j]);
		var compoundObj = compounds[j];
		
		duplicateOutline(compoundObj, strokeW, color);
	}
}
function buildOutlineStack(objectGroup) {
	$.writeln (objectGroup);
	var groups  = objectGroup.groupItems;
	for (i = 0; i < groups.length; i++) {
		$.writeln (groups[i]);
		var group = groups[i];
		
		var grey = new RGBColor();
		grey.red = 144;
		grey.green = 172;
		grey.blue = 169;
		extraOutlines(group, 20.0, grey);
	}
}

var doc = app.activeDocument;
var elements = doc.layers[0];
$.writeln (elements);
buildOutlineStack(elements);
