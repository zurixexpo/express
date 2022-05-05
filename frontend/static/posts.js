import AbstractView from './AbstractView.js';

export default class extends AbstractView{
	constructor() {
		this.setTitle('POSTS')
	}


	async getHtml() {
		return `<p>this is posts</p>`;
	}
}