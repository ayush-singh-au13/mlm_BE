const cron = require("node-cron");
const { getUserData, getRobotIncome,getIdleUsers } = require("./middleware/index");
const userModel = require("./model/user.model");
const moment = require("moment");

exports.robotIncomeSponsers = async (req, res) => {
  try {
    cron.schedule("0 1 * * *", async () => {
      console.log(
        "\x1b[93m CRON TO UPDATE ROBOT INCOME IN DB | CRON START \x1b[0m"
      );
      const userData = await getUserData();

      let robotIncome = await getRobotIncome(userData);
     
      for (let i = 0; i < robotIncome.length; i++) {
        let income = robotIncome[i]["total"];
        let member_Id = robotIncome[i]["memberId"];
        income = income * 0.1;
        if (income > 0) {
          await userModel.findOneAndUpdate(
            { memberId: member_Id },
            { $set: { robotIncome: income } }
          );
        }
      }

      console.log("\x1b[93m ROBOT INCOME IS UPDATED || CRON JOB \x1b[0m");
    });
  } catch (err) {
    console.error(err);
  }
};
exports.dividendIncomeUsers = async (req, res) => {

  try {
    cron.schedule("*/10 * * * * *", async () => {
      console.log(
        "\x1b[93m CRON TO UPDATE ROBOT INCOME IN DB | CRON START \x1b[0m"
      );
      const userData = await getUserData();

      // get all the users who have not joined anyone yet in their downline
      const idleUsers = await getIdleUsers(userData);

      let startDate = endDate = moment();
      console.log(startDate, endDate);

      console.log("\x1b[93m DIVIDEND INCOME IS UPDATED || CRON JOB \x1b[0m");
    });
  } catch (err) {
    console.error(err);
  }
};
