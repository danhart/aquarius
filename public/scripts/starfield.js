define(['animation_frame', 'point'], function(animationFrame, Point){
    var NUMBER_OF_STARS = 300;
    var Z = 0.1;
    var WARP_Z = 10;

    function Starfield(canvas, logoSprite) {
        this.canvas = canvas;
        this.stars = [];
        this.colorCycle = 0;
        this.logoSprite = logoSprite;
    }

    Starfield.prototype.draw = function() {
        this.drawStars();
        this.startAnimation();
        this.trackLogoSpritePosition();
    };

    Starfield.prototype.trackLogoSpritePosition = function() {
    };

    Starfield.prototype.drawStars = function() {
        var star;

        for (var i = 0; i < NUMBER_OF_STARS; i++) {
            star = {};
            this.resetStar(star);
            this.stars.push(star);
        }
    };

    Starfield.prototype.resetStar = function(star) {
        star.x = (Math.random() * this.canvas.width - (this.canvas.width * 0.5)) * WARP_Z;
        star.y = (Math.random() * this.canvas.height - (this.canvas.height * 0.5)) * WARP_Z;
        star.z = WARP_Z;
        star.px = 0;
        star.py = 0;
    };

    Starfield.prototype.startAnimation = function() {
        var _this = this;

        animationFrame(function() {
            _this.loop();
        });
    };

    Starfield.prototype.loop = function() {
        var _this = this;

        logoCurrentPoint = this.logoSprite.currentPoint();

        var focusPoint = new Point(
                this.canvas.width - logoCurrentPoint.x,
                this.canvas.height - logoCurrentPoint.y
        );

        // clear the canvas
        this.canvas.context.fillStyle = "#000";
        this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // update all stars
        var sat = Math.floor(Z * 500);       // Z range 0.01 -> 0.5
        if (sat > 100) sat = 100;

        for (var i = 0; i < NUMBER_OF_STARS; i++) {
            var star = this.stars[i],            // the star
                xx = star.x / star.z,       // star position
                yy = star.y / star.z,
                e = (1.0 / star.z + 1) * 2; // size i.e. z

            if (star.px !== 0) {
                this.canvas.context.strokeStyle = "hsl(" + ((this.colorCycle * i) % 360) + "," + sat + "%,95%)";
                this.canvas.context.lineWidth = e;
                this.canvas.context.beginPath();
                this.canvas.context.moveTo(xx + focusPoint.x, yy + focusPoint.y);
                this.canvas.context.lineTo(star.px + focusPoint.x, star.py + focusPoint.y);
                this.canvas.context.stroke();
            }

            // update star position values with new settings
            star.px = xx;
            star.py = yy;
            star.z -= Z;

            // reset when star is out of the view field
            if (star.z < Z || star.px > this.canvas.width || star.py > this.canvas.height) {
                // reset star
                this.resetStar(star);
            }
        }

        // colour cycle sinewave rotation
        this.colorCycle += 0.01;

        animationFrame(function() {
            _this.loop();
        });
    };

    return Starfield
});
