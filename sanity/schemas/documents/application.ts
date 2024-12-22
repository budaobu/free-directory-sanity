import { ColorWheelIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "application",
  title: "Application",
  icon: ColorWheelIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
    }),
    defineField({
      name: "types",
      title: "Types",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "appType" }],
        }
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: 'reviewing',
      options: {
        list: ['reviewing', 'rejected', 'approved'],
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
          'rejected: please upload a better logo image',
          'rejected: please upload a better cover image',
          'rejected: this indie app seems not ready?',
          'rejected: only support self-built indie app',
        ],
      }
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "cover",
      title: "Cover Image",
      type: "image",
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
      date: "date",
      media: "image",
    },
    prepare({ title, author, date, media }) {
      const subtitles = [
        author && `${author}`,
        date && `${format(parseISO(date), "yyyy/MM/dd")}`,
      ].filter(Boolean);
      return { title, media, subtitle: subtitles.join(" ") };
    },
  },
});
