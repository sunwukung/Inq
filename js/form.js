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
    };
    
    form.prototype.rotate = function(d){
        var result = false;
        if(q.isN(d)){
            this.transforms.push({
                type:'rotate',
                value:d
            });
            result = true;
        }
        return result;
    };
    
    form.prototype.scale = function(w,h){
        var result = false;
        if(q.isN(w) && q.isN(h)){
            this.transforms.push({
                type:'scale',
                value:[w,h]
            });
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
    
    //-----------------------------------------------------------------------------------

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

    /*
     *
     */
    rectangle.prototype.draw = function(canvas, position){
        var result = false, 
        points,
        mRectangleToPoints;
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
    }
    
    //-----------------------------------------------------------------------------------

    /*
    * CIRCLE
    * 
    * constructor method for rectangles
    * private implementation of form.rec i
    * 
    * @arg Number radius
    */
    circle = function(radius){
        form.apply(this,arguments);
        this.radius = radius;
    //reinstate later for optimised rendering
    //this.startAngle = 0;
    //this.startPos = [0, 0];
    //this.endAngle = calc.degreesToRadians(360);
        
    //this.points = _crcToCurve(this);
    };
    
    // apply parent prototype before augmenting the child object
    k.inherit(circle,form);

    /*
     *
     */
    circle.prototype.draw = function(canvas, position){
        var result = false,
        points,
        start;
        if(canvas.toString() === '[object CanvasRenderingContext2D]'){
            //create a point matrix if one isn't already defined
            points = processTransforms(circleToPoints(this.radius),this.transforms);
            position = q.isA(position) ? position : [0,0];

            points = applyPosition(position,points);
            start =  [points[3][4],points[3][5]];
            drawBezCurve(canvas, position, points, start);
            result = true;
        }
        return result;
    };
    /*
    * returns a circle object
    *
    * @arg Number r radius
    * @return Object | Boolean
    */
    function crc(radius){
        var result = false;
        if(q.isN(radius)){
            result = new circle(radius);
        }
        return result;
    }
    
    //-----------------------------------------------------------------------------------
    
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
    }
    
    //-----------------------------------------------------------------------------------
    
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
    }
    
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
    }
    
    /**
     * create a quadratic curve representing a circle
     *
     * @param Number r radius
     */
    function circleToPoints(r) {
        var a, b, c, d, x = 0, y = 0,
        o = Math.floor(r / 1.85),//offset
        result = false;
        if(q.isN(r)){            
            //offset
            a = [[x + o, -r], [x + r, y - o], [x + r, y]];
            b = [[x + r, y + o], [x + o, y + r], [x, y + r]];
            c = [[x - o, y + r], [x - r, y + o], [x - r, y]];
            d = [[x - r, -o], [x - o, -r], [x, -r]];
            result = [a,b,c,d];
        }
        return result;
    }
    
    /* transforms a set of co-ordinates to a new position
     *
     * it assumes the points array is a collection of pairs or sixes
     *
     * @arg Array position
     * @arg Array points
     * @todo make recursive
     */ 
    function applyPosition(position, points){
        var n  = points.length, i = 0, j, newPoints = [], subPoints, v, sN;
        k.each(points,
            function(p){
                subPoints = k.stripe(p,
                    function(sp){return sp + position[0];},
                    function(sp){return sp + position[1];});
                newPoints.push(subPoints);
            });
        return newPoints;
    }
        
    /**
     * path drawing functions
     *
     * @param CanvasRenderingContext2D canvas object
     * @param array position
     * @param array points
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
                k.each(points,function(p){
                    canvas.lineTo(p[0], p[1]);
                })
                canvas.fill();
                canvas.stroke();
                canvas.closePath();
                result = true;
            }
        }
        return result;
    }

    /**
     * curve drawing functions
     *
     * @param CanvasRenderingContext2D canvas object
     * @param array position
     * @param array points
     */
    function drawBezCurve(canvas, position, points, start){
        var result = false, i = 0, n = points.length, nXY, pN;
        if((canvas.toString() === '[object CanvasRenderingContext2D]') &&
            q.isA(position) && (q.isA(points) && !q.isEA(points) )) {
            nXY = position.length;
            canvas.beginPath();
            canvas.moveTo(start[0],start[1]);
            k.each(points,function(p){
                    canvas.bezierCurveTo( p[0][0], p[0][1], p[1][0], p[1][1], p[2][0], p[2][1] );
                })
            canvas.fill();
            canvas.stroke();
            canvas.closePath();
            result = true;
        }
        return result;
    }
    
    function processTransforms(points,transforms){
        var i = 0,
        n = transforms.length, 
        newPoints = [];
        if(n > 0){
            while(i < n){
                //execute the transformation
                newPoints = calc[transforms[i]['type']](points,transforms[i]['value']);
                i+=1;
            }
        }else{
            newPoints = points;
        }
        return newPoints;
    }
    
 
    
    // REVEAL    
    module.rec = rec;
    module.crc = crc;
    module.lin = lin;
    module.crv = crv;
    module.drawPath = drawPath;
    module.rectangleToPoints = rectangleToPoints;
    
    return module;

}(form || {}));
