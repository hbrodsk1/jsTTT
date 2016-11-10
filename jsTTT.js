$(document).ready(function() {

	game.newGame();
});

var gameboard = {

		initialize: function() {
    		for(var x = 0; x < 3; x++) {
        		for(var y = 0; y < 3; y++) {
            		var unit = $("<div class='unit'></div>");
            		unit.appendTo('#gameboard');
        		}
    		}
    		console.log(100);
    		gameboard.addId();
    	},
    	
    	addId: function() {
    		var id = 1
			$('.unit').each(function() {
				$(this).attr('id', id);
				id++;
			});
		}
	};

	var players = {

		firstPlayer: {token: 'X'},
		secondPlayer: {token: 'O'}
	};

	var game = {

		newGame: function() {
			game.winCombos = game.clone();
			game.currentPlayerTurn = players.firstPlayer.token;
  			gameboard.initialize();
  			game.displayToken();
		},

		currentPlayerTurn: players.firstPlayer.token,

		changePlayer: function() {
			if(game.currentPlayerTurn === 'X') {
				game.currentPlayerTurn = players.secondPlayer.token;
			} else if(game.currentPlayerTurn === 'O') {
				game.currentPlayerTurn = players.firstPlayer.token;
			}
		},	

		displayToken: function() {
			$('.unit').click(function() {
				if(game.currentPlayerTurn === 'X' && !$(this).hasClass('selected')) {
					$(this).addClass('selected').removeClass('unit').text("X");
				} else if(game.currentPlayerTurn === 'O' && !$(this).hasClass('selected')) {
					$(this).addClass('selected').removeClass('unit').text("O");
				}
				game.win($(this));
			})
		},

		win: function(div) {
			game.winCombos.forEach(function(element, elementIndex) {
				element.forEach(function(unit, unitIndex){ 
    				if(unit.toString() === div.attr('id').toString()) {
    					console.log(elementIndex, unitIndex);
    					game.winCombos[elementIndex][unitIndex] = game.currentPlayerTurn;
    				}
    			})
    				game.countAndCheck(element);	
    			})
			game.changePlayer();
		},

		countAndCheck: function(arr) {
			var counter = 0

    			for (var i = 0; i < arr.length; i++) {
   					if (arr[i] === game.currentPlayerTurn) {
      				counter ++;
   					}
   				} 

   				if(counter === 3) {
   					counter = 0;
   					game.message(game.currentPlayerTurn);
   					game.restart();	
   				}
		},

		message: function(token) {
			var victory = $("<div class='winner'></div>");
            		victory.html(token + " Wins!").appendTo('#heading');
		},

		gameOver: function() {
			$('.unit').remove();
			$('.selected').remove();
			$('.winner').remove();
			$('.restart').hide();
		},

		restart: function(){ $('.restart').show().click(function() {
			game.gameOver();
			game.newGame();
		})
	},

		winCombos: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],

		clone: function() {return [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]] }



	};




