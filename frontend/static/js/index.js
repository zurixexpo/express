const navigateTo = url =>{
	history.pushState(null, null, url);
	router();
}

const banned = ["undefined","somerestrictedpath"];

const router = async () =>{
	const routes = [
	{path: '/404', dataLocation: 'static/js/views/404.html', title: 'eror'},
	{path: '/', dataLocation: 'static/js/views/home.html', title: 'Home', view : () => console.log('this is homepage')},
	{path: '/posts', dataLocation: 'static/js/views/posts.html', title: 'Posts', view : () => console.log('this is posts')},
	{path: '/about', dataLocation: 'static/js/views/about.html', title: 'About', view : () => console.log('this is about')}
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
	// console.log(match.route.dataLocation);
	if (!match.route.dataLocation) {
		return;
	}
	injectData(match.route.dataLocation, match.route.title);
};


// deciding the contents of websites
const main = document.getElementById('main');
async function injectData(matchedPaths, titles){
	console.log(matchedPaths);
	if (banned.includes(matchedPaths)) {
		main.innerHTML = "This Kind Of Data Is restricted";
		return;
	}
	document.title = titles;
	let contents = await fetch(matchedPaths).then(data => data.text());
	main.innerHTML = contents;
	// csshandler(matchedPaths)
}

// handling css of pages
// function csshandler(page) {
// 	if () {}

// }





window.addEventListener('popstate', router);

document.addEventListener("DOMContentLoaded", () =>{
	document.body.addEventListener('click', (e) =>{
		if (e.target.matches('[data-link]')) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
		if (e.target.matches('[data-Img]')) {
			e.preventDefault();
			navigateTo(e.target.attributes.relink.value);
			// console.log(e.target.attributes.relink.value);
		}
	});
	router();
})


//this is getting back without reload

// history.go(-5)   five page back +5 for five page next
