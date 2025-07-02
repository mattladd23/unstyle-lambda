import AWS from 'aws-sdk';
const s3 = new AWS.S3();
const BUCKET_NAME = 'unstyle-json';
const OBJECT_KEY = 'initialValues.json';
export const handler = async (event) => s3.getObject({ Bucket: BUCKET_NAME, Key: OBJECT_KEY }).promise()
    .then(res => {
    const json = JSON.parse(res.Body?.toString('utf-8') || '{}');
    const initialValues = json.initialValues ?? [];
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ initialValues })
    };
})
    .catch(error => {
    return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: `Failed to retrieve data: ${error}` })
    };
});
//# sourceMappingURL=index.mjs.map