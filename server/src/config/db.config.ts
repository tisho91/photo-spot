export const dbConfig = {
    url: `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@cluster0.6ehvq.mongodb.net/${ process.env.DB_NAME }?retryWrites=true&w=majority`
}
