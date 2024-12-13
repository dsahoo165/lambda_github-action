import AWS from 'aws-sdk';  // Using import instead of require
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
    // Extract parameters from the event or use environment variables as a fallback
    const tableName = process.env.TABLE_NAME || event.tableName;
    const userId = event.userId;
    const name = event.name;
    const email = event.email;

    if (!tableName || !userId || !name || !email) {
        return {
            statusCode: 400,
            body: JSON.stringify('Missing required parameters'),
        };
    }

    const params = {
        TableName: tableName,
        Item: {
            userId: userId,
            name: name,
            email: email,
        },
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
