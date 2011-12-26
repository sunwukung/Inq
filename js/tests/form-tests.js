module('form',{
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

// REC -------------------------------------------------------------------------

test('rec',function(){
    ok(q.isF(form.rec),'form.rec is a function');
    ok((form.rec(this.str) === false &&
        form.rec(this.arr) === false &&
        form.rec(this.obj) === false &&
        form.rec(this.bool) === false &&
        form.rec(this.fn) === false), 'form.rec returns false on bad arguments');
    var testRec = (form.rec(10, 10));
    ok(q.isO(testRec), 'form.rec returns Object when provided with appropriate arguments');
    ok((q.objHas(testRec,'width') && q.isN(testRec.width)), 'objects produced by form.rec have a Number property : "width"');
    ok((q.objHas(testRec,'height') && q.isN(testRec.height)), 'objects produced by form.rec have a Number property : "height"');
    ok(q.isF(testRec.rotate) && q.isF(testRec.scale) && q.isF(testRec.draw), 'rectangle objects have following methods: "rotate", "scale" and "draw"');
});

// CIRCLE ----------------------------------------------------------------------

test('crc',function(){
    ok(q.isF(form.crc),'form.crc is a function');
    ok((form.crc(this.str) === false &&
        form.crc(this.arr) === false &&
        form.crc(this.obj) === false &&
        form.crc(this.bool) === false &&
        form.crc(this.fn) === false),
    'form.crc returns false if not provided a numeric argument');
    var testCircle = form.crc(10);
    ok(q.objHas(testCircle,'radius') && q.isN(testCircle.radius), 'circle objects have a Number property : "radius"');
    ok(q.isO(testCircle),'form.crc returns a circle object if provided with a numeric argument');
    ok(q.isF(testCircle.rotate) && q.isF(testCircle.scale) && q.isF(testCircle.draw), 'circle objects have following methods: "rotate", "scale" and "draw"');
});

// PATH ------------------------------------------------------------------------

test('pth',function(){
    var testPath,
    goodPoints = [[10,10],[30,10],[20,10],[10,20]],
    badPoints = [[10,10],[30,10],[20,10],['10',20]];
    ok(q.isF(form.pth),'form.pth is a function');
    ok((form.pth(this.str) === false &&
        form.pth(this.num) === false &&
        form.pth(this.obj) === false &&
        form.pth(this.bool) === false &&
        form.pth(this.fn) === false &&
        q.isO(form.pth(badPoints,true)) === false),
    'form.pth returns false on bad arguments');
    testPath = form.pth(goodPoints,[10,10]);
    ok(q.objHas(testPath,'points') && q.isA(testPath.points), 'path objects have an Array property : "points"');
    ok(q.isO(testPath),'form.pth returns a curve object if provided with a list of arrays containing three pairs of xy co-ordinates, followed by a single xy pair array');
    ok(q.isF(testPath.rotate) && q.isF(testPath.scale) && q.isF(testPath.draw), 'path objects have following methods: "rotate", "scale" and "draw"');
});

// CRV -------------------------------------------------------------------------

test('crv',function(){
    var testCurve,
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

    ok(q.isF(form.crv),'form.crv is a function');
    ok((form.crv(this.str) === false &&
        form.crv(this.num) === false &&
        form.crv(this.obj) === false &&
        form.crv(this.bool) === false &&
        form.crv(this.fn) === false &&
        q.isO(form.crv(badPoints,[0,0],true)) === false && //trigger strict validation of curve
        q.isO(form.crv(goodPoints,[0,'0'])) === false),
    'form.crv returns false on bad arguments');
    testCurve = form.crv(goodPoints,[10,10]);
    ok(q.objHas(testCurve,'points') && q.isA(testCurve.points), 'curve objects have an Array property : "points"');
    ok(q.objHas(testCurve,'start') && q.isA(testCurve.start), 'curve objects have an Array property : "start"');
    ok(q.isO(testCurve),'form.crv returns a curve object if provided with a list of arrays containing three pairs of xy co-ordinates, followed by a single xy pair array');
    ok(q.isF(testCurve.rotate) && q.isF(testCurve.scale) && q.isF(testCurve.draw), 'curve objects have following methods: "rotate", "scale" and "draw"');
});

// POLY ------------------------------------------------------------------------

test('poly',function(){
    ok(q.isF(form.poly),'form.poly is a function');
    ok((form.poly(this.str) === false &&
        form.poly(this.obj) === false &&
        form.poly(this.bool) === false &&
        form.poly(this.fn) === false &&
        form.poly(this.arr) === false),
    'form.poly returns false on bad arguments');
    var testPoly = form.poly(5,10);
    ok(q.isO(testPoly),'form.poly returns an object "poly" when passed (Number:points, Number:radius)');
    ok(q.objHas(testPoly,'nPoints') && q.isN(testPoly.nPoints), 'poly objects have a Number property : "nPoints"');
    ok(q.objHas(testPoly,'radius') && q.isN(testPoly.radius), 'poly objects have a Number property : "radius"');
    ok(q.isF(testPoly.rotate) && q.isF(testPoly.scale) && q.isF(testPoly.draw), 'poly objects have following methods: "rotate", "scale" and "draw"');
});

// STAR ------------------------------------------------------------------------

test('star', function(){
    ok(q.isF(form.star),'the form namespace contains a method: star');
    ok((form.star(this.str, this.num, this.num) === false &&
        form.star(this.obj, this.num, this.num) === false &&
        form.star(this.bool, this.num, this.num) === false &&
        form.star(this.fn, this.num, this.num) === false &&
        form.star(this.arr, this.num, this.num) === false && // reject bad first
        form.star(this.num, this.str, this.num) === false &&
        form.star(this.num, this.obj, this.num) === false &&
        form.star(this.num, this.bool, this.num) === false &&
        form.star(this.num, this.fn, this.num) === false &&
        form.star(this.num, this.arr, this.num) === false &&
        form.star(this.num, this.num, this.str) === false &&
        form.star(this.num, this.num, this.obj) === false &&
        form.star(this.num, this.num, this.bool) === false &&
        form.star(this.num, this.num, this.fn) === false &&
        form.star(this.num, this.num, this.arr) === false &&
        form.star(2, this.num, this.num) === false //minimum of 3 points in a star
        ),
    'form.star returns false on bad arguments');
    var testStar = form.star(3,2,5);
    ok(q.isO(testStar),'form.star returns an object of type "star" when passed (Number:points, Number:radius1, Number:radius2)');
    ok(q.objHas(testStar,'nPoints') && q.isN(testStar.nPoints), 'star objects have a Number property : "nPoints"');
    ok(q.objHas(testStar,'radius1') && q.isN(testStar.radius1), 'star objects have a Number property : "radius1"');
    ok(q.objHas(testStar,'radius2') && q.isN(testStar.radius2), 'star objects have a Number property : "radius2"');
    ok(q.isF(testStar.rotate) && q.isF(testStar.scale) && q.isF(testStar.draw), 'star objects have following methods: "rotate", "scale" and "draw"');
});

// INSTANCES ------------------------------------------------------------------
test('instances', function(){

    });


// METHODS ------------------------------------------------------------------
test('methods', function(){

    });

/*
 * REINSTATE FOR ALL FORMS - use an array
 *
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

 c.a.transforms = [];
    c.a.scale(10,10);
    ok(c.a.transforms[0]['type']  === 'scale','calling the scale method puts an object with a type property "scale" into the transforms array');
    c.a.scale(20,20);
    ok((c.a.transforms[0]['type']  === 'scale' && q.isA(c.a.transforms[0]['value']) && c.a.transforms[0]['value'][0] === 10 &&
        c.a.transforms[1]['type']  === 'scale' && q.isA(c.a.transforms[1]['value']) && c.a.transforms[1]['value'][0] === 20
        ),'calling the scale method more than once puts additional objects with a type property "scale" into the "transforms" array');

    testCrv = form.crv(goodPoints,[10,10]);
    testCrv.transforms = [];
    testCrv.scale(10,10);
    ok(testCrv.transforms[0]['type']  === 'scale','calling the scale method puts an object with a type property "scale" into the transforms array');
    testCrv.scale(20,20);
    ok((testCrv.transforms[0]['type']  === 'scale' && q.isA(testCrv.transforms[0]['value']) && testCrv.transforms[0]['value'][0] === 10 &&
        testCrv.transforms[1]['type']  === 'scale' && q.isA(testCrv.transforms[1]['value']) && testCrv.transforms[1]['value'][0] === 20
        ),'calling the scale method more than once puts additional objects with a type property "scale" into the "transforms" array');


    testPth = form.pth(goodPoints,[10,10]);
    testPth.transforms = [];
    testPth.scale(10,10);
    ok(testPth.transforms[0]['type']  === 'scale','calling the scale method puts an object with a type property "scale" into the transforms array');
    testPth.scale(20,20);
    ok((testPth.transforms[0]['type']  === 'scale' && q.isA(testPth.transforms[0]['value']) && testPth.transforms[0]['value'][0] === 10 &&
        testPth.transforms[1]['type']  === 'scale' && q.isA(testPth.transforms[1]['value']) && testPth.transforms[1]['value'][0] === 20
        ),'calling the scale method more than once puts additional objects with a type property "scale" into the "transforms" array');

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
 */
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
