/**
 * Prefixes a site path with the deploy base, so the same build works at the
 * domain root ("/") and under a sub-folder such as GitHub Pages'
 * "/Salon-Chic-Hair-Nails-website-demo/". Always pass a path starting with "/".
 */
export const u = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, "") + path;
