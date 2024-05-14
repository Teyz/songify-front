import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { guessQueries } from '$lib/queries/guess';

export const GET: RequestHandler = async ({ params, url }) => {
    try {
        
        const userID = url.searchParams.get('user_id');
        const gameID = url.searchParams.get('game_id');

        if (!userID || !gameID) return new Response('Missing user_id or game_id', { status: 400 });
        
        const guesses = await guessQueries.getGuessesByUserIDForGame(userID, gameID);
        
        return json({ data: guesses });
    } catch (error) {
        return new Response('Error', { status: 400 });
    }
};