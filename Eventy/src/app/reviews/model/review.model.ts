export interface Review {

}

export interface CreateReview {
   graderId: number;
   solutionId: number;
   eventId: number;
   grade: number;
   comment: String;
}