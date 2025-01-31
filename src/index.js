require("dotenv").config();
const { App } = require("@slack/bolt");
const data = require("./data");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

/* Add functionality here */

(async () => {
  app.action("drop_down", async (par) => {
    par.ack();
    const chosenOne = par.body.actions[0].selected_option.value;
    const item = data.find((item) => item.item === chosenOne);
    if (item) {
      par.respond({
        response_type: "ephemeral",
        text: `The estimated customs for ${item.emoji ?? ""}${item.item} is \`${
          item.estimated_customs
        }\``,
      });
    } else {
      par.respond({
        response_type: "ephemeral",
        text: "Invalid option",
      });
    }
  });
  app.command("/indcustoms", async ({ ack, body, respond }) => {
    ack();
    try {
      // prompt a select menu for the user to choose
      await respond({
        user: body.user_id,
        response_type: "ephemeral",
        channel: body.channel_id,
        text: "Please select an item to see the prices for",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Please select an item to see the prices for",
            },
            accessory: {
              type: "static_select",
              placeholder: {
                type: "plain_text",
                text: "Select an item",
              },
              options: data.map((item) => ({
                text: {
                  type: "plain_text",
                  text: `${item.emoji ?? ""}${item.item}`,
                },
                value: item.item,
              })),
              action_id: "drop_down",
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  });
  // Start the app
  await app.start(process.env.PORT || process.env.SERVER_PORT || 3000);

  console.log(
    `⚡️ Bolt app is running on ${
      process.env.PORT || process.env.SERVER_PORT || 3000
    }!`,
  );
})();
