const redis = require('redis')
const client = redis.createClient()

const main = async () => {
  try {
    client.on('error', (err) => console.error('Client error:', err.message))
    await client.connect()

    await client.set('user_name', 'chsdwn')

    const userName = await client.get('user_name')
    console.log('[userName]:', userName)

    await client.del('user_name')
    await client.del('name')

    const isUserNameExists = await client.exists('user_name')
    console.log('[isUserNameExists]:', !!isUserNameExists)

    await client.append('name', 'chs')
    await client.append('name', 'dwn')
    const name = await client.get('name')
    console.log('[name]:', name)

    const subscriber = client.duplicate()
    await subscriber.connect()
    await subscriber.subscribe('channel', (message) => {
      console.log('Subscribed message:', message)
    })
  } catch (err) {
    console.error(err.message)
  }
}
main()
