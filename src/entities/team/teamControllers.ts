import axios from 'axios';

import MotherBase from 'core/motherBase';
import ApiResponse from 'helpers/apiResponse';
import TeamService from './teamService';


class TeamControllers extends MotherBase {

	public static async feedTeam(ctx: any): Promise<any> {
		const response = await axios({
			method: 'GET',
			url: 'https://statsapi.web.nhl.com/api/v1/teams',
		});
		const teamsHandle = await TeamService.handleTeams(response.data.teams);
		return ApiResponse.createSuccess({created: teamsHandle.created, updated: teamsHandle.updated}, 200).to(ctx);
	}
}

export default TeamControllers;