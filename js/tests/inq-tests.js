module('inq',{
    setup : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
        this.str = 'foo';
        this.num = 123;
        this.arr = [1,2,3];
        this.boo = true;
        this.obj = {
            foo:'bar'
        };
        this.fn = function(){
            return 'foo';
        };
    },
    teardown : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
    }
});

test('methods',function(){
    //color
    ok(q.isF(inq.ink),'namespace:inq has method:ink');
});


