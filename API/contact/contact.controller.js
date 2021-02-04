const {Contact_list} = require ('../../db/models/')
const {User} = require ('../../db/models/')
const {Chat_session} = require('../../db/models/') 

const searchContacts = async (req, res) => {
    try{ 
        const user = await User.findByUsername(req.query.username)
        res.send({found:user.found, user:user.user})
    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }
}

const addContact = async (req, res) => {
    try{ 
        const chatSessionID = await createChatSession();
        const ownerID = req.body["ownerID"]
        const userContact = await User.findByUsername(req.body["contactName"]) 
        const contact = new Contact_list(
            {
                owner: ownerID,
                contact_id: userContact.user.id,
                chat_session_id: chatSessionID
            }
        )
        await contact.save()
        res.status(201).send(contact)
    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }
}
async function createChatSession() {
    const chatSession = new Chat_session()
    const currentChatSession = await chatSession.save()
    return currentChatSession.id
}

// const getMyChats = async (req, res) => {
// }



module.exports.searchContacts = searchContacts
module.exports.addContact = addContact
// module.exports.getMyChats = getMyChats