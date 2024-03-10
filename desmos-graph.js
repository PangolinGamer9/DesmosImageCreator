function loadDesmosGraph(){
    document.getElementById("main-screen").style.display = "none"
    document.getElementById("calculator").style.display = "inline"
    // Creates the calculator object
    var elt = document.getElementById('calculator');
    var calculator = Desmos.GraphingCalculator(elt);

    // Creates the object that the state that the calculator will restore uses
    let new_state = {
        "version": 10,
        "randomSeed": "6a6b61048ed8851de69e9c580dcff320",
        // Settings to control how the graph looks
        "graph": {
            "polarNumbers": false,
            "showGrid": false,
            "showXAxis": false,
            "showYAxis": false,
            "xAxisNumbers": false,
            "yAxisNumbers": false,
            "userLockedViewport": true,
            "viewport": {
                "xmin": 0-(image_data[0][0].length/3),
                "ymin": 0-(image_data.length/3),
                "xmax": image_data[0][0].length+(image_data[0][0].length/3),
                "ymax": image_data.length+(image_data.length/3)
            }
        },
        // Where all the expressions for the graph will be added
        "expressions": {
            "list": []
        }
    }

    // Loops through all of the gradients in the list and adds the equations to the graph
    for (let i = 0; i < image_data.length; i++){
        new_state["expressions"]["list"].push({
            "type": "expression",
            "id": "color"+i,
            "latex": "c_{" + i + "} = \\rgb([" + image_data[i][0].toString() + "], [" + image_data[i][1].toString() + "], [" + image_data[i][2].toString() + "])"
        });
    }

    // Creates all the rows of pixels that make up the display
    for (let i = 0; i < image_data.length; i++){
        new_state["expressions"]["list"].push({
            "type": "expression",
            "id": "point"+i,
            // Latex for using points as pixels
            //"latex": '([0...'+ image_data[0][0].length +'],' + i + ')',
            // Latex for using polygons as the pixels
            "latex": '\\polygon(([0...'+ image_data[0][0].length +'],' + i + '), ([1...' + (image_data[0][0].length+1) + '], ' + i +'), ([1...'+ (image_data[0][0].length+1) +'],' + (i+1) + '), ([0...' + (image_data[0][0].length) + '], ' + (i+1) +'))',
            "colorLatex": "c_{" + (image_data.length-1-i) + "}",
            "fillOpacity": "1"
        });
    }

    // Sets the state of the calculator to the object created above
    calculator.setState(new_state)
}

