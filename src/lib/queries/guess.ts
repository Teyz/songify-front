import type { Guess } from "$lib/types/guess";

export const guessQueries = {
    checkGuess: async (guess: Guess) => {
        return await fetch(`https://api.songify.xyz/private/v1/guess/${guess.song_id}?artist=${guess.artist}&title=${guess.title}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
        .then((res) => {
            return res.data.is_correct;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
    }
};