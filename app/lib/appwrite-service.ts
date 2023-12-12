import {
  Account,
  Client,
  ID,
  Databases, 
  Permission, 
  Role
} from "appwrite";
// import { useUserStore } from "./userStore";

	const client = new Client();
	export const databases = new Databases(client);

	client
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject('65267cb88de1f9a522e7');

//const promise = databases.getDocument('652e39e4abfb8d628d46', '652e39f5db250173e640', '652e73a29c2cf2d06735');

export const appwrite = {
  client,
  account: new Account(client),
  ID,
};
