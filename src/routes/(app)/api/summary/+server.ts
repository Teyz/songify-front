import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { hintQueries } from '$lib/queries/hint';
import { summaryQueries } from '$lib/queries/summary';

export const GET: RequestHandler = async ({ url }) => {
    try {
        
        const userID = url.searchParams.get('user_id');
        const gameID = url.searchParams.get('game_id');

        if (!userID || !gameID) return new Response('Missing user_id or game_id', { status: 400 });
        
        const summary = await summaryQueries.getSummary(userID, gameID);
        
        return json({ data: summary });
    } catch (error) {
        return new Response('Error', { status: 400 });
    }
};