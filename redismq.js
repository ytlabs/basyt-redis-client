var redis = require('redis');

module.exports = {
    createClient: function(){
        var pubSubClient = redis.createClient();
        var queueingClient = redis.createClient();
        return {
            publish: function(channel, obj){
                return pubSubClient.publish(channel, JSON.stringify(obj), function(err, data){
                    if(err) console.log(err);
                });
            },
            subscribe: function(channel) {
                return pubSubClient.subscribe(channel);
            },
            psubscribe: function(channel) {
                return pubSubClient.psubscribe(channel);
            },
            unsubscribe: function(channel) {
                return pubSubClient.unsubscribe(channel);
            },
            onMessage: function(callback) {
                return pubSubClient.on('message', function(channel, data){
                    callback(channel, JSON.parse(data));
                })
                return pubSubClient.on('pmessage', function(pattern, channel, data){
                    callback(channel, JSON.parse(data));
                })
            },
            push: function(queue, data) {
                return queueingClient.rpush(queue,JSON.stringify(data));
            },
            onQueue: function(queue, callback) {
                return queueingClient.blpop(queue,0, function(err, data){
                    if(!err) callback(JSON.parse(data[1]));
                });
            },
            quit: function(){
                pubSubClient.quit();
                queueingClient.quit();
            }
        }
    }
};