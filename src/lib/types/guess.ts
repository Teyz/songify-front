export interface IGuess {
    user_id: string;
    game_id: string;
    artist: string;
    is_artist_correct: boolean;
    title: string;
    is_title_correct: boolean;
}