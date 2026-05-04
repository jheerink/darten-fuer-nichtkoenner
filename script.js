const form = document.getElementById("playerForm");
		const list = document.getElementById("playerList");

		//Beim laden gespeicherte Spieler anzeigen
		let players = [];
		loadPlayers();
		renderList();


		form.addEventListener("submit", function(e) {
			e.preventDefault();

			const name = document.getElementById("playerName").value;
			const score = document.getElementById("playerScore").value;

			await fetch("http://localhost:3000/players", {
				method: "POST",
				headers: {
					"Content-Type": "application/json" },
				body: JSON.stringifiy({
					name: name,
					score: Number(score)
				})
			});

			loadPlayers();
			form.reset();
		});



		async function loadPlayers() {
			const res = await fetch("http://localhost:3000/players");
			const data = await res.json();
			console.log(data);
		}



		function renderList() {
			list.innerHTML = "";

			players.forEach((player, index) => {
				const li = document.createElement("li");
				
				li.innerHTML = `
				${player.name} - Score: ${player.score}
				<button onclick="editPlayer(${index})">Bearbeiten</button>
				<button onclick="addScore(${index})">+ Punkte</button>
				`;

				list.appendChild(li);
			});
		}

		

		async function editPlayer(index) {
			const player = players[index];

			const newName = prompt("Neuer Name:", player.name);
			const newScore = prompt("Neuer Score", player.score);

			if(newName !== null && newScore !== null) {
				await fetch(`http://localhost:3000/players/${player.id}`, {
					method: "PUT",
					headers: {
						"Content-Typ": "application/json" },
					body: JSON.stringify({
						name: newName,
						score: Number(score)
					})
				});
				loadPlayers();
			}
		}	
