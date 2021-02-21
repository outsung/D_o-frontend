import socketio from 'socket.io-client';
import callCookie from './cookie';

export default {
  connect: () =>
    socketio.connect(
      `${process.env.REACT_APP_API_URL?.replace(
        '/api/',
        '',
      )}?auth=${callCookie.get('jwt')}`,
    ),
  disconnect: (socket: SocketIOClient.Socket) => socket.disconnect(),
};
