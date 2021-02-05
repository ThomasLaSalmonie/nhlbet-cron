import slug from 'slugify';
// Characters to extend
slug.extend({
	'.': '-',
});

class Utils {
	/**
	 * Get a lower case slug of a string
	 * @param  {string} text Text to slugify
	 * @return {string}      Slug of the text, 'C & D' becomes 'c-and-d'
	 */
	public static slug(text: string): string {
		// Also removes the |. because we do not want to display a 'or', '-'
		return slug(text
			.replace('|', '-')
			.replace('.', '')
			// Replaces the long dash to the small one
			.replace('–', '-'), {
			// replace spaces with replacement
			replacement: '-',
			// result in lower case
			lower: true,
		})
		// Juste to be sure, remove all non-word characters and -
			.replace(/[^\w-]+/g, '')
		// Replace multiple — with single -
			.replace(/--+/g, '-')
		// Trim the -
			.replace(/^-+/, '')
			.replace(/-+$/, '');
	}

	/**
	 * Keep only a number of paragraphs from a html text.
	 * @param  {string} text   HTML text with the p tag
	 * @param  {integer} limit Number of paragraphs to return
	 * @return {string}        Text with only the number of paragraphs wanted
	 */
	public static getParagraph(text: string, limit: number): string {
		let result = null;
		if (text != null) {
			// Html table clean
			const tableRegex = /(<(\/)?(table|tr|td|tbody|thead|tfoot|th)>)/g;
			const cleanText = text.replace(tableRegex, '');
			// Special split because old import can have <br> instead of paragraph
			const splitRegex = /(?:<p>)|(?:<br[\s]*(\/)?>[\s]*(&nbsp;)*[\s]*<br[\s]*(\/)?>)/g;
			const textParts = cleanText.split(splitRegex);
			const paragraphParts = [];
			// Will only keep a number of paragraphs defined by the limit
			for (let i = 0, total = 0, l = textParts.length; i < l && total < limit; i++) {
				const textPart = textParts[i];
				if (textPart !== undefined) {
					const part = textParts[i].trim();
					if (part !== '') {
						// Increments total of paragraphs added
						total++;
						paragraphParts.push(`<p>${part}`);
					}
				}
			}
			result = paragraphParts.join('');
		}
		return result;
	}
}

export default Utils;
