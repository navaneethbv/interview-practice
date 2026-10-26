import { createBaChapterRoute } from "@/components/ba/createBaChapterRoute";

const chapterRoute = createBaChapterRoute("beginner");

export const dynamicParams = false;
export const generateStaticParams = chapterRoute.generateStaticParams;
export const generateMetadata = chapterRoute.generateMetadata;
export default chapterRoute.Page;
