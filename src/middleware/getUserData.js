const userModel = require("./../model/user.model");
module.exports = async () => {
  try {
    const users = await userModel
      .find({ memberId: { $ne: "100000" },balance:{$lt:200} })
      .select({ memberId: 1, _id: 0 })
      .lean();
    let userData = users.map((e) => {
      return e.memberId
    })
    return userData;
  } catch (err) {
    console.error(err);
  }
};
