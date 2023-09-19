export default {
    template: 
    // Bootstrap template (slightly altered) for displaying cards of each movie.
    // Two buttons (one for child tickets and the other for adult tickets) call AddTicket with the desired type when clicked
    `
    <div id="Header">
        <h1>{{ sitetitle }}</h1>
        <a href="index.html"><img src="./images/homeicon.png" alt="Home"></a>
    </div>
    `,
    props: {
        // Movie objects passed in from the myMovies array, displaying the properties in the template
        'sitetitle': String
    },
    methods: {
        // Method called when any add ticket button is pressed, emiting an object to the Dom storing the movie id of the movie chosen and the type of ticket chosen.
        // AddTicket(type) {
        //     this.$emit('newticket', { movieId: this.movieobj.id, movieType: type });
        // }
    }
}