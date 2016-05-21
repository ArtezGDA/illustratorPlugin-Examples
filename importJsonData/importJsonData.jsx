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

// Get the active document
if ( app.documents.length > 0 ) {
	var doc = app.activeDocument;
	
	var textLayer = getLayerNamed(doc, "TextLayer");
	
	// Print all texts in the textLayer
	var textObjects = textLayer.textFrames;
	if ( textObjects.length > 0 ) {
		for (var i = 0; i < textObjects.length; i++) {
			var textObj = textObjects[textObjects.length - (i + 1)];
			
			// $.writeln(textObj.contents);
			// textObj.contents = "New text" + i.toString();
		}
	}
}

// JSON reading
var fileToRead = File("~/Work/Artez/ArtezGDARepos/illustratorPlugin-Examples/importJsonData/example.json");
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

// Print some data from the JSON
$.writeln(jsonData.foo);
$.writeln(jsonData.bar);
