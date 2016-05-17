// Export Each Layer as SVG

// Get the active document
if ( app.documents.length > 0 ) {
	var doc = app.activeDocument;
	
	// Get the layers
	if (doc.layers.length > 0) {
	var layers = doc.layers;
		
		// For each layer
		for (var i = 0; i < layers.length; i++) {
			
			// Print the name of the layer
			var theLayer = layers[i];
			
			// Create a new document
			var newDoc = app.documents.add();
			
			// Get all the page items
			var pageItems = theLayer.pageItems;
			
			if (pageItems.length > 0) {
				
				for (var j = 0; j < pageItems.length; j++) {
					
					// Copy every page item into that new document
					var pageItem = pageItems[j];
					var newItem = pageItem.duplicate(newDoc, ElementPlacement.PLACEATEND);
				}
			}
			
			// Create a new name for the svg file to export
			var docPath = doc.path;
			svgFilePath = docPath + "/" + theLayer.name + ".svg";
			
			$.writeln(svgFilePath);
			
			// Export the new document as SVG
			var exportOptions = new ExportOptionsSVG();
			var type = ExportType.SVG;
			var fileSpec = new File(svgFilePath);
			exportOptions.embedRasterImages = true;
			exportOptions.embedAllFonts = false;
			exportOptions.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
			newDoc.exportFile( fileSpec, type, exportOptions );
			
			// Clean up: close the document
			newDoc.close();
		}
	}
}