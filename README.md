Here's a revised version with clearer phrasing and streamlined instructions:

Scripts
Install dependencies: npm install
Build the project: npm run build
Lint the code: npm run lint
Format code: npm run prettify
Run unit tests: npm run test
Start the server: npm run start
Usage
The server listens on port 3000.

Accessing the Homepage
Visit http://localhost:3000/ for a brief overview.

Image Resizing Endpoint
To resize images, use http://localhost:3000/api/images.

Query Parameters:

filename: Specify one of the available image names:
Harpers-Bazaa
width: Desired width in pixels (must be > 0)
height: Desired height in pixels (must be > 0)
Example Requests
List Available Images
http://localhost:3000/api/images
Shows available image names.

Display Original Image
http://localhost:3000/api/images?filename=Harpers-Bazaa
Displays the unaltered Harpers-Bazaa image.

Resize Image
http://localhost:3000/api/images?filename=Harpers-Bazaa&width=200&height=200
Resizes Harpers-Bazaa to 200x200 pixels, saving it for faster access on future requests.

Invalid Width
http://localhost:3000/api/images?filename=Harpers-Bazaa&width=-200&height=200
Responds with an error for invalid width parameter.

Missing Height
http://localhost:3000/api/images?filename=Harpers-Bazaa&width=200
Responds with an error for missing height parameter.

Notes
Images are stored in assets/images/full. Additional images (without format restriction) can be added to this directory.
Resized images are saved in assets/images/thumb. Deleting a resized image from this folder will cause it to be re-generated on the next request.
