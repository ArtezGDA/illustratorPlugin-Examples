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
   if ( textObjects.length > 0 ) {
       for (var i = 0; i < textObjects.length; i++) {
-           var textObj = textObjects[i];
+           var textObj = textObjects[textObjects.length - (i + 1)];
           
           $.writeln(textObj.contents);
```

### 8. Study reading from JSON

According to FabianTheBlind [Eval is Evil](https://github.com/fabiantheblind/extendscript/wiki/Read-In-JSON-From-File-And-DONT-Eval). He explains the proper way how to read from a JSON file.

However, this method didn't work for me, and gives a parsing error. Maybe this has to do with the old version of Illustrator that I am using, so there might be fixes. But I had to look for an alternative.

The only alternative which works for me, is to resort to the "*dangerous*" `eval` method.

(`Eval` is considered dangerous, because it will execute any code it will find in the (json) file to read. So if you don't control your own json, you better not use the following.)

**Step 8.1: Load some JSON data with the `eval` method**  

Add an example JSON file somewhere on your computer:

[`example.json`](importJsonData/example.json):

```json
{	"foo": "Hello World",
	"bar": 42
}
```

Then append this to your script. *Of course you will have to change the path to the* example.json *file to the path on your computer.* 

```javascript
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
```

**Step 8.2: The successful result from reading the JSON in the Javascript Console**  
![Step 8.2](screenshots/import_step8_reading_json.png)

### 9. Read an array from JSON

Now let's head over to our (real) data file and import this file instead of the extreme simple example of above.

Actually, this is still sample data but for the purpose of drawing a graph it will do fine. The json contains a list of 12 months with a value for each months.

[`arrayOfMonths.json`](importJsonData/arrayOfMonths.json):

```json
{
	"exampleArray": [
		{
			"month": "January",
			"value": 12
		},
		{
			"month": "February",
			"value": 15
		},
...
```

Change the script to import this new file:

```diff

// JSON reading
-var fileToRead = File("~/Work/Artez/ArtezGDARepos/illustratorPlugin-Examples/importJsonData/example.json");
+var fileToRead = File("~/Work/Artez/ArtezGDARepos/illustratorPlugin-Examples/importJsonData/arrayOfMonths.json");
var jsonData = null;
if ( fileToRead !== false ) {
```

```diff
}

-// Print some data from the JSON
-$.writeln(jsonData.foo);
-$.writeln(jsonData.bar);
+// Print number of months in the JSON array
+$.writeln(jsonData.exampleArray.length);
```

### 10. Refactor the JSON reading into a function

Because we are only interested in getting this array, let's move all the code necessary to get to that array into its own function. Functionally this step won't change the behavior of our code a single bit, but after this '*refactor*' (restructuring the code, while the functionality stays the same), it will be much easier to read.

What we would like to have is a function that just returns the array

```javascript
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
```

Then when we want to get the array we can just get it and appoint it to a variable

```javascript
var months = getMonthsArray();
```

### 11. Use the array to change the texts

So now we can use this array to change the texts.

**Step 11.1: Get the array of months (within the block if it has texts to change)**

```diff
    var textObjects = textLayer.textFrames;
    if ( textObjects.length > 0 ) {
+       
+       // Get the months
+       var months = getMonthsArray();
+
        for (var i = 0; i < textObjects.length; i++) {
            var textObj = textObjects[textObjects.length - (i + 1)];
```

**Step 11.2: Wrap the for loop in an `if` that only executes if the number of texts matches the number of months**

```diff
+       // Check if the number of textObjects is equal to the number of months
+       if ( textObjects.length == months.length ) {
+           
            for (var i = 0; i < textObjects.length; i++) {
                var textObj = textObjects[textObjects.length - (i + 1)];
            
				$.writeln(textObj.contents);
				textObj.contents = "New text" + i.toString();
            }
+       } else {
+
+           // If the number of the texts is not equal to the number of months, alert the user
+           alert("the number of textFrames and number of months in the JSON do not match.");
+       }
    }
```

Technically, it is possible to also change the text frames when the number of text frames and months do not match. (If there are more months than textFrames, just ignore the superfluos data. If there are more textFrames than months, leave the extra textFrames untouched). But that requires more checks and more code. In this case we know that they match, so go for the easy way.

**Step 11.3: Use the actual data -the month name- to change the texts**

```diff
			for (var i = 0; i < textObjects.length; i++) {
				var textObj = textObjects[textObjects.length - (i + 1)];
			
+				// Change the text into the month
+				var thisMonth = months[i];
+				textObj.contents = thisMonth.month;
			}
		} else {
```

**Step 11.4: The result from reading an example JSON file and modifying the texts to the names of months**  
![Step 11.4](screenshots/import_step11_reading_months.png)

### Investigate the points of the path 

...