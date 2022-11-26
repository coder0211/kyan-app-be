const conversationMessageController = require('../controllers/ConversationMessageController');
const channelMessageController = require('../controllers/ChannelMessageController');
const schedule = require('node-schedule');
const moment = require('moment-timezone');
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
        if (socket.handshake.query.accountId != null) {
            console.log('Connected to accountId: ' + socket.handshake.query.accountId);
            socket.join(socket.handshake.query.accountId);
        }

        console.log(`Socket ${socket.id} joined!`);

        // Scheduling

        socket.on('create_task', function (task) {
            console.log(task);
            var date = moment(new Date(task.taskDueTimeGTE)).add(-30, 'm').toDate();

            const job = schedule.scheduleJob(
                date,
                function ({ accountId, taskTitle }) {
                    console.log(accountId);
                    socket
                        .to(accountId)
                        .emit('task-reminder', `The job ${taskTitle} will be end in 30 minutes`);
                }.bind(null, { accountId: task.taskAssignTo, taskTitle: task.taskSummary }),
            );
        });

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
            var attachmentUrl = payload.attachmentUrl;
            //controller save to database
            conversationMessageController.postMessageConversation(
                conversationMessageContent,
                conversationMessageTimeSend,
                conversationMessageConversationId,
                conversationMessageSenderId,
                attachmentUrl,
            );
            //emit to client
            io.to(prefix.conversation + socket.handshake.query.idConversation).emit(
                'message:conversation:receive',
                {
                    conversationMessageContent,
                    conversationMessageConversationId,
                    conversationMessageSenderId,
                    conversationMessageTimeSend,
                    attachmentUrl,
                },
            );
        });
        socket.on('message:channel:send', function (payload) {
            var channelMessageContent = payload.channelMessageContent;
            var channelMessageTimeSend = payload.channelMessageTimeSend;
            var channelMessageChannelId = payload.channelMessageChannelId;
            var channelMessageSenderId = payload.channelMessageSenderId;
            var attachmentUrl = payload.attachmentUrl;
            channelMessageController.postMessageChannel(
                channelMessageContent,
                channelMessageTimeSend,
                channelMessageChannelId,
                channelMessageSenderId,
                attachmentUrl,
            );
            io.to(prefix.channel + socket.handshake.query.idChannel).emit(
                'message:channel:receive',
                {
                    channelMessageContent,
                    channelMessageTimeSend,
                    channelMessageChannelId,
                    channelMessageSenderId,
                    attachmentUrl,
                },
            );
        });
    });
};

module.exports = socketManager;
