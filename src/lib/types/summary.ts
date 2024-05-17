export interface ISummary {
    song: {
        artist: string;
        artist_image_url: string;
        image_url: string;
        lyrics: string;
        musical_style: string;
        released_year: number;
        title: string;
    };
    round: {
        hint: number;
        status: string;
        has_won: boolean;
    }
}