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

let myLibrary = [pf,pf,pf,pf,pf,pf,pf,pf,pf,pf,pf];

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
                
                // Name:

                var movieName = document.createElement("div");
                movieName.classList.add("movieName");
                
                movieName.innerText = myLibrary[movieCount].name;
                movie.appendChild(movieName);

                // Director:

                var movieDirector = document.createElement("div");
                movieDirector.classList.add("movieDirector");
                
                movieDirector.innerText = myLibrary[movieCount].director;
                movie.appendChild(movieDirector);

                // Duration:

                var movieDuration = document.createElement("div");
                movieDuration.classList.add("movieDuration");
                
                movieDuration.innerText = myLibrary[movieCount].duration;
                movie.appendChild(movieDuration);

                // Release:

                var movieRelease = document.createElement("div");
                movieRelease.classList.add("movieRelease");
                
                movieRelease.innerText = myLibrary[movieCount].release;
                movie.appendChild(movieRelease);
                
                // Delete Button:

                var deleteButton = document.createElement("button");
                deleteButton.classList.add("delete");
                
                deleteButton.setAttribute("id", "button" + movieCount);
                deleteButton.innerText = "🗑️";

                movie.appendChild(deleteButton);

                // Delete Functionality:
                
                var deleteButtons = document.querySelectorAll(".delete");
                deleteButtons.forEach((deleteButton) => {

                    deleteButton.addEventListener("click", (event) => {
                        
                        deleteMovie(event);
                    }, true);  
                });

                // console.log(myLibrary[movieCount]);
                movieCount++;

            } else {
                break;
            }
        }
    }
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