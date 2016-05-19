# Scripting Tutorial to Import JSON Data into Illustrator

The final version of this script can be found here: [Import JSON Data into Illustrator](https://github.com/ArtezGDA/illustratorPlugin-Examples/tree/master/importJsonData)

----

### 0. Start with an Illustrator document with the elements we want to modify

- A layer called **TextLayer** with 12 text objects
- A layer called **ShapeLayer** with a single shape
- A layer called **CenterMark** with just a circle centered on (300pt, 500pt) as center mark, to be ignored.

**Step 0: Start with an Illustrator document with a path shape**  
![Step 0](screenshots/import_step0_start.png)

### 1. Logging the name of each layer

We assume you're already a bit familiar with the basic setup of Extend Scripts: Why you would use `$.writeln(...)` and where the result of these *writeln* shows up (The Javascript Console in Adobe's ExtendScript ToolKit application).

Also, you should be familiar with getting the activeDocument, if there is any:

```javascript
if ( app.documents.length > 0 ) {
	var doc = app.activeDocument;
}
```

Then, as the first step in our endeavor, we want to log / print the name of each layer in your document.

**Step 1: Log the name of each layer.**

```javascript
// Import JSON Data into Illustrator

// Get the active document
if ( app.documents.length > 0 ) {
	var doc = app.activeDocument;
	
	// Get all layers
	var layers = doc.layers;
	if ( layers.length > 0 ) {
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			
			// Of each layer, print the name
			$.writeln(layer.name)
		}
	}
}
```

### 2. Single out the "TextLayer"

Next we want to focus only on the text layer, i.e. the layer we called "TextLayer", the layer which contains the text objects that we would like to modify. We've put the text to be modified in its own special layer, since we might have other layers with text as well, which we do not want to modify. So, let's single out the text layer: 

**Step 2: Single out the layer called "TextLayer"**

```javascript
			if ( layer.name == "TextLayer" ) {
				$.writeln(layer);
			}
```

**Step 2.1: Javascript Console: confirm that singling out the layer called "TextLayer" worked**  
![Step 2.1](screenshots/import_step2_single_out_text_layer.png)

### 3. Generalize the *getting a named layer* into a function

We now have build some code that only acts on a layer with a specific name. This is so useful, that we might want to reuse the code. In order to be able to do so, let's generalize it into its own function:

- Move the code that selects a single layer into its own function at the top of our file
- Make the function return the layer, or `null` if there is no layer with that name.
- This function also takes a document from where it should search the layer.
- Call the function with the activeDocument `doc` and the name of the layer *"TextLayer"*.

**Step 3: Generalized function for getting a named layer and calling that function**

```javascript
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
	$.writeln(textLayer);
}
```

### 4. Print all texts in the textLayer

Next, we want get all the text objects of the layer and print these out. The text objects in Illustrator are called *textFrame*s and they can be accessed by `layer.textFrames`. Then we use a similar construct as with getting the layers in the document: store the textFrames in a variable, checking the length of that variable to make sure that textFrames is not empty, looping through all the textFrames and finally printing the text (`contents`) of each textFrame.

**Step 4: Print the texts of each textFrame**

```diff
   var textLayer = getLayerNamed(doc, "TextLayer");
-   $.writeln(textLayer);
+   
+   // Print all texts in the textLayer
+   var textObjects = textLayer.textFrames;
+   if ( textObjects.length > 0 ) {
+       for (var i = 0; i < textObjects.length; i++) {
+           var textObj = textObjects[i];
+
+           $.writeln(textObj.contents);
+		}
+	}
```

### 5. Modify the texts

As intermediate result, let's modify the texts of these textFrames. It's not the final text of these textFrames, but at least we'll see a effect of all our hard work in the Illustrator document itself.

```diff
           $.writeln(textObj.contents);
+           textObj.contents = "New text";
```

**Step 5.1: Modify the texts as intermediate result**  
![Step 5.1](screenshots/import_step5_modify_texts.png)

### 6. Append the index `i` to the texts

Just to get a feeling of the order of the elements and which one is the first one and which one the last, let's append the index `i` to the texts that we're modifying.

```diff
           $.writeln(textObj.contents);
-           textObj.contents = "New text";
+           textObj.contents = "New text" + i.toString();
```

**Step 6.1: Append the index to the modified texts**  
![Step 6.1](screenshots/import_step6_append_index_to_texts.png)

### 7. Change the order of the text modifications

From the previous screenhot we can observe that the order is exactly the reverse of what is intended. This reverse order is due to the way of duplicating items in Illustrator: the new duplicated item is placed on top. Because we intented a reverse order: it should start at the top and then increment clockwise, we need to reverse the order of modified textFrames. We could do this by reversing the order of textFrame layers in Illustrator or by modifying our script. We'll do the latter:

```diff
```



### 8. Study reading from JSON

FabianTheBlind's wiki lists an excellent page about [reading from JSON](https://github.com/fabiantheblind/extendscript/wiki/Read-In-JSON-From-File-And-DONT-Eval). It all boils down to this:

- download https://raw.githubusercontent.com/douglascrockford/JSON-js/master/json2.js as `json2.js`
- use the following code to read the JSON:

```javascript
#include "json2.js"

    var script_file = File($.fileName); // get the location of the script file
    var script_file_path = script_file.path; // get the path
    var file_to_read = File(script_file_path + "/theData.json");
	
    var my_JSON_object = null; // create an empty variable
    var content; // this will hold the String content from the file
	
    if(file_to_read !== false){// if it is really there
          file_to_read.open('r'); // open it
          content = file_to_read.read(); // read it
          my_JSON_object =  JSON.parse(content);// now evaluate the string from the file
          alert(my_JSON_object.toSource()); // if it all went fine we have now a JSON Object instead of a string call length
          file_to_read.close(); // always close files after reading
          }else{
          alert("Bah!"); // if something went wrong
    }
```

### 9. Read from JSON and modify the text

```javascript
```

```javascript
```
