/**
 * ApiResponse
 *
 * Create a Response for the API that will be returned as JSON.
 * Handles HTTP status codes and errors.
 * Can use a koajs ctx to set the response status and body.
 *
 * Format:
 * 	{
 * 		status: {
 * 			code: 200,
 * 			message: 'Success',
 * 			version: '201705241118',
 * 			timestamp: 1495659621328
 * 		},
 * 		data: {
 * 			// Some data
 * 		}
 * 	}
 *
 * Date: May 2017
 *
 */

class ApiResponse {

	/**
	 * Creates an ApiResponse from status code
	 * @param  {Number} statusCode Code of the response
	 * @return {ApiResponse}       ApiResponse object with statusCode
	 */
	public static createFromCode(statusCode: number):object {
		return new ApiResponse(null, statusCode);
	}

	/**
	 * Creates a success response
	 * @param  {Object} data       Data of the response
	 * @param  {Number} statusCode Code of the response default is 200
	 * @return {ApiResponse}       ApiResponse object with a success code
	 */
	public static createSuccess(data: any = null, statusCode: number = 200):any  {
		return new ApiResponse(data, statusCode);
	}

	/**
	 * Creates an error response
	 * @param  {Object} data       Data of the response
	 * @param  {Number} statusCode Code of the response default is 400
	 * @return {ApiResponse}       ApiResponse object with a success code
	 */
	public static createError(data: any = null, statusCode: number = 400):any {
		return new ApiResponse(data, statusCode);
	}

	private json: any;

	/**
	 * Constructor
	 * @param {Object} data       Data that will be returned in the response
	 * @param {Number} statusCode Status code of the response
	 *                            (can be custom code, other than HTTP codes)
	 */
	public constructor(data :string = null, private statusCode: number = 200) {
		// Set default values for status
		const status = {
			code: this.statusCode,
			message: '',
			version: process.env.API_VERSION || '',
			timestamp: Date.now(),
		};

		// Set message based on known codes
		switch (statusCode) {
			// Success
			case 200:
				status.message = 'Success';
				break;
			// Created
			case 201:
				status.message = 'Created';
				break;
			// Validation error
			case 400:
				status.message = 'Error validation';
				break;
			// Authentication required
			case 401:
				status.message = 'Unauthorized';
				break;
			// Forbidden
			case 403:
				status.message = 'Forbidden';
				break;
			// Not found
			case 404:
				status.message = 'Not Found';
				break;
			// Conflict
			case 409:
				status.message = 'Conflict';
				break;
			// Error 500
			case 500:
				status.message = 'Internal Server Error';
				break;
			default:
		}
		// Set json
		this.json = {
			status,
			data,
		};
	}

	/**
	 * Get HTTP status code from the status code
	 * @return {Number} 200 if code is lower than 100, or takes the same value as status code
	 */
	get httpStatusCode(): string {
		// When it is a custom code (less than 100, the HTTP status code will be 200)
		return this.json.status.code < 100
			? 200
			: this.json.status.code;
	}

	/**
	 * Get the JSON status code
	 * @return {Number} JSON status code
	 */
	get status(): object {
		return this.json.status;
	}

	/**
	 * Set the JSON status code
	 * @param  {Number} status JSON status code
	 * @return void
	 */
	set status(status: object) {
		this.json.status = status;
	}
	/**
	 * Get the JSON data
	 * @return {Object} JSON data
	 */
	get data(): string {
		return this.json.data;
	}

	/**
	 * Set the JSON data
	 * @param  {Object} data JSON data
	 * @return void
	 */
	set data(data: string) {
		this.json.data = data;
	}

	/**
	 * Set JSON response to context (status and body)
	 * @param  {Object} ctx KoaJs context
	 * @return void
	 */
	public to(ctx: any): void {
		ctx.status = this.httpStatusCode;
		ctx.body = this.toJson();
	}

	/**
	 * Throw exception to context
	 * @param  {Object} ctx KoaJs context
	 * @return void
	 */
	public throw(ctx: any) {
		ctx.throw(this.httpStatusCode);
	}

	/**
	 * Return the JSON response as object
	 * @return {Object} JSON response
	 */
	private toJson(): object {
		return this.json;
	}
}

export default ApiResponse;
