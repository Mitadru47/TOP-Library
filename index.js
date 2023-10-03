function Movie(name, director, duration, release){

    this.name = name;
    this.director = director;

    this.duration = duration;
    this.release = release;

    this.info = function (){
        return (this.name + " by " + this.director + ", " + this.duration + ", " + this.release + ".");
    }
}

let pf = new Movie("Pulp Fiction", "Quentin Tarantino", "2h 34m", "1994");
let tgbh = new Movie("The Grand Budapest Hotel", "Wes Anderson", "1h 39m", "2014");
let sf = new Movie("Scarface", "Brian De Palma", "2h 50m", "1983");
let sc = new Movie("Stagecoach", "John Ford", "1h 36m", "1939");
let hgf = new Movie("His Girl Friday", "Howard Hawks", "1h 32m", "1940");
let ts = new Movie("The Shining", "Stanley Kubrick", "2h 26m", "1980");
let fafdm = new Movie("For a Few Dollars More", "Sergio Leone", "2h 12m", "1965");
let sl = new Movie("Schindler's List", "Steven Spielberg", "3h 15m", "1993");
let gf = new Movie("Goodfellas", "Martin Scorsese", "2h 26m", "1990");
let tg = new Movie("The Godfather", "Francis Ford Coppola", "2h 55m", "1972");
let br = new Movie("Blade Runner", " Ridley Scott", "1h 57m", "1982");

let myLibrary = [pf, tgbh, sf, sc, hgf, ts, fafdm, sl, gf, tg, br];

function formToggle(){

    var form = document.querySelector("#form");

    if(form.style.display === "flex"){
        form.style.display = "none";

    } else if(form.style.display = "none"){
        form.style.display = "flex";
    }
}

var html = document.querySelector("html");
html.addEventListener("submit", (event) => {

    event.preventDefault();
    console.log(event);

    var temp = [];
    var data = new FormData(event.target);

    for([input, value] of data){

        temp.push(value);
        console.log(input + ": " + value);
    }

    var movie = new Movie(temp[0], temp[1], temp[2], temp[3]);
    myLibrary.push(movie)
    
    resetLibrary();
    buildLibrary();
    
}, true);

function resetLibrary(){

    var library = document.querySelector(".library");
    library.remove();
}

function buildLibrary(){

    var rows = 0;
    var columns = 4;

    var library = document.createElement("div");
    library.classList.add("library");
     
    var sectionB = document.querySelector(".sectionB");
    sectionB.appendChild(library);

    if(myLibrary.length <= 4){
        
        rows = 1;
        columns = myLibrary.length;
        
    } else {
        rows = (Math.ceil(myLibrary.length / 4) + 1);
    }

    var movieCount = 0;
    for(var i=0; i<rows; i++){

        if(myLibrary[movieCount] === undefined){
                
            movieCount++;
            break;
        }

        var movieRow = document.createElement("div");

        movieRow.classList.add("movieRow");
        library.appendChild(movieRow);

        for(var j=0; j<columns; j++){

            if(myLibrary[movieCount] === undefined){
                
                movieCount++;
                continue;
            }
            
            if(movieCount <= (myLibrary.length - 1)){

                var movie = document.createElement("div");
                
                movie.classList.add("movie");
                movie.setAttribute("id", "movie" + movieCount);
                
                movieRow.appendChild(movie);
                var divContainer = document.createElement("div");
                
                // Name:

                var movieName = document.createElement("div");
                movieName.classList.add("movieName");
                
                movieName.innerText = myLibrary[movieCount].name;
                divContainer.appendChild(movieName);

                // Director:

                var movieDirector = document.createElement("div");
                movieDirector.classList.add("movieDirector");
                
                movieDirector.innerText = myLibrary[movieCount].director;
                divContainer.appendChild(movieDirector);

                // Duration:

                var movieDuration = document.createElement("div");
                movieDuration.classList.add("movieDuration");
                
                movieDuration.innerText = myLibrary[movieCount].duration;
                divContainer.appendChild(movieDuration);

                // Release:

                var movieRelease = document.createElement("div");
                movieRelease.classList.add("movieRelease");
                
                movieRelease.innerText = myLibrary[movieCount].release;
                divContainer.appendChild(movieRelease);

                movie.appendChild(divContainer);
                
                // Buttons:

                var buttonTray = document.createElement("div");
                buttonTray.classList.add("buttonTray");

                movie.appendChild(buttonTray);

                // Delete Button:

                var deleteButton = document.createElement("button");
                deleteButton.classList.add("delete");
                
                deleteButton.setAttribute("id", "button" + movieCount);
                deleteButton.innerText = "Remove";

                buttonTray.appendChild(deleteButton);

                // Review Button:

                var reviewButton = document.createElement("button");
                reviewButton.innerText = "Rate";

                reviewButton.classList.add("rate");
                reviewButton.setAttribute("id", "rating" + movieCount);

                buttonTray.appendChild(reviewButton);

                // console.log(myLibrary[movieCount]);
                movieCount++;

            } else {
                break;
            }
        }
    }

    // Delete Functionality:
                
    var deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((deleteButton) => {

        var flag = false;
        deleteButton.addEventListener("click", (event) => {
            
            deleteMovie(event);
        }, true);  

    });

    // Rate Functionality:

    var rateButtons = document.querySelectorAll(".rate");
    rateButtons.forEach((rateButton) => {

        rateButton.addEventListener("click", (event)=>{

            var movieId = event.target.getAttribute("id").substring(6);
            // console.log(movieId);

            var dialog = document.createElement("dialog");

            var div = document.createElement("div");
            div.innerText = myLibrary[movieId].name;

            dialog.appendChild(div);

            var input = document.createElement("input");

            var button = document.createElement("button");
            var cancelButton = document.createElement("button");
            
            input.setAttribute("id", "rating");
            input.placeholder = "0.0 - 10.0"

            button.innerText = "Rate";
            cancelButton.innerText = "Cancel";
            
            div.style.fontSize = "2rem";
            cancelButton.classList.add("cancelButton");

            input.style.marginRight = "5px";
            button.style.marginRight = "2.5px";

            dialog.appendChild(input);

            dialog.appendChild(button);
            dialog.appendChild(cancelButton);

            var library = document.querySelector(".library");
            library.appendChild(dialog);

            dialog.showModal();
            button.addEventListener("click", ()=>{

                if((Number(input.value) >= 0.0) && (Number(input.value) <= 10.0) && (input.value !== "")){

                    var temp = (Math.round(Number(input.value) * 10))/10;
                    rateButton.innerText = temp;
                    
                    rateButton.style.backgroundColor = "#F8FF95";
                    rateButton.style.border = "0";

                    rateButton.style.fontSize = "1.5rem";
                    rateButton.style.color = "black";

                    rateButton.style.cursor = "pointer";

                    dialog.close();
                }

            }, true);

            cancelButton.addEventListener("click", () => dialog.close(), true);

        }, true);
    });
}

function deleteMovie(event){

    movieId = event.target.getAttribute("id");
    
    var temp = myLibrary;
    var index = 0;
    
    myLibrary = [];

    temp.forEach((movie) => {
        
        if(movieId.substring(6) !== (index++).toString()){
            myLibrary.push(movie);
        }
    });

    resetLibrary();   
    buildLibrary();
}

buildLibrary();