
const messageRoute = 'http://localhost:8000/messages'
export const sendMessage = async (message) => {
    const { name, email, subject, body } = message;
    const resp = await fetch(messageRoute, { 
      
        // Adding method type 
        method: "POST", 
          
        // Adding body or contents to send 
        body: JSON.stringify(message), 
        
        // Adding headers to the request 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
}

