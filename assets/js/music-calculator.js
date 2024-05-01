

console.log('music-calculator.js loaded');



$(document).ready(function() {
    const bpmInput = $('#bpmInput');

    // Add event listener to update durations when bpm changes
    bpmInput.on('input', updateDurations);

    // Add event listener to each table row
    $('#durationTable tbody tr').on('click', function() {
        // Get the duration text from the second cell of the clicked row
        let durationText = $(this).find('td:nth-child(2)').text();

        // Remove non-numeric characters from the duration text
        durationText = durationText.replace(/[^0-9.]/g, '');

        // Copy the duration text to the clipboard
        navigator.clipboard.writeText(durationText).then(function() {

        }, function(err) {
            console.error('Could not copy text: ', err);
        });

        // Initialize the toast

    });


    function updateDurations() {
        // Get the current bpm value
        const bpm = parseInt(bpmInput.val());

        // Calculate the durations based on bpm
        const wholeNoteDuration = 60 / bpm * 4;
        const halfNoteDuration = 60 / bpm * 2;
        const quarterNoteDuration = 60 / bpm;
        const eighthNoteDuration = 60 / bpm / 2;
        const sixteenthNoteDuration = 60 / bpm / 4;

        // Calculate the durations for triplet and dotted variations
        const dottedHalfNoteDuration = halfNoteDuration * 1.5;
        const halfNoteTripletDuration = wholeNoteDuration / 3;
        const dottedQuarterNoteDuration = quarterNoteDuration * 1.5;
        const quarterNoteTripletDuration = halfNoteDuration / 3;
        const dottedEighthNoteDuration = eighthNoteDuration * 1.5;
        const eighthNoteTripletDuration = quarterNoteDuration / 3;
        const dottedSixteenthNoteDuration = sixteenthNoteDuration * 1.5;
        const sixteenthNoteTripletDuration = eighthNoteDuration / 3;

        // Update the table with the calculated durations
        $('#wholeNoteDuration').text(wholeNoteDuration + ' ms');
        $('#dottedHalfNoteDuration').text(dottedHalfNoteDuration + ' ms');
        $('#halfNoteDuration').text(halfNoteDuration + ' ms');
        $('#halfNoteTripletDuration').text(halfNoteTripletDuration + ' ms');
        $('#dottedQuarterNoteDuration').text(dottedQuarterNoteDuration + ' ms');
        $('#quarterNoteDuration').text(quarterNoteDuration + ' ms');
        $('#quarterNoteTripletDuration').text(quarterNoteTripletDuration + ' ms');
        $('#dottedEighthNoteDuration').text(dottedEighthNoteDuration + ' ms');
        $('#eighthNoteDuration').text(eighthNoteDuration + ' ms');
        $('#eighthNoteTripletDuration').text(eighthNoteTripletDuration + ' ms');
        $('#dottedSixteenthNoteDuration').text(dottedSixteenthNoteDuration + ' ms');
        $('#sixteenthNoteDuration').text(sixteenthNoteDuration + ' ms');
        $('#sixteenthNoteTripletDuration').text(sixteenthNoteTripletDuration + ' ms');
    }
});