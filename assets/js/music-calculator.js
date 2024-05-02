

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
        var noteDurations = [60 / bpm * 4, 60 / bpm * 2, 60 / bpm, 60 / bpm / 2, 60 / bpm / 4];
        // 0 = whole note, 1 = half note, 2 = quarter note, 3 = eighth note, 4 = sixteenth note
        noteDurations.push(noteDurations[1] * 1.5); // dotted half note
        noteDurations.push(noteDurations[0] / 3); // half note triplet
        noteDurations.push(noteDurations[2] * 1.5); // dotted quarter note
        noteDurations.push(noteDurations[1] / 3); // quarter note triplet
        noteDurations.push(noteDurations[3] * 1.5); // dotted eighth note
        noteDurations.push(noteDurations[2] / 3); // eighth note triplet
        noteDurations.push(noteDurations[4] * 1.5); // dotted sixteenth note
        noteDurations.push(noteDurations[3] / 3); // sixteenth note triplet
        
        // Convert the durations from seconds to ms
        for (let i = 0; i < noteDurations.length; i++) {
            noteDurations[i] = noteDurations[i] * 1000;
        }

        // Calculate the durations (Hz) based on bpm
        var noteDurationsHz;
        // Map from noteDurations to noteDurationsHz
        noteDurationsHz = noteDurations.map(function(x) {
            return 1 / x * 1000;
        });
        
        // Round the durations
        for (let i = 0; i < noteDurations.length; i++) {
            noteDurations[i] = noteDurations[i].toFixed(0);
            noteDurationsHz[i] = noteDurationsHz[i].toFixed(2);
        }
        
        // If input is not a number, set all durations to 0
        if (isNaN(bpm)) {
            for (let i = 0; i < noteDurations.length; i++) {
                noteDurations[i] = 0;
                noteDurationsHz[i] = 0;
            }
            // Show alert, hide otherwise
            $('#bpmWarning').removeClass('d-none');
        } else {
            $('#bpmWarning').addClass('d-none');
        }
        // Update the table with the calculated durations
        $('#wholeNoteDuration').text(noteDurations[0] + ' ms');
        $('#dottedHalfNoteDuration').text(noteDurations[5] + ' ms');
        $('#halfNoteDuration').text(noteDurations[1] + ' ms');
        $('#halfNoteTripletDuration').text(noteDurations[6] + ' ms');
        $('#dottedQuarterNoteDuration').text(noteDurations[7] + ' ms');
        $('#quarterNoteDuration').text(noteDurations[2] + ' ms');
        $('#quarterNoteTripletDuration').text(noteDurations[8] + ' ms');
        $('#dottedEighthNoteDuration').text(noteDurations[9] + ' ms');
        $('#eighthNoteDuration').text(noteDurations[3] + ' ms');
        $('#eighthNoteTripletDuration').text(noteDurations[10] + ' ms');
        $('#dottedSixteenthNoteDuration').text(noteDurations[11] + ' ms');
        $('#sixteenthNoteDuration').text(noteDurations[4] + ' ms');
        $('#sixteenthNoteTripletDuration').text(noteDurations[12] + ' ms');
        // Same for hz eg sixteenthNoteFrequency
        $('#wholeNoteFrequency').text(noteDurationsHz[0] + ' Hz');
        $('#dottedHalfNoteFrequency').text(noteDurationsHz[5] + ' Hz');
        $('#halfNoteFrequency').text(noteDurationsHz[1] + ' Hz');
        $('#halfNoteTripletFrequency').text(noteDurationsHz[6] + ' Hz');
        $('#dottedQuarterNoteFrequency').text(noteDurationsHz[7] + ' Hz');
        $('#quarterNoteFrequency').text(noteDurationsHz[2] + ' Hz');
        $('#quarterNoteTripletFrequency').text(noteDurationsHz[8] + ' Hz');
        $('#dottedEighthNoteFrequency').text(noteDurationsHz[9] + ' Hz');
        $('#eighthNoteFrequency').text(noteDurationsHz[3] + ' Hz');
        $('#eighthNoteTripletFrequency').text(noteDurationsHz[10] + ' Hz');
        $('#dottedSixteenthNoteFrequency').text(noteDurationsHz[11] + ' Hz');
        $('#sixteenthNoteFrequency').text(noteDurationsHz[4] + ' Hz');
        $('#sixteenthNoteTripletFrequency').text(noteDurationsHz[12] + ' Hz');
    }
});