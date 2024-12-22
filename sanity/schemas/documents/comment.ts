import { CommentIcon } from "@sanity/icons";
import { defineType } from "sanity";

// for demo
export const comment = defineType({
  name: "comment",
  title: "Comment",
  icon: CommentIcon,
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      // readOnly: true,
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      // readOnly: true,
    },
    {
      name: "comment",
      title: "Comment",
      type: "text",
      // readOnly: true,
    },
    {
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "product" }],
    }
  ],
 })