import amqplib, { Connection, Options, Channel } from 'amqplib'

// singleton class
class RabbitWrapper {
    private _puhlishConnection?: Connection // underscore and question mark => this prop might be undefinded for some  periods of time
    private _consumerConnection?: Connection

    // channel
    private _orderCreatedChannel?: Channel
    private _userUpdateChannel?: Channel

    //geter

    get consumerConnection() {
        if (!this._consumerConnection) {
            throw new Error('Cannot access rabbitmq connection before connecting')
        }
        return this._consumerConnection
    }

    get channels() {
        if (!this._orderCreatedChannel) {
            throw new Error('Cannot access rabbit channel before connecting')
        }
        if (!this._userUpdateChannel) {
            throw new Error('Cannot access rabbit channel before connecting')
        }
        return {
            orderCreatedChannel: this._orderCreatedChannel,
            orderUpdateChannel: this._userUpdateChannel,
        }
    }

    async createConnection(url: string | Options.Connect, socketOptions?: any) {
        this._puhlishConnection = await amqplib.connect(url, socketOptions)
        this._consumerConnection = await amqplib.connect(url, socketOptions)

        this._orderCreatedChannel = await this._puhlishConnection.createChannel()
        this._userUpdateChannel = await this._puhlishConnection.createChannel()

        console.log('[AMQP] connected')
    }

    async cancelConnection() {
        this._consumerConnection?.close()
        this._puhlishConnection?.close()
    }
}

export const rabbitWrapper = new RabbitWrapper() // singleton class only return one instance
