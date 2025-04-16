import User from "../models/userModel";

export default class UserController {
    constructor() {
    }

    async createUser(req: any, res: any) {
        try {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone,
                creator: req.body.creator
            });
            await user.save();
            res.status(201).json(user);
        }catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUser(req: any, res: any) {
        const { id } = req.params;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUsers(req: any, res: any) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: any, res: any) {
        const { id } = req.params;
        let user; 
        user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const updatedUser = {user, ...req.body}
        user = updatedUser;

        try {   
            await user.save();
            res.status(200).json(user);
        }
        catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    deleteuser = async (req: any, res: any) => {
        const {id} = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User deleted successfully" });
        }catch (error: any) {
            res.status(500).json({ message: error.message });
        }

    }
}