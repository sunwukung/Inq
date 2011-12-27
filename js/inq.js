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
var inq = ( function(module) {
/**
	 * create a new ink instance
	 *
	 * @param array | object | string color
	 * @param array | object | string fill
	 * @param array | object | number line
	 */
	var ink = function(line, color, fill) {
		this.strokeStyle = 'rgba(0,0,0,100)';
		this.fillStyle = 'rgba(0,0,0,0)';
		this.lineWidth = 1;
		this.lineCap = 'square';
		this.lineJoin = 'round';
		this.miterLimit = 10;
		this.fill = false;
		this.stroke = false;
		this.close = true;
		if(line) {
			this._setLine(line, this);
		}
		if(color) {
			this.strokeStyle = this._parseColor(color);
		}
		if(fill) {
			this.fillStyle = this._parseColor(fill);
		}
	};
	/**
	 * return an ink object
	 * color and fill can be supplied as
	 * strings, arrays or objects
	 * objects can use 2 schema
	 * r:x,g:y,b:z
	 * gradient:{vector:array{4,6},range: array}
	 * @param string | array | object color
	 * @param string | array | object fill
	 * @param string | int line width
	 * @constructor
	 */
	module.ink = function(line, color, fill) {
		return new ink(line, color, fill);
	};
	/**
	 * process line settings
	 *
	 * @param string | object | number line
	 */
	ink.prototype._setLine = function(line) {
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
	/**
	 * parse variable argument types that can be used for color specification
	 *
	 * @param string | array | object color
	 */
	ink.prototype._parseColor = function(color) {
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
	/**
	 * parse array color configuration
	 *
	 * @param array color
	 */
	ink.prototype._parseColorArray = function(color) {
		if(color.length === 4) {
			return 'rgba(' + color.join(',') + ')';
		}
		if(color.length === 3) {
			return 'rgb(' + color.join(',') + ')';
		}
		return 'rgb(0,0,0)';
	}
	/**
	 * parse object color configuration
	 *
	 * allow rgb(a - optional) properties or gradient specification
	 *
	 * @param object color
	 */
	ink.prototype._parseColorObject = function(color) {
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
	/**
	 * parse a line configuration object
	 *
	 * @param object line
	 */
	ink.prototype._parseLineObject = function(line) {
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
	return module;

}(inq || {}));
