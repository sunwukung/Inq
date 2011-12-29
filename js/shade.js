/**
 *  @package inq
 *  inq.js
 *
 *  This file is part of the 'inq' javascript library.
 *
 *  inq.js is free software: you can redistribute it and/or modify
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
 *  @projectDescription this script provides the colour rendering capabilities of the inq canvas library
 */
var shade = ( function(module) {
    var style;
    /**
     * create a new ink instance
     *
     * @param array | object | string color
     * @param array | object | string fill
     * @param array | object | number line
     */
    _style = function(color, line, fill) {
        this.strokeStyle = 'rgba(0,0,0,100)';
        this.fillStyle = 'rgba(0,0,0,0)';
        this.lineWidth = 1;
        this.lineCap = 'square';
        this.lineJoin = 'round';
        this.miterLimit = 10;
        this.fill = false;
        this.stroke = false;
        this.close = true;
    //        if(line) {
    //            this._setLine(line, this);
    //        }
    //        if(color) {
    //            this.strokeStyle = this._parseColor(color);
    //        }
    //        if(fill) {
    //            this.fillStyle = this._parseColor(fill);
    //        }
    };

    /**
     * @param Array color
     */
    function validColor(color){
        var result = false;
        if(q.isA(color)){
            if(color.length === 3 &&
                list.valid(color, function(i){
                    return q.isN(i) && i<=255 && i>=0;
                })){
                result = true;
            }
        }
        return result;
    }
    
    /**
         * return an ink object
         *
         * @param Array color
         * @param Number line
         * @param Boolean fill
         */
    module.style = function(color, line, fill) {
        //validate args
        var result = false, valid;
        if(validColor(color)){
            valid = line === undefined ? true : q.isN(line);
            if(valid && fill !== undefined){
                valid = (q.isB(fill));
            }
            result = valid ? new _style(color, line, fill) : valid;
        }
        return result;
    };
    
    /**
	 * process line settings
	 *
	 * @param string | object | number line
    style.prototype._setLine = function(line) {
        switch(line.constructor) {
            case Number:
                this.lineWidth = line;
                break;
            case String:
                this.lineWidth = Number(line);
                break;
            case Object:
                this._parseLineObject(line);
                break;
        }

    }
	 */
    /**
	 * parse variable argument types that can be used for color specification
	 *
	 * @param string | array | object color
    style.prototype._parseColor = function(color) {
        switch(color.constructor) {
            case String:
                return color;
                break;
            case Array:
                return this._parseColorArray(color);
                break;
            case Object:
                return this._parseColorObject(color);
                break;
        }
    }
	 */
    /**
	 * parse array color configuration
	 *
	 * @param array color
    style.prototype._parseColorArray = function(color) {
        if(color.length === 4) {
            return 'rgba(' + color.join(',') + ')';
        }
        if(color.length === 3) {
            return 'rgb(' + color.join(',') + ')';
        }
        return 'rgb(0,0,0)';
    }
	 */
    /**
	 * parse object color configuration
	 *
	 * allow rgb(a - optional) properties or gradient specification
	 *
	 * @param object color
    style.prototype._parseColorObject = function(color) {
        var val, col = [];
        // if a gradient object is passed, return it immediately
        if(color.gradient) {
            return color;
        }
        //parse rgb(a) objects
        col.push(color.r || 0);
        col.push(color.g || 0);
        col.push(color.b || 0);
        if(color.a) {
            col.push(color.a);
        }
        val = col.join(',');
        return col.length === 3 ? 'rgb(' + val + ')' : 'rgba(' + val + ')';
    }
	 */
    /**
	 * parse a line configuration object
	 *
	 * @param object line
    style.prototype._parseLineObject = function(line) {
        var shorthand = {
            cap : 'lineCap',
            join : 'lineJoin',
            width : 'lineWidth',
            limit : 'miterLimit',
            c : 'lineCap',
            j : 'lineJoin',
            w : 'lineWidth',
            l : 'miterLimit'
        }
        var i;
        for(i in line) {
            if(this.hasOwnProperty(i)) {
                this[i] = line[i];
            } else if(this.hasOwnProperty(shorthand[i])) {
                this[shorthand[i]] = line[i];
            }
        }
    }
	 */
    return module;

}(shade || {}));
