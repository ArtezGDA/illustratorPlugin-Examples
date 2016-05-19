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

```javascript
// Import JSON Data into Illustrator

// Get the active document
if ( app.documents.length > 0 ) {
	var doc = app.activeDocument;
	
	// Get the text layer
	var layers = doc.layers;
	if ( layers.length > 0 ) {
		for (var i = 0; i < layers.length; i++) {
			var layer = layers[i];
			$.writeln(layer.name)
		}
	}
}
```

### 2. Single out the "TextLayer"

```javascript
			if ( layer.name == "TextLayer" ) {
				$.writeln(layer);
			}
```

**Step 2: Single out the layer called "TextLayer"**  
![Step 2](screenshots/import_step2_single_out_text_layer.png)

### 3.

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```

```javascript
```
