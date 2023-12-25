const userModel = require("./../model/user.model");

module.exports = async (data) => {
  try {
    let ans = [];
    let referralData = await userModel
      .find({ referralId: { $in: data } })
      .select({ _id: 0, referralId: 1 })
      .lean();

    referralData = referralData.map((e) => {
      return e.referralId;
    });
   
    ans = data.filter((i) => referralData.indexOf(i) === -1);
    return ans;
  } catch (err) {
    console.error(err);
  }
};
