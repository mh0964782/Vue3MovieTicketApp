export default {
    template: 
    // Bootstrap template (slightly altered) for displaying cards of each movie.
    // Two buttons (one for child tickets and the other for adult tickets) call AddTicket with the desired type when clicked
    `
    <div class="card" style="width: 18rem;">
        <img v-bind:src="movieobj.img" class="card-img-top" alt="...">
        <div class="btnSection">
            <button v-on:click="AddTicket('adult')" type="button" class="btn btn-secondary">Add Adult Ticket</button>
            <button v-on:click="AddTicket('child')" type="button" class="btn btn-secondary">Add Child Ticket</button>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{movieobj.title}}</h5>
            <p class="card-text">{{movieobj.overview}}</p>
        </div>
    </div>
    `,
    props: {
        // Movie objects passed in from the myMovies array, displaying the properties in the template
        'movieobj': Object
    },
    methods: {
        // Method called when any add ticket button is pressed, emiting an object to the Dom storing the movie id of the movie chosen and the type of ticket chosen.
        AddTicket(type) {
            this.$emit('newticket', { movieId: this.movieobj.id, movieType: type });
        }
    }
}