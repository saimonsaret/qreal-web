﻿using System.Web;
using System.Web.Optimization;

namespace QReal_MobileDesigner
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery.form.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/designerjs").Include(
               "~/Scripts/jquery-{version}.js",
               "~/Scripts/jquery.form.min.js",
               "~/Scripts/jquery.tmpl.js",
               "~/Scripts/jquery-ui-1.10.4.custom.min.js",
              "~/Scripts/bootstrap.js",
               "~/Scripts/respond.js",
               "~/Scripts/bootbox.js"));

            bundles.Add(new ScriptBundle("~/bundles/designercss").Include(
               "~/Content/jquery-ui/jquery-ui-1.10.4.custom.min.css",
               "~/Content/bootstrap.min.css",
                "~/Content/css/designer.css",
                "~/Content/css/device-mockup/device-mockups2.css"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/site.css"));
        }
    }
}
