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
    ok(q.isA(calc.rotate(this.xy,10)),'rotate returns a series of transformed points if provided with the right arguments');
    var recursiveArr = calc.rotate([
        [10,10],//depth 1
        [[20,20],[30,30]],//depth 2
        [[[40,40],[50,50],[60,60]]]//depth 3
        ],10);
    ok(q.isA(recursiveArr),'rotate recurses into an array structure until it encounters numeric pairs');
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

test('move',function(){
    ok(q.isF(calc.move),'calc.move exists');
    ok((calc.move('foo',[]) === false &&
        calc.move(123,[]) === false &&
        calc.move({},[]) === false &&
        calc.move(true,[]) === false &&
        calc.move([],'foo') === false &&
        calc.move([],{}) === false &&
        calc.move([],123) === false &&
        calc.move([],true) === false), 'move returns false unless when given bad arguments');
    var depthOne = calc.move(
            [10,20],
            [50,10]),//[60,30]
        depthTwo = calc.move(
            [[10,60],[20,50],[30,40]],
            [10,10]),//[[20,70][30,60],[40,50]]
        depthThree = calc.move(
            [[[10,120],[20,110]],
             [[30,100],[40,90]],
             [[50,80],[60,70]]],
            [10,10]);
            /*
             [[[20,130],[30,120]],
             [[40,110],[50,100]],
             [[60,90],[70,80]]]
             */
            console.log(depthThree);
            console.log(depthThree[0][0][1]);
    ok((depthOne[0] === 60 && depthOne[1] === 30),'calc.move applies calculation to single arrays');
    ok((q.isA(depthTwo[0]) &&
        depthTwo[0][0] === 20 && depthTwo[0][1] === 70 &&
        depthTwo[1][0] === 30 && depthTwo[1][1] === 60 &&
        depthTwo[2][0] === 40 && depthTwo[2][1] === 50
        ),'calc.move applies  calculation to an array with a depth of 2');
    ok((q.isA(depthThree) &&
        q.isA(
            depthThree[0]) && q.isA(depthThree[1]) && q.isA(depthThree[2]) &&
            depthThree[0][0][0] === 20 && depthThree[0][0][1] === 130 && depthThree[0][1][0] === 30 && depthThree[0][1][1] === 120 &&
            depthThree[1][0][0] === 40 && depthThree[1][0][1] === 110 && depthThree[1][1][0] === 50 && depthThree[1][1][1] === 100 &&
            depthThree[2][0][0] === 60 && depthThree[2][0][1] === 90 && depthThree[2][1][0] === 70 && depthThree[2][1][1] === 80
        ),'calc.move applies calculation to all eligible elements in a nested array structure');
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

