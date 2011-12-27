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
     * @param Array points
     */
    function validPath(points){
        var result = false;
        if(q.isA(points)){
            result = list.valid(points,function(i){
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
    function validCurve(curve){
        return (q.isA(curve)) ?
        list.valid(curve, function (i){
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
    function rectangleToPoints (rectangle) {
        var a, b, c, d, e, hW, hY;
        hW = rectangle.width / 2;
        hY = rectangle.height / 2;
        a = [-hW, -hY];
        b = [hW, -hY];
        c = [hW, hY];
        d = [-hW, hY];
        e = [-hW, -hY];
        return [a, b, c, d, e];
    }

    /**
     * generate an array of points representing a circle rendered as a bezier curve
     * 
     * @param Number r radius
     * @return Array | Boolean
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
     * generate an Array of xy pairs representing a polygon
     *
     * @param Number nPoints number of points
     * @param Number radius radius of polygon
     * @return Array points
     */
    function polygonToPoints(nPoints, radius){
        var inc = 360 / nPoints, points = [];
        points = list.make(nPoints, function(i, n){
            var j =  i === 0 ? -90 : -90 + (inc * i),//rotate poly through -90 for cognitive convenience...
            radians = calc.degreesToRadians(j),
            p2c = calc.polarToCartesian({
                r:radius,
                t:radians
            });
            return [p2c.x, p2c.y];
        });
        points.push(points[0]);
        return points;
    }

    /**
     * path drawing method
     *
     * @param CanvasRenderingContext2D canvas object
     * @param Array position
     * @param Array points
     * @return Boolean
     */
    function drawPath(canvas, points, position) {
        var result = false;

        if(String(canvas) === '[object CanvasRenderingContext2D]'){
            result = true;
            //apply optional position params
            if(position !== undefined){
                if(q.isA(position) && position.length === 2 && q.isN(position[0]) && q.isN(position[1])){
                    points = calc.move(points, position);
                } else {
                    result = false;
                }
            }
            //draw path
            canvas.beginPath();
            canvas.moveTo(points[0],points[1]);
            list.map(points,function(p){
                canvas.lineTo(p[0], p[1]);
            })
            canvas.fill();
            canvas.stroke();
            canvas.closePath();
        }
        return result;
    }

    /**
     * curve drawing method
     *
     * @param CanvasRenderingContext2D canvas object
     * @param Array points
     * @param Array start
     * @param Array position
     * @return Boolean
     */
    function drawBezCurve(canvas, points, start, position){
        var result = false;
        if(String(canvas) === '[object CanvasRenderingContext2D]'){
            position = q.isA(position) ? position : [0,0];
            result = true;
            //apply optional position params
            if(position !== undefined){
                if(q.isA(position) && position.length === 2 && q.isN(position[0]) && q.isN(position[1])){
                    points = calc.move(points, position);
                    start = calc.move(start, position);
                } else {
                    result = false;
                }
            }
            canvas.beginPath();
            canvas.moveTo(start[0],start[1]);
            list.map(points,function(p){
                canvas.bezierCurveTo( p[0][0], p[0][1], p[1][0], p[1][1], p[2][0], p[2][1] );
            })
            canvas.fill();
            canvas.stroke();
            canvas.closePath();
        }
        return result;
    }

    /**
     * translate points according to list of transforms
     *
     * @param Array points
     * @param Array transforms
     */
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

    /**
     * add a rotation modifier to the transformation stack
     *
     * @param Number degrees
     * @return Boolean
     */
    form.prototype.rotate = function(degrees){
        var result = false;
        if(q.isN(degrees)){
            this.transforms.push({
                type:'rotate',
                value:degrees
            });
            result = true;
        }
        return result;
    };

    /**
     * add a scale modifier to the transformation stack
     *
     * @param Number width
     * @param Number height
     * @return Boolean
     */
    form.prototype.scale = function(width, height){
        var result = false;
        if(q.isN(width) && q.isN(height)){
            this.transforms.push({
                type:'scale',
                value:[width, height]
            });
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
    rectangle = function(width, height){
        form.apply(this,arguments);
        this.width = width;
        this.height = height;
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
        //create a point matrix if one isn't already defined
        points = rectangleToPoints(this);
        points = processTransforms(points,this.transforms);
        result = drawPath(canvas, points, position);
        return result;
    };
    
    /*
     * returns a rectangle object
     *
     * @arg Number width
     * @arg Number height
     * @return Object | Boolean
     */
    function rec(width, height){
        var o = false;
        if(!q.isU(width) && q.isN(width) && !q.isU(height) && q.isN(height)){
            o = new rectangle(width, height);
        }        
        return o;
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
     * @return Object | Boolean
     */
    circle.prototype.draw = function(canvas, position){
        var result = false,
        points,
        start;
        //create a point matrix if one isn't already defined
        points = processTransforms(circleToPoints(this.radius),this.transforms);
        start =  [points[3][2][0],points[3][2][1]];
        result = drawBezCurve(canvas, points, start, position);
        return result;
    };

    /*
     * returns a circle object
     *
     * @arg Number r radius
     * @return Object | Boolean
     */
    function crc(radius){
        var o = false;
        if(q.isN(radius)){
            o = new circle(radius);
        }
        return o;
    }
    // PATH --------------------------------------------------------------------
    /*
     * constructor method for (bezier) curves
     * private implementation of form.crv
     *
     * @arg Number radius
     */
    path = function(points){
        form.apply(this,arguments);
        this.points = points;
    };

    // apply parent prototype before augmenting the child object
    k.inherit(path,form);

    path.prototype.draw = function(canvas, position){
        var result = false,
        points;
        //create a point matrix if one isn't already defined
        points = processTransforms(this.points,this.transforms);
        result = drawPath(canvas, points, position);
        return result;
    };

    /*
     * returns a path object
     *
     * @arg Object p points
     * @return Object | Boolean
     */
    function pth(points, v){
        var o = false;
        if(q.isA(points)){
            o = v ?
            (validPath(points)) ?
            new path(points) :
            false :
            new path(points) ;
        }
        return o;
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
        //create a point matrix if one isn't already defined
        points = processTransforms(this.points,this.transforms);
        position = q.isA(position) ? position : [0,0];
        result = drawBezCurve(canvas, points, this.start, position);
        return result;
    };

    /*
     * returns a curve object
     *
     * @arg Array points
     * @arg Array start
     * @arg Boolean validate
     * @return Object | Boolean
     */
    function crv(points, start, validate){
        var o = false;
        if(q.isA(points)){
            if(start !== undefined && q.isA(start) && start.length === 2 && q.isN(start[0]) && q.isN(start[1])){
                o = validate ?
                (validCurve(points)) ?
                new curve(points, start) :
                false :
                new curve(points, start) ;
            }
        }
        return o;
    }
    // POLY --------------------------------------------------------------------

    /*
     * constructor method for polygons
     * private implementation of form.poly
     *
     * @arg Number nPoints
     * @arg Number radius
     */
    polygon = function(nPoints, radius){
        form.apply(this,arguments);
        this.nPoints = nPoints;
        this.radius = radius;
    };

    // apply parent prototype before augmenting the child object
    k.inherit(polygon, form);

    polygon.prototype.draw = function(canvas, position){
        var result = false,
        points;
        //adjust polar co-ordinate resolution, rotate anticlockwise thru 90
        points = polygonToPoints(this.nPoints, this.radius);
        points = processTransforms(points,this.transforms);
        result = drawPath(canvas, points, position);
        return result;
    }

    /*
     * returns a poly object
     *
     * @arg Number nPoints
     * @arg Number radius
     * @return Object | Boolean
     */
    function poly(nPoints, radius){
        var o = false;
        if(q.isN(nPoints) && q.isN(radius)){
            o = new polygon(nPoints, radius);
        }
        return o;
    }
    // STAR --------------------------------------------------------------------
    /*
     * constructor method for stars
     * private implementation of form.star
     *
     * @param Number nPoints
     * @param Number radius1
     * @param Number radius2
     * @return Object | Boolean
     */
    function stella(nPoints, radius1, radius2){
        form.apply(this,arguments);
        this.nPoints = nPoints;
        this.radius1 = radius1;
        this.radius2 = radius2;
    }

    // apply parent prototype before augmenting the child object
    k.inherit(stella, form);

    stella.prototype.draw = function(canvas, position){
        var result = false,
        points;
        //adjust polar co-ordinate resolution, rotate anticlockwise thru 90
        pointsA = polygonToPoints(this.nPoints, this.radius1);
        pointsB = polygonToPoints(this.nPoints, this.radius2);
        pointsB = calc.rotate(pointsB, (360 / this.nPoints) / 2 );
        points = list.mix(pointsA, pointsB);
        points = processTransforms(points,this.transforms);
        result = drawPath(canvas, points, position);
        return result;
    };

    /**
     * @param Number n - minimum 3
     * @param Number r1
     * @param Number r2
     */
    function star(nPoints, radius1, radius2){
        var o = false;
        if(q.isN(nPoints) && (nPoints >= 3) && q.isN(radius1) && q.isN(radius2)){
            o = new stella(nPoints, radius1, radius2);
        }
        return o;
    }

    // WAVE --------------------------------------------------------------------
    /*
     * returns a wave object
     *
     * @arg Object p points
     * @return Object | Boolean
     */
    function wave(p){
        var o = false;
        if(q.isA(p)){
            o = {};
        }
        return o;
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
