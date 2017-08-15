$(document).ready(function() {
    var x = true;
    var comp = true;
    

    // Hide the board in the beginning
    $('.board').hide();
    
    // Click events to select player settings
    $('#x').click(function(event) {
        x = true;
        $('#x').addClass('selected');
        $('#o').removeClass('selected');
    });
    $('#o').click(function(event) {
        x = false;
        $('#o').addClass('selected');
        $('#x').removeClass('selected');
    })
    $('#comp').click(function(event) {
        comp = true;
        $('#comp').addClass('selected');
        $('#player').removeClass('selected');
    });
    $('#player').click(function(event) {
        comp = false;
        $('#player').addClass('selected');
        $('#comp').removeClass('selected');
    });

    // Play button to start the game with current settings
    $('#play').click(function(event) {
        $('.settings').hide()
        $('.board').show()
    });

    

});