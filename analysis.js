const image_input = document.getElementById("image-input");
image_input.type = "file";

// Gets the canvas element and creates a context
var canvas = document.getElementById("myCanvas"); 
var context = canvas.getContext("2d"); 
// 
let ref_image = document.getElementById("ref-image")
// Creates a variable to store the uploaded image source
let image_source;

// The variable that saves the image data
let image_data = 0;

// Dropdown menu
const e = document.getElementById("image-resolution");

image_input.addEventListener("change", () => {
    if (image_input.files.length == 1){
        //console.log("File selected: ", image_input.files[0]);
        image_source = URL.createObjectURL(image_input.files[0]);
        ref_image.src = image_source;
        ref_image.onload = function(){
            let res = e.options[e.selectedIndex].text.split("x");
            canvas.width = res[0]
            canvas.height = res[1]

            context.drawImage(ref_image, 0, 0);
            getAllPixels(res);
            //document.getElementById("submit-graph").style.display = "inline-block";
        }
    }
})

function getAllPixels(res){

    let current = []
    console.log(res)
    for (i = 0; i < res[1]; i++){
        current.push([[], [], []])
        for (j = 0; j < res[0]; j++){
            let pixel = context.getImageData(j, i, 1, 1);
            let data = pixel.data;
            const rgbColor = `rgb(${data[0]} ${data[1]} ${data[2]} / ${data[3] / 255})`;
            let rgbColorArray = rgbColor.split("(")[1].split(" ")

            current[i][0].push(Number(rgbColorArray[0]))
            current[i][1].push(Number(rgbColorArray[1]))
            current[i][2].push(Number(rgbColorArray[2]))
        }
    }
    //console.log(current)
    image_data = current;
}