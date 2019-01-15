var costInc = [1, 1, 1, 1, 1, 1];
var costDec = [1, 1, 1, 1, 1, 1];

var charNum = [8, 8, 8, 8, 8, 8];

var choosenBonus = null;

var raceBonuses = {
	dwarf:     [[2, 0, 2, 0, 0, 0],
		        [0, 0, 2, 0, 1, 0]],

	elf: 	   [[0, 2, 0, 1, 0, 0],
		 	    [0, 2, 0, 0, 1, 0],
		 	    [0, 2, 0, 0, 0, 1]],

	human: 	    [1, 1, 1, 1, 1, 1],

	halfling:  [[0, 2, 1, 0, 0, 0],
			    [0, 2, 0, 0, 0, 1]],

	dragonborn: [2, 0, 0, 0, 0, 1],

	gnome: 	   [[0, 1, 0, 2, 0, 0],
			    [0, 0, 1, 2, 0, 0]],

	halfelf: 	[0, 0, 0, 0, 0, 2], //+2 характеристики на выбор на 1

	halforc: 	[2, 1, 0, 0, 0, 0],

	tiefling: 	[0, 0, 0, 1, 0, 2]
};

var chars = ["strength", "dexeterity", "constitution", "intelligence", "wisdom", "charisma"];

const chooseChar = (characteristic) => {
	switch (characteristic) {
		case "strength":
			return 0;
		case "dexeterity":
			return 1;
		case "constitution":
			return 2;
		case "intelligence":
			return 3;
		case "wisdom":
			return 4;
		case "charisma":
			return 5;
	}
}

const increase = (characteristic) => {
	let charSpan = $("." + characteristic + " .number"); // характеристика
	let modSpan = $("." + characteristic + " .cost"); // модификатор характеристики
	let costNum = 0; // номер характеристики
	let checked = $('.race-bonus').prop('checked');

	costNum = chooseChar(characteristic);

	if (charNum[costNum] < 18 && parseInt($(".points").val()) >= costInc[costNum]) {
		charNum[costNum] += 1;
		$(".points").val(parseInt($(".points").val()) - costInc[costNum]);

		if (checked) {
			charSpan.text(charNum[costNum] + choosenBonus[costNum]);
		} else {
			charSpan.text(charNum[costNum]);
		}
	}

	if (charNum[costNum] < 14) {
		costInc[costNum] = 1;
		costDec[costNum] = 1;
	}
	if (charNum[costNum] === 14) {
		costInc[costNum] = 2;
		costDec[costNum] = 1;
	}
	if (charNum[costNum] === 15) {
		costInc[costNum] = 2;
		costDec[costNum] = 2;
	}
	if (charNum[costNum] === 16) {
		costInc[costNum] = 3;
		costDec[costNum] = 2;
	}
	if (charNum[costNum] === 17) {
		costInc[costNum] = 3;
		costDec[costNum] = 3;
	}
	if (charNum[costNum] === 18) {
		costDec[costNum] = 3;
	}

	modSpan.text(Math.ceil((parseInt(charSpan.text()) - 11) / 2));
	if (parseInt(modSpan.text()) > 0) {
		modSpan.text("+" + modSpan.text());
	}
}

const decrease = (characteristic) => {
	let charSpan = $("." + characteristic + " .number"); // характеристика
	let modSpan = $("." + characteristic + " .cost"); // модификатор характеристики
	let costNum = 0; // номер характеристики
	let checked = $('.race-bonus').prop('checked');

	costNum = chooseChar(characteristic);

	if (charNum[costNum] > 8) {
		charNum[costNum] -= 1;
		$(".points").val(parseInt($(".points").val()) + costDec[costNum]);

		if (checked) {
			charSpan.text(charNum[costNum] + choosenBonus[costNum]);
		} else {
			charSpan.text(charNum[costNum]);
		}
	}

	if (charNum[costNum] < 14) {
		costInc[costNum] = 1;
		costDec[costNum] = 1;
	}
	if (charNum[costNum] === 14) {
		costInc[costNum] = 2;
		costDec[costNum] = 1;
	}
	if (charNum[costNum] === 15) {
		costInc[costNum] = 2;
		costDec[costNum] = 2;
	}
	if (charNum[costNum] === 16) {
		costInc[costNum] = 3;
		costDec[costNum] = 2;
	}
	if (charNum[costNum] === 17) {
		costInc[costNum] = 3;
		costDec[costNum] = 3;
	}

	modSpan.text(Math.ceil((parseInt(charSpan.text()) - 11) / 2));
	if (parseInt(modSpan.text()) > 0) {
		modSpan.text("+" + modSpan.text());
	}
}

const changeSubrace = () => {
	let race = $('.race');
	let subrace = $('.subrace');
	let chosenRace = $('.' + race.val() + '-race');

	subrace.addClass("hidden");
	chosenRace.removeClass("hidden");

	chooseRace();
}

const chooseRace = () => {
	let race = $('.race');
	let chosenRace = $('.' + race.val() + '-race');

	switch (race.val()) {
		case "dwarf":
			switch (chosenRace.val()) {
				case "mountain-dwarf":
					choosenBonus = raceBonuses.dwarf[0];
					break;
				case "hill-dwarf":
					choosenBonus = raceBonuses.dwarf[1];
					break;
			}
		break;

		case "elf":
			switch (chosenRace.val()) {
				case "high-elf":
					choosenBonus = raceBonuses.elf[0];
					break;
				case "forest-elf":
					choosenBonus = raceBonuses.elf[1];
					break;
				case "dark-elf":
					choosenBonus = raceBonuses.elf[2];
					break;
			}
		break;

		case "human":
			choosenBonus = raceBonuses.human;
			break;

		case "halfling":
			switch (chosenRace.val()) {
				case "stocky-halfling":
					choosenBonus = raceBonuses.halfling[0];
					break;
				case "lungs-halfling":
					choosenBonus = raceBonuses.halfling[1];
					break;
			}
		break;

		case "dragonborn":
			choosenBonus = raceBonuses.dragonborn;
			break;

		case "gnome":
			switch (chosenRace.val()) {
				case "forest-gnome":
					choosenBonus = raceBonuses.gnome[0];
					break;
				case "rocky-gnome":
					choosenBonus = raceBonuses.gnome[1];
					break;
			}
		break;

		case "halfelf":
			choosenBonus = raceBonuses.halfelf;
			break;

		case "halforc":
			choosenBonus = raceBonuses.halforc;
			break;

		case "tiefling":
			choosenBonus = raceBonuses.tiefling;
			break;

	}
	applyBonuses();
}

const applyBonuses = () => {
	let checked = $('.race-bonus').prop('checked');

	if (checked) {
		for (i = 0; i < 6; i++) {
			$("." + chars[i] + " .number").text(charNum[i] + choosenBonus[i]);

			$("." + chars[i] + " .cost").text(Math.ceil((parseInt($("." + chars[i] + " .number").text()) - 11) / 2));
			if (parseInt($("." + chars[i] + " .cost").text()) > 0) {
				$("." + chars[i] + " .cost").text("+" + $("." + chars[i] + " .cost").text());
			}
		}
	} else {
		for (i = 0; i < 6; i++) {
			$("." + chars[i] + " .number").text(charNum[i]);

			$("." + chars[i] + " .cost").text(Math.ceil((parseInt($("." + chars[i] + " .number").text()) - 11) / 2));
			if (parseInt($("." + chars[i] + " .cost").text()) > 0) {
				$("." + chars[i] + " .cost").text("+" + $("." + chars[i] + " .cost").text());
			}
		}
	}
}

$(".points").val(30);

changeSubrace();