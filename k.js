/**
 *  @package form
 *  k.js
 *
 *  This file is part of the 'inq' javascript library.
 *
 *  k.js is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  k.js is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with k.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  @author Marcus Kielly
 *  @version 1.0
 *  @projectDescription this script provides additional capabilities to the inq canvas library
 */
var k = ( function(module) {

    /* copy object and break reference 
     *
     * @arg Object obj
     * @return Object copy
     * @return Boolean result
     */
    function clone(obj) {
        var result = obj;
        if (q.isO(obj)) {
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            result = copy;
        }
        return result;
    };  
    
    /*
    * pseudo classical inheritance pattern
    *
    * @arg Object c child
    * @arg Object p parent
    * @return Boolean result
    */
    function inherit(c, p) {
        var result = false;
        if(q.isF(c) && q.isF(p)){
            function f() {};
            //could cache F in anoynymous function here...
            f.prototype = p.prototype;
            c.prototype = new f();    
            c.prototype.constructor = c;
            result = true;
        }
        return result;
    };
    
    /*
    * Doug Crockford prototype inheritance pattern 
    *  
    * @arg Object o
    * @return Object | Boolean result
    */
    function proto(o){
        var result = false;
        if(q.isO(o)){
            function f(){};
            f.prototype = o;
            result = new f();
        }
        return result;
    }; 
    
    /*
    * memoize.js
    * by @philogb and @addyosmani
    * with further optimizations by @mathias
    * and @DmitryBaranovsk
    * perf tests: http://bit.ly/q3zpG3
    * Released under an MIT license.
    */
    function memo( fn ) {
        return function () {
            var args = Array.prototype.slice.call(arguments),
                hash = "",
                i = args.length;
            currentArg = null;
            while (i--) {
                currentArg = args[i];
                hash += (currentArg === Object(currentArg)) ?
                JSON.stringify(currentArg) : currentArg;
                fn.memoize || (fn.memoize = {});
            }
            return (hash in fn.memoize) ? fn.memoize[hash] :
                fn.memoize[hash] = fn.apply(this, args);
        };
    }
    
    module.clone = clone;
    module.inherit = inherit;
    module.proto = proto;
    module.memo = memo;
    
    return module;
}(k || {}));