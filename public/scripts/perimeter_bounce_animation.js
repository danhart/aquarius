define(['lib/raphael-min', 'point'], function(ignored, Point){
    var SPEED = 0.5; // px per ms

    function PerimeterBounceAnimation(el, rectangle) {
        this.el = el;
        this.rectangle = rectangle;
        this.speed = SPEED;
    }

    PerimeterBounceAnimation.prototype.animationLooper = function() {
        var _this = this;

        this.moveToPerimeter(function() {
            _this.animationLooper();
        });
    };

    PerimeterBounceAnimation.prototype.moveToPerimeter = function(animationFinished) {
        var newPoint = this.getNewPerimeterPoint();
        // this.animateToNewPoint(animationFinished);
    };

    PerimeterBounceAnimation.prototype.getNewPerimeterPoint = function() {
        var currentSide = this.rectangle.getSideFromPoint(this.endPoint);
        var delta = this.startPoint.delta(this.endPoint);

        var newPoint = new Point;

        if (currentSide == "bottom" || currentSide == "top") {
            newPoint.x = this.endPoint.x + -delta.x;
            newPoint.y = this.startPoint.y;
        } else if (currentSide == "left" || currentSide == "right") {
            newPoint.x = this.startPoint.x;
            newPoint.y = this.endPoint.y + -delta.y;
        }

        this.endPoint = newPoint;

        this.animateToNewPoint(function() {
        });
    };

    PerimeterBounceAnimation.prototype.determineDurationOfAnimation = function() {
        var distance = this.startPoint.distance(this.endPoint);
        var speed = this.speed;
        var duration = distance / speed;
        return parseInt(duration);
    };

    PerimeterBounceAnimation.prototype.moveToRandomPerimeterPoint = function(animationFinished) {
        this.endPoint = this.rectangle.getRandomPerimeterPoint();
        this.animateToNewPoint(animationFinished);
    };

    PerimeterBounceAnimation.prototype.start = function() {
        var _this = this;

        this.moveToRandomPerimeterPoint(function() {
            _this.animationLooper();
        });
    };

    PerimeterBounceAnimation.prototype.stop = function() {
        this.el.stop(this.animation);
    };

    PerimeterBounceAnimation.prototype.changeSpeed = function(newSpeed) {
        var _this = this;
        this.speed = newSpeed;

        this.el.stop();
        this.animateToNewPoint(function() {
            _this.start();
        });
    };

    PerimeterBounceAnimation.prototype.resetSpeed = function() {
        this.changeSpeed(SPEED);
    };

    PerimeterBounceAnimation.prototype.animateToNewPoint = function(animationFinished) {
        this.startPoint = new Point(this.el.attrs.x, this.el.attrs.y);
        var duration = this.determineDurationOfAnimation();
        this.animation = Raphael.animation(this.endPoint, duration, animationFinished);
        this.el.animate(this.animation);
    };

    return PerimeterBounceAnimation;
});
