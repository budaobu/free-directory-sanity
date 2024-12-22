"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { codeInput } from '@sanity/code-input';
import { colorInput } from '@sanity/color-input';
import { dashboardTool, projectInfoWidget, projectUsersWidget } from "@sanity/dashboard";
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { markdownSchema } from "sanity-plugin-markdown";
import { media } from 'sanity-plugin-media';
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import defaultDocumentNode from '@/sanity/defaultDocumentNode';
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { locate } from "@/sanity/plugins/locate";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import author from "@/sanity/schemas/documents/author";
import post from "@/sanity/schemas/documents/post";
import product from "@/sanity/schemas/documents/product";
import settings from "@/sanity/schemas/singletons/settings";
import application from "./sanity/schemas/documents/application";
import category from "./sanity/schemas/documents/category";
import { comment } from "./sanity/schemas/documents/comment";
import submission from "./sanity/schemas/documents/submission";
import tag from "./sanity/schemas/documents/tag";
import appType from './sanity/schemas/documents/appType';
import user from './sanity/schemas/documents/user';
import group from './sanity/schemas/documents/group';
import guide from './sanity/schemas/documents/guide';
import localizedString from './sanity/schemas/singletons/localizedString';

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema: {
    types: [
      // Singletons
      settings,
      localizedString,
      
      // Documents
      product,
      submission,
      application,
      user,
      
      guide,
      
      tag,
      category,
      group,
      appType,

      post,
      author,
      comment,
    ],
  },
  plugins: [
    structureTool({
      defaultDocumentNode,
      structure: pageStructure([settings]),
    }),

    dashboardTool({
      widgets: [
        projectInfoWidget(),
        projectUsersWidget(),
        // sanityTutorialsWidget()
      ],
    }),

    presentationTool({
      locate,
      previewUrl: { previewMode: { enable: "/api/draft" } },
    }),
    // https://www.sanity.io/plugins/sanity-plugin-media
    media(),
    // https://www.sanity.io/plugins/sanity-plugin-markdown
    markdownSchema(),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    // assistWithPresets(),
    colorInput(),
    codeInput(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    // process.env.NODE_ENV === "development" &&
    visionTool({
      defaultApiVersion: apiVersion
    }),
  ].filter(Boolean) as PluginOptions[],
});
