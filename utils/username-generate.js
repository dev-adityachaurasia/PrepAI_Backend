import { User } from "../models/user-model.js";

const generateUsername = async (name, email) => {
  let baseUsername;

  if (name && name.trim() !== "") {
    baseUsername = name.toLowerCase().replace(/\s+/g, ""); // Spaces remove
  } else {
    baseUsername = email.split("@")[0]; // Email ka username part le lo
  }

  let username = baseUsername;
  let count = 1;

  // Jab tak username unique nahi milta, number add karte raho
  while (await User.findOne({ username })) {
    username = `${baseUsername}${count}`;
    count++;
  }

  return username;
};

export default generateUsername;
