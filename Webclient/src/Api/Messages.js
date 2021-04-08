
export default class MessageLogic {
    static async sendMessage(obj) {
        const resp = await fetch("https://tudoresan.herokuapp.com/mail/sendMail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(obj),
        });
        return resp;
    }
}