import { TiersIcon } from "@sanity/icons";
import { format, parseISO } from "date-fns";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  icon: TiersIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      // type: "string",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name.en",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "group",
      title: "Group",
      type: "reference",
      to: [{ type: "group" }],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: -1,
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
      title: "name.en",
      group: "group.name.en",
      order: "order",
      date: "date",
    },
    prepare({ title, group, order, date }) {
      const subtitles = [
        group && `group:${group}`,
        order && `order:${order}`,
        date && `${format(parseISO(date), "yyyy/MM/dd")}`,
      ].filter(Boolean);
      return { title, subtitle: subtitles.join(" ") };
    }
  },
});
