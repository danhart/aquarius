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
        this.currentPoint = new Point(this.el.attrs.x, this.el.attrs.y);
        this.newPoint = this.getNewPerimeterPoint(0);
        this.animateToNewPoint(animationFinished);
    };

    // We want to ensure that neither of our x/y coords are too similar to the
    // previous ones. Otherwise we will get only small amounts of translation
    // across our canvas. We always want the motion to be quite diagonal.
    PerimeterBounceAnimation.prototype.getNewPerimeterPoint = function(guessCount) {
        var newPoint = this.rectangle.getRandomPerimeterPoint();

        // Probably should calculate this based on canvas size.
        var tolerance = 100;

        if (guessCount == 10) return newPoint;

        if (this.currentPoint.eitherCoordinateSimilar(newPoint, tolerance)) {
            // Points are too similar! Roll again.
            guessCount++;
            return this.getNewPerimeterPoint(guessCount);
        }

        return newPoint;
    };

    PerimeterBounceAnimation.prototype.determineDurationOfAnimation = function() {
        var distance = this.currentPoint.distance(this.newPoint);
        var speed = this.speed;
        var duration = distance / speed;
        return parseInt(duration);
    };

    PerimeterBounceAnimation.prototype.start = function() {
        this.animationLooper();
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
        this.currentPoint = new Point(this.el.attrs.x, this.el.attrs.y);
        var duration = this.determineDurationOfAnimation();
        this.animation = Raphael.animation(this.newPoint, duration, animationFinished);
        this.el.animate(this.animation);
    };

    return PerimeterBounceAnimation;
});
