import SiteHeader from './components/SiteHeader.js';
import MovieCard from './components/MovieCard.js';
import TicketSummary from './components/TicketSummary.js';

// Vue instance declaration
let app = {
    data() {
        return {
            // Headers at the top of the page
            mainHeader: "Marcus' Movie Ticket Booth",
            movieHeader: "Now Playing",
            // Amount of movies needed to view
            movieSize: 3,
            // Array of movies (populated before mounted from the api call)
            myMovies: [],
            // Values to change on button events fired in the other components
            adultTicketTotal: 0,
            childTicketTotal: 0,
            // Values to pass as parameters for price calculations
            adultPrice: 6.99,
            childPrice: 3.99
        }
    },
    // Component declarations from the imported files.
    components: {
        siteheader: SiteHeader,
        moviecard: MovieCard,
        ticketsummary: TicketSummary
    },
    methods: {
        // Method called before being mounted to get movie information
        GetMovies() {
            // Call an axios request for now playing movies
            axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=24801537d801b786ed82113385e5986d&language=en-US&page=1')
            .then(response => {
                // Set the array of movies in allMovies
                let allMovies = response.data.results;
                
                // Create objects for each movie (up until the desired size form movieSize)
                for (let i = 0; i < this.movieSize; i++) {
                    let tempObj = {
                        id: i,
                        title: allMovies[i].title,
                        img: "https://image.tmdb.org/t/p/w500" + allMovies[i].poster_path,
                        overview: allMovies[i].overview,
                        adultTicketAmt: 0,
                        childTicketAmt: 0
                    }
                    // Append each new movie object ot the myMovies array.
                    this.myMovies.push(tempObj)
                }
            });
        },
        // Method that gets the object from MovieCard.js
        AddTicket(ticketData) {
            // The movie is grabbed by its supplied id.
            let movie = this.myMovies[ticketData.movieId];
            // Based on the type of ticket, the total of tickets is increased and the movie's specific amount of that ticket type is also increased.
            if (ticketData.movieType == "adult") {
                this.adultTicketTotal++;
                movie.adultTicketAmt++;
            }
            else {
                this.childTicketTotal++;
                movie.childTicketAmt++;
            }
        },
        // Method that is called when MovieTotalsBar objects press the remove button
        RemoveMovie(movieId) {
            let removingMovie = this.myMovies[movieId];
            // All amounts of tickets of the movie are removed from the totals
            this.adultTicketTotal -= removingMovie.adultTicketAmt;
            this.childTicketTotal -= removingMovie.childTicketAmt;
            // The movie's ticket amounts are set to zero.
            removingMovie.adultTicketAmt = 0;
            removingMovie.childTicketAmt = 0;
        },
        // Method that is called when MovieTotalsBar objects press the X button to remove a ticket instance
        RemoveTicket(ticketData) {
            let movie = this.myMovies[ticketData.movieId];
            // Based on the type, the desired ticket total is decremented as well as the movie's individual amount.
            if (ticketData.movieType == "adult") {
                this.adultTicketTotal--;
                movie.adultTicketAmt--;
            }
            else {
                this.childTicketTotal--;
                movie.childTicketAmt--;
            }
        }
    },
    // Before mounting, the GetMovies method is called to get the api data before the user sees the page.
    beforeMount() {
        this.GetMovies();
    },
}

// Vue instance bound to Div with id "app"
Vue.createApp(app).mount('#app');