define(['lib/raphael-min'], function(){
    function SvgPaper() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    SvgPaper.prototype.draw = function() {
        this.el = Raphael(0, 0, this.width, this.height);
    };

    return SvgPaper;
});
