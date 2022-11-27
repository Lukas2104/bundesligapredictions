fetch("https://v3.football.api-sports.io/standings?league=78&season=2022", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "v3.football.api-sports.io",
		"x-rapidapi-key": "1d58387c493f67551682e6ea66ca27fe"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
