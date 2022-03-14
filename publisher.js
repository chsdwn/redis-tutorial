const redis = require('redis')
const client = redis.createClient()

const message = process.argv[2] || 'Lorem ipsum'

const main = async () => {
  try {
    client.on('error', (err) => console.error('Client error:', err.message))
    await client.connect()

    await client.publish('channel', message)
  } catch (err) {
    console.error(err.message)
  }
}
main()
