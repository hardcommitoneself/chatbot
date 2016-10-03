'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _userToMessagesMap = {};

function _saveMessageToLocalChat(recipientID, messageData, fromUser) {
  if (!(recipientID in _userToMessagesMap)) {
    _userToMessagesMap[recipientID] = [];
  }
  // store a special flag to determine the source of message
  messageData.fromUser = fromUser;
  _userToMessagesMap[recipientID].push(messageData);
}

var ChatUtils = {
  send: function send(recipientID, token, messageData, useLocalChat) {
    // Use the local chat interface instead of making GraphAPI call
    if (useLocalChat) {
      _saveMessageToLocalChat(recipientID, messageData, false /* fromUser */);
      return;
    }

    return (0, _requestPromise2.default)({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: token },
      method: 'POST',
      body: {
        recipient: { id: recipientID },
        message: messageData
      },
      json: true
    }, function (err, response) {
      if (err) {
        // TODO
      } else if (response.body.error) {
        // TODO
      }
    });
  },
  getLocalChatMessages: function getLocalChatMessages() {
    return _userToMessagesMap;
  },
  clearLocalChatMessages: function clearLocalChatMessages() {
    _userToMessagesMap = {};
  },
  saveSenderMessageToLocalChat: function saveSenderMessageToLocalChat(senderID, text) {
    _saveMessageToLocalChat(senderID, { text: text }, true /* fromUser */);
  }
};

module.exports = ChatUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DaGF0VXRpbHMuanMiXSwibmFtZXMiOlsiX3VzZXJUb01lc3NhZ2VzTWFwIiwiX3NhdmVNZXNzYWdlVG9Mb2NhbENoYXQiLCJyZWNpcGllbnRJRCIsIm1lc3NhZ2VEYXRhIiwiZnJvbVVzZXIiLCJwdXNoIiwiQ2hhdFV0aWxzIiwic2VuZCIsInRva2VuIiwidXNlTG9jYWxDaGF0IiwidXJpIiwicXMiLCJhY2Nlc3NfdG9rZW4iLCJtZXRob2QiLCJib2R5IiwicmVjaXBpZW50IiwiaWQiLCJtZXNzYWdlIiwianNvbiIsImVyciIsInJlc3BvbnNlIiwiZXJyb3IiLCJnZXRMb2NhbENoYXRNZXNzYWdlcyIsImNsZWFyTG9jYWxDaGF0TWVzc2FnZXMiLCJzYXZlU2VuZGVyTWVzc2FnZVRvTG9jYWxDaGF0Iiwic2VuZGVySUQiLCJ0ZXh0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBRUE7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEscUJBQXFCLEVBQXpCOztBQUVBLFNBQVNDLHVCQUFULENBQ0VDLFdBREYsRUFFRUMsV0FGRixFQUdFQyxRQUhGLEVBSVE7QUFDTixNQUFJLEVBQUVGLGVBQWVGLGtCQUFqQixDQUFKLEVBQTBDO0FBQ3hDQSx1QkFBbUJFLFdBQW5CLElBQWtDLEVBQWxDO0FBQ0Q7QUFDRDtBQUNBQyxjQUFZQyxRQUFaLEdBQXVCQSxRQUF2QjtBQUNBSixxQkFBbUJFLFdBQW5CLEVBQWdDRyxJQUFoQyxDQUFxQ0YsV0FBckM7QUFDRDs7QUFFRCxJQUFNRyxZQUFZO0FBQ2hCQyxNQURnQixnQkFFZEwsV0FGYyxFQUdkTSxLQUhjLEVBSWRMLFdBSmMsRUFLZE0sWUFMYyxFQU1MO0FBQ1Q7QUFDQSxRQUFJQSxZQUFKLEVBQWtCO0FBQ2hCUiw4QkFBd0JDLFdBQXhCLEVBQXFDQyxXQUFyQyxFQUFrRCxLQUFsRCxDQUF3RCxjQUF4RDtBQUNBO0FBQ0Q7O0FBRUQsV0FBTyw4QkFBRztBQUNSTyxXQUFLLDZDQURHO0FBRVJDLFVBQUksRUFBQ0MsY0FBYUosS0FBZCxFQUZJO0FBR1JLLGNBQVEsTUFIQTtBQUlSQyxZQUFNO0FBQ0pDLG1CQUFXLEVBQUNDLElBQUlkLFdBQUwsRUFEUDtBQUVKZSxpQkFBU2Q7QUFGTCxPQUpFO0FBUVJlLFlBQU07QUFSRSxLQUFILEVBU0osVUFBU0MsR0FBVCxFQUFjQyxRQUFkLEVBQXdCO0FBQ3pCLFVBQUlELEdBQUosRUFBUztBQUNQO0FBQ0QsT0FGRCxNQUVPLElBQUlDLFNBQVNOLElBQVQsQ0FBY08sS0FBbEIsRUFBeUI7QUFDOUI7QUFDRDtBQUNGLEtBZk0sQ0FBUDtBQWdCRCxHQTdCZTtBQStCaEJDLHNCQS9CZ0Isa0NBK0JlO0FBQzdCLFdBQU90QixrQkFBUDtBQUNELEdBakNlO0FBbUNoQnVCLHdCQW5DZ0Isb0NBbUNlO0FBQzdCdkIseUJBQXFCLEVBQXJCO0FBQ0QsR0FyQ2U7QUF1Q2hCd0IsOEJBdkNnQix3Q0F1Q2FDLFFBdkNiLEVBdUMrQkMsSUF2Qy9CLEVBdUNtRDtBQUNqRXpCLDRCQUF3QndCLFFBQXhCLEVBQWtDLEVBQUNDLE1BQU1BLElBQVAsRUFBbEMsRUFBZ0QsSUFBaEQsQ0FBcUQsY0FBckQ7QUFDRDtBQXpDZSxDQUFsQjs7QUE0Q0FDLE9BQU9DLE9BQVAsR0FBaUJ0QixTQUFqQiIsImZpbGUiOiJDaGF0VXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBycCBmcm9tICdyZXF1ZXN0LXByb21pc2UnO1xuXG5sZXQgX3VzZXJUb01lc3NhZ2VzTWFwID0ge307XG5cbmZ1bmN0aW9uIF9zYXZlTWVzc2FnZVRvTG9jYWxDaGF0KFxuICByZWNpcGllbnRJRDogc3RyaW5nLFxuICBtZXNzYWdlRGF0YTogT2JqZWN0LFxuICBmcm9tVXNlcjogYm9vbGVhbixcbik6IHZvaWQge1xuICBpZiAoIShyZWNpcGllbnRJRCBpbiBfdXNlclRvTWVzc2FnZXNNYXApKSB7XG4gICAgX3VzZXJUb01lc3NhZ2VzTWFwW3JlY2lwaWVudElEXSA9IFtdO1xuICB9XG4gIC8vIHN0b3JlIGEgc3BlY2lhbCBmbGFnIHRvIGRldGVybWluZSB0aGUgc291cmNlIG9mIG1lc3NhZ2VcbiAgbWVzc2FnZURhdGEuZnJvbVVzZXIgPSBmcm9tVXNlcjtcbiAgX3VzZXJUb01lc3NhZ2VzTWFwW3JlY2lwaWVudElEXS5wdXNoKG1lc3NhZ2VEYXRhKTtcbn1cblxuY29uc3QgQ2hhdFV0aWxzID0ge1xuICBzZW5kKFxuICAgIHJlY2lwaWVudElEOiBzdHJpbmcsXG4gICAgdG9rZW46IHN0cmluZyxcbiAgICBtZXNzYWdlRGF0YTogT2JqZWN0LFxuICAgIHVzZUxvY2FsQ2hhdDogYm9vbGVhbixcbiAgKTogUHJvbWlzZSB7XG4gICAgLy8gVXNlIHRoZSBsb2NhbCBjaGF0IGludGVyZmFjZSBpbnN0ZWFkIG9mIG1ha2luZyBHcmFwaEFQSSBjYWxsXG4gICAgaWYgKHVzZUxvY2FsQ2hhdCkge1xuICAgICAgX3NhdmVNZXNzYWdlVG9Mb2NhbENoYXQocmVjaXBpZW50SUQsIG1lc3NhZ2VEYXRhLCBmYWxzZSAvKiBmcm9tVXNlciAqLyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHJwKHtcbiAgICAgIHVyaTogJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjYvbWUvbWVzc2FnZXMnLFxuICAgICAgcXM6IHthY2Nlc3NfdG9rZW46dG9rZW59LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiB7XG4gICAgICAgIHJlY2lwaWVudDoge2lkOiByZWNpcGllbnRJRH0sXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VEYXRhLFxuICAgICAgfSxcbiAgICAgIGpzb246IHRydWUsXG4gICAgfSwgZnVuY3Rpb24oZXJyLCByZXNwb25zZSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICAvLyBUT0RPXG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLmJvZHkuZXJyb3IpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGdldExvY2FsQ2hhdE1lc3NhZ2VzKCk6IE9iamVjdCB7XG4gICAgcmV0dXJuIF91c2VyVG9NZXNzYWdlc01hcDtcbiAgfSxcblxuICBjbGVhckxvY2FsQ2hhdE1lc3NhZ2VzKCk6IHZvaWQge1xuICAgIF91c2VyVG9NZXNzYWdlc01hcCA9IHt9O1xuICB9LFxuXG4gIHNhdmVTZW5kZXJNZXNzYWdlVG9Mb2NhbENoYXQoc2VuZGVySUQ6IHN0cmluZywgdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgX3NhdmVNZXNzYWdlVG9Mb2NhbENoYXQoc2VuZGVySUQsIHt0ZXh0OiB0ZXh0fSwgdHJ1ZSAvKiBmcm9tVXNlciAqLyk7XG4gIH0sXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXRVdGlscztcbiJdfQ==