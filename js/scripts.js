$(function() {

	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = ''
		for (var i = 0; i < 10; i++) {
			str+= chars[Math.floor(Math.random() * chars.length)]
		}
		return str;
	}

	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column col-xs-3 col-xs-offset-1');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete btn-danger').text('x');
			var $columnAddCard = $('<button>').addClass('add-card btn btn-primary').text('Add a card');
		// ADDING EVENTS

			$columnDelete.click(function() {
				self.removeColumn();
			});

			$columnAddCard.click(function(event) {
				self.addCard(new Card(prompt("Enter the name of the card")));
			});
		// CONSTRUCTION COLUMN ELEMENT

			$column.append($columnTitle)
					.append($columnDelete)
					.append($columnAddCard)
					.append($columnCardList);
		// RETURN OF CREATED COLUMN
			return $column;
		}
	}

	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	};

	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			// CREATING THE BLOCKS
			var $card = $('<li>').addClass('card col-xs-12 col-md-4 col-md-offset-1');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete-card').text('x');
			// ADDING EVENT
			$cardDelete.click(function() {
				self.removeCard();
			});
			// RETURN OF CREATED CARD
			$card.append($cardDelete)
				.append($cardDescription);
				return $card;
		}
		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
			}
		}
	}

	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	$('.create-column').click(function(){
			var name = prompt('Enter a column name');
			var column = new Column(name);
			board.addColumn(column);
		});

	// Creating COLUMNS 
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

	// ADDING COLUMNS TO BOARD
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	//CREATING NEW CARDS COPIES
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');
	var card3 = new Card('Style for kanban board')
	
	//ADDING CARD TO COLUMNS
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
	doneColumn.addCard(card3);
	//ADDING CLASS FOR CSS
	$('h2:first').addClass('first');
	$('h2:last').addClass('third');
});