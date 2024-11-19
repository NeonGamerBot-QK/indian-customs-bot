require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

/* Add functionality here */

(async () => {
  app.action("drop_down", async (par) => {
    par.ack();
    console.debug(par.body.actions[0].selected_option, "#dropdown");
    const chosenOne = par.body.actions[0].selected_option.value;
    switch (chosenOne) {
      case "item_1":
        par.respond({
          response_type: "ephemeral",
          text: "Item 1 prices",
        });
        break;
      case "item_2":
        par.respond({
          response_type: "ephemeral",
          text: "Item 2 prices",
        });
        break;
      case "item_3":
        par.respond({
          response_type: "ephemeral",
          text: "Item 3 prices",
        });
        break;
      default:
        par.respond({
          response_type: "ephemeral",
          text: "Invalid option",
        });
        break;
    }
  });
  app.command("/customs", async ({ ack, body, client, respond }) => {
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
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "Item 1",
                  },
                  value: "item_1",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Item 2",
                  },
                  value: "item_2",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Item 3",
                  },
                  value: "item_3",
                },
              ],
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
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
