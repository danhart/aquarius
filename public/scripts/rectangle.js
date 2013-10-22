define(['random_int', 'point'], function(RandomInt, Point){
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }

    Rectangle.prototype.centrePoint = function() {
        return new Point(
            this.width / 2,
            this.height / 2
        );
    };

    Rectangle.prototype.getRandomPoint = function() {
        return new Point(
            RandomInt.between(0, this.width),
            RandomInt.between(0, this.height)
        );
    };

    Rectangle.prototype.getRandomSide = function() {
        switch(RandomInt.between(1, 4)) {
            case 1:
                return "top";
            case 2:
                return "right";
            case 3:
                return "bottom";
            case 4:
                return "left";
        }
    };

    Rectangle.prototype.getPositionForSide = function(side) {
        if (side == "top" || side == "left") {
            return 0;
        } else if (side == "right") {
            return this.width;
        } else if (side == "bottom") {
            return this.height;
        }
    };

    Rectangle.prototype.getSideFromPoint = function(point) {
        if (point.x == 0) {
            return "left";
        } else if (point.y == 0) {
            return "top";
        } else if (point.x == this.width) {
            return "right";
        } else if (point.y == this.height) {
            return "bottom";
        }
    };

    Rectangle.prototype.getRandomPointOnSide = function(side) {
        var sidePosition = this.getPositionForSide(side);

        if (side == "top" || side == "bottom") {
            return new Point(
                RandomInt.between(0, this.width),
                sidePosition
            );
        } else if (side == "left" || side == "right") {
            return new Point(
                sidePosition,
                RandomInt.between(0, this.height)
            );
        }
    };

    Rectangle.prototype.getRandomPerimeterPoint = function() {
        var randomSide = this.getRandomNewSide();
        return this.getRandomPointOnSide(randomSide);
    };

    Rectangle.prototype.getRandomNewSide = function(currentSide) {
        var newSide = this.getRandomSide();

        if (newSide == currentSide) {
            // Recursive re-roll!
            return this.getRandomNewSide(currentSide);
        }

        return newSide;
    };

    return Rectangle;
});
