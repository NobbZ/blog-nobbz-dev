import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => (
  <Layout pageTitle="Home Page">
    <p>I'm making this by following the Gatsby Tutorial.</p>

    <StaticImage
      alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
      src="../images/clifford.jpg"
    />
  </Layout>
);

export const Head = () => <Seo title="Home Page" />;

export default IndexPage;
