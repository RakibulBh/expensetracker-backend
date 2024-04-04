const {User} = require('../models/User.js');


/* Read */

const getUser = async (req, res) => {

    const {id} = req.params;

    const user = await User.findOne({id});

    if (!user) return res.status(400).json({message: 'User not found'});

    return res.status(200).json(user);

}


/* Update */

const updateUser = async (req, res) => {
    const { id } = req.params;
    const newData = req.body; 

    try {
        const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating User' });
    }
}

/* Delete */


const deleteUser = async (req, res) => {

    const {id} = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete({id});
    } catch {
        return res.status(400).json({message: 'Error deleting user.'});
    }

    res.status(200).json(deletedUser);


}

module.exports = {
    getUser,
    updateUser,
    deleteUser
}