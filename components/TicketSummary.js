import MovieTotalsBar from './MovieTotalsBar.js';

export default {
    template:
    // Template to store the Ticket Summary sections, 
    // Containing a header, a subheading for each section,
    // MovieTotalsBars components for each movie, and the subtotal and totals sections.
    // Ticket Summary Component only appears if there is a least one ticket selected.
    // The child and adult subtotals at the bottom only appear if each one has at least 1 ticket of their type chosen.
    `
    <div id="ticketSummary" v-if="adulttotal > 0 || childtotal > 0">
        <h2 id="ticketTotalsTitle">Ticket Summary</h2>
        <div class="ticketTotalRow">
            <p>Movie</p>
            <p>Adult Tickets</p>
            <p>Child Tickets</p>
            <p>Subtotal</p>
            <p></p>
        </div>
        <movietotalsbar v-for="movie in movielist" v-bind:curmovie="movie" v-bind:adultprice="adultprice" v-bind:childprice="childprice" v-on:removemovie="RemoveMovie($event)" v-on:removeticket="RemoveTicket($event)"></movietotalsbar>
        <div class="ticketTotalRow Totals" v-if="adulttotal > 0">
            <p>Adult Subtotal</p>
            <p>{{ adulttotal }} - \${{ Math.round(100*(adulttotal * adultprice))/100 }}</p>
        </div>
        <div class="ticketTotalRow Totals" v-if="childtotal > 0">
            <p>Child Subtotal</p>
            <p>{{ childtotal }} - \${{ Math.round(100*(childtotal * childprice))/100 }}</p>
        </div>
        <div id="summaryEnd" class="ticketTotalRow Totals" v-if="adulttotal > 0 || childtotal > 0">
            <p>Total</p>
            <p>\${{ Math.round(100*((adulttotal * adultprice) + (childtotal * childprice)))/100 }}</p>
        </div>
    </div>
    `,
    // The array of movie objects, adulttotal, childtotal, adultprice, and childprice are passed in as props.
    props: {
        'movielist': Array,
        'adulttotal': Number,
        'childtotal': Number,
        'adultprice': Number,
        'childprice': Number
    },
    // The MovieTotalsBar Component is declared
    components: {
        movietotalsbar: MovieTotalsBar
    },
    methods: {
        // Middle-man functions that transfer the data emitted from MovieTotalsBar to the Dom
        //When a movie instance is removed from the summary or an individual ticket is removed.
        RemoveMovie(movieId) {
            this.$emit('removemovie', movieId);
        },
        RemoveTicket(ticketData) {
            this.$emit('removeticket', ticketData);
        }
    }
}