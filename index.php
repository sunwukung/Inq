<?php 
$css = $js = '';
include 'partials/header.php'; 
?>
<canvas id="ezl" width="900" height="900"></canvas>
<script>

    (function(){
        var sqr = form.rec(50,50),
        crc = form.crc(100),
        pth = form.pth([[200,200],[300,100],[400,200],[500,100]]),
        crv = form.crv([
            [[100,250],[250,400],[400,400]]
        ],[100,100]),
        poly=form.poly(5,100),
        star = form.star(6,100,55),
        ctx = document.getElementById('ezl').getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0)';

        star.scale(1.5,1);
        star.rotate(30);
        sqr.scale(1,2);
        sqr.rotate(-45);
        pth.scale(1,2);
        pth.rotate(45);
        poly.scale(2,1);
        poly.rotate(45);
        crc.scale(1,1.5);
        crc.rotate(45);
        crv.scale(0.5, 0.5);
        crv.rotate(90);

        crv.draw(ctx,[300,300]);
        star.draw(ctx,[200,200]);
        crc.draw(ctx,[200,200]);
        sqr.draw(ctx,[200,200]);
        pth.draw(ctx,[200,200]);
        poly.draw(ctx,[600,200]);
        /*
        function animated() {
            if(n < 360) {
                ctx.clearRect(0, 0, 960, 400);
                crc.rotate(1);
                sqr.rotate(-2);
                sqr.draw(ctx,[200,200]);
                crc.draw(ctx,[200,200]);
                setTimeout(animated,1);
            }
            n += 1;
        }

        animated();
         */
    }());

</script>

<?php include 'partials/footer.php'; ?>
