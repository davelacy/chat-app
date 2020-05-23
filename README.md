# Chat App
- NodeJS + Express + Websockets + React

### How to install and run
1. clone repo
2. `cd chat-app`
3. `yarn` or `npm install`
4. `yarn build` or `npm run build`
5. `serve -s build` or `npm run build`
6. Click the link to open the app [http://localhost:5000](http://localhost:5000) 
7. Open in another browser window to create another user and exchange messages

### Notes
- I spent a good bit of time on the look / design trying to get something that feels familiar (like Mac Messenger). I found a design close to what I had in mind on Codepen.io and made customizations to that.
- This app could of course use some more refactoring given more time. It could make use of bootstrap react components more too.
- This app needs more tests. Ideally, test coverage would be >90%. Tests are very important for any application but this isn't going to production and time is a factor. I spent som etime on testing websockets as well but admittedly ran into some issues