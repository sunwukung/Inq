module('form',{
    setup : function(){
        this.canvas = document.createElement('canvas').getContext('2d');
        this.rectangles = {
            a : form.rec(10,10),
            b : form.rec(20,20)            
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
        return r.a.x !== 'foo';}()), 'objects produced by form.rec have instance specific properties');         
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
    console.log(r.a);
    ok((r.a.transforms[0]['type']  === 'scale' && q.isA(r.a.transforms[0]['value']) && r.a.transforms[0]['value'][0] === 10 &&
       r.a.transforms[1]['type']  === 'scale' && q.isA(r.a.transforms[1]['value']) && r.a.transforms[1]['value'][0] === 20
    ),'calling the scale method more than once puts additional objects with a type property "scale" into the "transforms" array'); 
});

test('rec.origin',function(){
    var r = this.rectangles;  
    ok(q.isF(r.a.origin),'objects created by form.rec have a method: origin');
        ok((r.a.origin(this.str) === false &&
        r.a.origin(this.num) === false &&
        r.a.origin(this.obj) === false &&
        r.a.origin(this.bool) === false &&
        r.a.origin(this.fn) === false &&
        r.a.origin(10,10) === true),'origin returns false unless passed two Number arguments'); 
});


test('crc',function(){
    ok(typeof form.crc === 'function','form.crc is a function');
    ok((form.crc(this.str) === false &&
        form.crc(this.arr) === false &&
        form.crc(this.obj) === false &&
        form.crc(this.bool) === false &&
        form.crc(this.fn) === false),
        'form.crc returns false on bad arguments');
});

test('lin',function(){
    ok(typeof form.lin === 'function','form.lin is a function');
    ok((form.lin(this.str) === false &&
        form.lin(this.num) === false &&
        form.lin(this.obj) === false &&
        form.lin(this.bool) === false &&
        form.lin(this.fn) === false),
        'form.lin returns false on bad arguments');
});

test('crv',function(){
    ok(typeof form.crv === 'function','form.crv is a function');
    ok((form.crv(this.str) === false &&
        form.crv(this.num) === false &&
        form.crv(this.obj) === false &&
        form.crv(this.bool) === false &&
        form.crv(this.fn) === false),
        'form.crv returns false on bad arguments');
});
