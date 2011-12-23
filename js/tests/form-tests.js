module('form',{
    setup : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
        this.rectangles = {
            a : form.rec(10,10),
            b : form.rec(20,20)            
        },
        this.circles = {
            a : form.crc(10),
            b : form.rec(20)
        },
        // this.paths = {
        //     a : form.path([[10,30],[20,10],[30,30],[40,10]])
        // },
        this.curves = {

        }
    },
    teardown : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
        this.rectangles = {
            a : form.rec(10,10),
            b : form.rec(20,20)            
        };
    }
});

test('exists', function() {
    ok(q.isO(form), 'the form namespace exists');
});

test('rec',function(){
    var r = this.rectangles;
    ok(q.isF(form.rec),'form.rec is a function');
    ok((form.rec(this.str) === false &&
        form.rec(this.arr) === false &&
        form.rec(this.obj) === false &&
        form.rec(this.bool) === false &&
        form.rec(this.fn) === false), 'form.rec returns false on bad arguments');
    ok(q.isO(form.rec(10,10)), 'form.rec returns Object when provided with appropriate arguments');
    ok((!q.isU(r.a.w) && q.isN(r.a.w)), 'objects produced by form.rec have an Integer property : w');
    ok((!q.isU(r.a.h) && q.isN(r.a.h)), 'objects produced by form.rec have an Integer property : h');    
    ok((function(){
        r.b.x = 'foo';//bad value
        return r.a.x !== 'foo';
    }()), 'objects produced by form.rec have instance specific properties');
    ok(q.isF(r.a.draw), 'objects produced by form.rec have a method called draw');
    ok((r.a.draw(1) === false &&
        r.a.draw('s') === false &&
        r.a.draw([]) === false &&
        r.a.draw({}) === false &&
        r.a.draw(true) === false ), 'the drawing method requires a canvas element for the first argument');   
});

test('rec.rotate',function(){
    var r = this.rectangles;        
    
    //ROTATE
    ok(q.isF(r.a.rotate),'objects created by form.rec have a method: rotate');
    ok((r.a.rotate(this.str) === false &&
        r.a.rotate(this.arr) === false &&
        r.a.rotate(this.bool) === false &&
        r.a.rotate(this.obj) === false &&
        r.a.rotate(this.fn) === false &&
        r.a.rotate(10) === true),'rotate returns false unless passed a Number argument'); 
    r.a.transforms = [];
    r.a.rotate(10);
    ok(r.a.transforms[0]['type']  === 'rotate','calling the rotate method puts an object with a type property "rotate" into the transforms array');
    r.a.rotate(12);
    ok((r.a.transforms[0]['type']  === 'rotate' && r.a.transforms[0]['value'] === 10 &&
        r.a.transforms[1]['type']  === 'rotate' && r.a.transforms[1]['value'] === 12
        ),'calling the rotate method more than once puts additional objects with a type property "rotate" into the "transforms" array');
});

test('rec.scale',function(){
    var r = this.rectangles;        
    ok(q.isF(r.a.scale),'objects created by form.rec have a method: scale');
    ok((r.a.scale(this.str) === false &&
        r.a.scale(this.num) === false &&
        r.a.scale(this.obj) === false &&
        r.a.scale(this.bool) === false &&
        r.a.scale(this.fn) === false &&
        r.a.scale(10,10) === true),'scale returns false unless passed two Number arguments'); 
    r.a.transforms = [];
    r.a.scale(10,10);
    ok(r.a.transforms[0]['type']  === 'scale','calling the scale method puts an object with a type property "scale" into the transforms array');
    r.a.scale(20,20);
    ok((r.a.transforms[0]['type']  === 'scale' && q.isA(r.a.transforms[0]['value']) && r.a.transforms[0]['value'][0] === 10 &&
        r.a.transforms[1]['type']  === 'scale' && q.isA(r.a.transforms[1]['value']) && r.a.transforms[1]['value'][0] === 20
        ),'calling the scale method more than once puts additional objects with a type property "scale" into the "transforms" array');
});


test('crc',function(){
    var c = this.circles;   
    ok(typeof form.crc === 'function','form.crc is a function');
    ok((form.crc(this.str) === false &&
        form.crc(this.arr) === false &&
        form.crc(this.obj) === false &&
        form.crc(this.bool) === false &&
        form.crc(this.fn) === false),
    'form.crc returns false if not provided a numeric argument');
    ok(q.isO(form.crc(10)),'form.crc returns a circle object if provided with a numeric argument');
    c.a.transforms = [];
    c.a.scale(10,10);
    ok(c.a.transforms[0]['type']  === 'scale','calling the scale method puts an object with a type property "scale" into the transforms array');
    c.a.scale(20,20);
    ok((c.a.transforms[0]['type']  === 'scale' && q.isA(c.a.transforms[0]['value']) && c.a.transforms[0]['value'][0] === 10 &&
        c.a.transforms[1]['type']  === 'scale' && q.isA(c.a.transforms[1]['value']) && c.a.transforms[1]['value'][0] === 20
        ),'calling the scale method more than once puts additional objects with a type property "scale" into the "transforms" array');
});

test('crv',function(){
    var t,
    goodPoints = [
    [[10,10],[30,10],[20,10]],
    [[10,20],[30,20],[20,20]],
    [[10,30],[30,30],[20,30]],
    [[10,10],[30,10],[20,10]]
    ],
    badPoints = [
    [[101,'10'],[30,10],[20,10]],
    [[10,20],[30,20],[20,20]],
    [[10,30],[30,30],[20,30]],
    [[10,10],[30,10],[20,10]]
    ];

    ok(typeof form.crv === 'function','form.crv is a function');
    ok((form.crv(this.str) === false &&
        form.crv(this.num) === false &&
        form.crv(this.obj) === false &&
        form.crv(this.bool) === false &&
        form.crv(this.fn) === false &&
        q.isO(form.crv(badPoints,[0,0],true)) === false && //trigger strict validation of curve
        q.isO(form.crv(goodPoints,[0,'0'])) === false),
    'form.crv returns false on bad arguments');
    
    
    ok(q.isO(form.crv(goodPoints,[10,10])),'form.crv returns a curve object if provided with a list of arrays containing three pairs of xy co-ordinates, followed by a single xy pair array');

    testCrv = form.crv(goodPoints,[10,10]);
    testCrv.transforms = [];
    testCrv.scale(10,10);
    ok(testCrv.transforms[0]['type']  === 'scale','calling the scale method puts an object with a type property "scale" into the transforms array');
    testCrv.scale(20,20);
    ok((testCrv.transforms[0]['type']  === 'scale' && q.isA(testCrv.transforms[0]['value']) && testCrv.transforms[0]['value'][0] === 10 &&
        testCrv.transforms[1]['type']  === 'scale' && q.isA(testCrv.transforms[1]['value']) && testCrv.transforms[1]['value'][0] === 20
        ),'calling the scale method more than once puts additional objects with a type property "scale" into the "transforms" array');
});

form.validCurve([
    [[10,10],[10,10],[10,10]],
    [[10,10],[10,10],[10,10]],
    [[10,10],[10,10],[10,10]],
    [[10,10],[10,10],[10,10]]]);

/*
test('wave',function(){
    ok(typeof form.wave === 'function','form.wave is a function');
    ok((form.wave(this.str) === false &&
        form.wave(this.num) === false &&
        form.wave(this.obj) === false &&
        form.wave(this.bool) === false &&
        form.wave(this.fn) === false),
    'form.wave returns false on bad arguments');
    ok(q.isO(form.crc(10)),'form.crc returns a circle object if provided with a numeric argument');
    c.a.transforms = [];
    c.a.scale(10,10);
    ok(c.a.transforms[0]['type']  === 'scale','calling the scale method puts an object with a type property "scale" into the transforms array');
    c.a.scale(20,20);
    ok((c.a.transforms[0]['type']  === 'scale' && q.isA(c.a.transforms[0]['value']) && c.a.transforms[0]['value'][0] === 10 &&
        c.a.transforms[1]['type']  === 'scale' && q.isA(c.a.transforms[1]['value']) && c.a.transforms[1]['value'][0] === 20
        ),'calling the scale method more than once puts additional objects with a type property "scale" into the "transforms" array');
});
        */
