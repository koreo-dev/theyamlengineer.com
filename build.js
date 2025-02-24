const fs = require("fs").promises;
const marked = require("marked");
const path = require("path");

async function buildSite() {
  try {
    // Read the template file
    const template = await fs.readFile("template.html", "utf-8");

    // Read and convert markdown files
    const yamlPostMD = await fs.readFile(
      "posts/stop-treating-yaml-like-a-string.md",
      "utf-8"
    );
    const iacPostMd = await fs.readFile(
      "posts/controller-driven-infrastructure-as-code.md",
      "utf-8"
    );

    const yamlPostHTML = marked.parse(yamlPostMD);
    const iacPostHTML = marked.parse(iacPostMd);

    // Insert converted HTML into template
    const finalHTML = template
      .replace("<!-- YAML_POST_CONTENT -->", yamlPostHTML)
      .replace("<!-- IAC_POST_CONTENT -->", iacPostHTML);

    // Write the final HTML file
    await fs.writeFile("index.html", finalHTML);

    console.log("Site built successfully!");
  } catch (error) {
    console.error("Error building site:", error);
  }
}

buildSite();
