import * as React from "react";

import { Layout, Seo } from "~components";

const AboutPage = () => (
  <Layout pageTitle="About Me">
    <p>
      Hi there! I'm the proud creator of this site, which I built with Gatsby.
    </p>
  </Layout>
);

export const Head = () => <Seo title="About Me" />;

export default AboutPage;
