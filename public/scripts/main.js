define(['canvas', 'starfield', 'svg_paper', 'logo_sprite'], function(Canvas, Starfield, SvgPaper, LogoSprite){
    function Main() {
        var canvas = new Canvas();
        canvas.draw();

        var svgPaper = new SvgPaper();
        svgPaper.draw();

        var logoSprite = new LogoSprite(svgPaper);
        logoSprite.draw();

        var starfield = new Starfield(canvas);
        starfield.draw();

    }

    new Main();
});
