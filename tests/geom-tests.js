module("geom", {
  setup: function() {
    this.p = geom.cartesianToPolar({x:10,y:10});
    this.c = geom.polarToCartesian(this.p);
    this.xy = [[10,10],[50,10],[50,45],[10,10]]; 
  }
});

test('module exists', function() {
    ok(typeof geom === 'object', 'the geom namespace exists');
});

test('rotate',function(){
    
    ok(q.isF(geom.rotate),'geom.rotate exists');
    ok((geom.rotate('foo',10) === false && 
       geom.rotate(123,10) === false &&
       geom.rotate({},10) === false &&
       geom.rotate(true,10) === false &&
       geom.rotate(this.xy,'foo') === false && 
       geom.rotate(this.xy,{}) === false &&
       geom.rotate(this.xy,[]) === false &&
       geom.rotate(this.xy,true) === false &&
       q.isA(geom.rotate(this.xy,10))), 'rotate returns false unless first argument is an array and second argument is an integer');
    //ok(geom.rotate([1,2,3],10) === false, 'rotate returns false if the first array is not composed of paired sub-arrays');
    ok(q.isA(geom.rotate(this.xy,10)),'rotate returns a series of transformed points if provided with the right arguments');
    
    });
    
test('scale',function(){
    ok(q.isF(geom.scale),'geom.scale exists');
    ok((geom.scale('foo',[]) === false && 
        geom.scale(123,[]) === false &&
        geom.scale({},[]) === false &&
        geom.scale(true,[]) === false &&
        geom.scale(this.xy,'foo') === false && 
        geom.scale(this.xy,{}) === false &&
        geom.scale(this.xy,123) === false &&
        geom.scale(this.xy,true) === false &&
        q.isA(geom.scale(this.xy,[]))), 'scale returns false unless first argument is an array and second argument is an integer'); 
    });

test('polarToCartesian',function(){
    ok(q.isF(geom.polarToCartesian),'geom.polarToCartesian is a function');
    ok((geom.polarToCartesian('foo') === false &&
        geom.polarToCartesian(123) === false &&
        geom.polarToCartesian([]) === false &&
        geom.polarToCartesian({foo:'bar'}) === false &&
        geom.polarToCartesian({r:'10',r:'10'}) === false &&
        geom.polarToCartesian(false) === false),
        'geom.polarToCartesian returns false on bad arguments');
    ok(q.objHas(this.p,'r') && q.objHas(this.p,'t') && q.isN(this.p.r) && q.isN(this.p.t),
        'geom.polarToCartesian returns object in format -> {x:<Number>,y:<Number>} when passed object in format -> {r:<Number>,t:<Number>}');
});

test('cartesianToPolar',function(){
    ok(q.isF(geom.cartesianToPolar),'convert.cartesianToPolar is a function');
    ok((geom.cartesianToPolar('foo') === false &&
        geom.cartesianToPolar(123) === false &&
        geom.cartesianToPolar([]) === false &&    
        geom.cartesianToPolar({foo:'bar'}) === false &&
        geom.cartesianToPolar({x:'10',y:'10'}) === false &&
        geom.cartesianToPolar(false) === false),
        'geom.cartesianToPolar returns false on bad arguments');  
    ok(q.objHas(this.c,'x') && q.objHas(this.c,'y') && q.isN(this.c.x) && q.isN(this.c.y),
        'geom.cartesianToPolar returns object in format -> {r:<Number>,t:<Number>} when passed object in format -> {x:<Number>,y:<Number>}');        
});

test('radiansToDegrees',function(){
    ok(q.isF(geom.radiansToDegrees),'geom.radiansToDegrees is a function');
    ok((geom.radiansToDegrees('foo') === false &&
        geom.radiansToDegrees({}) === false &&
        geom.radiansToDegrees([]) === false && 
        geom.radiansToDegrees(false) === false),
        'geom.radiansToDegrees returns false on bad arguments'); 
    ok(q.isN(geom.radiansToDegrees(1)),'geom.radiansToDegrees returns a radian value in degrees');
});

test('degreesToRadians',function(){
    ok(q.isF(geom.degreesToRadians),'geom.degreesToRadians is a function');
    ok((geom.degreesToRadians('foo') === false &&
        geom.degreesToRadians({}) === false &&
        geom.degreesToRadians([]) === false &&
        geom.degreesToRadians(false) === false),
        'geom.degreesToRadians returns false on bad arguments'); 
    ok(q.isN(geom.degreesToRadians(90)),'geom.degreesToRadians returns a radian value in degrees');
});

