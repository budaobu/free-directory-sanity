import { ProjectsIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  icon: ProjectsIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: -1,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
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
      name: "visible",
      title: "Visible",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "string",
    }),
    defineField({
      name: "github",
      title: "Github",
      type: "string",
    }),
    defineField({
      name: "priceLink",
      title: "PriceLink",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      options: {
        list: [ 
          'Free',
          'Paid',
          'Free & Paid',
        ],
      }
    }),
    defineField({
      name: "source",
      title: "source",
      type: "string",
    }),
    defineField({
      name: "submitter",
      title: "Submitter",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "localizedString",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block"
        },
        {
          type: 'image'
        },
        {
          type: 'code'
        }
      ],
    }),
    // defineField({
    //   name: "content_zh",
    //   title: "Content_ZH",
    //   type: "array",
    //   of: [
    //     {
    //       type: "block"
    //     },
    //     {
    //       type: 'image'
    //     },
    //     {
    //       type: 'code'
    //     }
    //   ],
    // }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "guides",
      title: "Guides",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "guide" }],
        }
      ],
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
      media: "logo",
      order: "order",
      date: "date",
    },
    prepare({ title, media, order, date }) {
      const subtitles = [
        order && `order:${order}`,
        date && `${format(parseISO(date), "yyyy/MM/dd")}`,
      ].filter(Boolean);
      return { title, media, subtitle: subtitles.join(" ") };
    },
  },
});
