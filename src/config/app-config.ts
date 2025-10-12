import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Ast Admin",
  version: packageJson.version,
  copyright: `© ${currentYear}, Ast Admin.`,
  meta: {
    title: "Ast Admin - Advanced Study Tutorial Dashboard",
    description:
      "Ast Admin is a professional, production-ready admin dashboard for managing the Advanced Study Tutorial platform. Built with Next.js 15, Tailwind CSS v4, and shadcn/ui, it offers powerful tools for handling courses, students, instructors, and analytics with a modern, responsive design.",
  },
};
