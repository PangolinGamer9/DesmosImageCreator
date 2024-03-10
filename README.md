# DesmosImageCreator
You can upload an image and the website will use Desmos API to plot dot arrays into the graph to show the image at the selected resolution.
It uses a canvas element to get the RGB value of every pixel within the uploaded picture. Then an object is created that is effectively a Desmos save state.
This object is modified to create all the gradients used in the rows of pixels. These gradients are then mapped to the according list of polygons.
