import amqplib, { Connection, Options, Channel } from 'amqplib'

// singleton class
class RabbitWrapper {
    private _puhlishConnection?: Connection // underscore and question mark => this prop might be undefinded for some  periods of time
    private _consumerConnection?: Connection

    // channel
    private _shopCreateChannel?: Channel
    private _productCreatedChannel?: Channel
    private _productUpdatedChannel?: Channel

    //geter

    get consumerConnection() {
        if (!this._consumerConnection) {
            throw new Error('Cannot access rabbitmq connection before connecting')
        }
        return this._consumerConnection
    }

    get channels() {
        if (!this._shopCreateChannel) {
            throw new Error('Cannot access rabbit channel before connecting')
        }
        if (!this._productCreatedChannel) {
            throw new Error('Cannot access rabbit channel before connecting')
        }
        if (!this._productUpdatedChannel) {
            throw new Error('Cannot access rabbit channel before connecting')
        }
        return {
            shopCreateChannel: this._shopCreateChannel,
            productCreatedChannel: this._productCreatedChannel,
            productUpdatedChannel: this._productUpdatedChannel,
        }
    }

    async createConnection(url: string | Options.Connect, socketOptions?: any) {
        this._puhlishConnection = await amqplib.connect(url, socketOptions)
        this._consumerConnection = await amqplib.connect(url, socketOptions)

        this._shopCreateChannel = await this._puhlishConnection.createChannel()
        this._productCreatedChannel = await this._puhlishConnection.createChannel()
        this._productUpdatedChannel = await this._puhlishConnection.createChannel()

        console.log('[AMQP] connected')
    }

    async cancelConnection() {
        this._consumerConnection?.close()
        this._puhlishConnection?.close()
    }
}

export const rabbitWrapper = new RabbitWrapper() // singleton class only return one instance
