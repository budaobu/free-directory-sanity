import { UsersIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "user",
  title: "User",
  icon: UsersIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "id",
      title: "Id",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      date: "date",
    },
    prepare({ title, date }) {
      // can not show avatar
      const subtitles = [
        date && `${format(parseISO(date), "yyyy/MM/dd")}`,
      ].filter(Boolean);
      return { title, subtitle: subtitles.join(" ") };
    }
  },
});
