import { findByProps } from "@cumcord/modules/webpack";
import { addCommand } from "@cumcord/commands";

const { getUsers } = findByProps("getUsers");

let removeCommand;

export default {
  onLoad() {
    removeCommand = addCommand({
      name: "fakemsg",
      description: "Fakes a message from a user",
      args: [
        { name: "user", type: "user" },
        { name: "message", description: "The fake message to send" },
      ],
      handler({ args }, send) {
        const user = getUsers()[args.user];

        if (user) {
          send({ author: user, content: args.message, flags: 0 });
        }
      },
    });
  },
  onUnload() {
    removeCommand();
  },
};
