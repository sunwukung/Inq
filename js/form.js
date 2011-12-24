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

    var form, rectangle, circle, path, curve;

    // CORE FUNCTIONALITY ------------------------------------------------------
    /**
     * @param Array p
     */
    function validPath(p){
        var result = false;
        if(q.isA(p)){
            result = list.valid(p,function(i){
                return q.isN(i[0]) && q.isN(i[1]);
            });
        }
        return result;
    }

    /**
     * validates Bezier curve co-ordinate list
     *
     * @param Array c
     * @return Boolean
     */
    function validCurve(c){
        return (q.isA(c)) ?
        list.valid(c, function (i){
            return (q.isA(i) && i.length === 3) ?
            list.valid(i, function(i){
                return (q.isA(i) && i.length === 2 && q.isN(i[0]) && q.isN(i[1]));
            }) :
            false;
        }) :
        false;
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

    /**
     *
     *@param Number n number of points
     *@param radius radius of polygon
     */
    function polygonToPoints(n, r){
        var inc = 360 / n, points = [];
        points = list.make(n, function(i, n){
            var j =  inc * (i+1), 
            d = calc.degreesToRadians(d),
            p2c = calc.polarToCartesian({
                r:r,
                t:j
            });
            return [p2c.x, p2c.y];
        });
        console.log(points);
        return points;
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
            nXY = position.length;
            if(nXY == 2  && q.isN(position[0]) && q.isN(position[1])){
                points = calc.move(points, position);
                canvas.beginPath();
                canvas.moveTo(points[0], points[1]);
                list.map(points,function(p){
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
        var result = false;
        if((canvas.toString() === '[object CanvasRenderingContext2D]') &&
            q.isA(position) && (q.isA(points) && !q.isEA(points) )) {
            canvas.beginPath();
            canvas.moveTo(start[0],start[1]);
            list.map(points,function(p){
                canvas.bezierCurveTo( p[0][0], p[0][1], p[1][0], p[1][1], p[2][0], p[2][1] );
            })
            canvas.fill();
            canvas.stroke();
            canvas.closePath();
            result = true;
        }
        return result;
    }

    function processTransforms(points, transforms){
        if((q.isA(points) && points.length > 0) && (q.isA(transforms) && transforms.length > 0)){
            //get the next transformation
            var t = transforms[0]['type'],
            v = transforms[0]['value'];
            points = calc[t](points,v);
            return processTransforms(points,transforms.slice(1));
        } else {
            return points;
        }
    }

    // FORM --------------------------------------------------------------------
    
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
    
    // RECTANGLE----------------------------------------------------------------
    /*
     * constructor method for rectangles
     * private implementation of form.rec
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
     * @param CanvasRenderingContext2D canvas object
     * @param Array position
     */
    rectangle.prototype.draw = function(canvas, position){
        var result = false, 
        points;
        if(canvas.toString() === '[object CanvasRenderingContext2D]'){
            //create a point matrix if one isn't already defined
            points = processTransforms(rectangleToPoints(this),this.transforms);
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
    // CIRCLE-------------------------------------------------------------------
    /*
     * constructor method for circles
     * private implementation of form.crc
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
     * @param CanvasRenderingContext2D canvas object
     * @param Array position
     */
    circle.prototype.draw = function(canvas, position){
        var result = false,
        points,
        start;
        if(canvas.toString() === '[object CanvasRenderingContext2D]'){
            //create a point matrix if one isn't already defined
            points = processTransforms(circleToPoints(this.radius),this.transforms);
            position = q.isA(position) ? position : [0,0];
            points = calc.move(points, position);
            start =  [points[3][2][0],points[3][2][1]];
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
    // PATH --------------------------------------------------------------------
    /*
     * constructor method for (bezier) curves
     * private implementation of form.crv
     *
     * @arg Number radius
     */
    path = function(p, s){
        form.apply(this,arguments);
        this.points = p;
        this.start = s;
    };

    // apply parent prototype before augmenting the child object
    k.inherit(path,form);

    path.prototype.draw = function(canvas, position){
        var result = false,
        points,
        start;
        if(canvas.toString() === '[object CanvasRenderingContext2D]'){
            //create a point matrix if one isn't already defined
            points = processTransforms(this.points,this.transforms);
            position = q.isA(position) ? position : [0,0];
            points = calc.move(points, position);
            start = calc.move(this.start, position);
            drawPath(canvas, position, points, start);
            result = true;
        }
        return result;
    };

    /*
     * returns a path object
     *
     * @arg Object p points
     * @return Object | Boolean
     */
    function pth(points, start, v){
        var result = false;

        if(q.isA(points)){
            if(start !== undefined && q.isA(start) && start.length === 2 && q.isN(start[0]) && q.isN(start[1])){
                result = v ?
                (validPath(points)) ?
                new path(points, start) :
                false :
                new path(points, start) ;
            }
        }

        /*
        if(q.isA(points) && !q.isEA(points)){
            // validate the path geometry
            result = new path(points, start);
        }
         */
        return result;
    }
    
    // CURVE--------------------------------------------------------------------

    /*
     * constructor method for (bezier) curves
     * private implementation of form.crv
     *
     * @arg Number radius
     */
    curve = function(p, s){
        form.apply(this,arguments);
        this.points = p;
        this.start = s;
    };

    // apply parent prototype before augmenting the child object
    k.inherit(curve,form);

    curve.prototype.draw = function(canvas, position){
        var result = false,
        points,
        start;
        if(canvas.toString() === '[object CanvasRenderingContext2D]'){
            //create a point matrix if one isn't already defined
            points = processTransforms(this.points,this.transforms);
            position = q.isA(position) ? position : [0,0];
            points = calc.move(points, position);
            start = calc.move(this.start, position);
            drawBezCurve(canvas, position, points, start);
            result = true;
        }
        return result;
    }

    /*
     * returns a curve object
     *
     * @arg Array p points
     * @arg Array s start
     * @arg Boolean v
     * @return Object | Boolean
     */
    function crv(p,s,v){
        var result = false;
        if(q.isA(p)){
            if(s !== undefined && q.isA(s) && s.length === 2 && q.isN(s[0]) && q.isN(s[1])){
                result = v ?
                (validCurve(p)) ?
                new curve(p, s) :
                false :
                new curve(p, s) ;
            }
        }
        return result;
    }
    // POLY --------------------------------------------------------------------

    /*
     * constructor method for polygons
     * private implementation of form.poly
     *
     * @arg Number n
     * @arg Number radius
     */
    polygon = function(n, radius){
        form.apply(this,arguments);
        this.n = n;
        this.radius = radius;
        this.points = polygonToPoints(n, radius);
        this.start = this.points[this.points.length - 1];
    };

    // apply parent prototype before augmenting the child object
    k.inherit(polygon, form);
    /*
     * returns a path object
     *
     * @arg Array p points
     * @return Object | Boolean
     */
    function poly(p, r){
        var c = false;
        if(q.isN(p) && q.isN(r)){
            c = new polygon(p, r);
        }
        return c;
    }
    // STAR --------------------------------------------------------------------
    /*
     * returns a path object
     *
     * @arg Object p points
     * @return Object | Boolean
     */
    function star(p){
        var c = false;
        if(q.isA(p)){
            c = {};
        }
        return c;
    }

    // WAVE --------------------------------------------------------------------
    /*
     * returns a wave object
     *
     * @arg Object p points
     * @return Object | Boolean
     */
    function wave(p){
        var c = false;
        if(q.isA(p)){
            c = {};
        }
        return c;
    }

    //-----------------------------------------------------------------------------------

    
    // REVEAL
    module.rec = rec;
    module.crc = crc;
    module.crv = crv;
    module.pth = pth;
    module.poly = poly;
    module.star = star;
    module.wave = wave;
    module.validCurve = validCurve;
    return module;

}(form || {}));
