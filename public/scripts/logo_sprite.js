define(['lib/raphael-min', 'rectangle', 'point', 'perimeter_bounce_animation'], function(ignored, Rectangle, Point, PerimeterBounceAnimation){
    var IMG_WIDTH = 217;
    var IMG_HEIGHT = 218;

    function LogoSprite(paper) {
        this.paper = paper;
        this.paperEl = paper.el;
    }

    LogoSprite.prototype.draw = function() {
        this.setVisibleArea();
        this.setStartPoint();
        this.insertElement();
        this.startPerimeterBounceAnimation();
        this.bindMouseOver();
    };

    // These positions are the bottom-right corner of the paper with all of the
    // logo visible.
    LogoSprite.prototype.setVisibleArea = function() {
        var width = this.paper.width - IMG_WIDTH;
        var height = this.paper.height - IMG_HEIGHT;
        this.visibleArea = new Rectangle(width, height);
    };

    LogoSprite.prototype.setStartPoint = function() {
        this.startPoint = this.visibleArea.centrePoint();
    };

    LogoSprite.prototype.insertElement = function() {
        this.el = this.paperEl.image("images/logo.png", this.startPoint.x, this.startPoint.y, IMG_WIDTH, IMG_HEIGHT);
    };

    LogoSprite.prototype.startPerimeterBounceAnimation = function() {
        this.perimeterBounceAnimation = new PerimeterBounceAnimation(this.el, this.visibleArea);
        this.perimeterBounceAnimation.start();
    };

    LogoSprite.prototype.currentPoint = function() {
        return new Point(this.el.attrs.x, this.el.attrs.y);
    };

    LogoSprite.prototype.bindMouseOver = function() {
        var _this = this;
        var runAwaySpeed = 3;
        var runAwayDuration = 300;

        this.el.mouseover(function() {
            _this.perimeterBounceAnimation.changeSpeed(runAwaySpeed);

            setTimeout(function() {
                _this.perimeterBounceAnimation.resetSpeed();
            }, runAwayDuration)
        });
    };

    return LogoSprite;
});
