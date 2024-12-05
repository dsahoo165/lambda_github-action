import AWS from 'aws-sdk';  // Using import instead of require
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    const params = {
        TableName: 'UsersTable', // Replace with your table name
        Item: {
            userId: '12345', // Example userId
            name: 'John Doe',
            email: 'johndoe@example.com'
        }
    };
    
    try {
        await dynamoDB.put(params).promise();
        console.log('Record inserted successfully');
        return {
            statusCode: 200,
            body: JSON.stringify('Record inserted successfully'),
        };
    } catch (error) {
        console.error('Error inserting record: ', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error inserting record'),
        };
    }
};
