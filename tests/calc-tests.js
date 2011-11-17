module("calc", {
  setup: function() {
    this.p = calc.cartesianToPolar({x:10,y:10});
    this.c = calc.polarToCartesian(this.p);
    this.xy = [[10,10],[50,10],[50,45],[10,10]]; 
  }
});

test('module exists', function() {
    ok(typeof calc === 'object', 'the calc namespace exists');
});

test('rotate',function(){
    
    ok(q.isF(calc.rotate),'calc.rotate exists');
    ok((calc.rotate('foo',10) === false && 
       calc.rotate(123,10) === false &&
       calc.rotate({},10) === false &&
       calc.rotate(true,10) === false &&
       calc.rotate(this.xy,'foo') === false && 
       calc.rotate(this.xy,{}) === false &&
       calc.rotate(this.xy,[]) === false &&
       calc.rotate(this.xy,true) === false &&
       q.isA(calc.rotate(this.xy,10))), 'rotate returns false unless first argument is an array and second argument is an integer');
    //ok(calc.rotate([1,2,3],10) === false, 'rotate returns false if the first array is not composed of paired sub-arrays');
    ok(q.isA(calc.rotate(this.xy,10)),'rotate returns a series of transformed points if provided with the right arguments');
    
    });
    
test('scale',function(){
    ok(q.isF(calc.scale),'calc.scale exists');
    ok((calc.scale('foo',[]) === false && 
        calc.scale(123,[]) === false &&
        calc.scale({},[]) === false &&
        calc.scale(true,[]) === false &&
        calc.scale(this.xy,'foo') === false && 
        calc.scale(this.xy,{}) === false &&
        calc.scale(this.xy,123) === false &&
        calc.scale(this.xy,true) === false &&
        q.isA(calc.scale(this.xy,[]))), 'scale returns false unless first argument is an array and second argument is an integer'); 
    });

test('polarToCartesian',function(){
    ok(q.isF(calc.polarToCartesian),'calc.polarToCartesian is a function');
    ok((calc.polarToCartesian('foo') === false &&
        calc.polarToCartesian(123) === false &&
        calc.polarToCartesian([]) === false &&
        calc.polarToCartesian({foo:'bar'}) === false &&
        calc.polarToCartesian({r:'10',r:'10'}) === false &&
        calc.polarToCartesian(false) === false),
        'calc.polarToCartesian returns false on bad arguments');
    ok(q.objHas(this.p,'r') && q.objHas(this.p,'t') && q.isN(this.p.r) && q.isN(this.p.t),
        'calc.polarToCartesian returns object in format -> {x:<Number>,y:<Number>} when passed object in format -> {r:<Number>,t:<Number>}');
});

test('cartesianToPolar',function(){
    ok(q.isF(calc.cartesianToPolar),'convert.cartesianToPolar is a function');
    ok((calc.cartesianToPolar('foo') === false &&
        calc.cartesianToPolar(123) === false &&
        calc.cartesianToPolar([]) === false &&    
        calc.cartesianToPolar({foo:'bar'}) === false &&
        calc.cartesianToPolar({x:'10',y:'10'}) === false &&
        calc.cartesianToPolar(false) === false),
        'calc.cartesianToPolar returns false on bad arguments');  
    ok(q.objHas(this.c,'x') && q.objHas(this.c,'y') && q.isN(this.c.x) && q.isN(this.c.y),
        'calc.cartesianToPolar returns object in format -> {r:<Number>,t:<Number>} when passed object in format -> {x:<Number>,y:<Number>}');        
});

test('radiansToDegrees',function(){
    ok(q.isF(calc.radiansToDegrees),'calc.radiansToDegrees is a function');
    ok((calc.radiansToDegrees('foo') === false &&
        calc.radiansToDegrees({}) === false &&
        calc.radiansToDegrees([]) === false && 
        calc.radiansToDegrees(false) === false),
        'calc.radiansToDegrees returns false on bad arguments'); 
    ok(q.isN(calc.radiansToDegrees(1)),'calc.radiansToDegrees returns a radian value in degrees');
});

test('degreesToRadians',function(){
    ok(q.isF(calc.degreesToRadians),'calc.degreesToRadians is a function');
    ok((calc.degreesToRadians('foo') === false &&
        calc.degreesToRadians({}) === false &&
        calc.degreesToRadians([]) === false &&
        calc.degreesToRadians(false) === false),
        'calc.degreesToRadians returns false on bad arguments'); 
    ok(q.isN(calc.degreesToRadians(90)),'calc.degreesToRadians returns a radian value in degrees');
});

