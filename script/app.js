(() => {
	// set up the puzzle pieces and boards

	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
				dropZones = document.querySelectorAll('.drop-zone'),
				gameBoard = document.querySelector('.puzzle-board'),
				dragZone = document.querySelector('.puzzle-pieces');
	const pieceName =["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeImageSet () {
		//change all the image elements on the page -> draggable image sources,

		//change the image elements on the left to match the seletecd puzzle

		pieceName.forEach((piece, index) => {
		puzzlePieces[index].src = `images/${piece + this.dataset.puzzleref}.jpg` ;
		puzzlePieces[index].id =`${piece + this.dataset.puzzleref}`;

		//set attribute so that we can compare it later with a drop zone attribute
		//to see if the puzzle is in  the right location 

		puzzlePieces[index].setAttribute('data-position', piece);

	});

		resetPuzzlePieces();

		//it is to reset the background images of the puzzle the user selects

		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.puzzleref}.jpg)`;
		
		//debugger;
	}

	function resetPuzzlePieces(){	

		//resets the puzzle pices when new puzzle is selected	

		for(let i=0; i < puzzlePieces.length; i++){	
		dragZone.appendChild(puzzlePieces[i]);	
	    }
	}

	function allowDrag(event) {
		console.log('started draggin an image');

		event.dataTransfer.setData("text/plain", this.id);
	}
	function allowDragOver(event) {
		event.preventDefault();
		console.log('dragged over a drop zone');
	}
	function allowDrop(event) {

		let currentImage = event.dataTransfer.getData("text/plain");
		let droppingImage = document.querySelector(`#${currentImage}`);

		if(this.childNodes.length === 0) {

		//adds that image to whatever drop zone we're dropping out image on

		this.appendChild(droppingImage);
	}
		else {
			isAllFull();
			if (isFull === 4){
			console.log(isFull);
			
			//changes the positions of images between two puzzle pieces 

			droppingImage.parentElement.append(this.firstChild);
			this.appendChild(droppingImage);
	}
	        if (this.childNodes.length === 1) {
	        
	        	//finds empty drop zone and then drops the puzzle piece 
	        	
			for (let i=0; i < 4; i++){
				if (dropZones[i].childNodes.length == 0) {
					dropZones[i].append(this.firstChild);
					i = 5;
				}
			}
			
			//adds draged image to the drop zone

			this.appendChild(droppingImage);

}
	
	}
	console.log('dropped on a drop zone');
	isFinished();


	}
	function isAllFull() { 

		//checks if all the puzzle pieces are on the puzzle board

		isFull = 0;
		dropZones.forEach(zone => {
			if (zone.childNodes.length > 0){
				isFull += 1;
			}
		});
	}
	function isFinished(){
	let p = 0;
	isAllFull();
	if (isFull === 4){
		dropZones.forEach(zone => {
			if(zone.dataset.position === zone.firstChild.dataset.position){
			p += 1;
			}
		});
	}

	if (p == 4){
		alert('Finally! you have done the puzzle');
	}

	
}
	//add event handling here
	//click on the bottom buttons to change the puzzle images we are woking with

	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));


	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));


	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	//call the function and pass in the first nav button as a reference
// research call, apply and blind -> look at MDN

	changeImageSet.call(puzzleButtons[0]);
})();
