export { default } from "@thunder-pos/api/src/vercel";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};
