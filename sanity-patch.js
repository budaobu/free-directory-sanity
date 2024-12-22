import { client } from "@/sanity/lib/client";

// const client = sanityClient.withConfig({ apiVersion: '2024-02-28' });

const query = `*[_type == 'produt' && featured == true]` //get all of your posts that do not have isHighlighted set

// https://www.sanity.io/answers/updating-default-field-value-in-sanity-io-using-a-script
const mutateDocs = async (query) => {
    const docsToMutate = await client.fetch(query, {});
    for (const doc of docsToMutate) {
        const mutation = {
            featured: false
        }
        console.log('uploading');
        client
            .patch(doc._id) // Document ID to patch
            .set(mutation) // Shallow merge
            .commit() // Perform the patch and return a promise
            .then((updatedDoc) => {
                console.log('Hurray, the doc is updated! New document:');
                console.log(updatedDoc._id);
            })
            .catch((err) => {
                console.error('Oh no, the update failed: ', err.message);
            })
    }
}

mutateDocs(query);