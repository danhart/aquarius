define(function(){
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    Point.prototype.eitherCoordinateSimilar = function(otherPoint, tolerance) {
        var difference = this.difference(otherPoint);
        return difference.x <= tolerance || difference.y <= tolerance;
    };

    Point.prototype.difference = function(otherPoint) {
        return {
            x: Math.abs(this.x - otherPoint.x),
            y: Math.abs(this.y - otherPoint.y)
        };
    };

    Point.prototype.distance = function(otherPoint) {
        var difference = this.difference(otherPoint);
        return Math.sqrt(Math.pow(difference.x, 2) + Math.pow(difference.y, 2));
    };

    return Point;
});
