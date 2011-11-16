/**
 *  @package geom
 *  geom.js
 *
 *  This file is part of the 'inq' javascript library.
 *
 *  geom.js is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  geom.js is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with geom.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  @author Marcus Kielly
 *  @version 1.0
 *  @projectDescription this script provides the geometric calculations/transformations of the inq canvas library
 */
var geom = ( function(module) {
    
    /*
    * converts degrees to radians
    *
    * @arg Number d
    * @return Number r
    */
    function degreesToRadians(d){
        var r = false;
        if(q.isN(d)){
            r = d * (Math.PI/180);
        }
        return r;
    }
    
    /*
     * converts radians to degrees 
     *
     * @arg Number r
     * @return Number d
     */
    function radiansToDegrees(r){
        var d = false;
        if(q.isN(r)){
            d = r * (180/ Math.PI);
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
    
    /**
    * rotate point around its origin point by n degrees
    * 
    * @arg Array point
    * @arg Number n
    */ 
    function rotatePoint(point,d){
        var result = false, pPolar;
        if(q.isA(point) && point.length === 2 && q.isN(point[0]) && q.isN(point[1])){
         //convert to polar
         pPolar = cartesianToPolar({x:point[0],y:point[1]});//map points to propertie
         pPolar.t += degreesToRadians(d);
         pCart = polarToCartesian(pPolar);
         result = [pCart.x,pCart.y];
        }
        return result;
    }
    
    /**
     * rotate each item in points around its origin point by n degrees
     * 
     * @arg Array points
     * @arg Number n
     * @return Array | Boolean
     */ 
    function rotate(points,d){
        var result = false, i = 0, len, np, newPoints = [],mRotatePoint;
        if(q.isA(points) && q.isN(d)){
            mRotatePoint = k.memo(rotatePoint);
            //iterate over the array
            len = points.length;
            while(i < len){  
               np = mRotatePoint(points[i],d);
               newPoints.push(np);
               i += 1;
            }
            result = newPoints;
            
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
        if(q.isA(point) && point.length === 2 && q.isA(scale) && point.length === 2){
            point[0] = point[0] * scale[0];
            point[1] = point[1] * scale[1];
            result = point;
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
    function scale(points,scale){
        var result = false, i = 0, len, np, newPoints = [];
        if(q.isA(points) && q.isA(scale)){
            len = points.length;
            while(i < len){  
               np = scalePoint(points[i],scale);
               newPoints.push(np);
               i += 1;
            }
            result = newPoints;
        }
        return result;
    }
    
    //REVEAL
    module.rotate = rotate;
    module.scale = scale;
    module.radiansToDegrees = radiansToDegrees;
    module.degreesToRadians = degreesToRadians;
    module.polarToCartesian = polarToCartesian;
    module.cartesianToPolar = cartesianToPolar;
    return module;
    
}(geom || {}));