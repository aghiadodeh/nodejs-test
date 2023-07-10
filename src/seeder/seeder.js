import fs from 'fs';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Paragraph from '../models/Paragraph';
import mongoose from 'mongoose';

export default {
    runSeeder: async () => {
        await insertUsers();
        await insertParagraphs();
    }
}

async function insertUsers() {
    const count = await User.count();
    if (count != 0) return;
    const file = fs.readFileSync('./data/users.json');
    const users = JSON.parse(file);
    const salt = await bcrypt.genSalt();
    users.forEach(user => {
        user.password = bcrypt.hashSync(user.password, salt);
        user.image = {
            filePath: user.image,
            fileName: "profile_image.png",
            fileSizeInBytes: 1024,
            mimetype: "image/png",
            originalName: "originalname.png",
        }
    });
    await User.insertMany(users);
}

async function insertParagraphs() {
    const count = await Paragraph.count();
    if (count != 0) return;
    const users = await User.find({});
    const paragraphsFile = fs.readFileSync('./data/paragraphs.json');
    const commentsFile = fs.readFileSync('./data/comments.json');

    const comments = JSON.parse(commentsFile);

    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const paragraphs = JSON.parse(paragraphsFile);
        paragraphs.forEach(paragraph => {
            paragraph.user = user._id;
            paragraph.comments = comments.map(comment => {
                return {
                    _id: mongoose.Types.ObjectId(),
                    user: user._id,
                    comment: comment.comment,
                }
            });
            paragraph.attachments = paragraph.attachments.map(attachment => {
                return {
                    filePath: attachment,
                    fileName: "profile_image.png",
                    fileSizeInBytes: 1024,
                    mimetype: "image/png",
                    originalName: "originalname.png",
                };
            });
        });

        await Paragraph.insertMany(paragraphs);
    }
}