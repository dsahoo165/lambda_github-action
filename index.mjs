// Import the AWS SDK in ES module format
import AWS from 'aws-sdk';

// Create an instance of the S3 service
const s3 = new AWS.S3();

export const handler = async (event) => {
  try {
    // Fetch the list of S3 buckets
    const data = await s3.listBuckets().promise();

    // Return the list of buckets in the response
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Triggered from github actions. Successfully fetched S3 buckets.',
        buckets: data.Buckets,
      }),
    };
    return response;
  } catch (error) {
    console.error('Error fetching S3 buckets:', error);

    // Return an error response if something goes wrong
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error fetching S3 buckets.',
        error: error.message,
      }),
    };
    return response;
  }
};
