import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired');

    //load socket library and make a connection 
     const socket = io();
    

     //messager service event handling -> incoming from the manager
     function setUserId({sID, message}) {
        console.log('connected', sID, message);
        vm.socketID = sID;
     }
     

     function appendMessage(message){
         vm.messages.push(message);
     }
     
    
     const vm = new Vue({
         data:{//singular=send. plural=receive
            messages: [],//message income from server
            username: "",//username we type in 
            socketID: "",
            message: "",
            //datetime, typing and connection
            time:"",
            typing: false,
            connections:0,

          },

          created(){
            
            socket.on('typing', username => {
                this.typing = username;
            });
    
          
            socket.on('stopTyping', () => {
                this.typing = false;
            });

            socket.on('connections', socketID => {
                this.connections = socketID;
            });
           
        },
               //console.log("its alive!!!");
         
        watch: {
                message(value) {
                    value ? socket.emit('typing', this.username || "anonymous") : socket.emit('stopTyping')
                }
        },

          methods: {

            dispatchMessage() {
                const current = new Date();
                this.time = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate()+ ' ' + current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
                //debugger;
                socket.emit('chatmessage', {
                    sID: this.socketID,
                    content: this.message,
                    name: this.username || 'Anonymous',
                    time: this.time,
                }); // if this.nickName is not set, put "anonymous"
                this.message =null;//clear message after sent
            }
            
          

          },

          components: {
              newmessage: ChatMessage
          },


           
     }).$mount("#app");

     socket.addEventListener("connected", setUserId);
     socket.addEventListener('message', appendMessage);


})();