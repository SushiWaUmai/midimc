import { Header, Midi, Track } from "@tonejs/midi";

const pitchCutoffList = [6, 30, 54, 78, 102, 126];

export const splitMidi = (midi: Midi): Midi => {
	const result = new Midi();

	for (let i = 0; i < pitchCutoffList.length - 1; i++) {
		const add = 54 - pitchCutoffList[i];

		const pitchTrack = new Track([], new Header());
		midi.tracks.forEach((track) => {
			track.notes.forEach((note) => {
				if (
					pitchCutoffList[i] < note.midi &&
					note.midi < pitchCutoffList[i + 1]
				) {
					note.midi += add;
					pitchTrack.addNote(note);
				}
			});
		});
		result.tracks.push(pitchTrack);
	}

	return result;
};
