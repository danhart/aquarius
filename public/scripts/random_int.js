define(function(){
    function between(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Singleton
    return {
        between: between
    };
});
