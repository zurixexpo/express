const navigateTo = url =>{
	history.pushState(null, null, url);
	router();
}

const router = async () =>{
	const routes = [
	{path: '/', view : () => console.log('this is homepage')},
	{path: '/posts', view : () => console.log('this is posts')},
	{path: '/about', view : () => console.log('this is about')}
	];

	const potentialMatches = routes.map( route =>{
		return{
			route: route,
			isMatched: location.pathname == route.path
		}
	});

	let match = potentialMatches.find(potentialMatches => potentialMatches.isMatched);

	if (!match) {
		match = {
			route: routes[0],
			isMatched: true
		}
	}
	console.log(match.route.view());
};

window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () =>{
	document.body.addEventListener('click', (e) =>{
		console.log(e.target)
		if (e.target.matches('[data-link]')) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});
	router();
})