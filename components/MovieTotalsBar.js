export default {
    template:
    // Template for each row of movies, Only show Up if the move ticket amounts are at least greater than 0.
    // THe Sections outlining the adult ticket price and child ticket price only appear if the corret ticket amount is greater than 0
    `
    <div class="ticketTotalRow" v-if="curmovie.adultTicketAmt > 0 || curmovie.childTicketAmt > 0">
        <p>{{ curmovie.title }}</p>
        <p>
            <span v-if="curmovie.adultTicketAmt > 0">{{ curmovie.adultTicketAmt }} X \${{ adultprice }}</span>
            <button class="removeOne" v-if="curmovie.adultTicketAmt > 0" v-on:click="RemoveTicket('adult')" type="button" class="btn btn-secondary">X</button>
        </p>
        <p>
            <span v-if="curmovie.childTicketAmt > 0">{{ curmovie.childTicketAmt }} X \${{ childprice }}</span>
            <button class="removeOne" v-if="curmovie.childTicketAmt > 0" v-on:click="RemoveTicket('child')" type="button" class="btn btn-secondary">X</button>
        </p>
        <p>\${{ Math.round(100*((curmovie.adultTicketAmt * adultprice) + (curmovie.childTicketAmt * childprice)))/100 }}</p>
        <button class="removeAll" v-on:click="RemoveMovie" type="button" class="btn btn-secondary">Remove</button>
    </div>
    `,
    props: {
        // Data of the movie (looped through by v-for in TicketSummary), adultprice, and childprice form the TicketSummary's props is passed here as props.
        'curmovie': Object,
        'adultprice': Number,
        'childprice': Number
    },
    methods: {
        // Method Called wehn an entire movie is removed from the summary, emitting the movie id to update.
        RemoveMovie() {
            this.$emit('removemovie', this.curmovie.id);
        },
        // Method Called wehn a ticket instance is removed from the summary, emitting the movie id and ticket type as an object.
        RemoveTicket(type) {
            this.$emit('removeticket', { movieId: this.curmovie.id, movieType: type });
        }
    }
}