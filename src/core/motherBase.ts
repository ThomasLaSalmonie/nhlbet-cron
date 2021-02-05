import Citadelle from './../helpers/citadelle';

class MotherBase extends Citadelle {

	/**
	 * health check application is live
	 * @param  {object} ctx
	 * @return {void}
	 */
	public static health(ctx: any): void {
		ctx.status = 200; // Ok
	}

	protected static init(ctx: any) {
		// Save the lang into the context
		ctx.state.lang = ctx.request.query.lang ? ctx.request.query.lang : 'en';
		// Set key lang into models
		Citadelle.lang = ctx.state.lang;
	}
}
export default MotherBase;
