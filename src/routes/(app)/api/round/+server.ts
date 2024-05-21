import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { roundsQueries } from '$lib/queries/rounds';
import { gameQueries } from '$lib/queries/game';

export const GET: RequestHandler = async ({ url }) => {
    try {
        
        const userID = url.searchParams.get('user_id');

        const game = await gameQueries.getCurrentGame();        

        if (!game) return new Response('No current game', { status: 400 });

        const gameID = game.data.game.id;

        if (!userID || !gameID) return new Response('Missing user_id or game_id', { status: 400 });        
        
        const round = await roundsQueries.getRoundByUserIDForGame(userID, gameID);
        
        return json({ data: round });
    } catch (error) {
        console.log(error);
        
        return new Response('Error', { status: 400 });
    }
};