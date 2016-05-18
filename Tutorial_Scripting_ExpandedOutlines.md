# Scripting Tutorial to Expanded Outlines

The final version of this script can be found here: [Expanded Outlines](https://github.com/ArtezGDA/illustratorPlugin-Examples/tree/master/expandedOutlines)

----

**Step 0: Start**  
![Step 0](screenshots/step0_start.png)

### 1. Changed the font of the ExtendScript editor

The silly thing of the default **ExtendScript** editor font, is that it is not monospaced. Changing the font into a monospaced font will make reading the source code a lot easier

### 2. using `$.writeln()` to find the correct objects

https://github.com/ArtezGDA/illustratorPlugin-Examples/commit/2c131296bf37c5f83378419106958454823b77b6

### 3. Study the different type of objects:

- documents
- layers
- groupItems
- compoundPaths
- pathItems
- ...

**Step 3.1: Investigate the layers**  
![Step 3.1](screenshots/step0_illustrator_layers.png)
    
### 4. Study the creation of colors

**Step 4: Create grey outlines**  
![Step 4](screenshots/step1_grey_outlines.png)

### 5. Study the setting of Stroke caps and joins

### 6. Get bitten by the ***recursive duplication trap***

### 7. Fix the recursive bug with extra count variable and place at end

**Step 7: Place the new elements at the end**  
![Step 7](screenshots/step2_placing_at_the_end.png)

**Step 7.1: Duplication works**  
![Step 7.1](screenshots/step2_duplicate_works.png)

### 8. Improved place at end.

### 9. Start simple

**Step 9: Start Simple**  
![Step 9](screenshots/step3_start_simple.png)

### 10. Fixed 2nd recursive bug (by using targetGroup)

**Step 11: Finished work**  
![Finished work](screenshots/step4_finished.png)






