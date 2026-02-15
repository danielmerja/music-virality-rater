import { redirect } from "next/navigation";

/**
 * The context selection flow has been merged into the upload page.
 * This page exists only to redirect stale links.
 */
export default function ContextPage() {
  redirect("/upload");
}
