define(['animation_frame', 'point'], function(animationFrame, Point){
    var NUMBER_OF_STARS = 500;
    var Z = 0.1;
    var WARP_Z = 10;

    function Starfield(canvas) {
        this.canvas = canvas;
        this.stars = [];
    }

    Starfield.prototype.draw = function() {
        this.drawStars();
        this.startAnimation();
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
        star.previousX = 0;
        star.previousY = 0;
    };

    Starfield.prototype.startAnimation = function() {
        var _this = this;

        animationFrame(function() {
            _this.loop();
        });
    };

    Starfield.prototype.loop = function() {
        var _this = this;

        var focusPoint = new Point(
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        // clear the canvas
        this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (var i = 0; i < NUMBER_OF_STARS; i++) {
            var star = this.stars[i],       // the star
                xx = star.x / star.z,       // star position
                yy = star.y / star.z;

            if (star.previousX !== 0) {
                this.canvas.context.strokeStyle = "rgba(255,255,255,1)";
                this.canvas.context.lineWidth = 1.5;
                this.canvas.context.beginPath();
                this.canvas.context.moveTo(xx + focusPoint.x, yy + focusPoint.y);
                this.canvas.context.lineTo(star.previousX + focusPoint.x, star.previousY + focusPoint.y);
                this.canvas.context.stroke();
            }

            // update star position values with new settings
            star.previousX = xx;
            star.previousY = yy;
            star.z -= Z;

            // reset when star is out of the view field
            if (star.z < Z || star.previousX > this.canvas.width || star.previousY > this.canvas.height) {
                // reset star
                this.resetStar(star);
            }
        }

        animationFrame(function() {
            _this.loop();
        });
    };

    return Starfield
});
