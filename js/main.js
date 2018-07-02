let d = (...x) => console.log(...x);
  
    let choices =[1,2,3,4,5,6,7,8,9],
    playerMoves = [],
    compMoves= [],
    winMovesComp = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],
    winMovesPlayer = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],
    whoStarts = '',
    playerTurn = false,
    compTurn = true,
    gameOver = false,
	playerIcon = '',
	compIcon = '',
	compWinningHand = [],
	gameStarted = false,
	evens = [2,4,6,8],
	storage = false,
	game = {
		starter: '',
		P2: name,
		P1: name,
		choices:[],
		h_move: [],
		c_move: [],
		result: '',
		forced: [],
		c_m2: [],
		c_m3: [],
		c_m4: [],
		dontUse: [],
	}
	
	let dataCollected;
	let savedDataCollected;
	

function checkLocalStorage(){
	// function for checking localStorage got on stackoverflow
	//https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

if(checkLocalStorage() === true){
	storage = true;
	dataCollected = localStorage.getItem('savedData') ? JSON.parse(localStorage.getItem('savedData')) : [];
	savedDataCollected = JSON.parse(localStorage.getItem('savedData'));
}else{
    dataCollected = [];// unavailable
}

  function resetGame() {
	$('input[name=start]').prop('checked', false);
	$('input[name=player]').prop('checked', false);
	game = {
		starter: '',
		P2: name,
		P1: name,
		choices:[],
		h_move: [],
		c_move: [],
		result: '',
		forced: [],
		c_m2: [],
		c_m3: [],
		c_m4: [],
		dontUse: [],
	}
    choices =[1,2,3,4,5,6,7,8,9];
    playerMoves = [];
    compMoves = [];
    winMovesComp =  [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    winMovesPlayer = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    setTimeout(function(){
      $('.squares').text("");
      $('.squares').css('background-color','yellow');
	gameStarted = false;
    whoStarts = (whoStarts === 'p1') ? whoStarts = 'p2': (whoStarts === 'p2')? whoStarts = 'p1': null;
	d('whoStarts',whoStarts);
	playerTurn = false;
	compTurn = false;
    (whoStarts === 'p1')? playerTurn = true: null;
    (whoStarts === 'p2')? compTurn = true: null;
	
    gameOver = false;
	compWinningHand = [];
	$('.outer').css('visibility','visible');
    },700);
  }


function pickyourIcon(icon) {
	if(gameStarted === false) {
		playerIcon = icon;
		(playerIcon === 'X')? compIcon = 'O': compIcon = 'X';
	} else {
		$('input[name=player]').prop('checked', false);
	  }
}

function whoStartsGame(starter) {
	if(gameStarted === false) {
	 if(starter === playerIcon) {
		 whoStarts = 'p1';
		 playerTurn = true;
		 compTurn = false;
	 } else {
		 whoStarts = 'p2';
		 playerTurn = false;
		 compTurn = true;
	 }
	 } else {
		  $('input[name=start]').prop('checked', false);
	  }
}

 $('input[name=player]').click(function(){
	 pickyourIcon($(this).val());
 })
 
 $('input[name=start]').click(function(){
	 whoStartsGame($(this).val());
  })
  
$('.start').click(function(){
	$('.outer').css('visibility','hidden');
	startGame();
})

function startGame() {
	gameStarted = true;
	if(compTurn === true) compMove(whoStarts)

}


 $('.squares').click(function() {
    if(playerTurn && gameStarted === true && gameOver === false) {
	  playersTurn(+$(this).attr("id"));
	  compsGoOrReset();
    }
  });
  
function playersTurn(num) {
	if(choices.includes(num)){ 
		$('#'+ num).text(playerIcon);
		if(game.h_move.length === 0) game.P1 = num;
		game.h_move.push(num);
		game.choices.push(num);
		playerMove(num);
		
		playerTurn = false;
		
		if(gameOver === true) {
			
			if(game.result === 'Lost'){
				dataCollected.push(game);
				if(storage === true) localStorage.setItem('savedData', JSON.stringify(dataCollected));
			};
			setTimeout(function(){resetGame()},700);
			};
		
		if(gameOver === false) compTurn = true;
	}
	
}

function playerMove(num) {
	updateChoicesAndWinMoves(num, 'p1');
	startCheckForWinningHand(playerMoves, winMovesPlayer);
	displayData(dataCollected);
}

function displayData(data) {
	if(storage === true){
		data = JSON.parse(localStorage.getItem('savedData'));
	}
	let allData = $('#allData');
	allData.html('');
	let div1 = $('<div></div>')
	
	for(dt in data) {
		let div2 = `<div class='error-moves'>
					<p> P2 first move: `+data[dt].P2+"...."+`P1 first move: `+data[dt].P1+`
					<br>Dont use: <span id='nuse'>`+data[dt].dontUse + `</span> Forced move: ` + data[dt].forced[0] +
					`<br> Move choices move 2: `+data[dt].c_m2+`<br> Move choices move 3: `+data[dt].c_m3+`
					</p>
					<ul>
						<li> P2 moves: `+data[dt].c_move+"...."+`P1 moves: `+data[dt].h_move+`</li>
					</ul>
					</div>`;
	allData.append(div2);
	}
	
}

function startCheckForWinningHand(pm,whp) {
	if(pm.length >= 3){ 
		  var res = checkingHands(whp,pm,'p1');
		if(res){
		  winner(res,'p1');
		}
	}
}


//********** shared functions ********************
function checkingHands(whp, pm, type) {
    
	let count = 0;
    
	for (let y = whp.length;y>0;y--){
 
		for(let z = pm.length;z>0;z--){
		  
			if(whp[y-1].includes(pm[z-1])){
			  count++;
			  
				if(count == 2 && type === 'p2'){
				  compWinningHand = whp[y-1];
				  result = whp[y-1].filter(function(x){return !pm.includes(x)})
				  return result[0]; 
				}
				if(count === 3 && type === 'p1'){
				  return whp[y-1];
				}
			}
		}
	  count = 0;
	}
      return 0;
}

function winner(arr,type) {
	
	if(type === 'p1'){
	  for(let x = 0;x<arr.length;x++){
		$(".board :nth-child(" + arr[x] + ")").css('background-color','red');
	  }
	game.result = 'Lost';
	displayWinLooseDraw('Lost', 'p1');
	gameOver = true;
	}

	if(type === 'p2'){
		setTimeout(function(){
			for(let x = 0;x<arr.length;x++){
			  $(".board :nth-child(" + arr[x] + ")").css('background-color','red');
			}
		  game.result = 'Win';

		  displayWinLooseDraw('Win','p2');
		 
		  gameOver = true;
		},700);
	}
}

function displayWinLooseDraw(res,type='') {
	let cpp1;
	let cpp2;
	if(res === 'Win' && type === 'p2'){
		ccp1 = $('#Wp2').html();
		ccp2 = $('#Lp1').html();
		ccp2++;
		ccp1++;
		$('#Lp1').html(ccp1);
		$('#Wp2').html(ccp2);
	} 
	
	if(res === 'Lost' && type === 'p1'){
		ccp1 = $('#Wp1').html();
		ccp2 = $('#Lp2').html();
		ccp2++;
		ccp1++;
		$('#Lp2').html(ccp1);
		$('#Wp1').html(ccp2);
	}
	if(res === 'Draw') {
		ccp1 = $('#Dp2').html();
		ccp2 = $('#Dp1').html();
		ccp2++;
		ccp1++;
		$('#Dp1').html(ccp1);
		$('#Dp2').html(ccp2);
	}
}

function updateChoicesAndWinMoves(num, type) {
	removeChoice(num, type);
	removeWinMoves(num, type);
}

function removeChoice(num,type='p1') {
    choices.splice(choices.indexOf(num),1);
    (type === 'p1')? playerMoves.push(num): compMoves.push(num);
	//d('choices',choices,type);
}

function removeWinMoves(num, type) {
    // remove win moves .....
	if(type === 'p1'){
		 winMovesComp = winMovesComp.filter( x => {
			 return (x.includes(num))? null: x;
		 });
	} else { 
		winMovesPlayer = winMovesPlayer.filter(function(x){
			return (x.includes(num))? null: x;
		  });
	}
}

//****************************************************

//**********comp moves and functions******************

function compsGoOrReset() {
	if(compTurn === true) {
		if(choices.length !== 0){
			  compMove(whoStarts);
		} else {
		  if(game.result === 'Lost'){
			  dataCollected.push(game);
			  if(storage === true){
					localStorage.setItem('savedData', JSON.stringify(dataCollected));
			  }
		  };
		  resetGame();
		}
	}
}

 function getRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
 }

function displayCompMove() {
	$(".board :nth-child(" + compMoves[compMoves.length-1] + ")").text(compIcon);
	if(compWinningHand.length === 3){
		setTimeout(function(){resetGame()},1000);
		//winner(compWinningHand, 'p2');
	} else {
		playerTurn = true;
		compTurn = false;
		if(choices.length === 0) {
			game.result = 'Draw';
			//display win loose draw results
			displayWinLooseDraw('Draw');
			resetGame()
			};
	}
}

function compCheckPlayerForWinHand(type) {
	  let count = 0;
      for (let y = winMovesPlayer.length; y > 0; y--){
        for(let z = playerMoves.length; z > 0; z--){
          if(winMovesPlayer[y-1].includes(playerMoves[z-1])){
              count++;
             if(count == 2){
			   return winMovesPlayer[y-1].filter((x)=>!playerMoves.includes(x))[0];
            }
          }
        }
          count = 0;
	  }
	  return 0;
} 

function compMove(starter) {
	let num;
	(starter === 'p2')? num = compStarted(compMoves, dataCollected): num = compDidntStart(compMoves);

	updateChoicesAndWinMoves(num, 'p2');
    setTimeout(displayCompMove,600);
}
// functions for comp for when player starts.....
function compDidntStart(cm) {
	let num;
	if(cm.length === 0) num = playerWentFirst();
	
	if(cm.length >= 2) num = checkingHands(winMovesComp, compMoves, 'p2');
	
	if(compWinningHand.length > 0) winner(compWinningHand, 'p2');
	
	if(playerMoves.length >= 2 && compWinningHand.length === 0) num = compCheckPlayerForWinHand();
	
	
	if(num === 0 && playerMoves.length === 2) num = secondMoves(playerMoves, compMoves);
	
	if(num === 0) num = remainingMoves();
	
	return num
}

function playerWentFirst() {

	  if(playerMoves[0] % 2 === 0){
		
		  switch (playerMoves[0]) {
			case 2:
			  return [5,1,3][getRand(0,2)];
			case 4:
			  return [1,7,5][getRand(0,2)];
			case 6:
			  return [3,9,5][getRand(0,2)];
			case 8:
			  return [7,9,5][getRand(0,2)];
		  }
	  } else {

		  switch (playerMoves[0]) {
			case 1:
			case 3:
			case 7:
			case 9:
			  return 5;
			case 5:
			  return [1,3,7,9][getRand(0,3)];
		  }
	  }
}

function secondMoves(pM, cm) {
		
	switch (pM[0]) {
		case 1:
		case 3:
		case 7:
		case 9:
		return (pM[1] % 2 != 0)? [2,4,6,8][getRand(0,3)]: (pM[0] + pM[1]) - compMoves[0];
		case 2:
		  return caseTwo(pM,cm);
		case 4:
		  return caseFour(pM,cm);
		case 6:
		  return caseSix(pM,cm);
		case 8:
		  return caseEight(pM,cm);
	}
	
	return 0;
}

function caseTwo(pM,cm) {
	switch (pM[1]) {
		case 1:
		  return [6,9,8,5][getRand(0,3)];
		case 3:
		  return [4,7,8,5][getRand(0,3)];
		case 4:
		case 7:
		  return (cm[0] === 1)? 5: (cm[0] === 5)? 1: [9,5,9][getRand(0,2)];
		case 8:
		  return [1,3,4,6,7,9][getRand(0,5)];
		case 6:
		case 9:
		  return (cm[0] === 3)? 5: (cm[0] === 5)? 3: [7,5,7][getRand(0,2)];
	}
}

function caseFour(pM,cm) {
	switch (pM[1]) {
		case 1:
		  return [6,8,9,8,6,5,8][getRand(0,6)]; // get comp to choose best moves most often
		case 2:
		case 3:
		   return (cm[0] === 1)? 5: (cm[0] === 5)? 1: [9,5,9][getRand(0,2)];
		case 6:
		  return [1,2,3,7,8,9][getRand(0,5)];
		case 7:
		  return [2,5,2,6,3,6][getRand(0,5)];//
		case 8:
		case 9:
		  return (cm[0] === 7) ? 5: (cm[0] === 5)? 7: [3,5,3][getRand(0,2)];
	}
}

function caseSix(pM,cm) {
	switch (pM[1]) {
		case 1:
		case 2:
		  return (cm[0] === 3)? 5: (cm[0] === 5)? 3: [7,5,7][getRand(0,2)];//
		case 3:
		  return [8,7,4,8,5,4][getRand(0,5)];//
		case 4:
		  return [1,2,3,7,8,9][getRand(0,5)];
		case 7:
		case 8:
		  return (cm[0] ===  9)? 5: (cm[0] === 5)? 9: [1,5,1][getRand(0,2)]//
		case 9:
		  return [2,4,1,4,2,5,1][getRand(0,6)]; // get comp to choose best moves most often
	}
}

function caseEight(pM,cm) {
	switch (pM[1]) {
		case 2:
		  return [1,4,7,3,6,9][getRand(0,5)];
		case 1:
		case 4:
		  return (cm[0] === 7)? 5: (cm[0] === 5)? 7: [3,5,3][getRand(0,2)];
		case 3:
		case 6:
		  return (cm[0] === 9)? 5: (cm[0] === 5)? 9: [1,5,1][getRand(0,2)];
		case 7:
		  return [6,3,2,3,6,5,2][getRand(0,6)];
		case 9:
		  return [1,4,2,4,1,5,2][getRand(0,6)];
	}
}

function remainingMoves() {
	d('remainingMoves');
	if(winMovesComp.length === 0) return result = choices[0];
    if(winMovesComp.length === 1 && !choices.includes(5)) {
		return result = blocking()
	} else {
		return 5;
	};
}

function blocking() {
	d('blocking');
  let a = 0, b = 0;
  
  if(winMovesComp.length === 1) {
	winMovesPlayer.filter(function(x){
	  if(x.includes(winMovesComp[0][0])) a++;
	  if(x.includes(winMovesComp[0][2])) b++;
	  
	});
   
  return (a>b)? winMovesComp[0][0]: winMovesComp[0][2];
  }
  
}

// functions for when comp starts .....
function compStarted(cm, data) {
	d('dataCollected',dataCollected);
	
	let num
	// if comp moves length >=2 i check to see if he has a winning move available to play and if so pick it
	if(cm.length >= 2) num = checkingHands(winMovesComp, compMoves, 'p2');
	// if he has a winning move he chooses it and sends the num to winner function;
	if(compWinningHand.length > 0) {
		game.c_move.push(num);
		game.choices.push(num);
		winner(compWinningHand, 'p2')};
	
	
	// if no winning move he checks to see if human has a winning move next play
	// if human has a winning move next play comp blocks it
	if(choices.length != 1){
		if(num === 0) {
			num = compCheckPlayerForWinHand();
			if(num != 0) {
				game.choices.push(num);
				game.forced.push(num);
				game.c_move.push(num);
			}
		}
		
		// if none of the above are relevant here he makes his first move
		if(cm.length === 0) {
			num = choices[getRand(0,7)];
			let val = $('#p21').val();
			if(val) num = +val;
			game.starter = 'p2';
			game.P2 = num;
			game.choices.push(num);
			game.c_move.push(num);
			return num;
			}
		// here he makes his second third fourth moves
		if(cm.length === 1) return compLengthOne(dataCollected, game);
		if(num === 0 && cm.length === 2) return compLengthTwo(winMovesPlayer, playerMoves, dataCollected);
		if(num === 0 && cm.length === 3) return compLengthThree(winMovesComp,playerMoves);
		
		return num;
	}
	num = choices[0];
	
	return num;
}

function compLengthOne(data, game) {
	let num;
	let val = $('#p22').val();
	
	// anything with game. ... is what i use to save data on the game
	
	// *****first run of game no data saved so moves are choosen in this section of code*****
	if (data.length === 0) {
		num = dataLengthIsZero('c_m2', val, '#mp22');
		game.c_move.push(num);
		return num;
	}
	//****************************************************************************************
	
	// Here comp starts to learn by calling playedTheseMovesBefore
	num = playedTheseMovesBefore(data,game,2,'c_m2');
	game.choices.push(num);
	game.c_move.push(num);
	return num;
}

function dataLengthIsZero(spot, val='',id) {
	// if val has a value i choose this move else i choose a random move
	// using val helps me train tic tac toe quicker
		game[spot] = [...choices];
		$(id).text(game[spot]);
		if(val) {
			if(+val < game[spot].length -1) {
				return game[spot][+val];
			} else {
				return game[spot][getRand(0,game[spot].length -1)];
			}
		} else {
			return game[spot][getRand(0,game[spot].length -1)];
		}
}

function compLengthTwo(wmp, pm, data) {
	let num;
	// anything with game. ... is what i use to save data on the game
	game.c_m3 = [...choices];
	let val = $('#p23').val();
	
	if (data.length === 0) {
		num = dataLengthIsZero('c_m3', val, '#mp23');
		game.c_move.push(num);
		return num;
	}
	
	// Here comp starts to learn by calling playedTheseMovesBefore
	num = playedTheseMovesBefore(data,game,3,'c_m3');
	
	game.choices.push(num);
	game.c_move.push(num);
	
	return num;
}

function playedTheseMovesBefore(data,game,moveNum,spot) {
	
	if(moveNum === 2) {
		num = theseMoves2(data,game,moveNum,spot) 
		};
	if(moveNum === 3) {num = theseMoves3(data,game,moveNum,spot) };
	
	return num
}


function theseMoves2(data,game,moveNum,spot) {
	// this is used to manually force a choice for comp to pick rather than comp choosing randomly
	// as it makes teaching quicker
	let val = $('#p22').val();
	
	// used just to display comps second mvoes that are available
	$('#mp22').text('');
	
	// used just to display data on page
	let lostD = $('#lost');
	lostD.html('<li>Bad second Moves</li>');
	
	//
	let pickFrom = [...choices];
	let num;
	let nc;
	let remC = new Set();
	let lData = filterLostData(data, moveNum);
	
	//Now i filter the specific ones to game being played 
	filterLData(1, lData, moveNum, remC, lostD);
	
	// filtering out the bad moves from the moves available
	nc =[...remC];
	pickFrom = pickFrom.filter(x => {
		return(nc.includes(x))? null: x;
	})
	
	//left with good moves and return a randomly picked one unless val has a value
	// in which case i use this to pick a specific one from choices rather than a random choices
	// this helps me teach tic tac toe quicker
	game[spot] = [...pickFrom];
	$('#mp22').text(game[spot]);
	
	if(val) {
		if(+val <= game[spot].length -1) {
			num = pickFrom[+val];
		} else {
			num = pickFrom[getRand(0,pickFrom.length-1)];
		}
	} else {
		num = pickFrom[getRand(0,pickFrom.length-1)];
	}
	
	return num;
}

function filterLData(index, lData, moveNum, remC, htmlText ) {
	//Now i filter the specific ones to game being played ... find moves that caused the loss and add to 
	// a set these move choices will then be removed from move choices below
	// so comp can no longer pick that move and loose ... and so has learned
	
	for(dt in lData) {
		if(lData[dt].forced.length > 0) {
			if(lData[dt].c_move.indexOf(lData[dt].forced[0]) === moveNum) {
				let rm = lData[dt].c_move[index];
				
				remC.add(rm);
				
				let list = `<li>`+lData[dt].choices+`  Dont use: `+rm+`</li>`;
				htmlText.append(list);
				
				if(!lData[dt].dontUse.includes(rm)) {
					lData[dt].dontUse.push(rm);
				}
			}
		}
	}
}

function theseMoves3(data,game,moveNum,spot) {
	let lost3 = $('#lost3');
	lost3.html('<li>Bad third Moves</li>');
	$('#mp23').text('');
	let val = $('#p23').val();
	
	let pickFrom = [...choices];
	let num;
	let nc;
	let remC = new Set();  //
	// filter lost data to get games that start with same first human move and same first comp move
	let lData = filterLostData(data, moveNum);
	
	d('lData',lData);
	
	//Now i filter the specific ones to game being played ... 
	filterLData(2, lData, moveNum, remC, lost3);
	
	// filtering out the bad moves from the moves available
	nc =[...remC];
	pickFrom = pickFrom.filter(x => {
		return(nc.includes(x))? null: x;
	})
	
	
	//left with good moves and return a randomly picked one
	/*game[spot] = [...pickFrom];
	$('#mp23').text(game[spot]);
	num = pickFrom[getRand(0,pickFrom.length-1)];*/
	
	game[spot] = [...pickFrom];
	$('#mp23').text(game[spot]);
	if(val) {
		if(+val <= game[spot].length -1) {
			num = pickFrom[+val];
		} else {
			num = pickFrom[getRand(0,pickFrom.length-1)];
		}
	} else {
		num = pickFrom[getRand(0,pickFrom.length-1)];
	}
	return num;
}

function filterLostData(data, moveNum) {
	if(moveNum === 2) {
		return  data.filter(x => {
			if(x.P2 === game.c_move[0] && x.P1 === game.h_move[0] && x.result === 'Lost') {
				return x};
		});
	}
	if(moveNum === 3) {
		return  data.filter(x => {
			if(x.P2 === game.c_move[0] && x.P1 === game.h_move[0] && x.c_move[1] === game.c_move[1] && x.result === 'Lost') {
				return x};
		});
	}
	
	
	
}

function compLengthThree(wmc, moves) {
	game.c_m4 = [...choices];
	let num = game.c_m4[getRand(0,game.c_m4.length -1)];
	game.choices.push(num);
	game.c_move.push(num);
	return num;
}

function compLengthFour(wmp) {
	if(wmp.length <= 1) return choices[getRand(0,choices.length-1)];
}

// code below not used .... is from non learning version of tic tac toe i just refactored above code that i needed 
// to chage for learning version and commented out code that wasnt required 
//later it will be deleted

/*function bestChoice(wdm, pm) {
	let res;
	let result = [];
	// loop through all available moves and find how many winMovePlayer get i get rid of if i pick this available move
	for(move in choices) {
		//d('move',choices[move]);
		let arr = []
		for(wMoves in wdm) {
			//d('wdm',wdm[wMoves]);
			(wdm[wMoves].includes(choices[move]))? null: arr.push(choices[move]);
		}
		result.push(arr);
	}
	d(result);
	// then filter out choices that have removed all winplayermoves down to one or less as i cant loose if player has
	// only one or less winning line of moves left
	res = result.filter(x => {
		if (pm.length === 1){
			return (x.length <= 2 && x.length != 0)? x[0]: null;
		} else {
			return (x.length <= 1 && x.length != 0)? x: null;
		}
		});
	d(res);
	
	// then return a random one of these choices if theres more than one
	res = res[getRand(0,res.length-1)];
	return res[0]
}*/

/*function interSections(wm, moves) {
	return wm.filter(x => {
		if(x.includes(moves[0]) || x.includes(moves[1])) return x;
		})
}*/


 
 /*function playersFirstMoves(cm, pm) {
	  return (cm[0] % 2 === 0)?  evenFirstNum(cm, pm): oddFirstNum(cm, pm);
 }
 
 function oddFirstNum(cm, pm) {
	 if(cm[0] === 1) {
		 switch (pm[0]) {
			 case 2:
				return [3,4,5,6,7,8,9];
			 case 3:
				return [4,5,6,7,8,9]
			 case 4:
				return [2,3,5,6,7,8,9];
			 case 6:
				return [3,4,5,7,8,9];
			 case 7:
				return [2,3,4,5,6,8,9];
			 case 8:
				return [2,3,5,6,7,9];
			 case 9:
				return [2,3,5,6,7,8];
		 }
	 }
	 if(cm[0] === 3) {
		 switch (pm[0]) {
			 case 1:
				return [4,5,6,7,8,9];
			 case 2:
				return [1,4,5,6,7,8,9];
			 case 4:
				return [1,5,6,7,8,9];
			 case 6:
				return [2,3,4,5,7,8,9]
			 case 7:
				return [1,2,4,5,8,9]
			 case 8:
				return [1,2,4,5,7,9]
			 case 9:
				return [2,3,4,5,6,7,8]
		 }
	 }
	 if(cm[0] === 7) {
		 switch (pm[0]) {
			 case 1:
				return [2,3,4,5,6,8,9];
			 case 2:
				return [1,3,5,6,8,9];
			 case 3:
				return [1,2,5,6,7,9];
			 case 4:
				return [1,2,3,5,6,8,9];
			 case 6:
				return [1,2,3,5,8,9];
			 case 8:
				return [1,2,3,4,5,6,9];
			 case 9:
				return [1,2,3,4,5,6];
		 }
	 }
	 if(cm[0] === 9) {
		 switch (pm[0]) {
			 case 1:
				return [2,3,4,5,7,8];
			 case 2:
				return [1,3,4,5,7,9];
			 case 3:
				return [1,2,4,5,6,7,8];
			 case 4:
				return [1,2,3,5,6,7];
			 case 6:
				return [1,2,3,4,5,7,8];
			 case 7:
				return [1,2,3,4,5,6];
			 case 8:
				return [1,2,3,4,5,6,7];
		 }
	 }
	 
 }
 
 function evenFirstNum(cm, pm) {
	 if(cm[0] === 8) {
		 switch (pm[0]) {
			 case 1:
				return [7,5,3];
			 case 2:
				return [1,3,4,5,6,7,9];
			 case 3:
				return [9,5,1]
			 case 4:
				return [1,3,5,6,7];
			 case 6:
				return [1,3,4,5,9]
			 case 7:
			   return [1,3,4,5];
			 case 9:
			   return [1,3,5,6];
			 
		 }
	 }
	  if(cm[0] === 2) {
		 switch (pm[0]) {
			 case 1:
				return [4,5,7,9];
			 case 3:
				return [5,6,7,9];
			 case 4:
				return [1,5,6,7,9];
			 case 6:
				return [3,4,5,7,9]
			 case 7:
			   return [1,5,9];
			 case 8:
				return [1,3,4,5,6,7,9];
			 case 9:
			   return [3,5,7];
			 
		 }
	 }
	 if(cm[0] === 4) {
		 switch (pm[0]) {
			 case 1:
				return [2,3,5,9];
			 case 2:
				return [1,3,5,8,9];
			 case 3:
				return [1,5,9];
			 case 6:
				return [1,2,3,5,7,8,9];
			 case 7:
			   return [3,5,8,9];
			 case 8:
			   return [7,5,2,3,9];
			 case 9:
				return [7,5,3];
			 
		 }
	 }
	 if(cm[0] === 6) {
		 switch (pm[0]) {
			 case 1:
				return [3,5,7];
			 case 2:
				return [1,3,5,7,8];
			 case 4:
				return [1,2,3,5,7,8,9];
			 case 8:
				return [9,7,5,2,1];
			 case 7:
			   return [9,5,1];
			 case 3:
			   return [1,2,5,7];
			 case 9:
				return [1,5,7,9];
			 
		 }
	 }
	 
 }*/