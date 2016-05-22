// Import JSON Data into Illustrator

// Returns the layer with the given name
function getLayerNamed(doc, nameOfTheLayer) {
	
	// Only search the document if it is given
	if ( doc != undefined ) {
		
		// Get the layer with the given name 
		var layers = doc.layers;
		if ( layers.length > 0 ) {
			for (var i = 0; i < layers.length; i++) {
				var layer = layers[i];
			
				if ( layer.name == nameOfTheLayer ) {
					return layer;
				}
			}
		}
	}
	return null;
}

// Returns an array of 12 months
function getMonthsArray() {
	// JSON reading
	var fileToRead = File("~/Work/Artez/ArtezGDARepos/illustratorPlugin-Examples/importJsonData/arrayOfMonths.json");
	var jsonData = null;
	if ( fileToRead !== false ) {
		// Open the file and read the content
		fileToRead.open('r');
		content = fileToRead.read();
		// modify the content so it will set the jsonData variable
		content = "jsonData = " + content + ";";
		// eval is evil, but other tricks didn't seem to work
		eval(content);
		// Close the file
		fileToRead.close();
	}
	return jsonData.exampleArray
}


// Get the active document
if ( app.documents.length > 0 ) {
	var doc = app.activeDocument;
	
	var textLayer = getLayerNamed(doc, "TextLayer");
	var pathLayer = getLayerNamed(doc, "ShapeLayer")
	
	// Print the pathItems of the pathLayer
	$.writeln(pathLayer.pathItems);
	
	// Print the first (and only) pathItem
	$.writeln(pathLayer.pathItems[0]);
	
	// Make this PathItem into a variable
	var polygonPath = pathLayer.pathItems[0];
	
	// Print the number of pathPoints in this PathItem 
	$.writeln(polygonPath.pathPoints.length);
	
	// For experimentation, get the first point
	var firstPoint = polygonPath.pathPoints[0];
	
	// Print the anchor (which is a coordinate) and the pointType
	$.writeln(firstPoint.anchor);
	$.writeln(firstPoint.pointType);
	
	// Modify the coordinates of the first anchor
	// (300.0, 500.0) is the center of the drawing
	firstPoint.anchor = [300.0, 500.0];
			
	// Change all texts in the textLayer
	var textObjects = textLayer.textFrames;
	if ( textObjects.length > 0 ) {
		
		// Get the months
		var months = getMonthsArray();
		
		// Check if the number of textObjects is equal to the number of months
		if ( textObjects.length == months.length ) {
			
			for (var i = 0; i < textObjects.length; i++) {
				var textObj = textObjects[textObjects.length - (i + 1)];
			
				// Change the text into the month
				var thisMonth = months[i];
				textObj.contents = thisMonth.month;
			}
		} else {
			
			// If the number of the texts is not equal to the number of months, alert the user
			alert("the number of textFrames and number of months in the JSON do not match.");
		}
	}
}