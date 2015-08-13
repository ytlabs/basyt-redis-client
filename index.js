var redis = require('redis');

module.exports = {
    createClient: function(){
        var pubSubClient = redis.createClient();
        var queueingClient = redis.createClient();
        var client = {
            publish: function(channel, obj){
                return pubSubClient.publish(channel, JSON.stringify(obj), function(err, data){
                    if(err) throw err;
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
                pubSubClient.on('message', function(channel, data){
                    callback(channel, JSON.parse(data));
                });
                pubSubClient.on('pmessage', function(pattern, channel, data){
                    callback(channel, JSON.parse(data), pattern);
                });
            },
            push: function(queue, data) {
                return queueingClient.rpush(queue,JSON.stringify(data));
            },
            onceQueue: function(queue, callback) {
                return queueingClient.blpop(queue,0, function(err, data){
                    if(!err) callback(JSON.parse(data[1]));
                });
            },
            onQueue: function(queue, callback) {
                return queueingClient.blpop(queue,0, function(err, data){
                    if(!err) {
                        callback(JSON.parse(data[1]));
                        client.onQueue(queue, callback);
                    }
                });
            },
            quit: function(){
                pubSubClient.quit();
                queueingClient.quit();
            },
            getPubSubClient: function() {
                return pubSubClient
            },
            getQueueingClient: function() {
                return pubSubClient
            }
        };
        return client;
    }
};
