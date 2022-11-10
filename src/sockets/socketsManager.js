const conversationMessageController = require('../controllers/ConversationMessageController');
const channelMessageController = require('../controllers/ChannelMessageController');

const prefix = {
    channel: 'channel_',
    conversation: 'conversation_',
};

const socketManager = (io) => {
    io.on('connection', function (socket) {
        //config base socket
        console.log(socket.handshake.query);

        if (socket.handshake.query.idConversation != null) {
            console.log('Connected to conversation: ' + socket.handshake.query.idConversation);
            socket.join(prefix.conversation + socket.handshake.query.idConversation);
        }
        if (socket.handshake.query.idChannel != null) {
            console.log('Connected to conversation: ' + socket.handshake.query.idChannel);
            socket.join(prefix.channel + socket.handshake.query.idChannel);
        }

        console.log(`Socket ${socket.id} joined!`);

        socket.on('ping_ne', function () {
            console.log('Pong! from server.');
            io.to(prefix.conversation + socket.handshake.query.idConversation).emit(
                'ping_receiver',
                { 'Pong!': 'hello' },
            );
        });

        //* EVENT DISCONNECT */
        socket.on('disconnect', function () {
            console.log(socket.id, 'disconnected.');
            socket.leave(prefix.conversation + socket.handshake.query.idConversation);
        });

        //* MESSAGE CONVERSATION */
        socket.on('message:conversation:send', function (payload) {
            var conversationMessageContent = payload.conversationMessageContent;
            var conversationMessageConversationId = payload.conversationMessageConversationId;
            var conversationMessageSenderId = payload.conversationMessageSenderId;
            var conversationMessageTimeSend = payload.conversationMessageTimeSend;
            //controller save to database
            conversationMessageController.postMessageConversation(
                conversationMessageContent,
                conversationMessageTimeSend,
                conversationMessageConversationId,
                conversationMessageSenderId,
            );
            //emit to client
            io.to(prefix.conversation + idConversation).emit('message:conversation:receive', {
                conversationMessageContent,
                conversationMessageConversationId,
                conversationMessageSenderId,
                conversationMessageTimeSend,
            });
        });
        socket.on('message:channel:send', function (payload) {
            var channelMessageContent = payload.channelMessageContent;
            var channelMessageTimeSend = payload.channelMessageTimeSend;
            var channelMessageChannelId = payload.channelMessageChannelId;
            var channelMessageSenderId = payload.channelMessageSenderId;
            channelMessageController.postMessageChannel(
                channelMessageContent,
                channelMessageTimeSend,
                channelMessageChannelId,
                channelMessageSenderId,
            );
            io.to(prefix.channel + idChannel).emit('message:channel:receive', {
                channelMessageContent,
                channelMessageTimeSend,
                channelMessageChannelId,
                channelMessageSenderId,
            });
        });
    });
};

module.exports = socketManager;
