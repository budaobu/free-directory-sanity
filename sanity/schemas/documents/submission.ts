import { DiamondIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "submission",
  title: "Submission",
  icon: DiamondIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: 'reviewing',
      options: {
        list: [ 'reviewing', 'rejected', 'approved' ],
        layout: 'radio' // <-- defaults to 'dropdown'
      }
    }),
    defineField({
      name: "reason",
      title: "Reason",
      type: "string",
      hidden: ({ parent }) => parent?.status !== 'rejected',
      options: {
        list: [ 
          'rejected: this product is not for indie hackers',
        ],
      }
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
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
      author: "user.name",
      status: "status",
      date: "date",
    },
    prepare({ title, author, status, date }) {
      const subtitles = [
        author && `${author}`,
        status && `${status}`,
        date && `${format(parseISO(date), "yyyy/MM/dd")}`,
      ].filter(Boolean);
      return { title, subtitle: subtitles.join(" ") };
    },
  },
});
