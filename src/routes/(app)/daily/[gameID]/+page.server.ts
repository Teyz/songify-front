
import { gameQueries } from "$lib/queries/game";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params}) => {	
	const game = await gameQueries.getCurrentGame();
	 
	return {
		gameID: params.gameID,
		game: game,
	}
};