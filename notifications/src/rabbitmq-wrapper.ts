import amqplib, { Connection, Options, Channel } from 'amqplib'

// singleton class
class RabbitWrapper {
    private _consumerConnection?: Connection

    //geter

    get consumerConnection() {
        if (!this._consumerConnection) {
            throw new Error('Cannot access rabbitmq connection before connecting')
        }
        return this._consumerConnection
    }

    async createConnection(url: string | Options.Connect, socketOptions?: any) {
        this._consumerConnection = await amqplib.connect(url, socketOptions)

        console.log('[AMQP] connected')
    }

    async cancelConnection() {
        this._consumerConnection?.close()
    }
}

export const rabbitWrapper = new RabbitWrapper() // singleton class only return one instance
