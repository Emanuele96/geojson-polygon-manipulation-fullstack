# geojson-polygon-manipulation-fullstack
Fullstack project for manipulating polygons given in geojson format.

## Install
1.  First you have to clone the repo on your machine, run the following command in a terminal window: `git clone https://github.com/Emanuele96/geojson-polygon-manipulation-fullstack.git` 
2.  Now you have to install all the dependencies for the server app. Go into the project folder with `cd geojson-polygon-manipulation-fullstack` and then  run `npm install`.
3.  Now you can start the api server. Run `node server.js`.
4.  The same has to be done with the client app: go into the client folder with `cd client` and then run `npm install`.
4.  Now you can run the client app by typing the command `npm start`

!Note: You need to have installed an instance of NodeJS on your machine, you can download it here https://nodejs.org/en/download/

## Documentation


### Component structure


                                                 App
                                        /         |           \  
                                Mapdisplay      NavBar      Sidebar  
                                    |                       /      \ 
                                 Polygons                Buttons   Alert 


