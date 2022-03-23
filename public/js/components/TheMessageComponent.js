export default{
    props:['msg','socketid'],

    template:
    `
    <article class="new-message" :class="{'my-message' : matchedID}">
       <h3 class="hidden">This is a message</h3>
       <h4 class="message-name">{{msg.message.name}}: </h4>
       <p class="message-content">{{msg.message.content}}</p>
       <h5 class="message-time">{{msg.message.time}}</h5>
    </article>
    `,

    data: function(){
        return{
            matchedID: this.socketid == this.msg.id // is it my message or somebody else message?
        }
    }
}