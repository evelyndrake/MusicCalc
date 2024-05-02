import React, {useState, useEffect} from 'react';

const MusicCalculator = () => {
  const [bpm,
    setBpm] = useState('');
  const [durationText,
    setDurationText] = useState('');
  const [noteData,
    setNoteData] = useState([]);
  const [showWarning,
    setShowWarning] = useState(false);

  const updateDurations = (event) => {
    const inputBpm = event.target.value;
    setBpm(inputBpm);

    if (!isNaN(parseFloat(inputBpm))) {
      const noteDurations = [
        60 / parseFloat(inputBpm) * 4,
        60 / parseFloat(inputBpm) * 2,
        60 / parseFloat(inputBpm),
        60 / parseFloat(inputBpm) / 2,
        60 / parseFloat(inputBpm) / 4
      ];
      noteDurations.push(noteDurations[1] * 1.5); // dotted half note
      noteDurations.push(noteDurations[0] / 3); // half note triplet
      noteDurations.push(noteDurations[2] * 1.5); // dotted quarter note
      noteDurations.push(noteDurations[1] / 3); // quarter note triplet
      noteDurations.push(noteDurations[3] * 1.5); // dotted eighth note
      noteDurations.push(noteDurations[2] / 3); // eighth note triplet
      noteDurations.push(noteDurations[4] * 1.5); // dotted sixteenth note
      noteDurations.push(noteDurations[3] / 3); // sixteenth note triplet

      const noteDurationsMs = noteDurations.map(duration => duration * 1000);
      const noteDurationsHz = noteDurationsMs.map(durationMs => 1 / durationMs * 1000);

      const durationsWithUnits = noteDurationsMs.map(durationMs => `${durationMs.toFixed(0)} ms`);
      const frequenciesWithUnits = noteDurationsHz.map(frequencyHz => `${frequencyHz.toFixed(2)} Hz`);

      updateTableDurations(durationsWithUnits, frequenciesWithUnits);
      setShowWarning(false);
    } else {
      setShowWarning(true);
      updateTableDurations(Array(13).fill('0 ms'), Array(13).fill('0 Hz'));
    }
  };

  const updateTableDurations = (durations, frequencies) => {
    const notes = [
      'wholeNote',
      'dottedHalfNote',
      'halfNote',
      'halfNoteTriplet',
      'dottedQuarterNote',
      'quarterNote',
      'quarterNoteTriplet',
      'dottedEighthNote',
      'eighthNote',
      'eighthNoteTriplet',
      'dottedSixteenthNote',
      'sixteenthNote',
      'sixteenthNoteTriplet'
    ];
    

    const newNoteData = notes.map((note, index) => ({note, duration: durations[index], frequency: frequencies[index]}));

    setNoteData(newNoteData);
  };

  const handleRowClick = (event) => {
    const clickedDuration = event.target.textContent;
    setDurationText(clickedDuration);
    navigator
      .clipboard
      .writeText(clickedDuration)
      .then(() => {
        // Clipboard text copied successfully
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };
  const noteDisplayValues = {
    'wholeNote': '1',
    'dottedHalfNote': '1/2.',
    'halfNote': '1/2',
    'halfNoteTriplet': '1/2 T',
    'dottedQuarterNote': '1/4.',
    'quarterNote': '1/4',
    'quarterNoteTriplet': '1/4 T',
    'dottedEighthNote': '1/8.',
    'eighthNote': '1/8',
    'eighthNoteTriplet': '1/8 T',
    'dottedSixteenthNote': '1/16.',
    'sixteenthNote': '1/16',
    'sixteenthNoteTriplet': '1/16 T'
};
  useEffect(() => {
    const tableRows = document.querySelectorAll('#durationTable tbody tr');
    tableRows.forEach(row => row.addEventListener('click', handleRowClick));

    return () => {
      tableRows.forEach(row => row.removeEventListener('click', handleRowClick));
    };
  }, []);

  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Music Calculator</h1>
          <p className="lead">A toolset of useful calculations to help with the process of music creation.</p>
        </div>
      </div>
      <div className="container">
        <div className="row ml-4">
          <div className="col">
            <h2>Calculate Note Durations</h2>
            <input
              type="number"
              placeholder="Enter BPM"
              value={bpm}
              onChange={updateDurations}/> {showWarning && <div className="mt-3 alert alert-danger" role="alert">
              Invalid BPM value. Please enter a valid number.
            </div>
}
            <table className="table mt-4" id="durationTable">
              <thead>
                <tr>
                  <th>Note Value</th>
                  <th>Duration (ms)</th>
                  <th>Duration (Hz)</th>
                </tr>
              </thead>
              <tbody>
                {noteData.map(({note, duration, frequency}) => (
                  <tr key={note}>
                  <td id={`${note}Note`}>{noteDisplayValues[note]}</td>
                  <td id={`${note}Duration`}>{duration}</td>
                  <td id={`${note}Hz`}>{frequency}</td>
              </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCalculator;
