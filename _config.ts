import lume from "https:/deno.land/x/lume@v1.15.3/mod.ts";
import attributes from "lume/plugins/attributes.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import date from "lume/plugins/date.ts";
import en from "https://deno.land/x/date_fns@v2.22.1/locale/en-US/index.js";
import vi from "https://deno.land/x/date_fns@v2.22.1/locale/vi/index.js";

const nunjucks = {
  includes: "_layouts",
  options: {
    throwOnUndefined: true,
  },
};

const site = lume({
  server: {
    page404: "/index.html",
  },
}, { nunjucks });

site.ignore("README.md", "CHANGELOG.md", "node_modules");
site.copy("assets", ".");
site.copy("plugins", ".");
site.copy(".github/CNAME", "CNAME");

site.data(
  "siteKeywords",
  "help-14,help14,nhan,phan,developer,programmer,coder,blog",
);

site.use(resolveUrls());
site.use(attributes());
site.use(code_highlight({ options: { classPrefix: "language-" } }));
site.use(
  date({ locales: { en, vi }, formats: { "SHORT_FORMAT": "dd/MM/yyyy" } }),
);

export default site;
