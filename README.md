# Oblig1
her blir alt som faktisk er i  oblig 1 lagt til
### Postman:

1. **Register Player:**
   - Method: POST -Pass på Header – Content-Type  og Value = application/json
   - URL: `http://localhost:3000/register`
   - Body (raw JSON):
     ```json
     {
       "playerName": "Player1"
     }
     ```
   - Send the request. You should get a response indicating successful registration.

2. **Get Next Player:**
   - Method: GET
   - URL: `http://localhost:3000/nextPlayer`
   - Send the request. You should get a response with the next registered player.

3. **List Mailboxes:**
   - Method: GET
   - URL: `http://localhost:3000/mailboxes`
   - Send the request. You should get a response listing mailboxes (initially empty).

4. **Send Message to Mailbox:**
   - Method: POST
   - URL: `http://localhost:3000/mailboxes/1/messages` (assuming there is a mailbox with ID 1)
   - Body (raw JSON):
     ```json
     {
       "message": "Hello, this is a test message."
     }
     ```
   - Send the request. You should get a response indicating the message was sent.

5. **List Messages in Mailbox:**
   - Method: GET
   - URL: `http://localhost:3000/mailboxes/1/messages` (assuming there is a mailbox with ID 1)
   - Send the request. You should get a response listing messages in the specified mailbox.

6. **Delete Message in Mailbox:**
   - Method: DELETE
   - URL: `http://localhost:3000/mailboxes/1/messages/0` (assuming there is a mailbox with ID 1 and a message at index 0)
   - Send the request. You should get a response indicating the message was deleted.

7. **List Contacts:**
   - Method: GET
   - URL: `http://localhost:3000/contacts`
   - Send the request. You should get a response listing contacts (initially empty).

8. **Add Contact:**
   - Method: POST
   - URL: `http://localhost:3000/contacts`
   - Body (raw JSON):
     ```json
     {
       "contact": "John Doe"
     }
     ```
