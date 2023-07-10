import User from "../../models/User";
import Constants from "../config/constants";

export default {
    /**
     * lookup in aggregate for user
     * @param {String} localField field name in your schema
     * @param {String} asField field name after lookup
     * @returns {Array} population arguments
     */
    lookupUser: (localField, asField) => [
        {
            $lookup: {
                from: User.collection.name,
                localField: localField,
                foreignField: "_id",
                as: asField,
                pipeline: [{ $project: Constants.userSelect }],
            },
        },
        { $unwind: { path: `$${asField}`, preserveNullAndEmptyArrays: true } }
    ],

    /**
     * count paragraph comments
     */
    get countComments() {
        return {
            $addFields: {
                commentsCount: {
                    $size: { $ifNull: [`$comments`, []], }
                },
            }
        }
    },

    /**
     * apply pagination on paragraph comments
     * @param {Number} count count of comment in list
     * @param {Number} skip page number
     * @returns {Array} pagination arguments
     */
    limitComments: (count = 1, skip) => [
        {
            $set: {
                comments: {
                    $sortArray: { input: "$comments", sortBy: { createdAt: -1 } }
                }
            }
        },
        {
            $set: {
                comments: {
                    $slice: ["$comments", Number(skip || 0), Number(count)],
                }
            }
        },
    ]
}