const db = require('../models/');
const {
    PubSub
} = require('apollo-server');
const pubsub = new PubSub();

//削除＆更新の際のデータ更新
const EVENT = {
    FAVORITE_CREATE: 'favCreated',
    FAVORITE_DELETE: 'favDeleted',
};

const resolvers = {
    Query: {
        // 複数件検索（簡単のため全件検索としている）
        favorites: (parent, args, context, info) => {
            // Sequelizeのモデルを使ってデータを取得する
            return db.Favorite.findAll().then(favorite => {
                if (!favorite) console.log("データを取得できませんでした");
                else return favorite;
            });
        }
    },
    Mutation: {
        createFav: (parent, {
            name,
            openGraphImageUrl,
            stargazers,
            url
        }, context, info) => {
            const newFav = {
                name,
                openGraphImageUrl,
                stargazers,
                url
            };
            db.Favorite.create(newFav);
            pubsub.publish(EVENT.FAVORITE_CREATE, {
                [EVENT.FAVORITE_CREATE]: newFav
            });
            return newFav;
        },
        deleteFav: async (parent, {
            id
        }, context, info) => {
            let deletedFav;
            await db.Favorite.findOne({
                where: {
                    id: id
                }
            }).then((favorite) => {
                deletedFav = favorite.dataValues;
                delete deletedFav.createdAt;
                delete deletedFav.updatedAt;
                if (favorite) favorite.destroy();
                else console.error('Favorite not found')
            }).catch(console.log);
            pubsub.publish(EVENT.FAVORITE_DELETE, {
                [EVENT.FAVORITE_DELETE]: deletedFav
            });
            return deletedFav;
        }
    },
    Subscription: {
        [EVENT.FAVORITE_CREATE]: {
            subscribe: () => pubsub.asyncIterator([EVENT.FAVORITE_CREATE])
        },
        [EVENT.FAVORITE_DELETE]: {
            subscribe: () => pubsub.asyncIterator([EVENT.FAVORITE_DELETE])
        },
    }
};

module.exports = resolvers;