<?php 
$css = $js = '';
include 'partials/header.php'; 
?>
<canvas id="ezl" width="900" height="900"></canvas>
<script>

    (function(){
        var sqr = form.rec(50,50),
        crc = form.crc(100),
        pth = form.pth([[200,200],[300,100],[400,200],[500,100]],[100,100]),
        crv = form.crv([
                    [[100,200],[200,400],[400,400]]
                    ],[100,100]);
        ctx = document.getElementById('ezl').getContext('2d'),
        n = 0;
        ctx.fillStyle = 'rgba(0,0,0,0)';
        sqr.scale(1,2);
        crc.scale(1,2);
        crc.rotate(45);
        sqr.rotate(-45);
        sqr.draw(ctx,[200,200]);
        crc.draw(ctx,[200,200]);
        crv.draw(ctx,[200,200]);
        pth.draw(ctx,200,200);
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
