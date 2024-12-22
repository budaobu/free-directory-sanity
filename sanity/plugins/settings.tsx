/**
 * This plugin contains all the logic for setting up the singletons
 */

import { CheckmarkCircleIcon, ClockIcon, CloseCircleIcon, ProjectsIcon } from "@sanity/icons";
import { definePlugin, type DocumentDefinition } from "sanity";
import { type StructureResolver } from "sanity/structure";
import application from "../schemas/documents/application";
import submission from "../schemas/documents/submission";
import product from "../schemas/documents/product";

export const singletonPlugin = definePlugin((types: string[]) => {
  return {
    name: "singletonPlugin",
    document: {
      // Hide 'Singletons (such as Settings)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext, ...rest }) => {
        if (creationContext.type === "global") {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId),
          );
        }

        return prev;
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== "duplicate");
        }

        return prev;
      },
    },
  };
});

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (
  typeDefArray: DocumentDefinition[],
): StructureResolver => {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Structure tool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title!)
        .icon(typeDef.icon)
        .child(
          S.editor()
            .id(typeDef.name)
            .schemaType(typeDef.name)
            .documentId(typeDef.name),
        );
    });

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find((singleton) => singleton.name === listItem.getId()),
    );

    // applications
    // sanity has a bug for setting schemaType has no effect, so I have to set _type!
    const reviewingAppliactionListItems = S.listItem()
      .title('Reviewing Appliactions')
      .schemaType(application.name)
      .icon(ClockIcon)
      .child(S.documentList()
        .schemaType(application.name)
        .title('Reviewing Appliactions')
        .filter('_type == "application" && status == "reviewing"'));

    const rejectedAppliactionListItems = S.listItem()
      .title('Rejected Appliactions')
      .schemaType(application.name)
      .icon(CloseCircleIcon)
      .child(S.documentList()
        .schemaType(application.name)
        .title('Rejected Appliactions')
        .filter('_type == "application" && status == "rejected"'));

    const approvedAppliactionListItems = S.listItem()
      .title('Approved Appliactions')
      .schemaType(application.name)
      .icon(CheckmarkCircleIcon)
      .child(S.documentList()
        .schemaType(application.name)
        .title('Approved Appliactions')
        .filter('_type == "application" && status == "approved"'));

    const featuredAppliactionListItems = S.listItem()
      .title('Featured Appliactions')
      .schemaType(application.name)
      .icon(CheckmarkCircleIcon)
      .child(S.documentList()
        .schemaType(application.name)
        .title('Featured Appliactions')
        .filter('_type == "application" && featured == true'));

    // submissions
    const reviewingSubmissionListItems = S.listItem()
      .title('Reviewing Submissions')
      .schemaType(submission.name)
      .icon(ClockIcon)
      .child(S.documentList()
        .schemaType(submission.name)
        .title('Reviewing Submissions')
        .filter('_type == "submission" && status == "reviewing"'));

    const rejectedSubmissionListItems = S.listItem()
      .title('Rejected Submissions')
      .schemaType(submission.name)
      .icon(CloseCircleIcon)
      .child(S.documentList()
        .schemaType(submission.name)
        .title('Rejected Submissions')
        .filter('_type == "submission" && status == "rejected"'));

    const approvedSubmissionListItems = S.listItem()
      .title('Approved Submissions')
      .schemaType(submission.name)
      .icon(CheckmarkCircleIcon)
      .child(S.documentList()
        .schemaType(submission.name)
        .title('Approved Submissions')
        .filter('_type == "submission" && status == "approved"'));

    const featuredProductListItems = S.listItem()
      .title('Featured Products')
      .schemaType(product.name)
      .icon(CheckmarkCircleIcon)
      .child(S.documentList()
        .schemaType(product.name)
        .title('Featured Products')
        .filter('_type == "product" && featured == true'));

    const invisibleProductListItems = S.listItem()
      .title('Invisible Products')
      .schemaType(product.name)
      .icon(CheckmarkCircleIcon)
      .child(S.documentList()
        .schemaType(product.name)
        .title('Invisible Products')
        .filter('_type == "product" && visible == false'));

    return S.list()
      .title("Content")
      .items([
        reviewingAppliactionListItems,
        rejectedAppliactionListItems,
        approvedAppliactionListItems,
        featuredAppliactionListItems,
        S.divider(),
        reviewingSubmissionListItems,
        rejectedSubmissionListItems,
        approvedSubmissionListItems,
        S.divider(),
        featuredProductListItems,        
        invisibleProductListItems,
        S.divider(),
        // S.documentTypeListItem('product').title('Products'), // List items with same ID found (product)

        // S.documentTypeListItem('product').title('Products'),

        ...defaultListItems,

        ...singletonItems,]);
  };
};
