module('shade',{
    setup : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
        this.str = 'foo';
        this.num = 123;
        this.arr = [1,2,3];
        this.bool = true;
        this.obj = {
            foo:'bar'
        };
        this.fn = function(){
            return 'foo';
        };
        this.rgb = [255,255,255];
    },
    teardown : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
    }
});

test('style',function(){
    //color
    ok(q.isF(shade.style),'namespace:color has method:style');
    ok((shade.style(this.str) === false &&
        shade.style(this.num) === false &&
        shade.style(this.bool) === false &&
        shade.style(this.fn) === false &&
        shade.style(this.obj) === false &&
        shade.style([255,255,'255']) === false &&
        shade.style([255,255,256]) === false &&
        shade.style([-1,255,255]) === false &&
        q.isO(shade.style(this.rgb))
        ), 'color.style returns false if first argument is not an array of three Numbers in range 0-255');
    ok((shade.style(this.rgb, this.str) === false &&
        shade.style(this.rgb, this.arr) === false &&
        shade.style(this.rgb, this.fn) === false &&
        shade.style(this.rgb, this.obj) === false &&
        shade.style(this.rgb, this.bool) === false &&
        q.isO(shade.style(this.rgb, 1))
        ),'color.style returns false if (optional) second argument is not a number');
    ok((shade.style(this.rgb, this.num, this.str) === false &&
        shade.style(this.rgb, this.num, this.num) === false &&
        shade.style(this.rgb, this.num, this.arr) === false &&
        shade.style(this.rgb, this.num, this.obj) === false &&
        shade.style(this.rgb, this.num, this.fn) === false &&
        q.isO(shade.style(this.rgb, this.num, this.bool))
        ),'color.style returns false if (optional) third argument is not a number');
    
});


