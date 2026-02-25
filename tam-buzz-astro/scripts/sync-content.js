#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const VAULT_PATH =
  process.env.VAULT_PATH ||
  "/Users/benjaminpolansky/obsidian/death-of-socrates/distribution/tam-buzz";
const ASTRO_CONTENT_PATH = path.join(__dirname, "..", "src", "content");

console.log("🔄 Syncing content from Obsidian vault to Astro...\n");

function extractContentMetadata(content, filePath) {
  const lines = content.split("\n");
  const stats = fs.statSync(filePath);

  // Extract title from first # heading
  let title = "";
  const titleMatch = lines.find((line) => line.startsWith("# "));
  if (titleMatch) {
    title = titleMatch.replace("# ", "").trim();
  } else {
    // Fallback to filename
    title = path
      .basename(filePath, ".md")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // Extract description from first italic line (lines starting with *text*)
  let description = "";
  const descMatch = lines.find(
    (line) =>
      line.trim().startsWith("*") &&
      line.trim().endsWith("*") &&
      line.trim().length > 2,
  );
  if (descMatch) {
    description = descMatch.replace(/^\*(.+)\*$/, "$1").trim();
  }

  // Use file modification date
  const date = stats.mtime.toISOString().split("T")[0];

  // Generate tags based on filename and content analysis
  const filename = path.basename(filePath, ".md");
  const tags = [filename.replace(/-/g, " ")];

  return {
    title,
    description,
    date,
    tags,
  };
}

function createFrontmatter(metadata) {
  let frontmatter = "---\n";
  frontmatter += `title: "${metadata.title}"\n`;
  if (metadata.description) {
    frontmatter += `description: "${metadata.description}"\n`;
  }
  frontmatter += `date: ${metadata.date}\n`;
  frontmatter += `tags: ${JSON.stringify(metadata.tags)}\n`;
  frontmatter += "---\n\n";
  return frontmatter;
}

function isDraftFile(content) {
  // Check for draft tag in various formats:
  // - #draft anywhere in the file
  // - draft: true in YAML frontmatter (if it exists)
  // - [[draft]] or [draft] tags
  const draftPatterns = [
    /#draft\b/i, // #draft tag
    /\[\[draft\]\]/i, // [[draft]] Obsidian link
    /\[draft\]/i, // [draft] tag
    /draft:\s*true/i, // YAML draft: true
    /#\s*draft\s*$/im, // # draft as heading
  ];

  return draftPatterns.some((pattern) => pattern.test(content));
}

function removeRedundantTitleAndDescription(content, metadata) {
  const lines = content.split("\n");
  let cleanedLines = [];
  let i = 0;

  // Skip the first H1 heading if it matches the extracted title
  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines at the start
    if (line === "") {
      i++;
      continue;
    }

    // Check if this is the title heading that matches our metadata
    if (line.startsWith("# ")) {
      const headingText = line.replace("# ", "").trim();
      if (headingText === metadata.title) {
        // Skip this heading and continue
        i++;
        // Also skip the next empty line if it exists
        if (i < lines.length && lines[i].trim() === "") {
          i++;
        }
        continue;
      }
    }

    // Check if this is the description line that matches our metadata
    if (line.startsWith("*") && line.endsWith("*") && line.length > 2) {
      const descText = line.replace(/^\*(.+)\*$/, "$1").trim();
      if (metadata.description && descText === metadata.description) {
        // Skip this description line
        i++;
        // Also skip the next empty line if it exists
        if (i < lines.length && lines[i].trim() === "") {
          i++;
        }
        continue;
      }
    }

    // If we get here, include this line
    break;
  }

  // Add all remaining lines
  while (i < lines.length) {
    cleanedLines.push(lines[i]);
    i++;
  }

  return cleanedLines.join("\n");
}

function processMarkdownFile(sourceFile, destFile) {
  const content = fs.readFileSync(sourceFile, "utf-8");

  // Check if file is marked as draft
  if (isDraftFile(content)) {
    console.log(`📝 Skipped (draft): ${path.basename(sourceFile)}`);
    return false; // Indicate file was skipped
  }

  const metadata = extractContentMetadata(content, sourceFile);
  const frontmatter = createFrontmatter(metadata);

  // Remove redundant title and description from content
  const cleanedContent = removeRedundantTitleAndDescription(content, metadata);

  // Combine frontmatter with cleaned content
  const processedContent = frontmatter + cleanedContent;

  // Ensure destination directory exists
  fs.mkdirSync(path.dirname(destFile), { recursive: true });

  // Write the processed file
  fs.writeFileSync(destFile, processedContent);

  console.log(`✅ Synced: ${path.basename(sourceFile)} -> ${metadata.title}`);
  return true; // Indicate file was processed
}

function syncCollection(collectionName) {
  const sourcePath = path.join(VAULT_PATH, collectionName);
  const destPath = path.join(ASTRO_CONTENT_PATH, collectionName);
  const tempDestPath = destPath + ".tmp-sync";

  console.log(`📁 Processing ${collectionName} collection...`);

  // Prepare temporary destination directory
  if (fs.existsSync(tempDestPath)) {
    fs.rmSync(tempDestPath, { recursive: true });
  }
  fs.mkdirSync(tempDestPath, { recursive: true });

  try {
    // Process all markdown files EXCEPT README files
    if (fs.existsSync(sourcePath)) {
      const files = fs.readdirSync(sourcePath);
      const markdownFiles = files.filter(
        (file) =>
          file.endsWith(".md") && !file.toLowerCase().includes("readme"),
      );

      let syncedCount = 0;
      let draftCount = 0;

      for (const file of markdownFiles) {
        const sourceFile = path.join(sourcePath, file);
        const destFile = path.join(tempDestPath, file);
        const wasSynced = processMarkdownFile(sourceFile, destFile);

        if (wasSynced) {
          syncedCount++;
        } else {
          draftCount++;
        }
      }

      console.log(
        `   ${syncedCount} files synced, ${draftCount} drafts skipped (READMEs ignored)\n`,
      );
    } else {
      console.log(`   ⚠️  Source directory not found: ${sourcePath}\n`);
    }

    // After successful processing, replace the existing destination directory
    if (fs.existsSync(destPath)) {
      fs.rmSync(destPath, { recursive: true });
    }
    fs.renameSync(tempDestPath, destPath);
  } catch (error) {
    // On failure, clean up the temporary directory and rethrow
    if (fs.existsSync(tempDestPath)) {
      fs.rmSync(tempDestPath, { recursive: true });
    }
    throw error;
  }
}

// Main execution
try {
  // Sync both collections
  syncCollection("heights");
  syncCollection("depths");

  console.log("🎉 Content sync completed successfully!");
  console.log(
    "Your Obsidian vault content is now available in your Astro site.\n",
  );
  console.log("📝 Note: README files were ignored during sync.");
} catch (error) {
  console.error("❌ Error during sync:", error.message);
  process.exit(1);
}
