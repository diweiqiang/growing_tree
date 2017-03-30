(function () {
    var depth = 16,
        branchWidth = 12,
        //用于重绘的依据，当小于某数值时即使调整了浏览器宽度也不触发重绘
        step = 0;
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    /*canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;*/

    var init = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.globalCompositeOperation = 'lighter';
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        step = 0;
        var startX=window.innerWidth / 2;
        var startY=window.innerHeight / 1.02;
        var initLength=canvas.height/8;
        initAngle=-Math.PI / 2;
        drawTree(ctx, startX, startY, initLength, initAngle, depth, branchWidth)
    };

    var drawTree = function(ctx, startX, startY, length, angle, depth, branchWidth) {
        var rand = Math.random,
            newDepth,
            newLength, newAngle, maxBranch = 3,
            endX, endY, maxAngle = Math.PI / 3,
            subBranches;

        ctx.beginPath();
        //console.log(ctx.strokeStyle);
        ctx.moveTo(startX, startY);
        endX = startX + length * Math.cos(angle);
        endY = startY + length * Math.sin(angle);
        ctx.lineCap = 'round';
        ctx.lineWidth = branchWidth;
        ctx.lineTo(endX, endY);

        if (depth <= 2) {
            //因为偏向顶端了，所以用近绿色的颜色模树叶；
            ctx.strokeStyle = 'rgb(0,' + (Math.round(rand() * 64) + 100) + ',0)';
        } else {
            ctx.strokeStyle = 'rgb(' + (Math.round(rand() * 64) + 64) + ',50, 25)';
        }
        ctx.stroke();

        newDepth = depth - 1;
        if (!newDepth) return;
        //分叉数为2；
        subBranches = maxBranch - 1;
        branchWidth *= .7;

        for (var i = 0; i < subBranches; i++) {
            //newAngle:angle+[-pi/6,pi/6];
            newAngle = angle + (rand()-0.5) * maxAngle;

            //newlength:[0.7*length,length];
            newLength = length * (.7 + rand() * .3);

            /*console.log(newLength);
            console.log(newAngle);*/

            //因为长度和角度即newLength 和newAngle时相同的，所以第一次的两个分支重合了；
            setTimeout(function() {
                drawTree(ctx, endX, endY, newLength, newAngle, newDepth, branchWidth);
                step++;
            }, 80)
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        init()
    });

    window.onresize = regrow;

    var regrow = function() {
        if (step < 65534) return;
        init();
    };
})();