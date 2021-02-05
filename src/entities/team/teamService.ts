import Team from './teamModel';

class TeamService {
	public static async handleTeams(teams: any[]): Promise<any>{
		const result = {
			created: 0,
			updated: 0,
		};
		for (const team of teams) {
			const existingTeam = await Team.get(team.id);
			const data = {
				id: team.id,
				name: team.name,
				shortname: team.shortName,
				code: team.abbreviation,
				team: team.teamName,
				conference_id: team.conference.id,
				division_id: team.division.id,
				franchise_id: team.franchise.franchiseId,
				location: team.locationName,
				link: team.officialSiteUrl,
				active: team.active,
			};
			if (existingTeam === undefined) {
				await Team.insert(data);
				result.created++;
			} else {
				await Team.update(team.id, data);
				result.updated++;
			}
		}
		return result;
	}
}

export default TeamService;