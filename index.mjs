import { S3 } from 'aws-sdk';
const s3 = new S3();
const BUCKET_NAME = 'unstyle-json';
const OBJECT_KEY = 'db.json';
export async function handler(event) {
    try {
        const data = await s3.getObject({
            Bucket: BUCKET_NAME,
            Key: OBJECT_KEY
        }).promise();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: data.Body?.toString('utf-8') || ''
        };
    }
    catch (error) {
        console.error('S3 error:', error);
        return {
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Failed to retrieve data' })
        };
    }
}
//# sourceMappingURL=index.mjs.map