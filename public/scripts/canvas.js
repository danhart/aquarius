define(function(){
    var ELEMENT_ID = "page_canvas";

    function Canvas() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    Canvas.prototype.draw = function() {
        this.el = document.getElementById(ELEMENT_ID);
        this.el.width = window.innerWidth;
        this.el.height = window.innerHeight;
        this.context = this.el.getContext("2d");
        this.context.globalAlpha = 0.3;
    };

    return Canvas
});
