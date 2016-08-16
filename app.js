import express from 'express'
import multer from 'multer'
import graphqlHTTP from 'express-graphql';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLError,
} from 'graphql';

// A simple schema which includes a mutation.
const UploadedFileType = new GraphQLObjectType({
    name: 'UploadedFile',
    // All the fields parsed by multer on a single file
    fields: {
        originalname: {
            type: GraphQLString
        },
        mimetype: {
            type: GraphQLString
        },
        encoding: {
            type: GraphQLString
        },
        destination: {
            type: GraphQLString
        },
        filename: {
            type: GraphQLString
        },
        path: {
            type: GraphQLString
        },
        size: {
            type: GraphQLInt
        }
    }
});

const TestMutationSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'QueryRoot',
        fields: {
            test: {
                type: GraphQLString
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: 'MutationRoot',
        fields: {
            uploadFile: {
                type: UploadedFileType,
                resolve(rootValue) {
                    // For this test demo, we're just returning the uploaded
                    // file directly, but presumably you might return a Promise
                    // to go store the file somewhere first, before returning
                    // metadata on that file.
                    return rootValue.request.file;
                }
            }
        }
    })
});

const app = express();

// Configure multer to use the /uploads folder for new files
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    // Use "[original file name]-[timestamp]" for file names in uploaded directory
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.originalname + '-' + Date.now())
    }
})

var upload = multer({
    storage: storage
})

// Parse all requests to the server w/ multer
app.use(upload.single('file'));

// Providing the request as part of `rootValue` allows it to
// be accessible from within Schema resolve functions.
app.use(graphqlHTTP(req => {
    return {
        schema: TestMutationSchema,
        rootValue: {
            request: req
        },
        graphiql: true
    };
}));

// Start the server
app.listen(3000);
