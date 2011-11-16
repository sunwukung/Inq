/**
 *  @package form
 *  form.js
 *
 *  This file is part of the 'inq' javascript library.
 *
 *  form.js is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  form.js is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with form.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  @author Marcus Kielly
 *  @version 1.0
 *  @projectDescription this script provides the base primitive drawing capabilities of the inq canvas library
 */
var form = ( function(module) {

    var form,rectangle,circle,curve,line;
       
    /*
    * base form object from which all forms are derived
    */
    form = function(){
        this.transforms = [];
        this.xy = [0,0];
    };
    
    form.prototype.rotate = function(d){
        var result = false;
        if(q.isN(d)){
            this.transforms.push({type:'rotate',value:d});  
            result = true;
        }
        return result;
    };
    
    form.prototype.scale = function(w,h){
        var result = false;
        if(q.isN(w) && q.isN(h)){
            this.transforms.push({type:'scale',value:[w,h]});
            result = true;
        }
        return result;
    };
    
    form.prototype.origin = function(x,y){
        var result = false;
        if(q.isN(x) && q.isN(y) ){
            this.origin = [x,y];
            result = true;
        }
        return result;
    };
    
    
    /*
    * RECTANGLE
    * 
    * constructor method for rectangles
    * private implementation of form.rec i
    * 
    * @arg Number width
    * @arg Number height
    */
    rectangle = function(w,h){
        form.apply(this,arguments);
        this.w = w;
        this.h = h;
        this.transforms = [];
    };

    
    // apply parent prototype before augmenting the child object
    k.inherit(rectangle,form);
    
    rectangle.prototype.draw = function(canvas, position, ink){
        var result = false, points, mRectangleToPoints;
        if(canvas.toString() === '[object CanvasRenderingContext2D]'){
            //create a point matrix if one isn't already defined
            mRectangleToPoints = k.memo(rectangleToPoints);
            points = processTransforms(mRectangleToPoints(this),this.transforms); 
            position = q.isA(position) ? position : [0,0];
            drawPath(canvas, position, points);
            result = true;
        }
        return result;
    };
    
    function processTransforms(points,transforms){
        var i = 0, n = transforms.length, newPoints = [];
        while(i < n){
            //execute the transformation
            newPoints = geom[transforms[i]['type']](points,transforms[i]['value']);
            i+=1;
        }
        return newPoints;
    };
    
    /*
    * returns a rectangle object
    * 
    * @arg Number w width
    * @arg Number h height
    * @return Object | Boolean
    */
    function rec(w,h){
        var result = false;
        if(!q.isU(w) && q.isN(w) && !q.isU(h) && q.isN(h)){
            result = new rectangle(w,h);
        }        
        return result;
    };
    
    /*
    * returns a circle object
    *
    * @arg Number r radius
    * @return Object | Boolean
    */
    function crc(r){
        var c = false;
        if(q.isN(r)){
            c = {};
            c.radius = r;     
        }
        return c;
    };
    
    /*
    * returns a line object
    *
    * @arg Object p points
    * @return Object | Boolean
    */
    function lin(p){
        var l = false;
        if(q.isA(p)){
            l = {};
        }
        return l;
    };
    
    /*
    * returns a curve object
    *
    * @arg Object p points
    * @return Object | Boolean
    */
    function crv(p){
        var c = false;
        if(q.isA(p)){
            c = {};
        }
        return c;
    };
    
    /*
     * converts rectangle object to XY list
     * 
     * @param Object r rectangle
     * @return Array
     */
    function rectangleToPoints (r) {
        var a, b, c, d, e, hW, hY;
        hW = r.w / 2;
        hY = r.h / 2;
        a = [-hW, -hY];
    	b = [hW, -hY];
    	c = [hW, hY];
    	d = [-hW, hY];
    	e = [-hW, -hY];
    	return [a, b, c, d, e];
    };
    
    /* transforms a set of co-ordinates to a new position
     * 
     * @arg Array position
     * @arg Array points
     */ 
    function applyPosition(position, points){
        var n  = points.length, xy =[], i = 0, newPoints = [];
        while(i < n){
            newPoints.push(                
                [
                points[i][0] + position[0],
                points[i][1] + position[1]
                ]);
            //pad the newpoints
            i += 1;   
        }
        return newPoints;
    }
        
    /**
     * path drawing functions
     *
     * @param CanvasRenderingContext2D canvas object
     * @param array points
     * @param boolean close path should be closed automatically
     */
    function drawPath(canvas, position, points) {
        var result = false, i, n, nXY;
          if((canvas.toString() === '[object CanvasRenderingContext2D]') &&
             q.isA(position) && (q.isA(points) && !q.isEA(points) )) {
                i = 0;
                n = points.length;
                nXY = position.length;
                if(nXY == 2  && q.isN(position[0]) && q.isN(position[1])){
                    points = applyPosition(position,points);   
                    canvas.beginPath();
                    canvas.moveTo(points[0], points[1]);
                    while(i < n) {
                    	canvas.lineTo(points[i][0], points[i][1]);
                    	i += 1;
                    }
                    canvas.fill();
                    canvas.stroke();
                    canvas.closePath();
                    result = true;
                }
            }
        return result;
    };
    
 
    
    // REVEAL    
    module.rec = rec;
    module.crc = crc;
    module.lin = lin;
    module.crv = crv;
    module.drawPath = drawPath;
    module.rectangleToPoints = rectangleToPoints;
    
    return module;

}(form || {}));
