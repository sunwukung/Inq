/**
 *  @package list
 *  list.js
 *
 *  This file is part of the 'k' javascript library.
 *
 *  list.js is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  list.js is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with list.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  @author Marcus Kielly
 *  @version 1.0
 *  @projectDescription this script provides list processing utilities
 */
var list = ( function(module) {

    /**
     * apply function to map item in an array
     *
     * @param Array a
     * @param Function fn
     */
    function map(a, fn){
        var result = false,
        i = 0,
        n;
        if(q.isA(a) && q.isF(fn)){
            result = [];
            n = a.length;
            while(i < n){
                result.push(fn(a[i]));
                i += 1;
            }
        }
        return result;
    }

    /**
     * apply function to map item in an array that is divisible by x
     */
    function every(a, fn, x){
        var result = false,
        i = 0,
        r,
        n;
        if(q.isA(a) && q.isF(fn) && q.isN(x)){
            result = [];
            n = a.length;
            while(i < n){
                r = (i % x === 0) ?fn(a[i]):a[i];
                result.push(r);
                i += 1;
            }
        }
        return result;
    }

    /**
    * alternates function application over an array
    *
    * @param Array a
    * @param Function fnA
    * @param Function fnB
    */
    function stripe(a, fnA, fnB){
        var result = false, i = 0, n, r;
        if(q.isA(a) && q.isF(fnA) && q.isF(fnB)){
            result = [];
            n = a.length;
            while(i < n){
                r = ((i  % 2) === 0)? fnA(a[i]) : fnB(a[i]);
                result.push(r);
                i += 1;
            }
        }
        return result;
    }

    /**
     * applies function to chunks of an array
     *
     * @param Array a
     * @param Function fn
     * @param Number n chunk size
     */
    function chunk(a, fn, n){
        var result = false, i=0, len;
        if(q.isA(a) && q.isF(fn) && q.isN(n)){
            len = a.length;
            //ensure the chunk is compatible with the list size
            if(len % n === 0){
                //loop the array
                result = [];
                while(i < len){
                    result.push(fn(a.slice(i, i+n)));
                    i += n;
                }
            }
        }
        return result;
    }

    /**
     * base method for use in filtering and validation
     *
     * @param Array a
     * @param Function fn
     * @param Boolean c determines if the result should be collected
     */
    function test(a, fn, c){
        var result = false, i = 0, e = 0, len;
        if(q.isA(a) && q.isF(fn)){
            len = a.length;
            result = [];
            while(i < len){
                if(fn(a[i])){//if this item passes the filter criteria
                    result.push(a[i]);
                } else {//iterate error counter
                    e = e + 1;
                }
                i = i + 1;
            }
        }else{
            e = e + 1;
        }
        return (c === true) ? result : e === 0;

    }

    /**
     * returns only those elements of the array that evaluate to true when applied to f
     *
     * @param Array a
     * @param Function fn
     */
    function filter(a,fn){
        return test(a, fn, true);
    }

    /**
    * returns true if all items in the list evaluate to true when applied to f
    *
    * @param Array a
    * @param Function fn
    */
    function valid(a, fn){
        return test(a, fn, false);
    }


    module.map = map;
    module.every = every;
    module.stripe = stripe;
    module.chunk = chunk;
    module.filter = filter;
    module.valid = valid;

    return module;
}(list || {}));


