/**
 *  @package calc
 *  calc.js
 *
 *  This file is part of the 'inq' javascript library.
 *
 *  calc.js is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  calc.js is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with calc.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  @author Marcus Kielly
 *  @version 1.0
 *  @projectDescription this script provides the geometric calculations/transformations of the inq canvas library
 *  @todo consolidate variable naming conventions
 */
var calc = ( function(module) {
    
    /*
    * converts degrees to radians
    *
    * @arg Number d
    * @return Number r
    * @todo allow for varying decimal precision
    */
    function degreesToRadians(d){
        var r = false;
        if(q.isN(d)){
            r = d * (Math.PI/180);
            r = (q.isN(r)) ? Number(r.toFixed(3)) : false;
        }
        return r;
    }
    
    /*
     * converts radians to degrees 
     *
     * @arg Number r
     * @return Number d
     * @todo allow for varying decimal precision
     */
    function radiansToDegrees(r){
        var d = false;
        if(q.isN(r)){
            d = r * (180/ Math.PI);
            d = (q.isN(d)) ? Number(d.toFixed(3)) : false;
        }
        return d;
    }
    
    /*
    * converts cartesian co-ordinates into polar co-ordinates
    *
    * @arg Object p : {r:Number, t:Number}
    * @return Object result : {x:Number, y:Number}
    */
    function polarToCartesian(p){
        var x,
        y,
        result = false;
            
        if(q.isO(p) && q.objHas(p,'r') && q.objHas(p,'t') && (q.isN(p.r)) && (q.isN(p.t)) ){                  
            x = p.r * Math.cos(p.t),
            y = p.r * Math.sin(p.t);
            result = {
                x:x,
                y:y
            };
        }
        
        return result;
    }
    
    /*
    * converts polar co-ordinates into cartesian co-ordinates
    *
    * @arg Object c : {x:Number, y:Number}
    * @return Object result : {r:Number, t:Number}
    */
    function cartesianToPolar(c){
        var result = false;
        if(q.isO(c) && q.objHas(c,'x') && q.objHas(c,'y') && (q.isN(c.x)) && (q.isN(c.y)) ){
            result = {
                r:Math.sqrt((c.x * c.x) + (c.y * c.y)),
                t:Math.atan2(c.y,c.x)//value is "fixed"               
            };
        }        
        return result;
    }  
    
    function movePoint(points, position){
        return [
        points[0]+position[0],
        points[1]+position[1]
        ];
    }

    /**
     * move each item in points by the amount specified in position
     *
     * @arg Array points
     * @arg Number n
     * @return Array | Boolean
     */
    function move(points,position){
        var result = false;
        if(q.isA(points) && q.isA(position) && position.length === 2 && q.isN(position[0]) && q.isN(position[1])){
            result = (points.length === 2 && q.isN(points[0]) && q.isN(points[1])) ?
                result = movePoint(points,position) :
                k.each(points,function(p){//recurse
                    return move(p,position);
                });
        }
        return result;
    }

    /**
    * rotate point around its origin point by n degrees
    *
    * @arg Array point
    * @arg Number n
    */
    function rotatePoint(point,degrees){
        var result = false,
        pPolar,
        pCart;
        //convert to polar
        pPolar = cartesianToPolar({
            x:point[0],
            y:point[1]
        });//map points to properties
        pPolar.t += degreesToRadians(degrees);
        pCart = polarToCartesian(pPolar);
        result = [pCart.x,pCart.y];
        return result;
    }
   
    /**
     * rotate each item in points around its origin point by n degrees
     * 
     * @arg Array points
     * @arg Number n
     * @return Array | Boolean
     */ 
    function rotate(points,degrees){
        var result = false;
        if(q.isA(points) && !q.isEA(points) && q.isN(degrees)){
            result = (points.length === 2 && q.isN(points[0])) ?
            rotatePoint(points,degrees) : // xy pair
            k.each(points,function(p){ //recurse
                return rotate(p,degrees);
            });
        }
        return result;
    }

    /*
    * scale point relative to its origin point
    *
    * @arg Array points
    * @arg Array scale
    * @return Array Z Boolean
    */
    function scalePoint(point,scale){
        var result = false;
        if(q.isA(point) && q.isA(scale)){
            result = k.stripe(point,
                function(p){
                    return p * scale[0];
                },
                function(p){
                    return p * scale[1];
                }
                );
        }
        return result;
    }

    
    /*
    * scale each item in points relative to its origin point
    *
    * @arg Array points
    * @arg Array scale
    * @return Array Z Boolean
    */
    function scale(points,scl){
        var result = false;
        if(q.isA(points) && q.isA(scl)){
            result = (points.length === 2 && q.isN(points[0]))?
                scalePoint(points,scl) :
                k.each(points,function(p){
                    return scale(p,scl);
                });
        }
        return result;
    }
    
    //REVEAL
    module.move = move;
    module.rotate = rotate;
    module.scale = scale;
    module.radiansToDegrees = radiansToDegrees;
    module.degreesToRadians = degreesToRadians;
    module.polarToCartesian = polarToCartesian;
    module.cartesianToPolar = cartesianToPolar;
    return module;
    
}(calc || {}));

   /* transforms a set of co-ordinates to a new position
     *
     * it assumes the points array is a collection of pairs or sixes
     *
     * @arg Array position
     * @arg Array points
     * @todo make recursive
    function move(position, points){
        var newPoints = [], subPoints;
        k.each(points,
            function(p){
                if(q.isN(p[0]) && p.length === 2){
                    subPoints = k.stripe(p,
                        function(sp){
                            return sp + position[0];
                        },
                        function(sp){
                            return sp + position[1];
                        });
                    newPoints.push(subPoints);
                } else if (p.length > 2){
                    //iterate
                    newPoints.push(move(position,p));
                }
            });
        return newPoints;
    }
     */